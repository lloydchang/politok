import React from 'react';
import { useStatCard } from '@politok/shared/hooks';
import { COLORS } from '@politok/shared';

export default function Statistic({ stat }) {
    const gradient = useStatCard();

    return (
        <div
            className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br ${gradient.web}`}
        >
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
                    backgroundSize: '50px 50px'
                }}
            />

            {/* Main content */}
            <div className="relative z-10 px-8 md:px-16 max-w-3xl mx-auto text-center">
                {stat.emoji && (
                    <div className="text-6xl mb-6 animate-bounce">{stat.emoji}</div>
                )}

                <h2 className="text-4xl font-black mb-4 leading-tight" style={{ color: COLORS.TEXT_BLUE_LIGHT }}>
                    {stat.title}
                </h2>

                <div className="text-6xl font-black mb-4 text-white tracking-tight">
                    {stat.value}
                </div>

                <p className="text-lg font-medium leading-relaxed max-w-xs mx-auto" style={{ color: COLORS.TEXT_LIGHT_GRAY }}>
                    {stat.description}
                </p>
            </div>
        </div>
    );
}
