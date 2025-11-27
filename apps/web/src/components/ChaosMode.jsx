import React, { useState, useEffect, useRef } from 'react';
import { PROPOSITIONS, COLORS } from '@politok/shared';

export default function ChaosMode({ onComplete, trackEvent }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [votes, setVotes] = useState({});
    const [autoVotes, setAutoVotes] = useState({});
    const [timeLeft, setTimeLeft] = useState(1.5);
    const [isLocked, setIsLocked] = useState(false);
    const timerRef = useRef(null);

    const currentProp = PROPOSITIONS[currentIndex];
    const isLastProp = currentIndex === PROPOSITIONS.length - 1;
    const TIME_PER_PROP = 1.5; // seconds

    useEffect(() => {
        // Start countdown timer
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 0.1) {
                    handleTimeout();
                    return TIME_PER_PROP;
                }
                return prev - 0.1;
            });
        }, 100);

        return () => clearInterval(timerRef.current);
    }, [currentIndex]);

    const handleTimeout = () => {
        // Random auto-vote if user didn't vote
        if (!isLocked) {
            const options = ['yes', 'no', 'skip'];
            const randomOption = options[Math.floor(Math.random() * 3)];

            const newVotes = { ...votes, [currentProp.id]: randomOption };
            const newAutoVotes = { ...autoVotes, [currentProp.id]: true };

            setVotes(newVotes);
            setAutoVotes(newAutoVotes);

            trackEvent('chaos_auto_vote', {
                proposition_id: currentProp.id,
                random_vote: randomOption
            });

            moveToNext(newVotes);
        }
    };

    const handleVote = (option) => {
        if (isLocked) return;

        setIsLocked(true);
        const newVotes = { ...votes, [currentProp.id]: option };
        setVotes(newVotes);

        trackEvent('proposition_vote', {
            proposition_id: currentProp.id,
            proposition_title: currentProp.title,
            option_id: option,
            mode: 'chaos',
            time_remaining: timeLeft.toFixed(1)
        });

        setTimeout(() => {
            moveToNext(newVotes);
        }, 300);
    };

    const moveToNext = (currentVotes) => {
        if (isLastProp) {
            onComplete(currentVotes, autoVotes);
        } else {
            setCurrentIndex(currentIndex + 1);
            setTimeLeft(TIME_PER_PROP);
            setIsLocked(false);
        }
    };

    const progress = ((TIME_PER_PROP - timeLeft) / TIME_PER_PROP) * 100;
    const isUrgent = timeLeft < 0.5;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ backgroundColor: COLORS.BG_LIGHT_BLUE }}>
            <div className="max-w-2xl w-full">
                {/* Mode badge */}
                <div className="text-center mb-4">
                    <span className="bg-red-600 text-white px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider animate-pulse">
                        🔥 CHAOS MODE
                    </span>
                </div>

                {/* Timer bar */}
                <div className="w-full h-4 bg-slate-300 rounded-full mb-6 overflow-hidden">
                    <div
                        className={`h-full transition-all duration-100 ${isUrgent ? 'bg-red-500 animate-pulse' : 'bg-blue-600'}`}
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Time remaining */}
                <div className={`text-center mb-6 font-mono text-6xl font-black ${isUrgent ? 'text-red-600 animate-bounce' : 'text-slate-700'}`}>
                    {timeLeft.toFixed(1)}s
                </div>

                {/* Proposition card */}
                <div className={`bg-white rounded-3xl shadow-2xl p-8 mb-6 ${isLocked ? 'opacity-50' : ''} transition`}>
                    <div className="text-6xl mb-4 text-center">{currentProp.emoji}</div>
                    <h2 className="text-2xl font-bold mb-3 text-center" style={{ color: COLORS.PRIMARY_BLUE }}>
                        {currentProp.title}
                    </h2>
                    <p className="text-lg text-slate-700 text-center leading-relaxed">
                        {currentProp.description}
                    </p>
                </div>

                {/* Quick vote buttons */}
                {!isLocked && (
                    <div className="grid grid-cols-3 gap-4">
                        <button
                            onClick={() => handleVote('no')}
                            className="h-20 rounded-xl font-bold text-xl bg-red-500 text-white shadow-lg hover:bg-red-600 active:scale-95 transition transform"
                        >
                            ❌ NO
                        </button>
                        <button
                            onClick={() => handleVote('skip')}
                            className="h-20 rounded-xl font-bold text-xl bg-slate-400 text-white shadow-lg hover:bg-slate-500 active:scale-95 transition transform"
                        >
                            ⏭️ SKIP
                        </button>
                        <button
                            onClick={() => handleVote('yes')}
                            className="h-20 rounded-xl font-bold text-xl bg-green-500 text-white shadow-lg hover:bg-green-600 active:scale-95 transition transform"
                        >
                            ✅ YES
                        </button>
                    </div>
                )}

                {/* Progress indicator */}
                <div className="text-center text-sm text-slate-600 mt-4">
                    Question {currentIndex + 1}/{PROPOSITIONS.length} • {Object.keys(autoVotes).length} auto-voted
                </div>

                <div className="text-center text-xs text-slate-500 mt-2">
                    Vote before time runs out or chaos decides for you!
                </div>
            </div>
        </div>
    );
}
