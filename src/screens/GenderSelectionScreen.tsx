import React, { useState } from 'react';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { View, Text, TouchableOpacity, StyleSheet , Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
const { width, height } = Dimensions.get('window');

const GenderSelectionScreen = () => {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const navigation = useNavigation<any>();

  const handleNext = () => {
    if (selectedGender) {
      console.log('Selected gender:', selectedGender);
      navigation.navigate('SelectAge');
    }
  };
  
  useFonts({
    'Poppins_400Regular': Poppins_400Regular,
    'Poppins_600SemiBold': Poppins_600SemiBold,
    "Poppins_700Bold": Poppins_700Bold,
  });

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.content}>
        {/* Progress Bar */}        
        <View style={styles.headerContainer}>
          <Text style={styles.stepText}>
            01 <Text style={styles.stepLabel}>GOAL & FOCUS</Text>
          </Text>
          <View style={styles.progressBar}>
            <View style={styles.progressActive} />
            <View style={styles.progressInactive} />
            <View style={styles.progressInactive} />
            <View style={styles.progressInactive} />
            <View style={styles.progressInactive} />
          </View>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Tell us about yourself!</Text>
          <Text style={styles.subtitle}>
            To give you a better experience we need{'\n'}
            to know your gender
          </Text>
        </View>

        {/* Gender Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedGender === 'male' && styles.optionButtonSelected
            ]}
            onPress={() => setSelectedGender('male')}
            activeOpacity={0.8}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>♂</Text>
            </View>
            <Text style={styles.optionText}>Male</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedGender === 'female' && styles.optionButtonSelected
            ]}
            onPress={() => setSelectedGender('female')}
            activeOpacity={0.8}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>♀</Text>
            </View>
            <Text style={styles.optionText}>Female</Text>
          </TouchableOpacity>
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={[
            styles.nextButton,
            !selectedGender && styles.nextButtonDisabled
          ]}
          onPress={handleNext}
          disabled={!selectedGender}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1016',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  headerContainer: {
    marginTop: 50,
    marginBottom: 10,
  },
  stepText: {
    color: '#05E5FF',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 2,
    marginBottom: 16,
    fontFamily: 'Poppins_400Regular',
    textAlign: "center"
  },
  stepLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 2,
    fontFamily: 'Poppins_400Regular',
  },
  progressBar: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 25,
  },
  progressActive: {
    flex: 1,
    height: 4,
    backgroundColor: '#05E5FF',
    borderRadius: 2,
  },
  progressInactive: {
    flex: 1,
    height: 4,
    backgroundColor: '#2A2D35',
    borderRadius: 2,
  },
  titleSection: {
    marginVertical: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 24,
    marginBottom: 60,
  },
  optionButton: {
    width: width * 0.5,
    height: height * 0.24,
    borderRadius: 120,
    borderWidth: 2,
    borderColor: '#2A2D35',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  optionButtonSelected: {
    borderColor: '#05E5FF',
    borderWidth: 3,
  },
  iconContainer: {
    marginBottom: 16,
  },
  icon: {
    fontSize: 80,
    color: '#05E5FF',
  },
  optionText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  nextButton: {
    backgroundColor: '#05E5FF',
    paddingVertical: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 40,
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0E1016',
  },
});

export default GenderSelectionScreen;