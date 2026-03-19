import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadows } from '../constants/theme';
import { DEMO } from '../constants/data';

const VPP_PROGRAMS = [
  {
    name: 'Amber SmartShift',
    icon: '⚡',
    type: 'Automated Trading',
    desc: 'Your battery automatically trades on the wholesale market — charging when prices are negative and discharging when prices spike.',
    earnings: '$400–$800/yr',
    compatible: true,
  },
  {
    name: 'Tesla Energy Plan',
    icon: '🔴',
    type: 'Grid Support',
    desc: 'Participate in grid stability events by discharging your battery during peak demand periods for premium payments.',
    earnings: '$300–$500/yr',
    compatible: false,
    incompatibleTag: 'Tesla Powerwall only',
  },
  {
    name: 'ShineHub VPP',
    icon: '☀️',
    type: 'Community Pool',
    desc: 'Join a community battery pool that aggregates neighbourhood solar and storage for collective grid trading.',
    earnings: '$200–$400/yr',
    compatible: true,
  },
  {
    name: 'Origin Loop',
    icon: '🔄',
    type: 'Bill Credits',
    desc: 'Earn bill credits when your battery supports the grid during peak events. Credits applied directly to your Origin energy bill.',
    earnings: '$150–$350/yr',
    compatible: true,
  },
];

export default function VPPScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Virtual Power Plant</Text>
        <View style={{ width: 28 }} />
      </View>
      <ScrollView style={styles.content} contentContainerStyle={styles.contentInner}>
        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <Text style={styles.heroIcon}>🔋</Text>
          <Text style={styles.heroTitle}>Turn Your Battery Into a Money Maker</Text>
          <Text style={styles.heroDesc}>
            Enrol your {DEMO.system.name} in a Virtual Power Plant program and earn $300–$800/yr by sharing stored energy with the grid during peak demand.
          </Text>
        </View>

        {/* VPP Programs */}
        <Text style={styles.sectionLabel}>AVAILABLE PROGRAMS</Text>
        {VPP_PROGRAMS.map((program, idx) => (
          <View
            key={idx}
            style={[
              styles.card,
              Shadows.sm,
              !program.compatible && styles.cardDimmed,
            ]}
          >
            <View style={styles.cardHeader}>
              <View style={styles.programIcon}>
                <Text style={{ fontSize: 18 }}>{program.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.nameRow}>
                  <Text style={styles.programName}>{program.name}</Text>
                  {!program.compatible && (
                    <View style={styles.incompatibleTag}>
                      <Text style={styles.incompatibleTagText}>{program.incompatibleTag}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.programType}>{program.type}</Text>
              </View>
            </View>
            <Text style={styles.programDesc}>{program.desc}</Text>
            <View style={styles.earningsRow}>
              <Text style={styles.earningsLabel}>Est. Earnings</Text>
              <Text style={styles.earningsValue}>{program.earnings}</Text>
            </View>
            {program.compatible ? (
              <TouchableOpacity style={styles.enrolButton} activeOpacity={0.7}>
                <Text style={styles.enrolButtonText}>Enrol</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.incompatibleButton}>
                <Text style={styles.incompatibleButtonText}>Not Compatible</Text>
              </View>
            )}
          </View>
        ))}

        <View style={{ height: Spacing.xxxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  backButton: { padding: 4, width: 28 },
  backText: { fontSize: 28, color: Colors.text, fontWeight: '300' },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.text },
  content: { flex: 1 },
  contentInner: { padding: Spacing.xl },
  heroBanner: {
    backgroundColor: '#0F1923', borderRadius: Radius.lg, padding: Spacing.xl,
    marginBottom: Spacing.xxl, alignItems: 'center',
  },
  heroIcon: { fontSize: 40, marginBottom: Spacing.md },
  heroTitle: {
    fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.white,
    textAlign: 'center', marginBottom: Spacing.sm,
  },
  heroDesc: {
    fontSize: FontSize.base, color: '#9AABB8', textAlign: 'center', lineHeight: 20,
  },
  sectionLabel: {
    fontSize: FontSize.xs, fontWeight: FontWeight.bold, color: Colors.textMuted,
    letterSpacing: 1, marginBottom: Spacing.md,
  },
  card: {
    backgroundColor: Colors.card, borderRadius: Radius.lg, padding: Spacing.lg,
    borderWidth: 1, borderColor: Colors.border, marginBottom: Spacing.lg,
  },
  cardDimmed: { opacity: 0.5 },
  cardHeader: {
    flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md,
  },
  programIcon: {
    width: 40, height: 40, borderRadius: Radius.md, backgroundColor: Colors.bg,
    alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md,
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: Spacing.sm },
  programName: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text },
  programType: { fontSize: FontSize.base, color: Colors.textSec, marginTop: 2 },
  incompatibleTag: {
    backgroundColor: Colors.amberSoft, paddingHorizontal: Spacing.sm, paddingVertical: 2,
    borderRadius: Radius.sm,
  },
  incompatibleTagText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.amber },
  programDesc: {
    fontSize: FontSize.base, color: Colors.textSec, lineHeight: 20, marginBottom: Spacing.md,
  },
  earningsRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: Colors.accentSoft, paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm,
    borderRadius: Radius.sm, marginBottom: Spacing.lg,
  },
  earningsLabel: { fontSize: FontSize.base, color: Colors.text },
  earningsValue: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.accent },
  enrolButton: {
    backgroundColor: Colors.accent, paddingVertical: Spacing.md, borderRadius: Radius.md,
    alignItems: 'center',
  },
  enrolButtonText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white },
  incompatibleButton: {
    backgroundColor: Colors.bg, paddingVertical: Spacing.md, borderRadius: Radius.md,
    alignItems: 'center', borderWidth: 1, borderColor: Colors.border,
  },
  incompatibleButtonText: { fontSize: FontSize.lg, fontWeight: FontWeight.semibold, color: Colors.textMuted },
});
