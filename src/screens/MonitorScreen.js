import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadows } from '../constants/theme';
import { DEMO } from '../constants/data';

// ─── CHART DATA ───────────────────────────────────────────
const TIME_SLOTS = ['6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm'];
const SOLAR_DATA = [0, 15, 55, 78, 85, 60, 25, 0];
const USAGE_DATA = [30, 25, 20, 35, 28, 45, 65, 55];
const MAX_VAL = 100;
const BAR_HEIGHT = 96;

// ─── BATTERY HERO ─────────────────────────────────────────
function BatteryHero() {
  const level = 78;

  return (
    <View style={styles.heroCard}>
      <Text style={styles.heroLabel}>Battery Level</Text>
      <Text style={styles.heroPercent}>{level}%</Text>
      <Text style={styles.heroKwh}>10.5 kWh available</Text>

      {/* Battery visualization using nested Views */}
      <View style={styles.batteryOuter}>
        <View style={styles.batteryTip} />
        <View style={styles.batteryBody}>
          <View style={[styles.batteryFill, { height: `${level}%` }]} />
        </View>
      </View>
    </View>
  );
}

// ─── STATS ROW ────────────────────────────────────────────
function StatsRow() {
  return (
    <View style={styles.statsRow}>
      <View style={styles.statCard}>
        <Text style={styles.statLabel}>Today</Text>
        <Text style={[styles.statValue, { color: Colors.accent }]}>$8.40</Text>
        <Text style={styles.statSub}>saved</Text>
      </View>
      <View style={styles.statCard}>
        <Text style={styles.statLabel}>This Month</Text>
        <Text style={[styles.statValue, { color: Colors.accent }]}>$187</Text>
        <Text style={styles.statSub}>saved</Text>
      </View>
      <View style={styles.statCard}>
        <Text style={styles.statLabel}>Solar Gen</Text>
        <Text style={[styles.statValue, { color: Colors.amber }]}>18.2</Text>
        <Text style={styles.statSub}>kWh</Text>
      </View>
    </View>
  );
}

// ─── ENERGY CHART ─────────────────────────────────────────
function EnergyChart() {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Today's Energy</Text>

      {/* Chart area */}
      <View style={styles.chartContainer}>
        {TIME_SLOTS.map((time, i) => (
          <View key={i} style={styles.chartColumn}>
            <View style={styles.chartBars}>
              {/* Solar bar (amber) */}
              <View
                style={[
                  styles.barSolar,
                  { height: (SOLAR_DATA[i] / MAX_VAL) * BAR_HEIGHT },
                ]}
              />
              {/* Usage bar (blue) */}
              <View
                style={[
                  styles.barUsage,
                  { height: (USAGE_DATA[i] / MAX_VAL) * BAR_HEIGHT },
                ]}
              />
            </View>
            <Text style={styles.chartTime}>{time}</Text>
          </View>
        ))}
      </View>

      {/* Legend */}
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.amber }]} />
          <Text style={styles.legendText}>Solar Generated</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.blue }]} />
          <Text style={styles.legendText}>Home Usage</Text>
        </View>
      </View>
    </View>
  );
}

// ─── REFERRAL CTA ─────────────────────────────────────────
function ReferralCTA() {
  return (
    <TouchableOpacity style={styles.referralCard} activeOpacity={0.7}>
      <Text style={{ fontSize: 22 }}>{'\uD83C\uDF81'}</Text>
      <Text style={styles.referralText}>Refer a friend, earn $500</Text>
      <Text style={styles.referralArrow}>{'\u203A'}</Text>
    </TouchableOpacity>
  );
}

// ─── MAIN SCREEN ──────────────────────────────────────────
export default function MonitorScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>{'\u2039'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Monitor</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top label */}
        <Text style={styles.greenLabel}>SYSTEM ACTIVE</Text>
        <Text style={styles.pageTitle}>Your Battery</Text>

        {/* Battery hero */}
        <BatteryHero />

        {/* Stats row */}
        <StatsRow />

        {/* Energy chart */}
        <EnergyChart />

        {/* Referral CTA */}
        <ReferralCTA />

        <View style={{ height: Spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── STYLES ─────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: 28,
    fontWeight: FontWeight.regular,
    color: Colors.text,
    lineHeight: 30,
  },
  headerTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.xl },

  // Top labels
  greenLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.accent,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: Spacing.xs,
  },
  pageTitle: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },

  // Hero card
  heroCard: {
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
    alignItems: 'center',
    backgroundColor: '#0F2A1A',
    ...Shadows.md,
  },
  heroLabel: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: Spacing.xs,
  },
  heroPercent: {
    fontSize: 48,
    fontWeight: FontWeight.extrabold,
    color: Colors.accentDark,
    marginBottom: Spacing.xs,
  },
  heroKwh: {
    fontSize: FontSize.base,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: Spacing.xl,
  },

  // Battery visualization
  batteryOuter: {
    alignItems: 'center',
    width: 64,
    height: 110,
  },
  batteryTip: {
    width: 24,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  batteryBody: {
    width: 56,
    height: 100,
    borderRadius: Radius.sm,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  batteryFill: {
    width: '100%',
    backgroundColor: Colors.accent,
    borderRadius: Radius.sm - 2,
  },

  // Stats row
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    padding: Spacing.md,
    alignItems: 'center',
    ...Shadows.sm,
  },
  statLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.textMuted,
    marginBottom: Spacing.xs,
  },
  statValue: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
  },
  statSub: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: 1,
  },

  // Card
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.sm,
  },
  cardTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },

  // Chart
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: BAR_HEIGHT + 24,
    marginBottom: Spacing.lg,
  },
  chartColumn: {
    flex: 1,
    alignItems: 'center',
  },
  chartBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    height: BAR_HEIGHT,
  },
  barSolar: {
    width: 8,
    backgroundColor: Colors.amber,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  barUsage: {
    width: 8,
    backgroundColor: Colors.blue,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  chartTime: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
  },

  // Legend
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.xl,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: FontSize.sm,
    color: Colors.textSec,
  },

  // Referral CTA
  referralCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accentSoft,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  referralText: {
    flex: 1,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },
  referralArrow: {
    fontSize: 22,
    color: Colors.accent,
  },
});
