import posthog from 'posthog-js';
import { trace } from '@opentelemetry/api';

const tracer = trace.getTracer('polytawk-web');

/**
 * Unified tracking function that sends events to both PostHog and Honeycomb
 * Fails gracefully if analytics is blocked by ad blockers
 * @param {string} eventName - Name of the event
 * @param {object} properties - Event properties/attributes
 */
export const trackEvent = (eventName, properties = {}) => {
    try {
        // Add platform identifier
        const enrichedProps = {
            ...properties,
            platform: 'web',
            timestamp: new Date().toISOString()
        };

        // Send to PostHog
        if (typeof posthog !== 'undefined' && posthog.__loaded) {
            posthog.capture(eventName, enrichedProps);
        }

        // Send to Honeycomb via OpenTelemetry span
        const span = tracer.startSpan(eventName);

        // Add all properties as span attributes
        Object.entries(enrichedProps).forEach(([key, value]) => {
            // Convert objects to JSON strings for span attributes
            const attrValue = typeof value === 'object' ? JSON.stringify(value) : value;
            span.setAttribute(key, attrValue);
        });

        span.end();
    } catch (error) {
        // Analytics blocked or failed - silently continue
        // Don't log to avoid console spam
    }
};

/**
 * Track individual proposition selection/deselection
 */
export const trackPropositionVote = (propositionId, propositionName, voteValue, isDeselection = false) => {
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
export const trackSimulationCompleted = (votes, resultStats, propositions) => {
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
