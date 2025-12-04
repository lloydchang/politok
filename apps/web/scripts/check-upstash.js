const fs = require('fs');
const path = require('path');
const { Redis } = require('@upstash/redis');

// Load env vars manually
const envPath = path.join(__dirname, '../.env.local');

if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const parts = line.split('=');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            const value = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
            if (key && value) {
                process.env[key] = value;
            }
        }
    });
}

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    console.error('Missing Upstash credentials');
    process.exit(1);
}

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function check() {
    console.log('Checking Upstash stats...\n');

    // Check all proposition likes/views
    for (let id = 1; id <= 4; id++) {
        const likes = await redis.get(`likes:${id}`);
        const views = await redis.get(`views:${id}`);
        console.log(`Prop ${id}: ${likes || 0} likes, ${views || 0} views`);
    }

    // Check results and dashboard
    const resultsLikes = await redis.get('likes:results_card');
    const resultsViews = await redis.get('views:results_card');
    console.log(`Results: ${resultsLikes || 0} likes, ${resultsViews || 0} views`);

    const dashboardLikes = await redis.get('likes:dashboard_card');
    const dashboardViews = await redis.get('views:dashboard_card');
    console.log(`Dashboard: ${dashboardLikes || 0} likes, ${dashboardViews || 0} views`);

    // Check followers
    const follows = await redis.get('follows:profile');
    console.log(`\nFollowers: ${follows || 0}`);

    // Calculate totals
    const totalLikes = (parseInt(resultsLikes) || 0) + (parseInt(dashboardLikes) || 0) +
        Array.from({ length: 4 }, (_, i) => i + 1)
            .reduce((sum, id) => sum + (parseInt(redis.get(`likes:${id}`)) || 0), 0);
    console.log(`\nTotal Likes (should match profile): ${totalLikes}`);
}

check().catch(console.error);
