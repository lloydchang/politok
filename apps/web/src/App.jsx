import TikTokFeed from './components/TikTokFeed';
import { trackEvent } from './lib/telemetry';

export default function App() {
    return <TikTokFeed trackEvent={trackEvent} />;
}
