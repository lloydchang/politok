import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { SimpleSpanProcessor, ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { registerInstrumentations } from '@opentelemetry/instrumentation';

export const initObservability = () => {
    const apiKey = process.env.EXPO_PUBLIC_HONEYCOMB_API_KEY;
    const serviceName = 'politok-mobile';

    if (!apiKey) {
        console.log('Honeycomb API key not found, skipping observability');
        return;
    }

    const provider = new WebTracerProvider({
        resource: new Resource({
            [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
        }),
    });

    // Send traces to Honeycomb
    const exporter = new OTLPTraceExporter({
        url: 'https://api.honeycomb.io/v1/traces',
        headers: {
            'x-honeycomb-team': apiKey,
        },
    });

    provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

    // Optional: Console exporter for debugging
    if (__DEV__) {
        provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
    }

    provider.register();

    // Register instrumentations if needed (e.g., fetch, document load)
    // registerInstrumentations({
    //     instrumentations: [
    //         // Add auto-instrumentations here
    //     ],
    // });

    console.log('Honeycomb observability initialized via OpenTelemetry JS SDK');
};
