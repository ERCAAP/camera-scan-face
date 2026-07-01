import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GradientBackground } from '../components/atoms/GradientBackground';
import { AnimatedButton } from '../components/atoms/AnimatedButton';
import { router } from 'expo-router';

export const HomeScreen: React.FC = () => {
  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Yüz Tipine Göre Saç Kesimi</Text>
        <Text style={styles.subtitle}>
          Yüz tipinizi keşfedin, doğru saç kesimi bulun.
        </Text>
        <AnimatedButton 
          title="Fotoğraf Çek"
          onPress={() => router.push('/camera')}
        />
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
  },
}); 