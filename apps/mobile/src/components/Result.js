import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Share, Dimensions, ScrollView } from 'react-native';
import { COLORS, generateViralShareText } from '@politok/shared';
import { useResultsCard } from '@politok/shared/hooks';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function Result({ resultStats, identityLabel, percentileData, votes, onReset }) {
    const { sortedStats } = useResultsCard(resultStats);

    if (!resultStats || !identityLabel) return null;

    const handleShare = async () => {
        const shareText = generateViralShareText(votes, resultStats, percentileData, identityLabel);
        try {
            await Share.share({
                message: shareText,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[COLORS.BG_LIGHT_BLUE, `${identityLabel.color}20`]}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {/* Identity reveal */}
                    <View style={styles.identityContainer}>
                        <Text style={styles.emoji}>{identityLabel.emoji}</Text>
                        <Text style={[styles.label, { color: identityLabel.color }]}>
                            {identityLabel.label}
                        </Text>
                        <Text style={styles.description}>
                            "{identityLabel.description}"
                        </Text>
                    </View>

                    {/* Score bars */}
                    <View style={styles.scoreCard}>
                        {sortedStats.map((stat) => (
                            <View key={stat.key} style={styles.scoreRow}>
                                <View style={styles.scoreHeader}>
                                    <Text style={styles.scoreLabel}>{stat.label}</Text>
                                    <Text style={[styles.scoreValue, { color: stat.color }]}>{stat.value}%</Text>
                                </View>
                                <View style={styles.barBg}>
                                    <View style={[styles.barFill, { width: `${stat.value}%`, backgroundColor: stat.color }]} />
                                </View>
                            </View>
                        ))}
                    </View>

                    {/* Percentile */}
                    {percentileData && (
                        <View style={styles.percentileBox}>
                            <Text style={styles.percentileText}>
                                {percentileData.message}
                            </Text>
                        </View>
                    )}

                </ScrollView>

                {/* Share Button - Fixed Position */}
                <View style={styles.shareButtonContainer}>
                    <TouchableOpacity
                        onPress={handleShare}
                        style={styles.shareButton}
                    >
                        <Text style={styles.shareButtonIcon}>📤</Text>
                        <Text style={styles.shareButtonText}>SHARE</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    gradient: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 100,
        alignItems: 'center',
    },
    identityContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    emoji: {
        fontSize: 80,
        marginBottom: 16,
    },
    label: {
        fontSize: 42,
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: 8,
    },
    description: {
        fontSize: 18,
        color: '#475569', // slate-600
        fontStyle: 'italic',
        textAlign: 'center',
    },
    scoreCard: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 24,
        padding: 24,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
        gap: 16,
    },
    scoreRow: {
        marginBottom: 8,
    },
    scoreHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 4,
    },
    scoreLabel: {
        fontSize: 20, // Match web xl
        fontWeight: 'bold',
        color: '#334155', // slate-700
    },
    scoreValue: {
        fontSize: 30, // Match web 3xl
        fontWeight: '900',
    },
    barBg: {
        width: '100%',
        height: 12,
        backgroundColor: '#e2e8f0', // slate-200
        borderRadius: 6,
        overflow: 'hidden',
    },
    barFill: {
        height: '100%',
        borderRadius: 6,
    },
    percentileBox: {
        backgroundColor: '#facc15', // yellow-400
        borderRadius: 12,
        padding: 16,
        marginBottom: 32,
        width: '100%',
    },
    percentileText: {
        color: '#0f172a', // slate-900
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    shareButtonContainer: {
        position: 'absolute',
        bottom: 40,
        right: 24,
        zIndex: 20,
    },
    shareButton: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    shareButtonIcon: {
        fontSize: 32,
        marginBottom: 4,
    },
    shareButtonText: {
        color: 'white',
        fontWeight: '900',
        fontSize: 10,
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    resetButton: {
        padding: 12,
    },
    resetButtonText: {
        color: '#475569', // slate-600
        fontWeight: 'bold',
        fontSize: 14,
    },
});
