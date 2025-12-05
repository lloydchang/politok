// Official verified TikTok accounts for locations
// Only politicians with White Checkmarks on Cyan Backgrounds accounts

export const VERIFIED_TIKTOK_ACCOUNTS = {
    // ========================================
    // LOCATIONS (Politicians with White Checkmarks on Cyan Backgrounds)
    // ========================================
    'Boston, Massachusetts': {
        accounts: [
            { type: 'personal', username: 'wutrain', displayName: 'Michelle Wu', verified: true }
        ],
        website: 'https://www.boston.gov'
    },
    'Detroit, Michigan': {
        accounts: [
            { type: 'personal', username: 'mikeeduggan', displayName: 'Mike Duggan', verified: true }
        ],
        website: 'https://detroitmi.gov'
    },
    'New York City, New York': {
        accounts: [
            { type: 'personal', username: 'zohran_k_mamdani', displayName: 'Zohran Mamdani', verified: true }
        ],
        website: 'https://www.nyc.gov'
    },
    'Birmingham, Alabama': {
        accounts: [
            { type: 'personal', username: 'randallwoodfin', displayName: 'Randall Woodfin', verified: true }
        ],
        website: 'https://www.birminghamal.gov'
    },
    'San Francisco, California': {
        accounts: [
            { type: 'personal', username: 'danielluriesf', displayName: 'Daniel Lurie', verified: true }
        ],
        website: 'https://sf.gov'
    },
    'San Jose, California': {
        accounts: [
            { type: 'personal', username: 'mattmahansj', displayName: 'Matt Mahan', verified: true }
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

