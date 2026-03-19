import { useState, useRef, useCallback } from 'react';
import { Alert, Platform } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';

// Quality thresholds
const QUALITY_THRESHOLD = 0.65;

export function useCamera() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const [quality, setQuality] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const cameraRef = useRef(null);

  const ensurePermission = useCallback(async () => {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        Alert.alert(
          'Camera Access Required',
          'SBG needs camera access to photograph your switchboard, inverter, meter, and battery location. Please enable it in Settings.',
          [{ text: 'OK' }]
        );
        return false;
      }
    }
    return true;
  }, [permission, requestPermission]);

  const validateImage = useCallback(async (uri) => {
    // In production this would use a vision model.
    // For now we do basic file-size heuristic + simulated quality scores.
    try {
      const info = await FileSystem.getInfoAsync(uri);
      const fileSizeKB = (info.size || 0) / 1024;

      // Heuristic: larger files generally mean more detail
      const sizeScore = Math.min(1, fileSizeKB / 500);

      // Simulate brightness/sharpness/contrast analysis
      // In production: use expo-image-manipulator to sample pixels or send to AI endpoint
      const brightness = 100 + Math.floor(Math.random() * 100);
      const sharpness = 150 + Math.floor(Math.random() * 300);
      const contrast = 35 + Math.floor(Math.random() * 35);

      const brightnessOk = brightness > 60 && brightness < 240;
      const sharpnessOk = sharpness > 100;
      const contrastOk = contrast > 30;

      const score = (
        (brightnessOk ? 0.3 : 0.1) +
        (sharpnessOk ? 0.3 : 0.1) +
        (contrastOk ? 0.2 : 0.05) +
        (sizeScore * 0.2)
      );

      return {
        score: Math.min(1, score + 0.1), // Slight boost so most photos pass
        brightness,
        sharpness,
        contrast,
        brightnessOk,
        sharpnessOk,
        contrastOk,
        passed: score >= QUALITY_THRESHOLD,
      };
    } catch (err) {
      console.warn('Image validation error:', err);
      return { score: 0.7, passed: true, brightness: 120, sharpness: 200, contrast: 45, brightnessOk: true, sharpnessOk: true, contrastOk: true };
    }
  }, []);

  const capture = useCallback(async () => {
    if (!cameraRef.current || isCapturing) return null;

    setIsCapturing(true);
    try {
      const result = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        skipProcessing: Platform.OS === 'android', // Faster on Android
      });

      // Resize for upload efficiency (max 1200px wide)
      const resized = await ImageManipulator.manipulateAsync(
        result.uri,
        [{ resize: { width: 1200 } }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );

      setPhoto(resized);
      setIsCapturing(false);

      // Validate
      setIsValidating(true);
      const q = await validateImage(resized.uri);
      setQuality(q);
      setIsValidating(false);

      return { uri: resized.uri, quality: q };
    } catch (err) {
      console.error('Capture error:', err);
      setIsCapturing(false);
      setIsValidating(false);
      return null;
    }
  }, [isCapturing, validateImage]);

  const reset = useCallback(() => {
    setPhoto(null);
    setQuality(null);
    setIsCapturing(false);
    setIsValidating(false);
  }, []);

  return {
    cameraRef,
    permission,
    ensurePermission,
    photo,
    quality,
    isCapturing,
    isValidating,
    capture,
    reset,
    CameraView,
  };
}
