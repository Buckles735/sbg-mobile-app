import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadows } from '../constants/theme';
import { DEMO } from '../constants/data';

const WARRANTY_ITEMS = [
  {
    icon: '🔋',
    component: 'Alpha ESS 26.6kWh Battery',
    coverage: 'Capacity retention & manufacturing defects',
    term: '10 years',
    expires: 'Mar 2036',
    active: true,
  },
  {
    icon: '◫',
    component: 'Alpha ESS Hybrid Inverter',
    coverage: 'Component failure & firmware defects',
    term: '10 years',
    expires: 'Mar 2036',
    active: true,
  },
  {
    icon: '☀️',
    component: 'Solar Panels 6.6kW',
    coverage: 'Output degradation & performance warranty',
    term: '25 years',
    expires: 'Mar 2051',
    active: true,
  },
  {
    icon: '🔧',
    component: 'Installation Workmanship',
    coverage: 'Wiring, mounting & structural integrity',
    term: '5 years',
    expires: 'Mar 2031',
    active: true,
  },
];

export default function WarrantyScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Warranty</Text>
        <View style={{ width: 28 }} />
      </View>
      <ScrollView style={styles.content} contentContainerStyle={styles.contentInner}>
        {/* Status Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerIcon}>🛡️</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.bannerTitle}>Warranty Active</Text>
            <Text style={styles.bannerSub}>9 years 11 months remaining</Text>
          </View>
        </View>

        {/* Warranty Cards */}
        <Text style={styles.sectionLabel}>COVERAGE DETAILS</Text>
        {WARRANTY_ITEMS.map((item, idx) => (
          <View key={idx} style={[styles.card, Shadows.sm]}>
            <View style={styles.cardHeader}>
              <View style={styles.iconBox}>
                <Text style={{ fontSize: 18 }}>{item.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.componentName}>{item.component}</Text>
                <Text style={styles.coverageDesc}>{item.coverage}</Text>
              </View>
            </View>
            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Term</Text>
                <Text style={styles.detailValue}>{item.term}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Expires</Text>
                <Text style={styles.detailValue}>{item.expires}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Status</Text>
                <View style={styles.activeTag}>
                  <Text style={styles.activeTagText}>Active</Text>
                </View>
              </View>
            </View>
          </View>
        ))}

        {/* Download Button */}
        <TouchableOpacity style={styles.downloadButton} activeOpacity={0.7}>
          <Text style={styles.downloadIcon}>📄</Text>
          <Text style={styles.downloadText}>Download Warranty Certificates</Text>
        </TouchableOpacity>

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
  banner: {
    backgroundColor: Colors.accentSoft, borderRadius: Radius.lg, padding: Spacing.lg,
    flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.xxl,
    borderWidth: 1, borderColor: Colors.accent,
  },
  bannerIcon: { fontSize: 32, marginRight: Spacing.md },
  bannerTitle: {
    fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.accent,
  },
  bannerSub: { fontSize: FontSize.base, color: Colors.text, marginTop: 2 },
  sectionLabel: {
    fontSize: FontSize.xs, fontWeight: FontWeight.bold, color: Colors.textMuted,
    letterSpacing: 1, marginBottom: Spacing.md,
  },
  card: {
    backgroundColor: Colors.card, borderRadius: Radius.lg, padding: Spacing.lg,
    borderWidth: 1, borderColor: Colors.border, marginBottom: Spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.lg,
  },
  iconBox: {
    width: 40, height: 40, borderRadius: Radius.md, backgroundColor: Colors.bg,
    alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md,
  },
  componentName: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text },
  coverageDesc: { fontSize: FontSize.base, color: Colors.textSec, marginTop: 2 },
  detailsRow: {
    flexDirection: 'row', backgroundColor: Colors.bg, borderRadius: Radius.sm,
    paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md,
  },
  detailItem: { flex: 1 },
  detailLabel: { fontSize: FontSize.sm, color: Colors.textMuted, marginBottom: 2 },
  detailValue: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.text },
  activeTag: {
    backgroundColor: Colors.accentSoft, paddingHorizontal: Spacing.sm, paddingVertical: 2,
    borderRadius: Radius.sm, alignSelf: 'flex-start',
  },
  activeTagText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.accent },
  downloadButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.white, borderRadius: Radius.md, paddingVertical: Spacing.lg,
    borderWidth: 1, borderColor: Colors.border, marginTop: Spacing.sm,
  },
  downloadIcon: { fontSize: 18, marginRight: Spacing.sm },
  downloadText: { fontSize: FontSize.lg, fontWeight: FontWeight.semibold, color: Colors.text },
});
