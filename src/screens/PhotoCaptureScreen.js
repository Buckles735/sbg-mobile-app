import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadows } from '../constants/theme';
import { PHOTO_STEPS } from '../constants/data';
import { useCamera } from '../hooks/useCamera';

export default function PhotoCaptureScreen({ navigation }) {
  const [step, setStep] = useState(0);
  const [photos, setPhotos] = useState([null, null, null, null, null]);
  const { cameraRef, permission, ensurePermission, photo, quality, isCapturing, isValidating, capture, reset } = useCamera();

  const currentStep = PHOTO_STEPS[step];
  const progress = (photos.filter(Boolean).length / 5) * 100;

  const handleCapture = useCallback(async () => {
    const result = await capture();
    if (!result) return;
  }, [capture]);

  const handleAccept = useCallback(() => {
    const newPhotos = [...photos];
    newPhotos[step] = { uri: photo.uri, quality: quality.score, step: currentStep.id };
    setPhotos(newPhotos);
    reset();

    if (step < 4) {
      setStep(step + 1);
    } else {
      // All photos done — navigate to home
      navigation.navigate('Main', { screen: 'Home' });
    }
  }, [photos, step, photo, quality, currentStep, reset, navigation]);

  const handleRetake = useCallback(() => {
    reset();
  }, [reset]);

  // Permission not yet granted
  if (!permission?.granted) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <Text style={styles.permissionIcon}>📷</Text>
        <Text style={styles.permissionTitle}>Camera Access</Text>
        <Text style={styles.permissionDesc}>
          We need your camera to photograph your switchboard, inverter, meter, and battery location.
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={ensurePermission}>
          <Text style={styles.permissionButtonText}>Enable Camera</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView edges={['top']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Photo Capture</Text>
        <Text style={styles.stepCounter}>{step + 1}/5</Text>
      </SafeAreaView>

      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      {/* Step indicators */}
      <View style={styles.stepRow}>
        {PHOTO_STEPS.map((s, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => { if (photos[i] || i <= step) { reset(); setStep(i); } }}
            style={[
              styles.stepDot,
              photos[i] ? styles.stepDone : i === step ? styles.stepActive : styles.stepPending,
            ]}
          >
            {photos[i] ? <Text style={styles.stepCheck}>✓</Text> : <Text style={styles.stepIcon}>{s.icon}</Text>}
          </TouchableOpacity>
        ))}
      </View>

      {/* Camera / Review */}
      <View style={styles.cameraContainer}>
        {photo && quality ? (
          // Review mode
          <View style={styles.reviewContainer}>
            <Image source={{ uri: photo.uri }} style={styles.reviewImage} resizeMode="cover" />

            {/* Quality overlay */}
            <View style={[styles.qualityOverlay, quality.passed ? styles.qualityPass : styles.qualityFail]}>
              <View style={[styles.qualityBadge, { backgroundColor: quality.passed ? Colors.accent : Colors.red }]}>
                <Text style={styles.qualityBadgeText}>{quality.passed ? '✓' : '✕'}</Text>
              </View>
              <Text style={styles.qualityTitle}>{quality.passed ? 'Photo Accepted' : 'Try Again'}</Text>
              <Text style={styles.qualitySubtitle}>
                {quality.passed ? 'Sharp & clear!' : 'Hold steady and ensure good lighting'}
              </Text>
            </View>

            {/* Quality metrics */}
            <View style={styles.metricsBar}>
              <View style={styles.metricsHeader}>
                <Text style={styles.metricsLabel}>Quality</Text>
                <Text style={[styles.metricsScore, { color: quality.passed ? Colors.accent : Colors.red }]}>
                  {Math.round(quality.score * 100)}%
                </Text>
              </View>
              <View style={styles.metricsRow}>
                {[
                  { l: 'Brightness', v: quality.brightness, ok: quality.brightnessOk },
                  { l: 'Sharpness', v: quality.sharpness, ok: quality.sharpnessOk },
                  { l: 'Contrast', v: quality.contrast, ok: quality.contrastOk },
                ].map((m, i) => (
                  <View key={i} style={styles.metricItem}>
                    <View style={[styles.metricDot, { backgroundColor: m.ok ? Colors.accent : Colors.red }]} />
                    <Text style={styles.metricValue}>{m.v}</Text>
                    <Text style={styles.metricLabel}>{m.l}</Text>
                  </View>
                ))}
              </View>

              {/* Action buttons */}
              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
                  <Text style={styles.retakeText}>↻ Retake</Text>
                </TouchableOpacity>
                {quality.passed && (
                  <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
                    <Text style={styles.acceptText}>{step < 4 ? 'Next →' : 'Complete ✓'}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        ) : (
          // Camera mode
          <View style={styles.cameraWrapper}>
            <CameraView
              ref={cameraRef}
              style={styles.camera}
              facing="back"
            />

            {/* Frame guide overlay */}
            <View style={styles.frameGuide}>
              <View style={styles.frameBorder}>
                {/* Corner markers */}
                <View style={[styles.corner, styles.cornerTL]} />
                <View style={[styles.corner, styles.cornerTR]} />
                <View style={[styles.corner, styles.cornerBL]} />
                <View style={[styles.corner, styles.cornerBR]} />
              </View>
            </View>

            {/* Validating overlay */}
            {(isCapturing || isValidating) && (
              <View style={styles.validatingOverlay}>
                <ActivityIndicator size="large" color={Colors.accent} />
                <Text style={styles.validatingText}>
                  {isCapturing ? 'Capturing...' : 'Validating image quality...'}
                </Text>
              </View>
            )}

            {/* Tip bar */}
            <View style={styles.tipBar}>
              <Text style={styles.tipIcon}>💡</Text>
              <Text style={styles.tipText}>{currentStep.tip}</Text>
            </View>

            {/* Capture controls */}
            <View style={styles.captureArea}>
              <Text style={styles.captureLabel}>{currentStep.label}</Text>
              <Text style={styles.captureDesc}>{currentStep.desc}</Text>
              <TouchableOpacity
                style={styles.captureButton}
                onPress={handleCapture}
                disabled={isCapturing || isValidating}
                activeOpacity={0.7}
              >
                <View style={styles.captureInner} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
    backgroundColor: Colors.white,
  },
  backButton: { padding: 4 },
  backText: { fontSize: 28, color: Colors.text, fontWeight: '300' },
  headerTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.text },
  stepCounter: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.accent },
  progressTrack: { height: 3, backgroundColor: Colors.border },
  progressFill: { height: '100%', backgroundColor: Colors.accent },
  stepRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
  },
  stepDot: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  stepDone: { backgroundColor: Colors.accentSoft, borderColor: Colors.accent },
  stepActive: { backgroundColor: Colors.white, borderColor: Colors.accent },
  stepPending: { backgroundColor: Colors.bg, borderColor: Colors.border },
  stepCheck: { color: Colors.accent, fontSize: 14, fontWeight: FontWeight.bold },
  stepIcon: { fontSize: 14 },

  // Camera
  cameraContainer: { flex: 1 },
  cameraWrapper: { flex: 1, position: 'relative' },
  camera: { flex: 1 },
  frameGuide: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  frameBorder: {
    width: '80%',
    height: '55%',
    borderWidth: 2,
    borderColor: 'rgba(0,200,83,0.45)',
    borderStyle: 'dashed',
    borderRadius: Radius.md,
    position: 'relative',
  },
  corner: { position: 'absolute', width: 20, height: 20, borderColor: Colors.accent },
  cornerTL: { top: -1, left: -1, borderTopWidth: 3, borderLeftWidth: 3, borderTopLeftRadius: 10 },
  cornerTR: { top: -1, right: -1, borderTopWidth: 3, borderRightWidth: 3, borderTopRightRadius: 10 },
  cornerBL: { bottom: -1, left: -1, borderBottomWidth: 3, borderLeftWidth: 3, borderBottomLeftRadius: 10 },
  cornerBR: { bottom: -1, right: -1, borderBottomWidth: 3, borderRightWidth: 3, borderBottomRightRadius: 10 },
  validatingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  validatingText: { color: 'rgba(255,255,255,0.7)', fontSize: FontSize.md, marginTop: Spacing.md },
  tipBar: {
    position: 'absolute',
    bottom: 100,
    left: Spacing.md,
    right: Spacing.md,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: Radius.sm,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tipIcon: { fontSize: 14 },
  tipText: { color: 'rgba(255,255,255,0.75)', fontSize: FontSize.xs, flex: 1, lineHeight: 16 },
  captureArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.lg,
    paddingBottom: 24,
    paddingTop: Spacing.lg,
    alignItems: 'center',
  },
  captureLabel: { color: Colors.white, fontSize: FontSize.lg, fontWeight: FontWeight.bold, marginBottom: 2 },
  captureDesc: { color: 'rgba(255,255,255,0.5)', fontSize: FontSize.xs, marginBottom: Spacing.md, textAlign: 'center' },
  captureButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 3,
    borderColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: Colors.accent,
  },

  // Review
  reviewContainer: { flex: 1, position: 'relative' },
  reviewImage: { flex: 1 },
  qualityOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qualityPass: { backgroundColor: 'rgba(0,200,83,0.1)' },
  qualityFail: { backgroundColor: 'rgba(244,67,54,0.1)' },
  qualityBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qualityBadgeText: { color: Colors.white, fontSize: 28, fontWeight: FontWeight.bold },
  qualityTitle: { color: Colors.white, fontSize: FontSize.xl, fontWeight: FontWeight.bold, marginTop: Spacing.md, textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 8 },
  qualitySubtitle: { color: 'rgba(255,255,255,0.8)', fontSize: FontSize.sm, marginTop: 4, textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 },
  metricsBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.75)',
    padding: Spacing.lg,
    paddingBottom: 28,
  },
  metricsHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.md },
  metricsLabel: { color: 'rgba(255,255,255,0.45)', fontSize: FontSize.xs, fontWeight: FontWeight.semibold, textTransform: 'uppercase', letterSpacing: 1 },
  metricsScore: { fontSize: FontSize.sm, fontFamily: 'monospace' },
  metricsRow: { flexDirection: 'row', gap: 16, marginBottom: Spacing.lg },
  metricItem: { alignItems: 'center', flex: 1 },
  metricDot: { width: 6, height: 6, borderRadius: 3, marginBottom: 4 },
  metricValue: { color: 'rgba(255,255,255,0.6)', fontSize: 10, fontFamily: 'monospace' },
  metricLabel: { color: 'rgba(255,255,255,0.3)', fontSize: 8 },
  actionRow: { flexDirection: 'row', gap: 10 },
  retakeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
  },
  retakeText: { color: Colors.white, fontSize: FontSize.md, fontWeight: FontWeight.semibold },
  acceptButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: Radius.sm,
    backgroundColor: Colors.accent,
    alignItems: 'center',
  },
  acceptText: { color: Colors.white, fontSize: FontSize.md, fontWeight: FontWeight.bold },

  // Permission screen
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xxxl,
    backgroundColor: Colors.white,
  },
  permissionIcon: { fontSize: 48, marginBottom: Spacing.xl },
  permissionTitle: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.text, marginBottom: Spacing.md },
  permissionDesc: { fontSize: FontSize.lg, color: Colors.textSec, textAlign: 'center', lineHeight: 22, marginBottom: Spacing.xxl },
  permissionButton: {
    backgroundColor: Colors.accent,
    borderRadius: Radius.md,
    paddingVertical: 14,
    paddingHorizontal: 40,
  },
  permissionButtonText: { color: Colors.white, fontSize: FontSize.xl, fontWeight: FontWeight.bold },
});
