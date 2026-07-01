import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { GradientBackground } from '../components/atoms/GradientBackground';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export const ResultsScreen: React.FC = () => {
  const { faceData } = useLocalSearchParams<{ faceData: string }>();

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push('/')}
          >
            <Ionicons name="arrow-back" size={32} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Sonuçlar</Text>
        </View>

        <View style={styles.imageContainer}>
          {faceData ? (
            <Image
              source={{ uri: `data:image/jpeg;base64,${faceData}` }}
              style={styles.image}
              resizeMode="contain"
            />
          ) : (
            <Text style={styles.errorText}>Fotoğraf yüklenemedi</Text>
          )}
        </View>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  errorText: {
    color: 'white',
    fontSize: 16,
  },
  retakeButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  retakeButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 