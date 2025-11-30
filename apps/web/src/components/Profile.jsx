import React, { useState } from 'react';
import { COLORS } from '@politok/shared';

export default function Profile({ location = 'Mesa, Arizona', onNavigate }) {
    const [activeTab, setActiveTab] = useState('videos');

    // Parse location
    const [cityName, stateName] = location.split(', ');
    const username = `@${cityName.replace(/\s+/g, '_')}_${stateName.replace(/\s+/g, '_')}`;

    // Mock stats - these would be real data in production
    const stats = {
        following: '2.4M', // People who actually voted
        followers: '161M', // People registered to vote
        likes: '258M'      // People who are residents
    };

    // Content navigation items
    const contentItems = [
        { id: 'dashboard', title: '🏙️ City Dashboard', type: 'dashboard', targetIndex: 5 },
        { id: 'results', title: '✨ Your Results', type: 'results', targetIndex: 4 },
        { id: 'prop4', title: '🏥 MEDICARE FOR ALL', type: 'prop', targetIndex: 3 },
        { id: 'stat4', title: '🏥 Healthcare Costs', type: 'stat', targetIndex: 3 },
        { id: 'prop3', title: '🍼 FREE CHILDCARE', type: 'prop', targetIndex: 2 },
        { id: 'stat3', title: '🍼 Childcare Costs', type: 'stat', targetIndex: 2 },
        { id: 'prop2', title: '🚌 FREE BUSES', type: 'prop', targetIndex: 1 },
        { id: 'stat2', title: '🚌 Transit Costs', type: 'stat', targetIndex: 1 },
        { id: 'prop1', title: '🏘️ RENT CONTROL', type: 'prop', targetIndex: 0 },
        { id: 'stat1', title: '🏘️ Housing Crisis', type: 'stat', targetIndex: 0 }
    ];

    return (
        <div className="w-full h-full bg-white overflow-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                    <button className="text-2xl">←</button>
                    <span className="font-bold text-lg">{username}</span>
                </div>
                <button className="text-2xl">⋮</button>
            </div>

            {/* Profile Header */}
            <div className="px-4 pt-6 pb-4">
                {/* Avatar */}
                <div className="flex items-start justify-between mb-4">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
                        {cityName.charAt(0)}
                    </div>
                    <button className="px-8 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600">
                        Follow
                    </button>
                </div>

                {/* Username and display name */}
                <div className="mb-3">
                    <h1 className="font-bold text-xl">{username}</h1>
                    <p className="text-gray-600">{location}</p>
                </div>

                {/* Stats */}
                <div className="flex gap-6 mb-4">
                    <div className="text-center">
                        <div className="font-bold text-lg">{stats.following}</div>
                        <div className="text-gray-500 text-sm">Following</div>
                    </div>
                    <div className="text-center">
                        <div className="font-bold text-lg">{stats.followers}</div>
                        <div className="text-gray-500 text-sm">Followers</div>
                    </div>
                    <div className="text-center">
                        <div className="font-bold text-lg">{stats.likes}</div>
                        <div className="text-gray-500 text-sm">Likes</div>
                    </div>
                </div>

                {/* Bio */}
                <div className="mb-4">
                    <p className="text-sm mb-2">
                        Your voice matters. See how {cityName} compares on housing, transit, childcare & healthcare.
                    </p>
                    <a href="https://politok.vercel.app" className="text-sm font-semibold flex items-center gap-1">
                        🔗 politok.vercel.app
                    </a>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 mb-6">
                    <button className="flex-1 py-2 border border-gray-300 rounded-md font-semibold text-sm hover:bg-gray-50">
                        Message
                    </button>
                    <button className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50">
                        👤
                    </button>
                    <button className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50">
                        ⬇️
                    </button>
                </div>
            </div>

            {/* Content Tabs */}
            <div className="border-b border-gray-200">
                <div className="flex">
                    <button
                        onClick={() => setActiveTab('videos')}
                        className={`flex-1 py-3 font-semibold border-b-2 ${activeTab === 'videos'
                            ? 'border-black'
                            : 'border-transparent text-gray-400'
                            }`}
                    >
                        📹
                    </button>
                    <button
                        onClick={() => setActiveTab('liked')}
                        className={`flex-1 py-3 font-semibold border-b-2 ${activeTab === 'liked'
                            ? 'border-black'
                            : 'border-transparent text-gray-400'
                            }`}
                    >
                        ❤️
                    </button>
                    <button
                        onClick={() => setActiveTab('favorites')}
                        className={`flex-1 py-3 font-semibold border-b-2 ${activeTab === 'favorites'
                            ? 'border-black'
                            : 'border-transparent text-gray-400'
                            }`}
                    >
                        🔖
                    </button>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-3 gap-1 p-1">
                {contentItems.map((item, index) => (
                    <button
                        key={item.id}
                        onClick={() => onNavigate && onNavigate(item.targetIndex)}
                        className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex flex-col items-center justify-center p-4 hover:opacity-80 transition"
                    >
                        <div className="text-2xl mb-2">{item.title.split(' ')[0]}</div>
                        <div className="text-xs font-bold text-center text-gray-700 leading-tight">
                            {item.title.split(' ').slice(1).join(' ')}
                        </div>
                    </button>
                ))}
            </div>

            {/* Pin indicator */}
            <div className="px-4 py-6 text-center text-gray-400 text-sm">
                📌 Pinned content appears here
            </div>
        </div>
    );
}
