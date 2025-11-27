'use client';
import React, { useState, useEffect, useRef } from 'react';

export default function LiveStudio({ onClose, onStartStream }) {
    const [isPracticeMode, setIsPracticeMode] = useState(false);
    const [title, setTitle] = useState('');
    const [isLive, setIsLive] = useState(false);
    const [streamDuration, setStreamDuration] = useState(0);
    const [viewers, setViewers] = useState(0);
    const [likes, setLikes] = useState(0);
    const videoRef = useRef(null);

    // Simulate stream stats
    useEffect(() => {
        let interval;
        if (isLive) {
            interval = setInterval(() => {
                setStreamDuration(prev => prev + 1);
                setViewers(prev => Math.min(prev + Math.floor(Math.random() * 50), 15000));
                setLikes(prev => prev + Math.floor(Math.random() * 100));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isLive]);

    // Format duration
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (isLive) {
        return (
            <div className="fixed inset-0 bg-black z-50 flex flex-col">
                {/* Stream View */}
                <div className="relative flex-1 bg-gradient-to-b from-slate-800 to-black overflow-hidden">
                    {/* Camera Preview (Fake) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white/20 text-9xl">📷</div>
                    </div>

                    {/* Overlay UI */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                        <div className="flex gap-2">
                            <div className="bg-black/50 backdrop-blur px-3 py-1 rounded-full flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                <span className="text-white font-bold text-sm">
                                    {isPracticeMode ? 'PRACTICE' : 'LIVE'}
                                </span>
                            </div>
                            <div className="bg-black/50 backdrop-blur px-3 py-1 rounded-full text-white font-mono text-sm">
                                {formatTime(streamDuration)}
                            </div>
                        </div>
                        <button
                            onClick={() => setIsLive(false)}
                            className="bg-gray-800/80 p-2 rounded-full text-white"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="absolute top-16 left-4 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-white drop-shadow-md">
                            <span>👁️</span>
                            <span className="font-bold">{viewers.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white drop-shadow-md">
                            <span>❤️</span>
                            <span className="font-bold">{likes.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Chat Area (Empty for now/Simulated) */}
                    <div className="absolute bottom-24 left-4 w-64 h-48 pointer-events-none mask-image-linear-to-t">
                        <div className="flex flex-col justify-end h-full gap-2 opacity-50">
                            <div className="text-white/50 text-xs italic">Chat connecting...</div>
                        </div>
                    </div>
                </div>

                {/* Bottom Controls */}
                <div className="h-20 bg-black border-t border-white/10 flex items-center justify-between px-6">
                    <div className="flex gap-4">
                        <button className="text-white flex flex-col items-center gap-1">
                            <span className="text-xl">🎤</span>
                            <span className="text-[10px]">Mute</span>
                        </button>
                        <button className="text-white flex flex-col items-center gap-1">
                            <span className="text-xl">📷</span>
                            <span className="text-[10px]">Flip</span>
                        </button>
                    </div>
                    <button
                        onClick={() => {
                            setIsLive(false);
                            onClose();
                        }}
                        className="bg-red-500 text-white px-6 py-2 rounded-full font-bold"
                    >
                        End Stream
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col animate-slide-up">
            {/* Header */}
            <div className="h-14 flex items-center justify-between px-4 border-b border-white/10">
                <div className="w-8" />
                <h2 className="text-white font-bold">LIVE Studio</h2>
                <button onClick={onClose} className="text-white text-xl">✕</button>
            </div>

            {/* Preview Area */}
            <div className="flex-1 bg-black relative m-4 rounded-2xl overflow-hidden border border-white/10">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-blue-900/20">
                    <div className="text-white/30 text-6xl">📷</div>
                </div>

                {/* Title Input */}
                <div className="absolute top-4 left-4 right-4">
                    <input
                        type="text"
                        placeholder="Add a title to chat..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-black/50 backdrop-blur text-white placeholder-white/50 px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-cyan-400 outline-none"
                    />
                </div>

                {/* Practice Mode Banner */}
                {isPracticeMode && (
                    <div className="absolute bottom-4 left-4 right-4 bg-yellow-500/90 backdrop-blur text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                        <span>🚧</span>
                        Practice Mode: Viewers won't see you
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="bg-black p-6 pb-10 rounded-t-3xl border-t border-white/10">
                <div className="flex justify-between items-center mb-6">
                    <div className="text-white font-bold">Settings</div>
                    <div className="flex items-center gap-3">
                        <span className="text-white/70 text-sm">Practice Mode</span>
                        <button
                            onClick={() => setIsPracticeMode(!isPracticeMode)}
                            className={`w-12 h-7 rounded-full transition-colors relative ${isPracticeMode ? 'bg-green-500' : 'bg-gray-600'}`}
                        >
                            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${isPracticeMode ? 'left-6' : 'left-1'}`} />
                        </button>
                    </div>
                </div>

                <button
                    onClick={() => setIsLive(true)}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold text-lg py-4 rounded-full shadow-lg shadow-red-500/20 transition-all active:scale-95"
                >
                    {isPracticeMode ? 'Start Practice' : 'Go LIVE'}
                </button>

                <p className="text-white/40 text-xs text-center mt-4">
                    {isPracticeMode
                        ? "You can test your lighting and audio before going public."
                        : "Your followers will be notified that you're live."}
                </p>
            </div>
        </div>
    );
}
