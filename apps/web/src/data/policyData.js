// Comprehensive policy data for all 50 states + DC
// Logic: Specific City Override -> State Default

export const STATE_POLICIES = {
    // ALABAMA
    'Alabama': {
        rent: { status: 'red', text: 'State ban on rent control (Preemption Law)' },
        transit: { status: 'red', text: 'Limited public transit funding. Fares standard' },
        childcare: { status: 'red', text: 'Limited state subsidies. High cost relative to income' }
    },
    // ALASKA
    'Alaska': {
        rent: { status: 'yellow', text: 'No state ban, but no local rent control enacted' },
        transit: { status: 'yellow', text: 'People Mover fares standard. Some free routes' },
        childcare: { status: 'yellow', text: 'State assistance available but high costs' }
    },
    // ARIZONA
    'Arizona': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'yellow', text: 'Fares standard. Light rail expansion in progress' },
        childcare: { status: 'yellow', text: 'DES assistance available with waitlists' }
    },
    // ARKANSAS
    'Arkansas': {
        rent: { status: 'red', text: 'State ban on rent control' },
        transit: { status: 'red', text: 'Limited transit infrastructure outside Little Rock' },
        childcare: { status: 'red', text: 'Low eligibility threshold for vouchers' }
    },
    // CALIFORNIA
    'California': {
        rent: { status: 'yellow', text: 'Statewide rent cap (AB 1482) of 5% + inflation' },
        transit: { status: 'yellow', text: 'Extensive transit networks. Fares vary by agency' },
        childcare: { status: 'yellow', text: 'State preschool expansion. Subsidies available' }
    },
    // COLORADO
    'Colorado': {
        rent: { status: 'yellow', text: 'Ban repealed 2021. Local rent control allowed but limited' },
        transit: { status: 'yellow', text: 'Zero Fare for Better Air (seasonal free transit)' },
        childcare: { status: 'yellow', text: 'Universal Preschool (UPK) program active' }
    },
    // CONNECTICUT
    'Connecticut': {
        rent: { status: 'yellow', text: 'Fair Rent Commissions allowed. No hard caps' },
        transit: { status: 'yellow', text: 'CTtransit fares standard. U-Pass for students' },
        childcare: { status: 'yellow', text: 'Care 4 Kids program. Waitlists common' }
    },
    // DELAWARE
    'Delaware': {
        rent: { status: 'yellow', text: 'No state ban. Tenant protections in place' },
        transit: { status: 'yellow', text: 'DART First State fares standard' },
        childcare: { status: 'green', text: 'Purchase of Care program expanded' }
    },
    // FLORIDA
    'Florida': {
        rent: { status: 'red', text: 'Rent control banned (State Preemption)' },
        transit: { status: 'red', text: 'Limited state funding for transit operations' },
        childcare: { status: 'red', text: 'VPK available but low funding rates' }
    },
    // GEORGIA
    'Georgia': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'red', text: 'No state funding for MARTA operations' },
        childcare: { status: 'yellow', text: 'Lottery-funded Pre-K available' }
    },
    // HAWAII
    'Hawaii': {
        rent: { status: 'yellow', text: 'No state ban. High cost of living adjustments' },
        transit: { status: 'yellow', text: 'TheBus (Honolulu) widely used. Fares standard' },
        childcare: { status: 'yellow', text: 'Preschool Open Doors program' }
    },
    // IDAHO
    'Idaho': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'red', text: 'Limited public transit options' },
        childcare: { status: 'red', text: 'Limited state investment in early learning' }
    },
    // ILLINOIS
    'Illinois': {
        rent: { status: 'red', text: 'Rent control banned (Rent Control Preemption Act)' },
        transit: { status: 'yellow', text: 'RTA system extensive. Fares standard' },
        childcare: { status: 'yellow', text: 'Smart Start Illinois plan expanding access' }
    },
    // INDIANA
    'Indiana': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'red', text: 'Indianapolis Indigo expanding. Limited elsewhere' },
        childcare: { status: 'red', text: 'On My Way Pre-K limited to specific counties' }
    },
    // IOWA
    'Iowa': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'yellow', text: 'Des Moines DART fares standard' },
        childcare: { status: 'yellow', text: 'Child Care Assistance available' }
    },
    // KANSAS
    'Kansas': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'yellow', text: 'Zero Fare program in Kansas City (KCATA)' },
        childcare: { status: 'yellow', text: 'Hero Relief Program grants' }
    },
    // KENTUCKY
    'Kentucky': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'yellow', text: 'TARC fares standard' },
        childcare: { status: 'yellow', text: 'Child Care Assistance Program (CCAP)' }
    },
    // LOUISIANA
    'Louisiana': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'red', text: 'Limited transit funding' },
        childcare: { status: 'red', text: 'Cecil J. Picard LA 4 Program limited' }
    },
    // MAINE
    'Maine': {
        rent: { status: 'yellow', text: 'Local rent control allowed (e.g., Portland)' },
        transit: { status: 'yellow', text: 'Metro fares standard. Expansion proposed' },
        childcare: { status: 'yellow', text: 'Child Care Subsidy Program' }
    },
    // MARYLAND
    'Maryland': {
        rent: { status: 'yellow', text: 'Local rent control allowed (e.g., Montgomery Co)' },
        transit: { status: 'yellow', text: 'MTA Maryland extensive. Fares standard' },
        childcare: { status: 'yellow', text: 'Child Care Scholarship program' }
    },
    // MASSACHUSETTS
    'Massachusetts': {
        rent: { status: 'red', text: 'Rent control banned statewide since 1994' },
        transit: { status: 'yellow', text: 'MBTA fares standard. Free bus pilots in Boston' },
        childcare: { status: 'yellow', text: 'Commonwealth Preschool Partnership' }
    },
    // MICHIGAN
    'Michigan': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'yellow', text: 'Local millages support transit' },
        childcare: { status: 'yellow', text: 'Great Start Readiness Program (GSRP)' }
    },
    // MINNESOTA
    'Minnesota': {
        rent: { status: 'yellow', text: 'Local rent control allowed with voter approval' },
        transit: { status: 'yellow', text: 'Metro Transit fares standard' },
        childcare: { status: 'yellow', text: 'Early Learning Scholarships' }
    },
    // MISSISSIPPI
    'Mississippi': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'red', text: 'Very limited public transit' },
        childcare: { status: 'red', text: 'Limited childcare certificates' }
    },
    // MISSOURI
    'Missouri': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'yellow', text: 'KCATA (Kansas City) is Zero Fare (Green)' },
        childcare: { status: 'yellow', text: 'Subsidy program available' }
    },
    // MONTANA
    'Montana': {
        rent: { status: 'yellow', text: 'No state ban, but no local policies' },
        transit: { status: 'yellow', text: 'Streamline (Bozeman) is fare-free' },
        childcare: { status: 'yellow', text: 'Best Beginnings Scholarship' }
    },
    // NEBRASKA
    'Nebraska': {
        rent: { status: 'yellow', text: 'No state ban. No local policies enacted' },
        transit: { status: 'yellow', text: 'Metro Transit (Omaha) fares standard' },
        childcare: { status: 'yellow', text: 'Child Care Subsidy program' }
    },
    // NEVADA
    'Nevada': {
        rent: { status: 'red', text: 'No rent control. Summary eviction process fast' },
        transit: { status: 'yellow', text: 'RTC fares standard' },
        childcare: { status: 'yellow', text: 'Child Care and Development Fund' }
    },
    // NEW HAMPSHIRE
    'New Hampshire': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'red', text: 'Limited transit options' },
        childcare: { status: 'yellow', text: 'NH Child Care Scholarship' }
    },
    // NEW JERSEY
    'New Jersey': {
        rent: { status: 'green', text: 'State allows strong local rent control (100+ cities)' },
        transit: { status: 'yellow', text: 'NJ Transit extensive. Fares standard' },
        childcare: { status: 'green', text: 'Abbott Districts provide free Pre-K' }
    },
    // NEW MEXICO
    'New Mexico': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'green', text: 'Zero Fare for Democracy (Free transit statewide)' },
        childcare: { status: 'green', text: 'Free childcare for most families (Constitutional Amendment)' }
    },
    // NEW YORK
    'New York': {
        rent: { status: 'green', text: 'Rent Stabilization system in NYC and suburbs' },
        transit: { status: 'yellow', text: 'MTA/regional transit extensive' },
        childcare: { status: 'yellow', text: 'Empire State Child Credit' }
    },
    // NORTH CAROLINA
    'North Carolina': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'yellow', text: 'Local systems (CATS, GoTriangle) active' },
        childcare: { status: 'yellow', text: 'NC Pre-K program' }
    },
    // NORTH DAKOTA
    'North Dakota': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'yellow', text: 'MATBUS fares standard' },
        childcare: { status: 'yellow', text: 'Child Care Assistance Program' }
    },
    // OHIO
    'Ohio': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'yellow', text: 'COTA/GCRTA fares standard' },
        childcare: { status: 'yellow', text: 'Publicly Funded Child Care (PFCC)' }
    },
    // OKLAHOMA
    'Oklahoma': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'yellow', text: 'Embark (OKC) fares standard' },
        childcare: { status: 'yellow', text: 'DHS Child Care Subsidy' }
    },
    // OREGON
    'Oregon': {
        rent: { status: 'green', text: 'First statewide rent control (Cap: 7% + CPI)' },
        transit: { status: 'yellow', text: 'TriMet/LTD fares standard' },
        childcare: { status: 'yellow', text: 'Employment Related Day Care (ERDC)' }
    },
    // PENNSYLVANIA
    'Pennsylvania': {
        rent: { status: 'yellow', text: 'No state ban, but strict court interpretations' },
        transit: { status: 'yellow', text: 'SEPTA/PAAC extensive. Lottery funds seniors' },
        childcare: { status: 'yellow', text: 'Pre-K Counts program' }
    },
    // RHODE ISLAND
    'Rhode Island': {
        rent: { status: 'yellow', text: 'No state ban. Local advocacy active' },
        transit: { status: 'yellow', text: 'RIPTA statewide system. Fares standard' },
        childcare: { status: 'yellow', text: 'Child Care Assistance Program' }
    },
    // SOUTH CAROLINA
    'South Carolina': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'red', text: 'Limited transit infrastructure' },
        childcare: { status: 'yellow', text: 'First Steps 4K' }
    },
    // SOUTH DAKOTA
    'South Dakota': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'red', text: 'Limited transit options' },
        childcare: { status: 'yellow', text: 'Child Care Assistance' }
    },
    // TENNESSEE
    'Tennessee': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'yellow', text: 'MATA/WeGo fares standard' },
        childcare: { status: 'yellow', text: 'Smart Steps program' }
    },
    // TEXAS
    'Texas': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'yellow', text: 'METRO/DART/CapMetro fares standard' },
        childcare: { status: 'red', text: 'Texas School Ready limited' }
    },
    // UTAH
    'Utah': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'yellow', text: 'UTA fares standard. Free Fare February pilots' },
        childcare: { status: 'yellow', text: 'Office of Child Care subsidies' }
    },
    // VERMONT
    'Vermont': {
        rent: { status: 'yellow', text: 'No state ban. Burlington charter change proposed' },
        transit: { status: 'green', text: 'GMT currently Zero Fare (state funded)' },
        childcare: { status: 'green', text: 'Act 76 (2023) massive childcare investment' }
    },
    // VIRGINIA
    'Virginia': {
        rent: { status: 'yellow', text: 'Dillon Rule limits local power. No rent control' },
        transit: { status: 'yellow', text: 'GRTC (Richmond) is Zero Fare' },
        childcare: { status: 'yellow', text: 'Child Care Subsidy Program' }
    },
    // WASHINGTON
    'Washington': {
        rent: { status: 'red', text: 'Rent control banned by state law (1981)' },
        transit: { status: 'green', text: 'Youth ride free statewide (Move Ahead WA)' },
        childcare: { status: 'green', text: 'Fair Start for Kids Act investment' }
    },
    // WEST VIRGINIA
    'West Virginia': {
        rent: { status: 'yellow', text: 'No state ban. No local policies' },
        transit: { status: 'yellow', text: 'Mountain Line fares standard' },
        childcare: { status: 'yellow', text: 'Child Care Resource and Referral' }
    },
    // WISCONSIN
    'Wisconsin': {
        rent: { status: 'red', text: 'Rent control banned by state law' },
        transit: { status: 'yellow', text: 'MCTS/Metro fares standard' },
        childcare: { status: 'yellow', text: 'Wisconsin Shares program' }
    },
    // WYOMING
    'Wyoming': {
        rent: { status: 'yellow', text: 'No state ban. No local policies' },
        transit: { status: 'red', text: 'Very limited transit' },
        childcare: { status: 'yellow', text: 'DFS Child Care Subsidy' }
    },
    // DC
    'District of Columbia': {
        rent: { status: 'green', text: 'Rent Control Act of 1985 active' },
        transit: { status: 'green', text: 'MetroLift subsidy. Free bus pilot ended' },
        childcare: { status: 'green', text: 'Universal Pre-K 3 and 4' }
    }
};

export const CITY_OVERRIDES = {
    // CALIFORNIA
    'San Francisco': {
        rent: { status: 'green', text: 'Strong rent control caps increases at 60% of CPI' },
        transit: { status: 'yellow', text: 'Muni $3 fare. Free for youth/seniors' },
        childcare: { status: 'green', text: 'Universal preschool. Subsidies for families <$150k' }
    },
    'Los Angeles': {
        rent: { status: 'yellow', text: 'RSO covers pre-1978 units. 4% cap (2024)' },
        transit: { status: 'yellow', text: 'Metro $1.75. Free for students (GoPass)' },
        childcare: { status: 'yellow', text: 'UPK expansion ongoing' }
    },
    'Oakland': {
        rent: { status: 'green', text: 'Rent Adjustment Program with strict caps' },
        transit: { status: 'yellow', text: 'AC Transit fares standard' },
        childcare: { status: 'green', text: 'Oakland Preschool for All (Measure AA)' }
    },
    'Berkeley': {
        rent: { status: 'green', text: 'Rent Stabilization Board sets strict limits' },
        transit: { status: 'yellow', text: 'AC Transit. EasyPass for students' },
        childcare: { status: 'green', text: 'High subsidy availability' }
    },
    'Santa Monica': {
        rent: { status: 'green', text: 'Rent Control Charter Amendment active' },
        transit: { status: 'yellow', text: 'Big Blue Bus $1.10' },
        childcare: { status: 'green', text: 'Cradle to Career initiative' }
    },

    // NEW YORK
    'New York': {
        rent: { status: 'green', text: 'Rent Stabilization covers 1M+ units' },
        transit: { status: 'green', text: 'Fair Fares NYC (50% off). Free buses pilot' },
        childcare: { status: 'green', text: '3-K and Pre-K for All (Universal)' }
    },
    'Kingston': {
        rent: { status: 'green', text: 'First upstate city to enact rent reduction (15%)' },
        transit: { status: 'green', text: 'UCAT buses are fare-free' },
        childcare: { status: 'yellow', text: 'State subsidies apply' }
    },

    // MASSACHUSETTS
    'Boston': {
        rent: { status: 'red', text: 'Rent control banned statewide. Home rule petition blocked' },
        transit: { status: 'green', text: 'Mayor Wu: Free Bus Routes (23, 28, 29)' },
        childcare: { status: 'green', text: 'Universal Pre-K expansion' }
    },
    'Cambridge': {
        rent: { status: 'red', text: 'Rent control banned statewide' },
        transit: { status: 'yellow', text: 'MBTA fares standard' },
        childcare: { status: 'green', text: 'Cambridge Preschool Program (Universal)' }
    },

    // MISSOURI
    'Kansas City': {
        rent: { status: 'red', text: 'State ban on rent control' },
        transit: { status: 'green', text: 'Zero Fare Transit (First major US city)' },
        childcare: { status: 'yellow', text: 'State subsidies apply' }
    },

    // VIRGINIA
    'Richmond': {
        rent: { status: 'yellow', text: 'No rent control (Dillon Rule)' },
        transit: { status: 'green', text: 'GRTC remains fare-free (Zero Fare)' },
        childcare: { status: 'yellow', text: 'State subsidies apply' }
    },
    'Alexandria': {
        rent: { status: 'yellow', text: 'Committed Affordable units only' },
        transit: { status: 'green', text: 'DASH Bus is fare-free' },
        childcare: { status: 'yellow', text: 'City subsidy program' }
    },

    // WASHINGTON
    'Seattle': {
        rent: { status: 'yellow', text: 'No rent caps, but 6-month notice required for increases' },
        transit: { status: 'green', text: 'Free transit for youth (18 & under)' },
        childcare: { status: 'green', text: 'Seattle Preschool Program (SPP)' }
    },
    'Olympia': {
        rent: { status: 'red', text: 'State ban on rent control' },
        transit: { status: 'green', text: 'Intercity Transit is Zero Fare' },
        childcare: { status: 'yellow', text: 'State subsidies apply' }
    },

    // OREGON
    'Portland': {
        rent: { status: 'green', text: 'Relocation assistance + State Cap (7% + CPI)' },
        transit: { status: 'yellow', text: 'TriMet fares standard. Low-income fare available' },
        childcare: { status: 'green', text: 'Preschool for All (Multnomah County)' }
    },

    // MINNESOTA
    'St. Paul': {
        rent: { status: 'green', text: 'Rent Stabilization Ordinance (3% cap)' },
        transit: { status: 'yellow', text: 'Metro Transit fares standard' },
        childcare: { status: 'yellow', text: 'St. Paul Pre-K' }
    },
    'Minneapolis': {
        rent: { status: 'yellow', text: 'Rent control authorized but not yet enacted' },
        transit: { status: 'yellow', text: 'Metro Transit fares standard' },
        childcare: { status: 'yellow', text: 'Strong Start Minneapolis' }
    },

    // ARIZONA
    'Tucson': {
        rent: { status: 'red', text: 'State ban on rent control' },
        transit: { status: 'green', text: 'Sun Tran is fare-free permanently' },
        childcare: { status: 'yellow', text: 'Pima Early Education Program' }
    },

    // NEW MEXICO
    'Albuquerque': {
        rent: { status: 'red', text: 'State ban on rent control' },
        transit: { status: 'green', text: 'Zero Fares pilot permanent' },
        childcare: { status: 'green', text: 'Free childcare for most families' }
    }
};

// Helper to get data for ANY city in the US
export function getPolicyData(city, state) {
    // 1. Check for City Override
    // Try exact match
    if (CITY_OVERRIDES[city]) {
        return CITY_OVERRIDES[city];
    }

    // Try matching "City" suffix variations if needed (e.g. "New York City" vs "New York")
    const cleanCity = city.replace(' City', '');
    if (CITY_OVERRIDES[cleanCity]) {
        return CITY_OVERRIDES[cleanCity];
    }

    // 2. Fallback to State Default
    if (STATE_POLICIES[state]) {
        return STATE_POLICIES[state];
    }

    // 3. Ultimate Fallback (Unknown State)
    return {
        rent: { status: 'yellow', text: 'Local regulations vary' },
        transit: { status: 'yellow', text: 'Standard fares apply' },
        childcare: { status: 'yellow', text: 'State/Federal subsidies may apply' }
    };
}
