import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { TouchableOpacity, Dimensions } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { useState } from 'react';
import WeightSlider from "../components/WeightSlider";
const { width, height } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';

type WeightUnit = 'kg' | 'lbs';

const SelectWeightScreen = () => {
  const [selectedUnit, setSelectedUnit] = useState<WeightUnit>('kg');
  const [selectedWeight, setSelectedWeight] = useState(54);

  useFonts({
    'Poppins_400Regular': Poppins_400Regular,
    'Poppins_600SemiBold': Poppins_600SemiBold,
    "Poppins_700Bold": Poppins_700Bold,
  });

  const navigation = useNavigation<any>();

  const handleNext = () => {
    console.log('Selected weight:', selectedWeight, selectedUnit);
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.stepText}> 
            04 <Text style={styles.stepLabel}>ABOUT YOUR BODY</Text>
          </Text>
        </View>
        
        {/* Progress Section */}
        <View style={styles.progressBar}>
          <View style={styles.progressActive} />
          <View style={styles.progressActive} />
          <View style={styles.progressActive} />
          <View style={styles.progressActive} />
          <View style={styles.progressInactive} />
        </View>
        
        {/* Title Section */}
        <View>
          <Text style={styles.title}>What's your weight?</Text>
        </View>

        {/* Unit Selector */}
        <View style={styles.unitSelectorContainer}>
          <View style={styles.unitSelector}>
            <TouchableOpacity
              style={[
                styles.unitButton,
                selectedUnit === 'kg' && styles.unitButtonActive
              ]}
              onPress={() => setSelectedUnit('kg')}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.unitButtonText,
                selectedUnit === 'kg' && styles.unitButtonTextActive
              ]}>
                Kilogram(Kg)
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.unitButton,
                selectedUnit === 'lbs' && styles.unitButtonActive
              ]}
              onPress={() => setSelectedUnit('lbs')}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.unitButtonText,
                selectedUnit === 'lbs' && styles.unitButtonTextActive
              ]}>
                Pound(lbs)
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Weight Display and Slider */}
        <View style={styles.sliderContainer}>
          <Text style={styles.weightDisplay}>
            {selectedWeight}
            <Text style={styles.weightUnit}>{selectedUnit}</Text>
          </Text>
          
          <WeightSlider 
            unit={selectedUnit}
            value={selectedWeight}
            onValueChange={setSelectedWeight}
          />
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
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
    paddingHorizontal: 15,
  },
  headerContainer: {
    marginTop: 50,
    marginBottom: 10,
    flexDirection: 'row',
  },
  stepText: {
    color: '#05E5FF',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 2,
    marginBottom: 16,
    fontFamily: 'Poppins_400Regular',
  },
  stepLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 2,
    fontFamily: 'Poppins_400Regular',
  },
  backIcon: {
    marginRight: width * 0.14,
    marginLeft: 2,
    color: "white"
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 25,
    fontFamily: 'Poppins_700Bold',
  },
  unitSelectorContainer: {
    paddingHorizontal: 50,
    marginBottom: 40,
  },
  unitSelector: {
    flexDirection: 'row',
    backgroundColor: '#1A1D25',
    borderRadius: 35,
    padding: 4,
    borderWidth: 2,
    borderColor: '#1A1D25',
  },
  unitButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unitButtonActive: {
    backgroundColor: '#05E5FF',
  },
  unitButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B6E76',
    fontFamily: 'Poppins_600SemiBold',
  },
  unitButtonTextActive: {
    color: '#0E1016',
    fontFamily: 'Poppins_700Bold',
  },
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  weightDisplay: {
    fontSize: 96,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Poppins_700Bold',
    marginBottom: 60,
  },
  weightUnit: {
    fontSize: 36,
    fontWeight: '400',
    color: '#FFFFFF',
    fontFamily: 'Poppins_400Regular',
  },
  nextButton: {
    backgroundColor: '#05E5FF',
    paddingVertical: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 40,
    marginHorizontal: 10,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0E1016',
    fontFamily: 'Poppins_700Bold',
  },
});

export default SelectWeightScreen;