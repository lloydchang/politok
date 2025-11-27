# Observability & Analytics Setup Guide

This document explains the comprehensive observability and analytics instrumentation in the politok apps.

## Services Integrated

### 🍯 Honeycomb (Observability)
- **Purpose**: Distributed tracing and performance monitoring
- **Web**: Auto-instrumentation for network requests, page loads, and user interactions
- **Mobile**: Auto-instrumentation for app startup, fetch requests, and error handling
- **Custom Tracking**: All custom events sent via OpenTelemetry spans

### 📊 PostHog (Product Analytics)
- **Purpose**: User behavior tracking and product analytics
- **Custom Tracking**: All custom events sent via PostHog capture

## Cross-Platform Architecture

**All events are sent to BOTH Honeycomb AND PostHog** using unified tracking utilities:
- **Web**: `analytics.js` with `trackEvent()` function
- **Mobile**: `analytics.js` with `useAnalytics()` hook

This provides complete observability coverage across both platforms.

## Events Tracked

### Main Page Events
- **`politok_title_clicked`** - User clicks "Affordability" title
- **`vote_button_clicked`** - User clicks VOTE button
- **`simulation_started`** - Simulation begins

### Simulation Page Events
- **`proposition_selected`** - User selects yes/no on a proposition
  - Properties: `proposition_id`, `proposition_name`, `vote_value`
- **`proposition_deselected`** - User deselects a choice
  - Properties: `proposition_id`, `proposition_name`, `vote_value`
- **`cast_vote_button_clicked`** - User clicks CAST VOTE button
  - Properties: `vote_count`, `skipped_count`
- **`review_ballot_clicked`** - User chooses to review incomplete ballot

### Results Page Events
- **`simulation_completed`** - Simulation finishes with full vote breakdown
  - **`votes`**: Object with proposition IDs and values (`yes`/`no`/`null`)
  - **`vote_details`**: Array of `{id, name, vote}` for each proposition
  - **`vote_count`**: Number of propositions voted on
  - **`skipped_count`**: Number of propositions skipped
  - **`outcome`**: Result text (e.g., "THE SQUEEZE\nContinues")
  - **`equity_percent`**: Equity percentage
  - **`oligarchy_percent`**: Oligarchy percentage
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
EXPO_PUBLIC_HONEYCOMB_API_KEY=your_honeycomb_api_key
```

## Getting API Keys

### PostHog
1. Sign up at [posthog.com](https://posthog.com)
2. Create a project
3. Copy the Project API Key from Settings

### Honeycomb
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

### Adding Custom Events (Web)
```javascript
import { trackEvent } from './lib/analytics';

trackEvent('event_name', {
  property1: 'value1',
  property2: 'value2'
});
```

### Adding Custom Events (Mobile)
```javascript
import { useAnalytics } from './src/lib/analytics';

function MyComponent() {
  const { trackEvent } = useAnalytics();
  
  trackEvent('event_name', {
    property1: 'value1',
    property2: 'value2'
  });
}
```

Events are automatically sent to both PostHog and Honeycomb.

## What's Being Tracked

### Automatic (via Honeycomb)
- **Web**: Network requests (fetch/XHR), page loads, user clicks, form submissions
- **Mobile**: App startup, network requests, errors, slow event loops

### Manual (via Unified Tracking)
All UI interactions are tracked with detailed properties for comprehensive analytics and vote tallying.

## Development vs Production

Both services check for environment variables before initializing. If the API keys are not set, the services will not run, making it safe to develop without API keys.

For debugging PostHog in development (web only), events are logged to console when `import.meta.env.DEV` is true.

## Privacy Considerations

- No personally identifiable information (PII) is collected
- All tracking is anonymous
- Vote data captured includes only yes/no choices and calculated outcomes
- Users are not tracked across sessions or devices without consent
- Platform identifier (`web`/`mobile`) helps analyze user behavior differences
