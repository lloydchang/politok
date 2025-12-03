import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS } from '@politok/shared';
import { usePropCard } from '@politok/shared/hooks';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function Proposition({ proposition, onVote, hasVoted }) {
    const { votedOption, handleVote } = usePropCard(onVote);

    return (
        <View style={styles.container}>
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
                            style={[
                                styles.button,
                                styles.noButton,
                                votedOption && votedOption !== 'no' && styles.buttonDimmed, // Dim unselected
                                votedOption === 'no' && styles.buttonSelected
                            ]}
                        >
                            <Text style={styles.buttonText}>❌ NO</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => handleVote('yes')}
                            style={[
                                styles.button,
                                styles.yesButton,
                                votedOption && votedOption !== 'yes' && styles.buttonDimmed, // Dim unselected
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
        width: width,
        height: height,
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
        paddingLeft: 24,
        paddingRight: 56, // Subtle shift left
        paddingBottom: 220, // Increased to create more space above buttons
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
    },
    description: {
        fontSize: 20,
        color: COLORS.TEXT_LIGHT_GRAY,
        fontWeight: '500',
        textAlign: 'center',
        lineHeight: 28,
    },
    buttonsContainer: {
        position: 'absolute',
        bottom: 60,
        left: 0,
        right: 0,
        alignItems: 'center',
        paddingLeft: 24,
        paddingRight: 56, // Match content alignment
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
    buttonDimmed: {
        opacity: 0.5,
        transform: [{ scale: 0.95 }],
    },
    buttonSelected: {
        transform: [{ scale: 1.1 }],
    },
});
