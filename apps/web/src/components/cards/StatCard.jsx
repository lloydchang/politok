import React from 'react';
import { COLORS } from '@politok/shared';

export default function StatCard({ stat }) {
    const getGradient = () => {
        const gradients = [
            'from-purple-500 to-pink-500',
            'from-blue-500 to-cyan-500',
            'from-green-500 to-emerald-500',
            'from-orange-500 to-red-500',
            'from-indigo-500 to-purple-500',
        ];
        return gradients[Math.floor(Math.random() * gradients.length)];
    };

    return (
        <div
            className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br ${getGradient()}`}
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

                <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight drop-shadow-2xl">
                    {stat.title}
                </h2>

                {stat.value && (
                    <div className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-2xl animate-pulse">
                        {stat.value}
                    </div>
                )}

                <p className="text-xl md:text-2xl text-white/90 font-bold leading-relaxed drop-shadow-lg">
                    {stat.description}
                </p>
            </div>

            {/* Badge */}
            <div className="absolute top-8 left-8 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-bold">
                {stat.badge || 'Did you know?'}
            </div>
        </div>
    );
}
