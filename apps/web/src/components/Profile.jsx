import React, { useState } from 'react';
import { COLORS, generateViralShareText, processVote, getPercentileRanking, getIdentityLabel } from '@politok/shared';
import { UserCheck } from 'lucide-react';
import { FEED_ITEMS } from '@politok/shared/constants';
import Dashboard from './Dashboard';
import Result from './Result';
import Proposition from './Proposition';
import Statistic from './Statistic';

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

    // Calculate total likes: merge local optimistic counts with global stats
    // For each item, use local count if available (optimistic), otherwise global
    const totalLikesCount = (() => {
        if (!globalStats?.likes) return totalLikes || 0;

        // Get all unique item IDs from both sources
        const allIds = new Set([
            ...Object.keys(globalStats.likes),
            ...Object.keys(interactions?.items || {})
        ]);

        // Sum up likes: prefer local optimistic count, fall back to global
        return Array.from(allIds).reduce((sum, id) => {
            const localCount = interactions?.items?.[id]?.likes;
            const globalCount = globalStats.likes[id] || 0;
            return sum + (localCount ?? globalCount);
        }, 0);
    })();

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
            shareText = `How would you vote?\n\nhttps://${websiteUrl}`;
        }

        if (navigator.share) {
            try {
                await navigator.share({
                    text: shareText
                });
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('Error sharing:', err);
                }
            }
        } else {
            // Fallback: copy to clipboard
            await navigator.clipboard.writeText(shareText);
            alert('Share text copied to clipboard!');
        }
    };

    // Content navigation items - reverse order (most recent first)
    // Filter out the profile item (to avoid recursion) and expand prop items to show both stat and prop
    const contentItems = [];

    FEED_ITEMS.forEach((item, index) => {
        // Skip the profile item itself
        if (item.type === 'profile') return;

        // For prop items with stats, create two thumbnails: stat first, then prop
        if (item.type === 'prop' && item.stat) {
            // Add stat thumbnail
            contentItems.push({
                type: 'stat',
                stat: item.stat,
                targetIndex: index,
                id: `stat-${index}`,
                lookupId: item.data.id // Use prop ID for interactions
            });
            // Add prop thumbnail
            contentItems.push({
                type: 'prop',
                data: item.data,
                targetIndex: index,
                id: `prop-${index}`,
                lookupId: item.data.id
            });
        } else {
            // For other items (results, dashboard), add as-is
            contentItems.push({
                ...item,
                targetIndex: index,
                id: `item-${index}`,
                lookupId: item.id // Use item ID (results_card, dashboard_card)
            });
        }
    });

    // Reverse to show most recent first
    contentItems.reverse();

    return (
        <div className="w-full h-full bg-black text-white overflow-auto">
            {/* Profile Header */}
            <div className="px-4 pt-0 pb-0 text-center">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center mx-auto">
                    <img
                        src="/logo.png"
                        alt="poliTok logo"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Username/Title */}
                <div className="flex items-center justify-center gap-2 mb-0">
                    <h1 className="font-bold text-xl">{displayName}</h1>
                    <span className="text-blue-500 text-lg">☑️</span>
                </div>

                {/* Username handle */}
                <div className="text-gray-400 text-sm mb-3">
                    {username}
                </div>

                {/* Stats Row */}
                <div className="flex justify-center gap-8 mb-3 pb-0">
                    <div className="text-center">
                        <div className="font-bold text-lg">{stats.following}</div>
                        <div className="text-gray-500 text-xs">Following</div>
                    </div>
                    <div className="text-center">
                        <div className="font-bold text-lg">{stats.followers}</div>
                        <div className="text-gray-500 text-xs">Followers</div>
                    </div>
                    <div className="text-center">
                        <div className="font-bold text-lg">{stats.likes}</div>
                        <div className="text-gray-500 text-xs">Likes</div>
                    </div>
                </div>

                {/* Action Buttons Row */}
                <div className="flex items-center justify-center gap-2 mb-4 px-2">
                    <button
                        onClick={handleFollowToggle}
                        className={`${isFollowing
                            ? 'bg-gray-700 border border-gray-600 w-10 h-10'
                            : 'bg-red-500 flex-1 max-w-[100px] py-2'
                            } text-white font-bold rounded-md hover:opacity-90 transition flex items-center justify-center`}
                    >
                        {isFollowing ? <UserCheck size={20} fill="white" className="text-white" /> : 'Follow'}
                    </button>
                    <button
                        onClick={handleShare}
                        className="border border-gray-700 w-10 h-10 rounded-md flex items-center justify-center hover:bg-gray-900"
                    >
                        📤
                    </button>
                </div>

                {/* Bio */}
                <div className="text-center px-4">
                    <p className="text-sm mb-1 leading-relaxed">
                        Vote on propositions in this simulation and see how they affect oligarchy vs equity 🗳️
                    </p>
                    <p className="text-sm font-semibold text-blue-400">
                        🔗 <a href={`https://${websiteUrl}`} className="text-blue-400 hover:underline">
                            {websiteUrl}
                        </a>
                    </p>
                </div>
            </div>

            {/* Content Tabs */}
            <div className="border-b border-gray-800">
                <div className="flex">
                    <button
                        onClick={() => setActiveTab('videos')}
                        className={`flex-1 py-3 font-semibold border-b-2 flex justify-center items-center gap-2 ${activeTab === 'videos'
                            ? 'border-white text-white'
                            : 'border-transparent text-gray-600'
                            }`}
                    >
                        <span className="text-lg">〢</span>
                    </button>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-3 gap-1 p-1">
                {contentItems.map((item, index) => {
                    // Render appropriate live preview based on item type
                    const renderLivePreview = () => {
                        switch (item.type) {
                            case 'dashboard':
                                return <Dashboard />;
                            case 'results':
                                // Use actual results data if available
                                if (results) {
                                    return (
                                        <Result
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
                                        resultStats={currentStats}
                                        identityLabel={currentIdentity}
                                        percentileData={currentPercentile}
                                        votes={votes || {}}
                                        onReset={() => { }}
                                    />
                                );
                            case 'prop':
                                // Check if user has voted on this proposition
                                const hasVoted = votes && votes[item.data.id] !== undefined;
                                const selectedVote = votes ? votes[item.data.id] : undefined;
                                return (
                                    <Proposition
                                        proposition={item.data}
                                        onVote={() => { }}
                                        hasVoted={hasVoted}
                                        selectedVote={selectedVote}
                                    />
                                );
                            case 'stat':
                                return <Statistic stat={item.stat} />;
                            default:
                                return null;
                        }
                    };

                    // Get view count for this item - prioritize optimistic local state
                    const viewCount = interactions?.items?.[item.lookupId]?.views ?? (globalStats?.views?.[item.lookupId] || 0);

                    return (
                        <div
                            key={item.id}
                            role="button"
                            tabIndex={0}
                            onClick={() => onNavigate && onNavigate(item.targetIndex)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    onNavigate && onNavigate(item.targetIndex);
                                }
                            }}
                            className="aspect-square bg-black rounded-sm relative overflow-hidden group cursor-pointer"
                        >
                            {/* Live Preview */}
                            <div className="absolute inset-0 w-[300%] h-[300%] origin-top-left transform scale-[0.333] pointer-events-none">
                                {renderLivePreview()}
                            </div>

                            {/* View count overlay */}
                            <div className="absolute bottom-1 left-2 flex items-center gap-1 text-[10px] text-white font-semibold drop-shadow-md z-10">
                                <span>▶</span>
                                <span>{viewCount}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}
