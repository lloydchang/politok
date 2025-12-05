// Official verified TikTok accounts for cities
// Only mayors with verified blue checkmark accounts

export const VERIFIED_TIKTOK_ACCOUNTS = {
    // ========================================
    // CITIES (Mayors with Blue Checkmarks)
    // ========================================
    'Boston, Massachusetts': {
        accounts: [
            { type: 'mayor', username: 'officeofmayorwu', displayName: 'Mayor Michelle Wu', verified: true }
        ],
        website: 'https://www.boston.gov'
    },
    'Detroit, Michigan': {
        accounts: [
            { type: 'mayor', username: 'mikeeduggan', displayName: 'Mayor Mike Duggan', verified: true }
        ],
        website: 'https://detroitmi.gov'
    },
    'District of Columbia': {
        accounts: [
            { type: 'mayor', username: 'mayorbowser', displayName: 'Mayor Muriel Bowser', verified: true }
        ],
        website: 'https://mayor.dc.gov'
    },
    'New York City, New York': {
        accounts: [
            { type: 'mayor', username: 'zohran_k_mamdani', displayName: 'Zohran Mamdani', verified: true }
        ],
        website: 'https://www.nyc.gov'
    },
    'Birmingham, Alabama': {
        accounts: [
            { type: 'mayor', username: 'randallwoodfin', displayName: 'Mayor Randall Woodfin', verified: true }
        ],
        website: 'https://www.birminghamal.gov'
    },
    'San Francisco, California': {
        accounts: [
            { type: 'mayor', username: 'danielluriesf', displayName: 'Mayor Daniel Lurie', verified: true }
        ],
        website: 'https://sf.gov'
    },
    'San Jose, California': {
        accounts: [
            { type: 'mayor', username: 'mattmahansj', displayName: 'Mayor Matt Mahan', verified: true }
        ],
        website: 'https://www.sanjoseca.gov'
    }
};

/**
 * Helper to get a flat list of all verified accounts for the "Following" list
 * @returns {Array} Array of account objects { username, displayName, isVerified }
 */
export function getAllVerifiedAccounts() {
    const allAccounts = [];

    Object.values(VERIFIED_TIKTOK_ACCOUNTS).forEach(locationData => {
        if (locationData.accounts) {
            locationData.accounts.forEach(account => {
                if (account.verified) {
                    allAccounts.push({
                        username: account.username,
                        displayName: account.displayName,
                        isVerified: true,
                        type: account.type
                    });
                }
            });
        }
    });

    return allAccounts.sort((a, b) => a.displayName.localeCompare(b.displayName));
}

