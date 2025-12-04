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

async function reset() {
    console.log('Resetting Upstash stats to 0...');
    const pipeline = redis.pipeline();

    // Reset Propositions (IDs 1-4)
    for (let id = 1; id <= 4; id++) {
        pipeline.set(`likes:${id}`, 0);
        pipeline.set(`views:${id}`, 0);
    }

    // Reset Results and Dashboard cards
    pipeline.set('likes:results_card', 0);
    pipeline.set('views:results_card', 0);
    pipeline.set('likes:dashboard_card', 0);
    pipeline.set('views:dashboard_card', 0);

    // Reset Followers
    pipeline.set('follows:profile', 0);

    await pipeline.exec();
    console.log('Reset complete. Stats are now 0.');
    console.log('\n⚠️  IMPORTANT: Clear your app storage to see the reset:');
    console.log('\n📱 Web:');
    console.log('   Open DevTools Console → Run: localStorage.clear() → Reload');
    console.log('\n📱 Mobile (iOS Simulator):');
    console.log('   1. Stop Expo (Ctrl+C)');
    console.log('   2. Run: xcrun simctl list devices | grep "iPhone"');
    console.log('   3. Find the Booted simulator UUID');
    console.log('   4. Run: xcrun simctl shutdown [UUID] && xcrun simctl erase [UUID]');
    console.log('   5. Restart Expo and press "i"');
    console.log('\n📱 Mobile (Physical Device):');
    console.log('   Clear app data in Settings or reinstall the app');
}

reset().catch(console.error);
