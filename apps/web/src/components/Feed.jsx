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
    FEED_ITEMS
} from '@politok/shared/constants';
import { useFeed, useInteractions } from '@politok/shared/hooks';
import Proposition from './Proposition';
import Result from './Result';
import Statistic from './Statistic';
import Dashboard from './Dashboard';
import Profile from './Profile';
import { trackEvent } from '@/lib/telemetry';
import { webSyncAdapter } from '@/lib/sync';

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
        totalLikes,
        globalStats
    } = useInteractions(webStorage, webSyncAdapter);

    const [touchStart, setTouchStart] = useState(0);
    const [mouseStart, setMouseStart] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [giftAnimation, setGiftAnimation] = useState(null);
    const containerRef = useRef(null);

    // Get current item ID
    const currentId = currentItem?.data?.id || currentItem?.id;
    const currentInteraction = currentId ? interactions.items[currentId] : null;
    const isLiked = currentInteraction?.liked || false;

    // Optimistic UI: Show local count immediately, fall back to global (TikTok-style instant feedback)
    // Use ?? instead of || so that 0 is treated as valid
    const likeCount = (currentInteraction?.likes ?? globalStats?.likes?.[currentId]) ?? 0;

    // Track views
    useEffect(() => {
        if (currentId) {
            incrementView(currentId);
        }
    }, [currentId, incrementView]);

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
    const renderCard = (item = currentItem, index = currentIndex) => {
        if (!item) return null;

        switch (item.type) {
            case 'prop':
                return (
                    <div className="h-full flex flex-col">
                        {item.stat && (
                            <div className="h-[45%] relative z-10">
                                <Statistic stat={item.stat} />
                            </div>
                        )}
                        <div className="flex-1 relative z-20">
                            <Proposition
                                key={item.data.id}
                                proposition={item.data}
                                onVote={handleVote}
                                hasVoted={hasVotedOnCurrent && index === currentIndex}
                                selectedVote={votes[item.data.id]}
                            />
                        </div>
                    </div>
                );

            case 'results':
                return (
                    <Result
                        key="results"
                        resultStats={results.stats}
                        identityLabel={results.identity}
                        percentileData={results.percentile}
                        votes={votes}
                        onReset={handleReset}
                    />
                );

            case 'stat':
                return <Statistic key={`stat-${index}`} stat={item.stat} />;

            case 'dashboard':
                return <Dashboard key="dashboard" />;

            case 'profile':
                return (
                    <Profile
                        key="profile"
                        onNavigate={setCurrentIndex}
                        votes={votes}
                        results={results}
                        interactions={interactions}
                        toggleFollow={toggleFollow}
                        totalLikes={totalLikes}
                        globalStats={globalStats}
                    />
                );

            default:
                return null;
        }
    };

    const [showHearts, setShowHearts] = useState([]);

    const handleDoubleClick = (e) => {
        if (!currentId) return;

        // Disable double-click animation on profile page
        if (currentItem?.type === 'profile') return;

        // Get click position relative to the container
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Trigger like (force true)
        toggleLike(currentId, true);

        // Add temporary heart
        const heartId = Date.now();
        const rotation = Math.random() * 30 - 15; // Random rotation between -15 and 15 deg

        setShowHearts(prev => [...prev, { id: heartId, x, y, rotation }]);

        // Remove heart after animation
        setTimeout(() => {
            setShowHearts(prev => prev.filter(h => h.id !== heartId));
        }, 800);
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
                    className="relative w-full h-full overflow-hidden"
                    style={{
                        background: COLORS.BG_GRADIENT_WEB,
                        width: '100%',
                        maxWidth: '450px',
                        height: '100%'
                    }}
                    onDoubleClick={handleDoubleClick}
                >
                    {/* Carousel container - all pages stacked vertically */}
                    <div
                        className="absolute inset-0 transition-transform duration-300 ease-out"
                        style={{
                            transform: `translateY(-${currentIndex * 100}%)`
                        }}
                    >
                        {FEED_ITEMS.map((item, index) => (
                            <div
                                key={index}
                                className="absolute top-0 left-0 w-full h-full"
                                style={{
                                    transform: `translateY(${index * 100}%)`
                                }}
                            >
                                {renderCard(item, index)}
                            </div>
                        ))}
                    </div>

                    {/* Double Tap Heart Animation Overlay */}
                    {showHearts.map(heart => (
                        <div
                            key={heart.id}
                            className="absolute pointer-events-none z-50 animate-heart-pop"
                            style={{
                                left: heart.x,
                                top: heart.y,
                                transform: `translate(-50%, -50%) rotate(${heart.rotation}deg)`
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ef4444" className="w-24 h-24 drop-shadow-xl filter">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </div>
                    ))}

                    {/* Right Sidebar (Interaction Icons) - Only show if not on profile */}
                    {currentItem?.type !== 'profile' && (
                        <div className="absolute right-2 bottom-32 flex flex-col items-center gap-6 z-20">
                            {/* 1. Profile Picture (Placeholder) */}
                            <div className="relative group cursor-pointer">
                                <div
                                    className="w-12 h-12 rounded-full border border-white overflow-hidden bg-black flex items-center justify-center transition-transform active:scale-95"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const profileIndex = FEED_ITEMS.findIndex(item => item.type === 'profile');
                                        if (profileIndex !== -1) setCurrentIndex(profileIndex);
                                    }}
                                >
                                    <img src="/logo.png" alt="Profile" className="w-full h-full object-contain" />
                                </div>
                                {!interactions.isFollowing && (
                                    <div
                                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center border border-white transition-transform hover:scale-110 active:scale-90 z-10"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFollow();
                                        }}
                                    >
                                        <span className="text-white text-xs font-bold">+</span>
                                    </div>
                                )}
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