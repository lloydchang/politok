# PostHog Analytics Setup

Politok uses PostHog for product analytics across both Web and Mobile platforms.

## Prerequisites

- A PostHog account (Cloud or Self-hosted)
- Your PostHog Project API Key
- Your PostHog Host URL

## Environment Variables

Add the following to your `.env.local` (Web) or `.env` (Mobile):

```bash
# Required
NEXT_PUBLIC_POSTHOG_KEY=your_project_api_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com  # or your self-hosted URL

# Mobile (Expo)
EXPO_PUBLIC_POSTHOG_KEY=your_project_api_key_here
EXPO_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

## Web Implementation

**File:** `apps/web/src/lib/posthog.js`

The web app uses `posthog-js` for client-side analytics.

```javascript
import posthog from 'posthog-js'

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
})
```

## Mobile Implementation

**File:** `apps/mobile/src/lib/analytics.js`

The mobile app uses `posthog-react-native` for native analytics.

Features:
- Auto-capture screen views
- Custom event tracking via `useAnalytics()` hook
- User property management

## Tracked Events

See `ANALYTICS.md` for a complete list of tracked events.

Key events include:
- `simulation_started` - User begins voting
- `proposition_vote` - User votes on a proposition
- `simulation_completed` - User completes the quiz
- `viral_share_clicked` - User shares results

## Verification

1. Run the app (Web or Mobile)
2. Perform some actions (vote, navigate, share)
3. Check your PostHog dashboard under "Events" to see incoming data
4. Verify user properties are being set correctly

## Privacy Considerations

- PostHog is configured with **anonymous tracking** by default
- No PII (Personally Identifiable Information) is collected
- User fingerprinting is used for unauthenticated session tracking
- Comply with GDPR/CCPA by providing opt-out mechanisms if needed
