import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { ChevronLeft, RefreshCw } from 'lucide-react-native';

const CameraScreen = ({ navigation }: any) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [cameraPosition, setCameraPosition] = useState<'back' | 'front'>(
    'back',
  );

  const camera = useRef<Camera>(null);
  const device = useCameraDevice(cameraPosition);

  useEffect(() => {
    const timer = setTimeout(() => {
      getCameraPermission();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const getCameraPermission = async () => {
    const permission = await Camera.requestCameraPermission();
    console.log(permission);
  };

  const toggleCameraPosition = () => {
    setCameraPosition(prevPosition =>
      prevPosition === 'back' ? 'front' : 'back',
    );
  };

  const takePhoto = async () => {
    if (camera.current) {
      const capturedPhoto = await camera.current.takePhoto();
      console.log(capturedPhoto.path);
      setPhoto(capturedPhoto.path);
    }
  };

  const startRecording = async () => {
    if (camera.current) {
      setVideo(null);
      setIsRecording(true);
      await camera.current.startRecording({
        onRecordingFinished: v => {
          console.log(v.path);
          setVideo(v.path);
          setIsRecording(false);
        },
        onRecordingError: error => {
          console.log(error);
          setIsRecording(false);
        },
      });
    }
  };

  const stopRecording = async () => {
    if (camera.current) {
      await camera.current.stopRecording();
    }
  };

  if (!device) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'white' }}>Loading Camera...</Text>
      </View>
    );
  }

  // PREVIEW MODE
  if (photo) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: `file://${photo}` }}
          style={StyleSheet.absoluteFill}
        />

        {/* Preview Top Header */}
        <SafeAreaView style={styles.header}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setPhoto(null)}
          >
            <ChevronLeft size={24} color="#FFFFFF" strokeWidth={3} />
          </TouchableOpacity>
        </SafeAreaView>

        {/* Preview Bottom Controls */}
        <SafeAreaView style={styles.previewFooter}>
          <TouchableOpacity
            style={styles.retakeButton}
            onPress={() => setPhoto(null)}
          >
            <Text style={styles.retakeText}>Retake</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              // Proceed with saving logic here
              navigation.goBack();
            }}
          >
            <Text style={styles.saveText}>Use Photo</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }

  // CAMERA FEED MODE
  return (
    <View style={styles.container}>
      {/* Absolute Full Screen Camera */}
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        video={true}
      />

      {/* Top Controls Overlay */}
      <SafeAreaView style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft size={24} color="#FFFFFF" strokeWidth={3} />
        </TouchableOpacity>

        {isRecording && (
          <View style={styles.recordingBadge}>
            <View style={styles.recordingDot} />
            <Text style={styles.recordingText}>REC</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.iconButton}
          onPress={toggleCameraPosition}
        >
          <RefreshCw size={22} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Bottom Controls Overlay */}
      <SafeAreaView style={styles.footer}>
        <View style={styles.shutterContainer}>
          {/* Photo Shutter */}
          {!isRecording && (
            <TouchableOpacity style={styles.photoShutter} onPress={takePhoto}>
              <View style={styles.photoShutterInner} />
            </TouchableOpacity>
          )}

          {/* Video Shutter */}
          {/* <TouchableOpacity
            style={styles.videoShutterWrapper}
            onPress={isRecording ? stopRecording : startRecording}
          >
            <View
              style={[
                styles.videoShutterOuter,
                isRecording && { borderColor: '#FFFFFF' },
              ]}
            >
              <View
                style={[
                  styles.videoShutterInner,
                  isRecording && styles.videoShutterRecording,
                ]}
              />
            </View>
          </TouchableOpacity> */}
        </View>

        <Text style={styles.helperText}>Tap to capture Photo</Text>
      </SafeAreaView>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    zIndex: 10,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  recordingText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
    letterSpacing: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 40,
    alignItems: 'center',
    zIndex: 10,
  },
  shutterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
  },
  /* PHOTO SHUTTER */
  photoShutter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  photoShutterInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FFFFFF',
  },
  /* VIDEO SHUTTER */
  videoShutterWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoShutterOuter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoShutterInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#EF4444',
  },
  videoShutterRecording: {
    width: 32,
    height: 32,
    borderRadius: 8, // Square-ish stop button
  },
  helperText: {
    color: '#FFFFFF',
    opacity: 0.7,
    fontSize: 12,
    marginTop: 20,
    fontWeight: '600',
  },
  /* PREVIEW MODE CONTROLS */
  previewFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 30,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingTop: 20,
  },
  retakeButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  retakeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  saveText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '800',
  },
});
