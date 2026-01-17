import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ChevronLeft, 
  RotateCcw, 
  SkipBack, 
  Pause, 
  SkipForward, 
  Square 
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const WorkoutPlayerScreen = () => {
  const [isPaused, setIsPaused] = useState(false);
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Background Video/Image */}
      <ImageBackground
        source={require("../../assets/ggy.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Overlay */}
        <View style={styles.overlay} />
        
        {/* Back Button */}
        <SafeAreaView style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <ChevronLeft color="#FFFFFF" size={28} strokeWidth={2.5} />
          </TouchableOpacity>
        </SafeAreaView>

        {/* Timer and Exercise Info */}
        <View style={styles.centerContent}>
          <Text style={styles.timer}>01:25</Text>
          <Text style={styles.exerciseName}>20x Jump rope</Text>
        </View>

        {/* Player Controls */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.controlButton}>
            <RotateCcw color="#FFFFFF" size={28} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton}>
            <SkipBack color="#FFFFFF" size={28} fill="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.playPauseButton}
            onPress={() => setIsPaused(!isPaused)}
          >
            <Pause color="#000000" size={40} fill="#000000" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton}>
            <SkipForward color="#FFFFFF" size={28} fill="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton}>
            <Square color="#FFFFFF" size={24} fill="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        {/* Progress Bar */}
        <View style={styles.progressCard}>
          <View style={styles.progressContent}>
            <View>
              <Text style={styles.progressTitle}>20x Jumping Jack</Text>
              <Text style={styles.progressTime}>02:00</Text>
            </View>
            <Text style={styles.progressPercentage}>65%</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: '65%' }]} />
          </View>
        </View>

        {/* Start Button */}
        <TouchableOpacity style={styles.startButton} onPress={()=> navigation.navigate("Home")}>
          <Text style={styles.startButtonText}>End</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: height * 0.65,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 120,
  },
  timer: {
    fontSize: 72,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
    gap: 20,
  },
  controlButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPauseButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#00D9FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00D9FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  bottomSheet: {
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  progressCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  progressTime: {
    fontSize: 16,
    fontWeight: '400',
    color: 'white',
  },
  progressPercentage: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#333333',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#00D9FF',
    borderRadius: 4,
  },
  startButton: {
    backgroundColor: '#00D9FF',
    paddingVertical: 20,
    borderRadius: 50,
    alignItems: 'center',
    shadowColor: '#00D9FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
});

export default WorkoutPlayerScreen;