'use client';
import React, { useState, useEffect } from 'react';
import { STATE_POLICIES, STATE_LOCATIONS, LOCATION_OVERRIDES, getPolicyData } from '@politok/shared/policyData';
import { POLICIES } from '@politok/shared/constants';
import { COLORS } from '@politok/shared';

function PolicyCard({ policy, data }) {
    const statusColor = data?.status === 'green' ? 'bg-green-500' :
        data?.status === 'yellow' ? 'bg-yellow-500' : 'bg-red-500';

    return (
        <div className="flex items-center gap-3">
            <span className="text-3xl">{policy.iconWeb}</span>
            <div className={`w-3 h-3 rounded-full ${statusColor} flex-shrink-0`} />
            <div className="flex-1">
                {data?.status !== 'loading' && (
                    <p className="text-s text-white leading-relaxed font-bold">{data?.text}</p>
                )}
            </div>
        </div>
    );
}

export default function Dashboard() {
    const [location, setLocation] = useState('Mesa, Arizona');
    const [travelMode, setTravelMode] = useState(true);
    const [loading, setLoading] = useState(true);
    const [currentLocationData, setCurrentLocationData] = useState({ location: 'Mesa', state: 'Arizona' });
    const [backgroundImage, setBackgroundImage] = useState(null);

    const [locationName, stateName] = location ? location.split(', ') : ['Mesa', 'Arizona'];
    const policyData = getPolicyData(locationName, stateName);

    const cityData = {
        rent: policyData.rent,
        transit: policyData.transit,
        childcare: policyData.childcare,
        medicare: policyData.medicare
    };

    useEffect(() => {
        detectUserLocation();
    }, []);

    useEffect(() => {
        if (travelMode) {
            pickRandomLocation();
            // Pick a new random location every 15 seconds
            const interval = setInterval(() => {
                pickRandomLocation();
            }, 15000);
            return () => clearInterval(interval);
        }
    }, [travelMode]);

    // Generate consistent seed from location string
    const getLocationSeed = (loc) => {
        let hash = 0;
        for (let i = 0; i < loc.length; i++) {
            hash = ((hash << 5) - hash) + loc.charCodeAt(i);
            hash = hash & hash;
        }
        return Math.abs(hash);
    };

    const getImageUrl = (loc) => {
        const encodedLocation = encodeURIComponent(loc);
        const seed = getLocationSeed(loc);
        return `https://image.pollinations.ai/prompt/photo%20of%20${encodedLocation}?width=1080&height=1920&nologo=true&seed=${seed}`;
    };

    useEffect(() => {
        const imageUrl = getImageUrl(location);

        // Preload the image
        const img = new Image();
        img.onload = () => {
            setBackgroundImage(imageUrl);
        };
        img.src = imageUrl;

        // Preload next potential location if in travel mode
        if (travelMode) {
            const states = Object.keys(STATE_POLICIES);
            const randomState = states[Math.floor(Math.random() * states.length)];
            const locationsInState = STATE_LOCATIONS[randomState] || [randomState];
            const randomLocation = locationsInState[Math.floor(Math.random() * locationsInState.length)];
            const nextLocation = `${randomLocation}, ${randomState}`;
            const nextImageUrl = getImageUrl(nextLocation);

            // Preload in background
            const preloadImg = new Image();
            preloadImg.src = nextImageUrl;
        }
    }, [location, travelMode]);

    const detectUserLocation = async () => {
        setLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                        );
                        const data = await response.json();

                        const detectedLocation = data.address.city || data.address.town || data.address.village || 'Mesa';
                        const detectedState = data.address.state || 'Arizona';

                        updateLocationState(detectedLocation, detectedState);
                    } catch (error) {
                        console.error('Geocoding error:', error);
                        updateLocationState('Mesa', 'Arizona');
                    }
                    setLoading(false);
                },
                (error) => {
                    // console.error('Geolocation error:', error); // Silently ignore
                    updateLocationState('Mesa', 'Arizona');
                    setLoading(false);
                },
                { timeout: 1000 } // Timeout location detection after 1 second
            );
        } else {
            updateLocationState('Mesa', 'Arizona');
            setLoading(false);
        }
    };

    const updateLocationState = (loc, state) => {
        setLocation(`${loc}, ${state}`);
        setCurrentLocationData({ location: loc, state });
    };

    const pickRandomLocation = () => {
        const states = Object.keys(STATE_POLICIES);
        const randomState = states[Math.floor(Math.random() * states.length)];
        const locationsInState = STATE_LOCATIONS[randomState] || [randomState];
        const randomLocation = locationsInState[Math.floor(Math.random() * locationsInState.length)];
        updateLocationState(randomLocation, randomState);
    };

    const handleShare = () => {
        const statusEmoji = (status) => status === 'green' ? '🟢' : status === 'yellow' ? '🟡' : '🔴';
        const shareText = `${location}:\n🏘️ ${statusEmoji(cityData.rent.status)} ${cityData.rent.text}\n🚌 ${statusEmoji(cityData.transit.status)} ${cityData.transit.text}\n🍼 ${statusEmoji(cityData.childcare.status)} ${cityData.childcare.text}\n🏥 ${statusEmoji(cityData.medicare.status)} ${cityData.medicare.text}\n\nHow would you vote?\n\nhttps://politok.vercel.app/`;

        if (navigator.share) {
            navigator.share({
                text: shareText
            }).catch((error) => {
                console.log('Error sharing:', error);
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText);
            alert('Share text copied to clipboard!');
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
        <div
            className="w-full h-full flex flex-col text-white relative bg-cover bg-center"
            style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : COLORS.BG_GRADIENT_WEB,
                backgroundColor: '#1e293b' // Fallback
            }}
        >
            {/* Dark Overlay for readability */}
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />

            <div className="flex-1 overflow-auto p-6 relative z-10">
                <div className="max-w-2xl mx-auto">
                    {/* Location and Travel Mode Toggle - Single Line */}
                    <div className="mb-6 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-xl text-white">{location}</span>
                        </div>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <div className="relative inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={travelMode}
                                    onChange={(e) => setTravelMode(e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </div>
                            <span className="text-2xl">🛰️</span>
                        </label>
                    </div>

                    {/* Policy Cards */}
                    <div className="space-y-4">
                        {POLICIES.map(policy => (
                            <PolicyCard key={policy.id} policy={policy} data={cityData[policy.id]} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Share button */}
            <div className="absolute right-4 bottom-4 z-20">
                <button
                    onClick={handleShare}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-sm text-white shadow-2xl hover:scale-110 active:scale-95 transition transform flex flex-col items-center justify-center"
                >
                    <div className="text-3xl mb-1">📤</div>
                    <div className="text-[10px] font-black uppercase tracking-wider">SHARE</div>
                </button>
            </div>
        </div>
    );
}
