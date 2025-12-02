import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Animated, StatusBar, TouchableWithoutFeedback, Image } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import {
    POLICIES,
    CHAT_DATA,
    FEED_ITEMS
} from '@politok/shared/constants';
import { COLORS } from '@politok/shared';
import { useFeed, useInteractions } from '@politok/shared/hooks';
import { useAnalytics } from '../lib/analytics';
import Proposition from './Proposition';
import Statistic from './Statistic';
import Result from './Result';
import Dashboard from './Dashboard';
import Profile from './Profile';

const { width, height } = Dimensions.get('window');

// Mobile storage adapter using Expo FileSystem
const mobileStorage = {
    getItem: async (key) => {
        try {
            const fileUri = FileSystem.documentDirectory + key + '.json';
            const info = await FileSystem.getInfoAsync(fileUri);
            if (!info.exists) return null;
            return await FileSystem.readAsStringAsync(fileUri);
        } catch (e) {
            console.error('Storage read error:', e);
            return null;
        }
    },
    setItem: async (key, value) => {
        try {
            const fileUri = FileSystem.documentDirectory + key + '.json';
            await FileSystem.writeAsStringAsync(fileUri, value);
        } catch (e) {
            console.error('Storage write error:', e);
        }
    }
};

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

    const {
        interactions,
        toggleLike,
        incrementView,
        toggleFollow,
        totalLikes
    } = useInteractions(mobileStorage);

    // Get current item ID and interaction state
    const currentId = currentItem?.data?.id || currentItem?.id;
    const currentInteraction = currentId ? interactions.items[currentId] : null;
    const isLiked = currentInteraction?.liked || false;
    const likeCount = currentInteraction?.likes || 0;

    // Track views
    useEffect(() => {
        if (currentId) {
            incrementView(currentId);
        }
    }, [currentId, incrementView]);

    const [showHearts, setShowHearts] = useState([]);
    const lastTap = useRef(0);

    const handleDoubleTap = (e, item) => {
        const now = Date.now();
        const DOUBLE_TAP_DELAY = 300;
        if (now - lastTap.current < DOUBLE_TAP_DELAY) {
            // Double tap detected
            const { locationX, locationY } = e.nativeEvent;
            const itemId = item?.data?.id || item?.id;

            if (itemId) {
                toggleLike(itemId, true);

                const heartId = now;
                const rotation = Math.random() * 30 - 15;
                setShowHearts(prev => [...prev, { id: heartId, x: locationX, y: locationY, rotation }]);
            }
        }
        lastTap.current = now;
    };

    const scrollViewRef = useRef(null);

    const scrollToIndex = (index) => {
        scrollViewRef.current?.scrollTo({ y: index * height, animated: true });
    };

    // Initial scroll to start index
    useEffect(() => {
        if (currentIndex > 0) {
            setTimeout(() => {
                scrollToIndex(currentIndex);
            }, 100);
        }
    }, []);

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
                return (
                    <Profile
                        onNavigate={(index) => setCurrentIndex(index)}
                        votes={votes}
                        results={results}
                        interactions={interactions}
                        toggleFollow={toggleFollow}
                        totalLikes={totalLikes}
                    />
                );
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
                            <TouchableWithoutFeedback onPress={(e) => handleDoubleTap(e, item)}>
                                <View style={{ flex: 1, width: '100%' }}>
                                    {renderCard(item, index)}
                                </View>
                            </TouchableWithoutFeedback>

                            {/* Double Tap Hearts for this page */}
                            {index === currentIndex && showHearts.map(heart => (
                                <HeartAnimation
                                    key={heart.id}
                                    x={heart.x}
                                    y={heart.y}
                                    rotation={heart.rotation}
                                    onComplete={() => setShowHearts(prev => prev.filter(h => h.id !== heart.id))}
                                />
                            ))}
                        </View>
                    ))}
                </ScrollView>

                {/* Right Sidebar (Interaction Icons) - Only show if not on profile */}
                {currentItem?.type !== 'profile' && (
                    <View style={styles.rightSidebar}>
                        {/* 1. Profile Picture (Placeholder) */}
                        <View style={styles.sidebarItem}>
                            <View style={styles.avatarContainer}>
                                <TouchableOpacity
                                    onPress={() => {
                                        const profileIndex = FEED_ITEMS.findIndex(item => item.type === 'profile');
                                        if (profileIndex !== -1) setCurrentIndex(profileIndex);
                                    }}
                                    activeOpacity={0.8}
                                >
                                    <View style={styles.avatarWrapper}>
                                        <Image
                                            source={require('../../../mobile/assets/logo.png')}
                                            style={styles.sidebarAvatar}
                                            resizeMode="contain"
                                        />
                                    </View>
                                </TouchableOpacity>
                                {!interactions.isFollowing && (
                                    <TouchableOpacity
                                        style={styles.followBadge}
                                        onPress={() => toggleFollow()}
                                        activeOpacity={0.8}
                                    >
                                        <Text style={styles.followBadgeText}>+</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>

                        {/* 2. Like Button (Heart) */}
                        <TouchableOpacity
                            onPress={() => currentId && toggleLike(currentId)}
                            style={styles.sidebarItem}
                        >
                            <Ionicons
                                name="heart"
                                size={35}
                                color={isLiked ? '#ef4444' : 'white'}
                                style={styles.shadowIcon}
                            />
                            <Text style={styles.actionText}>{likeCount}</Text>
                        </TouchableOpacity>


                    </View>
                )}

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
    rightSidebar: {
        position: 'absolute',
        right: 8,
        bottom: 140, // Raised slightly to account for more items
        alignItems: 'center',
        zIndex: 50,
        gap: 16,
    },
    sidebarItem: {
        alignItems: 'center',
        marginBottom: 8,
    },
    avatarContainer: {
        width: 48,
        height: 48,
        marginBottom: 12, // Extra space for the badge
        position: 'relative',
    },
    avatarWrapper: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'black',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sidebarAvatar: {
        width: '100%',
        height: '100%',
    },
    followBadge: {
        position: 'absolute',
        bottom: -10,
        left: 14, // Center horizontally relative to 48px width (48/2 - 20/2 = 14)
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#ef4444',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'white',
    },
    followBadgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: -2, // Visual centering
    },
    shadowIcon: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    actionText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        marginTop: 4,
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
    progressContainer: {
        position: 'absolute',
        bottom: 10,
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
});
