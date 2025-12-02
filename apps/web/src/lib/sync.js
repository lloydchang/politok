import { getWebFingerprint } from '@politok/shared';

const API_BASE = ''; // Same origin

/**
 * Sync interactions to server
 * @param {Array} interactions - Array of {id, type} objects
 * @returns {Promise<{success: boolean, synced: number}>}
 */
export async function syncToServer(interactions) {
    if (!interactions || interactions.length === 0) {
        return { success: true, synced: 0 };
    }

    const fingerprint = getWebFingerprint();
    if (!fingerprint) {
        throw new Error('Failed to get fingerprint');
    }

    try {
        const response = await fetch(`${API_BASE}/api/sync`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fingerprint,
                interactions
            })
        });

        if (!response.ok) {
            throw new Error(`Sync failed: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Sync error:', error);
        throw error;
    }
}

/**
 * Fetch global stats from server
 * @returns {Promise<{likes: Object, views: Object, follows: number}>}
 */
export async function fetchGlobalStats() {
    try {
        const response = await fetch(`${API_BASE}/api/stats`);

        if (!response.ok) {
            throw new Error(`Fetch stats failed: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch stats error:', error);
        return { likes: {}, views: {}, follows: 0 };
    }
}

/**
 * Web sync adapter for useInteractions hook
 */
export const webSyncAdapter = {
    sync: syncToServer,
    fetchStats: fetchGlobalStats
};
