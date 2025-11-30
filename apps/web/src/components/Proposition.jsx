import React from 'react';
import { COLORS } from '@politok/shared';
import { usePropCard } from '@politok/shared/hooks';

export default function Proposition({ proposition, onVote, hasVoted, selectedVote }) {
    const { votedOption, handleVote } = usePropCard(onVote);

    return (
        <div
            className="relative w-full h-full flex flex-col overflow-hidden"
            style={{
                background: `linear-gradient(135deg, ${COLORS.PRIMARY_BLUE}20 0%, ${COLORS.OUTCOME_RED}20 100%)`,
            }}
        >
            {/* Background emoji (huge, faded) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 select-none">
                <div className="text-[30rem] leading-none">{proposition.emoji}</div>
            </div>

            {/* Main content - CENTERED with proper spacing */}
            <div className="flex-1 flex items-start justify-center px-6 pt-2 pb-16">
                <div className="relative z-10 max-w-xl mx-auto text-center">
                    <div className="text-7xl mb-6">{proposition.emoji}</div>

                    <h1 className="text-3xl font-black mb-4 leading-tight px-4" style={{ color: COLORS.TEXT_BLUE_LIGHT }}>
                        {proposition.title}
                    </h1>

                    <p className="text-lg leading-relaxed px-4 font-medium" style={{ color: COLORS.TEXT_LIGHT_WHITE }}>
                        {proposition.description}
                    </p>
                </div>
            </div>

            {/* Vote buttons - BOTTOM (like TikTok comments) */}
            <div className="absolute bottom-24 left-0 right-0 p-6 bg-gradient-to-t from-black/20 to-transparent">
                <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                    <button
                        onClick={() => handleVote('no')}
                        className={`h-16 rounded-2xl bg-red-900 text-white shadow-lg font-bold text-lg transition-all duration-300 border-2 border-red-700 flex items-center justify-center gap-8 ${votedOption && votedOption !== 'no'
                            ? 'opacity-0 scale-75 pointer-events-none'
                            : votedOption === 'no'
                                ? 'scale-110'
                                : 'hover:scale-105 active:scale-95'
                            }`}
                        disabled={votedOption !== null}
                    >
                        <span>❌</span>
                        <span>NO</span>
                    </button>
                    <button
                        onClick={() => handleVote('yes')}
                        className={`h-16 rounded-2xl bg-blue-900 text-white shadow-lg font-bold text-lg transition-all duration-300 border-2 border-blue-700 flex items-center justify-center gap-8 ${votedOption && votedOption !== 'yes'
                            ? 'opacity-0 scale-75 pointer-events-none'
                            : votedOption === 'yes'
                                ? 'scale-110'
                                : 'hover:scale-105 active:scale-95'
                            }`}
                        disabled={votedOption !== null}
                    >
                        <span>✅</span>
                        <span>YES</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
