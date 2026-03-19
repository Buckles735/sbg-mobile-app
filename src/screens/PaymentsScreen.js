import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadows } from '../constants/theme';
import { DEMO } from '../constants/data';

// ─── HERO CARD ────────────────────────────────────────────
function HeroCard() {
  const total = DEMO.system.priceNum;
  const paid = DEMO.payments.filter(p => p.status === 'paid').reduce((s, p) => s + p.amountNum, 0);
  const remaining = total - paid;
  const pct = Math.round((paid / total) * 100);

  return (
    <View style={styles.heroCard}>
      <Text style={styles.heroLabel}>Total Contract</Text>
      <Text style={styles.heroAmount}>${total.toLocaleString()}</Text>
      <View style={styles.heroProgressBar}>
        <View style={[styles.heroProgressFill, { width: `${pct}%` }]} />
      </View>
      <Text style={styles.heroSummary}>
        ${paid.toLocaleString()} paid · ${remaining.toLocaleString()} remaining
      </Text>
    </View>
  );
}

// ─── PAYMENT ROW ──────────────────────────────────────────
function PaymentRow({ payment, isLast }) {
  const isPaid = payment.status === 'paid';

  return (
    <View style={[styles.paymentRow, !isLast && styles.paymentRowBorder]}>
      <View style={[styles.statusIcon, { backgroundColor: isPaid ? Colors.accentSoft : Colors.amberSoft }]}>
        <Text style={{ fontSize: 14, color: isPaid ? Colors.accent : Colors.amber }}>
          {isPaid ? '✓' : '🕐'}
        </Text>
      </View>
      <View style={styles.paymentInfo}>
        <Text style={styles.paymentLabel}>{payment.label}</Text>
        <Text style={styles.paymentMeta}>
          {payment.date} · {payment.method}
        </Text>
      </View>
      <Text style={styles.paymentAmount}>{payment.amount}</Text>
    </View>
  );
}

// ─── MAIN SCREEN ──────────────────────────────────────────
export default function PaymentsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payments</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Dark hero */}
        <HeroCard />

        {/* Payment History */}
        <Text style={styles.sectionTitle}>Payment History</Text>
        <View style={styles.card}>
          {DEMO.payments.map((payment, i) => (
            <PaymentRow
              key={i}
              payment={payment}
              isLast={i === DEMO.payments.length - 1}
            />
          ))}
        </View>

        {/* CTA */}
        <TouchableOpacity style={styles.ctaButton} activeOpacity={0.8}>
          <Text style={styles.ctaText}>Pay Remaining Balance</Text>
        </TouchableOpacity>

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

  // Hero
  heroCard: {
    backgroundColor: '#081A10',
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    alignItems: 'center',
    ...Shadows.md,
  },
  heroLabel: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 0.5,
    marginBottom: Spacing.xs,
  },
  heroAmount: {
    fontSize: 36,
    fontWeight: FontWeight.extrabold,
    color: Colors.white,
    marginBottom: Spacing.lg,
  },
  heroProgressBar: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: Spacing.md,
  },
  heroProgressFill: {
    height: '100%',
    backgroundColor: Colors.accent,
    borderRadius: 4,
  },
  heroSummary: {
    fontSize: FontSize.md,
    color: 'rgba(255,255,255,0.5)',
  },

  // Section
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },

  // Card
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    ...Shadows.sm,
  },

  // Payment row
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  paymentRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  statusIcon: {
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
  paymentMeta: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    marginTop: 2,
  },
  paymentAmount: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    fontVariant: ['tabular-nums'],
  },

  // CTA
  ctaButton: {
    backgroundColor: Colors.accent,
    borderRadius: Radius.md,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
    ...Shadows.sm,
  },
  ctaText: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
});
