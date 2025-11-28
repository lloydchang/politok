import os

content = r'''
'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
    PROPOSITIONS,
    processVote as processVoteShared,
    getPercentileRanking,
    getIdentityLabel
} from '@politok/shared';
import PropCard from './cards/PropCard';
import ResultsCard from './cards/ResultsCard';
import StatCard from './cards/StatCard';
import LiveStudio from './LiveStudio';
import Dashboard from './Dashboard';
import { trackEvent } from '@/lib/telemetry';

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
    const [currentIndex, setCurrentIndex] = useState(0);
    const [votes, setVotes] = useState({});
    const [results, setResults] = useState(null);
    const [touchStart, setTouchStart] = useState(0);
    const [chatMessages, setChatMessages] = useState([]);
    const [giftAnimation, setGiftAnimation] = useState(null);
    const [showStudio, setShowStudio] = useState(false);
    const containerRef = useRef(null);

    // Fake chat data - Gen Z/Alpha Slang & Opinions
    const CHAT_USERS = [
        'user123', 'policy_wonk', 'yimby_queen', 'gen_z_voter', 'eco_warrior',
        'housing_now', 'rent_too_high', 'vote_blue', 'vote_red', 'centrist_dad',
        'cat_lover_99', 'student_debt_sucks', 'ok_boomer', 'skibidi_policy',
        'fanum_tax_collector', 'no_cap_fr', 'based_god', 'sigma_grindset'
    ];
    const CHAT_COLORS = ['text-yellow-400', 'text-cyan-400', 'text-pink-400', 'text-green-400', 'text-purple-400', 'text-orange-400', 'text-blue-400', 'text-red-400'];
    const CHAT_MESSAGES = [
        // SUPPORT (YES)
        'yes yes yes', 'need this rn', 'w policy', 'based', 'fr someone said it',
        'vote yes!!', 'save me sm money', 'common w', 'slay',
        'protect tenants!', 'public transit ftw', 'equity king/queen 👑',

        // OPPOSE (NO)
        'vote no', 'l take', 'ruin economy', 'who pays 4 this??',
        'commie propaganda', 'taxes too high alr', 'common l', 'cringe',
        'nimby gang', 'econ 101??', 'govt out',

        // SKIP / APATHY
        'mid', 'skip', 'next', 'boring', 'i sleep 😴', 'do smth fun',
        'why on my fyp?', 'idk bout this', 'too complex',

        // DISRUPTIVE / TROLLS
        'MODS BAN HIM', 'fake news', 'propaganda', 'dead chat', 'fell off',
        'ratio', 'l + ratio', 'cry abt it', 'skill issue', 'bot',

        // NONSENSE / TANGENTS / BRAINROT
        'skibidi', 'any1 play fn?', 'i like turtles',
        'grimace shake', 'fanum tax', 'blud waffling',
        'ohio vibes', 'mewing check 🤫', 'chat is this real?',
        'can i get a hoya?', 'type 1 if u love pizza',

        // GIFTING / META
        'sent a rose 🌹', 'sent galaxy 🌌', 'sent lion 🦁', 'gifted 100 coins 💰',
        'dueting rn', 'boosting', 'tap screen!!'
    ];

    // Chat rotation effect
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.3) { // 70% chance to add message
                const newUser = CHAT_USERS[Math.floor(Math.random() * CHAT_USERS.length)];
                const newColor = CHAT_COLORS[Math.floor(Math.random() * CHAT_COLORS.length)];
                const newText = CHAT_MESSAGES[Math.floor(Math.random() * CHAT_MESSAGES.length)];

                setChatMessages(prev => {
                    const newMsg = { id: Date.now(), user: newUser, color: newColor, text: newText };
                    return [...prev.slice(-6), newMsg]; // Keep last 7
                });
            }
        }, 800); // New message every ~800ms

        return () => clearInterval(interval);
    }, []);

    const currentItem = feedItems[currentIndex];
    const votedProps = Object.keys(votes);
    const hasVotedOnCurrent = currentItem?.type === 'prop' && votes[currentItem.data.id];

    // Calculate results when all 3 props are voted
    useEffect(() => {
        const isResultsPage = currentItem?.type === 'results';
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
        }
    }, [votes, results, votedProps.length, trackEvent, currentItem]);

    // Safety: Reset index if out of bounds (e.g., after hot reload/code changes)
    useEffect(() => {
        if (currentIndex >= feedItems.length) {
            setCurrentIndex(Math.max(0, feedItems.length - 1));
        }
    }, [currentIndex]);

    // Handle vote
    const handleVote = (propId, option) => {
        try {
            const newVotes = { ...votes, [propId]: option };
            setVotes(newVotes);

            // Removed gift animations as requested

            if (trackEvent) {
                trackEvent('feed_prop_vote', {
                    prop_id: propId,
                    vote: option,
                    card_index: currentIndex
                });
            }

            // Auto-advance after voting
            setTimeout(() => {
                goToNext();
            }, 1000);
        } catch (error) {
            console.error("Error handling vote:", error);
            // Fallback: just advance
            goToNext();
        }
    };

    // Handle reset
    const handleReset = () => {
        setVotes({});
        setResults(null);
        setCurrentIndex(0);
        trackEvent('feed_reset');
    };

    // Navigation
    const goToNext = () => {
        if (currentIndex < feedItems.length - 1) {
            setCurrentIndex(currentIndex + 1);
            trackEvent('feed_swipe', { from: currentIndex, to: currentIndex + 1 });
        }
    };

    const goToPrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            trackEvent('feed_swipe', { from: currentIndex, to: currentIndex - 1 });
        }
    };

    // Auto-play: ALWAYS auto-advance (zero friction like TikTok)
    useEffect(() => {
        let delay;
        if (currentItem?.type === 'stat') {
            delay = 1500; // 1.5 seconds for stats
        } else if (currentItem?.type === 'prop' && !hasVotedOnCurrent) {
            delay = 3000; // 3 seconds to vote on props
        } else if (currentItem?.type === 'prop' && hasVotedOnCurrent) {
            delay = 1000; // Quick advance after voting
        } else if (currentItem?.type === 'results') {
            delay = 5000; // 5 seconds to see results
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

    // Touch/swipe handling
    const handleTouchStart = (e) => {
        setTouchStart(e.touches[0].clientY);
    };

    const handleTouchEnd = (e) => {
        const touchEnd = e.changedTouches[0].clientY;
        const diff = touchStart - touchEnd;

        // Swipe up (next)
        if (diff > 50) {
            goToNext();
        }
        // Swipe down (prev)
        else if (diff < -50) {
            goToPrev();
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowUp' || e.key === ' ') {
                e.preventDefault();
                goToNext();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                goToPrev();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex]);

    // Render current card
    const renderCard = () => {
        if (!currentItem) return null;

        // Check if current is a stat and next is a prop - skip rendering to avoid duplication
        if (currentItem.type === 'stat' && currentIndex < feedItems.length - 1) {
            const nextItem = feedItems[currentIndex + 1];
            if (nextItem.type === 'prop') {
                // Skip this stat card and auto-advance to the prop which will show it in split view
                setTimeout(() => goToNext(), 100);
                return <div className="w-full h-full bg-slate-100" />;
            }
        }

        // When on a prop card, show previous context + current prop (only if previous is a stat)
        if (currentItem.type === 'prop' && currentIndex > 0) {
            const previousItem = feedItems[currentIndex - 1];

            // Only show split view if previous item is a stat card
            if (previousItem.type === 'stat') {
                return (
                    <div className="w-full h-full flex flex-col">
                        {/* Previous context (compressed at top) */}
                        <div className="h-1/2 overflow-hidden relative border-b-4 border-black/10 pt-8">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 pointer-events-none z-10" />
                            <div className="relative w-full h-full">
                                <StatCard stat={previousItem.data} />
                            </div>
                        </div>

                        {/* Current prop (bottom half) */}
                        <div className="h-1/2 relative overflow-auto">
                            <PropCard
                                proposition={currentItem.data}
                                onVote={(option) => handleVote(currentItem.data.id, option)}
                                hasVoted={hasVotedOnCurrent}
                            />
                        </div>
                    </div>
                );
            }
        }

        // Normal rendering for all other cases
        switch (currentItem.type) {
            case 'prop':
                return (
                    <PropCard
                        proposition={currentItem.data}
                        onVote={(option) => handleVote(currentItem.data.id, option)}
                        hasVoted={hasVotedOnCurrent}
                    />
                );

            case 'results':
                if (results) {
                    return (
                        <ResultsCard
                            resultStats={results.stats}
                            identityLabel={results.identity}
                            percentileData={results.percentile}
                            votes={votes}
                            onReset={handleReset}
                        />
                    );
                }
                // Skip results card if not ready yet
                return <div className="w-full h-full bg-slate-100" />;

            case 'stat':
                return <StatCard stat={currentItem.data} />;

            case 'dashboard':
                return <Dashboard />;

            default:
                return null;
        }
    };

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 bg-black overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Main feed container (9:16 aspect ratio, centered) */}
            <div className="w-full h-full flex items-center justify-center">
                <div
                    className="relative bg-white shadow-2xl overflow-hidden transition-transform duration-300"
                    style={{
                        width: '100%',
                        maxWidth: '450px',
                        height: '100%'
                    }}
                >
                    {renderCard()}
                </div>
            </div>

            {/* Progress dots (bottom center) - Hide in Studio */}
            {!showStudio && (
                <div className="fixed bottom-20 inset-x-0 flex justify-center z-[100] pointer-events-none">
                    <div className="flex gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-xl pointer-events-auto">
                        {feedItems.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setCurrentIndex(idx);
                                    trackEvent('feed_dot_nav', { from: currentIndex, to: idx });
                                }}
                                className={`h-2 rounded-full transition-all cursor-pointer hover:bg-white/80 ${idx === currentIndex ? 'bg-white w-6' : 'bg-white/40 w-2'
                                    }`}
                                aria-label={`Go to page ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* PoliTok Simulation Overlay */}
            <div className="fixed top-6 left-4 right-4 z-50 flex justify-between items-start pointer-events-none">
                <div className="flex flex-col gap-1">
                    <div className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 w-fit">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        LIVE
                    </div>
                    <div className="text-white/80 text-xs font-mono ml-1">
                        #politok
                    </div>
                </div>

                {/* Start Over Button - Persistent */}
                <button
                    onClick={handleReset}
                    className="pointer-events-auto bg-white text-black border-2 border-white/50 px-4 py-1 rounded-full font-bold text-xs hover:bg-gray-200 transition shadow-lg"
                >
                    ↺
                </button>

                <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-2 text-white drop-shadow-md">
                        <span className="text-xs font-bold">VIEWS</span>
                        <span className="text-xl font-black font-mono">
                            {(1200 + (currentIndex * 850) + (Object.keys(votes).length * 2400)).toLocaleString()}
                        </span>
                    </div>
                    <div className="flex items-center gap-1 text-white/90 drop-shadow-md">
                        <span className="text-xs">LIKES</span>
                        <span className="text-sm font-bold">
                            {(340 + (currentIndex * 120) + (Object.keys(votes).length * 850)).toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Live Comments Stream */}
            <div className="fixed bottom-24 left-4 w-64 h-48 overflow-hidden pointer-events-none z-40 mask-image-linear-to-t">
                <div className="flex flex-col justify-end h-full gap-2">
                    {chatMessages.map((msg) => (
                        <div key={msg.id} className="animate-slide-up-fade">
                            <span className={`font-bold text-xs text-shadow ${msg.color}`}>{msg.user}:</span> <span className="text-white text-xs text-shadow">{msg.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Live Studio Overlay */}
            {showStudio && (
                <LiveStudio
                    onClose={() => setShowStudio(false)}
                    onStartStream={() => {
                        // Could add logic here if needed
                    }}
                />
            )}

            {/* Bottom Navigation (TikTok Style) */}
            <div className="fixed bottom-0 left-0 right-0 h-16 bg-black text-white flex justify-around items-center z-50 border-t border-white/10">
                <div className="flex flex-col items-center opacity-100">
                    <span className="text-xl">🏠</span>
                    <span className="text-[10px] font-bold">Home</span>
                </div>
                <div className="flex flex-col items-center opacity-60">
                    <span className="text-xl">👥</span>
                    <span className="text-[10px]">Friends</span>
                </div>

                {/* Go Live / Create Button */}
                <button
                    onClick={() => {
                        const followers = 1500 + (Object.keys(votes).length * 250); // Start with 1.5k followers
                        if (followers < 1000) {
                            // Trigger a "toast" or alert simulation
                            const alertMsg = { emoji: '🔒', text: `Need 1k followers to Go LIVE! (You have ${followers})` };
                            setGiftAnimation(alertMsg);
                            setTimeout(() => setGiftAnimation(null), 3000);
                        } else {
                            setShowStudio(true);
                        }
                    }}
                    className="w-12 h-8 bg-white rounded-lg flex items-center justify-center relative hover:scale-110 transition"
                >
                    <div className="absolute w-1 h-4 bg-black rounded-full" />
                    <div className="absolute w-4 h-1 bg-black rounded-full" />
                    <div className="absolute -left-1 -right-1 top-1 bottom-1 bg-cyan-400 rounded-lg -z-10 mix-blend-screen translate-x-0.5" />
                    <div className="absolute -left-1 -right-1 top-1 bottom-1 bg-red-400 rounded-lg -z-10 mix-blend-screen -translate-x-0.5" />
                </button>

                <div className="flex flex-col items-center opacity-60">
                    <span className="text-xl">💬</span>
                    <span className="text-[10px]">Inbox</span>
                </div>
                <div className="flex flex-col items-center opacity-60">
                    <span className="text-xl">👤</span>
                    <span className="text-[10px]">Profile</span>
                </div>
            </div>

            {/* Gift/Rose Animation Overlay */}
            {giftAnimation && (
                <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center animate-gift-pop">
                    <div className="flex flex-col items-center">
                        <div className="text-9xl drop-shadow-2xl animate-bounce">
                            {giftAnimation.emoji}
                        </div>
                        <div className="bg-white/90 backdrop-blur text-black font-black text-xl px-6 py-3 rounded-2xl mt-4 border-4 border-black/10 shadow-2xl text-center max-w-xs">
                            {giftAnimation.text}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
'''

with open('apps/web/src/components/Feed.jsx', 'w') as f:
    f.write(content.strip())
print('Writing file...')
