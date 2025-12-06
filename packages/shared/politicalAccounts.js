// Official verified TikTok accounts for locations
// Personal accounts prioritized for authenticity

export const VERIFIED_TIKTOK_ACCOUNTS = {
    // ========================================
    // LOCATIONS WITH TIKTOK ACCOUNTS
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
    },

    // ========================================
    // No TikTok - X/Instagram only
    // ========================================
    'Fort Worth, Texas': {
        accounts: [
            {
                type: 'personal',
                username: null,
                displayName: 'Mattie Parker',
                verified: false,
                socialMedia: {
                    twitter: 'MayorMattie',
                    instagram: 'mattieparkerfw'
                }
            }
        ],
        website: 'https://www.fortworthtexas.gov'
    },
    'Miami, Florida': {
        accounts: [
            {
                type: 'personal',
                username: null,
                displayName: 'Francis Suarez',
                verified: false,
                socialMedia: {
                    twitter: 'FrancisSuarez',
                    instagram: 'francissuarez'
                }
            }
        ],
        website: 'https://www.miamigov.com'
    },
    'Jacksonville, Florida': {
        accounts: [
            {
                type: 'personal',
                username: null,
                displayName: 'Donna Deegan',
                verified: false,
                socialMedia: {
                    twitter: 'DonnaDeegan',
                    instagram: 'donnadeeganjax'
                }
            }
        ],
        website: 'https://www.coj.net'
    },
    'Oklahoma City, Oklahoma': {
        accounts: [
            {
                type: 'personal',
                username: null,
                displayName: 'David Holt',
                verified: false,
                socialMedia: {
                    twitter: 'davidfholt',
                    instagram: 'mayordavidholt'
                }
            }
        ],
        website: 'https://www.okc.gov'
    },
    'Virginia Beach, Virginia': {
        accounts: [
            {
                type: 'personal',
                username: null,
                displayName: 'Bobby Dyer',
                verified: false,
                socialMedia: {
                    twitter: 'BobbyDyerVB',
                    instagram: 'bobbydyervb'
                }
            }
        ],
        website: 'https://www.vbgov.com'
    },
    'Tulsa, Oklahoma': {
        accounts: [
            {
                type: 'personal',
                username: null,
                displayName: 'G.T. Bynum',
                verified: false,
                socialMedia: {
                    twitter: 'gtbynum',
                    instagram: 'gtbynum'
                }
            }
        ],
        website: 'https://www.cityoftulsa.org'
    },
    'Omaha, Nebraska': {
        accounts: [
            {
                type: 'personal',
                username: null,
                displayName: 'John Ewing',
                verified: false,
                socialMedia: {
                    instagram: 'johnewingforomaha'
                }
            },
            {
                type: 'personal',
                username: null,
                displayName: 'Jean Stothert',
                verified: false,
                socialMedia: {
                    twitter: 'Jean_Stothert',
                    instagram: 'mayorjeanstothert'
                }
            }
        ],
        website: 'https://www.cityofomaha.org'
    },
    'Colorado Springs, Colorado': {
        accounts: [
            {
                type: 'personal',
                username: null,
                displayName: 'Yemi Mobolade',
                verified: false,
                socialMedia: {
                    instagram: 'yemimobolade',
                    twitter: 'YemiForCOS'
                }
            }
        ],
        website: 'https://coloradosprings.gov'
    },
    'Arlington, Texas': {
        accounts: [
            {
                type: 'official',
                username: null,
                displayName: 'Jim Ross',
                verified: false,
                socialMedia: {
                    instagram: 'arlingtontxmayor'
                }
            }
        ],
        website: 'https://www.arlingtontx.gov'
    }
};

/**
 * Helper to get a flat list of all verified accounts for the "Following" list
 * @returns {Array} Array of account objects { username, displayName, isVerified, hasTikTok, socialMedia }
 */
export function getAllVerifiedAccounts() {
    const allAccounts = [];

    Object.entries(VERIFIED_TIKTOK_ACCOUNTS).forEach(([location, locationData]) => {
        if (locationData.accounts) {
            locationData.accounts.forEach(account => {
                allAccounts.push({
                    username: account.username,
                    displayName: account.displayName,
                    isVerified: account.verified,
                    hasTikTok: !!account.username,
                    socialMedia: account.socialMedia || {},
                    location: location,
                    type: account.type
                });
            });
        }
    });

    return allAccounts.sort((a, b) => a.displayName.localeCompare(b.displayName));
}

/**
 * Get only accounts with actual TikTok presence
 * @returns {Array} Array of account objects with TikTok usernames
 */
export function getTikTokOnlyAccounts() {
    return getAllVerifiedAccounts().filter(account => account.hasTikTok);
}

/**
 * Get social media link for an account
 * @param {Object} account - Account object
 * @param {string} platform - Platform name ('tiktok', 'twitter', 'instagram')
 * @returns {string} Social media URL
 */
export function getSocialMediaLink(account, platform = 'tiktok') {
    if (platform === 'tiktok' && account.username) {
        return `https://www.tiktok.com/@${account.username}`;
    }

    if (account.socialMedia) {
        if (platform === 'twitter' && account.socialMedia.twitter) {
            return `https://twitter.com/${account.socialMedia.twitter}`;
        }
        if (platform === 'instagram' && account.socialMedia.instagram) {
            return `https://instagram.com/${account.socialMedia.instagram}`;
        }
    }

    return null;
}

/**
 * Get best available social media link for an account
 * Prioritizes TikTok, then Twitter, then Instagram
 * @param {Object} account - Account object
 * @returns {Object} { platform, url }
 */
export function getBestSocialLink(account) {
    if (account.hasTikTok) {
        return {
            platform: 'TikTok',
            url: `https://www.tiktok.com/@${account.username}`
        };
    }

    if (account.socialMedia?.twitter) {
        return {
            platform: 'X (Twitter)',
            url: `https://twitter.com/${account.socialMedia.twitter}`
        };
    }

    if (account.socialMedia?.instagram) {
        return {
            platform: 'Instagram',
            url: `https://instagram.com/${account.socialMedia.instagram}`
        };
    }

    return null;
}
