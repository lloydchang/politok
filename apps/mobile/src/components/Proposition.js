import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS } from '@politok/shared';
import { usePropCard } from '@politok/shared/hooks';
import { LinearGradient } from 'expo-linear-gradient';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

export default function Proposition({ proposition, onVote, hasVoted, width = windowWidth, height = windowHeight }) {
    const { votedOption, handleVote } = usePropCard(onVote);

    return (
        <View style={[styles.container, { width, height }]}>
            <LinearGradient
                colors={[`${COLORS.PRIMARY_BLUE}20`, `${COLORS.OUTCOME_RED}20`]}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                {/* Background emoji (huge, faded) */}
                <View style={styles.bgEmojiContainer}>
                    <Text style={styles.bgEmoji}>{proposition.emoji}</Text>
                </View>

                {/* Main content */}
                <View style={styles.contentContainer}>
                    <Text style={styles.emoji}>{proposition.emoji}</Text>

                    <Text style={styles.title}>
                        {proposition.title}
                    </Text>

                    <Text style={styles.description}>
                        {proposition.description}
                    </Text>
                </View>

                {/* Vote buttons */}
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonsRow}>
                        <TouchableOpacity
                            onPress={() => handleVote('no')}
                            disabled={votedOption !== null}
                            style={[
                                styles.button,
                                styles.noButton,
                                votedOption && votedOption !== 'no' && styles.buttonHidden,
                                votedOption === 'no' && styles.buttonSelected
                            ]}
                        >
                            <Text style={styles.buttonText}>❌ NO</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => handleVote('yes')}
                            disabled={votedOption !== null}
                            style={[
                                styles.button,
                                styles.yesButton,
                                votedOption && votedOption !== 'yes' && styles.buttonHidden,
                                votedOption === 'yes' && styles.buttonSelected
                            ]}
                        >
                            <Text style={styles.buttonText}>✅ YES</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    gradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bgEmojiContainer: {
        position: 'absolute',
        inset: 0,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.05,
    },
    bgEmoji: {
        fontSize: 300,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40, // Increased for better centering
        paddingBottom: 180,
    },
    emoji: {
        fontSize: 80,
        marginBottom: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: COLORS.TEXT_BLUE_LIGHT,
        marginBottom: 16,
        textAlign: 'center',
        paddingHorizontal: 8,
    },
    description: {
        fontSize: 20,
        color: COLORS.TEXT_LIGHT_GRAY,
        fontWeight: '500',
        textAlign: 'center',
        lineHeight: 28,
        paddingHorizontal: 8,
    },
    buttonsContainer: {
        position: 'absolute',
        bottom: 60,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    buttonsRow: {
        flexDirection: 'row',
        gap: 12,
        width: 280, // Fixed width like web's max-w-[280px]
        justifyContent: 'center',
    },
    button: {
        flex: 1,
        height: 64,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
        borderWidth: 2,
    },
    noButton: {
        backgroundColor: '#7f1d1d', // red-900 (match web)
        borderColor: '#b91c1c', // red-700 (match web)
    },
    yesButton: {
        backgroundColor: '#1e3a8a', // blue-900 (match web)
        borderColor: '#1d4ed8', // blue-700 (match web)
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonHidden: {
        opacity: 0,
        transform: [{ scale: 0.8 }],
    },
    buttonSelected: {
        transform: [{ scale: 1.1 }],
    },
});
