'use client';
import React, { useState, useEffect } from 'react';
import { MapPin, Share2 } from 'lucide-react';
import { STATE_POLICIES, STATE_PLACES, PLACE_OVERRIDES, getPolicyData } from '@politok/shared/policyData';
import { POLICIES } from '@politok/shared/constants';
import { COLORS } from '@politok/shared';

function PolicyCard({ policy, data }) {
    const statusColor = data.status === 'green' ? 'bg-green-500' :
        data.status === 'yellow' ? 'bg-yellow-500' : 'bg-red-500';

    return (
        <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{policy.iconWeb}</span>
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
    const [location, setLocation] = useState('Mesa, Arizona');
    const [travelMode, setTravelMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentLocationData, setCurrentLocationData] = useState({ location: 'Mesa', state: 'Arizona' });

    const [locationName, stateName] = location.split(', ');
    const policyData = getPolicyData(locationName, stateName);

    const cityData = {
        rent: policyData.rent,
        transit: policyData.transit,
        childcare: policyData.childcare
    };

    useEffect(() => {
        if (travelMode) {
            pickRandomLocation();
            const interval = setInterval(() => {
                pickRandomLocation();
            }, 1000);
            return () => clearInterval(interval);
        } else {
            detectUserLocation();
        }
    }, [travelMode]);

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
                    console.error('Geolocation error:', error);
                    updateLocationState('Mesa', 'Arizona');
                    setLoading(false);
                }
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


    const handleShare = async () => {
        const statusEmoji = (status) => status === 'green' ? '🟢' : status === 'yellow' ? '🟡' : '🔴';
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

    return (
        <div
            className="w-full h-full flex flex-col text-white relative"
            style={{ background: COLORS.BG_GRADIENT_WEB }}
        >
            <div className="flex-1 overflow-auto p-6">
                <div className="max-w-2xl mx-auto">
                    {/* Location and Travel Mode Toggle - Single Line */}
                    <div className="mb-6 flex items-center justify-center gap-4">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                            <span className="font-semibold text-white">{location}</span>
                        </div>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <span className="text-2xl">🇺🇸</span>
                            <div className="relative inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={travelMode}
                                    onChange={(e) => setTravelMode(e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </div>
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
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-blue-600 text-white border-2 border-white shadow-2xl hover:scale-110 active:scale-95 transition transform flex flex-col items-center justify-center"
                >
                    <div className="text-3xl mb-1">📤</div>
                    <div className="text-[10px] font-black uppercase tracking-wider">SHARE</div>
                </button>
            </div>
        </div>
    );
}
