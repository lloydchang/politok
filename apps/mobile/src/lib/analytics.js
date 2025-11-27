import { usePostHog } from 'posthog-react-native';
import { trace } from '@opentelemetry/api';

const tracer = trace.getTracer('politok-mobile');

/**
 * Hook for unified tracking to both PostHog and Honeycomb
 * Must be called within a component that has PostHogProvider
 */
export const useAnalytics = () => {
    const posthog = usePostHog();

    /**
     * Track event to both PostHog and Honeycomb
     */
    const trackEvent = (eventName, properties = {}) => {
        // Add platform identifier
        const enrichedProps = {
            ...properties,
            platform: 'mobile',
            timestamp: new Date().toISOString()
        };

        // Send to PostHog
        posthog?.capture(eventName, enrichedProps);

        // Send to Honeycomb via OpenTelemetry span
        const span = tracer.startSpan(eventName);

        // Add all properties as span attributes
        Object.entries(enrichedProps).forEach(([key, value]) => {
            // Convert objects to JSON strings for span attributes
            const attrValue = typeof value === 'object' ? JSON.stringify(value) : value;
            span.setAttribute(key, attrValue);
        });

        span.end();
    };

    /**
     * Track individual proposition selection/deselection
     */
    const trackPropositionVote = (propositionId, propositionName, voteValue, isDeselection = false) => {
        const eventName = isDeselection ? 'proposition_deselected' : 'proposition_selected';

        trackEvent(eventName, {
            proposition_id: propositionId,
            proposition_name: propositionName,
            vote_value: voteValue
        });
    };

    /**
     * Track simulation completion with full vote details
     */
    const trackSimulationCompleted = (votes, resultStats, propositions) => {
        // Build detailed vote breakdown
        const voteDetails = propositions.map(prop => ({
            id: prop.id,
            name: prop.title,
            vote: votes[prop.id] || 'skipped'
        }));

        // Create vote object with proposition IDs and values
        const voteObject = {};
        propositions.forEach(prop => {
            voteObject[prop.id] = votes[prop.id] || null;
        });

        trackEvent('simulation_completed', {
            votes: voteObject,
            vote_details: voteDetails,
            vote_count: Object.keys(votes).length,
            skipped_count: propositions.length - Object.keys(votes).length,
            outcome: resultStats.outcome,
            equity_percent: resultStats.equity,
            oligarchy_percent: resultStats.oligarchy
        });
    };

    return {
        trackEvent,
        trackPropositionVote,
        trackSimulationCompleted
    };
};
