import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions , TouchableWithoutFeedback} from 'react-native';
import { ArrowLeft, ChevronRight } from 'lucide-react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get('window');

const WorkoutPlanScreen = () => {
  useFonts({
    'Poppins_400Regular': Poppins_400Regular,
    'Poppins_500Medium': Poppins_500Medium,
    'Poppins_600SemiBold': Poppins_600SemiBold,
    'Poppins_700Bold': Poppins_700Bold,
  });

  const navigation = useNavigation<any>();

  const weeks = [
    { week: 1, current: true, locked: false },
    { week: 2, current: false, locked: true },
    { week: 3, current: false, locked: true },
    { week: 4, current: false, locked: true },
  ];

  const renderWeekCard = (weekData: any, index: number) => {
    const isFirst = index === 0;
    
    return (
      <View key={weekData.week} style={styles.weekSection}>
        {/* Timeline Connector */}
        <View style={styles.timelineContainer}>
          <View style={[
            styles.timelineDot,
            isFirst ? styles.timelineDotActive : styles.timelineDotInactive
          ]}>
            {isFirst && <View style={styles.timelineDotInner} />}
          </View>
          {index < weeks.length - 1 && (
            <View style={styles.timelineLine} />
          )}
        </View>

        {/* Week Content */}
        <View style={styles.weekContent}>
          <View style={styles.weekHeader}>
            <Text style={styles.weekTitle}>Week {weekData.week}</Text>
            {isFirst && <Text style={styles.weekProgress}>1/7</Text>}
          </View>

          <TouchableWithoutFeedback onPress={()=> navigation.navigate("WorkoutDayDetail")}>
            <View style={[
                styles.weekCard,
                isFirst && styles.weekCardActive
            ]}>
            {/* Day circles - Row 1 */}
            <View style={styles.daysRow}>
              <View style={[styles.dayCircle, styles.dayCircleActive]}>
                <Text style={styles.dayNumberActive}>1</Text>
              </View>
              <ChevronRight size={16} color="#D1D1D6" style={styles.chevron} />
              <View style={[styles.dayCircle, styles.dayCircleInactive]}>
                <Text style={styles.dayNumberInactive}>2</Text>
              </View>
              <ChevronRight size={16} color="#D1D1D6" style={styles.chevron} />
              <View style={[styles.dayCircle, styles.dayCircleInactive]}>
                <Text style={styles.dayNumberInactive}>3</Text>
              </View>
              <ChevronRight size={16} color="#D1D1D6" style={styles.chevron} />
              <View style={[styles.dayCircle, styles.dayCircleInactive]}>
                <Text style={styles.dayNumberInactive}>4</Text>
              </View>
            </View>

            {/* Day circles - Row 2 */}
            <View style={styles.daysRow}>
              <View style={[styles.dayCircle, styles.dayCircleInactive]}>
                <Text style={styles.dayNumberInactive}>5</Text>
              </View>
              <ChevronRight size={16} color="#D1D1D6" style={styles.chevron} />
              <View style={[styles.dayCircle, styles.dayCircleInactive]}>
                <Text style={styles.dayNumberInactive}>6</Text>
              </View>
              <ChevronRight size={16} color="#D1D1D6" style={styles.chevron} />
              <View style={[styles.dayCircle, styles.dayCircleInactive]}>
                <Text style={styles.dayNumberInactive}>7</Text>
              </View>
              <View style={{ flex: 1 }} />
              <Text style={styles.trophyIcon}>🏆</Text>
            </View>
          </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Header with Background Image */}
        <View style={styles.heroSection}>
          <Image 
            source={require("../../assets/image8.png")}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay} />

          {/* Back Button */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Hero Content */}
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Full Body{'\n'}Workout</Text>
            <View style={styles.progressSection}>
              <Text style={styles.daysLeft}>28 Days left</Text>
              <Text style={styles.progressPercent}>0%</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBg}>
                <View style={styles.progressBarFill} />
              </View>
            </View>
          </View>
        </View>

        {/* Description Card */}
        <View style={styles.descriptionCard}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=100&h=100&fit=crop' }}
            style={styles.descriptionImage}
          />
          <Text style={styles.descriptionText}>
            Kick off your full-body fitness journey with energy
          </Text>
        </View>

        {/* Weeks Timeline */}
        <View style={styles.weeksContainer}>
          {weeks.map((week, index) => renderWeekCard(week, index))}
        </View>

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1016',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  heroSection: {
    height: 350,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  statusTime: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins_600SemiBold',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContent: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 30,
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Poppins_700Bold',
    marginBottom: 16,
    lineHeight: 48,
  },
  progressSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  daysLeft: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins_600SemiBold',
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins_600SemiBold',
  },
  progressBarContainer: {
    width: '100%',
  },
  progressBarBg: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '5%',
    height: '100%',
    backgroundColor: '#05E5FF',
    borderRadius: 4,
  },
  descriptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
    gap: 12,
  },
  descriptionImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  descriptionText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#0E1016',
    fontFamily: 'Poppins_500Medium',
    lineHeight: 20,
  },
  weeksContainer: {
    paddingHorizontal: 20,
  },
  weekSection: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  timelineContainer: {
    width: 40,
    alignItems: 'center',
    paddingTop: 8,
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineDotActive: {
    backgroundColor: '#05E5FF',
  },
  timelineDotInactive: {
    backgroundColor: '#4A4D55',
  },
  timelineDotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0E1016',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#4A4D55',
    marginTop: 4,
    minHeight: 140,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#4A4D55',
  },
  weekContent: {
    flex: 1,
    marginLeft: 12,
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  weekTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8A8D95',
    fontFamily: 'Poppins_600SemiBold',
  },
  weekProgress: {
    fontSize: 14,
    fontWeight: '600',
    color: '#05E5FF',
    fontFamily: 'Poppins_600SemiBold',
  },
  weekCard: {
    backgroundColor: '#1A1D25',
    borderRadius: 16,
    padding: 20,
    gap: 16,
  },
  weekCardActive: {
    borderWidth: 2,
    borderColor: '#05E5FF',
  },
  daysRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  dayCircle: {
    width: 30,
    height: 30,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCircleActive: {
    backgroundColor: '#05E5FF',
    borderWidth: 3,
    borderColor: '#05E5FF',
  },
  dayCircleInactive: {
    backgroundColor: '#E5E5EA',
  },
  dayNumberActive: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0E1016',
    fontFamily: 'Poppins_700Bold',
  },
  dayNumberInactive: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8A8D95',
    fontFamily: 'Poppins_600SemiBold',
  },
  chevron: {
    marginHorizontal: 8,
  },
  trophyIcon: {
    fontSize: 32,
  },
  nextButton: {
    backgroundColor: '#05E5FF',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 30,
    marginTop: 30,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0E1016',
    fontFamily: 'Poppins_700Bold',
  },
});

export default WorkoutPlanScreen;