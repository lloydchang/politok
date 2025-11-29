// Comprehensive policy data for all 50 states + DC
// Logic: Specific City Override -> State Default

export const STATE_POLICIES = {
    // ALABAMA
    'Alabama': {
        rent: { status: 'red', text: 'State ban on rent control (Preemption Law)' },
        transit: { status: 'red', text: 'Limited public transit funding. Fares standard' },
        childcare: { status: 'red', text: 'Limited state subsidies. High cost relative to income' },
        medicare: { status: 'red', text: 'State has not expanded Medicaid. High uninsured rate' }
    },
    // ALASKA
    'Alaska': {
        rent: { status: 'yellow', text: 'No state ban, but no local rent control enacted' },
        transit: { status: 'yellow', text: 'People Mover fares standard. Some free routes' },
        childcare: { status: 'yellow', text: 'State assistance available but high costs' },
        medicare: { status: 'red', text: 'State has not expanded Medicaid. High uninsured rate' }
    },
    // ARIZONA
    'Arizona': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'yellow', text: 'Fares standard. Light rail expansion in progress' },
        childcare: { status: 'yellow', text: 'DES assistance available with waitlists' },
        medicare: { status: 'yellow', text: 'Medicaid expanded, but coverage gaps remain' }
    },
    // ARKANSAS
    'Arkansas': {
        rent: { status: 'red', text: 'State ban on rent control' },
        transit: { status: 'red', text: 'Limited transit infrastructure outside Little Rock' },
        childcare: { status: 'red', text: 'Low eligibility threshold for vouchers' },
        medicare: { status: 'yellow', text: 'Medicaid expanded via "Private Option"' }
    },
    // CALIFORNIA
    'California': {
        rent: { status: 'yellow', text: 'Statewide rent cap (AB 1482) of 5% + inflation' },
        transit: { status: 'yellow', text: 'Extensive transit networks. Fares vary by agency' },
        childcare: { status: 'yellow', text: 'State preschool expansion. Subsidies available' },
        medicare: { status: 'yellow', text: 'Medi-Cal expanded to all income-eligible residents' }
    },
    // COLORADO
    'Colorado': {
        rent: { status: 'yellow', text: 'Ban repealed 2021. Local rent control allowed but limited' },
        transit: { status: 'yellow', text: 'Zero Fare for Better Air (seasonal free transit)' },
        childcare: { status: 'yellow', text: 'Universal Preschool (UPK) program active' },
        medicare: { status: 'yellow', text: 'Medicaid expanded. Public option available' }
    },
    // CONNECTICUT
    'Connecticut': {
        rent: { status: 'yellow', text: 'Fair Rent Commissions allowed. No hard caps' },
        transit: { status: 'yellow', text: 'CTtransit fares standard. U-Pass for students' },
        childcare: { status: 'yellow', text: 'Care 4 Kids program. Waitlists common' },
        medicare: { status: 'yellow', text: 'HUSKY Health covers low-income residents broadly' }
    },
    // DELAWARE
    'Delaware': {
        rent: { status: 'yellow', text: 'No state ban. Tenant protections in place' },
        transit: { status: 'yellow', text: 'DART First State fares standard' },
        childcare: { status: 'green', text: 'Purchase of Care program expanded' },
        medicare: { status: 'yellow', text: 'Medicaid expanded. High enrollment' }
    },
    // FLORIDA
    'Florida': {
        rent: { status: 'red', text: 'Rent control banned (State Preemption)' },
        transit: { status: 'red', text: 'Limited state funding for transit operations' },
        childcare: { status: 'red', text: 'VPK available but low funding rates' },
        medicare: { status: 'red', text: 'State has not expanded Medicaid' }
    },
    // GEORGIA
    'Georgia': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'red', text: 'No state funding for MARTA operations' },
        childcare: { status: 'yellow', text: 'Lottery-funded Pre-K available' },
        medicare: { status: 'red', text: 'State has not expanded Medicaid' }
    },
    // HAWAII
    'Hawaii': {
        rent: { status: 'yellow', text: 'No state ban. High cost of living adjustments' },
        transit: { status: 'yellow', text: 'TheBus (Honolulu) widely used. Fares standard' },
        childcare: { status: 'yellow', text: 'Preschool Open Doors program' },
        medicare: { status: 'yellow', text: 'Prepaid Health Care Act mandates employer coverage' }
    },
    // IDAHO
    'Idaho': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'red', text: 'Limited public transit options' },
        childcare: { status: 'red', text: 'Limited state investment in early learning' },
        medicare: { status: 'yellow', text: 'Medicaid expanded by voter initiative' }
    },
    // ILLINOIS
    'Illinois': {
        rent: { status: 'red', text: 'Rent control banned (Rent Control Preemption Act)' },
        transit: { status: 'yellow', text: 'RTA system extensive. Fares standard' },
        childcare: { status: 'yellow', text: 'Smart Start Illinois plan expanding access' },
        medicare: { status: 'yellow', text: 'Medicaid expanded. Health Benefits for Immigrant Adults' }
    },
    // INDIANA
    'Indiana': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'red', text: 'Indianapolis Indigo expanding. Limited elsewhere' },
        childcare: { status: 'red', text: 'On My Way Pre-K limited to specific counties' },
        medicare: { status: 'yellow', text: 'Medicaid expanded (HIP 2.0)' }
    },
    // IOWA
    'Iowa': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'yellow', text: 'Des Moines DART fares standard' },
        childcare: { status: 'yellow', text: 'Child Care Assistance available' },
        medicare: { status: 'yellow', text: 'Medicaid expanded (Iowa Health and Wellness Plan)' }
    },
    // KANSAS
    'Kansas': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'yellow', text: 'Zero Fare program in Kansas City (KCATA)' },
        childcare: { status: 'yellow', text: 'Hero Relief Program grants' },
        medicare: { status: 'red', text: 'State has not expanded Medicaid' }
    },
    // KENTUCKY
    'Kentucky': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'yellow', text: 'TARC fares standard' },
        childcare: { status: 'yellow', text: 'Child Care Assistance Program (CCAP)' },
        medicare: { status: 'yellow', text: 'Medicaid expanded. High enrollment' }
    },
    // LOUISIANA
    'Louisiana': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'red', text: 'Limited transit funding' },
        childcare: { status: 'red', text: 'Cecil J. Picard LA 4 Program limited' },
        medicare: { status: 'yellow', text: 'Medicaid expanded in 2016' }
    },
    // MAINE
    'Maine': {
        rent: { status: 'yellow', text: 'Local rent control allowed (e.g., Portland)' },
        transit: { status: 'yellow', text: 'Metro fares standard. Expansion proposed' },
        childcare: { status: 'yellow', text: 'Child Care Subsidy Program' },
        medicare: { status: 'yellow', text: 'Medicaid expanded. MaineCare' }
    },
    // MARYLAND
    'Maryland': {
        rent: { status: 'yellow', text: 'Local rent control allowed (e.g., Montgomery Co)' },
        transit: { status: 'yellow', text: 'MTA Maryland extensive. Fares standard' },
        childcare: { status: 'yellow', text: 'Child Care Scholarship program' },
        medicare: { status: 'yellow', text: 'Medicaid expanded. Total Cost of Care Model' }
    },
    // MASSACHUSETTS
    'Massachusetts': {
        rent: { status: 'red', text: 'Rent control banned statewide since 1994' },
        transit: { status: 'yellow', text: 'MBTA fares standard. Free bus pilots in Boston' },
        childcare: { status: 'yellow', text: 'Commonwealth Preschool Partnership' },
        medicare: { status: 'yellow', text: 'MassHealth provides near-universal coverage' }
    },
    // MICHIGAN
    'Michigan': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'yellow', text: 'Local millages support transit' },
        childcare: { status: 'yellow', text: 'Great Start Readiness Program (GSRP)' },
        medicare: { status: 'yellow', text: 'Medicaid expanded (Healthy Michigan Plan)' }
    },
    // MINNESOTA
    'Minnesota': {
        rent: { status: 'yellow', text: 'Local rent control allowed with voter approval' },
        transit: { status: 'yellow', text: 'Metro Transit fares standard' },
        childcare: { status: 'yellow', text: 'Early Learning Scholarships' },
        medicare: { status: 'yellow', text: 'MinnesotaCare provides public option-like coverage' }
    },
    // MISSISSIPPI
    'Mississippi': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'red', text: 'Very limited public transit' },
        childcare: { status: 'red', text: 'Limited childcare certificates' },
        medicare: { status: 'red', text: 'State has not expanded Medicaid' }
    },
    // MISSOURI
    'Missouri': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'yellow', text: 'KCATA (Kansas City) is Zero Fare (Green)' },
        childcare: { status: 'yellow', text: 'Subsidy program available' },
        medicare: { status: 'yellow', text: 'Medicaid expanded by voter initiative' }
    },
    // MONTANA
    'Montana': {
        rent: { status: 'yellow', text: 'No state ban, but no local policies' },
        transit: { status: 'yellow', text: 'Streamline (Bozeman) is fare-free' },
        childcare: { status: 'yellow', text: 'Best Beginnings Scholarship' },
        medicare: { status: 'yellow', text: 'Medicaid expanded' }
    },
    // NEBRASKA
    'Nebraska': {
        rent: { status: 'yellow', text: 'No state ban. No local policies enacted' },
        transit: { status: 'yellow', text: 'Metro Transit (Omaha) fares standard' },
        childcare: { status: 'yellow', text: 'Child Care Subsidy program' },
        medicare: { status: 'yellow', text: 'Medicaid expanded by voter initiative' }
    },
    // NEVADA
    'Nevada': {
        rent: { status: 'red', text: 'No rent control. Summary eviction process fast' },
        transit: { status: 'yellow', text: 'RTC fares standard' },
        childcare: { status: 'yellow', text: 'Child Care and Development Fund' },
        medicare: { status: 'yellow', text: 'Medicaid expanded' }
    },
    // NEW HAMPSHIRE
    'New Hampshire': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'red', text: 'Limited transit options' },
        childcare: { status: 'yellow', text: 'NH Child Care Scholarship' },
        medicare: { status: 'yellow', text: 'Medicaid expanded (Granite Advantage)' }
    },
    // NEW JERSEY
    'New Jersey': {
        rent: { status: 'green', text: 'State allows strong local rent control (100+ cities)' },
        transit: { status: 'yellow', text: 'NJ Transit extensive. Fares standard' },
        childcare: { status: 'green', text: 'Abbott Districts provide free Pre-K' },
        medicare: { status: 'yellow', text: 'Medicaid expanded (NJ FamilyCare)' }
    },
    // NEW MEXICO
    'New Mexico': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'green', text: 'Zero Fare for Democracy (Free transit statewide)' },
        childcare: { status: 'green', text: 'Free childcare for most families (Constitutional Amendment)' },
        medicare: { status: 'yellow', text: 'Medicaid expanded' }
    },
    // NEW YORK
    'New York': {
        rent: { status: 'green', text: 'Rent Stabilization system in NYC and suburbs' },
        transit: { status: 'yellow', text: 'MTA/regional transit extensive' },
        childcare: { status: 'yellow', text: 'Empire State Child Credit' },
        medicare: { status: 'yellow', text: 'Essential Plan covers low-income residents' }
    },
    // NORTH CAROLINA
    'North Carolina': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'yellow', text: 'Local systems (CATS, GoTriangle) active' },
        childcare: { status: 'yellow', text: 'NC Pre-K program' },
        medicare: { status: 'yellow', text: 'Medicaid expanded in 2023' }
    },
    // NORTH DAKOTA
    'North Dakota': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'yellow', text: 'MATBUS fares standard' },
        childcare: { status: 'yellow', text: 'Child Care Assistance Program' },
        medicare: { status: 'yellow', text: 'Medicaid expanded' }
    },
    // OHIO
    'Ohio': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'yellow', text: 'COTA/GCRTA fares standard' },
        childcare: { status: 'yellow', text: 'Publicly Funded Child Care (PFCC)' },
        medicare: { status: 'yellow', text: 'Medicaid expanded' }
    },
    // OKLAHOMA
    'Oklahoma': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'yellow', text: 'Embark (OKC) fares standard' },
        childcare: { status: 'yellow', text: 'DHS Child Care Subsidy' },
        medicare: { status: 'yellow', text: 'Medicaid expanded by voter initiative' }
    },
    // OREGON
    'Oregon': {
        rent: { status: 'green', text: 'First statewide rent control (Cap: 7% + CPI)' },
        transit: { status: 'yellow', text: 'TriMet/LTD fares standard' },
        childcare: { status: 'yellow', text: 'Employment Related Day Care (ERDC)' },
        medicare: { status: 'yellow', text: 'Oregon Health Plan covers 95%+ of children/adults' }
    },
    // PENNSYLVANIA
    'Pennsylvania': {
        rent: { status: 'yellow', text: 'No state ban, but strict court interpretations' },
        transit: { status: 'yellow', text: 'SEPTA/PAAC extensive. Lottery funds seniors' },
        childcare: { status: 'yellow', text: 'Pre-K Counts program' },
        medicare: { status: 'yellow', text: 'Medicaid expanded' }
    },
    // RHODE ISLAND
    'Rhode Island': {
        rent: { status: 'yellow', text: 'No state ban. Local advocacy active' },
        transit: { status: 'yellow', text: 'RIPTA statewide system. Fares standard' },
        childcare: { status: 'yellow', text: 'Child Care Assistance Program' },
        medicare: { status: 'yellow', text: 'Medicaid expanded' }
    },
    // SOUTH CAROLINA
    'South Carolina': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'red', text: 'Limited transit infrastructure' },
        childcare: { status: 'yellow', text: 'First Steps 4K' },
        medicare: { status: 'red', text: 'State has not expanded Medicaid' }
    },
    // SOUTH DAKOTA
    'South Dakota': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'red', text: 'Limited transit options' },
        childcare: { status: 'yellow', text: 'Child Care Assistance' },
        medicare: { status: 'yellow', text: 'Medicaid expanded by voter initiative' }
    },
    // TENNESSEE
    'Tennessee': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'yellow', text: 'MATA/WeGo fares standard' },
        childcare: { status: 'yellow', text: 'Smart Steps program' },
        medicare: { status: 'red', text: 'State has not expanded Medicaid' }
    },
    // TEXAS
    'Texas': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'yellow', text: 'METRO/DART/CapMetro fares standard' },
        childcare: { status: 'red', text: 'Texas School Ready limited' },
        medicare: { status: 'red', text: 'State has not expanded Medicaid. Highest uninsured rate' }
    },
    // UTAH
    'Utah': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'yellow', text: 'UTA fares standard. Free Fare February pilots' },
        childcare: { status: 'yellow', text: 'Office of Child Care subsidies' },
        medicare: { status: 'yellow', text: 'Medicaid expanded by voter initiative' }
    },
    // VERMONT
    'Vermont': {
        rent: { status: 'yellow', text: 'No state ban. Burlington charter change proposed' },
        transit: { status: 'green', text: 'GMT currently Zero Fare (state funded)' },
        childcare: { status: 'green', text: 'Act 76 (2023) massive childcare investment' },
        medicare: { status: 'yellow', text: 'Dr. Dynasaur covers children/pregnant women broadly' }
    },
    // VIRGINIA
    'Virginia': {
        rent: { status: 'yellow', text: 'Dillon Rule limits local power. No rent control' },
        transit: { status: 'yellow', text: 'GRTC (Richmond) is Zero Fare' },
        childcare: { status: 'yellow', text: 'Child Care Subsidy Program' },
        medicare: { status: 'yellow', text: 'Medicaid expanded' }
    },
    // WASHINGTON
    'Washington': {
        rent: { status: 'red', text: 'Rent control banned by state law (1981)' },
        transit: { status: 'green', text: 'Youth ride free statewide (Move Ahead WA)' },
        childcare: { status: 'green', text: 'Fair Start for Kids Act investment' },
        medicare: { status: 'yellow', text: 'Apple Health available to all regardless of status' }
    },
    // WEST VIRGINIA
    'West Virginia': {
        rent: { status: 'yellow', text: 'No state ban. No local policies' },
        transit: { status: 'yellow', text: 'Mountain Line fares standard' },
        childcare: { status: 'yellow', text: 'Child Care Resource and Referral' },
        medicare: { status: 'yellow', text: 'Medicaid expanded' }
    },
    // WISCONSIN
    'Wisconsin': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'yellow', text: 'MCTS/Metro fares standard' },
        childcare: { status: 'yellow', text: 'Wisconsin Shares program' },
        medicare: { status: 'red', text: 'State has not expanded Medicaid' }
    },
    // WYOMING
    'Wyoming': {
        rent: { status: 'yellow', text: 'No state ban. No local policies' },
        transit: { status: 'red', text: 'Very limited transit' },
        childcare: { status: 'yellow', text: 'DFS Child Care Subsidy' },
        medicare: { status: 'red', text: 'State has not expanded Medicaid' }
    },
    // DISTRICT OF COLUMBIA
    'District of Columbia': {
        rent: { status: 'green', text: 'Rent control active since 1985. Caps on increases.' },
        transit: { status: 'green', text: 'Metro expanding. Reduced fares for low-income' },
        childcare: { status: 'yellow', text: 'Federal/local programs available. High cost of living' },
        medicare: { status: 'yellow', text: 'DC Healthcare Alliance covers eligible residents' }
    },
    // PUERTO RICO
    'Puerto Rico': {
        rent: { status: 'yellow', text: 'No formal rent control. Some local regulations vary' },
        transit: { status: 'yellow', text: 'Public transit available. Tren Urbano in San Juan' },
        childcare: { status: 'yellow', text: 'Head Start and local programs. Limited funding' },
        medicare: { status: 'yellow', text: 'Medicaid capped by federal government' }
    },
    // GUAM
    'Guam': {
        rent: { status: 'yellow', text: 'No rent control. High housing costs due to military presence' },
        transit: { status: 'red', text: 'Limited public transit. Mainly private vehicles' },
        childcare: { status: 'yellow', text: 'Federal programs available. High cost of living' },
        medicare: { status: 'yellow', text: 'Medicaid capped by federal government' }
    },
    // US VIRGIN ISLANDS
    'US Virgin Islands': {
        rent: { status: 'yellow', text: 'No rent control. Hurricane recovery affects housing' },
        transit: { status: 'red', text: 'Very limited public transit. Taxi and private vehicles' },
        childcare: { status: 'yellow', text: 'Federal Head Start programs. Limited local options' },
        medicare: { status: 'yellow', text: 'Medicaid capped by federal government' }
    },
    // AMERICAN SAMOA
    'American Samoa': {
        rent: { status: 'yellow', text: 'Traditional land tenure system. No formal rent control' },
        transit: { status: 'red', text: 'Minimal public transit. Private vehicles primary' },
        childcare: { status: 'yellow', text: 'Federal programs and extended family care common' },
        medicare: { status: 'yellow', text: 'Medicaid capped by federal government' }
    },
    // NORTHERN MARIANA ISLANDS
    'Northern Mariana Islands': {
        rent: { status: 'yellow', text: 'No rent control. Limited housing stock' },
        transit: { status: 'red', text: 'Very limited public transit system' },
        childcare: { status: 'yellow', text: 'Federal programs available. Family-based care common' },
        medicare: { status: 'yellow', text: 'Medicaid capped by federal government' }
    }
};

export const STATE_LOCATIONS = {
    Alabama: ['Birmingham', 'Montgomery', 'Mobile', 'Huntsville', 'Tuscaloosa', 'Hoover', 'Dothan', 'Auburn', 'Decatur', 'Madison', 'Florence', 'Gadsden', 'Vestavia Hills', 'Prattville', 'Phenix City', 'Alabaster', 'Bessemer', 'Enterprise', 'Opelika', 'Homewood', 'Northport', 'Anniston'],
    Alaska: ['Anchorage', 'Fairbanks', 'Juneau', 'Sitka', 'Ketchikan', 'Wasilla', 'Kenai', 'Kodiak', 'Bethel', 'Palmer', 'Homer', 'Soldotna', 'Barrow', 'Valdez', 'Nome', 'Kotzebue', 'Seward', 'Petersburg', 'Wrangell', 'Dillingham', 'Cordova', 'Skagway'],
    Arizona: ['Phoenix', 'Tucson', 'Mesa', 'Chandler', 'Flagstaff', 'Yuma', 'Scottsdale', 'Tempe', 'Peoria', 'Gilbert', 'Glendale', 'Surprise', 'Avondale', 'Goodyear', 'Prescott', 'Casa Grande', 'Lake Havasu City', 'Bullhead City', 'Sierra Vista', 'Maricopa', 'Oro Valley', 'Kingman'],
    Arkansas: ['Little Rock', 'Fort Smith', 'Fayetteville', 'Springdale', 'Jonesboro', 'North Little Rock', 'Conway', 'Rogers', 'Pine Bluff', 'Bentonville', 'Hot Springs', 'Benton', 'Texarkana', 'Sherwood', 'Jacksonville', 'Russellville', 'Bella Vista', 'West Memphis', 'Paragould', 'Cabot', 'Searcy', 'Van Buren'],
    California: ['Sacramento', 'Los Angeles', 'San Francisco', 'San Diego', 'San Jose', 'Oakland', 'Fresno', 'Long Beach', 'Bakersfield', 'Anaheim', 'Riverside', 'Stockton', 'Redding', 'Eureka', 'Chico', 'Modesto', 'Santa Rosa', 'Santa Barbara', 'Irvine', 'Fremont', 'Santa Clarita', 'Oxnard'],
    Colorado: ['Denver', 'Colorado Springs', 'Aurora', 'Fort Collins', 'Boulder', 'Grand Junction', 'Pueblo', 'Lakewood', 'Thornton', 'Arvada', 'Westminster', 'Centennial', 'Greeley', 'Longmont', 'Loveland', 'Broomfield', 'Castle Rock', 'Commerce City', 'Parker', 'Littleton', 'Northglenn', 'Brighton'],
    Connecticut: ['Hartford', 'New Haven', 'Stamford', 'Bridgeport', 'Waterbury', 'Norwalk', 'Danbury', 'New Britain', 'West Hartford', 'Greenwich', 'Hamden', 'Meriden', 'Bristol', 'Manchester', 'West Haven', 'Milford', 'Stratford', 'East Hartford', 'Middletown', 'Wallingford', 'Norwich', 'Shelton'],
    Delaware: ['Wilmington', 'Dover', 'Newark', 'Middletown', 'Rehoboth Beach', 'Smyrna', 'Milford', 'Seaford', 'Georgetown', 'Elsmere', 'New Castle', 'Lewes', 'Millsboro', 'Laurel', 'Harrington', 'Camden', 'Clayton', 'Bridgeville', 'Delmar', 'Townsend', 'Bear', 'Pike Creek'],
    Florida: ['Tallahassee', 'Miami', 'Orlando', 'Tampa', 'Jacksonville', 'St. Petersburg', 'Fort Lauderdale', 'Gainesville', 'Pensacola', 'Naples', 'Key West', 'Fort Myers', 'West Palm Beach', 'Lakeland', 'Sarasota', 'Clearwater', 'Port St. Lucie', 'Boca Raton', 'Daytona Beach', 'Kissimmee', 'Melbourne', 'Ocala'],
    Georgia: ['Atlanta', 'Savannah', 'Augusta', 'Columbus', 'Macon', 'Athens', 'Albany', 'Valdosta', 'Warner Robins', 'Marietta', 'Roswell', 'Sandy Springs', 'Johns Creek', 'Alpharetta', 'Gwinnett County', 'Cobb County', 'Smyrna', 'Dunwoody', 'Gainesville', 'Hinesville', 'Peachtree City', 'Newnan'],
    Hawaii: ['Honolulu', 'Hilo', 'Kailua-Kona', 'Kahului', 'Lahaina', 'Lihue', 'Wailuku', 'Kaunakakai', 'Lanai City', 'Wailea', 'Kihei', 'Hanalei', 'Pearl City', 'Kailua', 'Kaneohe', 'Waipahu', 'Ewa Beach', 'Mililani', 'Kapolei', 'Makakilo', 'Aiea', 'Halawa'],
    Idaho: ['Boise', 'Meridian', 'Nampa', 'Idaho Falls', 'Pocatello', 'Coeur d\'Alene', 'Twin Falls', 'Caldwell', 'Lewiston', 'Post Falls', 'Rexburg', 'Moscow', 'Eagle', 'Kuna', 'Ammon', 'Chubbuck', 'Hayden', 'Mountain Home', 'Blackfoot', 'Garden City', 'Jerome', 'Burley'],
    Illinois: ['Chicago', 'Springfield', 'Naperville', 'Peoria', 'Rockford', 'Champaign', 'Aurora', 'Joliet', 'Elgin', 'Waukegan', 'Cicero', 'Bloomington', 'Decatur', 'Evanston', 'Des Plaines', 'Berwyn', 'Wheaton', 'Belleville', 'Elmhurst', 'DeKalb', 'Moline', 'Skokie'],
    Indiana: ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend', 'Carmel', 'Bloomington', 'Fishers', 'Hammond', 'Gary', 'Muncie', 'Lafayette', 'Terre Haute', 'Kokomo', 'Anderson', 'Noblesville', 'Greenwood', 'Elkhart', 'Mishawaka', 'Lawrence', 'Jeffersonville', 'Columbus', 'Portage'],
    Iowa: ['Des Moines', 'Cedar Rapids', 'Davenport', 'Sioux City', 'Iowa City', 'Ames', 'Waterloo', 'Council Bluffs', 'Ankeny', 'Urbandale', 'West Des Moines', 'Dubuque', 'Cedar Falls', 'Marion', 'Bettendorf', 'Mason City', 'Marshalltown', 'Clinton', 'Burlington', 'Ottumwa', 'Fort Dodge', 'Muscatine'],
    Kansas: ['Topeka', 'Wichita', 'Overland Park', 'Kansas City', 'Lawrence', 'Olathe', 'Shawnee', 'Manhattan', 'Lenexa', 'Salina', 'Hutchinson', 'Leavenworth', 'Leawood', 'Dodge City', 'Garden City', 'Junction City', 'Emporia', 'Derby', 'Prairie Village', 'Hays', 'Liberal', 'Gardner'],
    Kentucky: ['Frankfort', 'Louisville', 'Lexington', 'Bowling Green', 'Covington', 'Owensboro', 'Hopkinsville', 'Richmond', 'Florence', 'Georgetown', 'Elizabethtown', 'Henderson', 'Nicholasville', 'Jeffersontown', 'Paducah', 'Frankfort', 'Ashland', 'Madisonville', 'Murray', 'Danville', 'Somerset', 'Radcliff'],
    Louisiana: ['New Orleans', 'Baton Rouge', 'Shreveport', 'Lafayette', 'Lake Charles', 'Monroe', 'Kenner', 'Bossier City', 'Alexandria', 'Houma', 'New Iberia', 'Slidell', 'Ruston', 'Hammond', 'Thibodaux', 'Natchitoches', 'Opelousas', 'Sulphur', 'Laplace', 'Mandeville', 'Zachary', 'Metairie'],
    Maine: ['Augusta', 'Portland', 'Lewiston', 'Bangor', 'Bar Harbor', 'Kennebunk', 'South Portland', 'Auburn', 'Biddeford', 'Sanford', 'Saco', 'Westbrook', 'Waterville', 'Presque Isle', 'Bath', 'Ellsworth', 'Old Orchard Beach', 'Belfast', 'Rockland', 'Caribou', 'Brunswick', 'Gorham'],
    Maryland: ['Baltimore', 'Annapolis', 'Rockville', 'Frederick', 'Gaithersburg', 'Bowie', 'Hagerstown', 'Towson', 'Salisbury', 'Cumberland', 'College Park', 'Greenbelt', 'Laurel', 'Hyattsville', 'Takoma Park', 'Easton', 'Westminster', 'Ocean City', 'Cambridge', 'Havre de Grace', 'Elkton', 'Aberdeen'],
    Massachusetts: ['Boston', 'Worcester', 'Cambridge', 'Lowell', 'Springfield', 'Northampton', 'New Bedford', 'Brockton', 'Quincy', 'Lynn', 'Fall River', 'Newton', 'Lawrence', 'Somerville', 'Framingham', 'Haverhill', 'Waltham', 'Malden', 'Brookline', 'Plymouth', 'Medford', 'Taunton'],
    Michigan: ['Lansing', 'Detroit', 'Grand Rapids', 'Ann Arbor', 'Flint', 'Traverse City', 'Kalamazoo', 'Saginaw', 'Dearborn', 'Sterling Heights', 'Warren', 'Livonia', 'Oakland County', 'Macomb County', 'Troy', 'Westland', 'Farmington Hills', 'Wyoming', 'Southfield', 'Rochester Hills', 'Taylor', 'St. Clair Shores'],
    Minnesota: ['Minneapolis', 'St. Paul', 'Rochester', 'Duluth', 'Bloomington', 'Brooklyn Park', 'Plymouth', 'Woodbury', 'Maple Grove', 'Blaine', 'Lakeville', 'Eagan', 'Burnsville', 'Eden Prairie', 'Coon Rapids', 'Minnetonka', 'Edina', 'St. Cloud', 'Mankato', 'Moorhead', 'Winona', 'Owatonna'],
    Mississippi: ['Jackson', 'Gulfport', 'Biloxi', 'Hattiesburg', 'Tupelo', 'Southaven', 'Meridian', 'Greenville', 'Vicksburg', 'Olive Branch', 'Horn Lake', 'Clinton', 'Pearl', 'Madison', 'Ridgeland', 'Starkville', 'Columbus', 'Laurel', 'Natchez', 'Clarksdale', 'Oxford', 'Pascagoula'],
    Missouri: ['Jefferson City', 'Kansas City', 'St. Louis', 'Springfield', 'Columbia', 'Independence', 'Lee\'s Summit', 'O\'Fallon', 'St. Joseph', 'St. Charles', 'Blue Springs', 'Florissant', 'Joplin', 'Chesterfield', 'Jefferson City', 'Cape Girardeau', 'Wildwood', 'University City', 'Ballwin', 'Raytown', 'Liberty', 'Wentzville'],
    Montana: ['Billings', 'Missoula', 'Helena', 'Great Falls', 'Bozeman', 'Kalispell', 'Butte', 'Whitefish', 'Belgrade', 'Livingston', 'Miles City', 'Havre', 'Anaconda', 'Lewistown', 'Dillon', 'Glendive', 'Sidney', 'Hamilton', 'Columbia Falls', 'Laurel', 'Polson', 'Hardin'],
    Nebraska: ['Omaha', 'Lincoln', 'Bellevue', 'Grand Island', 'Kearney', 'Fremont', 'Hastings', 'Norfolk', 'Columbus', 'Papillion', 'La Vista', 'Scottsbluff', 'North Platte', 'South Sioux City', 'Beatrice', 'Lexington', 'Gering', 'Alliance', 'York', 'McCook', 'Chadron', 'Blair'],
    Nevada: ['Carson City', 'Las Vegas', 'Reno', 'Henderson', 'Elko', 'Sparks', 'North Las Vegas', 'Clark County', 'Washoe County', 'Boulder City', 'Mesquite', 'Fernley', 'Fallon', 'Winnemucca', 'Ely', 'Pahrump', 'Spring Valley', 'Paradise', 'Enterprise', 'Sunrise Manor', 'Whitney', 'Spanish Springs'],
    'New Hampshire': ['Manchester', 'Nashua', 'Concord', 'Dover', 'Portsmouth', 'Hanover', 'Rochester', 'Salem', 'Derry', 'Londonderry', 'Keene', 'Bedford', 'Merrimack', 'Hudson', 'Laconia', 'Lebanon', 'Hampton', 'Durham', 'Exeter', 'Claremont', 'Somersworth', 'Goffstown'],
    'New Jersey': ['Trenton', 'Newark', 'Jersey City', 'Paterson', 'Atlantic City', 'Camden', 'Elizabeth', 'Woodbridge', 'Edison', 'Toms River', 'Hamilton', 'Clifton', 'Brick', 'Cherry Hill', 'Passaic', 'Union City', 'Bayonne', 'East Orange', 'Vineland', 'New Brunswick', 'Hoboken', 'Perth Amboy'],
    'New Mexico': ['Albuquerque', 'Santa Fe', 'Las Cruces', 'Rio Rancho', 'Farmington', 'Roswell', 'Clovis', 'Hobbs', 'Alamogordo', 'Carlsbad', 'Gallup', 'Los Alamos', 'Deming', 'Portales', 'Artesia', 'Lovington', 'Silver City', 'Las Vegas', 'Sunland Park', 'Ruidoso', 'Española', 'Grants'],
    'New York': ['Albany', 'New York City', 'Buffalo', 'Rochester', 'Syracuse', 'Yonkers', 'Poughkeepsie', 'Ithaca', 'Utica', 'White Plains', 'New Rochelle', 'Mount Vernon', 'Schenectady', 'Niagara Falls', 'Binghamton', 'Freeport', 'Troy', 'Elmira', 'Watertown', 'Jamestown', 'Saratoga Springs', 'Plattsburgh'],
    'North Carolina': ['Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Wilmington', 'Asheville', 'Winston-Salem', 'Fayetteville', 'High Point', 'Chapel Hill', 'Cary', 'Wake County', 'Mecklenburg County', 'Concord', 'Greenville', 'Jacksonville', 'Huntersville', 'Apex', 'Hickory', 'Kannapolis', 'Burlington', 'Gastonia'],
    'North Dakota': ['Fargo', 'Bismarck', 'Grand Forks', 'Minot', 'Williston', 'Dickinson', 'Mandan', 'Jamestown', 'West Fargo', 'Wahpeton', 'Devils Lake', 'Valley City', 'Watford City', 'Grafton', 'Beulah', 'Rugby', 'Bottineau', 'Hazen', 'Lisbon', 'Carrington', 'Mayville', 'Casselton'],
    Ohio: ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron', 'Dayton', 'Youngstown', 'Canton', 'Lorain', 'Parma', 'Lakewood', 'Hamilton County', 'Franklin County', 'Cuyahoga County', 'Warren', 'Elyria', 'Springfield', 'Kettering', 'Middletown', 'Newark', 'Mansfield', 'Beavercreek'],
    Oklahoma: ['Oklahoma City', 'Tulsa', 'Norman', 'Broken Arrow', 'Lawton', 'Edmond', 'Moore', 'Midwest City', 'Enid', 'Stillwater', 'Muskogee', 'Bartlesville', 'Owasso', 'Shawnee', 'Ponca City', 'Ardmore', 'Duncan', 'Yukon', 'Del City', 'Sapulpa', 'Jenks', 'Bethany'],
    Oregon: ['Portland', 'Eugene', 'Salem', 'Gresham', 'Bend', 'Medford', 'Corvallis', 'Hillsboro', 'Beaverton', 'Springfield', 'Lake Oswego', 'Tigard', 'Keizer', 'Oregon City', 'McMinnville', 'Grants Pass', 'Albany', 'Ashland', 'Redmond', 'Klamath Falls', 'Tualatin', 'West Linn'],
    Pennsylvania: ['Philadelphia', 'Pittsburgh', 'Harrisburg', 'Allentown', 'Erie', 'Scranton', 'Reading', 'Bethlehem', 'Lancaster', 'Wilkes-Barre', 'Bucks County', 'Chester County', 'Montgomery County', 'Delaware County', 'York', 'State College', 'Altoona', 'Williamsport', 'Easton', 'Lebanon', 'Hazleton', 'Chester'],
    'Rhode Island': ['Providence', 'Warwick', 'Cranston', 'Pawtucket', 'Newport', 'East Providence', 'Woonsocket', 'Coventry', 'Cumberland', 'North Providence', 'South Kingstown', 'West Warwick', 'Johnston', 'North Kingstown', 'Bristol', 'Westerly', 'Smithfield', 'Lincoln', 'Central Falls', 'Portsmouth', 'Barrington', 'Middletown'],
    'South Carolina': ['Columbia', 'Charleston', 'Greenville', 'Myrtle Beach', 'Spartanburg', 'Rock Hill', 'Mount Pleasant', 'North Charleston', 'Summerville', 'Goose Creek', 'Hilton Head Island', 'Florence', 'Aiken', 'Anderson', 'Greer', 'Sumter', 'Greenwood', 'North Augusta', 'Clemson', 'Easley', 'Beaufort', 'Conway'],
    'South Dakota': ['Pierre', 'Sioux Falls', 'Rapid City', 'Aberdeen', 'Brookings', 'Watertown', 'Mitchell', 'Yankton', 'Huron', 'Spearfish', 'Brandon', 'Box Elder', 'Vermillion', 'Sturgis', 'Madison', 'Belle Fourche', 'Winner', 'Mobridge', 'De Smet', 'Hot Springs', 'Custer', 'Deadwood'],
    Tennessee: ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga', 'Clarksville', 'Murfreesboro', 'Franklin', 'Jackson', 'Johnson City', 'Bartlett', 'Hendersonville', 'Kingsport', 'Collierville', 'Smyrna', 'Cleveland', 'Brentwood', 'Germantown', 'Columbia', 'Spring Hill', 'La Vergne', 'Gallatin', 'Mount Juliet'],
    Texas: ['Austin', 'Houston', 'Dallas', 'San Antonio', 'Fort Worth', 'El Paso', 'Arlington', 'Corpus Christi', 'Plano', 'Lubbock', 'Amarillo', 'Midland', 'Waco', 'Laredo', 'Irving', 'Garland', 'Frisco', 'McKinney', 'Killeen', 'Brownsville', 'Pasadena', 'Grand Prairie'],
    Utah: ['Salt Lake City', 'West Valley City', 'Provo', 'Orem', 'St. George', 'Park City', 'West Jordan', 'Layton', 'Taylorsville', 'South Jordan', 'Sandy', 'Ogden', 'Lehi', 'Murray', 'Bountiful', 'Draper', 'Riverton', 'Roy', 'Spanish Fork', 'Pleasant Grove', 'Cottonwood Heights', 'Logan'],
    Vermont: ['Montpelier', 'Burlington', 'South Burlington', 'Rutland', 'Brattleboro', 'Stowe', 'Essex Junction', 'Colchester', 'Bennington', 'Hartford', 'Williston', 'Middlebury', 'St. Albans', 'Winooski', 'Barre', 'Woodstock', 'Manchester', 'Killington', 'Shelburne', 'Milton', 'St. Johnsbury', 'Newport'],
    Virginia: ['Richmond', 'Virginia Beach', 'Norfolk', 'Chesapeake', 'Arlington', 'Roanoke', 'Alexandria', 'Newport News', 'Hampton', 'Suffolk', 'Lynchburg', 'Harrisonburg', 'Leesburg', 'Charlottesville', 'Blacksburg', 'Danville', 'Manassas', 'Petersburg', 'Fredericksburg', 'Winchester', 'Salem', 'Staunton'],
    Washington: ['Olympia', 'Seattle', 'Spokane', 'Tacoma', 'Bellingham', 'Yakima', 'Vancouver', 'Kent', 'Everett', 'Renton', 'Bellevue', 'Federal Way', 'Spokane Valley', 'Kirkland', 'Redmond', 'Kennewick', 'Auburn', 'Pasco', 'Marysville', 'Lakewood', 'Sammamish', 'Richland'],
    'West Virginia': ['Charleston', 'Huntington', 'Morgantown', 'Parkersburg', 'Wheeling', 'Weirton', 'Fairmont', 'Martinsburg', 'Beckley', 'Clarksburg', 'South Charleston', 'St. Albans', 'Vienna', 'Bluefield', 'Moundsville', 'Bridgeport', 'Dunbar', 'Oak Hill', 'Nitro', 'Charles Town', 'Elkins', 'Buckhannon'],
    Wisconsin: ['Madison', 'Milwaukee', 'Green Bay', 'Kenosha', 'Racine', 'Appleton', 'Waukesha', 'Eau Claire', 'Oshkosh', 'West Allis', 'Brookfield', 'Dane County', 'Janesville', 'La Crosse', 'Sheboygan', 'Wauwatosa', 'Fond du Lac', 'New Berlin', 'Wausau', 'Greenfield', 'Beloit', 'Franklin'],
    Wyoming: ['Cheyenne', 'Casper', 'Laramie', 'Gillette', 'Rock Springs', 'Sheridan', 'Green River', 'Evanston', 'Riverton', 'Jackson', 'Cody', 'Rawlins', 'Lander', 'Torrington', 'Powell', 'Douglas', 'Worland', 'Buffalo', 'Thermopolis', 'Newcastle', 'Wheatland', 'Kemmerer'],
    'District of Columbia': ['Washington'],
    // US TERRITORIES
    'Puerto Rico': ['San Juan', 'Ponce', 'Mayagüez', 'Caguas', 'Bayamón', 'Carolina', 'Arecibo'],
    'Guam': ['Hagåtña', 'Dededo', 'Tamuning', 'Yigo', 'Mangilao'],
    'US Virgin Islands': ['Charlotte Amalie', 'Christiansted', 'Frederiksted', 'Cruz Bay'],
    'American Samoa': ['Pago Pago', 'Tafuna', 'Leone', 'Fagatogo'],
    'Northern Mariana Islands': ['Saipan', 'Tinian', 'Rota']
};

// Location-specific policy overrides
export const LOCATION_OVERRIDES = {
    // ========================================
    // CALIFORNIA - Major State
    // ========================================
    'San Francisco, California': {
        rent: { status: 'green', text: 'Strong rent control caps increases at 60% of CPI' },
        transit: { status: 'green', text: 'MUNI free for youth, seniors get discounts' },
        childcare: { status: 'green', text: 'Universal preschool. Subsidies for families <$150k' },
        medicare: { status: 'yellow', text: 'Healthy San Francisco provides universal access' }
    },
    'Los Angeles, California': {
        rent: { status: 'green', text: 'RSO covers pre-1978 units. 4% cap (2024)' },
        transit: { status: 'yellow', text: 'Metro $1.75. Free for students (GoPass)' },
        childcare: { status: 'yellow', text: 'UPK expansion ongoing' },
        medicare: { status: 'yellow', text: 'My Health LA covers uninsured residents' }
    },
    'Oakland, California': {
        rent: { status: 'green', text: 'Rent Adjustment Program with strict caps' },
        transit: { status: 'yellow', text: 'AC Transit free for youth under 18' },
        childcare: { status: 'green', text: 'Oakland Preschool for All (Measure AA)' },
        medicare: { status: 'yellow', text: 'Alameda County HealthPAC available' }
    },
    'Berkeley, California': {
        rent: { status: 'green', text: 'Rent Stabilization Board sets strict limits' },
        transit: { status: 'green', text: 'AC Transit. EasyPass for students' },
        childcare: { status: 'green', text: 'Universal preschool initiative' },
        medicare: { status: 'yellow', text: 'Berkeley Free Clinic available' }
    },
    'San Jose, California': {
        rent: { status: 'green', text: 'Apartment Rent Ordinance limits increases' },
        transit: { status: 'yellow', text: 'VTA light rail. Youth ride free' },
        childcare: { status: 'yellow', text: 'Preschool for All program expanding' },
        medicare: { status: 'yellow', text: 'Valley Health Plan covers low-income' }
    },
    'Santa Monica, California': {
        rent: { status: 'green', text: 'Rent Control Charter Amendment active since 1979' },
        transit: { status: 'green', text: 'Big Blue Bus $1.10. Free for seniors/disabled' },
        childcare: { status: 'green', text: 'Cradle to Career initiative' },
        medicare: { status: 'yellow', text: 'Westside Family Health Center access' }
    },
    'West Hollywood, California': {
        rent: { status: 'green', text: 'Rent Stabilization Ordinance active' },
        transit: { status: 'green', text: 'Free CityLine shuttle service' },
        childcare: { status: 'yellow', text: 'Limited local programs, state support' },
        medicare: { status: 'yellow', text: 'Saban Community Clinic partnership' }
    },
    'Beverly Hills, California': {
        rent: { status: 'green', text: 'Rent stabilization for older units' },
        transit: { status: 'yellow', text: 'Metro access but car-dependent' },
        childcare: { status: 'yellow', text: 'High-quality private options dominate' },
        medicare: { status: 'yellow', text: 'Private insurance dominates' }
    },
    'East Palo Alto, California': {
        rent: { status: 'green', text: 'Rent stabilization passed 2016' },
        transit: { status: 'yellow', text: 'Caltrain and SamTrans access' },
        childcare: { status: 'yellow', text: 'State programs, limited local funding' },
        medicare: { status: 'yellow', text: 'Ravenswood Family Health Network' }
    },
    'Alameda, California': {
        rent: { status: 'green', text: 'Rent review and just cause eviction protections' },
        transit: { status: 'yellow', text: 'AC Transit serves city' },
        childcare: { status: 'yellow', text: 'Alameda Unified programs' },
        medicare: { status: 'yellow', text: 'Alameda Health System access' }
    },
    'Richmond, California': {
        rent: { status: 'green', text: 'Rent control ordinance covers most units' },
        transit: { status: 'yellow', text: 'AC Transit and BART access' },
        childcare: { status: 'yellow', text: 'West Contra Costa USD programs' },
        medicare: { status: 'yellow', text: 'Contra Costa Health Plan' }
    },
    'San Diego, California': {
        rent: { status: 'yellow', text: 'AB 1482 state protections. No local control' },
        transit: { status: 'yellow', text: 'MTS Trolley and buses. Youth discounts' },
        childcare: { status: 'yellow', text: 'First 5 San Diego programs' },
        medicare: { status: 'yellow', text: 'Family Health Centers of San Diego' }
    },
    'Sacramento, California': {
        rent: { status: 'yellow', text: 'State protections only. Working on local ordinance' },
        transit: { status: 'yellow', text: 'SacRT light rail and buses' },
        childcare: { status: 'yellow', text: 'SCUSD Early Learning programs' },
        medicare: { status: 'yellow', text: 'Sacramento County Health Center' }
    },
    'Fresno, California': {
        rent: { status: 'yellow', text: 'State AB 1482 protections apply' },
        transit: { status: 'yellow', text: 'FAX buses, standard fares' },
        childcare: { status: 'yellow', text: 'Fresno USD State Preschool' },
        medicare: { status: 'yellow', text: 'Clinica Sierra Vista access' }
    },
    'Long Beach, California': {
        rent: { status: 'yellow', text: 'State rent cap, no local ordinance' },
        transit: { status: 'yellow', text: 'Metro, LB Transit. Some free routes' },
        childcare: { status: 'yellow', text: 'LBUSD Early Childhood Education' },
        medicare: { status: 'yellow', text: 'Long Beach Health Department clinics' }
    },
    'Pasadena, California': {
        rent: { status: 'yellow', text: 'Tenant protections, relocation assistance' },
        transit: { status: 'yellow', text: 'Metro Gold Line, Pasadena Transit' },
        childcare: { status: 'yellow', text: 'PUSD preschool programs' },
        medicare: { status: 'yellow', text: 'Pasadena Public Health Department' }
    },
    'Glendale, California': {
        rent: { status: 'yellow', text: 'Just cause eviction, no rent control' },
        transit: { status: 'yellow', text: 'Beeline buses, Metro access' },
        childcare: { status: 'yellow', text: 'GUSD Early Childhood programs' },
        medicare: { status: 'yellow', text: 'Comprehensive Health Center access' }
    },
    'Santa Clara, California': {
        rent: { status: 'green', text: 'Rent Stabilization Ordinance 2017' },
        transit: { status: 'yellow', text: 'VTA light rail and buses' },
        childcare: { status: 'yellow', text: 'Santa Clara USD programs' },
        medicare: { status: 'yellow', text: 'Valley Medical Center access' }
    },
    'Fremont, California': {
        rent: { status: 'yellow', text: 'Tenant protections, state AB 1482 applies' },
        transit: { status: 'yellow', text: 'AC Transit, BART Warm Springs station' },
        childcare: { status: 'yellow', text: 'FUSD Early Learning' },
        medicare: { status: 'yellow', text: 'Tri-City Health Center' }
    },
    'Hayward, California': {
        rent: { status: 'green', text: 'Rent Review Ordinance with caps' },
        transit: { status: 'yellow', text: 'AC Transit, BART stations' },
        childcare: { status: 'yellow', text: 'HUSD preschool programs' },
        medicare: { status: 'yellow', text: 'Tiburcio Vasquez Health Center' }
    },
    'Sunnyvale, California': {
        rent: { status: 'yellow', text: 'Rental rights ordinance, no caps' },
        transit: { status: 'yellow', text: 'VTA and Caltrain access' },
        childcare: { status: 'yellow', text: 'Community Resources for Children' },
        medicare: { status: 'yellow', text: 'MayView Community Health Center' }
    },
    'Mountain View, California': {
        rent: { status: 'green', text: 'Community Stabilization and Fair Rent Act' },
        transit: { status: 'yellow', text: 'VTA, Caltrain, Google shuttles' },
        childcare: { status: 'yellow', text: 'MVWSD Early Childhood' },
        medicare: { status: 'yellow', text: 'MayView Community Health Center' }
    },
    'Concord, California': {
        rent: { status: 'yellow', text: 'Just cause eviction protections' },
        transit: { status: 'yellow', text: 'County Connection buses, BART' },
        childcare: { status: 'yellow', text: 'MDUSD preschool programs' },
        medicare: { status: 'yellow', text: 'Contra Costa Health Services' }
    },
    'Daly City, California': {
        rent: { status: 'yellow', text: 'State AB 1482 protections' },
        transit: { status: 'yellow', text: 'BART, SamTrans buses' },
        childcare: { status: 'yellow', text: 'JUHSD Early Learning' },
        medicare: { status: 'yellow', text: 'San Mateo Medical Center clinics' }
    },
    'San Mateo, California': {
        rent: { status: 'yellow', text: 'Just cause eviction, relocation assistance' },
        transit: { status: 'yellow', text: 'Caltrain, SamTrans buses' },
        childcare: { status: 'yellow', text: 'SMFCSD programs' },
        medicare: { status: 'yellow', text: 'San Mateo Medical Center' }
    },
    'Redwood City, California': {
        rent: { status: 'yellow', text: 'Rental assistance programs available' },
        transit: { status: 'yellow', text: 'Caltrain hub, SamTrans' },
        childcare: { status: 'yellow', text: 'RCSD Early Childhood' },
        medicare: { status: 'yellow', text: 'Fair Oaks Health Center' }
    },
    'Union City, California': {
        rent: { status: 'green', text: 'Rent Review Ordinance active' },
        transit: { status: 'yellow', text: 'AC Transit, BART Warm Springs nearby' },
        childcare: { status: 'yellow', text: 'NHUSD preschool' },
        medicare: { status: 'yellow', text: 'Tiburcio Vasquez Health Center' }
    },
    'San Leandro, California': {
        rent: { status: 'yellow', text: 'Just cause eviction protections' },
        transit: { status: 'yellow', text: 'AC Transit, BART stations' },
        childcare: { status: 'yellow', text: 'SLZUSD Early Learning' },
        medicare: { status: 'yellow', text: 'Davis Street Family Resource Center' }
    },
    'Burbank, California': {
        rent: { status: 'yellow', text: 'Tenant protections, no rent control' },
        transit: { status: 'yellow', text: 'Metro B Line, Metrolink' },
        childcare: { status: 'yellow', text: 'BUSD Early Childhood' },
        medicare: { status: 'yellow', text: 'Providence Saint Joseph Medical Center' }
    },
    'Inglewood, California': {
        rent: { status: 'yellow', text: 'State AB 1482 applies' },
        transit: { status: 'green', text: 'Metro K Line. Free youth transit' },
        childcare: { status: 'yellow', text: 'IUSD preschool programs' },
        medicare: { status: 'yellow', text: 'South Bay Family Health Care' }
    },

    // ========================================
    // OTHER STATES - Sample entries to demonstrate format
    // ========================================
    'New York City, New York': {
        rent: { status: 'green', text: 'Rent Stabilization covers 1M+ units' },
        transit: { status: 'green', text: 'Fair Fares NYC (50% off). Free buses pilot' },
        childcare: { status: 'green', text: '3-K and Pre-K for All (Universal)' },
        medicare: { status: 'yellow', text: 'NYC Care guarantees healthcare for all' }
    },
    'Albany, New York': {
        rent: { status: 'green', text: 'Emergency Tenant Protection Act applies' },
        transit: { status: 'yellow', text: 'CDTA bus system' },
        childcare: { status: 'yellow', text: 'Universal Pre-K available' },
        medicare: { status: 'yellow', text: 'Whitney M. Young, Jr. Health Center' }
    },
    'Boston, Massachusetts': {
        rent: { status: 'red', text: 'Rent control banned statewide (1994 referendum)' },
        transit: { status: 'green', text: 'Free Bus Routes 23, 28, 29' },
        childcare: { status: 'green', text: 'Universal Pre-K expansion' },
        medicare: { status: 'yellow', text: 'Boston Medical Center safety net' }
    },
    'Cambridge, Massachusetts': {
        rent: { status: 'red', text: 'State ban on rent control since 1994' },
        transit: { status: 'green', text: 'MBTA Red Line. Buses free for youth' },
        childcare: { status: 'green', text: 'Cambridge Preschool Program (Universal)' },
        medicare: { status: 'yellow', text: 'Cambridge Health Alliance safety net' }
    },
    'Seattle, Washington': {
        rent: { status: 'red', text: 'State ban prevents rent control' },
        transit: { status: 'green', text: 'Free transit for youth (18 & under)' },
        childcare: { status: 'green', text: 'Seattle Preschool Program (SPP)' },
        medicare: { status: 'yellow', text: 'Neighborcare Health clinics' }
    },
    'Olympia, Washington': {
        rent: { status: 'red', text: 'State preemption on rent control' },
        transit: { status: 'green', text: 'Intercity Transit Zero Fare since 2020' },
        childcare: { status: 'yellow', text: 'Early learning programs, ECEAP' },
        medicare: { status: 'yellow', text: 'Sea Mar Community Health Centers' }
    },
    'Portland, Oregon': {
        rent: { status: 'green', text: 'State rent control (7% + CPI). Local protections' },
        transit: { status: 'green', text: 'TriMet. Free for low-income (Honored Citizen)' },
        childcare: { status: 'green', text: 'Preschool for All (Multnomah County)' },
        medicare: { status: 'yellow', text: 'Multnomah County Health Centers' }
    },
    'Eugene, Oregon': {
        rent: { status: 'green', text: 'Covered by state rent control law' },
        transit: { status: 'yellow', text: 'LTD EmX bus rapid transit' },
        childcare: { status: 'yellow', text: 'Relief nurseries and Head Start' },
        medicare: { status: 'yellow', text: 'Community Health Centers of Lane County' }
    },
    'Denver, Colorado': {
        rent: { status: 'yellow', text: 'Working to repeal state rent control ban' },
        transit: { status: 'yellow', text: 'RTD light rail. Youth discounts' },
        childcare: { status: 'green', text: 'Denver Preschool Program (DPP)' },
        medicare: { status: 'yellow', text: 'Denver Health provides safety net care' }
    },
    'St. Paul, Minnesota': {
        rent: { status: 'green', text: 'Rent Stabilization Ordinance - 3% cap' },
        transit: { status: 'green', text: 'Metro Transit. Reduced fare programs' },
        childcare: { status: 'yellow', text: 'Saint Paul Promise Neighborhood' },
        medicare: { status: 'yellow', text: 'Ramsey County public health clinics' }
    },
    'Minneapolis, Minnesota': {
        rent: { status: 'yellow', text: 'Considering rent control, strong protections exist' },
        transit: { status: 'green', text: 'Metro Transit light rail and buses' },
        childcare: { status: 'yellow', text: 'Early Learning Scholarships' },
        medicare: { status: 'yellow', text: 'Hennepin County Medical Center safety net' }
    },
    'Kansas City, Missouri': {
        rent: { status: 'red', text: 'State ban on rent control' },
        transit: { status: 'green', text: 'RideKC Zero Fare - first major US city!' },
        childcare: { status: 'yellow', text: 'KC Early Learning program' },
        medicare: { status: 'yellow', text: 'Truman Medical Centers safety net' }
    },
    'Tucson, Arizona': {
        rent: { status: 'red', text: 'State ban on rent control' },
        transit: { status: 'green', text: 'Sun Tran fare-free permanently' },
        childcare: { status: 'yellow', text: 'Pima Early Education Program' },
        medicare: { status: 'yellow', text: 'El Rio Community Health Center' }
    },
    'Albuquerque, New Mexico': {
        rent: { status: 'red', text: 'State ban on rent control' },
        transit: { status: 'green', text: 'Zero Fares pilot made permanent' },
        childcare: { status: 'green', text: 'Free childcare for most families (NM)' },
        medicare: { status: 'yellow', text: 'UNM Hospital safety net' }
    },

    // ========================================
    // PENNSYLVANIA - Swing State
    // ========================================
    'Philadelphia, Pennsylvania': {
        rent: { status: 'yellow', text: 'No rent control. Fair Housing enforced' },
        transit: { status: 'green', text: 'SEPTA. Free for K-12 students' },
        childcare: { status: 'green', text: 'PHLpreK for 3- and 4-year-olds' },
        medicare: { status: 'yellow', text: 'City health centers provide free care' }
    },
    'Pittsburgh, Pennsylvania': {
        rent: { status: 'yellow', text: 'Rental registration. No rent control' },
        transit: { status: 'yellow', text: 'Port Authority buses and light rail' },
        childcare: { status: 'yellow', text: 'PA Pre-K Counts program' },
        medicare: { status: 'yellow', text: 'UPMC and AHN charity care programs' }
    },
    'Erie, Pennsylvania': {
        rent: { status: 'yellow', text: 'No rent control. Affordable overall' },
        transit: { status: 'yellow', text: 'EMTA buses' },
        childcare: { status: 'yellow', text: 'PA Pre-K Counts' },
        medicare: { status: 'yellow', text: 'Community Health Net' }
    },
    'Allentown, Pennsylvania': {
        rent: { status: 'yellow', text: 'No rent control. Moderate costs' },
        transit: { status: 'yellow', text: 'LANTA buses' },
        childcare: { status: 'yellow', text: 'Pre-K programs available' },
        medicare: { status: 'yellow', text: 'Neighborhood Health Centers' }
    },
    'Scranton, Pennsylvania': {
        rent: { status: 'yellow', text: 'No rent control. Low costs' },
        transit: { status: 'yellow', text: 'COLTS buses' },
        childcare: { status: 'yellow', text: 'Head Start programs' },
        medicare: { status: 'yellow', text: 'Wright Center for Community Health' }
    },

    // ========================================
    // OHIO - Swing State
    // ========================================
    'Columbus, Ohio': {
        rent: { status: 'yellow', text: 'No rent control. Tenant protections' },
        transit: { status: 'yellow', text: 'COTA. Free for kids under 6' },
        childcare: { status: 'yellow', text: 'Publicly Funded Child Care (PFCC)' },
        medicare: { status: 'yellow', text: 'PrimaryOne Health centers' }
    },
    'Cleveland, Ohio': {
        rent: { status: 'yellow', text: 'Lead Safe Cleveland includes rentals' },
        transit: { status: 'yellow', text: 'RTA light rail and buses' },
        childcare: { status: 'yellow', text: 'PRE4CLE preschool initiative' },
        medicare: { status: 'yellow', text: 'MetroHealth system safety net' }
    },
    'Cincinnati, Ohio': {
        rent: { status: 'yellow', text: 'No rent control. Affordable' },
        transit: { status: 'yellow', text: 'Metro buses, streetcar free' },
        childcare: { status: 'yellow', text: 'Cincinnati Preschool Promise' },
        medicare: { status: 'yellow', text: 'Cincinnati Health Department clinics' }
    },
    'Toledo, Ohio': {
        rent: { status: 'yellow', text: 'No rent control. Low costs' },
        transit: { status: 'yellow', text: 'TARTA buses' },
        childcare: { status: 'yellow', text: 'United Way programs' },
        medicare: { status: 'yellow', text: 'Neighborhood Health Association' }
    },
    'Akron, Ohio': {
        rent: { status: 'yellow', text: 'No rent control. Very affordable' },
        transit: { status: 'yellow', text: 'Metro RTA buses' },
        childcare: { status: 'yellow', text: 'Summit County programs' },
        medicare: { status: 'yellow', text: 'AxessPointe Community Health Centers' }
    },
    'Dayton, Ohio': {
        rent: { status: 'yellow', text: 'No rent control. Very affordable' },
        transit: { status: 'yellow', text: 'RTA buses' },
        childcare: { status: 'yellow', text: 'Learn to Earn Dayton' },
        medicare: { status: 'yellow', text: 'Five Rivers Health Centers' }
    },

    // ========================================
    // MICHIGAN - Swing State  
    // ========================================
    'Detroit, Michigan': {
        rent: { status: 'red', text: 'No rent control. Low vacancy rates' },
        transit: { status: 'yellow', text: 'DDOT/SMART buses. QLine streetcar' },
        childcare: { status: 'yellow', text: 'Great Start Readiness Program' },
        medicare: { status: 'yellow', text: 'Detroit Health Department clinics' }
    },
    'Grand Rapids, Michigan': {
        rent: { status: 'yellow', text: 'No rent control. Moderate costs' },
        transit: { status: 'yellow', text: 'The Rapid buses. Silver Line BRT' },
        childcare: { status: 'yellow', text: 'Great Start Readiness' },
        medicare: { status: 'yellow', text: 'Cherry Health centers' }
    },
    'Ann Arbor, Michigan': {
        rent: { status: 'yellow', text: 'No rent control. Strong tenant rights' },
        transit: { status: 'green', text: 'TheRide buses free for UM students' },
        childcare: { status: 'yellow', text: 'Strong preschool programs' },
        medicare: { status: 'yellow', text: 'Packard Health clinics' }
    },
    'Flint, Michigan': {
        rent: { status: 'yellow', text: 'No rent control. Very low costs' },
        transit: { status: 'yellow', text: 'MTA buses' },
        childcare: { status: 'yellow', text: 'Recovery programs post-crisis' },
        medicare: { status: 'yellow', text: 'Hamilton Community Health Network' }
    },
    'Lansing, Michigan': {
        rent: { status: 'yellow', text: 'No rent control. Affordable' },
        transit: { status: 'yellow', text: 'CATA buses' },
        childcare: { status: 'yellow', text: 'Capital Area programs' },
        medicare: { status: 'yellow', text: 'Ingham Community Health Centers' }
    },

    // ========================================
    // WISCONSIN - Swing State
    // ========================================
    'Madison, Wisconsin': {
        rent: { status: 'red', text: 'State ban on rent control since 1995' },
        transit: { status: 'yellow', text: 'Metro Transit free for UW students' },
        childcare: { status: 'yellow', text: '4-K program for 4-year-olds' },
        medicare: { status: 'yellow', text: 'Access Community Health Centers' }
    },
    'Milwaukee, Wisconsin': {
        rent: { status: 'red', text: 'State preemption prevents rent control' },
        transit: { status: 'yellow', text: 'MCTS bus system. Hop streetcar' },
        childcare: { status: 'yellow', text: 'Milwaukee Succeeds early learning' },
        medicare: { status: 'yellow', text: 'Milwaukee Health Services' }
    },
    'Green Bay, Wisconsin': {
        rent: { status: 'red', text: 'State ban on rent control' },
        transit: { status: 'yellow', text: 'Green Bay Metro' },
        childcare: { status: 'yellow', text: 'YoungStar Wisconsin' },
        medicare: { status: 'yellow', text: 'N.E.W. Community Clinic' }
    },
    'Kenosha, Wisconsin': {
        rent: { status: 'red', text: 'No rent control allowed' },
        transit: { status: 'yellow', text: 'Kenosha Transit' },
        childcare: { status: 'yellow', text: 'KUSD 4K program' },
        medicare: { status: 'yellow', text: 'Kenosha Community Health Center' }
    },

    // ========================================
    // GEORGIA - Swing State
    // ========================================
    'Atlanta, Georgia': {
        rent: { status: 'yellow', text: 'No rent control. Inclusionary zoning' },
        transit: { status: 'yellow', text: 'MARTA rail/bus. Student discounts' },
        childcare: { status: 'yellow', text: 'Atlanta Pre-K expanding' },
        medicare: { status: 'yellow', text: 'Grady Health System safety net' }
    },
    'Savannah, Georgia': {
        rent: { status: 'yellow', text: 'Historic preservation affects rentals' },
        transit: { status: 'yellow', text: 'CAT. Free DOT shuttle' },
        childcare: { status: 'yellow', text: 'Quality Rated Pre-K' },
        medicare: { status: 'yellow', text: 'Curtis V. Cooper Primary Health Care' }
    },
    'Augusta, Georgia': {
        rent: { status: 'yellow', text: 'No rent control. Low costs' },
        transit: { status: 'red', text: 'Augusta Public Transit limited' },
        childcare: { status: 'yellow', text: 'Georgia Pre-K available' },
        medicare: { status: 'yellow', text: 'Christ Community Health Services' }
    },
    'Columbus, Georgia': {
        rent: { status: 'yellow', text: 'No rent control. Affordable' },
        transit: { status: 'yellow', text: 'METRA buses' },
        childcare: { status: 'yellow', text: 'Pre-K programs' },
        medicare: { status: 'yellow', text: 'Valley Healthcare System' }
    },

    // ========================================
    // NORTH CAROLINA - Swing State
    // ========================================
    'Charlotte, North Carolina': {
        rent: { status: 'yellow', text: 'No rent control. Tenant rights exist' },
        transit: { status: 'yellow', text: 'CATS light rail and buses' },
        childcare: { status: 'yellow', text: 'NC Pre-K program' },
        medicare: { status: 'yellow', text: 'Atrium Health community clinics' }
    },
    'Raleigh, North Carolina': {
        rent: { status: 'yellow', text: 'No rent control. Affordable housing push' },
        transit: { status: 'yellow', text: 'GoRaleigh buses' },
        childcare: { status: 'yellow', text: 'Wake County Smart Start' },
        medicare: { status: 'yellow', text: 'Advance Community Health' }
    },
    'Durham, North Carolina': {
        rent: { status: 'yellow', text: 'No rent control. Housing initiatives' },
        transit: { status: 'yellow', text: 'GoDurham. GoTriangle' },
        childcare: { status: 'yellow', text: 'Durham Pre-K' },
        medicare: { status: 'yellow', text: 'Lincoln Community Health Center' }
    },
    'Greensboro, North Carolina': {
        rent: { status: 'yellow', text: 'No rent control. Moderate' },
        transit: { status: 'yellow', text: 'GTA buses' },
        childcare: { status: 'yellow', text: 'Guilford County Pre-K' },
        medicare: { status: 'yellow', text: 'Triad Adult and Pediatric Medicine' }
    },
    'Winston-Salem, North Carolina': {
        rent: { status: 'yellow', text: 'No rent control. Affordable' },
        transit: { status: 'yellow', text: 'WSTA buses' },
        childcare: { status: 'yellow', text: 'Forsyth County Pre-K' },
        medicare: { status: 'yellow', text: 'United Health Centers' }
    },

    // ========================================
    // ARIZONA - Swing State
    // ========================================
    'Phoenix, Arizona': {
        rent: { status: 'red', text: 'State ban on rent control' },
        transit: { status: 'yellow', text: 'Valley Metro light rail expanding' },
        childcare: { status: 'yellow', text: 'Quality First scholarships' },
        medicare: { status: 'yellow', text: 'Medicaid expanded. AHCCCS covers low-income' }
    },
    'Mesa, Arizona': {
        rent: { status: 'red', text: 'No rent control permitted' },
        transit: { status: 'yellow', text: 'Valley Metro access' },
        childcare: { status: 'yellow', text: 'MPS Early Childhood' },
        medicare: { status: 'yellow', text: 'AHCCCS coverage available' }
    },
    'Scottsdale, Arizona': {
        rent: { status: 'red', text: 'State preemption' },
        transit: { status: 'yellow', text: 'Valley Metro Trolley' },
        childcare: { status: 'yellow', text: 'SUSD programs' },
        medicare: { status: 'yellow', text: 'HonorHealth charity care available' }
    },
    'Tempe, Arizona': {
        rent: { status: 'red', text: 'No rent control allowed' },
        transit: { status: 'yellow', text: 'Valley Metro. Free Orbit' },
        childcare: { status: 'yellow', text: 'TUHSD Early Learning' },
        medicare: { status: 'yellow', text: 'AHCCCS and community health centers' }
    },

    // ========================================
    // NEVADA - Swing State
    // ========================================
    'Las Vegas, Nevada': {
        rent: { status: 'yellow', text: 'No rent control. Rapid increases' },
        transit: { status: 'yellow', text: 'RTC buses. Deuce on Strip' },
        childcare: { status: 'yellow', text: 'Nevada Ready Pre-K' },
        medicare: { status: 'yellow', text: 'Medicaid expanded. Community Health Alliance' }
    },
    'Reno, Nevada': {
        rent: { status: 'yellow', text: 'No rent control. Housing crisis' },
        transit: { status: 'yellow', text: 'RTC RIDE buses' },
        childcare: { status: 'yellow', text: 'WCSD Preschool Program' },
        medicare: { status: 'yellow', text: 'Northern Nevada HOPES clinic' }
    },
    'Henderson, Nevada': {
        rent: { status: 'yellow', text: 'No rent control. Growing market' },
        transit: { status: 'yellow', text: 'RTC access' },
        childcare: { status: 'yellow', text: 'CCSD programs' },
        medicare: { status: 'yellow', text: 'Access to Las Vegas health resources' }
    },

    // ========================================
    // FLORIDA - Swing State
    // ========================================
    'Miami, Florida': {
        rent: { status: 'red', text: 'State ban on rent control' },
        transit: { status: 'yellow', text: 'Metrorail/Metromover. Free circulator' },
        childcare: { status: 'yellow', text: 'VPK (Voluntary Pre-K) program' },
        medicare: { status: 'red', text: 'State has not expanded Medicaid. High uninsured' }
    },
    'Tampa, Florida': {
        rent: { status: 'red', text: 'No rent control allowed' },
        transit: { status: 'yellow', text: 'TECO streetcar free downtown' },
        childcare: { status: 'yellow', text: 'School Readiness program' },
        medicare: { status: 'red', text: 'No Medicaid expansion. Tampa General charity care' }
    },
    'Orlando, Florida': {
        rent: { status: 'red', text: 'State preemption on rent control' },
        transit: { status: 'yellow', text: 'Lynx buses. SunRail commuter' },
        childcare: { status: 'yellow', text: 'Early Learning Coalition' },
        medicare: { status: 'red', text: 'Medicaid not expanded. Orlando Health safety net' }
    },
    'Jacksonville, Florida': {
        rent: { status: 'red', text: 'State ban applies' },
        transit: { status: 'yellow', text: 'JTA buses. Skyway monorail' },
        childcare: { status: 'yellow', text: 'VPK programs' },
        medicare: { status: 'red', text: 'No Medicaid expansion. High uninsured rate' }
    },
    'St. Petersburg, Florida': {
        rent: { status: 'red', text: 'No rent control permitted' },
        transit: { status: 'yellow', text: 'PSTA buses. Free Looper' },
        childcare: { status: 'yellow', text: 'Pinellas County programs' },
        medicare: { status: 'red', text: 'Medicaid gap. Community health centers limited' }
    },

    // ========================================
    // TEXAS - Major State
    // ========================================
    'Austin, Texas': {
        rent: { status: 'red', text: 'State ban on rent control' },
        transit: { status: 'yellow', text: 'CapMetro buses and light rail' },
        childcare: { status: 'yellow', text: 'Texas Rising Star program' },
        medicare: { status: 'red', text: 'No Medicaid expansion. CommUnityCare clinics' }
    },
    'Dallas, Texas': {
        rent: { status: 'red', text: 'No rent control allowed' },
        transit: { status: 'yellow', text: 'DART light rail extensive' },
        childcare: { status: 'yellow', text: 'Dallas ISD Pre-K programs' },
        medicare: { status: 'red', text: 'Medicaid not expanded. Parkland Hospital safety net' }
    },
    'Houston, Texas': {
        rent: { status: 'red', text: 'State preemption on rent control' },
        transit: { status: 'yellow', text: 'METRO rail and buses' },
        childcare: { status: 'yellow', text: 'Houston ISD Pre-K4' },
        medicare: { status: 'red', text: 'No expansion. Harris Health System for uninsured' }
    },
    'San Antonio, Texas': {
        rent: { status: 'red', text: 'Rent control banned statewide' },
        transit: { status: 'yellow', text: 'VIA buses. Expanding service' },
        childcare: { status: 'green', text: 'Pre-K 4 SA comprehensive program' },
        medicare: { status: 'red', text: 'No Medicaid expansion. CentroMed clinics' }
    },
    'Fort Worth, Texas': {
        rent: { status: 'red', text: 'State ban applies' },
        transit: { status: 'yellow', text: 'The T buses. TEXRail' },
        childcare: { status: 'yellow', text: 'FWISD Pre-K' },
        medicare: { status: 'red', text: 'JPS Health Network serves uninsured' }
    },
    'El Paso, Texas': {
        rent: { status: 'red', text: 'No rent control' },
        transit: { status: 'yellow', text: 'Sun Metro buses. Streetcar' },
        childcare: { status: 'yellow', text: 'EPISD Early Childhood' },
        medicare: { status: 'red', text: 'University Medical Center safety net' }
    },

    // ========================================
    // ILLINOIS
    // ========================================
    'Chicago, Illinois': {
        rent: { status: 'red', text: 'State law bans rent control' },
        transit: { status: 'green', text: 'CTA. Reduced fares seniors/students' },
        childcare: { status: 'yellow', text: 'Chicago Early Learning' },
        medicare: { status: 'yellow', text: 'Medicaid expanded. Cook County Health' }
    },
    'Springfield, Illinois': {
        rent: { status: 'red', text: 'State ban applies' },
        transit: { status: 'yellow', text: 'SMTD buses' },
        childcare: { status: 'yellow', text: 'District 186 Pre-K' },
        medicare: { status: 'yellow', text: 'Medicaid expanded. Memorial Health access' }
    },
    'Naperville, Illinois': {
        rent: { status: 'red', text: 'No rent control allowed' },
        transit: { status: 'yellow', text: 'Pace buses. Metra' },
        childcare: { status: 'yellow', text: 'District 203/204 programs' },
        medicare: { status: 'yellow', text: 'DuPage County Health Department' }
    },

    // ========================================
    // NEW JERSEY
    // ========================================
    'Newark, New Jersey': {
        rent: { status: 'green', text: 'Rent control ordinance since 1973' },
        transit: { status: 'green', text: 'NJ Transit hub. Free senior buses' },
        childcare: { status: 'yellow', text: 'Abbott Preschool Program' },
        medicare: { status: 'yellow', text: 'University Hospital safety net' }
    },
    'Jersey City, New Jersey': {
        rent: { status: 'green', text: 'Rent control for buildings pre-1987' },
        transit: { status: 'green', text: 'PATH train to NYC. Light rail' },
        childcare: { status: 'yellow', text: 'Expanded Pre-K programs' },
        medicare: { status: 'yellow', text: 'NJ FamilyCare available' }
    },
    'Paterson, New Jersey': {
        rent: { status: 'green', text: 'Rent control in effect' },
        transit: { status: 'yellow', text: 'NJ Transit buses' },
        childcare: { status: 'yellow', text: 'Abbott district programs' },
        medicare: { status: 'yellow', text: 'St. Joseph Health safety net' }
    },

    // ========================================
    // VIRGINIA
    // ========================================
    'Richmond, Virginia': {
        rent: { status: 'yellow', text: 'No rent control (Dillon Rule)' },
        transit: { status: 'green', text: 'GRTC fare-free (Zero Fare)' },
        childcare: { status: 'yellow', text: 'VPI (Virginia Preschool Initiative)' },
        medicare: { status: 'yellow', text: 'Medicaid expanded. VCU Health safety net' }
    },
    'Virginia Beach, Virginia': {
        rent: { status: 'yellow', text: 'No state rent control' },
        transit: { status: 'yellow', text: 'HRT Wave buses' },
        childcare: { status: 'yellow', text: 'VBCPS Pre-K' },
        medicare: { status: 'yellow', text: 'Access to Norfolk health resources' }
    },
    'Norfolk, Virginia': {
        rent: { status: 'yellow', text: 'Dillon Rule prevents control' },
        transit: { status: 'yellow', text: 'HRT light rail. The Tide' },
        childcare: { status: 'yellow', text: 'NPS Early Childhood' },
        medicare: { status: 'yellow', text: 'EVMS and Sentara charity care' }
    },
    'Alexandria, Virginia': {
        rent: { status: 'yellow', text: 'Committed Affordable units only' },
        transit: { status: 'green', text: 'DASH Bus fare-free' },
        childcare: { status: 'yellow', text: 'ACPS Pre-K programs' },
        medicare: { status: 'yellow', text: 'Access to DC health resources' }
    },
    'Arlington, Virginia': {
        rent: { status: 'yellow', text: 'No state rent control. High costs' },
        transit: { status: 'green', text: 'Metro stations. Excellent access' },
        childcare: { status: 'yellow', text: 'APS VPI programs' },
        medicare: { status: 'yellow', text: 'Access to DC/VA health networks' }
    },

    // ========================================
    // MARYLAND
    // ========================================
    'Baltimore, Maryland': {
        rent: { status: 'yellow', text: 'No rent control. Tenant protections' },
        transit: { status: 'yellow', text: 'Charm City Circulator free' },
        childcare: { status: 'yellow', text: 'Judy Centers for early learning' },
        medicare: { status: 'yellow', text: 'Medicaid expanded. Johns Hopkins safety net' }
    },
    'Takoma Park, Maryland': {
        rent: { status: 'green', text: 'Rent stabilization ordinance active' },
        transit: { status: 'green', text: 'Metro station. Free city buses' },
        childcare: { status: 'yellow', text: 'Co-op preschools and state programs' },
        medicare: { status: 'yellow', text: 'Montgomery County Health Department' }
    },

    // ========================================
    // TENNESSEE
    // ========================================
    'Nashville, Tennessee': {
        rent: { status: 'yellow', text: 'No rent control. Rapid growth' },
        transit: { status: 'yellow', text: 'WeGo buses. No rail yet' },
        childcare: { status: 'yellow', text: 'Voluntary Pre-K program' },
        medicare: { status: 'red', text: 'State has not expanded Medicaid' }
    },
    'Memphis, Tennessee': {
        rent: { status: 'yellow', text: 'No rent control. Affordable overall' },
        transit: { status: 'yellow', text: 'MATA buses and trolley' },
        childcare: { status: 'yellow', text: 'Pre-K programs expanding' },
        medicare: { status: 'red', text: 'No Medicaid expansion. Regional One safety net' }
    },
    'Knoxville, Tennessee': {
        rent: { status: 'yellow', text: 'No rent control. Moderate' },
        transit: { status: 'yellow', text: 'KAT buses' },
        childcare: { status: 'yellow', text: 'Knox County Pre-K' },
        medicare: { status: 'red', text: 'No expansion. UT Medical Center charity care' }
    },

    // ========================================
    // INDIANA
    // ========================================
    'Indianapolis, Indiana': {
        rent: { status: 'yellow', text: 'No rent control. Moderate costs' },
        transit: { status: 'yellow', text: 'IndyGo. Red Line BRT' },
        childcare: { status: 'yellow', text: 'On My Way Pre-K vouchers' },
        medicare: { status: 'yellow', text: 'Medicaid expanded (HIP 2.0)' }
    },
    'Fort Wayne, Indiana': {
        rent: { status: 'yellow', text: 'No rent control. Affordable' },
        transit: { status: 'yellow', text: 'Citilink buses' },
        childcare: { status: 'yellow', text: 'FWCS Early Childhood' },
        medicare: { status: 'yellow', text: 'Parkview and Lutheran safety net' }
    },

    // ========================================
    // LOUISIANA
    // ========================================
    'New Orleans, Louisiana': {
        rent: { status: 'yellow', text: 'No rent control. Post-Katrina issues' },
        transit: { status: 'yellow', text: 'Streetcar and RTA buses' },
        childcare: { status: 'yellow', text: 'LA 4 and Cecil J. Picard programs' },
        medicare: { status: 'yellow', text: 'Medicaid expanded 2016. Charity Hospital legacy' }
    },
    'Baton Rouge, Louisiana': {
        rent: { status: 'yellow', text: 'No rent control. Low costs' },
        transit: { status: 'yellow', text: 'CATS buses' },
        childcare: { status: 'yellow', text: 'EBR Pre-K programs' },
        medicare: { status: 'yellow', text: 'Our Lady of the Lake and LSU Health' }
    },

    // ========================================
    // KENTUCKY
    // ========================================
    'Louisville, Kentucky': {
        rent: { status: 'yellow', text: 'No rent control. Moderate costs' },
        transit: { status: 'yellow', text: 'TARC buses' },
        childcare: { status: 'yellow', text: 'Kentucky Preschool Program' },
        medicare: { status: 'yellow', text: 'Medicaid expanded. UofL Health safety net' }
    },
    'Lexington, Kentucky': {
        rent: { status: 'yellow', text: 'No rent control. Affordable' },
        transit: { status: 'yellow', text: 'Lextran buses' },
        childcare: { status: 'yellow', text: 'Fayette County Pre-K' },
        medicare: { status: 'yellow', text: 'UK Healthcare charity care' }
    },

    // ========================================
    // OKLAHOMA
    // ========================================
    'Oklahoma City, Oklahoma': {
        rent: { status: 'yellow', text: 'No rent control. Low costs' },
        transit: { status: 'yellow', text: 'Embark buses and streetcar' },
        childcare: { status: 'yellow', text: 'Reach Out and Read Oklahoma' },
        medicare: { status: 'yellow', text: 'Medicaid expanded. OU Health access' }
    },
    'Tulsa, Oklahoma': {
        rent: { status: 'yellow', text: 'No rent control. Affordable' },
        transit: { status: 'yellow', text: 'Tulsa Transit buses' },
        childcare: { status: 'green', text: 'Educare Tulsa comprehensive' },
        medicare: { status: 'yellow', text: 'OSU Medical Center and community clinics' }
    },

    // ========================================
    // MISSOURI
    // ========================================
    'St. Louis, Missouri': {
        rent: { status: 'yellow', text: 'No rent control. Low costs overall' },
        transit: { status: 'yellow', text: 'MetroLink light rail. Buses' },
        childcare: { status: 'yellow', text: 'Universal Pre-K initiative' },
        medicare: { status: 'yellow', text: 'Medicaid expanded. BJC and SSM safety net' }
    },

    // ========================================
    // IOWA
    // ========================================
    'Des Moines, Iowa': {
        rent: { status: 'yellow', text: 'No rent control. Affordable' },
        transit: { status: 'yellow', text: 'DART buses' },
        childcare: { status: 'yellow', text: 'Shared Visions preschool' },
        medicare: { status: 'yellow', text: 'Medicaid expanded. Broadlawns Medical Center' }
    },
    'Iowa City, Iowa': {
        rent: { status: 'yellow', text: 'No rent control. University market' },
        transit: { status: 'green', text: 'Iowa City Transit free' },
        childcare: { status: 'yellow', text: 'ICCSD Preschool Program' },
        medicare: { status: 'yellow', text: 'University of Iowa Hospitals access' }
    },
    'Cedar Rapids, Iowa': {
        rent: { status: 'yellow', text: 'No rent control. Moderate' },
        transit: { status: 'yellow', text: 'CR Transit buses' },
        childcare: { status: 'yellow', text: 'CRCSD Early Childhood' },
        medicare: { status: 'yellow', text: 'UnityPoint and Mercy health systems' }
    },

    // ========================================
    // KANSAS
    // ========================================
    'Wichita, Kansas': {
        rent: { status: 'yellow', text: 'No rent control. Low costs' },
        transit: { status: 'yellow', text: 'Wichita Transit' },
        childcare: { status: 'yellow', text: 'USD 259 Pre-K' },
        medicare: { status: 'red', text: 'State has not expanded Medicaid' }
    },
    'Lawrence, Kansas': {
        rent: { status: 'yellow', text: 'No rent control. College town' },
        transit: { status: 'green', text: 'KU buses free for students' },
        childcare: { status: 'yellow', text: 'USD 497 Preschool' },
        medicare: { status: 'red', text: 'LMH Health safety net. No expansion' }
    },
    'Topeka, Kansas': {
        rent: { status: 'yellow', text: 'No rent control. Low costs' },
        transit: { status: 'yellow', text: 'Topeka Metro buses' },
        childcare: { status: 'yellow', text: 'Parents as Teachers program' },
        medicare: { status: 'red', text: 'Stormont Vail charity care. No Medicaid expansion' }
    },

    // ========================================
    // NEBRASKA
    // ========================================
    'Omaha, Nebraska': {
        rent: { status: 'yellow', text: 'No rent control. Moderate costs' },
        transit: { status: 'yellow', text: 'Metro buses' },
        childcare: { status: 'yellow', text: 'Step Up to Quality Nebraska' },
        medicare: { status: 'yellow', text: 'Medicaid expanded. CHI Health access' }
    },
    'Lincoln, Nebraska': {
        rent: { status: 'yellow', text: 'No rent control. Affordable' },
        transit: { status: 'yellow', text: 'StarTran buses' },
        childcare: { status: 'yellow', text: 'LPS Early Childhood programs' },
        medicare: { status: 'yellow', text: 'Bryan Health and community clinics' }
    },

    // ========================================
    // SOUTH CAROLINA
    // ========================================
    'Charleston, South Carolina': {
        rent: { status: 'yellow', text: 'No rent control. Rising costs' },
        transit: { status: 'yellow', text: 'CARTA buses and trolleys' },
        childcare: { status: 'yellow', text: 'SC First Steps' },
        medicare: { status: 'red', text: 'State has not expanded Medicaid' }
    },
    'Columbia, South Carolina': {
        rent: { status: 'yellow', text: 'No rent control. Moderate' },
        transit: { status: 'yellow', text: 'The COMET buses' },
        childcare: { status: 'yellow', text: 'Richland County Pre-K' },
        medicare: { status: 'red', text: 'No Medicaid expansion. Prisma Health safety net' }
    },
    'Greenville, South Carolina': {
        rent: { status: 'yellow', text: 'No rent control. Moderate' },
        transit: { status: 'yellow', text: 'Greenlink buses' },
        childcare: { status: 'yellow', text: 'ABC Quality program' },
        medicare: { status: 'red', text: 'No expansion. GHS charity care' }
    },

    // ========================================
    // ALABAMA
    // ========================================
    'Birmingham, Alabama': {
        rent: { status: 'red', text: 'State ban on rent control' },
        transit: { status: 'red', text: 'MAX buses limited service' },
        childcare: { status: 'yellow', text: 'Alabama First Class Pre-K' },
        medicare: { status: 'red', text: 'State has not expanded Medicaid' }
    },
    'Montgomery, Alabama': {
        rent: { status: 'red', text: 'State preemption' },
        transit: { status: 'red', text: 'The M buses limited' },
        childcare: { status: 'yellow', text: 'First Class Pre-K' },
        medicare: { status: 'red', text: 'No Medicaid expansion. Baptist Health safety net' }
    },

    // ========================================
    // MISSISSIPPI
    // ========================================
    'Jackson, Mississippi': {
        rent: { status: 'yellow', text: 'No rent control. Low costs' },
        transit: { status: 'red', text: 'JATRAN buses very limited' },
        childcare: { status: 'yellow', text: 'MS Early Learning Guidelines' },
        medicare: { status: 'red', text: 'State has not expanded Medicaid. Highest uninsured' }
    },

    // ========================================
    // ARKANSAS
    // ========================================
    'Little Rock, Arkansas': {
        rent: { status: 'red', text: 'State ban on rent control' },
        transit: { status: 'red', text: 'Rock Region Metro limited' },
        childcare: { status: 'yellow', text: 'Arkansas Better Chance (ABC)' },
        medicare: { status: 'yellow', text: 'Medicaid expanded via Private Option' }
    },

    // ========================================
    // UTAH
    // ========================================
    'Salt Lake City, Utah': {
        rent: { status: 'yellow', text: 'No rent control. Moderate increases' },
        transit: { status: 'yellow', text: 'TRAX light rail. UTA buses' },
        childcare: { status: 'yellow', text: 'School Readiness Initiative' },
        medicare: { status: 'yellow', text: 'Medicaid expanded. Intermountain Healthcare' }
    },
    'Provo, Utah': {
        rent: { status: 'yellow', text: 'No rent control. College market' },
        transit: { status: 'yellow', text: 'UVX BRT. UTA buses' },
        childcare: { status: 'yellow', text: 'PSD Early Learning' },
        medicare: { status: 'yellow', text: 'Utah County health clinics' }
    },

    // ========================================
    // IDAHO
    // ========================================
    'Boise, Idaho': {
        rent: { status: 'yellow', text: 'No rent control. Rapid growth' },
        transit: { status: 'yellow', text: 'ValleyRide buses' },
        childcare: { status: 'yellow', text: 'Idaho Stars program' },
        medicare: { status: 'yellow', text: 'Medicaid expanded. St. Lukes and community clinics' }
    },

    // ========================================
    // MONTANA
    // ========================================
    'Billings, Montana': {
        rent: { status: 'yellow', text: 'No rent control. Moderate' },
        transit: { status: 'yellow', text: 'MET Transit buses' },
        childcare: { status: 'yellow', text: 'Best Beginnings' },
        medicare: { status: 'yellow', text: 'Medicaid expanded. RiverStone Health' }
    },
    'Missoula, Montana': {
        rent: { status: 'yellow', text: 'No rent control. University town' },
        transit: { status: 'green', text: 'Mountain Line buses free' },
        childcare: { status: 'yellow', text: 'Best Beginnings scholarships' },
        medicare: { status: 'yellow', text: 'Partnership Health Center' }
    },

    // ========================================
    // ALASKA
    // ========================================
    'Anchorage, Alaska': {
        rent: { status: 'yellow', text: 'No rent control. Seasonal variation' },
        transit: { status: 'yellow', text: 'People Mover buses' },
        childcare: { status: 'yellow', text: 'Learn & Grow programs' },
        medicare: { status: 'red', text: 'State has not expanded Medicaid' }
    },

    // ========================================
    // HAWAII
    // ========================================
    'Honolulu, Hawaii': {
        rent: { status: 'yellow', text: 'No rent control. Highest costs in US' },
        transit: { status: 'yellow', text: 'TheBus extensive. Rail under construction' },
        childcare: { status: 'yellow', text: 'Preschool Open Doors program' },
        medicare: { status: 'yellow', text: 'Prepaid Health Care Act. QUEST for low-income' }
    },

    // ========================================
    // VERMONT
    // ========================================
    'Burlington, Vermont': {
        rent: { status: 'yellow', text: 'No rent control. Tight market' },
        transit: { status: 'green', text: 'Green Mountain Transit free' },
        childcare: { status: 'yellow', text: 'Act 166 Universal Pre-K' },
        medicare: { status: 'yellow', text: 'Medicaid expanded. Dr. Dynasaur for children' }
    },

    // ========================================
    // MAINE
    // ========================================
    'Portland, Maine': {
        rent: { status: 'yellow', text: 'No rent control. Increasing costs' },
        transit: { status: 'yellow', text: 'Metro buses seasonal' },
        childcare: { status: 'yellow', text: 'Maine Roads to Quality' },
        medicare: { status: 'yellow', text: 'Medicaid expanded. MaineCare' }
    },

    // ========================================
    // NEW HAMPSHIRE
    // ========================================
    'Manchester, New Hampshire': {
        rent: { status: 'yellow', text: 'No rent control. Moderate' },
        transit: { status: 'yellow', text: 'MTA buses' },
        childcare: { status: 'yellow', text: 'NH Scholarships' },
        medicare: { status: 'yellow', text: 'Medicaid expanded 2014' }
    },

    // ========================================
    // RHODE ISLAND
    // ========================================
    'Providence, Rhode Island': {
        rent: { status: 'yellow', text: 'No rent control. Tenant protections' },
        transit: { status: 'yellow', text: 'RIPTA buses statewide' },
        childcare: { status: 'yellow', text: 'RI Pre-K expanding' },
        medicare: { status: 'yellow', text: 'Medicaid expanded. RIte Care program' }
    },

    // ========================================
    // CONNECTICUT
    // ========================================
    'Hartford, Connecticut': {
        rent: { status: 'yellow', text: 'No rent control. Mediation available' },
        transit: { status: 'yellow', text: 'CTtransit bus system' },
        childcare: { status: 'yellow', text: 'School Readiness program' },
        medicare: { status: 'yellow', text: 'Medicaid expanded. HUSKY Health' }
    },
    'New Haven, Connecticut': {
        rent: { status: 'yellow', text: 'No rent control. Affordable' },
        transit: { status: 'yellow', text: 'CT Transit buses' },
        childcare: { status: 'yellow', text: 'NHPS Early Childhood' },
        medicare: { status: 'yellow', text: 'Access to Yale New Haven Hospital' }
    },

    // ========================================
    // DELAWARE
    // ========================================
    'Wilmington, Delaware': {
        rent: { status: 'yellow', text: 'No rent control. Affordable' },
        transit: { status: 'yellow', text: 'DART First State buses' },
        childcare: { status: 'yellow', text: 'Delaware Stars for Early Success' },
        medicare: { status: 'yellow', text: 'Medicaid expanded. ChristianaCare access' }
    },

    // ========================================
    // WEST VIRGINIA
    // ========================================
    'Charleston, West Virginia': {
        rent: { status: 'yellow', text: 'No rent control. Low costs' },
        transit: { status: 'yellow', text: 'KRT buses limited' },
        childcare: { status: 'yellow', text: 'WV Birth to Three. Pre-K' },
        medicare: { status: 'yellow', text: 'Medicaid expanded. CAMC regional access' }
    },

    // ========================================
    // SOUTH DAKOTA
    // ========================================
    'Sioux Falls, South Dakota': {
        rent: { status: 'yellow', text: 'No rent control. Growing market' },
        transit: { status: 'red', text: 'SAM buses very limited' },
        childcare: { status: 'yellow', text: 'Birth to 3 Connections' },
        medicare: { status: 'red', text: 'State has not expanded Medicaid' }
    },

    // ========================================
    // NORTH DAKOTA
    // ========================================
    'Fargo, North Dakota': {
        rent: { status: 'yellow', text: 'No rent control. Oil boom effects' },
        transit: { status: 'yellow', text: 'MATBUS buses' },
        childcare: { status: 'yellow', text: 'ND Early Childhood Programs' },
        medicare: { status: 'yellow', text: 'Medicaid expanded. Essentia Health' }
    },

    // ========================================
    // WYOMING
    // ========================================
    'Cheyenne, Wyoming': {
        rent: { status: 'yellow', text: 'No rent control. Low costs' },
        transit: { status: 'red', text: 'Cheyenne Transit very limited' },
        childcare: { status: 'yellow', text: 'WY Early Childhood' },
        medicare: { status: 'red', text: 'State has not expanded Medicaid' }
    }
};

/**
 * Get policy data for a specific location and state
 * @param {string} location - Location name
 * @param {string} state - State name
 * @returns {Object} Policy data with rent, transit, childcare info
 */
export function getPolicyData(location, state) {
    // Check for location-specific overrides first
    const locationKey = `${location}, ${state}`;
    if (LOCATION_OVERRIDES[locationKey]) {
        return LOCATION_OVERRIDES[locationKey];
    }

    // Fall back to state-level policies
    return STATE_POLICIES[state] || {
        rent: { status: 'loading', text: 'Loading policy data...' },
        transit: { status: 'loading', text: 'Loading policy data...' },
        childcare: { status: 'loading', text: 'Loading policy data...' }
    };
}
