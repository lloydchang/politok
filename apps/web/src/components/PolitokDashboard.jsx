import React, { useState, useEffect } from 'react';
import { MapPin, Share2, Info, AlertCircle } from 'lucide-react';

// Comprehensive city database with geolocation and policy data
// Priority: Swing states, competitive districts, major cities
const CITY_DATABASE = [
    // SWING STATES - ARIZONA
    {
        city: 'Phoenix', state: 'Arizona', lat: 33.4484, lon: -112.0740, swingState: true,
        rent: { status: 'red', text: 'No rent control. Arizona bans local rent regulations since 1981' },
        transit: { status: 'yellow', text: 'Valley Metro $2 fare. Reduced fares for youth/seniors' },
        childcare: { status: 'yellow', text: 'Subsidies available but waitlist active. Income limits apply' }
    },
    {
        city: 'Tucson', state: 'Arizona', lat: 32.2217, lon: -110.9265, swingState: true,
        rent: { status: 'red', text: 'No rent control allowed under state ban' },
        transit: { status: 'yellow', text: 'SunTran $1.75 fare. Free for youth under 18' },
        childcare: { status: 'yellow', text: 'State subsidies with waitlist. First Things First programs available' }
    },
    {
        city: 'Mesa', state: 'Arizona', lat: 33.4152, lon: -111.8315, swingState: true,
        rent: { status: 'red', text: 'No rent control under state ban' },
        transit: { status: 'yellow', text: 'Valley Metro $2 fare. Part of regional system' },
        childcare: { status: 'yellow', text: 'Limited subsidies through state programs' }
    },

    // SWING STATES - GEORGIA
    {
        city: 'Atlanta', state: 'Georgia', lat: 33.7490, lon: -84.3880, swingState: true,
        rent: { status: 'red', text: 'No rent control. Georgia prohibits local rent regulations' },
        transit: { status: 'yellow', text: 'MARTA $2.50 fare. Reduced $1 for seniors/disabled' },
        childcare: { status: 'yellow', text: 'Pre-K program available. Income-based subsidies with limits' }
    },
    {
        city: 'Savannah', state: 'Georgia', lat: 32.0809, lon: -81.0912, swingState: true,
        rent: { status: 'red', text: 'No rent control allowed statewide' },
        transit: { status: 'yellow', text: 'Chatham Area Transit $1.50 fare. Free transfers' },
        childcare: { status: 'yellow', text: 'State Pre-K and limited subsidies available' }
    },

    // SWING STATES - MICHIGAN
    {
        city: 'Detroit', state: 'Michigan', lat: 42.3314, lon: -83.0458, swingState: true,
        rent: { status: 'yellow', text: 'No statewide control but local protections exist' },
        transit: { status: 'yellow', text: 'DDOT/SMART $2 fare. QLine streetcar free' },
        childcare: { status: 'yellow', text: 'Great Start Readiness Program. Subsidies income-based' }
    },
    {
        city: 'Grand Rapids', state: 'Michigan', lat: 42.9634, lon: -85.6681, swingState: true,
        rent: { status: 'red', text: 'No rent control regulations' },
        transit: { status: 'yellow', text: 'The Rapid $1.75 fare. Free for youth under 18' },
        childcare: { status: 'yellow', text: 'State preschool and limited subsidies' }
    },
    {
        city: 'Ann Arbor', state: 'Michigan', lat: 42.2808, lon: -83.7430, swingState: true,
        rent: { status: 'yellow', text: 'Tenant protections but no rent freeze' },
        transit: { status: 'green', text: 'TheRide free for all riders since 2023' },
        childcare: { status: 'yellow', text: 'Childcare subsidies available, waitlists common' }
    },

    // SWING STATES - NEVADA
    {
        city: 'Las Vegas', state: 'Nevada', lat: 36.1699, lon: -115.1398, swingState: true,
        rent: { status: 'red', text: 'No rent control. Nevada allows unlimited rent increases' },
        transit: { status: 'yellow', text: 'RTC $2 fare. Reduced fares available' },
        childcare: { status: 'yellow', text: 'State subsidies limited. Long waitlists' }
    },
    {
        city: 'Reno', state: 'Nevada', lat: 39.5296, lon: -119.8138, swingState: true,
        rent: { status: 'red', text: 'No rent control policies' },
        transit: { status: 'yellow', text: 'RTC $2 fare. Youth ride free' },
        childcare: { status: 'yellow', text: 'Limited state childcare assistance' }
    },

    // SWING STATES - NORTH CAROLINA
    {
        city: 'Charlotte', state: 'North Carolina', lat: 35.2271, lon: -80.8431, swingState: true,
        rent: { status: 'red', text: 'No rent control. State prohibits local regulations' },
        transit: { status: 'yellow', text: 'CATS $2.20 fare. Reduced fares for seniors/youth' },
        childcare: { status: 'yellow', text: 'NC Pre-K limited slots. Subsidies income-restricted' }
    },
    {
        city: 'Raleigh', state: 'North Carolina', lat: 35.7796, lon: -78.6382, swingState: true,
        rent: { status: 'red', text: 'No rent control allowed' },
        transit: { status: 'yellow', text: 'GoRaleigh $1.25 fare. Free transfers' },
        childcare: { status: 'yellow', text: 'Pre-K available. Childcare subsidies limited' }
    },

    // SWING STATES - PENNSYLVANIA
    {
        city: 'Philadelphia', state: 'Pennsylvania', lat: 39.9526, lon: -75.1652, swingState: true,
        rent: { status: 'yellow', text: 'Some tenant protections. No rent control currently' },
        transit: { status: 'yellow', text: 'SEPTA $2.50 fare. Free for youth proposed' },
        childcare: { status: 'yellow', text: 'Pre-K Counts program. Subsidies income-based' }
    },
    {
        city: 'Pittsburgh', state: 'Pennsylvania', lat: 40.4406, lon: -79.9959, swingState: true,
        rent: { status: 'red', text: 'No rent control policies' },
        transit: { status: 'yellow', text: 'Port Authority $2.75 fare. Reduced fares available' },
        childcare: { status: 'yellow', text: 'Pre-K and Head Start available. Limited subsidies' }
    },

    // SWING STATES - WISCONSIN
    {
        city: 'Milwaukee', state: 'Wisconsin', lat: 43.0389, lon: -87.9065, swingState: true,
        rent: { status: 'red', text: 'No rent control. Wisconsin prohibits local regulations' },
        transit: { status: 'yellow', text: 'MCTS $2 fare. Reduced fares for seniors/disabled' },
        childcare: { status: 'yellow', text: '4K program available. Childcare subsidies limited' }
    },
    {
        city: 'Madison', state: 'Wisconsin', lat: 43.0731, lon: -89.4012, swingState: true,
        rent: { status: 'red', text: 'No rent control allowed under state law' },
        transit: { status: 'yellow', text: 'Metro Transit $2 fare. Youth under 12 free' },
        childcare: { status: 'yellow', text: '4K program. State subsidies with waitlists' }
    },

    // MAJOR CITIES - CALIFORNIA (Competitive districts)
    {
        city: 'San Francisco', state: 'California', lat: 37.7749, lon: -122.4194,
        rent: { status: 'green', text: 'Strong rent control caps increases at 3% annually' },
        transit: { status: 'yellow', text: 'Muni $3 fare. Free for youth/seniors. Expansion proposed' },
        childcare: { status: 'green', text: 'Universal preschool. Subsidies for families under $150k' }
    },
    {
        city: 'Los Angeles', state: 'California', lat: 34.0522, lon: -118.2437,
        rent: { status: 'yellow', text: 'Rent stabilization for older buildings. New proposals pending' },
        transit: { status: 'yellow', text: 'Metro $1.75 fare. Free for students. Youth ride free' },
        childcare: { status: 'yellow', text: 'Transitional Kindergarten expanding. Subsidies available' }
    },
    {
        city: 'San Diego', state: 'California', lat: 32.7157, lon: -117.1611,
        rent: { status: 'yellow', text: 'Limited rent control for older buildings only' },
        transit: { status: 'yellow', text: 'MTS $2.50 fare. Youth pronto card available' },
        childcare: { status: 'yellow', text: 'State preschool. Income-based subsidies' }
    },
    {
        city: 'Oakland', state: 'California', lat: 37.8044, lon: -122.2712,
        rent: { status: 'green', text: 'Rent control with caps on increases' },
        transit: { status: 'yellow', text: 'AC Transit $2.50. BART connections' },
        childcare: { status: 'green', text: 'Oakland Preschool for All. Strong subsidies' }
    },

    // MAJOR CITIES - NEW YORK (Multiple competitive districts)
    {
        city: 'New York', state: 'New York', lat: 40.7128, lon: -74.0060,
        rent: { status: 'green', text: 'Rent stabilization protects 1M+ units with strict caps' },
        transit: { status: 'green', text: 'Free subway/bus for under 18 and seniors 65+' },
        childcare: { status: 'green', text: '3-K and Pre-K for All free. Universal access' }
    },
    {
        city: 'Buffalo', state: 'New York', lat: 42.8864, lon: -78.8784,
        rent: { status: 'yellow', text: 'Emergency rent relief available. No permanent control' },
        transit: { status: 'yellow', text: 'NFTA $2 fare. Reduced fares available' },
        childcare: { status: 'yellow', text: 'Universal Pre-K. State subsidies income-based' }
    },

    // MAJOR CITIES - TEXAS
    {
        city: 'Austin', state: 'Texas', lat: 30.2672, lon: -97.7431,
        rent: { status: 'yellow', text: 'No rent control but tenant protections strengthened 2024' },
        transit: { status: 'red', text: 'Cap Metro $1.25. Free transit rejected by voters' },
        childcare: { status: 'red', text: 'Limited subsidies. Long waitlists, income restrictions' }
    },
    {
        city: 'Houston', state: 'Texas', lat: 29.7604, lon: -95.3698,
        rent: { status: 'red', text: 'No rent control. Texas bans local regulations' },
        transit: { status: 'red', text: 'METRO $1.25 fare. Limited free programs' },
        childcare: { status: 'red', text: 'State subsidies very limited. Long waitlists' }
    },
    {
        city: 'Dallas', state: 'Texas', lat: 32.7767, lon: -96.7970,
        rent: { status: 'red', text: 'No rent control allowed under state law' },
        transit: { status: 'yellow', text: 'DART $2.50 fare. Reduced fares available' },
        childcare: { status: 'red', text: 'Limited state childcare assistance' }
    },
    {
        city: 'San Antonio', state: 'Texas', lat: 29.4241, lon: -98.4936,
        rent: { status: 'red', text: 'No rent control policies' },
        transit: { status: 'yellow', text: 'VIA $1.30 fare. Reduced fares for seniors/disabled' },
        childcare: { status: 'red', text: 'Pre-K for SA. Limited subsidies beyond that' }
    },

    // MAJOR CITIES - ILLINOIS
    {
        city: 'Chicago', state: 'Illinois', lat: 41.8781, lon: -87.6298,
        rent: { status: 'red', text: 'No rent control. Illinois bans local rent control laws' },
        transit: { status: 'yellow', text: 'CTA $2.50 fare. Reduced fare programs available' },
        childcare: { status: 'yellow', text: 'Universal Pre-K expanding but limited slots' }
    },

    // MAJOR CITIES - WASHINGTON
    {
        city: 'Seattle', state: 'Washington', lat: 47.6062, lon: -122.3321,
        rent: { status: 'yellow', text: 'Rent increase caps during tenancy. No full freeze' },
        transit: { status: 'yellow', text: 'Metro $3 fare. Youth ride free. Adult free transit proposed' },
        childcare: { status: 'green', text: 'Seattle Preschool Program free for eligible families' }
    },

    // MAJOR CITIES - COLORADO
    {
        city: 'Denver', state: 'Colorado', lat: 39.7392, lon: -104.9903,
        rent: { status: 'red', text: 'No rent control yet. State repealed ban in 2021' },
        transit: { status: 'yellow', text: 'RTD $3 fare. Free for youth under 19 starting 2024' },
        childcare: { status: 'yellow', text: 'State preschool available. Income-based subsidies' }
    },

    // MAJOR CITIES - OREGON
    {
        city: 'Portland', state: 'Oregon', lat: 45.5152, lon: -122.6784,
        rent: { status: 'yellow', text: 'Statewide rent control caps increases at 7% + inflation' },
        transit: { status: 'yellow', text: 'TriMet $2.50 fare. Youth ride free. Free transit studied' },
        childcare: { status: 'yellow', text: 'Preschool for All expanding. Income-based subsidies' }
    },

    // MAJOR CITIES - MASSACHUSETTS
    {
        city: 'Boston', state: 'Massachusetts', lat: 42.3601, lon: -71.0589,
        rent: { status: 'red', text: 'Rent control banned statewide since 1994. No caps' },
        transit: { status: 'yellow', text: 'MBTA $2.40 fare. Free for youth under 25 proposed' },
        childcare: { status: 'yellow', text: 'Universal Pre-K pilot. Subsidies for families under $85k' }
    }
];

const POLICIES = [
    { id: 'rent', title: 'FREEZE THE RENT', icon: '🏘️' },
    { id: 'transit', title: 'FAST AND FREE BUSES', icon: '🚌' },
    { id: 'childcare', title: 'CHILDCARE FOR ALL', icon: '🍼' }
];

const PolicyCard = ({ policy, data, onClick }) => {
    const statusColors = {
        green: 'bg-green-500',
        yellow: 'bg-yellow-500',
        red: 'bg-red-500',
        loading: 'bg-gray-400'
    };

    return (
        <div
            onClick={onClick}
            className="bg-white rounded-lg p-4 shadow-md cursor-pointer hover:shadow-lg transition-shadow border-l-4"
            style={{
                borderLeftColor: data.status === 'green' ? '#22c55e' :
                    data.status === 'yellow' ? '#eab308' :
                        data.status === 'red' ? '#ef4444' : '#9ca3af'
            }}
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{policy.icon}</span>
                        <h3 className="text-lg font-bold text-gray-900">{policy.title}</h3>
                    </div>
                    <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                        {data.status === 'loading' ? 'Finding closest location...' : data.text}
                    </p>
                </div>
                <div className={`w-3 h-3 rounded-full ${statusColors[data.status]} flex-shrink-0 mt-1 ml-2`}>
                    {data.status === 'loading' && (
                        <div className="w-3 h-3 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                    )}
                </div>
            </div>
        </div>
    );
};

// Calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 3959; // Earth radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Find closest city from database
function findClosestCity(userLat, userLon) {
    let closest = CITY_DATABASE[0];
    let minDistance = Infinity;

    for (const city of CITY_DATABASE) {
        const distance = calculateDistance(userLat, userLon, city.lat, city.lon);
        if (distance < minDistance) {
            minDistance = distance;
            closest = city;
        }
    }

    return { ...closest, distance: Math.round(minDistance) };
}

export default function Politok() {
    const [location, setLocation] = useState('');
    const [distance, setDistance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const [cityData, setCityData] = useState({
        rent: { status: 'loading', text: 'Finding closest location...' },
        transit: { status: 'loading', text: 'Finding closest location...' },
        childcare: { status: 'loading', text: 'Finding closest location...' }
    });

    const [travelMode, setTravelMode] = useState(true);

    useEffect(() => {
        detectLocationAndMatch();
    }, []);

    // Travel Mode Effect
    useEffect(() => {
        let interval;
        if (travelMode) {
            interval = setInterval(() => {
                useRandomCity();
            }, 3000); // Change city every 3 seconds
        }
        return () => clearInterval(interval);
    }, [travelMode]);

    const detectLocationAndMatch = async () => {

        try {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        matchClosestCity(latitude, longitude);
                    },
                    () => {
                        // Fallback to IP-based location
                        ipBasedLocation();
                    },
                    {
                        timeout: 10000,
                        enableHighAccuracy: true
                    }
                );
            } else {
                ipBasedLocation();
            }
        } catch (err) {
            // Ultimate fallback: random city
            useRandomCity();
        }
    };

    const ipBasedLocation = async () => {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();

            if (data.latitude && data.longitude) {
                matchClosestCity(data.latitude, data.longitude);
            } else {
                useRandomCity();
            }
        } catch (err) {
            useRandomCity();
        }
    };

    const matchClosestCity = (lat, lon) => {
        const closestCity = findClosestCity(lat, lon);
        setLocation(`${closestCity.city}, ${closestCity.state}`);
        setDistance(closestCity.distance);
        setCityData({
            rent: closestCity.rent,
            transit: closestCity.transit,
            childcare: closestCity.childcare
        });
        setLoading(false);
    };

    const useRandomCity = () => {
        const randomCity = CITY_DATABASE[Math.floor(Math.random() * CITY_DATABASE.length)];
        setLocation(`${randomCity.city}, ${randomCity.state}`);
        setCityData({
            rent: randomCity.rent,
            transit: randomCity.transit,
            childcare: randomCity.childcare
        });
        setLoading(false);
    };

    const handleShare = async () => {
        const statusEmoji = (status) => status === 'green' ? '✅' : status === 'yellow' ? '⚠️' : '❌';
        const shareText = `https://politok.vercel.app/\n\n${location}:\n🏘️ FREEZE THE RENT: ${statusEmoji(cityData.rent.status)}\n🚌 FAST AND FREE BUSES: ${statusEmoji(cityData.transit.status)}\n🍼 CHILDCARE FOR ALL: ${statusEmoji(cityData.childcare.status)}`;
        if (navigator.share) {
            try {
                await navigator.share({ text: shareText });
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            navigator.clipboard.writeText(shareText);
            alert('Dashboard copied to clipboard!');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Detecting your location...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-100 p-4 pt-24 flex flex-col">
            <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col justify-center">
                {/* Header */}
                <div className="text-center mb-4">
                    <h1 className="text-4xl font-bold text-gray-900 mb-1">Politok</h1>
                    <div className="flex items-center justify-center gap-2 text-gray-700 mb-2">
                        <MapPin size={16} />
                        <span className="font-semibold text-sm">{location}</span>
                    </div>

                    {/* Travel Mode Toggle */}
                    <div className="flex justify-center">
                        <label className="flex items-center gap-2 cursor-pointer bg-white/50 px-3 py-1 rounded-full hover:bg-white/80 transition-colors">
                            <div className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={travelMode}
                                    onChange={(e) => setTravelMode(e.target.checked)}
                                />
                                <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                            </div>
                            <span className="text-xs font-semibold text-indigo-900">✈️ Travel Mode</span>
                        </label>
                    </div>
                </div>

                {/* Policy Cards */}
                <div className="space-y-3 mb-4 flex-1 flex flex-col justify-center">
                    {POLICIES.map(policy => (
                        <PolicyCard
                            key={policy.id}
                            policy={policy}
                            data={cityData[policy.id]}
                            onClick={() => cityData[policy.id].status !== 'loading' && setSelectedPolicy(policy)}
                        />
                    ))}
                </div>

                {/* Share Button */}
                <button
                    onClick={handleShare}
                    disabled={Object.values(cityData).some(p => p.status === 'loading')}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg text-sm"
                >
                    <Share2 size={18} />
                    Share My Dashboard
                </button>
            </div>

            {/* Detail Modal */}
            {selectedPolicy && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                    onClick={() => setSelectedPolicy(null)}
                >
                    <div
                        className="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-4xl">{selectedPolicy.icon}</span>
                            <h2 className="text-2xl font-bold text-gray-900">{selectedPolicy.title}</h2>
                        </div>
                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div
                                    className={`w-3 h-3 rounded-full ${cityData[selectedPolicy.id].status === 'green' ? 'bg-green-500' :
                                        cityData[selectedPolicy.id].status === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                                        }`}
                                />
                                <span className="font-semibold text-gray-700">Status in {location}</span>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{cityData[selectedPolicy.id].text}</p>
                        </div>
                        <button
                            onClick={() => setSelectedPolicy(null)}
                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
