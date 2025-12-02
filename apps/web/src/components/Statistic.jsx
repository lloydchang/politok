import React from 'react';
import { useStatCard } from '@politok/shared/hooks';
import { COLORS } from '@politok/shared';

export default function Statistic({ stat }) {
    const gradient = useStatCard();

    return (
        <div
            className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black"
        >
            {/* Pattern overlay removed for cleaner look matching mobile */}

            {/* Main content */}
            <div className="relative z-10 px-8 md:px-16 max-w-3xl mx-auto text-center">
                {stat.emoji && (
                    <div className="text-6xl mb-6 animate-bounce">{stat.emoji}</div>
                )}

                <h2 className="text-4xl font-black mb-4 leading-tight" style={{ color: COLORS.TEXT_RED_LIGHT }}>
                    {stat.title}
                </h2>

                <div className="text-6xl font-black mb-4 text-white tracking-tight">
                    {stat.value}
                </div>

                <p className="text-lg font-medium leading-relaxed max-w-xs mx-auto" style={{ color: COLORS.TEXT_LIGHT_WHITE }}>
                    {stat.description}
                </p>
            </div>
        </div>
    );
}
