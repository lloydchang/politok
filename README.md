# politok

An interactive ballot simulation exploring how policy decisions impact equity and oligarchy in society. Vote on four key politok propositions and see the societal outcomes.

## Features

### TikTok-Style Feed Experience
- **Swipeable Feed**: Vertical scrolling feed with auto-advance (4s for voting, 6s for results)
- **Live Content**: Dashboard (travel mode + local policies), Statistics (Did You Know facts), Propositions (voting cards), Results (identity reveal)
- **Profile Page**: 3-column grid of all content thumbnails with live previews
- **Progress Dots**: Bottom navigation for quick jumping between cards
- **Keyboard/Touch Navigation**: Arrow keys (web) or swipe gestures (mobile)

### Core Voting Experience
- **Interactive Voting**: Vote yes/no on four key policy propositions
- **Real-time Results**: See immediate impact on Equity and Oligarchy percentages
- **Identity Labels**: Get labeled based on your voting pattern (e.g., "Reform Supporter", "Swing Voter", "Policy Skeptic")
- **Percentile Ranking**: See how you compare to other users
- **Smart Sharing**: Share button calculates and shares your results even before viewing the results page

### Dashboard Features
- **Travel Mode**: Auto-rotate through random US cities every 15 seconds
- **Local Policies**: Real-time display of city-specific policies (rent control, transit, childcare, medicare)
- **Policy Data**: 200+ cities with customized policy statuses
- **Background Images**: AI-generated location imagery for visual context

### Platform Parity
- **Unified Codebase**: Shared logic, hooks, and constants between web and mobile
- **Consistent UI**: Matching layouts, fonts, colors, and spacing across platforms
- **Live Previews**: Profile grid shows actual rendered components at scale
- **Responsive Design**: Adapts seamlessly to different screen sizes

## Structure

This is a monorepo containing:

- `apps/web/` - Next.js web app (React + Tailwind CSS)
- `apps/mobile/` - React Native mobile app (Expo)
- `packages/shared/` - Shared simulation logic, propositions, hooks, constants, and utilities

### Shared Package Architecture

The `packages/shared/` workspace provides:
- **Core Logic**: `processVote()`, `getPercentileRanking()`, `getIdentityLabel()`
- **Data**: `PROPOSITIONS`, `POLICIES`, `FEED_ITEMS`, `CHAT_DATA`, `STAT_GRADIENTS`
- **Hooks**: `useFeed()`, `useChat()`, `usePropCard()`, `useStatCard()`, `useResultsCard()`
- **Analytics**: Centralized analytics utilities for both platforms
- **Policy Data**: Complete state and city policy datasets

This architecture ensures a single source of truth for all business logic and data.

## Getting Started

### Prerequisites
- Node.js 18+
- npm (workspaces enabled)

### Install Dependencies
```bash
npm install
```

### Run Web App
```bash
npm run dev --workspace=apps/web
```
Visit http://localhost:3000

### Run Mobile App
```bash
npm run start --workspace=apps/mobile
```

Scan the QR code with Expo Go app (iOS/Android)

### Build Web App
```bash
npm run build --workspace=apps/web
```

## How It Works

### Propositions
Voters decide on four policy measures:
1. 🏘️ **FREEZE THE RENT** - Implement a freeze on rent increases for all residential units
2. 🚌 **FAST & FREE BUSES** - Make buses faster and eliminate all fares
3. 🍼 **CHILDCARE FOR ALL** - Offer free, publicly-funded child care for all families
4. 🏥 **MEDICARE FOR ALL** - Expand Medicare to cover all Americans

### Scoring System
- Each vote affects two stats: **Equity** and **Oligarchy**
- Scores are normalized to sum to 100% (range: 1-99%)
- Voting "Yes" increases Equity, decreases Oligarchy
- Voting "No" decreases Equity, increases Oligarchy
- Skipping votes also decreases Equity, increases Oligarchy

### Outcomes
Outcomes are determined by:
1. **Voting patterns** (all yes, all no, mixed)
2. **Final score percentages** (gradient scale from 96-99% oligarchy)

## Deployment

### Web (Vercel)
1. Push to GitHub
2. Connect repository to Vercel
3. Configuration is already set in `vercel.json`

### Mobile (Expo)
```bash
cd apps/mobile
npx expo login
npx eas build --platform all
```

## Customization

### Adding/Modifying Propositions
Edit `packages/shared/index.js` → `PROPOSITIONS` array

### Updating Feed Content
Edit `packages/shared/constants.js` → `FEED_ITEMS`, `POLICIES`, `CHAT_DATA`

### Changing Colors
Edit `packages/shared/index.js` → `COLORS` object

### Adjusting Score Calculation
Edit `packages/shared/index.js` → `processVote()` function

### Modifying Component Logic
Shared hooks in `packages/shared/hooks.js`:
- `useFeed()` - Feed state management
- `useChat()` - Chat message rotation
- `usePropCard()` - Voting state
- `useStatCard()` - Gradient selection
- `useResultsCard()` - Results sorting

## Tech Stack

- **Frontend**: React 18
- **Web**: Next.js 16 + Tailwind CSS
- **Mobile**: Expo / React Native
- **Styling**: Tailwind CSS (web), React Native StyleSheet (mobile)
- **Monorepo**: npm workspaces
- **Shared Logic**: React hooks and utilities
- **Analytics**: PostHog + Honeycomb
- **Deployment**: Vercel (web), Expo/EAS (mobile)

## License

Proprietary
