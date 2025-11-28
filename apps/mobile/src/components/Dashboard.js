import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Share, Dimensions, ScrollView, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { STATE_POLICIES, STATE_CITIES, CITY_OVERRIDES, getPolicyData } from '@politok/shared/policyData';
import { POLICIES } from '@politok/shared/constants';

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
    const [location, setLocation] = useState('');
    const [cityData, setCityData] = useState({
        rent: { status: 'loading', text: '' },
        transit: { status: 'loading', text: '' },
        childcare: { status: 'loading', text: '' }
    });
    const [travelMode, setTravelMode] = useState(true);

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
        }
        // When travel mode is off, just pause at current location
        // Don't reset to user's location
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

                        <View style={styles.locationContainer}>
                            <Text style={styles.locationText}>{location}</Text>
                        </View>

                        <View style={styles.toggleContainer}>
                            <Switch
                                value={travelMode}
                                onValueChange={setTravelMode}
                                trackColor={{ false: '#cbd5e1', true: '#4f46e5' }}
                                thumbColor={'#fff'}
                            />
                            <Text style={styles.toggleLabel}>✈️</Text>
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
