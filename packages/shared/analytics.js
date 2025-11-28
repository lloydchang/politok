// Shared analytics event names and types for web and mobile
// Platform-specific implementations should use these constants

/**
 * Analytics event names
 */
export const ANALYTICS_EVENTS = {
    // Proposition voting
    PROPOSITION_SELECTED: 'proposition_selected',
    PROPOSITION_DESELECTED: 'proposition_deselected',

    // Simulation completion
    SIMULATION_COMPLETED: 'simulation_completed',

    // Page views / navigation
    PAGE_VIEW: 'page_view',
    FEED_ITEM_VIEW: 'feed_item_view',

    // Social interactions
    SHARE_CLICKED: 'share_clicked',
    SHARE_COMPLETED: 'share_completed',

    // Dashboard
    TRAVEL_MODE_TOGGLED: 'travel_mode_toggled',
    LOCATION_CHANGED: 'location_changed',
};

/**
 * Common analytics properties that should be included in all events
 */
export const getCommonProperties = () => ({
    timestamp: new Date().toISOString(),
});

/**
 * Format proposition vote event properties
 * @param {number|string} propositionId - ID of the proposition
 * @param {string} propositionName - Name of the proposition  
 * @param {string} voteValue - Vote value ('yes' or 'no')
 * @returns {Object} Event properties
 */
export function formatPropositionVoteProperties(propositionId, propositionName, voteValue) {
    return {
        proposition_id: propositionId,
        proposition_name: propositionName,
        vote_value: voteValue,
        ...getCommonProperties(),
    };
}

/**
 * Format simulation completed event properties
 * @param {Object} votes - Map of proposition IDs to selected option IDs
 * @param {Object} resultStats - Stats object with equity, oligarchy, outcome
 * @param {Array} propositions - Array of proposition objects
 * @returns {Object} Event properties
 */
export function formatSimulationCompletedProperties(votes, resultStats, propositions) {
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

    return {
        votes: voteObject,
        vote_details: voteDetails,
        vote_count: Object.keys(votes).length,
        skipped_count: propositions.length - Object.keys(votes).length,
        outcome: resultStats.outcome,
        equity_percent: resultStats.equity,
        oligarchy_percent: resultStats.oligarchy,
        ...getCommonProperties(),
    };
}
