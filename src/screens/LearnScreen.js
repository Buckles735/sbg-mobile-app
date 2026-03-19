import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadows } from '../constants/theme';
import { DEMO } from '../constants/data';

// ─── ARTICLES DATA ──────────────────────────────────────────
const ARTICLES = [
  {
    id: 'switchboard',
    icon: '⚡',
    title: 'Switchboard Upgrade',
    category: 'Installation',
    readTime: '3 min read',
    content: 'Your switchboard is the central hub that distributes electricity throughout your home. Older switchboards often lack spare circuit breaker slots needed for battery and solar connections.\n\nA switchboard upgrade typically involves replacing the existing board with a modern unit that has enough poles (circuit slots) to safely accommodate your new battery system, dedicated solar circuits, and any future additions like EV chargers.\n\nMost homes built before 2005 will require an upgrade. Signs you need one include ceramic fuses instead of circuit breakers, a lack of safety switches (RCDs), or a board that is physically full with no spare slots.\n\nThe upgrade is performed by a licensed electrician, usually on the same day as your battery installation. It ensures your home meets current Australian Standards (AS/NZS 3000) and is ready for a fully electric future.',
  },
  {
    id: 'blackout',
    icon: '🔋',
    title: 'Blackout Protection',
    category: 'Products',
    readTime: '2 min read',
    content: 'Blackout protection allows your battery to keep essential circuits running when the grid goes down. Without it, your battery will automatically shut off during an outage for safety reasons — even if it is fully charged.\n\nHow does it work? A changeover switch is installed at your switchboard. When the grid drops, the switch isolates your home from the grid and the battery takes over powering dedicated circuits. These typically include your fridge, lights, and selected power points.\n\nNot every circuit in your home will be backed up — the battery has a limited output, so your installer will work with you to choose the most important loads. High-draw appliances like ducted air conditioning or pool pumps are usually excluded.\n\nThe switchover happens automatically in seconds. When the grid returns, the system reconnects seamlessly.',
  },
  {
    id: 'bollards',
    icon: '🛡️',
    title: 'Bollards',
    category: 'Compliance',
    readTime: '2 min read',
    content: 'If your battery is being installed in a garage, Australian regulations require protective bollards to be installed in front of the unit. This is a safety measure to prevent vehicle impact damage to the battery.\n\nBollards are steel posts, typically 90mm in diameter, filled with concrete and anchored into the garage floor. They are positioned to create a protective barrier between your parked vehicle and the battery.\n\nThis requirement applies to all garage-mounted batteries in Australia, regardless of the battery brand or size. It is mandated by AS/NZS 5139 (the Australian Standard for the installation and safety requirements for battery systems).\n\nYour installer will handle the bollard installation as part of the overall job. The bollards are usually painted yellow for visibility and positioned with adequate clearance for battery maintenance access.',
  },
  {
    id: 'journey',
    icon: '🗺️',
    title: 'Installation Journey',
    category: 'Process',
    readTime: '5 min read',
    content: 'Your installation journey with SBG follows a structured process designed to keep you informed at every step.\n\nStep 1 — Scoping: After you place your order, our scoping team reviews your property photos and electrical details. They design the optimal system layout and identify any additional work needed (like switchboard upgrades or bollards).\n\nStep 2 — Scheduling: Once scoping is complete, our scheduling team books your installation date. You will receive a confirmed date and time window via SMS and email.\n\nStep 3 — Install Day: A licensed installer arrives at your home. The installation typically takes 4–8 hours depending on system size and complexity. The installer will walk you through the completed system before leaving.\n\nStep 4 — Commissioning: Your system is powered on and connected to your monitoring app. You will be able to see real-time energy production and battery status.\n\nStep 5 — Inspection: In some states (like Victoria), a post-installation safety inspection is required. This is handled by a third-party inspector and is separate from SBG.\n\nStep 6 — Ongoing Support: You have access to our support team, AI assistant, and monitoring tools for the life of your system.',
  },
  {
    id: 'savings',
    icon: '💰',
    title: 'Battery Savings',
    category: 'Energy',
    readTime: '3 min read',
    content: 'A home battery can significantly reduce your electricity bills by storing cheap solar energy during the day and using it at night when grid rates are highest.\n\nThe typical Australian household with solar panels exports around 60–70% of the energy they generate because nobody is home during the day to use it. A battery captures that exported energy and shifts it to evening peak hours.\n\nYour savings depend on several factors: your electricity tariff structure (flat rate vs. time-of-use), your daily energy consumption, the size of your solar system, and the battery capacity.\n\nOn average, a well-sized battery system can save between $150–$250 per month on electricity bills. Over the life of the battery (typically 10–15 years), this can add up to $25,000–$40,000 in total savings.\n\nAdditional revenue streams include Virtual Power Plant (VPP) programs, where your battery can earn credits by exporting stored energy back to the grid during peak demand events.',
  },
  {
    id: 'vic-inspection',
    icon: '📋',
    title: 'VIC Inspection',
    category: 'State-specific',
    readTime: '2 min read',
    content: 'If you are in Victoria, a post-installation electrical safety inspection is required by Energy Safe Victoria (ESV). This inspection is conducted by an independent, third-party Licensed Electrical Inspector (LEI) — not by SBG or your installer.\n\nAfter your installation is complete, SBG lodges an Electronic Notice of Completion (ENOC) with ESV. An inspector is then assigned to your job. Wait times vary from 1 to 6 weeks depending on your location and inspector availability.\n\nThe inspector will check that the electrical work complies with Australian Standards and issue a Certificate of Electrical Safety (COES). You do not need to arrange anything — the process is handled automatically.\n\nYour system is safe and legal to use while you wait for the inspection. The COES is a confirmation step, not an activation step. If the inspector identifies any issues, SBG will coordinate the rectification at no cost to you.',
  },
];

// ─── ARTICLE DETAIL VIEW ────────────────────────────────────
function ArticleDetail({ article, onBack }) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Learn</Text>
        <View style={{ width: 28 }} />
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Large icon */}
        <View style={styles.detailIconWrap}>
          <Text style={styles.detailIcon}>{article.icon}</Text>
        </View>

        {/* Title and meta */}
        <Text style={styles.detailTitle}>{article.title}</Text>
        <View style={styles.detailMeta}>
          <Text style={styles.detailCategory}>{article.category}</Text>
          <View style={styles.detailMetaDot} />
          <Text style={styles.detailReadTime}>{article.readTime}</Text>
        </View>

        {/* Content */}
        <Text style={styles.detailContent}>{article.content}</Text>

        {/* CTA */}
        <View style={styles.ctaBanner}>
          <Text style={styles.ctaBannerTitle}>Still have questions?</Text>
          <Text style={styles.ctaBannerText}>Our support team and AI assistant are here to help with anything related to {article.title.toLowerCase()}.</Text>
          <TouchableOpacity style={styles.ctaBannerButton} activeOpacity={0.7}>
            <Text style={styles.ctaBannerButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: Spacing.xxxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── MAIN LEARN SCREEN ──────────────────────────────────────
export default function LearnScreen({ navigation }) {
  const [selectedArticle, setSelectedArticle] = useState(null);

  if (selectedArticle) {
    return <ArticleDetail article={selectedArticle} onBack={() => setSelectedArticle(null)} />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Learn</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Knowledge Base</Text>
        <Text style={styles.sectionSubtitle}>Understand your system, installation, and energy</Text>

        {ARTICLES.map((article) => (
          <TouchableOpacity
            key={article.id}
            style={styles.articleCard}
            onPress={() => setSelectedArticle(article)}
            activeOpacity={0.7}
          >
            <View style={styles.articleIconWrap}>
              <Text style={styles.articleIcon}>{article.icon}</Text>
            </View>
            <View style={styles.articleInfo}>
              <Text style={styles.articleTitle}>{article.title}</Text>
              <View style={styles.articleMeta}>
                <Text style={styles.articleCategory}>{article.category}</Text>
                <View style={styles.articleMetaDot} />
                <Text style={styles.articleReadTime}>{article.readTime}</Text>
              </View>
            </View>
            <Text style={styles.articleArrow}>›</Text>
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

  // Article list card
  articleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  articleIconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  articleIcon: {
    fontSize: 22,
  },
  articleInfo: {
    flex: 1,
  },
  articleTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: 2,
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  articleCategory: {
    fontSize: FontSize.md,
    color: Colors.textSec,
  },
  articleMetaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.textMuted,
    marginHorizontal: Spacing.sm,
  },
  articleReadTime: {
    fontSize: FontSize.md,
    color: Colors.textMuted,
  },
  articleArrow: {
    fontSize: 20,
    color: Colors.textMuted,
    fontWeight: '300',
    marginLeft: Spacing.sm,
  },

  // Detail view
  detailIconWrap: {
    width: 72,
    height: 72,
    borderRadius: Radius.xl,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: Spacing.lg,
    ...Shadows.sm,
  },
  detailIcon: {
    fontSize: 36,
  },
  detailTitle: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  detailMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xxl,
  },
  detailCategory: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    color: Colors.blue,
  },
  detailMetaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.textMuted,
    marginHorizontal: Spacing.sm,
  },
  detailReadTime: {
    fontSize: FontSize.base,
    color: Colors.textMuted,
  },
  detailContent: {
    fontSize: FontSize.lg,
    color: Colors.textSec,
    lineHeight: 22,
    marginBottom: Spacing.xxl,
  },

  // CTA banner
  ctaBanner: {
    backgroundColor: Colors.accentSoft,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
  },
  ctaBannerTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  ctaBannerText: {
    fontSize: FontSize.base,
    color: Colors.textSec,
    lineHeight: 20,
    marginBottom: Spacing.lg,
  },
  ctaBannerButton: {
    backgroundColor: Colors.accent,
    borderRadius: Radius.sm,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  ctaBannerButtonText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
});
