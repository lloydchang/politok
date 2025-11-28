import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useStatCard } from '@politok/shared/hooks';

const { width, height } = Dimensions.get('window');

export default function StatCard({ stat }) {
  const gradient = useStatCard();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradient.mobile}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Pattern overlay simulation */}
        <View style={styles.patternOverlay} />

        {/* Main content */}
        <View style={styles.contentContainer}>
          {stat.emoji && (
            <Text style={styles.emoji}>{stat.emoji}</Text>
          )}

          <Text style={styles.title}>
            {stat.title}
          </Text>

          {stat.value && (
            <Text style={styles.value}>
              {stat.value}
            </Text>
          )}

          <Text style={styles.description}>
            {stat.description}
          </Text>
        </View>

        {/* Badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{stat.badge || 'Did you know?'}</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    flex: 1,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  patternOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    opacity: 0.1,
    // React Native doesn't support CSS radial gradients easily without SVG, 
    // so we'll skip the complex pattern or use a simple overlay if needed
  },
  contentContainer: {
    paddingHorizontal: 32,
    alignItems: 'center',
    maxWidth: 400,
    zIndex: 10,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  value: {
    fontSize: 48,
    fontWeight: '900',
    color: 'white',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  description: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 32,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  badge: {
    position: 'absolute',
    top: 60,
    left: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
