import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ArrowLeft, Clock, Flame, Activity } from 'lucide-react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { useNavigation } from '@react-navigation/native';



const CongratulationsScreen = () => {
  useFonts({
    'Poppins_400Regular': Poppins_400Regular,
    'Poppins_500Medium': Poppins_500Medium,
    'Poppins_600SemiBold': Poppins_600SemiBold,
    'Poppins_700Bold': Poppins_700Bold,
  });

  const navigation = useNavigation<any>();

  return (
    <SafeAreaProvider style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
        <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Exercise</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Trophy Icon */}
        <View style={styles.trophyContainer}>
          <Image source={require('../../assets/win.png')} style={styles.trophyImage}></Image>
        </View>

        {/* Congratulations Text */}
        <Text style={styles.congratsText}>Congratulations!</Text>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>2 Hours</Text>
            <Clock size={20} color="#05E5FF" style={styles.statIcon} />
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>300 Calories</Text>
            <Flame size={20} color="#05E5FF" style={styles.statIcon} />
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>Moderate</Text>
            <Activity size={20} color="#05E5FF" style={styles.statIcon} />
          </View>
        </View>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('WorkoutPlayer')}
        >
          <Text style={styles.primaryButtonText}>Go to the next workout</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.secondaryButtonText}>Back to home</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 35,
  },
  backButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Poppins_700Bold',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  trophyContainer: {
    marginBottom: 40,
  },
  trophyImage: {
    width: 120,
    height: 120,
  },
  congratsText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#05E5FF',
    fontFamily: 'Poppins_700Bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
  },
  statIcon: {
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#374151',
  },
  buttonContainer: {
    paddingHorizontal: 30,
    paddingBottom: 40,
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#05E5FF',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0E1016',
    fontFamily: 'Poppins_700Bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#05E5FF',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#05E5FF',
    fontFamily: 'Poppins_700Bold',
  },
});

export default CongratulationsScreen;