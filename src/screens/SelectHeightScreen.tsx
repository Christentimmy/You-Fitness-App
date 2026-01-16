import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { TouchableOpacity, Dimensions } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { useState } from 'react';
import HeightPickerWheel from "../components/HeightPicker";
const { width, height } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';

type HeightUnit = 'feet' | 'inches' | 'centimeters';

const SelectHeightScreen = () => {
  const [selectedUnit, setSelectedUnit] = useState<HeightUnit>('centimeters');
  const [selectedHeight, setSelectedHeight] = useState(167);

  useFonts({
    'Poppins_400Regular': Poppins_400Regular,
    'Poppins_600SemiBold': Poppins_600SemiBold,
    "Poppins_700Bold": Poppins_700Bold,
  });

  const navigation = useNavigation<any>();

  const handleNext = () => {
    // Handle navigation to next screen
    console.log('Selected height:', selectedHeight, selectedUnit);
  };

  const renderUnitButton = (unit: HeightUnit, label: string) => (
    <TouchableOpacity
      style={[
        styles.unitButton,
        selectedUnit === unit && styles.unitButtonActive
      ]}
      onPress={() => setSelectedUnit(unit)}
      activeOpacity={0.8}
    >
      <Text style={[
        styles.unitButtonText,
        selectedUnit === unit && styles.unitButtonTextActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.stepText}> 
            03 <Text style={styles.stepLabel}>ABOUT YOUR BODY</Text>
          </Text>
        </View>
        
        {/* Progress Section */}
        <View style={styles.progressBar}>
          <View style={styles.progressActive} />
          <View style={styles.progressActive} />
          <View style={styles.progressActive} />
          <View style={styles.progressInactive} />
          <View style={styles.progressInactive} />
        </View>
        
        {/* Title Section */}
        <View>
          <Text style={styles.title}>What's your height?</Text>
        </View>

        {/* Unit Selector */}
        <View style={styles.unitSelectorContainer}>
          <View style={styles.unitSelector}>
            {renderUnitButton('feet', 'Feet')}
            {renderUnitButton('inches', 'Inches')}
            {renderUnitButton('centimeters', 'Centimeters')}
          </View>
        </View>

        {/* Height Picker Wheel */}
        <View style={styles.pickerContainer}>
          <View style={styles.pickerWrapper}>
            <HeightPickerWheel 
              unit={selectedUnit}
              onValueChange={setSelectedHeight}
            />
          </View>
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
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  unitSelector: {
    flexDirection: 'row',
    backgroundColor: '#1A1D25',
    borderRadius: 35,
    padding: 4,
    borderWidth: 2,
    borderColor: '#05E5FF',
  },
  unitButton: {
    flex: 1,
    paddingVertical: 5,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unitButtonActive: {
    backgroundColor: '#05E5FF',
  },
  unitButtonText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#6B6E76',
    fontFamily: 'Poppins_600SemiBold',
  },
  unitButtonTextActive: {
    color: '#0E1016',
    fontFamily: 'Poppins_700Bold',
  },
  pickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerWrapper: {
    width: '100%',
    height: 400,
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

export default SelectHeightScreen;