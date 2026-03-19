import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadows } from '../constants/theme';
import { DEMO } from '../constants/data';

const TASKS = [
  {
    icon: '☀️',
    title: 'Solar Panel Clean',
    desc: 'Professional clean to remove dust, bird droppings and debris that reduce panel output by up to 20%.',
    frequency: 'Every 6 months',
    nextDate: 'Sep 2026',
    price: 'From $199',
    status: 'upcoming',
  },
  {
    icon: '🔋',
    title: 'Battery Health Check',
    desc: 'Diagnostic check of cell balance, charge cycles and thermal performance to ensure optimal battery life.',
    frequency: 'Annual',
    nextDate: 'Mar 2027',
    price: 'Free (warranty)',
    status: 'upcoming',
  },
  {
    icon: '◫',
    title: 'Inverter Firmware Update',
    desc: 'New firmware available with improved MPPT tracking and grid export optimisation for your Alpha ESS inverter.',
    frequency: 'As released',
    nextDate: 'Available now',
    price: 'Free',
    status: 'action',
  },
  {
    icon: '⚡',
    title: 'Switchboard Inspection',
    desc: 'Licensed electrician inspection of switchboard connections, circuit breakers and safety switches.',
    frequency: 'Every 5 years',
    nextDate: 'Mar 2031',
    price: 'From $150',
    status: 'upcoming',
  },
  {
    icon: '🏠',
    title: 'Gutter Clean + Roof Check',
    desc: 'Clear gutters and inspect roof mounting points, flashings and cable entry points around panel arrays.',
    frequency: 'Annual',
    nextDate: 'Nov 2026',
    price: 'From $249',
    status: 'upcoming',
  },
  {
    icon: '🌳',
    title: 'Tree Trimming',
    desc: 'Trim overhanging branches that may be causing shading on your solar array and reducing generation.',
    frequency: 'As needed',
    nextDate: '—',
    price: 'Quote required',
    status: 'info',
  },
];

export default function MaintenanceScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Maintenance</Text>
        <View style={{ width: 28 }} />
      </View>
      <ScrollView style={styles.content} contentContainerStyle={styles.contentInner}>
        {/* Intro */}
        <Text style={styles.intro}>
          Keep your {DEMO.system.name} system performing at its best with regular maintenance. We'll remind you when tasks are due.
        </Text>

        {/* Task Cards */}
        {TASKS.map((task, idx) => (
          <View key={idx} style={[styles.card, Shadows.sm]}>
            <View style={styles.cardTop}>
              <View style={styles.iconBox}>
                <Text style={{ fontSize: 18 }}>{task.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.titleRow}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  {task.status === 'action' && (
                    <View style={styles.actionTag}>
                      <Text style={styles.actionTagText}>ACTION</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
            <Text style={styles.taskDesc}>{task.desc}</Text>

            {/* Details Row */}
            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Frequency</Text>
                <Text style={styles.detailValue}>{task.frequency}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Next Due</Text>
                <Text style={[
                  styles.detailValue,
                  task.status === 'action' && { color: Colors.accent },
                ]}>{task.nextDate}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Price</Text>
                <Text style={styles.detailValue}>{task.price}</Text>
              </View>
            </View>

            {/* CTA */}
            {task.status === 'action' && (
              <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
                <Text style={styles.actionButtonText}>Update Now</Text>
              </TouchableOpacity>
            )}
            {task.status === 'upcoming' && (
              <TouchableOpacity style={styles.bookButton} activeOpacity={0.7}>
                <Text style={styles.bookButtonText}>Book Service</Text>
              </TouchableOpacity>
            )}
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
  cardTop: {
    flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm,
  },
  iconBox: {
    width: 40, height: 40, borderRadius: Radius.md, backgroundColor: Colors.bg,
    alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: Spacing.sm },
  taskTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text },
  actionTag: {
    backgroundColor: Colors.accentSoft, paddingHorizontal: Spacing.sm, paddingVertical: 2,
    borderRadius: Radius.sm,
  },
  actionTagText: { fontSize: FontSize.xs, fontWeight: FontWeight.bold, color: Colors.accent },
  taskDesc: {
    fontSize: FontSize.base, color: Colors.textSec, lineHeight: 20, marginBottom: Spacing.md,
  },
  detailsRow: {
    flexDirection: 'row', backgroundColor: Colors.bg, borderRadius: Radius.sm,
    paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md, marginBottom: Spacing.md,
  },
  detailItem: { flex: 1 },
  detailLabel: { fontSize: FontSize.sm, color: Colors.textMuted, marginBottom: 2 },
  detailValue: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.text },
  actionButton: {
    backgroundColor: Colors.accent, paddingVertical: Spacing.md, borderRadius: Radius.md,
    alignItems: 'center',
  },
  actionButtonText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white },
  bookButton: {
    backgroundColor: Colors.white, paddingVertical: Spacing.md, borderRadius: Radius.md,
    alignItems: 'center', borderWidth: 1, borderColor: Colors.border,
  },
  bookButtonText: { fontSize: FontSize.lg, fontWeight: FontWeight.semibold, color: Colors.text },
});
