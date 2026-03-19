import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadows } from '../constants/theme';
import { DEMO } from '../constants/data';

// ─── STATUS BADGE ──────────────────────────────────────────
function StatusBadge({ label, color, bgColor }) {
  return (
    <View style={[styles.statusBadge, { backgroundColor: bgColor }]}>
      <View style={[styles.statusDot, { backgroundColor: color }]} />
      <Text style={[styles.statusBadgeText, { color }]}>{label}</Text>
    </View>
  );
}

// ─── STAFF TIMELINE ────────────────────────────────────────
function StaffTimeline() {
  const steps = [
    { ...DEMO.staff[0], status: 'complete', date: '8 Mar', action: 'Quote approved' },
    { ...DEMO.staff[1], status: 'complete', date: '12 Mar', action: 'Scoping complete' },
    { ...DEMO.staff[2], status: 'active', date: '18 Mar', action: 'Scheduling install' },
    { ...DEMO.staff[3], status: 'pending', date: '27 Mar', action: 'Installation day' },
  ];

  return (
    <View style={[styles.card, styles.timelineCard]}>
      <Text style={styles.cardTitle}>Your Team</Text>
      <Text style={styles.cardSubtitle}>Every person working on your install</Text>
      {steps.map((step, i) => (
        <View key={i} style={styles.timelineRow}>
          {/* Vertical connector line */}
          <View style={styles.timelineTrack}>
            {i > 0 && (
              <View style={[
                styles.timelineLine,
                { backgroundColor: step.status === 'pending' ? Colors.border : Colors.accent },
              ]} />
            )}
            <View style={[
              styles.timelineNode,
              step.status === 'complete' && styles.timelineNodeComplete,
              step.status === 'active' && styles.timelineNodeActive,
              step.status === 'pending' && styles.timelineNodePending,
            ]}>
              {step.status === 'complete' ? (
                <Text style={styles.timelineCheck}>✓</Text>
              ) : (
                <Text style={[
                  styles.timelineInitials,
                  { color: step.status === 'active' ? Colors.accent : Colors.textMuted },
                ]}>{step.initials}</Text>
              )}
            </View>
          </View>

          {/* Content */}
          <View style={styles.timelineContent}>
            <View style={styles.timelineHeader}>
              <Text style={[
                styles.timelineName,
                step.status === 'pending' && { color: Colors.textMuted },
              ]}>{step.name}</Text>
              <Text style={styles.timelineDate}>{step.date}</Text>
            </View>
            <Text style={styles.timelineRole}>{step.role}</Text>
            <Text style={[
              styles.timelineAction,
              step.status === 'active' && { color: Colors.accent },
            ]}>{step.action}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

// ─── PAYMENT TRACKER ───────────────────────────────────────
function PaymentTracker({ onViewAll }) {
  const paid = DEMO.payments.filter(p => p.status === 'paid');
  const paidTotal = paid.reduce((sum, p) => sum + p.amountNum, 0);
  const total = DEMO.system.priceNum;
  const progress = paidTotal / total;

  return (
    <View style={[styles.card]}>
      <View style={styles.cardTitleRow}>
        <Text style={styles.cardTitle}>Payments</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.linkText}>View all</Text>
        </TouchableOpacity>
      </View>

      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
        <View style={styles.progressLabels}>
          <Text style={styles.progressPaid}>${paidTotal.toLocaleString()} paid</Text>
          <Text style={styles.progressTotal}>{DEMO.system.price} total</Text>
        </View>
      </View>

      {/* Payment items */}
      {DEMO.payments.map((payment, i) => (
        <View key={i} style={[styles.paymentRow, i < DEMO.payments.length - 1 && styles.paymentRowBorder]}>
          <View style={[
            styles.paymentIcon,
            { backgroundColor: payment.status === 'paid' ? Colors.accentSoft : Colors.amberSoft },
          ]}>
            <Text style={{ fontSize: 14 }}>{payment.status === 'paid' ? '✓' : '⏳'}</Text>
          </View>
          <View style={styles.paymentInfo}>
            <Text style={styles.paymentLabel}>{payment.label}</Text>
            <Text style={styles.paymentMethod}>{payment.method}</Text>
          </View>
          <View style={styles.paymentRight}>
            <Text style={styles.paymentAmount}>{payment.amount}</Text>
            <Text style={[
              styles.paymentStatus,
              { color: payment.status === 'paid' ? Colors.accent : Colors.amber },
            ]}>{payment.status === 'paid' ? 'Paid' : 'Pending'}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

// ─── UPSELL ALERT ──────────────────────────────────────────
function UpsellAlert({ onPress }) {
  const required = DEMO.upsells.filter(u => u.required);
  const optional = DEMO.upsells.filter(u => !u.required);

  return (
    <TouchableOpacity style={[styles.card, styles.upsellCard]} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.upsellHeader}>
        <View style={styles.upsellBadge}>
          <Text style={styles.upsellBadgeText}>{DEMO.upsells.length}</Text>
        </View>
        <View style={styles.upsellHeaderText}>
          <Text style={styles.upsellTitle}>Items need your review</Text>
          <Text style={styles.upsellSubtitle}>
            {required.length} required · {optional.length} optional upgrade{optional.length !== 1 ? 's' : ''}
          </Text>
        </View>
        <Text style={styles.upsellArrow}>›</Text>
      </View>

      {/* Quick preview of items */}
      <View style={styles.upsellItems}>
        {DEMO.upsells.map((item, i) => (
          <View key={i} style={styles.upsellItem}>
            <Text style={styles.upsellItemIcon}>{item.icon}</Text>
            <Text style={styles.upsellItemLabel} numberOfLines={1}>{item.label}</Text>
            {item.required && (
              <View style={styles.requiredTag}>
                <Text style={styles.requiredTagText}>Required</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

// ─── QUICK ACTIONS ─────────────────────────────────────────
function QuickActions({ navigation }) {
  const actions = [
    { icon: '📋', label: 'Quote', screen: 'Quote', color: Colors.blueSoft },
    { icon: '📅', label: 'Schedule', tab: 'Schedule', color: Colors.accentSoft },
    { icon: '💬', label: 'Messages', tab: 'Chat', color: '#F3E5F5' },
    { icon: '🎓', label: 'Learn', screen: 'Learn', color: Colors.amberSoft },
    { icon: '🔧', label: 'Support', screen: 'Support', color: Colors.redSoft },
    { icon: '⚡', label: 'Energy', screen: 'Energy', color: '#E8F5E9' },
  ];

  return (
    <View style={styles.quickGrid}>
      {actions.map((action, i) => (
        <TouchableOpacity
          key={i}
          style={styles.quickAction}
          activeOpacity={0.7}
          onPress={() => {
            if (action.tab) {
              navigation.navigate(action.tab);
            } else {
              navigation.navigate(action.screen);
            }
          }}
        >
          <View style={[styles.quickIcon, { backgroundColor: action.color }]}>
            <Text style={{ fontSize: 22 }}>{action.icon}</Text>
          </View>
          <Text style={styles.quickLabel}>{action.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ─── INSTALL COUNTDOWN ─────────────────────────────────────
function InstallCountdown() {
  // Calculate days until install (27 March)
  const installDate = new Date(2025, 2, 27);
  const today = new Date();
  const diffMs = installDate - today;
  const daysLeft = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

  return (
    <View style={[styles.card, styles.countdownCard]}>
      <View style={styles.countdownLeft}>
        <Text style={styles.countdownNumber}>{daysLeft > 0 ? daysLeft : '8'}</Text>
        <Text style={styles.countdownUnit}>days</Text>
      </View>
      <View style={styles.countdownRight}>
        <Text style={styles.countdownTitle}>Until Installation</Text>
        <Text style={styles.countdownDate}>{DEMO.scheduledDate}</Text>
        <Text style={styles.countdownWindow}>{DEMO.scheduledWindow}</Text>
        <View style={styles.countdownInstaller}>
          <View style={[styles.installerAvatar, { backgroundColor: '#00BFA5' }]}>
            <Text style={styles.installerInitials}>{DEMO.installer.initials}</Text>
          </View>
          <Text style={styles.installerName}>{DEMO.installer.name} · {DEMO.installer.company}</Text>
        </View>
      </View>
    </View>
  );
}

// ─── SAVINGS SNAPSHOT ──────────────────────────────────────
function SavingsSnapshot() {
  return (
    <View style={[styles.card, styles.savingsCard]}>
      <Text style={styles.savingsLabel}>Estimated savings</Text>
      <View style={styles.savingsRow}>
        <View style={styles.savingsStat}>
          <Text style={styles.savingsValue}>${DEMO.savings.monthly}</Text>
          <Text style={styles.savingsUnit}>/month</Text>
        </View>
        <View style={styles.savingsDivider} />
        <View style={styles.savingsStat}>
          <Text style={styles.savingsValue}>${DEMO.savings.annual.toLocaleString()}</Text>
          <Text style={styles.savingsUnit}>/year</Text>
        </View>
        <View style={styles.savingsDivider} />
        <View style={styles.savingsStat}>
          <Text style={styles.savingsValue}>{DEMO.savings.payback}</Text>
          <Text style={styles.savingsUnit}>payback</Text>
        </View>
      </View>
    </View>
  );
}

// ─── MAIN HOME SCREEN ──────────────────────────────────────
export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hi {DEMO.customer.name} 👋</Text>
          <Text style={styles.systemName}>{DEMO.system.name}</Text>
        </View>
        <TouchableOpacity
          style={styles.notifButton}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Text style={{ fontSize: 18 }}>🔔</Text>
          <View style={styles.notifDot} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Install countdown hero */}
        <InstallCountdown />

        {/* Upsell alert */}
        <UpsellAlert onPress={() => navigation.navigate('Quote')} />

        {/* Quick actions grid */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <QuickActions navigation={navigation} />

        {/* Payment tracker */}
        <PaymentTracker onViewAll={() => navigation.navigate('Payments')} />

        {/* Savings snapshot */}
        <SavingsSnapshot />

        {/* Staff attribution timeline */}
        <StaffTimeline />

        {/* Bottom spacer for tab bar */}
        <View style={{ height: Spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── STYLES ────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  greeting: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  systemName: {
    fontSize: FontSize.md,
    color: Colors.textSec,
    marginTop: 2,
  },
  notifButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.red,
    borderWidth: 1.5,
    borderColor: Colors.bg,
  },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.xl },

  // Section
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
    marginBottom: Spacing.md,
    marginTop: Spacing.sm,
  },

  // Card base
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
  },
  cardSubtitle: {
    fontSize: FontSize.md,
    color: Colors.textMuted,
    marginTop: 2,
    marginBottom: Spacing.lg,
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  linkText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: Colors.accent,
  },

  // Status badge
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Radius.full,
    gap: 4,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusBadgeText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold },

  // Install countdown
  countdownCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#081A10',
  },
  countdownLeft: {
    width: 72,
    height: 72,
    borderRadius: Radius.lg,
    backgroundColor: 'rgba(0,200,83,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.lg,
  },
  countdownNumber: {
    fontSize: 28,
    fontWeight: FontWeight.extrabold,
    color: Colors.accentDark,
    lineHeight: 32,
  },
  countdownUnit: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.accentDark,
    marginTop: -2,
  },
  countdownRight: { flex: 1 },
  countdownTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
  countdownDate: {
    fontSize: FontSize.md,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },
  countdownWindow: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 1,
  },
  countdownInstaller: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
    gap: 6,
  },
  installerAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  installerInitials: {
    fontSize: 9,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
  installerName: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.5)',
  },

  // Upsell alert
  upsellCard: {
    borderWidth: 1,
    borderColor: Colors.amber,
    backgroundColor: Colors.amberSoft,
  },
  upsellHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upsellBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.amber,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  upsellBadgeText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
  upsellHeaderText: { flex: 1 },
  upsellTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  upsellSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSec,
    marginTop: 1,
  },
  upsellArrow: {
    fontSize: 22,
    color: Colors.textMuted,
    fontWeight: FontWeight.light,
  },
  upsellItems: {
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  upsellItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  upsellItemIcon: { fontSize: 16 },
  upsellItemLabel: {
    fontSize: FontSize.base,
    color: Colors.text,
    flex: 1,
  },
  requiredTag: {
    backgroundColor: 'rgba(255,152,0,0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  requiredTagText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.amber,
  },

  // Quick actions
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  quickAction: {
    width: '30%',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  quickIcon: {
    width: 52,
    height: 52,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.textSec,
  },

  // Payment tracker
  progressContainer: { marginBottom: Spacing.lg },
  progressBar: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.accent,
    borderRadius: 3,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
  },
  progressPaid: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.accent,
  },
  progressTotal: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  paymentRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  paymentIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  paymentInfo: { flex: 1 },
  paymentLabel: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },
  paymentMethod: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    marginTop: 1,
  },
  paymentRight: { alignItems: 'flex-end' },
  paymentAmount: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  paymentStatus: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    marginTop: 1,
  },

  // Savings
  savingsCard: {
    backgroundColor: Colors.accentSoft,
  },
  savingsLabel: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.accent,
    marginBottom: Spacing.md,
  },
  savingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  savingsStat: { alignItems: 'center', flex: 1 },
  savingsValue: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  savingsUnit: {
    fontSize: FontSize.sm,
    color: Colors.textSec,
    marginTop: 1,
  },
  savingsDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(0,200,83,0.2)',
  },

  // Staff timeline
  timelineCard: {},
  timelineRow: {
    flexDirection: 'row',
    minHeight: 64,
  },
  timelineTrack: {
    width: 40,
    alignItems: 'center',
  },
  timelineLine: {
    width: 2,
    height: 16,
    marginBottom: -1,
  },
  timelineNode: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  timelineNodeComplete: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  timelineNodeActive: {
    backgroundColor: Colors.accentSoft,
    borderColor: Colors.accent,
  },
  timelineNodePending: {
    backgroundColor: Colors.bg,
    borderColor: Colors.border,
  },
  timelineCheck: {
    fontSize: 14,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
  timelineInitials: {
    fontSize: 10,
    fontWeight: FontWeight.bold,
  },
  timelineContent: {
    flex: 1,
    paddingLeft: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timelineName: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },
  timelineDate: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  timelineRole: {
    fontSize: FontSize.sm,
    color: Colors.textSec,
    marginTop: 1,
  },
  timelineAction: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    marginTop: 2,
  },
});
