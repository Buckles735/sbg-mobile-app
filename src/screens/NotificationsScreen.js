import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadows } from '../constants/theme';
import { DEMO } from '../constants/data';

// ─── NOTIFICATIONS DATA ─────────────────────────────────────
const NOTIFICATIONS = [
  {
    id: 1,
    icon: '🔔',
    iconBg: Colors.red,
    title: 'VIC Rebate Ending Soon',
    body: 'The Solar Victoria battery rebate closes 30 June. You may be eligible for up to $2,950 off your installation.',
    time: 'Today',
    unread: true,
  },
  {
    id: 2,
    icon: '📰',
    iconBg: Colors.blue,
    title: 'Feed-In Tariff Rate Changes',
    body: 'New feed-in tariff rates take effect from 1 July. See how this impacts your savings and VPP earnings.',
    time: 'Yesterday',
    unread: true,
  },
  {
    id: 3,
    icon: '🎙️',
    iconBg: '#7C4DFF',
    title: 'New Episode: Battery Myths Busted',
    body: 'Our latest podcast episode debunks the top 5 battery myths. Listen now — 24 min.',
    time: '2 days ago',
    unread: true,
  },
  {
    id: 4,
    icon: '💰',
    iconBg: Colors.accent,
    title: 'Summer Savings Report Ready',
    body: 'Your December–February energy report is ready. You saved $561 compared to the same period last year.',
    time: '3 days ago',
    unread: false,
  },
  {
    id: 5,
    icon: '🔌',
    iconBg: Colors.amber,
    title: 'EV Chargers Now Available',
    body: 'SBG now offers EV charger installation. Bundle with your battery for a discounted rate.',
    time: '1 week ago',
    unread: false,
  },
  {
    id: 6,
    icon: '⛈️',
    iconBg: Colors.amber,
    title: 'Blackout Warning — Storms',
    body: 'Severe storm warning for your area. Your blackout protection is active and your battery is at 94%.',
    time: '1 week ago',
    unread: false,
  },
];

const UNREAD_COUNT = NOTIFICATIONS.filter(n => n.unread).length;

// ─── MAIN NOTIFICATIONS SCREEN ──────────────────────────────
export default function NotificationsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Notifications</Text>
          {UNREAD_COUNT > 0 && (
            <View style={styles.headerBadge}>
              <Text style={styles.headerBadgeText}>{UNREAD_COUNT} new</Text>
            </View>
          )}
        </View>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {notifications.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.notificationCard, item.unread && styles.notificationCardUnread]}
            activeOpacity={0.7}
          >
            <View style={styles.notificationRow}>
              {/* Icon */}
              <View style={[styles.iconWrap, { backgroundColor: item.iconBg + '18' }]}>
                <Text style={styles.icon}>{item.icon}</Text>
              </View>

              {/* Content */}
              <View style={styles.notificationContent}>
                <View style={styles.notificationTitleRow}>
                  <Text style={[styles.notificationTitle, item.unread && styles.notificationTitleUnread]} numberOfLines={1}>
                    {item.title}
                  </Text>
                  {item.unread && <View style={styles.unreadDot} />}
                </View>
                <Text style={styles.notificationBody} numberOfLines={2}>{item.body}</Text>
                <Text style={styles.notificationTime}>{item.time}</Text>
              </View>
            </View>
          </TouchableOpacity>
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
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.text },
  headerBadge: {
    backgroundColor: Colors.red,
    borderRadius: Radius.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  headerBadgeText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.xl },

  // Notification card
  notificationCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  notificationCardUnread: {
    backgroundColor: '#FAFFFC',
    borderColor: Colors.accent + '40',
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  icon: {
    fontSize: 22,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  notificationTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
    flex: 1,
    marginRight: Spacing.sm,
  },
  notificationTitleUnread: {
    fontWeight: FontWeight.bold,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
  },
  notificationBody: {
    fontSize: FontSize.base,
    color: Colors.textSec,
    lineHeight: 19,
    marginBottom: Spacing.sm,
  },
  notificationTime: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
});
