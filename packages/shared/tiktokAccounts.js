import { STATE_LOCATIONS } from './policyData.js';

// MINIMAL VERIFIED ACCOUNTS LIST
// Only includes accounts that have been manually confirmed to:
// 1. Exist on TikTok
// 2. Have a blue verified checkmark
// 3. Are official government/mayor accounts
const VERIFIED_ACCOUNTS = {
    // Confirmed Verified Accounts
    'New York City, New York': {
        username: '@zohran_k_mamdani',
        displayName: 'Zohran Mamdani',
        type: 'mayor',
        profilePic: 'https://ui-avatars.com/api/?name=Zohran+Mamdani&background=random&color=fff&size=200&font-size=0.5&length=2'
    },
    'Oneonta, Alabama': {
        username: '@mayorshenanigans',
        displayName: 'Mayor Richard Phillips',
        type: 'mayor',
        profilePic: 'https://ui-avatars.com/api/?name=Mayor+Richard+Phillips&background=random&color=fff&size=200&font-size=0.5&length=2'
    },
    'Seattle, Washington': {
        username: '@visitseattle',
        displayName: 'Visit Seattle',
        type: 'city',
        profilePic: 'https://ui-avatars.com/api/?name=Visit+Seattle&background=random&color=fff&size=200&font-size=0.5&length=2'
    },
    // Add more verified accounts here as they are confirmed
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
