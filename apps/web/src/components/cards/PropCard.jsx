import React from 'react';
import { COLORS } from '@politok/shared';

export default function PropCard({ proposition, onVote, hasVoted }) {
    return (
        <div
            className="relative w-full h-full flex flex-col overflow-hidden"
            style={{
                background: `linear-gradient(135deg, ${COLORS.PRIMARY_BLUE}20 0%, ${COLORS.PRIMARY_YELLOW}20 100%)`,
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

                    <h1 className="text-3xl font-black mb-4 leading-tight px-4" style={{ color: COLORS.PRIMARY_BLUE }}>
                        {proposition.title}
                    </h1>

                    <p className="text-lg text-slate-700 leading-relaxed px-4 font-medium">
                        {proposition.description}
                    </p>
                </div>
            </div>

            {/* Vote buttons - BOTTOM (like TikTok comments) */}
            {!hasVoted && (
                <div className="absolute bottom-24 left-0 right-0 p-6 bg-gradient-to-t from-black/20 to-transparent">
                    <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                        <button
                            onClick={() => onVote('no')}
                            className="h-16 rounded-2xl bg-red-500 text-white shadow-lg hover:scale-105 active:scale-95 transition transform font-bold text-lg"
                        >
                            ❌ NO
                        </button>
                        <button
                            onClick={() => onVote('yes')}
                            className="h-16 rounded-2xl bg-green-500 text-white shadow-lg hover:scale-105 active:scale-95 transition transform font-bold text-lg"
                        >
                            ✅ YES
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
