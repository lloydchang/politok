import { STATE_LOCATIONS } from './policyData.js';

// VERIFIED ACCOUNTS ONLY
// Each account has been manually confirmed by user to have a blue checkmark on TikTok
const VERIFIED_ACCOUNTS = {
    // Mayors (1)
    'New York City, New York': {
        username: '@zohran_k_mamdani',
        displayName: 'Zohran Mamdani',
        type: 'mayor'
    },

    // Cities (3)
    'Minneapolis, Minnesota': {
        username: '@cityminneapolis',
        displayName: 'City of Minneapolis',
        type: 'city'
    },
    'Las Vegas, Nevada': {
        username: '@cityoflasvegas',
        displayName: 'City of Las Vegas',
        type: 'city'
    },
    'Miami, Florida': {
        username: '@miami',
        displayName: 'City of Miami',
        type: 'city'
    },
};

/**
 * Get all TikTok accounts
 * @returns {Array} Array of all verified account objects
 */
export const TIKTOK_ACCOUNTS = (() => {
    const accounts = [];

    // Add all verified accounts
    Object.entries(VERIFIED_ACCOUNTS).forEach(([location, account]) => {
        accounts.push({
            ...account,
            location,
            profilePic: null, // No profile pictures for now
            isReal: true,
            isVerified: true
        });
    });

    // Sort alphabetically by username
    accounts.sort((a, b) => {
        const nameA = a.username.replace('@', '').toLowerCase();
        const nameB = b.username.replace('@', '').toLowerCase();
        return nameA.localeCompare(nameB);
    });

    return accounts;
})();

/**
 * Get TikTok accounts for a specific location
 * @param {string} locationName - City or state name
 * @param {string} stateName - State name
 * @returns {Array} Array of TikTok accounts for the location
 */
export function getTikTokAccountsForLocation(locationName, stateName) {
    return TIKTOK_ACCOUNTS.filter(acc => {
        if (acc.location === locationName) return true;
        if (acc.location.includes(locationName)) return true;
        return false;
    });
}

/**
 * Get total count of followed TikTok accounts
 * @returns {number} Count of accounts
 */
export function getFollowingCount() {
    return TIKTOK_ACCOUNTS.length;
}
