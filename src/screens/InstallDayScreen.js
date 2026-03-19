import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadows } from '../constants/theme';
import { DEMO } from '../constants/data';

// ─── PHASE CONFIG ─────────────────────────────────────────
const PHASES = [
  { label: 'Installer on the way', sub: 'ETA 15 min', color: Colors.blue, icon: '\uD83D\uDE97' },
  { label: 'Installer arrived', sub: 'Installation starting', color: Colors.accent, icon: '\uD83D\uDC77' },
  { label: 'Installation in progress', sub: '3-4 hours', color: Colors.accent, icon: '\u26A1' },
];

// ─── TIMELINE ENTRIES ─────────────────────────────────────
const TIMELINE = [
  { time: '8:15 AM', text: 'Installer confirmed for today', minPhase: -1 },
  { time: '8:22 AM', text: 'Installer en route to your address', minPhase: 0 },
  { time: '8:38 AM', text: 'Installer arrived on site', minPhase: 1 },
  { time: '8:45 AM', text: 'Installation underway', minPhase: 2 },
  { time: '~12:00 PM', text: 'Estimated completion', minPhase: 99 },
];

// ─── MAP SIMULATION ───────────────────────────────────────
function MapArea({ phase }) {
  return (
    <View style={styles.mapContainer}>
      {/* House pin */}
      <View style={styles.housePin}>
        <Text style={{ fontSize: 28 }}>{'\uD83C\uDFE0'}</Text>
      </View>

      {/* Car icon (only in phase 0) */}
      {phase === 0 && (
        <View style={styles.carIcon}>
          <Text style={{ fontSize: 24 }}>{'\uD83D\uDE97'}</Text>
        </View>
      )}

      {/* Status badge */}
      <View style={[styles.mapBadge, { backgroundColor: PHASES[phase].color }]}>
        <Text style={styles.mapBadgeText}>{PHASES[phase].label}</Text>
      </View>
    </View>
  );
}

// ─── INSTALLER CARD ───────────────────────────────────────
function InstallerCard() {
  return (
    <View style={styles.card}>
      <View style={styles.installerRow}>
        <View style={styles.installerAvatar}>
          <Text style={styles.installerInitials}>{DEMO.installer.initials}</Text>
        </View>
        <View style={styles.installerInfo}>
          <Text style={styles.installerName}>{DEMO.installer.name}</Text>
          <Text style={styles.installerCompany}>{DEMO.installer.company}</Text>
        </View>
        <TouchableOpacity style={styles.messageButton} activeOpacity={0.7}>
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── LIVE UPDATES TIMELINE ────────────────────────────────
function LiveUpdates({ phase }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Live Updates</Text>
      {TIMELINE.map((entry, i) => {
        const done = phase >= entry.minPhase;
        return (
          <View key={i} style={styles.timelineRow}>
            {/* Connector line */}
            {i > 0 && (
              <View style={[styles.timelineConnector, { backgroundColor: done ? Colors.accent : Colors.border }]} />
            )}
            <View style={styles.timelineLeft}>
              <View style={[styles.timelineDot, { backgroundColor: done ? Colors.accent : Colors.border }]} />
            </View>
            <View style={styles.timelineRight}>
              <Text style={[styles.timelineTime, done && { color: Colors.accent }]}>{entry.time}</Text>
              <Text style={[styles.timelineText, !done && { color: Colors.textMuted }]}>{entry.text}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

// ─── MAIN SCREEN ──────────────────────────────────────────
export default function InstallDayScreen({ navigation }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2500);
    const t2 = setTimeout(() => setPhase(2), 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>{'\u2039'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Install Day</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top label */}
        <Text style={styles.greenLabel}>INSTALLATION DAY</Text>
        <Text style={styles.dateTitle}>{DEMO.scheduledDate}</Text>

        {/* Map area */}
        <MapArea phase={phase} />

        {/* Installer card */}
        <InstallerCard />

        {/* Live updates */}
        <LiveUpdates phase={phase} />

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
  dateTitle: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },

  // Map simulation
  mapContainer: {
    height: 260,
    borderRadius: Radius.lg,
    marginBottom: Spacing.lg,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    // Green gradient simulation
    backgroundColor: '#E8F0E0',
  },
  housePin: {
    position: 'absolute',
    top: 80,
    alignSelf: 'center',
  },
  carIcon: {
    position: 'absolute',
    top: 100,
    left: 60,
  },
  mapBadge: {
    position: 'absolute',
    bottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
  },
  mapBadgeText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.white,
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

  // Installer card
  installerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  installerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0A3D1F',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  installerInitials: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.accentDark,
  },
  installerInfo: { flex: 1 },
  installerName: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },
  installerCompany: {
    fontSize: FontSize.md,
    color: Colors.textSec,
    marginTop: 1,
  },
  messageButton: {
    backgroundColor: Colors.accentSoft,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.sm,
  },
  messageButtonText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: Colors.accent,
  },

  // Timeline
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },
  timelineConnector: {
    position: 'absolute',
    left: 5,
    top: -Spacing.lg,
    width: 2,
    height: Spacing.lg,
  },
  timelineLeft: {
    width: 12,
    alignItems: 'center',
    marginRight: Spacing.md,
    paddingTop: 4,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  timelineRight: { flex: 1 },
  timelineTime: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textSec,
    marginBottom: 2,
  },
  timelineText: {
    fontSize: FontSize.base,
    color: Colors.text,
    lineHeight: 18,
  },
});
