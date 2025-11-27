import React, { useState } from 'react';
import { PROPOSITIONS, COLORS } from '@polytawk/shared';

export default function SwipeMode({ onComplete, trackEvent }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [votes, setVotes] = useState({});
    const [swipeDirection, setSwipeDirection] = useState(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);

    const currentProp = PROPOSITIONS[currentIndex];
    const isLastProp = currentIndex === PROPOSITIONS.length - 1;

    const handleVote = (propId, option) => {
        const newVotes = { ...votes, [propId]: option };
        setVotes(newVotes);

        trackEvent('proposition_vote', {
            proposition_id: propId,
            proposition_title: currentProp.title,
            option_id: option,
            mode: 'swipe'
        });

        if (isLastProp) {
            onComplete(newVotes);
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleSwipe = (direction) => {
        setSwipeDirection(direction);

        setTimeout(() => {
            if (direction === 'right') {
                handleVote(currentProp.id, 'yes');
            } else if (direction === 'left') {
                handleVote(currentProp.id, 'no');
            } else if (direction === 'up') {
                handleVote(currentProp.id, 'skip');
            }
            setSwipeDirection(null);
            setDragOffset({ x: 0, y: 0 });
        }, 300);
    };

    const handleTouchStart = (e) => {
        setIsDragging(true);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        const startX = touch.clientX;
        const startY = touch.clientY;
        setDragOffset({ x: startX - window.innerWidth / 2, y: startY - window.innerHeight / 2 });
    };

    const handleTouchEnd = () => {
        if (Math.abs(dragOffset.x) > 100) {
            handleSwipe(dragOffset.x > 0 ? 'right' : 'left');
        } else if (dragOffset.y < -100) {
            handleSwipe('up');
        } else {
            setDragOffset({ x: 0, y: 0 });
        }
        setIsDragging(false);
    };

    const getCardStyle = () => {
        const rotation = dragOffset.x / 20;
        return {
            transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out'
        };
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ backgroundColor: COLORS.BG_LIGHT_BLUE }}>
            {/* Progress */}
            <div className="w-full max-w-md mb-4">
                <div className="flex gap-2">
                    {PROPOSITIONS.map((_, idx) => (
                        <div
                            key={idx}
                            className="flex-1 h-2 rounded-full"
                            style={{ backgroundColor: idx <= currentIndex ? COLORS.PRIMARY_YELLOW : '#cbd5e1' }}
                        />
                    ))}
                </div>
                <div className="text-center text-sm text-slate-600 mt-2">
                    Swipe Mode • {currentIndex + 1}/{PROPOSITIONS.length}
                </div>
            </div>

            {/* Card Stack */}
            <div className="relative w-full max-w-md h-[500px]">
                <div
                    className="absolute inset-0 bg-white rounded-3xl shadow-2xl p-8 cursor-grab active:cursor-grabbing"
                    style={getCardStyle()}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="text-6xl mb-6 text-center">{currentProp.emoji}</div>
                    <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: COLORS.PRIMARY_BLUE }}>
                        {currentProp.title}
                    </h2>
                    <p className="text-lg text-slate-700 text-center leading-relaxed">
                        {currentProp.description}
                    </p>
                </div>

                {/* Swipe indicators */}
                {dragOffset.x > 50 && (
                    <div className="absolute top-1/2 right-8 -translate-y-1/2 text-6xl opacity-50">✅</div>
                )}
                {dragOffset.x < -50 && (
                    <div className="absolute top-1/2 left-8 -translate-y-1/2 text-6xl opacity-50">❌</div>
                )}
                {dragOffset.y < -50 && (
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 text-6xl opacity-50">⏭️</div>
                )}
            </div>

            {/* Button hints */}
            <div className="flex gap-4 mt-8">
                <button
                    onClick={() => handleSwipe('left')}
                    className="w-16 h-16 rounded-full bg-red-500 text-white text-2xl shadow-lg hover:bg-red-600 transition"
                >
                    ❌
                </button>
                <button
                    onClick={() => handleSwipe('up')}
                    className="w-16 h-16 rounded-full bg-slate-400 text-white text-2xl shadow-lg hover:bg-slate-500 transition"
                >
                    ⏭️
                </button>
                <button
                    onClick={() => handleSwipe('right')}
                    className="w-16 h-16 rounded-full bg-green-500 text-white text-2xl shadow-lg hover:bg-green-600 transition"
                >
                    ✅
                </button>
            </div>

            <div className="text-center text-sm text-slate-500 mt-4">
                Swipe or tap • Left=NO, Right=YES, Up=SKIP
            </div>
        </div>
    );
}
