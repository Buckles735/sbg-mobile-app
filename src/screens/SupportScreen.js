import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, LayoutAnimation, Platform, UIManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadows } from '../constants/theme';
import { DEMO } from '../constants/data';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// ─── FAQ DATA ───────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: 'My battery isn\'t charging',
    a: 'First, check the CT clamp is connected properly on your switchboard — it\'s the small sensor that clips around the main cable. If it\'s loose or misaligned, the battery can\'t measure energy flow correctly. Try restarting your inverter by switching it off at the isolator for 30 seconds, then turning it back on. If the issue persists after 10 minutes, raise a support ticket and we\'ll send a technician.',
  },
  {
    q: 'What is blackout protection?',
    a: 'Blackout protection allows your battery to power dedicated circuits in your home during a grid outage. During installation, specific circuits (usually lights, fridge, and power points) are wired back to the battery via a changeover switch. When the grid drops, the battery automatically isolates from the grid and powers those circuits. Without this add-on, your battery will shut down during an outage for safety reasons.',
  },
  {
    q: 'Why does my battery export at night?',
    a: 'This usually means your battery is set to "Grid Feed" mode instead of "Self-Use" mode. In Grid Feed mode, the battery may discharge to the grid during off-peak periods if your retailer offers a feed-in tariff. Switch to Self-Use mode in your inverter app to prioritise powering your home first. If you\'re on a VPP plan, this behaviour may be intentional — check your VPP settings.',
  },
  {
    q: 'VIC inspection — how long?',
    a: 'In Victoria, a post-installation electrical safety inspection is required by Energy Safe Victoria (ESV). This is conducted by a third-party inspector (not SBG). Typical wait times are 1–6 weeks depending on your area and inspector availability. You\'ll receive a Certificate of Electrical Safety (COES) once complete. Your system is safe to use while awaiting inspection.',
  },
  {
    q: 'How do I get a refund?',
    a: 'Under Australian Consumer Law (ACL), you have rights to a remedy if goods or services don\'t meet consumer guarantees. For cancellations before installation, contact your sales agent or raise a support ticket. For post-installation issues, we\'ll work to resolve the fault first. If a refund is warranted, email support@sbg.com.au or call 1300 123 456 with your order number.',
  },
];

// ─── ACTIVITY TIMELINE DATA ─────────────────────────────────
const TIMELINE = [
  { time: '2 Mar, 9:15 AM', agent: 'System', text: 'Ticket created — Battery not charging after 3pm' },
  { time: '2 Mar, 9:20 AM', agent: 'AI Assistant', text: 'Auto-diagnosed: Possible CT clamp misalignment. Recommended inverter restart.' },
  { time: '2 Mar, 11:45 AM', agent: 'Dean', text: 'Reviewed AI diagnosis. Confirmed CT clamp wiring needs inspection on-site.' },
  { time: '3 Mar, 2:30 PM', agent: 'Dean', text: 'Installer scheduled to check CT clamp wiring — appointment booked for 8 Mar.' },
  { time: '4 Mar, 8:00 AM', agent: 'System', text: 'SMS reminder sent to customer for upcoming technician visit.' },
];

// ─── FAQ ITEM COMPONENT ─────────────────────────────────────
function FAQItem({ item }) {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(prev => !prev);
  };

  return (
    <TouchableOpacity style={styles.faqItem} onPress={toggle} activeOpacity={0.7}>
      <View style={styles.faqHeader}>
        <Text style={styles.faqQuestion}>{item.q}</Text>
        <Text style={styles.faqChevron}>{expanded ? '▴' : '▾'}</Text>
      </View>
      {expanded && (
        <Text style={styles.faqAnswer}>{item.a}</Text>
      )}
    </TouchableOpacity>
  );
}

// ─── TICKET DETAIL VIEW ─────────────────────────────────────
function TicketDetail({ ticket, onBack }) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{ticket.id}</Text>
        <View style={{ width: 28 }} />
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Ticket metadata */}
        <View style={styles.card}>
          <Text style={styles.detailSubject}>{ticket.subject}</Text>
          <View style={styles.detailMeta}>
            <View style={styles.detailMetaRow}>
              <Text style={styles.detailMetaLabel}>Status</Text>
              <View style={[styles.statusBadge, ticket.status === 'resolved' ? styles.statusResolved : styles.statusInProgress]}>
                <Text style={[styles.statusText, ticket.status === 'resolved' ? styles.statusTextResolved : styles.statusTextInProgress]}>
                  {ticket.status === 'resolved' ? 'Resolved' : 'In Progress'}
                </Text>
              </View>
            </View>
            <View style={styles.detailMetaRow}>
              <Text style={styles.detailMetaLabel}>Priority</Text>
              <Text style={styles.detailMetaValue}>{ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}</Text>
            </View>
            <View style={styles.detailMetaRow}>
              <Text style={styles.detailMetaLabel}>Created</Text>
              <Text style={styles.detailMetaValue}>{ticket.created}</Text>
            </View>
            <View style={styles.detailMetaRow}>
              <Text style={styles.detailMetaLabel}>Agent</Text>
              <Text style={styles.detailMetaValue}>{ticket.agent}</Text>
            </View>
          </View>
        </View>

        {/* Latest Update */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Latest Update</Text>
          <View style={styles.latestUpdate}>
            <View style={styles.latestUpdateDot} />
            <Text style={styles.latestUpdateText}>{ticket.lastUpdate}</Text>
          </View>
        </View>

        {/* Activity Timeline */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Activity Timeline</Text>
          {TIMELINE.map((entry, index) => (
            <View key={index} style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View style={[
                  styles.timelineDot,
                  entry.agent === 'System' && { backgroundColor: Colors.textMuted },
                  entry.agent === 'AI Assistant' && { backgroundColor: Colors.blue },
                  entry.agent === 'Dean' && { backgroundColor: Colors.accent },
                ]} />
                {index < TIMELINE.length - 1 && <View style={styles.timelineLine} />}
              </View>
              <View style={styles.timelineContent}>
                <View style={styles.timelineHeader}>
                  <Text style={styles.timelineAgent}>{entry.agent}</Text>
                  <Text style={styles.timelineTime}>{entry.time}</Text>
                </View>
                <Text style={styles.timelineText}>{entry.text}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: Spacing.xxxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── MAIN SUPPORT SCREEN ────────────────────────────────────
export default function SupportScreen({ navigation }) {
  const [selectedTicket, setSelectedTicket] = useState(null);

  if (selectedTicket) {
    return <TicketDetail ticket={selectedTicket} onBack={() => setSelectedTicket(null)} />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Support</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Tickets Section */}
        <Text style={styles.sectionTitle}>Your Tickets</Text>
        <Text style={styles.sectionSubtitle}>Tap a ticket to view details and activity</Text>

        {DEMO.supportTickets.map((ticket) => (
          <TouchableOpacity
            key={ticket.id}
            style={styles.ticketCard}
            onPress={() => setSelectedTicket(ticket)}
            activeOpacity={0.7}
          >
            <View style={styles.ticketHeader}>
              <View style={[
                styles.ticketStatusDot,
                { backgroundColor: ticket.status === 'resolved' ? Colors.accent : Colors.amber },
              ]} />
              <Text style={styles.ticketId}>{ticket.id}</Text>
              <View style={[styles.statusBadge, ticket.status === 'resolved' ? styles.statusResolved : styles.statusInProgress]}>
                <Text style={[styles.statusText, ticket.status === 'resolved' ? styles.statusTextResolved : styles.statusTextInProgress]}>
                  {ticket.status === 'resolved' ? 'Resolved' : 'In Progress'}
                </Text>
              </View>
            </View>
            <Text style={styles.ticketSubject}>{ticket.subject}</Text>
            <Text style={styles.ticketUpdate}>{ticket.lastUpdate}</Text>
            <View style={styles.ticketFooter}>
              <Text style={styles.ticketMeta}>{ticket.created} · {ticket.agent}</Text>
              <Text style={styles.ticketArrow}>›</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* New Support Request */}
        <TouchableOpacity style={styles.newRequestButton} activeOpacity={0.7}>
          <Text style={styles.newRequestIcon}>+</Text>
          <Text style={styles.newRequestText}>New Support Request</Text>
        </TouchableOpacity>

        {/* FAQ Section */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <Text style={styles.sectionSubtitle}>Quick answers to common questions</Text>
        </View>

        {FAQ_ITEMS.map((item, index) => (
          <FAQItem key={index} item={item} />
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

  // Section
  sectionTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  sectionSubtitle: {
    fontSize: FontSize.md,
    color: Colors.textMuted,
    marginBottom: Spacing.lg,
  },

  // Card base
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.sm,
  },

  // Ticket card
  ticketCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  ticketHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  ticketStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  ticketId: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textSec,
    flex: 1,
  },
  ticketSubject: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  ticketUpdate: {
    fontSize: FontSize.base,
    color: Colors.textSec,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  ticketMeta: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  ticketArrow: {
    fontSize: 20,
    color: Colors.textMuted,
    fontWeight: '300',
  },

  // Status badge
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  statusResolved: {
    backgroundColor: Colors.accentSoft,
  },
  statusInProgress: {
    backgroundColor: Colors.amberSoft,
  },
  statusText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
  },
  statusTextResolved: {
    color: Colors.accent,
  },
  statusTextInProgress: {
    color: Colors.amber,
  },

  // New request button
  newRequestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blueSoft,
    borderRadius: Radius.md,
    paddingVertical: Spacing.lg,
    marginBottom: Spacing.xxl,
    gap: Spacing.sm,
  },
  newRequestIcon: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.blue,
  },
  newRequestText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.blue,
  },

  // FAQ section
  faqSection: {
    marginBottom: Spacing.sm,
  },
  faqItem: {
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    padding: Spacing.lg,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  faqQuestion: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
    flex: 1,
    marginRight: Spacing.md,
  },
  faqChevron: {
    fontSize: 14,
    color: Colors.textMuted,
  },
  faqAnswer: {
    fontSize: FontSize.base,
    color: Colors.textSec,
    lineHeight: 20,
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },

  // Detail view
  detailSubject: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  detailMeta: {
    gap: Spacing.md,
  },
  detailMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailMetaLabel: {
    fontSize: FontSize.base,
    color: Colors.textMuted,
  },
  detailMetaValue: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },

  // Latest update
  latestUpdate: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },
  latestUpdateDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.amber,
    marginTop: 6,
  },
  latestUpdateText: {
    fontSize: FontSize.base,
    color: Colors.textSec,
    lineHeight: 20,
    flex: 1,
  },

  // Timeline
  timelineItem: {
    flexDirection: 'row',
    marginTop: Spacing.lg,
  },
  timelineLeft: {
    alignItems: 'center',
    width: 20,
    marginRight: Spacing.md,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.textMuted,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: Colors.border,
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: Spacing.lg,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  timelineAgent: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  timelineTime: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  timelineText: {
    fontSize: FontSize.base,
    color: Colors.textSec,
    lineHeight: 20,
  },
});
