import { HoneycombWebSDK } from '@honeycombio/opentelemetry-web';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';

const sdk = new HoneycombWebSDK({
    apiKey: import.meta.env.VITE_HONEYCOMB_API_KEY,
    serviceName: 'polytawk-web',
    instrumentations: [getWebAutoInstrumentations()],
});

export const initObservability = () => {
    if (import.meta.env.VITE_HONEYCOMB_API_KEY) {
        sdk.start();
    }
};
