import { getMobileFingerprint } from '@politok/shared';

// Use the Vercel URL for mobile (since it's not same-origin)
const API_BASE = 'https://politok.vercel.app'; // Update with your actual URL

/**
 * Sync interactions to server
 * @param {Object} storage - Mobile storage adapter
 * @param {Array} interactions - Array of {id, type} objects
 * @returns {Promise<{success: boolean, synced: number}>}
 */
export async function syncToServer(storage, interactions) {
    if (!interactions || interactions.length === 0) {
        return { success: true, synced: 0 };
    }

    try {
        const fingerprint = await getMobileFingerprint(storage);
        if (!fingerprint) {
            throw new Error('Failed to get fingerprint');
        }

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
 * Create mobile sync adapter for useInteractions hook
 * @param {Object} storage - Mobile storage adapter
 * @returns {Object} Sync adapter with sync and fetchStats methods
 */
export const createMobileSyncAdapter = (storage) => ({
    sync: (interactions) => syncToServer(storage, interactions),
    fetchStats: fetchGlobalStats
});
