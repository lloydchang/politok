import React, { useState, useEffect } from 'react';
import { PROPOSITIONS, COLORS } from '@politok/shared';

export default function MicroMode({ onComplete, trackEvent }) {
    const [selectedProp, setSelectedProp] = useState(null);
    const [voted, setVoted] = useState(false);

    useEffect(() => {
        // Pick a random proposition
        const randomProp = PROPOSITIONS[Math.floor(Math.random() * PROPOSITIONS.length)];
        setSelectedProp(randomProp);
        trackEvent('micro_mode_prop_selected', { prop_id: randomProp.id });
    }, []);

    const handleVote = (option) => {
        if (!selectedProp) return;

        const votes = { [selectedProp.id]: option };

        trackEvent('proposition_vote', {
            proposition_id: selectedProp.id,
            proposition_title: selectedProp.title,
            option_id: option,
            mode: 'micro'
        });

        setVoted(true);

        // Complete immediately with just this one vote
        setTimeout(() => {
            onComplete(votes);
        }, 500);
    };

    if (!selectedProp) return null;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ backgroundColor: COLORS.BG_LIGHT_BLUE }}>
            <div className="max-w-2xl w-full">
                {/* Mode badge */}
                <div className="text-center mb-8">
                    <span className="bg-purple-600 text-white px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider">
                        ⚡ Quick Take Mode
                    </span>
                </div>

                {/* Proposition card */}
                <div className="bg-white rounded-3xl shadow-2xl p-12 mb-8">
                    <div className="text-8xl mb-8 text-center animate-bounce">{selectedProp.emoji}</div>

                    <h1 className="text-4xl font-black mb-6 text-center leading-tight" style={{ color: COLORS.PRIMARY_BLUE }}>
                        {selectedProp.title}
                    </h1>

                    <p className="text-xl text-slate-700 text-center leading-relaxed mb-2">
                        {selectedProp.description}
                    </p>
                </div>

                {/* Giant buttons */}
                {!voted ? (
                    <div className="grid grid-cols-2 gap-6">
                        <button
                            onClick={() => handleVote('no')}
                            className="h-32 rounded-2xl font-black text-3xl shadow-xl hover:scale-105 transition transform"
                            style={{ backgroundColor: '#ef4444', color: 'white' }}
                        >
                            ❌ NO
                        </button>
                        <button
                            onClick={() => handleVote('yes')}
                            className="h-32 rounded-2xl font-black text-3xl shadow-xl hover:scale-105 transition transform"
                            style={{ backgroundColor: '#22c55e', color: 'white' }}
                        >
                            ✅ YES
                        </button>
                    </div>
                ) : (
                    <div className="text-center">
                        <div className="text-2xl font-bold text-slate-600 animate-pulse">
                            Processing your take... 👀
                        </div>
                    </div>
                )}

                <div className="text-center text-sm text-slate-500 mt-6">
                    One question, instant verdict
                </div>
            </div>
        </div>
    );
}
