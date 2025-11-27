// Mock data and local storage logic for gamification features

const STORAGE_KEYS = {
    SHARES: 'politok_vote_shares',
    HANDLE: 'politok_vote_handle',
    BADGES: 'politok_vote_badges'
};

// Mock global leaderboard data
const MOCK_LEADERBOARD = [
    { rank: 1, handle: '@housing_hero', shares: 1245, badges: ['🏆', '🔥'] },
    { rank: 2, handle: '@rent_free_2024', shares: 982, badges: ['🔥'] },
    { rank: 3, handle: '@urban_planner_z', shares: 856, badges: ['🏙️'] },
    { rank: 4, handle: '@policy_wonk', shares: 743, badges: [] },
    { rank: 5, handle: '@transit_lover', shares: 621, badges: ['🚌'] },
    { rank: 6, handle: '@yimby_queen', shares: 589, badges: [] },
    { rank: 7, handle: '@eco_warrior', shares: 432, badges: ['🌱'] },
    { rank: 8, handle: '@union_strong', shares: 398, badges: ['✊'] },
    { rank: 9, handle: '@tenant_power', shares: 356, badges: [] },
    { rank: 10, handle: '@future_mayor', shares: 312, badges: ['🏛️'] }
];

// Mock trending content
const MOCK_TRENDING = [
    {
        id: 1,
        type: 'script',
        title: 'POV: Rent Freeze',
        usageCount: '12.5k',
        content: 'POV: You just found out your rent could\'ve been frozen but people voted NO 💀 #politok #rentcrisis'
    },
    {
        id: 2,
        type: 'script',
        title: 'Hot Take: Buses',
        usageCount: '8.2k',
        content: 'Not me getting called an "Oligarchy Supporter" for voting against free buses... wait, am I? 😳 #realitycheck'
    },
    {
        id: 3,
        type: 'video',
        title: '@housing_hero\'s viral explanation',
        views: '1.2M',
        thumbnail: '📺' // Placeholder
    }
];

export const gamification = {
    // Get user's local stats
    getLocalStats: () => {
        const shares = parseInt(localStorage.getItem(STORAGE_KEYS.SHARES) || '0');
        const handle = localStorage.getItem(STORAGE_KEYS.HANDLE);
        const badges = JSON.parse(localStorage.getItem(STORAGE_KEYS.BADGES) || '[]');

        return { shares, handle, badges };
    },

    // Increment share count
    trackShare: () => {
        const current = parseInt(localStorage.getItem(STORAGE_KEYS.SHARES) || '0');
        const newCount = current + 1;
        localStorage.setItem(STORAGE_KEYS.SHARES, newCount.toString());
        return newCount;
    },

    // Set user handle
    setHandle: (handle) => {
        localStorage.setItem(STORAGE_KEYS.HANDLE, handle);
        return handle;
    },

    // Get leaderboard data (mix of mock global + real local)
    getLeaderboard: () => {
        const localStats = gamification.getLocalStats();

        // If user has shares, insert them into the mock leaderboard for demo purposes
        let data = [...MOCK_LEADERBOARD];

        if (localStats.shares > 0) {
            const userEntry = {
                rank: 'You',
                handle: localStats.handle || 'You',
                shares: localStats.shares,
                badges: localStats.badges,
                isUser: true
            };

            // Simple logic: if user has enough shares, put them in the list
            // For MVP, we'll just append them at the top or bottom depending on score
            // to make them feel good or show progress
            if (localStats.shares > 1000) {
                data.unshift(userEntry);
            } else {
                data.push(userEntry);
            }
        }

        return data;
    },

    // Get trending content
    getTrending: () => {
        return MOCK_TRENDING;
    }
};
