import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadows } from '../constants/theme';
import { DEMO } from '../constants/data';

const FINANCE_OPTIONS = [
  {
    icon: '☀️',
    name: 'Brighte',
    type: 'Green Loan',
    desc: 'Interest-free green loan for solar and battery systems. Repay over 24 months with no additional cost.',
    rate: '0% Interest',
    term: '24 months',
    repayment: '$624/mo',
    tag: 'MOST POPULAR',
    note: null,
    ctaPrimary: true,
  },
  {
    icon: '💚',
    name: 'Plenti',
    type: 'Green Personal Loan',
    desc: 'Competitive personal loan rates for renewable energy installations. Flexible terms to suit your budget.',
    rate: '6.99% p.a.',
    term: '36–84 months',
    repayment: 'From $230/mo',
    tag: null,
    note: null,
    ctaPrimary: false,
  },
  {
    icon: '🟡',
    name: 'Humm',
    type: 'Buy Now Pay Later',
    desc: 'Split the cost into 12 equal monthly payments with no interest charges on approved purchases.',
    rate: '0% Interest',
    term: '12 months',
    repayment: '$1,249/mo',
    tag: null,
    note: 'Max $30,000 limit',
    ctaPrimary: false,
  },
];

export default function BNPLScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Finance Options</Text>
        <View style={{ width: 28 }} />
      </View>
      <ScrollView style={styles.content} contentContainerStyle={styles.contentInner}>
        {/* Intro */}
        <Text style={styles.intro}>
          Pay for your {DEMO.system.price} system over time with flexible finance options. All providers below are pre-approved for your installation.
        </Text>

        {/* Finance Options */}
        {FINANCE_OPTIONS.map((option, idx) => (
          <View key={idx} style={[styles.card, Shadows.sm]}>
            <View style={styles.cardHeader}>
              <View style={styles.iconBox}>
                <Text style={{ fontSize: 22 }}>{option.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.nameRow}>
                  <Text style={styles.optionName}>{option.name}</Text>
                  {option.tag && (
                    <View style={styles.tag}>
                      <Text style={styles.tagText}>{option.tag}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.optionType}>{option.type}</Text>
              </View>
            </View>
            <Text style={styles.optionDesc}>{option.desc}</Text>

            {/* Stats Grid */}
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Rate</Text>
                <Text style={styles.statValue}>{option.rate}</Text>
              </View>
              <View style={[styles.statItem, styles.statCenter]}>
                <Text style={styles.statLabel}>Term</Text>
                <Text style={styles.statValue}>{option.term}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Repayment</Text>
                <Text style={styles.statValue}>{option.repayment}</Text>
              </View>
            </View>

            {/* Note */}
            {option.note && (
              <View style={styles.noteRow}>
                <Text style={styles.noteIcon}>⚠️</Text>
                <Text style={styles.noteText}>{option.note}</Text>
              </View>
            )}

            {/* CTA */}
            <TouchableOpacity
              style={option.ctaPrimary ? styles.ctaPrimary : styles.ctaSecondary}
              activeOpacity={0.7}
            >
              <Text style={option.ctaPrimary ? styles.ctaPrimaryText : styles.ctaSecondaryText}>
                Apply Now
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
  intro: {
    fontSize: FontSize.lg, color: Colors.textSec, lineHeight: 22, marginBottom: Spacing.xxl,
  },
  card: {
    backgroundColor: Colors.card, borderRadius: Radius.lg, padding: Spacing.lg,
    borderWidth: 1, borderColor: Colors.border, marginBottom: Spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md,
  },
  iconBox: {
    width: 44, height: 44, borderRadius: Radius.md, backgroundColor: Colors.bg,
    alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md,
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: Spacing.sm },
  optionName: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.text },
  optionType: { fontSize: FontSize.base, color: Colors.textSec, marginTop: 2 },
  tag: {
    backgroundColor: Colors.accentSoft, paddingHorizontal: Spacing.sm, paddingVertical: 2,
    borderRadius: Radius.sm,
  },
  tagText: { fontSize: FontSize.xs, fontWeight: FontWeight.bold, color: Colors.accent },
  optionDesc: {
    fontSize: FontSize.base, color: Colors.textSec, lineHeight: 20, marginBottom: Spacing.lg,
  },
  statsRow: {
    flexDirection: 'row', backgroundColor: Colors.bg, borderRadius: Radius.sm,
    paddingVertical: Spacing.md, paddingHorizontal: Spacing.md, marginBottom: Spacing.md,
  },
  statItem: { flex: 1 },
  statCenter: {
    borderLeftWidth: 1, borderRightWidth: 1, borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
  },
  statLabel: { fontSize: FontSize.sm, color: Colors.textMuted, marginBottom: 2 },
  statValue: { fontSize: FontSize.base, fontWeight: FontWeight.bold, color: Colors.text },
  noteRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.amberSoft,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: Radius.sm,
    marginBottom: Spacing.md,
  },
  noteIcon: { fontSize: 14, marginRight: Spacing.sm },
  noteText: { fontSize: FontSize.base, color: Colors.amber, fontWeight: FontWeight.medium, flex: 1 },
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
