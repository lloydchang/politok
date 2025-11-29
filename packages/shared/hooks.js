import { useState, useEffect, useCallback } from 'react';
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

export function useFeed(items, analytics = {}) {
    const { trackEvent, trackPropositionVote, trackSimulationCompleted } = analytics;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [votes, setVotes] = useState({});
    const [results, setResults] = useState(null);

    const currentItem = items[currentIndex];
    const votedProps = Object.keys(votes);
    const hasVotedOnCurrent = currentItem?.type === 'prop' && votes[currentItem.data.id];

    // Calculate results when all 3 props are voted
    useEffect(() => {
        const isResultsPage = currentItem?.type === "results";
        const allVoted = votedProps.length === PROPOSITIONS.length;

        if ((allVoted || isResultsPage) && !results) {
            const stats = processVote(votes);
            const percentile = getPercentileRanking(stats.oligarchy);
            const identity = getIdentityLabel(stats, votes);

            setResults({
                stats,
                percentile,
                identity
            });

            if (trackEvent) {
                trackEvent('feed_quiz_completed', {
                    equity_score: stats.equity,
                    identity_label: identity.label
                });
            }

            if (trackSimulationCompleted) {
                trackSimulationCompleted(votes, stats, PROPOSITIONS);
            }
        }
    }, [votes, results, votedProps.length, currentItem, trackEvent, trackSimulationCompleted]);

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
