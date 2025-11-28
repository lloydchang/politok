import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Share, Dimensions, ScrollView, Switch, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { STATE_POLICIES, STATE_PLACES, PLACE_OVERRIDES, getPolicyData } from '@politok/shared/policyData';
import { POLICIES } from '@politok/shared/constants';
import { COLORS } from '@politok/shared';

const { width, height } = Dimensions.get('window');

function PolicyCard({ policy, data }) {
    const statusColor = data.status === 'green' ? '#22c55e' :
        data.status === 'yellow' ? '#eab308' : '#ef4444';

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <MaterialCommunityIcons name={policy.iconMobile} size={32} color="#1e293b" />
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

export default function Dashboard() {
    const [location, setLocation] = useState('Mesa, Arizona');
    const [travelMode, setTravelMode] = useState(false);
    const [locationData, setLocationDataState] = useState({ location: 'Mesa', state: 'Arizona' });

    const [locationName, stateName] = location.split(', ');
    const policyData = getPolicyData(locationName, stateName);

    const cityData = { // Kept name as cityData for PolicyCard compatibility
        rent: policyData.rent,
        transit: policyData.transit,
        childcare: policyData.childcare
    };

    useEffect(() => {
        if (travelMode) {
            pickRandomLocation();
            const interval = setInterval(() => {
                pickRandomLocation();
            }, 3000);
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
        const shareText = `https://politok.vercel.app/\n\n${location}:\n🏘️ ${statusEmoji(cityData.rent.status)} ${cityData.rent.text}\n🚌 ${statusEmoji(cityData.transit.status)} ${cityData.transit.text}\n🍼 ${statusEmoji(cityData.childcare.status)} ${cityData.childcare.text}`;

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
        return `https://image.pollinations.ai/prompt/photorealistic%20photo%20of%20${encodedLocation}%20city%20landmark%20street%20view?width=1080&height=1920&nologo=true&seed=${seed}`;
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
        <View style={styles.container}>
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
                            <View>
                                <Text style={styles.locationText}>{location}</Text>
                            </View>

                            <View style={styles.toggleContainer}>
                                <Text style={styles.toggleLabel}>🇺🇸</Text>
                                <Switch
                                    value={travelMode}
                                    onValueChange={setTravelMode}
                                    trackColor={{ false: '#4b5563', true: '#3b82f6' }}
                                    thumbColor={'#ffffff'}
                                />
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
        width: width,
        height: height,
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
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 100,
        minHeight: height,
    },
    header: {
        marginBottom: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
    },
    locationText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'left',
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    toggleLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.TEXT_LIGHT_GRAY,
    },
    cardsContainer: {
        gap: 12,
        marginBottom: 24,
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
        color: '#0f172a',
        lineHeight: 18,
        fontWeight: '500',
    },
    shareButton: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderWidth: 2,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        zIndex: 20,
    },
    shareButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
    },
});
