import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadows } from '../constants/theme';
import { DEMO } from '../constants/data';

// ─── ENERGY PROVIDERS ─────────────────────────────────────
const PROVIDERS = [
  { name: 'AGL' },
  { name: 'Origin Energy' },
  { name: 'Energy Australia' },
  { name: 'Red Energy' },
];

// ─── TAB TOGGLE ───────────────────────────────────────────
function TabToggle({ activeTab, onTabChange }) {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'upload' && styles.tabActive]}
        onPress={() => onTabChange('upload')}
        activeOpacity={0.7}
      >
        <Text style={[styles.tabText, activeTab === 'upload' && styles.tabTextActive]}>
          Upload Bill
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'auto' && styles.tabActive]}
        onPress={() => onTabChange('auto')}
        activeOpacity={0.7}
      >
        <Text style={[styles.tabText, activeTab === 'auto' && styles.tabTextActive]}>
          Auto-Connect
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── UPLOAD TAB ───────────────────────────────────────────
function UploadTab() {
  return (
    <View style={styles.uploadZone}>
      <Text style={styles.uploadIcon}>{'\uD83D\uDCE4'}</Text>
      <Text style={styles.uploadTitle}>Upload your energy bill</Text>
      <Text style={styles.uploadDesc}>
        We'll analyse your usage to optimise your battery settings and maximise savings.
      </Text>
      <TouchableOpacity style={styles.chooseFileButton} activeOpacity={0.7}>
        <Text style={styles.chooseFileText}>Choose File</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── AUTO-CONNECT TAB ─────────────────────────────────────
function AutoConnectTab() {
  return (
    <View>
      {/* CDR section */}
      <View style={styles.card}>
        <View style={styles.cdrHeader}>
          <Text style={{ fontSize: 24 }}>{'\uD83D\uDD17'}</Text>
          <View style={styles.cdrHeaderText}>
            <Text style={styles.cdrTitle}>Consumer Data Right</Text>
            <Text style={styles.cdrDesc}>
              Securely connect your energy provider to automatically import your usage data.
            </Text>
          </View>
        </View>

        {/* Provider buttons */}
        {PROVIDERS.map((provider, i) => (
          <TouchableOpacity key={i} style={styles.providerRow} activeOpacity={0.7}>
            <Text style={styles.providerName}>{provider.name}</Text>
            <Text style={styles.providerArrow}>{'\u203A'}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Security note */}
      <View style={styles.securityNote}>
        <Text style={{ fontSize: 14 }}>{'\uD83D\uDEE1\uFE0F'}</Text>
        <Text style={styles.securityText}>Your data is encrypted and never shared</Text>
      </View>
    </View>
  );
}

// ─── MAIN SCREEN ──────────────────────────────────────────
export default function EnergyScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('upload');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>{'\u2039'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Energy</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Tab toggle */}
        <TabToggle activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab content */}
        {activeTab === 'upload' ? <UploadTab /> : <AutoConnectTab />}

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

  // Tab toggle
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.border,
    borderRadius: Radius.sm,
    padding: 3,
    marginBottom: Spacing.xl,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderRadius: Radius.sm - 2,
  },
  tabActive: {
    backgroundColor: Colors.white,
    ...Shadows.sm,
  },
  tabText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: Colors.textMuted,
  },
  tabTextActive: {
    color: Colors.text,
  },

  // Upload zone
  uploadZone: {
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    borderRadius: Radius.lg,
    padding: Spacing.xxxl,
    alignItems: 'center',
  },
  uploadIcon: {
    fontSize: 40,
    marginBottom: Spacing.lg,
  },
  uploadTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  uploadDesc: {
    fontSize: FontSize.base,
    color: Colors.textSec,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.xl,
  },
  chooseFileButton: {
    backgroundColor: Colors.blue,
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.sm,
  },
  chooseFileText: {
    fontSize: FontSize.lg,
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

  // CDR section
  cdrHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  cdrHeaderText: { flex: 1 },
  cdrTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  cdrDesc: {
    fontSize: FontSize.base,
    color: Colors.textSec,
    lineHeight: 20,
  },

  // Provider rows
  providerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  providerName: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },
  providerArrow: {
    fontSize: 22,
    color: Colors.textMuted,
  },

  // Security note
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
  },
  securityText: {
    fontSize: FontSize.md,
    color: Colors.textMuted,
  },
});
