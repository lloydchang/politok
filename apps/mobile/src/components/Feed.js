import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Animated, StatusBar } from 'react-native';
import { BlurView } from 'expo-blur';
import { PROPOSITIONS, processVote as processVoteShared, getPercentileRanking, getIdentityLabel } from '@politok/shared';
import { useAnalytics } from '../lib/analytics';
import PropCard from './cards/PropCard';
import StatCard from './cards/StatCard';
import ResultsCard from './cards/ResultsCard';
import Dashboard from './Dashboard';

const { width, height } = Dimensions.get('window');

// Generate feed content
const feedItems = [
    {
        type: 'stat',
        data: {
            emoji: '🏠 💸',
            title: 'Housing Crisis',
            description: 'Rent prices have increased 30% in the last 5 years',
            badge: 'Did you know?'
        }
    },
    { type: 'prop', data: PROPOSITIONS[0] }, // Rent freeze
    {
        type: 'stat',
        data: {
            emoji: '🚍 🚏',
            title: 'Transit Facts',
            description: 'Free public transit exists in 100+ cities worldwide',
            badge: 'Did you know?'
        }
    },
    { type: 'prop', data: PROPOSITIONS[1] }, // Free buses
    {
        type: 'stat',
        data: {
            emoji: '👶 💰',
            title: 'Childcare Costs',
            description: 'Average cost is $1,200/mo in the US',
            badge: 'Did you know?'
        }
    },
    { type: 'prop', data: PROPOSITIONS[2] }, // Childcare
    { type: 'results' }, // Show results after all votes
    { type: 'dashboard' }, // Dashboard as final page
];

export default function Feed() {
    const { trackEvent, trackPropositionVote, trackSimulationCompleted } = useAnalytics();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [votes, setVotes] = useState({});
    const [results, setResults] = useState(null);
    const scrollViewRef = useRef(null);
    const [chatMessages, setChatMessages] = useState([]);

    // Fake chat data
    const CHAT_USERS = ['user123', 'policy_wonk', 'yimby_queen', 'gen_z_voter', 'eco_warrior', 'housing_now'];
    const CHAT_MESSAGES = ['yes yes yes', 'need this rn', 'w policy', 'based', 'vote yes!!', 'vote no', 'l take', 'mid', 'skip'];
    const CHAT_COLORS = ['#facc15', '#22d3ee', '#f472b6', '#4ade80', '#c084fc'];

    // Chat rotation effect
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.3) {
                const newUser = CHAT_USERS[Math.floor(Math.random() * CHAT_USERS.length)];
                const newColor = CHAT_COLORS[Math.floor(Math.random() * CHAT_COLORS.length)];
                const newText = CHAT_MESSAGES[Math.floor(Math.random() * CHAT_MESSAGES.length)];

                setChatMessages(prev => {
                    const newMsg = { id: Date.now(), user: newUser, color: newColor, text: newText };
                    return [...prev.slice(-4), newMsg]; // Keep last 5
                });
            }
        }, 1500); // Slower than web for mobile performance

        return () => clearInterval(interval);
    }, []);

    const currentItem = feedItems[currentIndex];
    const votedProps = Object.keys(votes);
    const hasVotedOnCurrent = currentItem?.type === 'prop' && votes[currentItem.data.id];

    // Calculate results when all 3 props are voted
    useEffect(() => {
        const isResultsPage = currentItem?.type === "results";
        const allVoted = votedProps.length === 3;

        if ((allVoted || isResultsPage) && !results) {
            const stats = processVoteShared(votes);
            const percentile = getPercentileRanking(stats.oligarchy);
            const identity = getIdentityLabel(stats, votes);

            setResults({
                stats,
                percentile,
                identity
            });

            trackEvent('feed_quiz_completed', {
                equity_score: stats.equity,
                identity_label: identity.label
            });

            trackSimulationCompleted(votes, stats, PROPOSITIONS);
        }
    }, [votes, results, votedProps.length, currentItem]);

    // Handle vote
    const handleVote = (propId, option) => {
        const newVotes = { ...votes, [propId]: option };
        setVotes(newVotes);

        const proposition = PROPOSITIONS.find(p => p.id === propId);
        if (proposition) {
            trackPropositionVote(propId, proposition.title, option, false);
        }

        // Auto-advance after voting
        setTimeout(() => {
            goToNext();
        }, 500);
    };

    // Handle reset
    const handleReset = () => {
        setVotes({});
        setResults(null);
        setCurrentIndex(0);
        scrollToIndex(0);
        trackEvent('feed_reset');
    };

    // Navigation
    const goToNext = () => {
        if (currentIndex < feedItems.length - 1) {
            scrollToIndex(currentIndex + 1);
        }
    };

    const scrollToIndex = (index) => {
        scrollViewRef.current?.scrollTo({ y: index * height, animated: true });
    };

    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const index = Math.round(offsetY / height);
        if (index !== currentIndex) {
            setCurrentIndex(index);
            trackEvent('feed_swipe', { from: currentIndex, to: index });
        }
    };

    // Auto-play logic
    useEffect(() => {
        let delay;
        if (currentItem?.type === 'stat') {
            delay = 2000; // 2 seconds for stats
        } else if (currentItem?.type === 'prop' && !hasVotedOnCurrent) {
            delay = 4000; // 4 seconds to vote on props
        } else if (currentItem?.type === 'prop' && hasVotedOnCurrent) {
            delay = 1000; // Quick advance after voting
        } else if (currentItem?.type === 'results') {
            delay = 6000; // 6 seconds to see results
        } else if (currentItem?.type === 'dashboard') {
            delay = null; // Don't auto-advance from dashboard
        }

        if (delay) {
            const timer = setTimeout(() => {
                goToNext();
                trackEvent('feed_auto_advance', { card_index: currentIndex, card_type: currentItem?.type });
            }, delay);

            return () => clearTimeout(timer);
        }
    }, [currentIndex, currentItem, hasVotedOnCurrent]);

    const renderCard = (item, index) => {
        switch (item.type) {
            case 'prop':
                return (
                    <PropCard
                        proposition={item.data}
                        onVote={(option) => handleVote(item.data.id, option)}
                        hasVoted={votes[item.data.id]}
                    />
                );
            case 'results':
                return (
                    <ResultsCard
                        resultStats={results?.stats}
                        identityLabel={results?.identity}
                        percentileData={results?.percentile}
                        votes={votes}
                        onReset={handleReset}
                    />
                );
            case 'stat':
                return <StatCard stat={item.data} />;
            case 'dashboard':
                return <Dashboard />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <ScrollView
                ref={scrollViewRef}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                onMomentumScrollEnd={handleScroll}
                style={styles.scrollView}
            >
                {feedItems.map((item, index) => (
                    <View key={index} style={styles.pageContainer}>
                        {renderCard(item, index)}
                    </View>
                ))}
            </ScrollView>

            {/* PoliTok Simulation Overlay */}
            <View style={styles.overlayHeader} pointerEvents="box-none">
                <View style={styles.liveTagContainer}>
                    <BlurView intensity={50} tint="dark" style={styles.blurBadge}>
                        <View style={styles.liveDot} />
                        <Text style={styles.liveText}>LIVE</Text>
                    </BlurView>
                    <Text style={styles.hashtagText}>#poliTok</Text>
                </View>

                <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
                    <Text style={styles.resetButtonText}>START OVER ↺</Text>
                </TouchableOpacity>

                <View style={styles.statsContainer}>
                    <View style={styles.statRow}>
                        <Text style={styles.statLabel}>VIEWS</Text>
                        <Text style={styles.statValue}>
                            {(1200 + (currentIndex * 850) + (Object.keys(votes).length * 2400)).toLocaleString()}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Progress dots */}
            <View style={styles.progressContainer} pointerEvents="none">
                <BlurView intensity={30} tint="dark" style={styles.progressBlur}>
                    {feedItems.map((_, idx) => (
                        <View
                            key={idx}
                            style={[
                                styles.dot,
                                idx === currentIndex ? styles.activeDot : styles.inactiveDot
                            ]}
                        />
                    ))}
                </BlurView>
            </View>

            {/* Live Comments Stream */}
            <View style={styles.chatContainer} pointerEvents="none">
                {chatMessages.map((msg) => (
                    <View key={msg.id} style={styles.chatMessage}>
                        <Text style={[styles.chatUser, { color: msg.color }]}>{msg.user}:</Text>
                        <Text style={styles.chatText}>{msg.text}</Text>
                    </View>
                ))}
            </View>

            {/* Bottom Navigation (TikTok Style) */}
            <View style={styles.bottomNav}>
                <View style={styles.navItem}>
                    <Text style={styles.navIcon}>🏠</Text>
                    <Text style={styles.navLabel}>Home</Text>
                </View>
                <View style={[styles.navItem, { opacity: 0.6 }]}>
                    <Text style={styles.navIcon}>👥</Text>
                    <Text style={styles.navLabel}>Friends</Text>
                </View>

                {/* Create Button */}
                <View style={styles.createButtonContainer}>
                    <View style={[styles.createButtonBg, { backgroundColor: '#22d3ee', left: 2 }]} />
                    <View style={[styles.createButtonBg, { backgroundColor: '#f87171', right: 2 }]} />
                    <View style={styles.createButton}>
                        <Text style={styles.plusIcon}>+</Text>
                    </View>
                </View>

                <View style={[styles.navItem, { opacity: 0.6 }]}>
                    <Text style={styles.navIcon}>💬</Text>
                    <Text style={styles.navLabel}>Inbox</Text>
                </View>
                <View style={[styles.navItem, { opacity: 0.6 }]}>
                    <Text style={styles.navIcon}>👤</Text>
                    <Text style={styles.navLabel}>Profile</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    scrollView: {
        flex: 1,
    },
    pageContainer: {
        width: width,
        height: height,
    },
    overlayHeader: {
        position: 'absolute',
        top: 50,
        left: 16,
        right: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        zIndex: 50,
    },
    liveTagContainer: {
        gap: 4,
    },
    blurBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        overflow: 'hidden',
        gap: 8,
    },
    liveDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ef4444',
    },
    liveText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    hashtagText: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 12,
        fontFamily: 'Courier', // Monospace feel
        marginLeft: 4,
    },
    resetButton: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    resetButtonText: {
        color: 'black',
        fontSize: 12,
        fontWeight: 'bold',
    },
    statsContainer: {
        alignItems: 'flex-end',
    },
    statRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    statLabel: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    statValue: {
        color: 'white',
        fontSize: 20,
        fontWeight: '900',
        fontFamily: 'Courier',
    },
    progressContainer: {
        position: 'absolute',
        bottom: 100,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 50,
    },
    progressBlur: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        overflow: 'hidden',
        gap: 8,
    },
    dot: {
        height: 8,
        borderRadius: 4,
    },
    activeDot: {
        width: 24,
        backgroundColor: 'white',
    },
    inactiveDot: {
        width: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    chatContainer: {
        position: 'absolute',
        bottom: 140,
        left: 16,
        width: 250,
        height: 150,
        justifyContent: 'flex-end',
        zIndex: 40,
    },
    chatMessage: {
        flexDirection: 'row',
        marginBottom: 4,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    chatUser: {
        fontWeight: 'bold',
        fontSize: 14,
        marginRight: 6,
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    chatText: {
        color: 'white',
        fontSize: 14,
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 20, // Safe area
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
    },
    navItem: {
        alignItems: 'center',
    },
    navIcon: {
        fontSize: 24,
        color: 'white',
        marginBottom: 4,
    },
    navLabel: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    createButtonContainer: {
        width: 45,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    createButtonBg: {
        position: 'absolute',
        width: 45,
        height: 30,
        borderRadius: 8,
    },
    createButton: {
        width: 38,
        height: 30,
        backgroundColor: 'white',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusIcon: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
