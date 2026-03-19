import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadows } from '../constants/theme';
import { DEMO } from '../constants/data';

const CURRENT_PLAN = {
  provider: 'Origin Energy',
  plan: 'Solar Boost Plus',
  rate: '28.5c/kWh',
  exportRate: '5c/kWh',
  daily: '$1.21/day',
  annual: '$1,840',
  annualNum: 1840,
};

const ALTERNATIVES = [
  {
    provider: 'Amber Electric',
    plan: 'SmartShift Battery',
    tag: 'BEST FOR BATTERIES',
    desc: 'Wholesale market rates with automated battery trading. Your battery charges when prices are low and exports when high.',
    rate: 'Avg 18c/kWh',
    exportRate: 'Avg 8c/kWh',
    annual: '$1,190/yr',
    annualNum: 1190,
    savings: '$650/yr',
    cta: 'Switch Now',
    ctaPrimary: true,
  },
  {
    provider: 'Energy Australia',
    plan: 'Solar Home Bundle',
    desc: 'Fixed-rate plan with premium solar export credits and no lock-in contract.',
    rate: '24.2c/kWh',
    exportRate: '8c/kWh',
    annual: '$1,480/yr',
    annualNum: 1480,
    savings: '$360/yr',
    cta: 'Learn More',
    ctaPrimary: false,
  },
  {
    provider: 'AGL',
    plan: 'Solar Savers',
    desc: 'Competitive solar feed-in tariff with monthly bill credits for excess generation.',
    rate: '26.1c/kWh',
    exportRate: '6.5c/kWh',
    annual: '$1,620/yr',
    annualNum: 1620,
    savings: '$220/yr',
    cta: 'Learn More',
    ctaPrimary: false,
  },
];

export default function EnergyPlanScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Energy Plan</Text>
        <View style={{ width: 28 }} />
      </View>
      <ScrollView style={styles.content} contentContainerStyle={styles.contentInner}>
        {/* Current Plan */}
        <Text style={styles.sectionLabel}>YOUR CURRENT PLAN</Text>
        <View style={[styles.card, Shadows.sm]}>
          <View style={styles.currentPlanHeader}>
            <View style={styles.providerBadge}>
              <Text style={styles.providerBadgeText}>⚡</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.providerName}>{CURRENT_PLAN.provider}</Text>
              <Text style={styles.planName}>{CURRENT_PLAN.plan}</Text>
            </View>
          </View>
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Usage Rate</Text>
              <Text style={styles.statValue}>{CURRENT_PLAN.rate}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Export Rate</Text>
              <Text style={styles.statValue}>{CURRENT_PLAN.exportRate}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Supply Charge</Text>
              <Text style={styles.statValue}>{CURRENT_PLAN.daily}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Est. Annual</Text>
              <Text style={[styles.statValue, { color: Colors.red }]}>{CURRENT_PLAN.annual}</Text>
            </View>
          </View>
        </View>

        {/* Better Options */}
        <Text style={[styles.sectionLabel, { marginTop: Spacing.xxl }]}>BETTER OPTIONS FOR YOU</Text>
        {ALTERNATIVES.map((alt, idx) => (
          <View key={idx} style={[styles.card, Shadows.sm, { marginBottom: Spacing.lg }]}>
            <View style={styles.altHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.providerName}>{alt.provider}</Text>
                <Text style={styles.planName}>{alt.plan}</Text>
              </View>
              {alt.tag && (
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{alt.tag}</Text>
                </View>
              )}
            </View>
            <Text style={styles.altDesc}>{alt.desc}</Text>
            <View style={styles.altStatsRow}>
              <View style={styles.altStat}>
                <Text style={styles.altStatLabel}>Usage</Text>
                <Text style={styles.altStatValue}>{alt.rate}</Text>
              </View>
              <View style={styles.altStat}>
                <Text style={styles.altStatLabel}>Export</Text>
                <Text style={styles.altStatValue}>{alt.exportRate}</Text>
              </View>
              <View style={styles.altStat}>
                <Text style={styles.altStatLabel}>Est. Annual</Text>
                <Text style={styles.altStatValue}>{alt.annual}</Text>
              </View>
            </View>
            <View style={styles.savingsRow}>
              <Text style={styles.savingsIcon}>💰</Text>
              <Text style={styles.savingsText}>
                Save <Text style={styles.savingsAmount}>{alt.savings}</Text> compared to your current plan
              </Text>
            </View>
            <TouchableOpacity
              style={alt.ctaPrimary ? styles.ctaPrimary : styles.ctaSecondary}
              activeOpacity={0.7}
            >
              <Text style={alt.ctaPrimary ? styles.ctaPrimaryText : styles.ctaSecondaryText}>
                {alt.cta}
              </Text>
            </TouchableOpacity>
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
  sectionLabel: {
    fontSize: FontSize.xs, fontWeight: FontWeight.bold, color: Colors.textMuted,
    letterSpacing: 1, marginBottom: Spacing.md,
  },
  card: {
    backgroundColor: Colors.card, borderRadius: Radius.lg, padding: Spacing.lg,
    borderWidth: 1, borderColor: Colors.border,
  },
  currentPlanHeader: {
    flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.lg,
  },
  providerBadge: {
    width: 40, height: 40, borderRadius: Radius.md, backgroundColor: Colors.amberSoft,
    alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md,
  },
  providerBadgeText: { fontSize: 18 },
  providerName: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text },
  planName: { fontSize: FontSize.base, color: Colors.textSec, marginTop: 2 },
  statsGrid: {
    flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -Spacing.xs,
  },
  statBox: {
    width: '50%', paddingHorizontal: Spacing.xs, marginBottom: Spacing.md,
  },
  statLabel: { fontSize: FontSize.sm, color: Colors.textMuted, marginBottom: 2 },
  statValue: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text },
  altHeader: {
    flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  tag: {
    backgroundColor: Colors.accentSoft, paddingHorizontal: Spacing.sm, paddingVertical: Spacing.xs,
    borderRadius: Radius.sm,
  },
  tagText: { fontSize: FontSize.xs, fontWeight: FontWeight.bold, color: Colors.accent },
  altDesc: {
    fontSize: FontSize.base, color: Colors.textSec, lineHeight: 20, marginBottom: Spacing.lg,
  },
  altStatsRow: {
    flexDirection: 'row', marginBottom: Spacing.md,
  },
  altStat: { flex: 1 },
  altStatLabel: { fontSize: FontSize.sm, color: Colors.textMuted, marginBottom: 2 },
  altStatValue: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.text },
  savingsRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.accentSoft,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: Radius.sm,
    marginBottom: Spacing.lg,
  },
  savingsIcon: { fontSize: 14, marginRight: Spacing.sm },
  savingsText: { fontSize: FontSize.base, color: Colors.text, flex: 1 },
  savingsAmount: { fontWeight: FontWeight.bold, color: Colors.accent },
  ctaPrimary: {
    backgroundColor: Colors.accent, paddingVertical: Spacing.md, borderRadius: Radius.md,
    alignItems: 'center',
  },
  ctaPrimaryText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white },
  ctaSecondary: {
    backgroundColor: Colors.bg, paddingVertical: Spacing.md, borderRadius: Radius.md,
    alignItems: 'center', borderWidth: 1, borderColor: Colors.border,
  },
  ctaSecondaryText: { fontSize: FontSize.lg, fontWeight: FontWeight.semibold, color: Colors.text },
});
