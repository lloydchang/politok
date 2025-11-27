import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { PostHogProvider } from 'posthog-react-native';
import { initObservability } from './src/lib/observability';
import Feed from './src/components/Feed';

// Initialize Honeycomb Observability
initObservability();

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
