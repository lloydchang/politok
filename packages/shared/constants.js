import { PROPOSITIONS } from './index.js';

export const POLICIES = [
    {
        id: 'rent',
        icon: '🏘️',
        title: 'UNLIMITED RENT HIKES'
    },
    {
        id: 'transit',
        icon: '🚁',
        title: 'FLYING THRU TRAFFIC'
    },
    {
        id: 'childcare',
        icon: '🍼',
        title: 'NANNIES FOR US'
    },
    {
        id: 'medicare',
        icon: '🏥',
        title: 'MEDICARE FOR NONE'
    }
];



export const STAT_GRADIENTS = [
    { web: 'from-purple-500 to-pink-500', mobile: ['#a855f7', '#ec4899'] },
    { web: 'from-blue-500 to-cyan-500', mobile: ['#3b82f6', '#06b6d4'] },
    { web: 'from-green-500 to-emerald-500', mobile: ['#22c55e', '#10b981'] },
    { web: 'from-orange-500 to-red-500', mobile: ['#f97316', '#ef4444'] },
    { web: 'from-indigo-500 to-purple-500', mobile: ['#6366f1', '#a855f7'] }
];

export const FEED_ITEMS = [
    {
        type: 'prop',
        data: PROPOSITIONS[0],
        stat: {
            emoji: '🏠 💵',
            title: 'Landlord Profits',
            description: 'Rent up 41% in 5 years! 🚀 Property values soaring.'
        }
    },
    {
        type: 'prop',
        data: PROPOSITIONS[1],
        stat: {
            emoji: '🚗 ⏳',
            title: 'Car Dependency',
            description: 'Parents spend 5+ hours weekly shuttling kids. More gas sales!'
        }
    },
    {
        type: 'prop',
        data: PROPOSITIONS[2],
        stat: {
            emoji: '👶 💰',
            title: 'Childcare Costs',
            description: '$1,230/mo average childcare. Get back to work!'
        }
    },
    {
        type: 'prop',
        data: PROPOSITIONS[3],
        stat: {
            emoji: '💸 📈',
            title: 'Insurance Profits',
            description: 'Premiums doubled in 2026! Bonuses secured.'
        }
    },
    { type: 'results', id: 'results_card' }, // Show results after all votes
    { type: 'dashboard', id: 'dashboard_card' }, // Dashboard as final page
    { type: 'profile', id: 'profile_card' }, // Profile page
];
