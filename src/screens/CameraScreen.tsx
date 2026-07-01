import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import { GradientBackground } from '../components/atoms/GradientBackground';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export const CameraScreen: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [camera, setCamera] = useState<any>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return (
      <GradientBackground>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="white" />
        </View>
      </GradientBackground>
    );
  }

  if (hasPermission === false) {
    return (
      <GradientBackground>
        <View style={styles.container}>
          <Text style={styles.text}>Kamera izni gerekli</Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={async () => {
              const { status } = await Camera.requestCameraPermissionsAsync();
              setHasPermission(status === 'granted');
            }}
          >
            <Text style={styles.permissionButtonText}>İzin Ver</Text>
          </TouchableOpacity>
        </View>
      </GradientBackground>
    );
  }

  const takePicture = async () => {
    if (camera && !isProcessing) {
      setIsProcessing(true);
      try {
        const photo = await camera.takePictureAsync({
          quality: 1,
          base64: true,
        });
        router.push({
          pathname: '/results',
          params: { faceData: photo.base64 || '' }
        });
      } catch (error) {
        console.error('Error taking picture:', error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={(ref) => setCamera(ref)}
        style={styles.camera}
        type="front"
        onCameraReady={() => setIsCameraReady(true)}
      >
        <View style={styles.overlay}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={32} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Yüzünüzü Çerçeveye Hizalayın</Text>
          </View>
          
          <View style={styles.guideFrame} />
          
          <View style={styles.controls}>
            {isProcessing ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <TouchableOpacity
                style={[styles.captureButton, !isCameraReady && styles.buttonDisabled]}
                onPress={takePicture}
                disabled={!isCameraReady}
              >
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  backButton: {
    padding: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  guideFrame: {
    flex: 1,
    margin: 50,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
  },
  controls: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  permissionButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  permissionButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 