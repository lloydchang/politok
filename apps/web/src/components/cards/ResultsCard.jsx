import React from 'react';
import { COLORS, generateViralShareText } from '@polytawk/shared';

export default function ResultsCard({ resultStats, identityLabel, percentileData, votes, onReset }) {
    if (!resultStats || !identityLabel) return null;

    const handleTikTokShare = () => {
        // TikTok Content Posting API
        // Generate share text
        const shareText = generateViralShareText(votes, resultStats, percentileData, identityLabel);

        // Encode the text for URL
        const encodedText = encodeURIComponent(shareText);
        const appUrl = encodeURIComponent(window.location.href);

        // Open TikTok with Content Posting API
        // Format: https://www.tiktok.com/share?text=YOUR_TEXT&url=YOUR_URL
        const tiktokUrl = `https://www.tiktok.com/share?text=${encodedText}&url=${appUrl}`;
        window.open(tiktokUrl, '_blank');
    };

    const handleNativeShare = () => {
        const shareText = generateViralShareText(votes, resultStats, percentileData, identityLabel);

        if (navigator.share) {
            navigator.share({
                text: shareText
            }).catch((error) => {
                console.log('Error sharing:', error);
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText);
            alert('Share text copied to clipboard!');
        }
    };

    return (
        <div
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            style={{
                background: `linear-gradient(135deg, ${identityLabel.color}20 0%, ${COLORS.BG_LIGHT_BLUE} 100%)`,
            }}
        >
            {/* Animated background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full"
                    style={{
                        background: `radial-gradient(circle at 50% 50%, ${identityLabel.color}, transparent 70%)`
                    }}
                />
            </div>

            {/* Main content */}
            <div className="relative z-10 px-6 max-w-2xl mx-auto text-center">
                {/* Identity reveal */}
                <div className="mb-8 animate-fade-in">
                    <div className="text-8xl mb-4 animate-bounce">{identityLabel.emoji}</div>
                    <h1 className="text-4xl md:text-5xl font-black mb-2 leading-tight" style={{ color: identityLabel.color }}>
                        {identityLabel.label}
                    </h1>
                    <p className="text-lg text-slate-600 italic">
                        "{identityLabel.description}"
                    </p>
                </div>

                {/* Score bars */}
                {/* Score bars */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl mb-6 flex flex-col gap-4">
                    {resultStats.oligarchy > resultStats.equity ? (
                        <>
                            {/* Oligarchy First */}
                            <div>
                                <div className="flex justify-between items-end mb-1">
                                    <span className="text-xl font-bold text-slate-700">Oligarchy</span>
                                    <span className="text-3xl font-black text-red-600">{resultStats.oligarchy}%</span>
                                </div>
                                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                                    <div className="h-full bg-red-600 transition-all duration-1000 ease-out" style={{ width: `${resultStats.oligarchy}%` }} />
                                </div>
                            </div>
                            {/* Equity Second */}
                            <div>
                                <div className="flex justify-between items-end mb-1">
                                    <span className="text-xl font-bold text-slate-700">Equity</span>
                                    <span className="text-3xl font-black" style={{ color: COLORS.PRIMARY_BLUE }}>{resultStats.equity}%</span>
                                </div>
                                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                                    <div className="h-full transition-all duration-1000 ease-out" style={{ width: `${resultStats.equity}%`, backgroundColor: COLORS.PRIMARY_BLUE }} />
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Equity First */}
                            <div>
                                <div className="flex justify-between items-end mb-1">
                                    <span className="text-xl font-bold text-slate-700">Equity</span>
                                    <span className="text-3xl font-black" style={{ color: COLORS.PRIMARY_BLUE }}>{resultStats.equity}%</span>
                                </div>
                                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                                    <div className="h-full transition-all duration-1000 ease-out" style={{ width: `${resultStats.equity}%`, backgroundColor: COLORS.PRIMARY_BLUE }} />
                                </div>
                            </div>
                            {/* Oligarchy Second */}
                            <div>
                                <div className="flex justify-between items-end mb-1">
                                    <span className="text-xl font-bold text-slate-700">Oligarchy</span>
                                    <span className="text-3xl font-black text-red-600">{resultStats.oligarchy}%</span>
                                </div>
                                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                                    <div className="h-full bg-red-600 transition-all duration-1000 ease-out" style={{ width: `${resultStats.oligarchy}%` }} />
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Percentile */}
                {percentileData && (
                    <div className="bg-yellow-400 text-slate-900 rounded-xl p-4 font-bold text-lg mb-6">
                        {percentileData.message}
                    </div>
                )}

            </div>

            {/* TikTok DUET THIS button */}
            <div className="absolute right-0 top-1/4 -translate-y-1/2 z-20">
                <button
                    onClick={handleTikTokShare}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-black text-white border-2 border-white shadow-2xl hover:scale-110 active:scale-95 transition transform flex flex-col items-center justify-center"
                >
                    <div className="text-3xl mb-1">🎵</div>
                    <div className="text-[10px] font-black uppercase tracking-wider">DUET THIS</div>
                </button>
            </div>

            {/* Native Share button */}
            <div className="absolute right-0 top-2/4 -translate-y-1/2 z-20">
                <button
                    onClick={handleNativeShare}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-blue-600 text-white border-2 border-white shadow-2xl hover:scale-110 active:scale-95 transition transform flex flex-col items-center justify-center"
                >
                    <div className="text-3xl mb-1">📤</div>
                    <div className="text-[10px] font-black uppercase tracking-wider">SHARE</div>
                </button>
            </div>

            {/* Results badge */}



        </div>
    );
}
