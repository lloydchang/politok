import { useState, useEffect, useCallback, useMemo } from 'react';
import {
    processVote,
    getPercentileRanking,
    getIdentityLabel,
    PROPOSITIONS
} from './index.js';
import { CHAT_DATA, STAT_GRADIENTS } from './constants.js';

export function useChat(options = {}) {
    const {
        intervalMs = 800,
        maxMessages = 7,
        chanceToAdd = 0.7,
        colors = CHAT_DATA.COLORS
    } = options;

    const [chatMessages, setChatMessages] = useState([]);

    // Hash function to get consistent color per username
    const getUserColor = (username) => {
        let hash = 0;
        for (let i = 0; i < username.length; i++) {
            hash = username.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % colors.length;
        return colors[index];
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() < chanceToAdd) {
                const newUser = CHAT_DATA.USERS[Math.floor(Math.random() * CHAT_DATA.USERS.length)];
                const newColor = getUserColor(newUser); // Consistent color per user
                const newText = CHAT_DATA.MESSAGES[Math.floor(Math.random() * CHAT_DATA.MESSAGES.length)];

                setChatMessages(prev => {
                    const newMsg = { id: Date.now(), user: newUser, color: newColor, text: newText };
                    return [...prev.slice(-(maxMessages - 1)), newMsg];
                });
            }
        }, intervalMs);

        return () => clearInterval(interval);
    }, [intervalMs, maxMessages, chanceToAdd, colors]);

    return chatMessages;
}

export function useFeed(items, analytics = {}, startIndex = 0) {
    const { trackEvent, trackPropositionVote, trackSimulationCompleted } = analytics;

    const [currentIndex, setCurrentIndex] = useState(startIndex);

    // Initialize votes with null (skipped) for all propositions
    const [votes, setVotes] = useState(() => {
        const initialVotes = {};
        return initialVotes;
    });

    // Calculate results reactively based on votes
    // This ensures results are always up-to-date, whether on initial load (empty) or after voting
    const results = useMemo(() => {
        const stats = processVote(votes);
        const percentile = getPercentileRanking(stats.oligarchy);
        const identity = getIdentityLabel(stats, votes);

        return {
            stats,
            percentile,
            identity
        };
    }, [votes]);

    const currentItem = items[currentIndex];
    const votedProps = Object.keys(votes);
    const hasVotedOnCurrent = currentItem?.type === 'prop' && votes[currentItem.data.id];

    // Track completion events
    const [hasTrackedCompletion, setHasTrackedCompletion] = useState(false);

    useEffect(() => {
        const isResultsPage = currentItem?.type === "results";
        const allVoted = votedProps.length === PROPOSITIONS.length;

        if ((allVoted || isResultsPage) && !hasTrackedCompletion) {
            if (trackEvent) {
                trackEvent('feed_quiz_completed', {
                    equity_score: results.stats.equity,
                    identity_label: results.identity.label
                });
            }

            if (trackSimulationCompleted) {
                trackSimulationCompleted(votes, results.stats, PROPOSITIONS);
            }
            setHasTrackedCompletion(true);
        }
    }, [votes, results, votedProps.length, currentItem, hasTrackedCompletion, trackEvent, trackSimulationCompleted]);

    // Safety: Reset index if out of bounds
    useEffect(() => {
        if (currentIndex >= items.length) {
            setCurrentIndex(Math.max(0, items.length - 1));
        }
    }, [currentIndex, items.length]);

    const goToNext = useCallback(() => {
        if (currentIndex < items.length - 1) {
            setCurrentIndex(prev => prev + 1);
            if (trackEvent) {
                trackEvent('feed_swipe', { from: currentIndex, to: currentIndex + 1 });
            }
        }
    }, [currentIndex, items.length, trackEvent]);

    const goToPrev = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            if (trackEvent) {
                trackEvent('feed_swipe', { from: currentIndex, to: currentIndex - 1 });
            }
        }
    }, [currentIndex, trackEvent]);

    const handleVote = useCallback((propId, option) => {
        try {
            const newVotes = { ...votes, [propId]: option };
            setVotes(newVotes);

            if (trackEvent) {
                trackEvent('feed_prop_vote', {
                    prop_id: propId,
                    vote: option,
                    card_index: currentIndex
                });
            }

            if (trackPropositionVote) {
                const proposition = PROPOSITIONS.find(p => p.id === propId);
                if (proposition) {
                    trackPropositionVote(propId, proposition.title, option, false);
                }
            }

            // Auto-advance after voting
            setTimeout(() => {
                goToNext();
            }, 400); // 400ms delay matches web
        } catch (error) {
            console.error("Error handling vote:", error);
            goToNext();
        }
    }, [votes, currentIndex, trackEvent, trackPropositionVote, goToNext]);

    const handleReset = useCallback(() => {
        setVotes({});
        setResults(null);
        setCurrentIndex(0);
        if (trackEvent) {
            trackEvent('feed_reset');
        }
    }, [trackEvent]);

    return {
        currentIndex,
        setCurrentIndex,
        votes,
        results,
        currentItem,
        hasVotedOnCurrent,
        handleVote,
        handleReset,
        goToNext,
        goToPrev
    };
}

export function usePropCard(onVote) {
    const [votedOption, setVotedOption] = useState(null);

    const handleVote = useCallback((option) => {
        setVotedOption(option);
        if (onVote) {
            onVote(option);
        }
    }, [onVote]);

    return {
        votedOption,
        handleVote
    };
}

export function useStatCard() {
    const [gradient, setGradient] = useState(STAT_GRADIENTS[0]);

    useEffect(() => {
        setGradient(STAT_GRADIENTS[Math.floor(Math.random() * STAT_GRADIENTS.length)]);
    }, [STAT_GRADIENTS]);

    return gradient;
}

export function useResultsCard(resultStats) {
    const sortedStats = resultStats ? [
        { label: 'Oligarchy', value: resultStats.oligarchy, color: '#dc2626', key: 'oligarchy' },
        { label: 'Equity', value: resultStats.equity, color: '#2563eb', key: 'equity' } // Using primary blue hex
    ].sort((a, b) => b.value - a.value) : [];

    return { sortedStats };
}

// Hook for managing persistent interactions (likes, views, follow)
/**
 * Custom hook for managing interactions (likes, views, follows)
 * with local persistence and optional server sync
 *
 * @param {Object} storage - Storage adapter (localStorage, AsyncStorage, etc)
 * @param {Object} syncAdapter - Optional sync adapter with {sync, fetchStats} methods
 */
export function useInteractions(storage, syncAdapter = null) {
    const STORAGE_KEY = 'politok_interactions';

    const [interactions, setInteractions] = useState({
        isFollowing: false,
        items: {} // { id: { likes: 0, liked: false, views: 0 } }
    });

    const [globalStats, setGlobalStats] = useState(null); // { likes: {}, views: {}, follows: 0 }
    const [pendingSync, setPendingSync] = useState([]);

    // Load interactions and pending sync queue from storage
    useEffect(() => {
        const loadInteractions = async () => {
            try {
                if (storage && storage.getItem) {
                    const stored = await storage.getItem(STORAGE_KEY);
                    if (stored) {
                        const parsed = JSON.parse(stored);
                        setInteractions(prev => ({ ...prev, ...parsed }));
                    }

                    // Load pending sync queue
                    if (syncAdapter) {
                        const pending = await storage.getItem('pending_sync');
                        if (pending) {
                            const queue = JSON.parse(pending);
                            setPendingSync(queue);
                        }
                    }
                }
            } catch (e) {
                console.error('Failed to load interactions:', e);
            }
        };
        loadInteractions();
    }, [storage, syncAdapter]);

    // Fetch global stats on mount (if sync enabled)
    useEffect(() => {
        if (syncAdapter && syncAdapter.fetchStats) {
            syncAdapter.fetchStats()
                .then(stats => setGlobalStats(stats))
                .catch(err => console.error('Failed to fetch global stats:', err));
        }
    }, [syncAdapter]);

    // Process pending sync queue on mount
    useEffect(() => {
        if (syncAdapter && pendingSync.length > 0) {
            syncAdapter.sync(pendingSync)
                .then(() => {
                    // Clear queue on success
                    setPendingSync([]);
                    storage.setItem('pending_sync', JSON.stringify([]));
                })
                .catch(err => {
                    console.error('Retry sync failed:', err);
                    // Keep queue for next attempt
                });
        }
    }, [syncAdapter, storage]); // Only run once on mount

    // Save interactions to storage
    useEffect(() => {
        const saveInteractions = async () => {
            try {
                if (storage && storage.setItem) {
                    await storage.setItem(STORAGE_KEY, JSON.stringify(interactions));
                }
            } catch (e) {
                console.error('Failed to save interactions:', e);
            }
        };
        // Debounce saving slightly or just save on every change (it's local)
        const timer = setTimeout(saveInteractions, 500);
        return () => clearTimeout(timer);
    }, [interactions, storage]);

    const toggleFollow = useCallback(() => {
        setInteractions(prev => ({
            ...prev,
            isFollowing: !prev.isFollowing
        }));

        // Sync to server
        if (syncAdapter) {
            const action = { type: 'follow', id: 'profile' };
            syncAdapter.sync([action])
                .catch(err => {
                    console.error('Follow sync failed:', err);
                    // Add to retry queue
                    setPendingSync(prev => {
                        const newQueue = [...prev, action];
                        storage.setItem('pending_sync', JSON.stringify(newQueue));
                        return newQueue;
                    });
                });
        }
    }, [syncAdapter, storage]);

    const toggleLike = useCallback((id, forceState) => {
        if (!id) return;

        let syncNeeded = false;
        setInteractions(prev => {
            const item = prev.items[id] || { likes: 0, liked: false, views: 0 };
            //If forceState is provided, use it. Otherwise toggle.
            const isLiked = forceState !== undefined ? forceState : !item.liked;

            // If forcing state and it's already in that state, do nothing
            if (forceState !== undefined && item.liked === forceState) {
                return prev;
            }

            // Mark that we need to sync (state changed)
            syncNeeded = true;

            return {
                ...prev,
                items: {
                    ...prev.items,
                    [id]: {
                        ...item,
                        liked: isLiked,
                        likes: isLiked ? (item.likes || 0) + 1 : Math.max(0, (item.likes || 0) - 1)
                    }
                }
            };
        });

        // Sync to server (only if state changed)
        if (syncAdapter && syncNeeded) {
            const action = { type: 'like', id };
            syncAdapter.sync([action])
                .catch(err => {
                    console.error('Like sync failed:', err);
                    // Add to retry queue
                    setPendingSync(prev => {
                        const newQueue = [...prev, action];
                        storage.setItem('pending_sync', JSON.stringify(newQueue));
                        return newQueue;
                    });
                });
        }
    }, [syncAdapter, storage]);

    const incrementView = useCallback((id) => {
        if (!id) return;
        setInteractions(prev => {
            const item = prev.items[id] || { likes: 0, liked: false, views: 0 };

            return {
                ...prev,
                items: {
                    ...prev.items,
                    [id]: {
                        ...item,
                        views: (item.views || 0) + 1
                    }
                }
            };
        });

        // Sync view to server (fire and forget, no retry)
        if (syncAdapter) {
            syncAdapter.sync([{ type: 'view', id }])
                .catch(err => console.error('View sync failed (ignored):', err));
        }
    }, [syncAdapter]);

    // Calculate total likes for profile
    const totalLikes = useMemo(() => {
        return Object.values(interactions.items).reduce((sum, item) => sum + (item.likes || 0), 0);
    }, [interactions.items]);

    return {
        interactions,
        toggleFollow,
        toggleLike,
        incrementView,
        totalLikes,
        globalStats // Include global stats for display
    };
}
