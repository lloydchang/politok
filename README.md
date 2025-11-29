# politok

An interactive ballot simulation exploring how policy decisions impact equity and oligarchy in society. Vote on three key politok propositions and see the societal outcomes.

## Features

### Core Experience
- **Interactive Voting**: Vote yes/no on three propositions or skip them
- **Real-time Results**: See immediate impact on Equity and Oligarchy percentages
- **Identity Labels**: Get labeled based on your voting pattern (e.g., "Reform Supporter", "Policy Skeptic")
- **Percentile Ranking**: See how you compare to other users

### TikTok Content Engine (Phase 1)
- **Auto-Generated Scripts**: Get 3 ready-to-use TikTok scripts (Hook, Hot Take, Challenge)
- **Shareable Cards**: Download 4 card types optimized for TikTok/Instagram (9:16 format)
  - Score Card, Hot Take Card, Comparison Card, Challenge Card
- **Copy-Paste Captions**: One-click copy complete captions with trending hashtags
- **Voter Registration**: Direct link to register to vote via Vote.org

### Gamification (Phase 2)
- **Weekly Leaderboard**: See top creators and claim your spot with your TikTok handle
- **Trending Feed**: View most copied scripts and viral content
- **Share Tracking**: Local tracking of your shares and engagement

### Conversion Path (Phase 3)
- **Daily Challenge**: New themed prompts each day of the week
- **Ballot Finder**: Search your local ballot by zip code
- **Organization Recommendations**: Get matched with advocacy orgs based on your score

### Analytics
- **Comprehensive Tracking**: 24+ tracked events via PostHog
- **User Journey**: Complete funnel from landing to action
- **Content Performance**: Track which scripts/cards perform best

## Dynamic Outcomes
10 different outcomes based on voting patterns:
  - `equity advances`, `equity gains`, `equity improves`
  - `equity stagnants`, `equity dwindles`
  - `oligarchy entrenches`, `oligarchy seizes`, `oligarchy overpowers`
  - `oligarchy reigns`, `oligarchy dominates`

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
Voters decide on three politok measures:
1. 🏘️ **FREEZE THE RENT**
Shall we implement a freeze on rent increases for all residential units?
2. 🚌 **FAST & FREE BUSES**
Shall we make buses faster and eliminate all fares?
3. 🍼 **CHILDCARE FOR ALL** - Shall we offer free, publicly-funded child care for all families?

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
