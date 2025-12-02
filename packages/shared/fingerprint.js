/**
 * Generate or retrieve a unique client fingerprint
 * Used to prevent duplicate votes without requiring authentication
 * Stored in localStorage (web) or AsyncStorage (mobile)
 */

const FINGERPRINT_KEY = 'politok_fingerprint';

/**
 * Generate a simple UUID v4
 */
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * Get or create fingerprint for web (localStorage)
 * @returns {string} UUID fingerprint
 */
export function getWebFingerprint() {
    if (typeof window === 'undefined') return null;

    let fingerprint = localStorage.getItem(FINGERPRINT_KEY);
    if (!fingerprint) {
        fingerprint = generateUUID();
        localStorage.setItem(FINGERPRINT_KEY, fingerprint);
    }
    return fingerprint;
}

/**
 * Get or create fingerprint for mobile (AsyncStorage)
 * @param {Object} storage - AsyncStorage or expo-file-system adapter
 * @returns {Promise<string>} UUID fingerprint
 */
export async function getMobileFingerprint(storage) {
    try {
        let fingerprint = await storage.getItem(FINGERPRINT_KEY);
        if (!fingerprint) {
            fingerprint = generateUUID();
            await storage.setItem(FINGERPRINT_KEY, fingerprint);
        }
        return fingerprint;
    } catch (e) {
        console.error('Error getting mobile fingerprint:', e);
        // Fallback to session-only fingerprint
        return generateUUID();
    }
}

/**
 * Custom hook for managing interactions (likes, views, follows)
 * with local persistence and optional server sync
 *
 * @param {Object} storage - Storage adapter (localStorage, AsyncStorage, etc)
 * @param {Object} syncAdapter - Optional sync adapter with {sync, fetchStats} methods
 */
export function useInteractions(storage, syncAdapter = null) {
    const [interactions, setInteractions] = useState({
        isFollowing: false,
        items: {} // { id: { likes: 0, liked: false, views: 0 } }
    });

    const [globalStats, setGlobalStats] = useState(null); // { likes: {}, views: {}, follows: 0 }
    const [pendingSync, setPendingSync] = useState([]);

    // Load interactions and pending sync queue from storage
    useEffect(() => {
        const loadInteractions = async () => {
            try {
                const stored = await storage.getItem('interactions');
                if (stored) {
                    setInteractions(JSON.parse(stored));
                }

                // Load pending sync queue
                if (syncAdapter) {
                    const pending = await storage.getItem('pending_sync');
                    if (pending) {
                        const queue = JSON.parse(pending);
                        setPendingSync(queue);
                    }
                }
            } catch (e) {
                console.error('Failed to load interactions:', e);
            }
        };
        loadInteractions();
    }, [storage, syncAdapter]);

    // Fetch global stats on mount (if sync enabled)
    useEffect(() => {
        if (syncAdapter && syncAdapter.fetchStats) {
            syncAdapter.fetchStats()
                .then(stats => setGlobalStats(stats))
                .catch(err => console.error('Failed to fetch global stats:', err));
        }
    }, [syncAdapter]);

    // Process pending sync queue on mount
    useEffect(() => {
        if (syncAdapter && pendingSync.length > 0) {
            syncAdapter.sync(pendingSync)
                .then(() => {
                    // Clear queue on success
                    setPendingSync([]);
                    storage.setItem('pending_sync', JSON.stringify([]));
                })
                .catch(err => {
                    console.error('Retry sync failed:', err);
                    // Keep queue for next attempt
                });
        }
    }, [syncAdapter, storage]); // Only run once on mount

    // Save interactions to storage
    useEffect(() => {
        const saveInteractions = async () => {
            try {
                await storage.setItem('interactions', JSON.stringify(interactions));
            } catch (e) {
                console.error('Failed to save interactions:', e);
            }
        };
        // Debounce saving slightly or just save on every change (it's local)
        const timer = setTimeout(saveInteractions, 500);
        return () => clearTimeout(timer);
    }, [interactions, storage]);

    const toggleFollow = useCallback(() => {
        const newFollowState = !interactions.isFollowing;

        setInteractions(prev => ({
            ...prev,
            isFollowing: newFollowState
        }));

        // Sync to server
        if (syncAdapter) {
            const action = { type: 'follow', id: 'profile' };
            syncAdapter.sync([action])
                .catch(err => {
                    console.error('Follow sync failed:', err);
                    // Add to retry queue
                    const newQueue = [...pendingSync, action];
                    setPendingSync(newQueue);
                    storage.setItem('pending_sync', JSON.stringify(newQueue));
                });
        }
    }, [interactions.isFollowing, syncAdapter, storage, pendingSync]);

    const toggleLike = useCallback((id, forceState) => {
        if (!id) return;
        setInteractions(prev => {
            const item = prev.items[id] || { likes: 0, liked: false, views: 0 };
            // If forceState is provided, use it. Otherwise toggle.
            const isLiked = forceState !== undefined ? forceState : !item.liked;

            // If forcing state and it's already in that state, do nothing
            if (forceState !== undefined && item.liked === forceState) {
                return prev;
            }

            const newState = {
                ...prev,
                items: {
                    ...prev.items,
                    [id]: {
                        ...item,
                        liked: isLiked,
                        likes: isLiked ? (item.likes || 0) + 1 : Math.max(0, (item.likes || 0) - 1)
                    }
                }
            };

            // Sync to server (only if state changed)
            if (syncAdapter && item.liked !== isLiked) {
                const action = { type: 'like', id };
                syncAdapter.sync([action])
                    .catch(err => {
                        console.error('Like sync failed:', err);
                        // Add to retry queue
                        const newQueue = [...pendingSync, action];
                        setPendingSync(newQueue);
                        storage.setItem('pending_sync', JSON.stringify(newQueue));
                    });
            }

            return newState;
        });
    }, [syncAdapter, storage, pendingSync]);

    const incrementView = useCallback((id) => {
        if (!id) return;
        setInteractions(prev => {
            const item = prev.items[id] || { likes: 0, liked: false, views: 0 };

            const newState = {
                ...prev,
                items: {
                    ...prev.items,
                    [id]: {
                        ...item,
                        views: (item.views || 0) + 1
                    }
                }
            };

            // Sync view to server (fire and forget, no retry)
            if (syncAdapter) {
                syncAdapter.sync([{ type: 'view', id }])
                    .catch(err => console.error('View sync failed (ignored):', err));
            }

            return newState;
        });
    }, [syncAdapter]);

    // Calculate total likes for profile
    const totalLikes = useMemo(() => {
        return Object.values(interactions.items).reduce((sum, item) => sum + (item.likes || 0), 0);
    }, [interactions.items]);

    return {
        interactions,
        toggleLike,
        incrementView,
        toggleFollow,
        totalLikes,
        globalStats // Include global stats for display
    };
}
