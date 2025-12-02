import { Redis } from '@upstash/redis';
import { FEED_ITEMS } from '@politok/shared/constants';

// Cache stats for 60 seconds
let cachedStats = null;
let cacheTime = 0;
const CACHE_TTL = 60000; // 60 seconds

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const isRedisConfigured = () => {
    return process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;
};

export async function GET() {
    try {
        // Return cached data if available
        const now = Date.now();
        if (cachedStats && (now - cacheTime) < CACHE_TTL) {
            return Response.json(cachedStats);
        }

        // Build list of keys to fetch
        const keys = [];

        // Add likes and views for each content item
        FEED_ITEMS.forEach(item => {
            const id = item.data?.id || item.id;
            if (id) {
                keys.push(`likes:${id}`);
                keys.push(`views:${id}`);
            }
        });

        // Add follows
        keys.push('follows:profile');

        // Fetch all in one batch
        const values = await redis.mget(...keys);

        // Parse results
        const stats = {
            likes: {},
            views: {},
            follows: 0
        };

        let keyIndex = 0;
        FEED_ITEMS.forEach(item => {
            const id = item.data?.id || item.id;
            if (id) {
                stats.likes[id] = values[keyIndex] || 0;
                keyIndex++;
                stats.views[id] = values[keyIndex] || 0;
                keyIndex++;
            }
        });

        stats.follows = values[keyIndex] || 0;

        // Cache the results
        cachedStats = stats;
        cacheTime = now;

        return Response.json(stats);

    } catch (error) {
        console.error('Stats fetch error:', error);
        // Return empty stats on error
        return Response.json({
            likes: {},
            views: {},
            follows: 0
        });
    }
}
