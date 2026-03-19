import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadows } from '../constants/theme';
import { DEMO } from '../constants/data';

// ─── EPISODES DATA ──────────────────────────────────────────
const EPISODES = [
  {
    id: 1,
    type: 'podcast',
    title: 'Battery Myths Busted',
    duration: '24 min',
    date: '28 Feb',
    description: 'We debunk the top 5 myths about home batteries — from fire risk to lifespan concerns.',
  },
  {
    id: 2,
    type: 'video',
    title: 'How to Read Your Energy Bill',
    duration: '8 min',
    date: '22 Feb',
    description: 'A step-by-step guide to understanding every line on your electricity bill.',
  },
  {
    id: 3,
    type: 'video',
    title: 'Inside an SBG Installation',
    duration: '12 min',
    date: '15 Feb',
    description: 'Go behind the scenes with our install team to see a full battery installation from start to finish.',
  },
  {
    id: 4,
    type: 'podcast',
    title: 'Is Blackout Protection Worth It?',
    duration: '18 min',
    date: '8 Feb',
    description: 'We break down the costs, benefits, and real-world scenarios for blackout protection.',
  },
  {
    id: 5,
    type: 'video',
    title: 'Solar + Battery Savings Calculator',
    duration: '6 min',
    date: '1 Feb',
    description: 'Learn how to estimate your monthly savings with our free calculator tool.',
  },
  {
    id: 6,
    type: 'podcast',
    title: 'EV Charging at Home',
    duration: '22 min',
    date: '25 Jan',
    description: 'Everything you need to know about installing a home EV charger alongside your battery system.',
  },
];

const PURPLE = '#7C4DFF';
const PURPLE_SOFT = '#EDE7F6';
const RED_YT = '#FF0000';
const RED_YT_SOFT = '#FFEBEE';

// ─── MAIN MEDIA SCREEN ─────────────────────────────────────
export default function MediaScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Media</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Channel subscription buttons */}
        <View style={styles.channelRow}>
          <TouchableOpacity style={[styles.channelButton, { backgroundColor: RED_YT_SOFT }]} activeOpacity={0.7}>
            <Text style={styles.channelIcon}>▶️</Text>
            <View style={styles.channelInfo}>
              <Text style={[styles.channelName, { color: RED_YT }]}>YouTube</Text>
              <Text style={styles.channelAction}>Subscribe</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.channelButton, { backgroundColor: PURPLE_SOFT }]} activeOpacity={0.7}>
            <Text style={styles.channelIcon}>🎙️</Text>
            <View style={styles.channelInfo}>
              <Text style={[styles.channelName, { color: PURPLE }]}>Podcast</Text>
              <Text style={styles.channelAction}>Subscribe</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Section label */}
        <Text style={styles.sectionTitle}>Latest Episodes</Text>

        {/* Episode cards */}
        {EPISODES.map((episode) => {
          const isVideo = episode.type === 'video';
          const typeIcon = isVideo ? '▶️' : '🎙️';
          const typeBg = isVideo ? RED_YT_SOFT : PURPLE_SOFT;
          const typeColor = isVideo ? RED_YT : PURPLE;
          const typeLabel = isVideo ? 'Video' : 'Podcast';

          return (
            <TouchableOpacity key={episode.id} style={styles.episodeCard} activeOpacity={0.7}>
              <View style={styles.episodeRow}>
                {/* Type icon */}
                <View style={[styles.episodeIconWrap, { backgroundColor: typeBg }]}>
                  <Text style={styles.episodeIcon}>{typeIcon}</Text>
                </View>

                {/* Content */}
                <View style={styles.episodeContent}>
                  <View style={styles.episodeTypeRow}>
                    <Text style={[styles.episodeType, { color: typeColor }]}>{typeLabel}</Text>
                    <View style={styles.episodeMetaDot} />
                    <Text style={styles.episodeDuration}>{episode.duration}</Text>
                    <View style={styles.episodeMetaDot} />
                    <Text style={styles.episodeDate}>{episode.date}</Text>
                  </View>
                  <Text style={styles.episodeTitle}>{episode.title}</Text>
                  <Text style={styles.episodeDesc} numberOfLines={2}>{episode.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

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

  // Channel buttons
  channelRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xxl,
  },
  channelButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  channelIcon: {
    fontSize: 24,
  },
  channelInfo: {
    flex: 1,
  },
  channelName: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
  },
  channelAction: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    marginTop: 1,
  },

  // Section
  sectionTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },

  // Episode card
  episodeCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  episodeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  episodeIconWrap: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  episodeIcon: {
    fontSize: 22,
  },
  episodeContent: {
    flex: 1,
  },
  episodeTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  episodeType: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
  episodeMetaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.textMuted,
    marginHorizontal: Spacing.sm,
  },
  episodeDuration: {
    fontSize: FontSize.sm,
    color: Colors.textSec,
  },
  episodeDate: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  episodeTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: 2,
  },
  episodeDesc: {
    fontSize: FontSize.base,
    color: Colors.textSec,
    lineHeight: 19,
  },
});
