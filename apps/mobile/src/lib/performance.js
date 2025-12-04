import { InteractionManager, AppState } from 'react-native';
import { sendHoneycombEvent } from './honeycomb';

/**
 * Performance tracking utilities for React Native
 * Integrates with Honeycomb observability
 */

/**
 * Measure and track interaction completion time
 * Useful for tracking navigation transitions and animations
 * @param {string} interactionName - Name of the interaction
 * @param {Function} callback - Optional callback after interaction completes
 */
export const trackInteraction = (interactionName, callback) => {
    const startTime = Date.now();

    InteractionManager.runAfterInteractions(() => {
        const duration = Date.now() - startTime;

        sendHoneycombEvent('interaction_complete', {
            interaction_name: interactionName,
            duration_ms: duration,
            platform: 'mobile'
        });

        if (__DEV__ && duration > 1000) {
            console.warn(`⚠️ Slow interaction: ${interactionName} took ${duration}ms`);
        }

        callback?.();
    });
};

/**
 * Track component render performance
 * Returns a function to call when render completes
 * @param {string} componentName - Name of the component
 */
export const trackRender = (componentName) => {
    const startTime = Date.now();

    return () => {
        const duration = Date.now() - startTime;

        sendHoneycombEvent('component_render', {
            component_name: componentName,
            duration_ms: duration,
            platform: 'mobile'
        });

        if (__DEV__ && duration > 100) {
            console.warn(`⚠️ Slow render: ${componentName} took ${duration}ms`);
        }
    };
};

/**
 * Track app state changes (foreground/background)
 * @param {Function} onStateChange - Callback with state info
 */
export const setupAppStateTracking = (onStateChange) => {
    let previousState = AppState.currentState;
    let backgroundTime = null;

    const subscription = AppState.addEventListener('change', (nextAppState) => {
        const now = Date.now();

        // Track when app goes to background
        if (previousState.match(/active/) && nextAppState.match(/inactive|background/)) {
            backgroundTime = now;
            sendHoneycombEvent('app_backgrounded', {
                previous_state: previousState,
                platform: 'mobile'
            });
        }

        // Track when app returns to foreground
        if (previousState.match(/inactive|background/) && nextAppState === 'active') {
            const timeInBackground = backgroundTime ? now - backgroundTime : null;
            sendHoneycombEvent('app_foregrounded', {
                previous_state: previousState,
                time_in_background_ms: timeInBackground,
                platform: 'mobile'
            });
        }

        onStateChange?.({
            previousState,
            currentState: nextAppState,
            timeInBackground: backgroundTime ? now - backgroundTime : null
        });

        previousState = nextAppState;
    });

    return subscription;
};

/**
 * Track navigation performance
 * Call this when a screen navigation starts, returns a function to call when complete
 * @param {string} fromScreen - Screen navigating from
 * @param {string} toScreen - Screen navigating to
 */
export const trackNavigation = (fromScreen, toScreen) => {
    const startTime = Date.now();

    return () => {
        const duration = Date.now() - startTime;

        sendHoneycombEvent('navigation_complete', {
            from_screen: fromScreen,
            to_screen: toScreen,
            duration_ms: duration,
            platform: 'mobile'
        });

        if (__DEV__) {
            console.log(`📱 Navigation: ${fromScreen} → ${toScreen} (${duration}ms)`);
        }
    };
};

/**
 * Measure app launch time
 * Should be called as early as possible in app initialization
 */
let appLaunchStart = Date.now();

export const trackAppLaunchComplete = () => {
    const launchDuration = Date.now() - appLaunchStart;

    sendHoneycombEvent('app_launch_complete', {
        duration_ms: launchDuration,
        platform: 'mobile'
    });

    if (__DEV__) {
        console.log(`🚀 App launched in ${launchDuration}ms`);
    }
};
