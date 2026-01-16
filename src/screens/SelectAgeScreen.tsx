import { SafeAreaProvider } from "react-native-safe-area-context";
import {Text, View, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { TouchableOpacity, ActivityIndicator, Dimensions } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import AgePickerWheel from "../components/AgePicker";
const { width, height } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';


const SelectAgeScreen = () => {

  useFonts({
    'Poppins_400Regular': Poppins_400Regular,
    'Poppins_600SemiBold': Poppins_600SemiBold,
    "Poppins_700Bold": Poppins_700Bold,
  });

  const navigation = useNavigation<any>();


  const handleNext = () => {
    navigation.navigate('SelectHeight');
  };

    return (
        <SafeAreaProvider style={styles.container}>
            <View style={styles.content}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowLeft style={styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={styles.stepText}> 
                         02 <Text style={styles.stepLabel}>ABOUT YOUR BODY</Text>
                    </Text>
                </View>
                
                {/* Progress Section */}
                <View style={styles.progressBar}>
                    <View style={styles.progressActive} />
                    <View style={styles.progressActive} />
                    <View style={styles.progressInactive} />
                    <View style={styles.progressInactive} />
                    <View style={styles.progressInactive} />
                </View>
                
                {/* Title Section */}
                <View>
                    <Text style={styles.title}>How old are you ?</Text>
                </View>

               {/* Age Picker Wheel */}
                <View style={styles.pickerContainer}>
                    <View style={styles.pickerWrapper}>
                        <AgePickerWheel/>
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
  backIcon:{
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
    marginBottom: 16,
    marginTop: 25,
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
  activeItemText: {
    fontSize: 64,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Poppins_700Bold',
  },
  itemText: {
    fontSize: 48,
    fontWeight: '400',
    color: '#4A4D55',
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

export default SelectAgeScreen;