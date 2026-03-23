import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Camera,
  useCameraDevice,
} from 'react-native-vision-camera';
import {
  ChevronLeft,
  RefreshCw,  
  Aperture,
  Play,
  Square,
  Dot,
} from 'lucide-react-native';

const CameraScreen = ({ navigation }) => {
  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [cameraPosition, setCameraPosition] = useState<CameraPosition>('back');

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

  const camera = useRef(null);
  const device = useCameraDevice(cameraPosition);

  const toggleCameraPosition = () => {
    setCameraPosition(prevPosition =>
      prevPosition === 'back' ? 'front' : 'back',
    );
  };

  const takePhoto = async () => {
    const photo = await camera.current.takePhoto();
    console.log(photo.path);
    setPhoto(photo.path);
  };

  const startRecording = async () => {
    setVideo(null);
    setIsRecording(true);
    const video = await camera.current.startRecording({
      onRecordingFinished: video => {
        console.log(video.path);
        setVideo(video.path);
        setIsRecording(false);
      },
      onRecordingError: error => {
        console.log(error);
        setIsRecording(false);
      },
    });
  };

  const stopRecording = async () => {
    await camera.current.stopRecording();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft size={20} color="#111827" strokeWidth={2.5} />
        </TouchableOpacity>

        {/* Header Text */}
        <View style={styles.headerText}>
          <Text style={styles.headerSub}>Camera</Text>
          <Text style={styles.headerTitle}>Take a Photo</Text>
        </View>
      </View>

      {/* Camera */}
      <Camera
        ref={camera}
        style={styles.camera}
        device={device}
        isActive={true}
        photo={true}
        video={true}
        // audio={true}
      />
      {/* Recording Status Dot */}
      <View style={styles.recStatus}>
        <Text style={styles.recStatusText}>
          {isRecording ? <Dot color="#ff0000" size={90} /> : ''}
        </Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.buttonText}>
            <Aperture size={30} color="#fff" />
          </Text>
        </TouchableOpacity>

        {isRecording ? (
          <TouchableOpacity style={styles.button} onPress={stopRecording}>
            <Square size={30} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={startRecording}>
            <Play size={30} color="#fff" />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={toggleCameraPosition}>
          <Text style={styles.buttonText}>
            <RefreshCw size={20} color="#fff" strokeWidth={2} />
          </Text>
        </TouchableOpacity>
      </View>

      {photo && (
        <>
          <Image source={{ uri: 'file://' + photo }} style={styles.capImage} />

          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setPhoto(null)}
          >
            <Text style={styles.clearText}>Clear Image</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    gap: 12,
  },
  backBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  headerText: {
    flex: 1,
  },
  recStatus: {
    position: 'absolute',
    top: 80,
    right: -20,
    zIndex: 100,
  },
  recStatusText: {
    color: '#ff0000',
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  headerSub: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: 0.1,
  },

  camera: {
    flex: 1,
    width: 500,
    height: 500,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  button: {
    backgroundColor: '#F97316',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 14,
    shadowColor: '#F97316',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  capImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: '#FEF2F2',
    borderWidth: 2,
    borderColor: '#F55A5A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  clearText: {
    color: '#F55A5A',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
