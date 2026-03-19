import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadows } from '../constants/theme';
import { DEMO } from '../constants/data';

// ─── MENU ITEMS ───────────────────────────────────────────
const MENU_ITEMS = [
  { icon: '\uD83D\uDD0B', label: 'My System', subtitle: DEMO.system.name },
  { icon: '\uD83D\uDEE1\uFE0F', label: 'Warranty', subtitle: '10-year coverage' },
  { icon: '\uD83D\uDCC4', label: 'Documents', subtitle: 'Invoices, certificates' },
  { icon: '\uD83C\uDF81', label: 'Referrals', subtitle: 'Earn $500 per referral' },
  { icon: '\uD83D\uDCAC', label: 'Support', subtitle: 'Chat or call us' },
];

// ─── MENU ROW ─────────────────────────────────────────────
function MenuRow({ item, isLast }) {
  return (
    <TouchableOpacity
      style={[styles.menuRow, !isLast && styles.menuRowBorder]}
      activeOpacity={0.6}
    >
      <Text style={styles.menuIcon}>{item.icon}</Text>
      <View style={styles.menuInfo}>
        <Text style={styles.menuLabel}>{item.label}</Text>
        <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
      </View>
      <Text style={styles.menuArrow}>{'\u203A'}</Text>
    </TouchableOpacity>
  );
}

// ─── MAIN SCREEN ──────────────────────────────────────────
export default function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header (tab screen — no back button) */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarInitials}>SM</Text>
          </View>
          <Text style={styles.profileName}>
            {DEMO.customer.name} {DEMO.customer.lastName}
          </Text>
          <Text style={styles.profileAddress}>{DEMO.customer.address}</Text>
        </View>

        {/* Menu items */}
        <View style={styles.card}>
          {MENU_ITEMS.map((item, i) => (
            <MenuRow key={i} item={item} isLast={i === MENU_ITEMS.length - 1} />
          ))}
        </View>

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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.xl },

  // Avatar section
  avatarSection: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#0A3D1F',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  avatarInitials: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.bold,
    color: Colors.accentDark,
  },
  profileName: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  profileAddress: {
    fontSize: FontSize.base,
    color: Colors.textSec,
    textAlign: 'center',
  },

  // Card
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    ...Shadows.sm,
  },

  // Menu row
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  menuRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuIcon: {
    fontSize: 22,
    marginRight: Spacing.md,
    width: 28,
    textAlign: 'center',
  },
  menuInfo: { flex: 1 },
  menuLabel: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },
  menuSubtitle: {
    fontSize: FontSize.md,
    color: Colors.textSec,
    marginTop: 1,
  },
  menuArrow: {
    fontSize: 22,
    color: Colors.textMuted,
    fontWeight: FontWeight.regular,
  },
});
