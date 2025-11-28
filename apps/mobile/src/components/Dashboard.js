import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Share, Dimensions, ScrollView, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const POLICIES = [
    { id: 'rent', icon: 'home-city', title: 'FREEZE THE RENT' },
    { id: 'transit', icon: 'bus', title: 'FAST AND FREE BUSES' },
    { id: 'childcare', icon: 'baby-bottle', title: 'CHILDCARE FOR ALL' }
];

const STATE_POLICIES = {
    Alabama: {
        rent: { status: 'red', text: 'No rent control. State law prohibits municipalities from enacting it.' },
        transit: { status: 'red', text: 'Very limited public transit. Car ownership is essential.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $700/month.' }
    },
    Alaska: {
        rent: { status: 'red', text: 'No rent control policies in place.' },
        transit: { status: 'red', text: 'Minimal public transit outside Anchorage.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $1,100/month.' }
    },
    Arizona: {
        rent: { status: 'red', text: 'State law prohibits rent control.' },
        transit: { status: 'red', text: 'Limited public transit. Phoenix light rail costs $2 per ride.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $900/month.' }
    },
    Arkansas: {
        rent: { status: 'red', text: 'No rent control policies.' },
        transit: { status: 'red', text: 'Very limited public transit available.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $650/month.' }
    },
    California: {
        rent: { status: 'yellow', text: 'Some rent control exists in cities like SF and LA, but not statewide.' },
        transit: { status: 'yellow', text: 'Public transit exists but is not free. LA Metro costs $1.75 per ride.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $1,400/month.' }
    },
    Colorado: {
        rent: { status: 'red', text: 'State law prohibits rent control.' },
        transit: { status: 'yellow', text: 'RTD in Denver costs $3 per ride. Decent coverage in metro area.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $1,300/month.' }
    },
    Connecticut: {
        rent: { status: 'red', text: 'No statewide rent control, though some cities have limited protections.' },
        transit: { status: 'yellow', text: 'CT Transit operates but not free. Fares around $1.75 per ride.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $1,400/month.' }
    },
    Delaware: {
        rent: { status: 'red', text: 'No rent control policies.' },
        transit: { status: 'red', text: 'Limited public transit. DART costs $2 per ride.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $1,100/month.' }
    },
    Florida: {
        rent: { status: 'red', text: 'State law prohibits rent control.' },
        transit: { status: 'red', text: 'Limited transit outside Miami. Most areas require a car.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $900/month.' }
    },
    Georgia: {
        rent: { status: 'red', text: 'No rent control. Atlanta prohibits it.' },
        transit: { status: 'red', text: 'MARTA costs $2.50 per ride. Limited coverage outside downtown.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $850/month.' }
    },
    Hawaii: {
        rent: { status: 'red', text: 'No statewide rent control despite high housing costs.' },
        transit: { status: 'yellow', text: 'TheBus in Honolulu costs $3 per ride. Good coverage on Oahu.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $1,300/month.' }
    },
    Idaho: {
        rent: { status: 'red', text: 'No rent control policies.' },
        transit: { status: 'red', text: 'Very limited public transit.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $800/month.' }
    },
    Illinois: {
        rent: { status: 'yellow', text: 'Chicago has rent control ordinances, but limited in scope.' },
        transit: { status: 'yellow', text: 'CTA costs $2.50 per ride. Extensive in Chicago, limited elsewhere.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $1,200/month.' }
    },
    Indiana: {
        rent: { status: 'red', text: 'No rent control policies.' },
        transit: { status: 'red', text: 'Very limited public transit.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $800/month.' }
    },
    Iowa: {
        rent: { status: 'red', text: 'No rent control policies.' },
        transit: { status: 'red', text: 'Limited public transit available.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $850/month.' }
    },
    Kansas: {
        rent: { status: 'red', text: 'No rent control policies.' },
        transit: { status: 'red', text: 'Very limited public transit.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $750/month.' }
    },
    Kentucky: {
        rent: { status: 'red', text: 'No rent control policies.' },
        transit: { status: 'red', text: 'Limited public transit.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $700/month.' }
    },
    Louisiana: {
        rent: { status: 'red', text: 'No rent control policies.' },
        transit: { status: 'red', text: 'Limited transit. New Orleans streetcar costs $1.25 per ride.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $700/month.' }
    },
    Maine: {
        rent: { status: 'yellow', text: 'Portland has rent control as of 2020.' },
        transit: { status: 'red', text: 'Very limited public transit.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $1,000/month.' }
    },
    Maryland: {
        rent: { status: 'yellow', text: 'Some rent stabilization in certain counties.' },
        transit: { status: 'yellow', text: 'Metro in DC area costs $2+ per ride. Good coverage near DC.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $1,350/month.' }
    },
    Massachusetts: {
        rent: { status: 'red', text: 'Statewide ban on rent control since 1994.' },
        transit: { status: 'yellow', text: 'MBTA costs $2.40 per ride. Extensive in Boston area.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $1,700/month.' }
    },
    Michigan: {
        rent: { status: 'red', text: 'No rent control policies.' },
        transit: { status: 'red', text: 'Limited transit. Detroit People Mover costs $0.75 per ride.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $950/month.' }
    },
    Minnesota: {
        rent: { status: 'yellow', text: 'St. Paul enacted rent control in 2021.' },
        transit: { status: 'yellow', text: 'Metro Transit costs $2.50 per ride. Good in Twin Cities.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $1,200/month.' }
    },
    Mississippi: {
        rent: { status: 'red', text: 'No rent control policies.' },
        transit: { status: 'red', text: 'Very limited public transit.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $600/month.' }
    },
    Missouri: {
        rent: { status: 'red', text: 'State law prohibits rent control.' },
        transit: { status: 'red', text: 'Limited transit. St. Louis MetroLink costs $2.50 per ride.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $850/month.' }
    },
    Montana: {
        rent: { status: 'red', text: 'No rent control policies.' },
        transit: { status: 'red', text: 'Very limited public transit.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $850/month.' }
    },
    Nebraska: {
        rent: { status: 'red', text: 'No rent control policies.' },
        transit: { status: 'red', text: 'Limited public transit.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $800/month.' }
    },
    Nevada: {
        rent: { status: 'red', text: 'No rent control policies.' },
        transit: { status: 'red', text: 'Limited transit. Las Vegas bus costs $2 per ride.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $950/month.' }
    },
    'New Hampshire': {
        rent: { status: 'red', text: 'No rent control policies.' },
        transit: { status: 'red', text: 'Very limited public transit.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $1,200/month.' }
    },
    'New Jersey': {
        rent: { status: 'yellow', text: 'Some municipalities have rent control.' },
        transit: { status: 'yellow', text: 'NJ Transit costs $1.60+ per ride. Good coverage near NYC.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $1,400/month.' }
    },
    'New Mexico': {
        rent: { status: 'red', text: 'No rent control policies.' },
        transit: { status: 'red', text: 'Limited public transit.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $750/month.' }
    },
    'New York': {
        rent: { status: 'yellow', text: 'NYC has rent stabilization, but it doesn\'t cover all units.' },
        transit: { status: 'yellow', text: 'MTA subway costs $2.90 per ride. Extensive network but not free.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $1,500/month in NYC.' }
    },
    'North Carolina': {
        rent: { status: 'red', text: 'No rent control policies.' },
        transit: { status: 'red', text: 'Limited transit. Charlotte light rail costs $2.20 per ride.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $900/month.' }
    },
    'North Dakota': {
        rent: { status: 'red', text: 'No rent control policies.' },
        transit: { status: 'red', text: 'Very limited public transit.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $850/month.' }
    },
    Ohio: {
        rent: { status: 'red', text: 'No rent control policies.' },
        transit: { status: 'red', text: 'Limited transit. Cleveland RTA costs $2.50 per ride.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $850/month.' }
    },
    Oklahoma: {
        rent: { status: 'red', text: 'No rent control policies.' },
        transit: { status: 'red', text: 'Very limited public transit.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $750/month.' }
    },
    Oregon: {
        rent: { status: 'yellow', text: 'Statewide rent control caps increases at 7% + inflation annually.' },
        transit: { status: 'yellow', text: 'TriMet in Portland costs $2.50 per ride. Not free but decent coverage.' },
        childcare: { status: 'yellow', text: 'Some subsidies available but not universal. Average cost is $1,200/month.' }
    },
    Pennsylvania: {
        rent: { status: 'red', text: 'No statewide rent control.' },
        transit: { status: 'yellow', text: 'SEPTA in Philly costs $2.50 per ride. Good urban coverage.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $1,100/month.' }
    },
    'Rhode Island': {
        rent: { status: 'red', text: 'No rent control policies.' },
        transit: { status: 'yellow', text: 'RIPTA costs $2 per ride. Decent coverage in Providence area.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $1,200/month.' }
    },
    'South Carolina': {
        rent: { status: 'red', text: 'No rent control policies.' },
        transit: { status: 'red', text: 'Very limited public transit.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $800/month.' }
    },
    'South Dakota': {
        rent: { status: 'red', text: 'No rent control policies.' },
        transit: { status: 'red', text: 'Very limited public transit.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $750/month.' }
    },
    Tennessee: {
        rent: { status: 'red', text: 'State law prohibits rent control.' },
        transit: { status: 'red', text: 'Limited transit. Nashville bus costs $2 per ride.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $850/month.' }
    },
    Texas: {
        rent: { status: 'red', text: 'No statewide rent control. Cities are prohibited from enacting it.' },
        transit: { status: 'red', text: 'Limited public transit. Most areas require a car.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $900/month.' }
    },
    Utah: {
        rent: { status: 'red', text: 'No rent control policies.' },
        transit: { status: 'red', text: 'UTA in Salt Lake costs $2.50 per ride. Limited coverage.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $850/month.' }
    },
    Vermont: {
        rent: { status: 'yellow', text: 'Some tenant protections but no hard rent control.' },
        transit: { status: 'red', text: 'Very limited public transit.' },
        childcare: { status: 'yellow', text: 'Some childcare subsidies available. Average cost is $1,100/month.' }
    },
    Virginia: {
        rent: { status: 'red', text: 'State law prohibits rent control.' },
        transit: { status: 'yellow', text: 'Metro in DC area costs $2+ per ride. Good near DC.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $1,200/month.' }
    },
    Washington: {
        rent: { status: 'yellow', text: 'Seattle has some tenant protections, but no statewide rent control.' },
        transit: { status: 'yellow', text: 'Sound Transit and King Metro exist but aren\'t free. $3 per ride.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $1,300/month in Seattle.' }
    },
    'Washington DC': {
        rent: { status: 'yellow', text: 'Rent control exists for buildings built before 1975.' },
        transit: { status: 'yellow', text: 'Metro costs $2+ per ride. Extensive network but not free.' },
        childcare: { status: 'yellow', text: 'Universal Pre-K available. Infant care averages $2,000/month.' }
    },
    'West Virginia': {
        rent: { status: 'red', text: 'No rent control policies.' },
        transit: { status: 'red', text: 'Very limited public transit.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $700/month.' }
    },
    Wisconsin: {
        rent: { status: 'red', text: 'No rent control policies.' },
        transit: { status: 'red', text: 'Limited transit. Milwaukee bus costs $2 per ride.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $1,000/month.' }
    },
    Wyoming: {
        rent: { status: 'red', text: 'No rent control policies.' },
        transit: { status: 'red', text: 'Very limited public transit.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $850/month.' }
    },
};

const STATE_CITIES = {
    Alabama: ['Birmingham', 'Montgomery', 'Mobile'],
    Alaska: ['Anchorage', 'Fairbanks', 'Juneau'],
    Arizona: ['Phoenix', 'Tucson', 'Mesa'],
    Arkansas: ['Little Rock', 'Fort Smith', 'Fayetteville'],
    California: ['Sacramento', 'Los Angeles', 'San Francisco', 'San Diego'],
    Colorado: ['Denver', 'Colorado Springs', 'Aurora'],
    Connecticut: ['Hartford', 'New Haven', 'Stamford'],
    Delaware: ['Wilmington', 'Dover', 'Newark'],
    Florida: ['Tallahassee', 'Miami', 'Orlando', 'Tampa'],
    Georgia: ['Atlanta', 'Savannah', 'Augusta'],
    Hawaii: ['Honolulu', 'Hilo', 'Kailua'],
    Idaho: ['Boise', 'Meridian', 'Nampa'],
    Illinois: ['Chicago', 'Springfield', 'Naperville'],
    Indiana: ['Indianapolis', 'Fort Wayne', 'Evansville'],
    Iowa: ['Des Moines', 'Cedar Rapids', 'Davenport'],
    Kansas: ['Topeka', 'Wichita', 'Overland Park', 'Kansas City'],
    Kentucky: ['Frankfort', 'Louisville', 'Lexington', 'Bowling Green'],
    Louisiana: ['New Orleans', 'Baton Rouge', 'Shreveport'],
    Maine: ['Augusta', 'Portland', 'Lewiston', 'Bangor'],
    Maryland: ['Baltimore', 'Annapolis', 'Rockville'],
    Massachusetts: ['Boston', 'Worcester', 'Cambridge'],
    Michigan: ['Lansing', 'Detroit', 'Grand Rapids', 'Ann Arbor'],
    Minnesota: ['Minneapolis', 'St. Paul', 'Rochester'],
    Mississippi: ['Jackson', 'Gulfport', 'Biloxi'],
    Missouri: ['Jefferson City', 'Kansas City', 'St. Louis', 'Springfield'],
    Montana: ['Billings', 'Missoula', 'Helena'],
    Nebraska: ['Omaha', 'Lincoln', 'Bellevue'],
    Nevada: ['Carson City', 'Las Vegas', 'Reno', 'Henderson'],
    'New Hampshire': ['Manchester', 'Nashua', 'Concord'],
    'New Jersey': ['Trenton', 'Newark', 'Jersey City', 'Paterson'],
    'New Mexico': ['Albuquerque', 'Santa Fe', 'Las Cruces'],
    'New York': ['Albany', 'New York City', 'Buffalo', 'Rochester'],
    'North Carolina': ['Charlotte', 'Raleigh', 'Greensboro'],
    'North Dakota': ['Fargo', 'Bismarck', 'Grand Forks'],
    Ohio: ['Columbus', 'Cleveland', 'Cincinnati'],
    Oklahoma: ['Oklahoma City', 'Tulsa', 'Norman'],
    Oregon: ['Portland', 'Eugene', 'Salem'],
    Pennsylvania: ['Philadelphia', 'Pittsburgh', 'Harrisburg'],
    'Rhode Island': ['Providence', 'Warwick', 'Cranston'],
    'South Carolina': ['Charleston', 'Columbia', 'Greenville'],
    'South Dakota': ['Pierre', 'Sioux Falls', 'Rapid City', 'Aberdeen'],
    Tennessee: ['Nashville', 'Memphis', 'Knoxville'],
    Texas: ['Houston', 'Austin', 'Dallas'],
    Utah: ['Salt Lake City', 'Provo', 'West Valley City'],
    Vermont: ['Burlington', 'Montpelier', 'Rutland'],
    Virginia: ['Virginia Beach', 'Norfolk', 'Richmond'],
    Washington: ['Olympia', 'Seattle', 'Spokane', 'Tacoma'],
    'Washington DC': ['Washington'],
    'West Virginia': ['Charleston', 'Huntington', 'Morgantown'],
    Wisconsin: ['Milwaukee', 'Madison', 'Green Bay'],
    Wyoming: ['Cheyenne', 'Casper', 'Laramie'],
};

const CITY_OVERRIDES = {
    // California cities
    'San Francisco': {
        rent: { status: 'yellow', text: 'Rent control exists but has exceptions. Not a full freeze.' },
        transit: { status: 'yellow', text: 'MUNI costs $3 per ride. Not free, but extensive coverage.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $2,000+/month.' }
    },
    'Los Angeles': {
        rent: { status: 'yellow', text: 'Rent Stabilization Ordinance covers many units, but excludes newer buildings.' },
        transit: { status: 'yellow', text: 'Metro costs $1.75 per ride. Growing network but not comprehensive.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $1,500/month.' }
    },
    // New York
    'New York City': {
        rent: { status: 'yellow', text: 'Rent stabilization covers ~1 million units, but not all apartments.' },
        transit: { status: 'yellow', text: 'MTA subway costs $2.90 per ride. Largest system in US but not free.' },
        childcare: { status: 'yellow', text: 'Free Pre-K for 3-4 year olds. Infant care still expensive at $1,500+/month.' }
    },
    // Oregon
    'Portland': {
        rent: { status: 'yellow', text: 'Portland has local rent control plus statewide caps (7% + inflation).' },
        transit: { status: 'yellow', text: 'TriMet costs $2.50 per ride. Good coverage in metro area.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $1,300/month.' }
    },
    // Washington
    'Seattle': {
        rent: { status: 'yellow', text: 'Strong tenant protections and just cause eviction requirements, but no hard rent caps.' },
        transit: { status: 'yellow', text: 'Sound Transit and Metro cost $2.75-$3.25. Expanding light rail network.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $1,500/month.' }
    },
    // Illinois
    'Chicago': {
        rent: { status: 'yellow', text: 'Rent control ordinance passed in 2021 for buildings with 6+ units.' },
        transit: { status: 'yellow', text: 'CTA costs $2.50 per ride. Extensive L train and bus network.' },
        childcare: { status: 'yellow', text: 'Free Pre-K for 4-year-olds. Infant care averages $1,400/month.' }
    },
    // Minnesota
    'Minneapolis': {
        rent: { status: 'yellow', text: 'Rent stabilization with 3% annual cap since 2022.' },
        transit: { status: 'yellow', text: 'Metro Transit costs $2.50 per ride. Light rail and bus service.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $1,300/month.' }
    },
    'St. Paul': {
        rent: { status: 'yellow', text: 'Rent control with 3% cap enacted in 2021.' },
        transit: { status: 'yellow', text: 'Metro Transit costs $2.50 per ride. Shares system with Minneapolis.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $1,300/month.' }
    },
    // Massachusetts
    'Boston': {
        rent: { status: 'red', text: 'State law prohibits rent control since 1994, despite high costs.' },
        transit: { status: 'yellow', text: 'MBTA costs $2.40 per ride. Extensive subway, bus, and commuter rail.' },
        childcare: { status: 'red', text: 'No universal childcare. Highest costs in US at $1,700+/month.' }
    },
    // Pennsylvania
    'Philadelphia': {
        rent: { status: 'red', text: 'No rent control policies in place.' },
        transit: { status: 'yellow', text: 'SEPTA costs $2.50 per ride. Comprehensive subway, trolley, and bus.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $1,200/month.' }
    },
    // DC (already in STATE_POLICIES but good to note)
    'Washington': {
        rent: { status: 'yellow', text: 'Rent control for buildings built before 1975, about 50% of units covered.' },
        transit: { status: 'yellow', text: 'Metro costs $2-6 depending on distance. Extensive rail and bus network.' },
        childcare: { status: 'yellow', text: 'Universal Pre-K for 3-4 year olds. Infant care still costs $2,000+/month.' }
    },
    // Maryland
    'Baltimore': {
        rent: { status: 'red', text: 'No rent control. Some tenant protections exist.' },
        transit: { status: 'yellow', text: 'Metro/Light Rail costs $1.90 per ride. Limited coverage.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $1,400/month.' }
    },
    // Texas (limited policies)
    'Austin': {
        rent: { status: 'red', text: 'State law prohibits rent control despite rapid price increases.' },
        transit: { status: 'red', text: 'CapMetro bus costs $1.25. Limited rail. Very car-dependent.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $1,000/month.' }
    },
    // Colorado
    'Denver': {
        rent: { status: 'red', text: 'State law prohibits local rent control.' },
        transit: { status: 'yellow', text: 'RTD costs $3 per ride. Light rail and bus cover metro area.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $1,400/month.' }
    },
    // Maine
    'Portland': {
        rent: { status: 'yellow', text: 'Rent control enacted in 2020 with 10% annual cap.' },
        transit: { status: 'red', text: 'Metro bus costs $1.50. Very limited service.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $1,100/month.' }
    },
};

function PolicyCard({ policy, data }) {
    const statusColor = data.status === 'green' ? '#22c55e' :
        data.status === 'yellow' ? '#eab308' : '#ef4444';

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <MaterialCommunityIcons name={policy.icon} size={32} color="#1e293b" />
                <View style={styles.cardTitleContainer}>
                    <Text style={styles.cardTitle}>{policy.title}</Text>
                </View>
                <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            </View>
            {data.status !== 'loading' && (
                <Text style={styles.cardText}>{data.text}</Text>
            )}
        </View>
    );
}

export default function Dashboard() {
    const [location, setLocation] = useState('');
    const [cityData, setCityData] = useState({
        rent: { status: 'loading', text: '' },
        transit: { status: 'loading', text: '' },
        childcare: { status: 'loading', text: '' }
    });
    const [travelMode, setTravelMode] = useState(true);

    const getPolicyData = (city, state) => {
        if (CITY_OVERRIDES[city]) {
            return CITY_OVERRIDES[city];
        }
        if (STATE_POLICIES[state]) {
            return STATE_POLICIES[state];
        }
        return {
            rent: { status: 'red', text: 'No rent control policies in place.' },
            transit: { status: 'red', text: 'Limited or no public transit available.' },
            childcare: { status: 'red', text: 'No universal childcare programs.' }
        };
    };

    const setLocationData = (city, state) => {
        setLocation(`${city}, ${state}`);
        setCityData(getPolicyData(city, state));
    };

    useEffect(() => {
        if (travelMode) {
            pickRandomCity();
            const interval = setInterval(() => {
                pickRandomCity();
            }, 3000); // Slower interval for mobile
            return () => clearInterval(interval);
        } else {
            // Default to SF for now on mobile to avoid permission complexity
            setLocationData('San Francisco', 'California');
        }
    }, [travelMode]);

    const pickRandomCity = () => {
        const states = Object.keys(STATE_POLICIES);
        const randomState = states[Math.floor(Math.random() * states.length)];
        const citiesInState = STATE_CITIES[randomState] || [randomState];
        const randomCity = citiesInState[Math.floor(Math.random() * citiesInState.length)];
        setLocationData(randomCity, randomState);
    };

    const handleShare = async () => {
        const statusEmoji = (status) => status === 'green' ? '✅' : status === 'yellow' ? '⚠️' : '❌';
        const shareText = `https://politok.vercel.app/\n\n${location}:\n🏘️ FREEZE THE RENT: ${statusEmoji(cityData.rent.status)}\n🚌 FAST AND FREE BUSES: ${statusEmoji(cityData.transit.status)}\n🍼 CHILDCARE FOR ALL: ${statusEmoji(cityData.childcare.status)}`;

        try {
            await Share.share({ message: shareText });
        } catch (error) {
            console.log('Error sharing:', error);
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#eff6ff', '#e0e7ff']} // blue-50 to indigo-100
                style={styles.gradient}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                        <Text style={styles.appTitle}>poliTok</Text>

                        <View style={styles.locationContainer}>
                            <MaterialCommunityIcons name="map-marker" size={16} color="#334155" />
                            <Text style={styles.locationText}>{location}</Text>
                        </View>

                        <View style={styles.toggleContainer}>
                            <Switch
                                value={travelMode}
                                onValueChange={setTravelMode}
                                trackColor={{ false: '#cbd5e1', true: '#4f46e5' }}
                                thumbColor={'#fff'}
                            />
                            <Text style={styles.toggleLabel}>✈️ Travel Mode</Text>
                        </View>
                    </View>

                    <View style={styles.cardsContainer}>
                        {POLICIES.map(policy => (
                            <PolicyCard
                                key={policy.id}
                                policy={policy}
                                data={cityData[policy.id]}
                            />
                        ))}
                    </View>

                    <TouchableOpacity
                        onPress={handleShare}
                        style={styles.shareButton}
                    >
                        <MaterialCommunityIcons name="share-variant" size={20} color="white" />
                        <Text style={styles.shareButtonText}>Share My Dashboard</Text>
                    </TouchableOpacity>
                </ScrollView>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 100,
        minHeight: height,
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
    },
    appTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#0f172a',
        marginBottom: 16,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 4,
    },
    locationText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#334155',
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
    },
    toggleLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#312e81',
    },
    cardsContainer: {
        gap: 12,
        marginBottom: 24,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 12,
    },
    cardTitleContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#0f172a',
    },
    statusDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    cardText: {
        fontSize: 12,
        color: '#475569',
        lineHeight: 18,
    },
    shareButton: {
        backgroundColor: '#4f46e5',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 12,
        gap: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    shareButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
    },
});
