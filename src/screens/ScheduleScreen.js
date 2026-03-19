import React, { useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  LayoutAnimation, Platform, UIManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadows } from '../constants/theme';
import { DEMO } from '../constants/data';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// ─── DATE DATA ─────────────────────────────────────────────
const DATES = [
  { day: 'Thu', date: '27', month: 'Mar', available: true },
  { day: 'Fri', date: '28', month: 'Mar', available: true },
  { day: 'Mon', date: '31', month: 'Mar', available: false },
  { day: 'Tue', date: '1', month: 'Apr', available: true },
  { day: 'Wed', date: '2', month: 'Apr', available: true },
  { day: 'Thu', date: '3', month: 'Apr', available: true },
  { day: 'Fri', date: '4', month: 'Apr', available: false },
];

const WINDOWS = [
  { id: 'am', label: 'Morning', time: '8:00 AM – 12:00 PM', icon: '🌅' },
  { id: 'pm', label: 'Afternoon', time: '12:00 PM – 4:00 PM', icon: '☀️' },
];

// ─── DATE PILL ─────────────────────────────────────────────
function DatePill({ item, index, selected, onSelect }) {
  const isSelected = selected === index;
  return (
    <TouchableOpacity
      activeOpacity={item.available ? 0.7 : 1}
      onPress={() => item.available && onSelect(index)}
      style={[
        styles.datePill,
        isSelected && styles.datePillSelected,
        !item.available && styles.datePillDisabled,
      ]}
    >
      <Text style={[
        styles.datePillDay,
        isSelected && styles.datePillDaySelected,
      ]}>{item.day}</Text>
      <Text style={[
        styles.datePillDate,
        isSelected && styles.datePillDateSelected,
        !item.available && styles.datePillDateDisabled,
      ]}>{item.date}</Text>
      <Text style={[
        styles.datePillMonth,
        isSelected && styles.datePillMonthSelected,
      ]}>{item.month}</Text>
    </TouchableOpacity>
  );
}

// ─── TIME WINDOW OPTION ────────────────────────────────────
function TimeWindow({ item, selected, onSelect }) {
  const isSelected = selected === item.id;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onSelect(item.id)}
      style={[
        styles.timeOption,
        isSelected && styles.timeOptionSelected,
      ]}
    >
      <Text style={styles.timeIcon}>{item.icon}</Text>
      <View style={styles.timeInfo}>
        <Text style={styles.timeLabel}>{item.label}</Text>
        <Text style={styles.timeRange}>{item.time}</Text>
      </View>
      <View style={[
        styles.radio,
        isSelected && styles.radioSelected,
      ]}>
        {isSelected && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );
}

// ─── INSTALLER PREVIEW ─────────────────────────────────────
function InstallerPreview() {
  return (
    <View style={styles.installerCard}>
      <View style={styles.installerAvatar}>
        <Text style={styles.installerInitials}>{DEMO.installer.initials}</Text>
      </View>
      <View style={styles.installerInfo}>
        <Text style={styles.installerName}>{DEMO.installer.name}</Text>
        <Text style={styles.installerCompany}>{DEMO.installer.company}</Text>
        <View style={styles.installerMeta}>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map(s => (
              <Text key={s} style={[styles.star, s <= 4 && styles.starFilled]}>★</Text>
            ))}
          </View>
          <Text style={styles.installerRating}>
            {DEMO.installer.rating} ({DEMO.installer.installs} installs)
          </Text>
        </View>
      </View>
    </View>
  );
}

// ─── CONFIRMATION VIEW ─────────────────────────────────────
function ConfirmationView({ selectedDate, selectedWindow }) {
  const date = DATES[selectedDate];
  const window = WINDOWS.find(w => w.id === selectedWindow);
  const dateLabel = `${date.day} ${date.date} ${date.month}`;

  return (
    <View style={styles.confirmationContainer}>
      <View style={styles.confirmationBadge}>
        <Text style={styles.confirmationCheck}>✓</Text>
      </View>
      <Text style={styles.confirmationTitle}>You're all set!</Text>
      <Text style={styles.confirmationSubtitle}>Installation confirmed for</Text>
      <Text style={styles.confirmationDate}>{dateLabel}</Text>
      <Text style={styles.confirmationWindow}>{window.time}</Text>
      <View style={styles.confirmationNote}>
        <Text style={styles.confirmationNoteIcon}>📧</Text>
        <Text style={styles.confirmationNoteText}>
          Calendar invite sent to your email. We'll send reminders as the date approaches.
        </Text>
      </View>
    </View>
  );
}

// ─── MAIN SCHEDULE SCREEN ──────────────────────────────────
export default function ScheduleScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedWindow, setSelectedWindow] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleSelectDate = useCallback((index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedDate(index);
    setSelectedWindow(null);
  }, []);

  const handleSelectWindow = useCallback((id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedWindow(id);
  }, []);

  const handleConfirm = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setConfirmed(true);
  }, []);

  if (confirmed) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <ConfirmationView selectedDate={selectedDate} selectedWindow={selectedWindow} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Choose Install Date</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro */}
        <Text style={styles.intro}>
          Your scoping is approved! Select an available date for your installation.
        </Text>

        {/* Date picker row */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dateRow}
        >
          {DATES.map((d, i) => (
            <DatePill
              key={i}
              item={d}
              index={i}
              selected={selectedDate}
              onSelect={handleSelectDate}
            />
          ))}
        </ScrollView>

        {/* Time window selector */}
        {selectedDate !== null && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferred Time</Text>
            {WINDOWS.map(w => (
              <TimeWindow
                key={w.id}
                item={w}
                selected={selectedWindow}
                onSelect={handleSelectWindow}
              />
            ))}
          </View>
        )}

        {/* Installer preview */}
        {selectedWindow !== null && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Installer</Text>
            <InstallerPreview />
          </View>
        )}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom CTA */}
      {selectedWindow !== null && (
        <View style={styles.ctaContainer}>
          <TouchableOpacity
            style={styles.ctaButton}
            activeOpacity={0.85}
            onPress={handleConfirm}
          >
            <Text style={styles.ctaText}>Confirm Installation</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

// ─── STYLES ────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },

  // Header
  header: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.xl },

  // Intro
  intro: {
    fontSize: FontSize.lg,
    color: Colors.textSec,
    lineHeight: 22,
    marginBottom: Spacing.xl,
  },

  // Date picker
  dateRow: {
    gap: Spacing.sm,
    paddingBottom: Spacing.xs,
    marginBottom: Spacing.xxl,
  },
  datePill: {
    minWidth: 62,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.lg,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    gap: 2,
  },
  datePillSelected: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  datePillDisabled: {
    opacity: 0.4,
    borderColor: '#F0F0F0',
  },
  datePillDay: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.textMuted,
  },
  datePillDaySelected: { color: 'rgba(255,255,255,0.7)' },
  datePillDate: {
    fontSize: 22,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  datePillDateSelected: { color: Colors.white },
  datePillDateDisabled: { color: Colors.textMuted },
  datePillMonth: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  datePillMonthSelected: { color: 'rgba(255,255,255,0.6)' },

  // Section
  section: { marginBottom: Spacing.xxl },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },

  // Time window
  timeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    marginBottom: Spacing.sm,
    gap: Spacing.lg,
  },
  timeOptionSelected: {
    backgroundColor: Colors.accentSoft,
    borderColor: Colors.accent,
  },
  timeIcon: { fontSize: 24 },
  timeInfo: { flex: 1 },
  timeLabel: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },
  timeRange: {
    fontSize: FontSize.base,
    color: Colors.textSec,
    marginTop: 1,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: Colors.accent,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.accent,
  },

  // Installer preview
  installerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    gap: Spacing.lg,
  },
  installerAvatar: {
    width: 52,
    height: 52,
    borderRadius: Radius.lg,
    backgroundColor: '#1A3D2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  installerInitials: {
    fontSize: 18,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
  installerInfo: { flex: 1 },
  installerName: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },
  installerCompany: {
    fontSize: FontSize.md,
    color: Colors.textSec,
    marginTop: 1,
  },
  installerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xs,
    gap: 6,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 1,
  },
  star: {
    fontSize: 12,
    color: '#E0E0E0',
  },
  starFilled: {
    color: Colors.amber,
  },
  installerRating: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },

  // CTA
  ctaContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.xl,
    paddingBottom: 32,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  ctaButton: {
    backgroundColor: Colors.accent,
    borderRadius: Radius.lg,
    paddingVertical: 17,
    alignItems: 'center',
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 6,
  },
  ctaText: {
    color: Colors.white,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
  },

  // Confirmation
  confirmationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xxxl,
    backgroundColor: Colors.white,
  },
  confirmationBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xxl,
  },
  confirmationCheck: {
    fontSize: 36,
    color: Colors.accent,
    fontWeight: FontWeight.bold,
  },
  confirmationTitle: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  confirmationSubtitle: {
    fontSize: FontSize.xl,
    color: Colors.textSec,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  confirmationDate: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    textAlign: 'center',
  },
  confirmationWindow: {
    fontSize: FontSize.lg,
    color: Colors.textSec,
    textAlign: 'center',
    marginTop: 2,
  },
  confirmationNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: Spacing.xxxl,
    padding: Spacing.lg,
    backgroundColor: Colors.bg,
    borderRadius: Radius.md,
    gap: Spacing.sm,
  },
  confirmationNoteIcon: { fontSize: 16, marginTop: 1 },
  confirmationNoteText: {
    flex: 1,
    fontSize: FontSize.base,
    color: Colors.textMuted,
    lineHeight: 20,
    textAlign: 'center',
  },
});
