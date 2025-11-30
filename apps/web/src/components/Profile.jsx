import React, { useState } from 'react';
import { COLORS } from '@politok/shared';
import Dashboard from './Dashboard';

export default function Profile({ onNavigate }) {
    const [activeTab, setActiveTab] = useState('videos');

    const displayName = 'poliTok';
    const username = '@politok_vercel_app';
    const websiteUrl = 'politok.vercel.app';

    // Stats for politok_vercel_app profile (brand new account)
    const stats = {
        following: '0',
        followers: '0',
        likes: '0'
    };

    // Content navigation items
    const contentItems = [
        { id: 'dashboard', title: '📊 Dashboard', type: 'dashboard', targetIndex: 5 }
    ];

    return (
        <div className="w-full h-full bg-black text-white overflow-auto">
            {/* Profile Header */}
            <div className="px-4 pt-4 pb-2 text-center">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center mx-auto">
                    <img 
                        src="/logo.png" 
                        alt="poliTok logo" 
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Username/Title */}
                <div className="flex items-center justify-center gap-1 mb-3">
                    <h1 className="font-bold text-xl">{displayName}</h1>
                    <span className="text-blue-500 text-lg">☑️</span>
                </div>

                {/* Username handle */}
                <div className="text-gray-400 text-sm mb-3">
                    {username}
                </div>

                {/* Action Buttons Row */}
                <div className="flex items-center justify-center gap-2 mb-4 px-2">
                    <button className="bg-red-500 text-white font-bold px-8 py-2 rounded-md hover:bg-red-600 flex-1 max-w-[120px]">
                        Follow
                    </button>
                    <button className="border border-gray-700 w-10 h-10 rounded-md flex items-center justify-center hover:bg-gray-900">
                        ⌲
                    </button>
                    <button className="border border-gray-700 w-10 h-10 rounded-md flex items-center justify-center hover:bg-gray-900">
                        +👤
                    </button>
                    <button className="border border-gray-700 w-10 h-10 rounded-md flex items-center justify-center hover:bg-gray-900">
                        ↪
                    </button>
                </div>

                {/* Stats Row */}
                <div className="flex justify-center gap-8 mb-3 border-b border-gray-800 pb-3">
                    <div className="text-center">
                        <div className="font-bold text-lg">{stats.following}</div>
                        <div className="text-gray-500 text-xs">Following</div>
                    </div>
                    <div className="text-center">
                        <div className="font-bold text-lg">{stats.followers}</div>
                        <div className="text-gray-500 text-xs">Followers</div>
                    </div>
                    <div className="text-center">
                        <div className="font-bold text-lg">{stats.likes}</div>
                        <div className="text-gray-500 text-xs">Likes</div>
                    </div>
                </div>

                {/* Bio */}
                <div className="text-center px-4">
                    <p className="text-sm mb-1 leading-relaxed">
                        Discover U.S. locations 🛰️
                    </p>
                    <a href={`https://${websiteUrl}`} className="text-sm font-semibold text-blue-400 flex items-center justify-center gap-1 hover:underline">
                        🔗 {websiteUrl}
                    </a>
                </div>
            </div>

            {/* Content Tabs */}
            <div className="border-b border-gray-800">
                <div className="flex">
                    <button
                        onClick={() => setActiveTab('videos')}
                        className={`flex-1 py-3 font-semibold border-b-2 flex justify-center items-center gap-2 ${activeTab === 'videos'
                            ? 'border-white text-white'
                            : 'border-transparent text-gray-600'
                            }`}
                    >
                        <span className="text-lg">〢</span>
                    </button>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-3 gap-1 p-1">
                {contentItems.map((item, index) => {
                    return (
                        <div
                            key={item.id}
                            role="button"
                            tabIndex={0}
                            onClick={() => onNavigate && onNavigate(item.targetIndex)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    onNavigate && onNavigate(item.targetIndex);
                                }
                            }}
                            className="aspect-square bg-black rounded-sm relative overflow-hidden group cursor-pointer"
                        >
                            {/* Live Dashboard Preview */}
                            <div className="absolute inset-0 w-[300%] h-[300%] origin-top-left transform scale-[0.333] pointer-events-none">
                                <Dashboard />
                            </div>

                            {/* View count overlay */}
                            <div className="absolute bottom-1 left-2 flex items-center gap-1 text-[10px] text-white font-semibold drop-shadow-md z-10">
                                <span>▶</span>
                                <span>0</span>
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}
