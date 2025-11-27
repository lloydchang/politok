import { Platform } from 'react-native';
import * as Device from 'expo-device';

const HONEYCOMB_API_KEY = process.env.EXPO_PUBLIC_HONEYCOMB_API_KEY;
const DATASET = 'politok-mobile';
const API_URL = `https://api.honeycomb.io/v1/events/${DATASET}`;

/**
 * Sends an event to Honeycomb using standard fetch API
 * This avoids OpenTelemetry/Hermes compatibility issues
 */
export const sendHoneycombEvent = async (eventName, data = {}) => {
    if (!HONEYCOMB_API_KEY) {
        console.warn('Honeycomb API key not found, skipping event');
        return;
    }

    try {
        const timestamp = new Date().toISOString();

        // Standard attributes for all events
        const payload = {
            ...data,
            name: eventName,
            timestamp,
            'app.platform': Platform.OS,
            'app.version': '1.0.0',
            'device.model': Device.modelName,
            'device.os_version': Device.osVersion,
            'service.name': 'politok-mobile',
        };

        // Fire and forget - don't await to avoid blocking UI
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'X-Honeycomb-Team': HONEYCOMB_API_KEY,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }).catch(err => {
            // Silent failure in production, log in dev
            if (__DEV__) {
                console.error('Failed to send Honeycomb event:', err);
            }
        });

    } catch (error) {
        if (__DEV__) {
            console.error('Error preparing Honeycomb event:', error);
        }
    }
};
