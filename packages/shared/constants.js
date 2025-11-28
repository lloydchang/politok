import { PROPOSITIONS } from './index.js';

export const POLICIES = [
    {
        id: 'rent',
        iconWeb: '🏘️',
        iconMobile: 'home-city',
        title: 'FREEZE THE RENT'
    },
    {
        id: 'transit',
        iconWeb: '🚌',
        iconMobile: 'bus',
        title: 'FAST AND FREE BUSES'
    },
    {
        id: 'childcare',
        iconWeb: '🍼',
        iconMobile: 'baby-bottle',
        title: 'CHILDCARE FOR ALL'
    }
];

export const CHAT_DATA = {
    USERS: [
        'user123', 'policy_wonk', 'yimby_queen', 'gen_z_voter', 'eco_warrior',
        'housing_now', 'rent_too_high', 'vote_blue', 'vote_red', 'centrist_dad',
        'cat_lover_99', 'student_debt_sucks', 'ok_boomer', 'skibidi_policy',
        'fanum_tax_collector', 'no_cap_fr', 'based_god', 'sigma_grindset'
    ],
    COLORS: [
        'text-yellow-400', 'text-cyan-400', 'text-pink-400', 'text-green-400',
        'text-purple-400', 'text-orange-400', 'text-blue-400', 'text-red-400'
    ],
    MOBILE_COLORS: [
        '#facc15', '#22d3ee', '#f472b6', '#4ade80', '#c084fc', '#fb923c', '#60a5fa', '#f87171'
    ],
    MESSAGES: [
        // SUPPORT (YES)
        'yes yes yes', 'need this rn', 'w policy', 'based', 'fr someone said it',
        'vote yes!!', 'save me sm money', 'common w', 'slay',
        'protect tenants!', 'public transit ftw', 'equity king/queen 👑',

        // OPPOSE (NO)
        'vote no', 'l take', 'ruin economy', 'who pays 4 this??',
        'commie propaganda', 'taxes too high alr', 'common l', 'cringe',
        'nimby gang', 'econ 101??', 'govt out',

        // SKIP / APATHY
        'mid', 'skip', 'next', 'boring', 'i sleep 😴', 'do smth fun',
        'why on my fyp?', 'idk bout this', 'too complex',

        // DISRUPTIVE / TROLLS
        'MODS BAN HIM', 'fake news', 'propaganda', 'dead chat', 'fell off',
        'ratio', 'l + ratio', 'cry abt it', 'skill issue', 'bot',

        // NONSENSE / TANGENTS / BRAINROT
        'skibidi', 'any1 play fn?', 'i like turtles',
        'grimace shake', 'fanum tax', 'blud waffling',
        'ohio vibes', 'mewing check 🤫', 'chat is this real?',
        'can i get a hoya?', 'type 1 if u love pizza',

        // GIFTING / META
        'sent a rose 🌹', 'sent galaxy 🌌', 'sent lion 🦁', 'gifted 100 coins 💰',
        'dueting rn', 'boosting', 'tap screen!!'
    ]
};

export const FEED_ITEMS = [
    {
        type: 'stat',
        data: {
            emoji: '🏠 💸',
            title: 'Housing Crisis',
            description: 'Rent prices have increased 30% in the last 5 years',
            badge: 'Did you know?'
        }
    },
    { type: 'prop', data: PROPOSITIONS[0] }, // Rent freeze
    {
        type: 'stat',
        data: {
            emoji: '🚍 🚏',
            title: 'Transit Facts',
            description: 'Free public transit exists in 100+ cities worldwide',
            badge: 'Did you know?'
        }
    },
    { type: 'prop', data: PROPOSITIONS[1] }, // Free buses
    {
        type: 'stat',
        data: {
            emoji: '👶 💰',
            title: 'Childcare Costs',
            description: 'Average cost is $1,200/mo in the US',
            badge: 'Did you know?'
        }
    },
    { type: 'prop', data: PROPOSITIONS[2] }, // Childcare
    { type: 'results' }, // Show results after all votes
    { type: 'dashboard' }, // Dashboard as final page
];
