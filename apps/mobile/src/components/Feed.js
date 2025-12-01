import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Animated, StatusBar } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import {
    POLICIES,
    CHAT_DATA,
    FEED_ITEMS
} from '@politok/shared/constants';
import { COLORS } from '@politok/shared';
import { useFeed } from '@politok/shared/hooks';
import { useAnalytics } from '../lib/analytics';
import Proposition from './Proposition';
import Statistic from './Statistic';
import Result from './Result';
import Dashboard from './Dashboard';
import Profile from './Profile';

const { width, height } = Dimensions.get('window');

export default function Feed() {
    const analytics = useAnalytics();
    const { trackEvent } = analytics;

    const profileIndex = FEED_ITEMS.findIndex(item => item.type === 'profile');
    const {
        currentIndex,
        setCurrentIndex,
        votes,
        results,
        currentItem,
        hasVotedOnCurrent,
        handleVote,
        handleReset,
        goToNext
    } = useFeed(FEED_ITEMS, analytics, profileIndex !== -1 ? profileIndex : 0);



    const scrollViewRef = useRef(null);

    const scrollToIndex = (index) => {
        scrollViewRef.current?.scrollTo({ y: index * height, animated: true });
    };

    // Sync hook index changes to scroll position
    useEffect(() => {
        scrollToIndex(currentIndex);
    }, [currentIndex]);

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
        if (currentItem?.type === 'prop' && !hasVotedOnCurrent) {
            delay = 4000; // 4 seconds to vote on props
        } else if (currentItem?.type === 'prop' && hasVotedOnCurrent) {
            delay = 0; // Quick advance after voting
        } else if (currentItem?.type === 'results') {
            delay = 6000; // 6 seconds to see results
        } else if (currentItem?.type === 'dashboard' || currentItem?.type === 'profile') {
            delay = null; // Don't auto-advance from dashboard or profile
        }

        if (delay) {
            const timer = setTimeout(() => {
                goToNext();
                trackEvent('feed_auto_advance', { card_index: currentIndex, card_type: currentItem?.type });
            }, delay);

            return () => clearTimeout(timer);
        }
    }, [currentIndex, currentItem, hasVotedOnCurrent, goToNext, trackEvent]);

    const renderCard = (item, index) => {
        switch (item.type) {
            case 'prop':
                if (item.stat) {
                    return (
                        <View style={{ flex: 1 }}>
                            <View style={{ height: height * 0.45, overflow: 'hidden' }}>
                                <Statistic stat={item.stat} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Proposition
                                    proposition={item.data}
                                    onVote={(option) => handleVote(item.data.id, option)}
                                    hasVoted={votes[item.data.id]}
                                />
                            </View>
                        </View>
                    );
                }
                return (
                    <Proposition
                        proposition={item.data}
                        onVote={(option) => handleVote(item.data.id, option)}
                        hasVoted={votes[item.data.id]}
                    />
                );

            case 'results':
                return (
                    <Result
                        resultStats={results?.stats}
                        identityLabel={results?.identity}
                        percentileData={results?.percentile}
                        votes={votes}
                        onReset={handleReset}
                    />
                );
            case 'stat':
                return <Statistic stat={item.data} />;
            case 'dashboard':
                return <Dashboard />;
            case 'profile':
                return <Profile onNavigate={(index) => setCurrentIndex(index)} votes={votes} results={results} />;
            default:
                return null;
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
                <StatusBar barStyle="light-content" />

                <ScrollView
                    ref={scrollViewRef}
                    pagingEnabled
                    showsVerticalScrollIndicator={false}
                    onMomentumScrollEnd={handleScroll}
                    style={styles.scrollView}
                >
                    {FEED_ITEMS.map((item, index) => (
                        <View key={index} style={styles.pageContainer}>
                            {renderCard(item, index)}
                        </View>
                    ))}
                </ScrollView>

                {/* PoliTok Simulation Overlay */}
                <View style={styles.overlayHeader} pointerEvents="box-none">
                    <View style={styles.liveTagContainer}>
                        {/* LIVE indicator removed */}
                    </View>


                </View>

                {/* Progress dots */}
                <View style={styles.progressContainer}>
                    <BlurView intensity={30} tint="dark" style={styles.progressBlur}>
                        {FEED_ITEMS.map((_, idx) => (
                            <TouchableOpacity
                                key={idx}
                                onPress={() => setCurrentIndex(idx)}
                                style={[
                                    styles.dot,
                                    idx === currentIndex ? styles.activeDot : styles.inactiveDot
                                ]}
                            />
                        ))}
                    </BlurView>
                </View>

                {/* Live Comments Stream removed */}

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
        bottom: 20, // Lowered from 100 to avoid overlapping buttons
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
        height: 64,
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
        zIndex: 50,
    },
    navItem: {
        alignItems: 'center',
    },
    navIcon: {
        fontSize: 24,
        color: 'white',
        marginBottom: 4,
    },
    navIconLarge: {
        fontSize: 32,
        color: 'white',
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
