import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, FontWeight, Spacing, Radius } from '../constants/theme';
import { DEMO } from '../constants/data';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.bgGradient}>
        {/* Glow circle */}
        <View style={styles.glowCircle} />

        {/* Logo */}
        <View style={styles.logoRow}>
          <Text style={styles.logoIcon}>⚡</Text>
          <Text style={styles.logoText}>SOLAR BATTERY GROUP</Text>
        </View>

        {/* Hero illustration area */}
        <View style={styles.heroArea}>
          <Text style={styles.heroEmoji}>🏠🔋☀️</Text>
        </View>

        {/* Bottom content */}
        <SafeAreaView edges={['bottom']} style={styles.bottomContent}>
          <Text style={styles.heading}>Let's get your{'\n'}installation moving</Text>
          <Text style={styles.subheading}>
            5 minutes from you is all we need to fast-track your battery install.
          </Text>

          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => navigation.replace('Main', { screen: 'Photos' })}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaText}>Start Setup →</Text>
          </TouchableOpacity>

          <View style={styles.features}>
            {['5 min setup', 'AI-validated', 'Live tracking'].map((t, i) => (
              <Text key={i} style={styles.featureText}>{t}</Text>
            ))}
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bgGradient: {
    flex: 1,
    backgroundColor: '#081A10',
    justifyContent: 'flex-end',
    padding: Spacing.xl,
    position: 'relative',
  },
  glowCircle: {
    position: 'absolute',
    top: 40,
    right: -20,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(0,200,83,0.12)',
  },
  logoRow: {
    position: 'absolute',
    top: 70,
    left: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  logoIcon: { fontSize: 18 },
  logoText: {
    color: '#00E676',
    fontSize: 10,
    fontWeight: FontWeight.bold,
    letterSpacing: 3,
  },
  heroArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroEmoji: { fontSize: 60, opacity: 0.3 },
  bottomContent: {
    paddingBottom: Spacing.lg,
  },
  heading: {
    fontSize: 28,
    fontWeight: FontWeight.extrabold,
    color: Colors.white,
    lineHeight: 34,
    marginBottom: Spacing.md,
  },
  subheading: {
    fontSize: FontSize.base,
    color: 'rgba(255,255,255,0.5)',
    lineHeight: 20,
    marginBottom: Spacing.xxl,
  },
  ctaButton: {
    backgroundColor: Colors.accent,
    borderRadius: Radius.md,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 6,
  },
  ctaText: {
    color: Colors.white,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: Spacing.lg,
  },
  featureText: {
    color: 'rgba(255,255,255,0.28)',
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
  },
});
