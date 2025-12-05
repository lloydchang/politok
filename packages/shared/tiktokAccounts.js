// Official verified TikTok accounts for cities
// Only mayors with verified blue checkmark accounts

export const VERIFIED_TIKTOK_ACCOUNTS = {
    // ========================================
    // CITIES (Mayors with White Checkmarks on Cyan Backgrounds)
    // ========================================
    'Boston, Massachusetts': {
        accounts: [
            { type: 'mayor', username: 'officeofmayorwu', displayName: 'Boston Mayor Michelle Wu', verified: true, photo: 'https://p16-common-sign.tiktokcdn-us.com/tos-useast5-avt-0068-tx/14a169a1b8be9329c5b7f47930d9344a~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=9640&refresh_token=392f55bb&x-expires=1765112400&x-signature=gGAhtG7DmH1Jo%2Fv4YCEUvaVG1mU%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=useast8' }
        ],
        website: 'https://www.boston.gov'
    },
    'Detroit, Michigan': {
        accounts: [
            { type: 'mayor', username: 'mikeeduggan', displayName: 'mikeeduggan', verified: true, photo: 'https://p16-common-sign.tiktokcdn-us.com/tos-useast5-avt-0068-tx/bcccc7233fb208f254515e6d7b25a5ad~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=9640&refresh_token=11441ec2&x-expires=1765112400&x-signature=l0zogdeU7%2BB1sVszPiwrMcaz2hE%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=useast8' }
        ],
        website: 'https://detroitmi.gov'
    },
    'District of Columbia': {
        accounts: [
            { type: 'mayor', username: 'mayorbowser', displayName: 'Mayor Muriel Bowser', verified: true, photo: 'https://p19-common-sign.tiktokcdn-us.com/tos-maliva-avt-0068/4540e573044e4bfdd78de1ffbdd78059~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=9640&refresh_token=52e32885&x-expires=1765112400&x-signature=NMfCAYDkqILZMy5W%2FJ13YCPos1Y%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=useast8' }
        ],
        website: 'https://mayor.dc.gov'
    },
    'New York City, New York': {
        accounts: [
            { type: 'mayor', username: 'zohran_k_mamdani', displayName: 'Zohran Mamdani', verified: true, photo: 'https://p16-common-sign.tiktokcdn-us.com/tos-useast8-avt-0068-tx2/5050b98bb2ff723c0b032d35a1822100~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=9640&refresh_token=d6d2a39b&x-expires=1765112400&x-signature=5rqwAzsBtPZeKPmSCts1Di6a0gg%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=useast8' }
        ],
        website: 'https://www.nyc.gov'
    },
    'Birmingham, Alabama': {
        accounts: [
            { type: 'mayor', username: 'randallwoodfin', displayName: 'Randall Woodfin', verified: true, photo: 'https://p16-common-sign.tiktokcdn-us.com/tos-maliva-avt-0068/7322512429606338566~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=9640&refresh_token=2424abe6&x-expires=1765112400&x-signature=YyIzz0omboSpLOHOYCmtpxZp9kg%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=useast8' }
        ],
        website: 'https://www.birminghamal.gov'
    },
    'San Francisco, California': {
        accounts: [
            { type: 'mayor', username: 'danielluriesf', displayName: 'Daniel Lurie', verified: true, photo: 'https://p16-common-sign.tiktokcdn-us.com/tos-useast8-avt-0068-tx2/3dbf205be32154ffe672632795ed9bab~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=9640&refresh_token=a3234e78&x-expires=1765112400&x-signature=KrPo3LHrrP9g7VM%2FPWCAJkbNTrw%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=useast8' }
        ],
        website: 'https://sf.gov'
    },
    'San Jose, California': {
        accounts: [
            { type: 'mayor', username: 'mattmahansj', displayName: 'Mayor Matt Mahan', verified: true, photo: 'https://p16-common-sign.tiktokcdn-us.com/tos-useast8-avt-0068-tx2/763e5c69c5ecd6c900c9b5e086d522ff~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=9640&refresh_token=b3e8a211&x-expires=1765112400&x-signature=cBWjpuPiykhpfOnRAj3rK65djvg%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=useast8' }
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
                        type: account.type,
                        photo: account.photo
                    });
                }
            });
        }
    });

    return allAccounts.sort((a, b) => a.displayName.localeCompare(b.displayName));
}

