import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Share, Dimensions, ScrollView, Switch, ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { STATE_POLICIES, STATE_LOCATIONS, LOCATION_OVERRIDES, getPolicyData } from '@politok/shared/policyData';
import { POLICIES } from '@politok/shared/constants';
import { COLORS } from '@politok/shared';

const { width, height } = Dimensions.get('window');

function PolicyCard({ policy, data }) {
    // Defensive check for undefined data
    if (!data) {
        console.warn('PolicyCard received undefined data for policy:', policy);
        return null;
    }

    const statusColor = data.status === 'green' ? '#22c55e' :
        data.status === 'yellow' ? '#eab308' : '#ef4444';

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <MaterialCommunityIcons name={policy.iconMobile} size={30} color="white" />
                <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                <View style={styles.cardTitleContainer}>
                    {data.status !== 'loading' && (
                        <Text style={styles.cardText}>{data.text}</Text>
                    )}
                </View>
            </View>
        </View>
    );
}

export default function Dashboard({ width = Dimensions.get('window').width, height = Dimensions.get('window').height } = {}) {
    const [location, setLocation] = useState('Mesa, Arizona');
    const [travelMode, setTravelMode] = useState(true);
    const [locationData, setLocationDataState] = useState({ location: 'Mesa', state: 'Arizona' });

    const [locationName, stateName] = location.split(', ');
    const policyData = getPolicyData(locationName, stateName);

    const cityData = {
        rent: policyData?.rent || { status: 'loading', text: 'Loading...' },
        transit: policyData?.transit || { status: 'loading', text: 'Loading...' },
        childcare: policyData?.childcare || { status: 'loading', text: 'Loading...' },
        medicare: policyData?.medicare || { status: 'loading', text: 'Loading...' }
    };

    // Map policy IDs to data keys
    // Map policy IDs to data keys
    // IDs in POLICIES are 'rent', 'transit', 'childcare', 'medicare' which match cityData keys
    // No mapping needed if IDs match keys

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

    const setLocationData = (loc, state) => {
        setLocation(`${loc}, ${state}`);
        setLocationDataState({ location: loc, state });
    };

    const pickRandomLocation = () => {
        const states = Object.keys(STATE_POLICIES);
        const randomState = states[Math.floor(Math.random() * states.length)];
        const locationsInState = STATE_LOCATIONS[randomState] || [randomState];
        const randomLocation = locationsInState[Math.floor(Math.random() * locationsInState.length)];
        setLocationData(randomLocation, randomState);
    };

    const handleShare = async () => {
        const statusEmoji = (status) => status === 'green' ? '🟢' : status === 'yellow' ? '🟡' : '🔴';
        const shareText = `${location}:\n🏘️ ${statusEmoji(cityData.rent.status)} ${cityData.rent.text}\n🚌 ${statusEmoji(cityData.transit.status)} ${cityData.transit.text}\n🍼 ${statusEmoji(cityData.childcare.status)} ${cityData.childcare.text}\n🏥 ${statusEmoji(cityData.medicare.status)} ${cityData.medicare.text}\n\nHow would you vote?\n\nhttps://politok.vercel.app/`;

        try {
            await Share.share({ message: shareText });
        } catch (error) {
            console.log('Error sharing:', error);
        }
    };

    const [backgroundImage, setBackgroundImage] = useState(null);

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
        setBackgroundImage(imageUrl);

        // Preload next potential location if in travel mode
        if (travelMode) {
            const states = Object.keys(STATE_POLICIES);
            const randomState = states[Math.floor(Math.random() * states.length)];
            const locationsInState = STATE_LOCATIONS[randomState] || [randomState];
            const randomLocation = locationsInState[Math.floor(Math.random() * locationsInState.length)];
            const nextLocation = `${randomLocation}, ${randomState}`;
            const nextImageUrl = getImageUrl(nextLocation);

            // Preload in background using Image.prefetch for React Native
            if (Image.prefetch) {
                Image.prefetch(nextImageUrl).catch(() => {
                    // Silently ignore prefetch errors
                });
            }
        }
    }, [location, travelMode]);

    return (
        <View style={[styles.container, { width, height }]}>
            <ImageBackground
                source={backgroundImage ? { uri: backgroundImage } : null}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <LinearGradient
                    colors={backgroundImage ? ['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)'] : COLORS.BG_GRADIENT_MOBILE}
                    style={styles.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                >
                    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                        {/* Location and Toggle - Single Line */}
                        <View style={styles.header}>
                            <View style={styles.locationContainer}>
                                <Text style={styles.locationText}>{locationName}</Text>
                                <Text style={styles.stateText}>{stateName}</Text>
                            </View>

                            <View style={styles.toggleContainer}>
                                <Switch
                                    value={travelMode}
                                    onValueChange={setTravelMode}
                                    trackColor={{ false: '#4b5563', true: '#3b82f6' }}
                                    thumbColor={'#ffffff'}
                                />
                                <Text style={styles.toggleLabel}>🛰️</Text>
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

                    </ScrollView>

                    {/* Share button */}
                    <TouchableOpacity
                        onPress={handleShare}
                        style={styles.shareButton}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.shareEmoji}>📤</Text>
                        <Text style={styles.shareText}>SHARE</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    scrollContent: {
        paddingHorizontal: 24, // Match web padding
        paddingTop: 40, // Reduced from 60 to show more content in thumbnail
        paddingBottom: 100,
        minHeight: '100%', // Use percentage or passed height if needed, but 100% of container is safer
        alignItems: 'center', // Center content horizontally
    },
    header: {
        width: '100%', // Ensure full width for space-between
        marginBottom: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
    },
    locationText: {
        fontSize: 20, // Match web text-xl
        fontWeight: 'bold', // Match web font-bold (700)
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    locationContainer: {
        flex: 1,
    },
    stateText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'rgba(255, 255, 255, 0.9)',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 20,
    },
    toggleLabel: {
        fontSize: 16,
    },
    cardsContainer: {
        width: '100%', // Ensure full width
        gap: 12,
        marginBottom: 24,
    },
    card: {
        // Removed card background/border to match web
        paddingVertical: 8,
        paddingHorizontal: 0,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    cardTitleContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white', // White text
    },
    statusDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    cardText: {
        fontSize: 14, // Match web text-s
        color: 'white', // White text
        lineHeight: 21, // Adjusted for smaller font
        fontWeight: 'bold', // Bold text
    },
    shareButton: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // White transparent
        borderWidth: 0, // No border
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        zIndex: 20,
        // backdropFilter not supported in RN, but opacity handles the look
    },
    shareEmoji: {
        fontSize: 32,
        marginBottom: 4,
    },
    shareText: {
        color: 'white',
        fontWeight: '900',
        fontSize: 10,
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
});
