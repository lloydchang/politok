'use client';
import React, { useState, useEffect } from 'react';
import { MapPin, Share2 } from 'lucide-react';

const POLICIES = [
    { id: 'rent', icon: '🏘️', title: 'FREEZE THE RENT' },
    { id: 'transit', icon: '🚌', title: 'FAST AND FREE BUSES' },
    { id: 'childcare', icon: '🍼', title: 'CHILDCARE FOR ALL' }
];

// State-level policies with color-coded statuses and explanations
const STATE_POLICIES = {
    California: {
        rent: { status: 'yellow', text: 'Some rent control exists in cities like SF and LA, but not statewide.' },
        transit: { status: 'yellow', text: 'Public transit exists but is not free. LA Metro costs $1.75 per ride.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $1,400/month.' }
    },
    // Add similar structures for other states as needed
};

// Database of real US cities with special overrides
const CITY_DATABASE = [
    { city: 'San Francisco', state: 'California' },
    { city: 'Los Angeles', state: 'California' },
    { city: 'New York', state: 'New York' },
    { city: 'Austin', state: 'Texas' },
    { city: 'Portland', state: 'Oregon' },
    { city: 'Seattle', state: 'Washington' },
];

const CITY_OVERRIDES = {
    'San Francisco': {
        rent: { status: 'yellow', text: 'Rent control exists but has exceptions. Not a full freeze.' },
        transit: { status: 'yellow', text: 'MUNI costs $3 per ride. Not free, but extensive coverage.' },
        childcare: { status: 'red', text: 'No universal childcare. Average cost is $2,000+/month.' }
    },
};

function PolicyCard({ policy, data }) {
    const statusColor = data.status === 'green' ? 'bg-green-500' :
        data.status === 'yellow' ? 'bg-yellow-500' : 'bg-red-500';

    return (
        <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{policy.icon}</span>
                <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-sm">{policy.title}</h3>
                </div>
                <div className={`w-3 h-3 rounded-full ${statusColor}`} />
            </div>
            {data.status !== 'loading' && (
                <p className="text-xs text-gray-600 leading-relaxed">{data.text}</p>
            )}
        </div>
    );
}

export default function Dashboard() {
    const [location, setLocation] = useState('');
    const [cityData, setCityData] = useState({
        rent: { status: 'loading', text: '' },
        transit: { status: 'loading', text: '' },
        childcare: { status: 'loading', text: '' }
    });
    const [loading, setLoading] = useState(true);
    const [travelMode, setTravelMode] = useState(true);

    const getPolicyData = (city, state) => {
        const cityKey = `${city}, ${state}`;
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
        setLoading(false);
    };

    useEffect(() => {
        if (travelMode) {
            pickRandomCity();
            const interval = setInterval(() => {
                pickRandomCity();
            }, 1000);
            return () => clearInterval(interval);
        } else {
            detectUserLocation();
        }
    }, [travelMode]);

    const detectUserLocation = () => {
        setLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`)
                        .then(res => res.json())
                        .then(data => {
                            const city = data.city || data.locality || 'Unknown City';
                            const state = data.principalSubdivision || 'Unknown State';
                            setLocationData(city, state);
                        })
                        .catch(() => {
                            setLocationData('San Francisco', 'California');
                        });
                },
                () => {
                    setLocationData('San Francisco', 'California');
                }
            );
        } else {
            setLocationData('San Francisco', 'California');
        }
    };

    const pickRandomCity = () => {
        const states = Object.keys(STATE_POLICIES);
        const randomState = states[Math.floor(Math.random() * states.length)];
        const genericCities = ['Springfield', 'Franklin', 'Clinton', 'Madison', 'Fairview', 'Salem', 'Georgetown'];
        const randomCityName = genericCities[Math.floor(Math.random() * genericCities.length)];
        setLocationData(randomCityName, randomState);
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
        <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-100 p-4 pt-16 flex flex-col">
            <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col justify-center">
                {/* Header */}
                <div className="text-center mb-0">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">poliTok</h1>
                    
                    <div className="flex items-center justify-center gap-2 text-gray-700 mb-3">
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
        </div>
    );
}
