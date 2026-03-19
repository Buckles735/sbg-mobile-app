import React, { useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  LayoutAnimation, Platform, UIManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadows } from '../constants/theme';
import { DEMO } from '../constants/data';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// ─── TOGGLE SWITCH ─────────────────────────────────────────
function Toggle({ value, onToggle, disabled }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onToggle}
      disabled={disabled}
      style={[
        styles.toggle,
        value ? styles.toggleOn : styles.toggleOff,
        disabled && styles.toggleDisabled,
      ]}
    >
      <View style={[
        styles.toggleThumb,
        value ? styles.toggleThumbOn : styles.toggleThumbOff,
      ]} />
    </TouchableOpacity>
  );
}

// ─── UPSELL CARD ───────────────────────────────────────────
function UpsellCard({ item, approved, onToggle }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(prev => !prev);
  }, []);

  const handleToggle = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onToggle();
  }, [onToggle]);

  return (
    <View style={[
      styles.upsellCard,
      approved && styles.upsellCardApproved,
      item.required && !approved && styles.upsellCardRequired,
    ]}>
      {/* Header row */}
      <View style={styles.upsellHeader}>
        <View style={[
          styles.upsellIcon,
          { backgroundColor: approved ? Colors.accentSoft : (item.required ? Colors.amberSoft : Colors.bg) },
        ]}>
          <Text style={{ fontSize: 20 }}>{item.icon}</Text>
        </View>
        <View style={styles.upsellInfo}>
          <View style={styles.upsellTitleRow}>
            <Text style={styles.upsellLabel}>{item.label}</Text>
            {item.required && (
              <View style={styles.requiredBadge}>
                <Text style={styles.requiredBadgeText}>Required</Text>
              </View>
            )}
          </View>
          <Text style={styles.upsellPrice}>{item.price}</Text>
        </View>
        <Toggle
          value={approved}
          onToggle={handleToggle}
          disabled={item.required && approved}
        />
      </View>

      {/* Approval status */}
      {approved && (
        <View style={styles.approvedBanner}>
          <Text style={styles.approvedIcon}>✓</Text>
          <Text style={styles.approvedText}>
            {item.required ? 'Required — included in your quote' : 'Added to your quote'}
          </Text>
        </View>
      )}

      {/* "Why do I need this?" expandable */}
      <TouchableOpacity
        style={styles.whyButton}
        onPress={toggleExpand}
        activeOpacity={0.6}
      >
        <Text style={styles.whyButtonText}>
          {expanded ? 'Hide details' : 'Why do I need this?'}
        </Text>
        <Text style={styles.whyChevron}>{expanded ? '▴' : '▾'}</Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.educationPanel}>
          <View style={styles.educationBar} />
          <Text style={styles.educationText}>{item.reason}</Text>
          {item.required && (
            <View style={styles.complianceNote}>
              <Text style={styles.complianceIcon}>⚠️</Text>
              <Text style={styles.complianceText}>
                This item is required for a safe, compliant installation. It cannot be removed from your quote.
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

// ─── QUOTE SUMMARY ─────────────────────────────────────────
function QuoteSummary({ approvals }) {
  const basePrice = DEMO.system.priceNum;
  const upsellTotal = DEMO.upsells.reduce((sum, item) => {
    return sum + (approvals[item.id] ? item.priceNum : 0);
  }, 0);
  const grandTotal = basePrice + upsellTotal;
  const approvedCount = Object.values(approvals).filter(Boolean).length;

  return (
    <View style={[styles.card, styles.summaryCard]}>
      <Text style={styles.summaryTitle}>Quote Summary</Text>

      {/* Base system */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryRowLeft}>
          <Text style={styles.summaryItemIcon}>☀️</Text>
          <Text style={styles.summaryItemLabel}>{DEMO.system.name}</Text>
        </View>
        <Text style={styles.summaryItemPrice}>{DEMO.system.price}</Text>
      </View>

      {/* Approved upsells */}
      {DEMO.upsells.map(item => approvals[item.id] ? (
        <View key={item.id} style={styles.summaryRow}>
          <View style={styles.summaryRowLeft}>
            <Text style={styles.summaryItemIcon}>{item.icon}</Text>
            <Text style={styles.summaryItemLabel}>{item.label}</Text>
          </View>
          <Text style={styles.summaryItemPrice}>{item.price}</Text>
        </View>
      ) : null)}

      {/* Divider */}
      <View style={styles.summaryDivider} />

      {/* Total */}
      <View style={styles.summaryTotalRow}>
        <Text style={styles.summaryTotalLabel}>Total</Text>
        <Text style={styles.summaryTotalPrice}>${grandTotal.toLocaleString()}</Text>
      </View>

      {approvedCount < DEMO.upsells.length && (
        <Text style={styles.summaryNote}>
          {DEMO.upsells.length - approvedCount} item{DEMO.upsells.length - approvedCount !== 1 ? 's' : ''} still pending your review
        </Text>
      )}
    </View>
  );
}

// ─── MAIN QUOTE SCREEN ─────────────────────────────────────
export default function QuoteScreen({ navigation }) {
  // Pre-approve required items
  const [approvals, setApprovals] = useState(() => {
    const initial = {};
    DEMO.upsells.forEach(item => {
      initial[item.id] = item.required;
    });
    return initial;
  });

  const toggleApproval = useCallback((id) => {
    setApprovals(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const allApproved = Object.values(approvals).every(Boolean);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Quote</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* System overview */}
        <View style={[styles.card, styles.systemCard]}>
          <View style={styles.systemHeader}>
            <Text style={{ fontSize: 28 }}>🔋</Text>
            <View style={styles.systemInfo}>
              <Text style={styles.systemName}>{DEMO.system.name}</Text>
              <Text style={styles.systemDetails}>{DEMO.system.panels} · {DEMO.system.capacity}</Text>
            </View>
            <Text style={styles.systemPrice}>{DEMO.system.price}</Text>
          </View>
          <View style={styles.systemMeta}>
            <View style={styles.systemMetaItem}>
              <Text style={styles.systemMetaIcon}>⭐</Text>
              <Text style={styles.systemMetaText}>{DEMO.installer.rating} rating</Text>
            </View>
            <View style={styles.systemMetaDot} />
            <View style={styles.systemMetaItem}>
              <Text style={styles.systemMetaIcon}>🔧</Text>
              <Text style={styles.systemMetaText}>{DEMO.installer.installs} installs</Text>
            </View>
            <View style={styles.systemMetaDot} />
            <View style={styles.systemMetaItem}>
              <Text style={styles.systemMetaIcon}>📅</Text>
              <Text style={styles.systemMetaText}>{DEMO.scheduledDate.split(',')[0]}</Text>
            </View>
          </View>
        </View>

        {/* Section heading */}
        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Additional Items</Text>
          <Text style={styles.sectionSubtitle}>Review each item and toggle to approve</Text>
        </View>

        {/* Upsell cards */}
        {DEMO.upsells.map(item => (
          <UpsellCard
            key={item.id}
            item={item}
            approved={approvals[item.id]}
            onToggle={() => toggleApproval(item.id)}
          />
        ))}

        {/* Quote summary */}
        <QuoteSummary approvals={approvals} />

        {/* Approve all CTA */}
        <TouchableOpacity
          style={[styles.ctaButton, allApproved && styles.ctaButtonComplete]}
          activeOpacity={0.85}
          onPress={() => {
            if (!allApproved) {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              const updated = {};
              DEMO.upsells.forEach(item => { updated[item.id] = true; });
              setApprovals(updated);
            }
          }}
        >
          <Text style={styles.ctaText}>
            {allApproved ? '✓  All Items Approved' : 'Approve All Items'}
          </Text>
        </TouchableOpacity>

        {allApproved && (
          <Text style={styles.ctaHint}>
            Your quote is confirmed. We'll see you on install day!
          </Text>
        )}

        {/* Bottom spacer */}
        <View style={{ height: Spacing.xxxl }} />
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
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: { padding: 4, width: 28 },
  backText: { fontSize: 28, color: Colors.text, fontWeight: '300' },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.text },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.xl },

  // Card base
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.sm,
  },

  // System overview card
  systemCard: {},
  systemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  systemInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  systemName: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  systemDetails: {
    fontSize: FontSize.md,
    color: Colors.textSec,
    marginTop: 2,
  },
  systemPrice: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.text,
  },
  systemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  systemMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  systemMetaIcon: { fontSize: 12 },
  systemMetaText: {
    fontSize: FontSize.sm,
    color: Colors.textSec,
  },
  systemMetaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.textMuted,
    marginHorizontal: Spacing.sm,
  },

  // Section heading
  sectionHeading: {
    marginBottom: Spacing.lg,
    marginTop: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  sectionSubtitle: {
    fontSize: FontSize.md,
    color: Colors.textMuted,
    marginTop: 2,
  },

  // Toggle switch
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    padding: 2,
    justifyContent: 'center',
  },
  toggleOn: { backgroundColor: Colors.accent },
  toggleOff: { backgroundColor: Colors.border },
  toggleDisabled: { opacity: 0.6 },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.white,
    ...Shadows.sm,
  },
  toggleThumbOn: { alignSelf: 'flex-end' },
  toggleThumbOff: { alignSelf: 'flex-start' },

  // Upsell card
  upsellCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  upsellCardApproved: {
    borderColor: Colors.accent,
    backgroundColor: '#FAFFFC',
  },
  upsellCardRequired: {
    borderColor: Colors.amber,
  },
  upsellHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upsellIcon: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  upsellInfo: { flex: 1 },
  upsellTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  upsellLabel: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  upsellPrice: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: Colors.textSec,
    marginTop: 1,
  },
  requiredBadge: {
    backgroundColor: Colors.amberSoft,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  requiredBadgeText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.amber,
  },

  // Approved banner
  approvedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.accentSoft,
    borderRadius: Radius.sm,
    gap: Spacing.sm,
  },
  approvedIcon: {
    fontSize: 14,
    color: Colors.accent,
    fontWeight: FontWeight.bold,
  },
  approvedText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
    color: Colors.accent,
  },

  // "Why do I need this?" button
  whyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.md,
    gap: 4,
  },
  whyButtonText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: Colors.blue,
  },
  whyChevron: {
    fontSize: 12,
    color: Colors.blue,
  },

  // Education panel
  educationPanel: {
    marginTop: Spacing.md,
    paddingLeft: Spacing.md,
  },
  educationBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.blue,
  },
  educationText: {
    fontSize: FontSize.base,
    color: Colors.textSec,
    lineHeight: 20,
  },
  complianceNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.amberSoft,
    borderRadius: Radius.sm,
    gap: Spacing.sm,
  },
  complianceIcon: { fontSize: 14, marginTop: 1 },
  complianceText: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.textSec,
    lineHeight: 18,
  },

  // Quote summary
  summaryCard: {
    marginTop: Spacing.sm,
  },
  summaryTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
  },
  summaryRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flex: 1,
  },
  summaryItemIcon: { fontSize: 16 },
  summaryItemLabel: {
    fontSize: FontSize.base,
    color: Colors.text,
    flex: 1,
  },
  summaryItemPrice: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
  },
  summaryTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryTotalLabel: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  summaryTotalPrice: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.accent,
  },
  summaryNote: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    marginTop: Spacing.sm,
  },

  // CTA button
  ctaButton: {
    backgroundColor: Colors.accent,
    borderRadius: Radius.md,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: Spacing.sm,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 6,
  },
  ctaButtonComplete: {
    backgroundColor: '#081A10',
  },
  ctaText: {
    color: Colors.white,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
  },
  ctaHint: {
    fontSize: FontSize.md,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});
