'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
    PROPOSITIONS,
    processVote as processVoteShared,
    getPercentileRanking,
    getIdentityLabel,
    COLORS
} from '@politok/shared';
import {
    POLICIES,
    CHAT_DATA,
    FEED_ITEMS
} from '@politok/shared/constants';
import { useFeed } from '@politok/shared/hooks';
import Proposition from './Proposition';
import Result from './Result';
import Statistic from './Statistic';
import Dashboard from './Dashboard';
import Profile from './Profile';
import { trackEvent } from '@/lib/telemetry';

export default function Feed() {
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
        goToNext,
        goToPrev
    } = useFeed(FEED_ITEMS, { trackEvent }, profileIndex !== -1 ? profileIndex : 0);



    const [touchStart, setTouchStart] = useState(0);
    const [mouseStart, setMouseStart] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [giftAnimation, setGiftAnimation] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transitionDirection, setTransitionDirection] = useState(null); // 'up' or 'down'
    const [previousIndex, setPreviousIndex] = useState(currentIndex);
    const containerRef = useRef(null);

    // Track index changes for transitions
    useEffect(() => {
        if (currentIndex !== previousIndex) {
            const direction = currentIndex > previousIndex ? 'up' : 'down';
            setTransitionDirection(direction);
            setIsTransitioning(true);
            setPreviousIndex(currentIndex);

            // End transition after animation completes
            const timer = setTimeout(() => {
                setIsTransitioning(false);
                setTransitionDirection(null);
            }, 300); // Match CSS transition duration

            return () => clearTimeout(timer);
        }
    }, [currentIndex, previousIndex]);

    // Auto-play: ALWAYS auto-advance (zero friction like TikTok)
    useEffect(() => {
        let delay;
        if (currentItem?.type === 'prop' && !hasVotedOnCurrent) {
            delay = 4000; // 4 second to vote on props
        } else if (currentItem?.type === 'prop' && hasVotedOnCurrent) {
            delay = 0; // Quick advance after voting
        } else if (currentItem?.type === 'results') {
            delay = 6000; // 6 second to see result
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
    }, [currentIndex, currentItem, hasVotedOnCurrent, goToNext]);

    // Touch/swipe handling (mobile)
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

    // Mouse drag handling (desktop)
    const handleMouseDown = (e) => {
        // Don't interfere with button clicks
        if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
            return;
        }

        setMouseStart(e.clientY);
        setIsDragging(false); // Don't set to true immediately
    };

    const handleMouseMove = (e) => {
        if (mouseStart === 0) return;

        const diff = Math.abs(mouseStart - e.clientY);

        // Only consider it a drag if moved more than 10 pixels
        if (diff > 10 && !isDragging) {
            setIsDragging(true);
        }
    };

    const handleMouseUp = (e) => {
        if (mouseStart === 0) return;

        const mouseEnd = e.clientY;
        const diff = mouseStart - mouseEnd;

        // Only navigate if this was actually a drag (not just a click)
        if (isDragging && Math.abs(diff) > 50) {
            // Swipe up (drag down, next card)
            if (diff > 50) {
                goToNext();
            }
            // Swipe down (drag up, prev card)
            else if (diff < -50) {
                goToPrev();
            }
        }

        // Reset states
        setIsDragging(false);
        setMouseStart(0);
    };

    const handleMouseLeave = () => {
        // Cancel drag if mouse leaves the container
        setIsDragging(false);
        setMouseStart(0);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                goToNext();
            } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
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

        // Check if prop has associated stat data for split view
        if (currentItem.type === 'prop' && currentItem.stat) {
            return (
                <div className="w-full h-full flex flex-col">
                    {/* Stat context (compressed at top) */}
                    <div className="h-1/2 overflow-hidden relative">
                        <div className="relative w-full h-full">
                            <Statistic stat={currentItem.stat} />
                        </div>
                    </div>

                    {/* Current prop (bottom half) */}
                    <div className="h-1/2 relative overflow-auto">
                        <Proposition
                            key={currentItem.data.id}
                            proposition={currentItem.data}
                            onVote={(option) => handleVote(currentItem.data.id, option)}
                            hasVoted={hasVotedOnCurrent}
                        />
                    </div>
                </div>
            );
        }

        // Normal rendering for all other cases
        switch (currentItem.type) {
            case 'prop':
                return (
                    <Proposition
                        key={currentItem.data.id}
                        proposition={currentItem.data}
                        onVote={(option) => handleVote(currentItem.data.id, option)}
                        hasVoted={hasVotedOnCurrent}
                    />
                );

            case 'results':
                if (results) {
                    return (
                        <Result
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



            case 'dashboard':
                return <Dashboard />;

            case 'profile':
                return <Profile onNavigate={(index) => setCurrentIndex(index)} votes={votes} results={results} />;

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
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
        >
            {/* Main feed container (9:16 aspect ratio, centered) */}
            <div className="w-full h-full flex items-center justify-center">
                <div
                    className={`relative w-full h-full text-white overflow-hidden transition-transform duration-300 ease-out ${isTransitioning
                            ? transitionDirection === 'up'
                                ? 'animate-slide-up'
                                : 'animate-slide-down'
                            : ''
                        }`}
                    style={{
                        background: COLORS.BG_GRADIENT_WEB,
                        width: '100%',
                        maxWidth: '450px',
                        height: '100%'
                    }}
                >
                    {renderCard()}

                    {/* Progress dots */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30 pointer-events-none">
                        {FEED_ITEMS.map((_, idx) => {
                            const isProfile = currentItem?.type === 'profile';
                            const activeColor = isProfile ? 'bg-white' : 'bg-white';
                            const inactiveColor = isProfile ? 'bg-white/30 hover:bg-white/50' : 'bg-white/50 hover:bg-white/75';

                            return (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 pointer-events-auto ${idx === currentIndex
                                        ? `${activeColor} w-6`
                                        : inactiveColor
                                        }`}
                                    aria-label={`Go to page ${idx + 1}`}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Live Comments Stream removed */}



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
        </div>
    );
}