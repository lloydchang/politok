// Logic for conversion path features: Daily Challenge, Ballot Finder, Org Connections

export const conversion = {
    // Get Daily Challenge based on day of week
    getDailyChallenge: () => {
        const days = [
            { day: 'Sunday', theme: 'Wildcard', prompt: 'Wildcard: What if rent was $0?', emoji: '🃏' },
            { day: 'Monday', theme: 'Universal', prompt: 'What if EVERYONE voted like you?', emoji: '🌎' },
            { day: 'Tuesday', theme: 'Family', prompt: 'Would your parents vote the same way?', emoji: '👨‍👩‍👧‍👦' },
            { day: 'Wednesday', theme: 'Prediction', prompt: 'Predict how your state voted', emoji: '🔮' },
            { day: 'Thursday', theme: 'Celebrity', prompt: 'Compare to a celebrity\'s likely votes', emoji: '✨' },
            { day: 'Friday', theme: 'Local', prompt: 'What would this mean for your neighborhood?', emoji: '🏘️' },
            { day: 'Saturday', theme: 'Future', prompt: 'Your life in 2030 with these policies', emoji: '🚀' }
        ];

        const today = new Date().getDay(); // 0 = Sunday, 6 = Saturday
        return days[today];
    },

    // Get Org Recommendations based on Equity Score
    getOrgRecommendations: (equityScore) => {
        if (equityScore >= 70) {
            return [
                { name: 'DSA', description: 'Democratic Socialists of America', link: 'https://www.dsausa.org/' },
                { name: 'YIMBY Action', description: 'Yes In My Backyard - Housing Advocacy', link: 'https://yimbyaction.org/' },
                { name: 'National Low Income Housing Coalition', description: 'Advocating for affordable housing', link: 'https://nlihc.org/' }
            ];
        } else if (equityScore >= 50) {
            return [
                { name: 'Local Action Lab', description: 'Community-led policy change', link: 'https://www.localactionlab.org/' },
                { name: 'Open Primaries', description: 'Advocating for open nonpartisan primaries', link: 'https://www.openprimaries.org/' },
                { name: 'National Housing Conference', description: 'Bipartisan housing advocacy', link: 'https://nhc.org/' }
            ];
        } else {
            return [
                { name: 'Urban Institute', description: 'Economic and social policy research', link: 'https://www.urban.org/' },
                { name: 'Brookings Institution', description: 'Public policy organization', link: 'https://www.brookings.edu/' },
                { name: 'OECD: Housing', description: 'Global policy forum', link: 'https://www.oecd.org/en/topics/policy-issues/housing.html' }
            ];
        }
    },

    // Get Ballot Finder Link (Smart Redirect)
    getBallotLink: (zipCode) => {
        // Fallback to Ballotpedia sample ballot lookup
        return `https://ballotpedia.org/Sample_Ballot_Lookup?zip=${zipCode}`;
    }
};
