'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
    PROPOSITIONS,
    processVote as processVoteShared,
    getPercentileRanking,
    getIdentityLabel
} from '@politok/shared';
import {
    POLICIES,
    CHAT_DATA,
    FEED_ITEMS
} from '@politok/shared/constants';
import { useChat, useFeed } from '@politok/shared/hooks';
import PropCard from './cards/PropCard';
import ResultsCard from './cards/ResultsCard';
import StatCard from './cards/StatCard';
import Dashboard from './Dashboard';
import { trackEvent } from '@/lib/telemetry';

export default function Feed() {
    const {
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
    } = useFeed(FEED_ITEMS, { trackEvent });

    const chatMessages = useChat();

    const [touchStart, setTouchStart] = useState(0);
    const [giftAnimation, setGiftAnimation] = useState(null);
    const containerRef = useRef(null);

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
    }, [currentIndex, currentItem, hasVotedOnCurrent, goToNext]);

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
        if (currentItem.type === 'stat' && currentIndex < FEED_ITEMS.length - 1) {
            const nextItem = FEED_ITEMS[currentIndex + 1];
            if (nextItem.type === 'prop') {
                // Skip this stat card and auto-advance to the prop which will show it in split view
                setTimeout(() => goToNext(), 100);
                return <div className="w-full h-full bg-slate-100" />;
            }
        }

        // When on a prop card, show previous context + current prop (only if previous is a stat)
        if (currentItem.type === 'prop' && currentIndex > 0) {
            const previousItem = FEED_ITEMS[currentIndex - 1];

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

            {/* Progress dots (bottom center) */}
            <div className="fixed bottom-20 inset-x-0 flex justify-center z-[100] pointer-events-none">
                <div className="flex gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-xl pointer-events-auto">
                    {FEED_ITEMS.map((_, idx) => (
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

            {/* PoliTok Simulation Overlay */}
            <div className="fixed top-6 left-4 right-4 z-50 flex justify-between items-start pointer-events-none">
                <div className="flex flex-col gap-1">
                    <div className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 w-fit">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        LIVE
                    </div>
                </div>



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