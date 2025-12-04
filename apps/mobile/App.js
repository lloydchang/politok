import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Platform } from 'react-native';
import { PostHogProvider } from 'posthog-react-native';
import { initObservability } from './src/lib/observability';
import { trackAppLaunchComplete } from './src/lib/performance';
import Feed from './src/components/Feed';

// Initialize Honeycomb Observability
initObservability();

// Track app launch completion
trackAppLaunchComplete();

// Enable Performance Monitor in development
if (__DEV__) {
  console.log('📊 Performance Monitor available in dev menu:');
  console.log('   - iOS Simulator: Cmd+D → "Perf Monitor"');
  console.log('   - Android Emulator: Cmd+M → "Perf Monitor"');
  console.log('   - Physical Device: Shake device → "Perf Monitor"');
  console.log('   Shows: RAM, JS Heap, Views, UI/JS FPS');
}

export default function App() {
  return (
    <PostHogProvider
      apiKey={process.env.EXPO_PUBLIC_POSTHOG_KEY}
      options={{
        host: process.env.EXPO_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
      }}
    >
      <View style={styles.container}>
        <Feed />
        <StatusBar style="light" />
      </View>
    </PostHogProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
