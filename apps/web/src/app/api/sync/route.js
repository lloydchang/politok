import { Redis } from '@upstash/redis';

const RATE_LIMIT_WINDOW = 60; // 60 seconds
const RATE_LIMIT_MAX = 100; // Max 100 requests per minute per fingerprint

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const isRedisConfigured = () => {
    return process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;
};

/**
 * Check rate limit for a fingerprint
 * @param {string} fingerprint - Client fingerprint
 * @returns {Promise<boolean>} True if allowed, false if rate limited
 */
async function checkRateLimit(fingerprint) {
    const key = `ratelimit:${fingerprint}`;
    try {
        const current = await redis.incr(key);
        if (current === 1) {
            // First request, set expiry
            await redis.expire(key, RATE_LIMIT_WINDOW);
        }
        return current <= RATE_LIMIT_MAX;
    } catch (e) {
        console.error('Rate limit check error:', e);
        // Allow on error (fail open)
        return true;
    }
}

/**
 * Check if fingerprint has already performed this action
 * @param {string} fingerprint - Client fingerprint
 * @param {string} contentId - Content item ID
 * @param {string} type - Action type (like, follow)
 * @returns {Promise<boolean>} True if already performed, false otherwise
 */
async function hasPerformedAction(fingerprint, contentId, type) {
    const key = `fp:${fingerprint}:${type}:${contentId}`;
    try {
        const exists = await redis.exists(key);
        return exists === 1;
    } catch (e) {
        console.error('Action check error:', e);
        return false;
    }
}

/**
 * Mark action as performed by fingerprint
 * @param {string} fingerprint - Client fingerprint
 * @param {string} contentId - Content item ID
 * @param {string} type - Action type (like, follow)
 */
async function markActionPerformed(fingerprint, contentId, type) {
    const key = `fp:${fingerprint}:${type}:${contentId}`;
    try {
        await redis.set(key, 1, { ex: 30 * 24 * 60 * 60 }); // 30 days TTL
    } catch (e) {
        console.error('Mark action error:', e);
    }
}
/**
 * Remove action record for fingerprint (allow re-action later)
 * @param {string} fingerprint - Client fingerprint
 * @param {string} contentId - Content item ID
 * @param {string} type - Action type (like, follow)
 */
async function removeActionPerformed(fingerprint, contentId, type) {
    const key = `fp:${fingerprint}:${type}:${contentId}`;
    try {
        await redis.del(key);
    } catch (e) {
        console.error('Remove action error:', e);
    }
}

export async function POST(request) {
    try {
        const { fingerprint, interactions } = await request.json();

        if (!fingerprint || !Array.isArray(interactions)) {
            return Response.json(
                { error: 'Invalid request' },
                { status: 400 }
            );
        }

        // Rate limiting
        const allowed = await checkRateLimit(fingerprint);
        if (!allowed) {
            return Response.json(
                { error: 'Rate limit exceeded' },
                { status: 429 }
            );
        }

        const results = [];
        const pipeline = redis.pipeline();

        for (const interaction of interactions) {
            const { id, type } = interaction;

            if (!id || !type) {
                results.push({ id, type, success: false, error: 'Missing id or type' });
                continue;
            }

            // Handle Un-actions (unlike, unfollow)
            if (type === 'unlike' || type === 'unfollow') {
                // Determine the original action type (unlike -> like, unfollow -> follow)
                const originalType = type === 'unlike' ? 'like' : 'follow';

                // Decrement counter
                const key = `${originalType === 'follow' ? 'follows:profile' : `${originalType}s:${id}`}`;
                pipeline.decr(key);

                // Remove fingerprint record so they can like/follow again
                await removeActionPerformed(fingerprint, id, originalType);

                results.push({ id, type, success: true });
                continue;
            }

            // Check for duplicate actions (likes/follows only, not views)
            if (type === 'like' || type === 'follow') {
                const alreadyPerformed = await hasPerformedAction(fingerprint, id, type);
                if (alreadyPerformed) {
                    results.push({ id, type, success: false, error: 'Already performed' });
                    continue;
                }
            }

            // Increment counter
            const key = `${type === 'follow' ? 'follows:profile' : `${type}s:${id}`}`;
            pipeline.incr(key);

            // Mark as performed (for likes/follows)
            if (type === 'like' || type === 'follow') {
                await markActionPerformed(fingerprint, id, type);
            }

            results.push({ id, type, success: true });
        }

        // Execute pipeline only if there are commands
        const successfulResults = results.filter(r => r.success);
        if (successfulResults.length > 0) {
            await pipeline.exec();
        }

        return Response.json({
            success: true,
            synced: successfulResults.length,
            results
        });

    } catch (error) {
        console.error('Sync error:', error);
        return Response.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
