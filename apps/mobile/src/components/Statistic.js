import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useStatCard } from '@politok/shared/hooks';
import { COLORS } from '@politok/shared';

const { width, height } = Dimensions.get('window');

export default function Statistic({ stat }) {
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

          <Text style={[styles.title, { color: COLORS.PRIMARY_BLUE }]}>
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
  statValue: {
    fontSize: 72,
    fontWeight: '900',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  didYouKnowText: {
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: 'white',
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: 'black',
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.TEXT_BLUE_LIGHT,
    marginBottom: 16,
    textAlign: 'center',
  },
  value: {
    fontSize: 48,
    fontWeight: '900',
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: COLORS.TEXT_LIGHT_GRAY,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 26,
  },
  badge: {
    position: 'absolute',
    top: 60,
    left: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  badgeText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
