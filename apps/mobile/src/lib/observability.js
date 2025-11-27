// OpenTelemetry Web SDK is not compatible with React Native/Hermes
// Mobile app uses PostHog for analytics instead
// This file is kept for API compatibility but does nothing

export const initObservability = () => {
    console.log('Mobile observability: Using PostHog only (OpenTelemetry Web SDK not compatible with React Native)');
};

