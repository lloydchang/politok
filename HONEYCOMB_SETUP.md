# Honeycomb Observability Setup

Politok uses Honeycomb for high-cardinality observability, primarily in the web application via OpenTelemetry.

## Prerequisites

- A Honeycomb account (Free tier works great)
- An API Key from your Honeycomb environment

## Environment Variables

Add the following to your `.env.local` (Web) or `.env` (Mobile):

```bash
# Required
NEXT_PUBLIC_HONEYCOMB_API_KEY=your_api_key_here

# Optional (Defaults provided in code)
NEXT_PUBLIC_OTEL_SERVICE_NAME=politok-web
```

## Web Implementation

The web app uses the `@honeycombio/opentelemetry-web` SDK for auto-instrumentation.

**File:** `apps/web/src/lib/observability.js`

Features:
- Auto-instrumentation for document load, user interactions, and fetch requests.
- Custom traces for key user journeys (e.g., voting flow).

## Mobile Implementation

**Note:** Honeycomb OpenTelemetry Web SDK is currently **not compatible** with React Native due to browser-specific dependencies.

Mobile observability is currently handled primarily through PostHog. Future implementation would require a React Native specific OpenTelemetry collector or a custom bridge.

## Verification

1. Run the web app: `npm run dev` in `apps/web`.
2. Open your browser console and look for `[Honeycomb Web SDK]`.
3. Perform actions (vote, navigate).
4. Check your Honeycomb dashboard for incoming traces.
