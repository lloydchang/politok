import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Share, Dimensions, ScrollView, Switch } from 'react-native';
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
                colors={COLORS.BG_GRADIENT_MOBILE}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            >
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {/* Location and Toggle - Single Line */}
                    <View style={styles.header}>
                        <View style={styles.locationContainer}>
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
        marginBottom: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
    },
    locationContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginBottom: 12,
    },
    locationText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
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
        color: '#334155',
        lineHeight: 18,
    },
    shareButton: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#3b82f6',
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
