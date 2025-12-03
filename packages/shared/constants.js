import { PROPOSITIONS } from './index.js';

export const POLICIES = [
    {
        id: 'rent',
        iconWeb: '🏘️',
        iconMobile: '🏘️',
        title: 'FREEZE THE RENT'
    },
    {
        id: 'transit',
        iconWeb: '🚌',
        iconMobile: '🚌',
        title: 'FAST AND FREE BUSES'
    },
    {
        id: 'childcare',
        iconWeb: '🍼',
        iconMobile: '🍼',
        title: 'CHILDCARE FOR ALL'
    },
    {
        id: 'medicare',
        iconWeb: '🏥',
        iconMobile: '🏥',
        title: 'MEDICARE FOR ALL'
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
            title: 'Housing Crisis',
            description: 'Rent prices have increased 41% in the last 5 years'
        }
    },
    {
        type: 'prop',
        data: PROPOSITIONS[1],
        stat: {
            emoji: '🚗 ⏳',
            title: 'Traffic Burden',
            description: 'Half of parents spend 5+ hours weekly shuttling kids'
        }
    },
    {
        type: 'prop',
        data: PROPOSITIONS[2],
        stat: {
            emoji: '👶 💰',
            title: 'Childcare Costs',
            description: 'Average cost is $1,230/mo in the US'
        }
    },
    {
        type: 'prop',
        data: PROPOSITIONS[3],
        stat: {
            emoji: '💸 📈',
            title: 'Premiums Shock',
            description: 'Insurance premiums doubled in 2026'
        }
    },
    { type: 'results', id: 'results_card' }, // Show results after all votes
    { type: 'dashboard', id: 'dashboard_card' }, // Dashboard as final page
    { type: 'profile', id: 'profile_card' }, // Profile page
];
