import { usePostHog } from 'posthog-react-native';
import { sendHoneycombEvent } from './honeycomb';
import {
    trackInteraction,
    trackRender,
    trackNavigation,
    setupAppStateTracking
} from './performance';

/**
 * Hook for unified tracking to PostHog and Honeycomb
 * Note: OpenTelemetry removed from mobile due to React Native/Hermes incompatibility
 * Must be called within a component that has PostHogProvider
 */
export const useAnalytics = () => {
    const posthog = usePostHog();

    /**
     * Track event to PostHog and Honeycomb
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

        // Send to Honeycomb
        sendHoneycombEvent(eventName, enrichedProps);
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
        trackSimulationCompleted,
        // Performance tracking methods
        trackInteraction,
        trackRender,
        trackNavigation,
        setupAppStateTracking
    };
};
