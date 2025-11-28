# Observability & Analytics Setup Guide

This document explains the comprehensive observability and analytics instrumentation in the politok apps.

## Services Integrated

### 🍯 Honeycomb (Observability)
- **Purpose**: Distributed tracing and performance monitoring
- **Web**: Auto-instrumentation for network requests, page loads, and user interactions
- **Mobile**: Not used (OpenTelemetry Web SDK incompatible with React Native)
- **Custom Tracking**: All custom events sent via OpenTelemetry spans (web only)

### 📊 PostHog (Product Analytics)
- **Purpose**: User behavior tracking and product analytics
- **Custom Tracking**: All custom events sent via PostHog capture on both platforms

## Cross-Platform Architecture

### Shared Analytics Module (`packages/shared/analytics.js`)

Provides centralized utilities:
- `generateViralShareText()` - Creates shareable content based on voting results
- `IDENTITY_LABELS` - Identity label configurations
- Consistent data structures for both platforms

### Platform-Specific Implementation

**Web** (`apps/web/src/lib/telemetry.js`):
- **PostHog + Honeycomb**: Dual tracking for complete observability
- `trackEvent(name, properties)` - Sends to both services
- Auto-instrumentation via Honeycomb Web SDK

**Mobile** (`apps/mobile/src/lib/analytics.js`):
- **PostHog only**: React Hook-based analytics
- `useAnalytics()` provides: `trackEvent`, `trackPropositionVote`, `trackSimulationCompleted`
- No Honeycomb (compatibility limitations)

### Shared Hooks with Built-in Analytics

Components use shared React hooks that include tracking:
- **`useFeed()`** - Automatically tracks feed navigation, voting, and completion
- **`useChat()`** - Manages chat state
- **`usePropCard()`** - Tracks proposition voting
- Direct integration with platform analytics

## Events Tracked

### Main Page Events
- **`politok_title_clicked`** - User clicks app title
- **`vote_button_clicked`** - User clicks VOTE button
- **`simulation_started`** - Simulation begins

### Feed Navigation
- **`feed_auto_advance`** - Feed automatically advances to next card
  - Properties: `card_index`, `card_type`
- **`feed_dot_nav`** - User navigates via progress dots
  - Properties: `from`, `to`

### Simulation Page Events
- **`proposition_vote`** - User selects or changes vote on a proposition
  - Properties: `proposition_id`, `proposition_title`, `option_id`, `is_deselection`
- **`cast_vote_button_clicked`** - User clicks CAST VOTE button
  - Properties: `vote_count`, `skipped_count`
- **`review_ballot_clicked`** - User chooses to review incomplete ballot

### Results Page Events
- **`simulation_completed`** - Simulation finishes with full vote breakdown
  - **`votes`**: Object with proposition IDs and values (`yes`/`no`/`null`)
  - **`vote_details`**: Array of `{id, name, vote}` for each proposition
  - **`vote_count`**: Number of propositions voted on
  - **`skipped_count`**: Number of propositions skipped
  - **`outcome`**: Result text (e.g., "Reform Supporter")
  - **`equity_percent`**: Equity percentage
  - **`oligarchy_percent`**: Oligarchy percentage
  - **`identity_label`**: Assigned identity label
  - **`percentile_rank`**: User's percentile ranking
- **`share_button_clicked`** - User shares results
  - Properties: `share_content`, `outcome`, `equity_percent`, `oligarchy_percent`, `vote_count`
- **`start_over_clicked`** - User clicks START OVER

All events include:
- **`platform`**: `'web'` or `'mobile'`
- **`timestamp`**: ISO8601 timestamp

## Environment Variables

### Web App (`apps/web/.env`)
```bash
VITE_POSTHOG_KEY=your_posthog_project_api_key
VITE_POSTHOG_HOST=https://app.posthog.com
VITE_HONEYCOMB_API_KEY=your_honeycomb_api_key
```

### Mobile App (`apps/mobile/.env`)
```bash
EXPO_PUBLIC_POSTHOG_KEY=your_posthog_project_api_key
EXPO_PUBLIC_POSTHOG_HOST=https://app.posthog.com
# Note: Honeycomb not used for mobile
```

## Getting API Keys

### PostHog
1. Sign up at [posthog.com](https://posthog.com)
2. Create a project
3. Copy the Project API Key from Settings

### Honeycomb (Web only)
1. Sign up at [honeycomb.io](https://honeycomb.io)
2. Create a team/environment
3. Go to Settings → API Keys
4. Create a new API key with "Send Events" permission

## Vote Tallying Over Time

The `simulation_completed` event includes detailed proposition data that enables vote aggregation:

```javascript
{
  vote_details: [
    { id: 'freeze_rent', name: 'FREEZE THE RENT', vote: 'yes' },
    { id: 'free_buses', name: 'FAST & FREE BUSES', vote: 'no' },
    { id: 'childcare', name: 'CHILDCARE FOR ALL', vote: 'skipped' }
  ],
  // ... other properties
}
```

You can query and aggregate this data in PostHog or Honeycomb to:
- Track which propositions are most popular
- See yes/no/skip distributions per proposition
- Compare voting patterns between web and mobile
- Analyze outcome distributions

## Custom Event Tracking

### Using Shared Hooks (Recommended)

Most components should use shared hooks which include built-in analytics:

```javascript
import { useFeed } from '@politok/shared/hooks';

const { handleVote, currentIndex } = useFeed(FEED_ITEMS, {
  trackEvent, // Pass platform-specific tracking function
  trackPropositionVote,
  trackSimulationCompleted
});
```

### Direct Event Tracking

**Web**:
```javascript
import { trackEvent } from '@/lib/telemetry';

trackEvent('event_name', {
  property1: 'value1',
  property2: 'value2'
});
```

**Mobile**:
```javascript
import { useAnalytics } from '../lib/analytics';

function MyComponent() {
  const { trackEvent } = useAnalytics();
  
  trackEvent('event_name', {
    property1: 'value1',
    property2: 'value2'
  });
}
```

Events are automatically sent to PostHog (both platforms) and Honeycomb (web only).

## What's Being Tracked

### Automatic (via Honeycomb - Web Only)
- Network requests (fetch/XHR)
- Page loads and navigation
- User clicks and interactions
- Form submissions

### Manual (via Unified Tracking)
All UI interactions are tracked with detailed properties:
- Vote selection and changes
- Feed navigation (auto-advance, manual swipe, dot navigation)
- Simulation completion with full breakdown
- Social sharing
- Results viewing

### Component-Level Analytics

Analytics are encapsulated at the component level using shared hooks:
- **Feed**: Auto-advance, navigation, voting flow
- **Dashboard**: Policy card interactions
- **PropCard**: Individual proposition voting

## Development vs Production

Both services check for environment variables before initializing. If the API keys are not set, the services will not run, making it safe to develop without API keys.

For debugging PostHog in development (web only), events are logged to console when `import.meta.env.DEV` is true.

## Architecture Benefits

### Single Source of Truth
- `packages/shared/analytics.js` centralizes utilities
- `packages/shared/hooks.js` encapsulates tracking logic
- Consistent events across platforms

### DRY Principle
- No duplicated tracking code
- Hooks handle complex analytics flows
- Platform adapters keep implementation simple

### Maintainability
- Update analytics in one place
- Type-safe event names
- Clear separation of concerns

## Privacy Considerations

- No personally identifiable information (PII) is collected
- All tracking is anonymous
- Vote data captured includes only yes/no choices and calculated outcomes
- Users are not tracked across sessions or devices without consent
- Platform identifier (`web`/`mobile`) helps analyze user behavior differences
