import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Share, ScrollView, Dimensions, Image, Linking } from 'react-native';
import { COLORS, generateViralShareText, processVote, getPercentileRanking, getIdentityLabel } from '@politok/shared';
import { FEED_ITEMS } from '@politok/shared/constants';
import Dashboard from './Dashboard';
import Result from './Result';
import Proposition from './Proposition';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import Statistic from './Statistic';

const { width, height } = Dimensions.get('window');

export default function Profile({ onNavigate, votes, results, interactions, toggleFollow, totalLikes, globalStats }) {
    const [activeTab, setActiveTab] = useState('videos');

    const displayName = 'poliTok';
    const username = '@politok_vercel_app';
    const websiteUrl = 'politok.vercel.app';

    // Handle follow/unfollow
    const handleFollowToggle = () => {
        if (toggleFollow) toggleFollow();
    };

    const isFollowing = interactions?.isFollowing || false;

    // Use optimistic follower count from interactions if available, otherwise global stats
    const followersCount = interactions?.followersCount ?? (globalStats?.follows ?? 0);

    // Calculate total likes: prioritize optimistic totalLikes (from hooks) over raw globalStats
    const totalLikesCount = totalLikes || (globalStats?.likes
        ? Object.values(globalStats.likes).reduce((sum, count) => sum + (Number(count) || 0), 0)
        : 0);

    // Stats for politok_vercel_app profile
    const stats = {
        following: '0',
        followers: followersCount.toLocaleString(),
        likes: totalLikesCount.toLocaleString()
    };

    // Handle share button - share result page text format
    const handleShare = async () => {
        // Generate share text using the same format as Result page
        let shareText;

        if (results) {
            // Use existing results if available
            shareText = generateViralShareText(votes, results.stats, results.percentile, results.identity);
        } else if (votes && Object.keys(votes).length > 0) {
            // Calculate results on-demand if user has voted but hasn't seen results page
            const currentStats = processVote(votes);
            const currentPercentile = getPercentileRanking(currentStats.oligarchy);
            const currentIdentity = getIdentityLabel(currentStats, votes);
            shareText = generateViralShareText(votes, currentStats, currentPercentile, currentIdentity);
        } else {
            // No votes yet, use generic message
            shareText = `How would you vote ?\n\nhttps://${websiteUrl}`;
        }

        try {
            await Share.share({ message: shareText });
        } catch (err) {
            if (err.message !== 'User did not share') {
                console.error('Error sharing:', err);
            }
        }
    };

    // Content navigation items - reverse order (most recent first)
    const contentItems = React.useMemo(() => {
        const items = [];
        FEED_ITEMS.forEach((item, index) => {
            // Skip the profile item itself
            if (item.type === 'profile') return;

            // For prop items with stats, create two thumbnails: stat first, then prop
            if (item.type === 'prop' && item.stat) {
                // Add stat thumbnail
                items.push({
                    type: 'stat',
                    stat: item.stat,
                    targetIndex: index,
                    id: `stat-${index}`,
                    lookupId: item.data.id // Use prop ID for interactions
                });
                // Add prop thumbnail
                items.push({
                    type: 'prop',
                    data: item.data,
                    targetIndex: index,
                    id: `prop-${index}`,
                    lookupId: item.data.id
                });
            } else {
                // For other items (results, dashboard), add as-is
                items.push({
                    ...item,
                    targetIndex: index,
                    id: `item-${index}`,
                    lookupId: item.id // Use item ID (results_card, dashboard_card)
                });
            }
        });
        return items.reverse();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {/* Profile Header */}
                <View style={styles.header}>
                    {/* Avatar */}
                    <View style={styles.avatarContainer}>
                        <Image
                            source={require('../../../mobile/assets/logo.png')}
                            style={styles.avatar}
                            resizeMode="cover"
                        />
                    </View>

                    {/* Username/Title */}
                    <View style={styles.usernameRow}>
                        <Text style={styles.displayName}>{displayName}</Text>
                        <Text style={styles.verifiedBadge}>☑️</Text>
                    </View>

                    {/* Username handle */}
                    <Text style={styles.username}>{username}</Text>

                    {/* Stats Row */}
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{stats.following}</Text>
                            <Text style={styles.statLabel}>Following</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{stats.followers}</Text>
                            <Text style={styles.statLabel}>Followers</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{stats.likes}</Text>
                            <Text style={styles.statLabel}>Likes</Text>
                        </View>
                    </View>

                    {/* Action Buttons Row */}
                    <View style={styles.actionRow}>
                        <TouchableOpacity
                            onPress={handleFollowToggle}
                            style={[
                                styles.followButton,
                                isFollowing ? styles.followingButton : styles.notFollowingButton
                            ]}
                        >
                            {isFollowing ? (
                                <MaterialCommunityIcons name="account-check" size={24} color="#fff" />
                            ) : (
                                <Text style={styles.followButtonText}>Follow</Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleShare}
                            style={styles.shareIconButton}
                        >
                            <Text style={styles.shareIcon}>📤</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Bio */}
                    <View style={styles.bioContainer}>
                        <Text style={styles.bioText}>
                            Vote on propositions in this simulation and see how they affect oligarchy vs equity 🗳️
                        </Text>
                        <Text style={styles.websiteLink}>
                            🔗 <Text onPress={() => Linking.openURL(`https://${websiteUrl}`)}>
                                {websiteUrl}
                            </Text>
                        </Text>
                    </View>
                </View>

                {/* Content Tabs */}
                <View style={styles.tabsContainer}>
                    <TouchableOpacity
                        onPress={() => setActiveTab('videos')}
                        style={[
                            styles.tab,
                            activeTab === 'videos' && styles.activeTab
                        ]}
                    >
                        <Text style={[
                            styles.tabIcon,
                            activeTab === 'videos' && styles.activeTabText
                        ]}>
                            〢
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Content Grid */}
                <View style={styles.grid}>
                    {contentItems.map((item) => {
                        // Render appropriate live preview based on item type
                        const renderLivePreview = () => {
                            // Pass square dimensions (width x width) to force components to layout in a square
                            // This matches web behavior where components adapt to the square thumbnail container
                            const squareProps = { width: width, height: width };

                            switch (item.type) {
                                case 'dashboard':
                                    return <Dashboard {...squareProps} />;
                                case 'results':
                                    // Use actual results data if available
                                    if (results) {
                                        return (
                                            <Result
                                                {...squareProps}
                                                resultStats={results.stats}
                                                identityLabel={results.identity}
                                                percentileData={results.percentile}
                                                votes={votes}
                                                onReset={() => { }}
                                            />
                                        );
                                    }

                                    // Calculate live intermediate results based on current votes
                                    const currentStats = processVote(votes || {});
                                    const currentPercentile = getPercentileRanking(currentStats.oligarchy);
                                    const currentIdentity = getIdentityLabel(currentStats, votes || {});

                                    return (
                                        <Result
                                            {...squareProps}
                                            resultStats={currentStats}
                                            identityLabel={currentIdentity}
                                            percentileData={currentPercentile}
                                            votes={votes || {}}
                                            onReset={() => { }}
                                        />
                                    );
                                case 'prop':
                                    return <Proposition {...squareProps} proposition={item.data} />;
                                case 'stat':
                                    return <Statistic {...squareProps} stat={item.stat} />;
                                default:
                                    return null;
                            }
                        };

                        const scale = (width - 9) / 3 / width; // Adjusted for safety
                        // Use optimistic view count from interactions if available, otherwise global stats
                        const viewCount = interactions?.items?.[item.lookupId]?.views ?? (globalStats?.views?.[item.lookupId] || 0);

                        return (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => onNavigate && onNavigate(item.targetIndex)}
                                style={styles.gridItem}
                            >
                                {/* Live Preview - scaled down to fit in thumbnail */}
                                <View
                                    style={styles.livePreviewContainer}
                                    collapsable={false}
                                    pointerEvents="none"
                                >
                                    <View
                                        style={[styles.livePreview, {
                                            transform: [
                                                { translateX: -width * (1 - scale) / 2 },
                                                { translateY: -width * (1 - scale) / 2 },
                                                { scale: scale },
                                            ]
                                        }]}
                                        collapsable={false}
                                    >
                                        {renderLivePreview()}
                                    </View>
                                </View>

                                {/* View count overlay */}
                                <View style={styles.thumbnailOverlay}>
                                    <View style={styles.viewCount}>
                                        <Text style={styles.viewIcon}>▶</Text>
                                        <Text style={styles.viewText}>{viewCount}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    scrollView: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 16,
        paddingTop: 0,
        paddingBottom: 0,
        alignItems: 'center',
    },
    avatarContainer: {
        width: 96,
        height: 96,
        borderRadius: 48,
        overflow: 'hidden',
        marginBottom: 8,
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    usernameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 0,
    },
    displayName: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    verifiedBadge: {
        fontSize: 18,
        color: '#3b82f6',
    },
    username: {
        color: '#9ca3af',
        fontSize: 14,
        marginBottom: 12,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 32,
        marginBottom: 12,
        paddingBottom: 0,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    statLabel: {
        color: '#6b7280',
        fontSize: 12,
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    followButton: {
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notFollowingButton: {
        backgroundColor: '#ef4444',
        flex: 1,
        maxWidth: 100,
        paddingVertical: 8,
    },
    followingButton: {
        backgroundColor: '#374151',
        borderWidth: 1,
        borderColor: '#4b5563',
        width: 40,
        height: 40,
    },
    followButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    shareIconButton: {
        width: 40,
        height: 40,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#374151',
        alignItems: 'center',
        justifyContent: 'center',
    },
    shareIcon: {
        color: '#fff',
        fontSize: 20,
    },
    bioContainer: {
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    bioText: {
        color: '#fff',
        fontSize: 14,
        marginBottom: 4,
        textAlign: 'center',
    },
    websiteLink: {
        color: '#60a5fa',
        fontSize: 14,
        fontWeight: '600',
    },
    tabsContainer: {
        width: '100%', // Ensure full width
        borderBottomWidth: 1,
        borderBottomColor: '#1f2937',
        flexDirection: 'row',
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center', // Center content vertically and horizontally
    },
    activeTab: {
        borderBottomColor: '#fff',
    },
    tabIcon: {
        color: '#6b7280',
        fontSize: 18,
    },
    activeTabText: {
        color: '#fff',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 1, // Match web gap-1
    },
    gridItem: {
        width: (width - 9) / 3, // Adjusted for safety
        height: (width - 9) / 3,
        margin: 1,
        backgroundColor: '#111', // Dark background for thumbnails
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
    },
    livePreviewContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        pointerEvents: 'none',
    },
    livePreview: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'transparent',
        width: width,
        height: width, // Square aspect ratio
        // Transform is applied inline in the render function
    },
    thumbnailOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 4,
        zIndex: 10,
    },
    viewCount: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    viewIcon: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '600',
    },
    viewText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '600',
    },
});
