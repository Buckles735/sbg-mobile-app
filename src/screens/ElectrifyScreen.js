import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadows } from '../constants/theme';
import { DEMO } from '../constants/data';

// ─── PRODUCTS DATA ──────────────────────────────────────────
const PRODUCTS = [
  {
    id: 'ev-charger',
    icon: '🔌',
    name: 'EV Charger',
    brand: 'Ocular · 7.4kW',
    description: 'Level 2 home charger with load balancing. Charges most EVs overnight using your solar and battery.',
    savings: 'Save ~$1,200/yr vs petrol',
    price: '$1,890',
    tag: 'POPULAR',
  },
  {
    id: 'induction',
    icon: '🍳',
    name: 'Induction Cooktop',
    brand: 'Bosch · 60cm',
    description: 'Replace your gas cooktop with an efficient induction model. Faster cooking, no indoor gas emissions.',
    savings: 'Save ~$180/yr vs gas',
    price: '$1,490',
    tag: null,
  },
  {
    id: 'heat-pump',
    icon: '🚿',
    name: 'Heat Pump Hot Water',
    brand: 'Reclaim · 315L',
    description: 'Heat pump hot water system that runs on solar during the day. Up to 5x more efficient than electric element.',
    savings: 'Save ~$650/yr vs electric HW',
    price: '$3,290',
    tag: 'BIGGEST SAVINGS',
  },
  {
    id: 'ac',
    icon: '❄️',
    name: 'Reverse Cycle AC',
    brand: 'Daikin · 7.1kW',
    description: 'Energy-efficient split system for heating and cooling. Pairs perfectly with your battery for off-peak use.',
    savings: 'Save ~$400/yr vs gas heating',
    price: '$2,490',
    tag: null,
  },
  {
    id: 'switchboard',
    icon: '⚡',
    name: 'Switchboard Upgrade',
    brand: 'Clipsal · 18-pole',
    description: 'Modern switchboard with spare capacity for all your electrification upgrades and future circuits.',
    savings: 'Enables all other upgrades',
    price: '$1,200',
    tag: 'FOUNDATION',
  },
  {
    id: 'battery-2',
    icon: '🔋',
    name: 'Additional Battery',
    brand: 'Alpha ESS · 13.3kWh',
    description: 'Double your storage capacity for full overnight coverage and maximum self-consumption.',
    savings: 'Save ~$190/mo extra',
    price: '$6,990',
    tag: null,
  },
];

// ─── PRODUCT CARD ───────────────────────────────────────────
function ProductCard({ product }) {
  return (
    <View style={styles.productCard}>
      {/* Header row */}
      <View style={styles.productHeader}>
        <View style={styles.productIconWrap}>
          <Text style={styles.productIcon}>{product.icon}</Text>
        </View>
        <View style={styles.productHeaderInfo}>
          <View style={styles.productTitleRow}>
            <Text style={styles.productName}>{product.name}</Text>
            {product.tag && (
              <View style={styles.productTag}>
                <Text style={styles.productTagText}>{product.tag}</Text>
              </View>
            )}
          </View>
          <Text style={styles.productBrand}>{product.brand}</Text>
        </View>
      </View>

      {/* Description */}
      <Text style={styles.productDesc}>{product.description}</Text>

      {/* Savings callout */}
      <View style={styles.savingsRow}>
        <Text style={styles.savingsIcon}>💚</Text>
        <Text style={styles.savingsText}>{product.savings}</Text>
      </View>

      {/* Price and CTA */}
      <View style={styles.productFooter}>
        <Text style={styles.productPrice}>{product.price}</Text>
        <TouchableOpacity style={styles.quoteButton} activeOpacity={0.7}>
          <Text style={styles.quoteButtonText}>Get a Quote</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── MAIN ELECTRIFY SCREEN ─────────────────────────────────
export default function ElectrifyScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Electrify</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Intro */}
        <View style={styles.introCard}>
          <Text style={styles.introTitle}>You're halfway there ⚡</Text>
          <Text style={styles.introText}>
            With solar and battery installed, you've taken the biggest step toward a fully electric home. These upgrades eliminate gas, reduce bills further, and future-proof your property.
          </Text>
        </View>

        {/* Products */}
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        <View style={{ height: Spacing.xxxl }} />
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

  // Intro card
  introCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    ...Shadows.sm,
  },
  introTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  introText: {
    fontSize: FontSize.lg,
    color: Colors.textSec,
    lineHeight: 22,
  },

  // Product card
  productCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  productHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  productIconWrap: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    backgroundColor: Colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  productIcon: {
    fontSize: 24,
  },
  productHeaderInfo: {
    flex: 1,
  },
  productTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flexWrap: 'wrap',
  },
  productName: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  productTag: {
    backgroundColor: Colors.accentSoft,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  productTagText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.accent,
  },
  productBrand: {
    fontSize: FontSize.md,
    color: Colors.textMuted,
    marginTop: 1,
  },
  productDesc: {
    fontSize: FontSize.base,
    color: Colors.textSec,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },

  // Savings
  savingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accentSoft,
    borderRadius: Radius.sm,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  savingsIcon: {
    fontSize: 14,
  },
  savingsText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: Colors.accent,
  },

  // Footer (price + CTA)
  productFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productPrice: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.text,
  },
  quoteButton: {
    backgroundColor: Colors.accent,
    borderRadius: Radius.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
  },
  quoteButtonText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
});
