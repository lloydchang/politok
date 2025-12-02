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
import { useFeed, useInteractions } from '@politok/shared/hooks';
import Proposition from './Proposition';
import Result from './Result';
import Statistic from './Statistic';
import Dashboard from './Dashboard';
import Profile from './Profile';
import { trackEvent } from '@/lib/telemetry';

// Web storage adapter
const webStorage = {
    getItem: (key) => {
        if (typeof window === 'undefined') return Promise.resolve(null);
        return Promise.resolve(localStorage.getItem(key));
    },
    setItem: (key, value) => {
        if (typeof window === 'undefined') return Promise.resolve();
        return Promise.resolve(localStorage.setItem(key, value));
    }
};

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

    const {
        interactions,
        toggleLike,
        incrementView,
        toggleFollow,
        totalLikes
    } = useInteractions(webStorage);

    const [touchStart, setTouchStart] = useState(0);
    const [mouseStart, setMouseStart] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [giftAnimation, setGiftAnimation] = useState(null);
    const [animationKey, setAnimationKey] = useState(0);
    const [slideDirection, setSlideDirection] = useState(null);
    const containerRef = useRef(null);
    const prevIndexRef = useRef(currentIndex);

    // Get current item ID
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

    // Trigger animation on index change
    useEffect(() => {
        if (currentIndex !== prevIndexRef.current) {
            const direction = currentIndex > prevIndexRef.current ? 'up' : 'down';
            setSlideDirection(direction);
            setAnimationKey(prev => prev + 1);
            prevIndexRef.current = currentIndex;
        }
    }, [currentIndex]);

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
                    key={animationKey}
                    className={`relative w-full h-full text-white overflow-hidden ${slideDirection === 'up' ? 'animate-slide-up' : slideDirection === 'down' ? 'animate-slide-down' : ''
                        }`}
                    style={{
                        background: COLORS.BG_GRADIENT_WEB,
                        width: '100%',
                        maxWidth: '450px',
                        height: '100%'
                    }}
                >
                    {renderCard()}

                    {/* Right Sidebar (Interaction Icons) - Only show if not on profile */}
                    {currentItem?.type !== 'profile' && (
                        <div className="absolute right-2 bottom-32 flex flex-col items-center gap-6 z-20">
                            {/* 1. Profile Picture (Placeholder) */}
                            <div className="relative group cursor-pointer">
                                <div className="w-12 h-12 rounded-full border border-white overflow-hidden bg-black flex items-center justify-center">
                                    <img src="/logo.png" alt="Profile" className="w-full h-full object-contain" />
                                </div>
                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center border border-white">
                                    <span className="text-white text-xs font-bold">+</span>
                                </div>
                            </div>

                            {/* 2. Like Button (Heart) */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (currentId) toggleLike(currentId);
                                }}
                                className="flex flex-col items-center gap-1 group"
                            >
                                <div className={`transition-transform active:scale-90 ${isLiked ? 'text-red-500' : 'text-white'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "currentColor"} stroke="none" className="w-10 h-10 drop-shadow-xl filter">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                </div>
                                <span className="text-xs font-bold drop-shadow-md">{likeCount}</span>
                            </button>

                            {/* 3. Comment Icon (Placeholder) */}
                            <button className="flex flex-col items-center gap-1 group opacity-90">
                                <div className="text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 drop-shadow-xl">
                                        <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-xs font-bold drop-shadow-md">0</span>
                            </button>

                            {/* 4. Share Icon (Placeholder) */}
                            <button className="flex flex-col items-center gap-1 group opacity-90">
                                <div className="text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 drop-shadow-xl">
                                        <path fillRule="evenodd" d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 100-4.132l8.421-4.679a3 3 0 01-.096-.755z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-xs font-bold drop-shadow-md">Share</span>
                            </button>
                        </div>
                    )}

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