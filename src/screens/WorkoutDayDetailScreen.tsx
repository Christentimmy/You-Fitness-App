import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { ArrowLeft, ChevronRight, Info } from 'lucide-react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { useNavigation } from '@react-navigation/native';

const { height,width } = Dimensions.get('window');

const WorkoutDayDetailScreen = () => {
  useFonts({
    'Poppins_400Regular': Poppins_400Regular,
    'Poppins_500Medium': Poppins_500Medium,
    'Poppins_600SemiBold': Poppins_600SemiBold,
    'Poppins_700Bold': Poppins_700Bold,
  });

  const navigation = useNavigation<any>();

  const exercises = [
    { id: 1, name: 'Jumping Jacks', duration: '0:30' },
    { id: 2, name: 'Incline Push-Ups', duration: '0:30' },
    { id: 3, name: 'Knee Push-Ups', duration: '0:30' },
    { id: 4, name: 'Front and Back Lunge', duration: '0:30' },
    { id: 5, name: 'Front and Back Lunge', duration: '0:30' },
  ];

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Header with Background Image */}
        <View style={styles.heroSection}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&h=420&fit=crop' }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay} />
          
          {/* Status Bar Area */}
          <View style={styles.statusBar}>
            <Text style={styles.statusTime}>9:41</Text>
          </View>

          {/* Back Button */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Hero Title */}
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Full Body{'\n'}Workout</Text>
          </View>
        </View>

        {/* DAY 1 Header */}
        <View style={styles.dayHeaderContainer}>
          <Text style={styles.dayHeader}>DAY 1</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>8 mins</Text>
            <Text style={styles.statLabel}>Duration</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>11</Text>
            <Text style={styles.statLabel}>Exercise</Text>
          </View>
        </View>

        {/* Edit Button */}
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
          <ChevronRight size={20} color="#05E5FF" />
        </TouchableOpacity>

        {/* Exercise List */}
        <View style={styles.exerciseList}>
          {exercises.map((exercise, index) => (
            <TouchableOpacity 
              key={exercise.id} 
              style={styles.exerciseCard}
              activeOpacity={0.7}
              onPress={()=> navigation.navigate("WorkoutPlayer")}
            >
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop' }}
                style={styles.exerciseImage}
              />
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseDuration}>{exercise.duration}</Text>
              </View>
              <TouchableOpacity style={styles.infoButton}>
                <Info size={24} color="#05E5FF" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Start Button */}
        <TouchableOpacity style={styles.startButton} onPress={()=> navigation.navigate("WorkoutPlayer")}>
          <Text style={styles.startButtonText}>Start</Text>
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
    height: height * 0.4,
    position: 'relative',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
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
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
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
    bottom: height * 0.1,
    left: 0,
    right: 0,
    paddingHorizontal: 35,
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Poppins_700Bold',
    lineHeight: 56,
  },
  dayHeaderContainer: {
    paddingHorizontal: 35,
    paddingTop: 30,
    paddingBottom: 20,
  },
  dayHeader: {
    fontSize: 36,
    fontWeight: '700',
    color: '#05E5FF',
    fontFamily: 'Poppins_700Bold',
    letterSpacing: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    gap: 16,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#E5E5EA',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0E1016',
    fontFamily: 'Poppins_700Bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B6E76',
    fontFamily: 'Poppins_500Medium',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 35,
    paddingVertical: 10,
    gap: 4,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#05E5FF',
    fontFamily: 'Poppins_600SemiBold',
  },
  exerciseList: {
    paddingHorizontal: 25,
    gap: 12,
    marginTop: 10,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F3A3D',
    borderRadius: 16,
    // padding: 12,
    paddingHorizontal: 5,
    paddingVertical: 7,
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#05E5FF',
  },
  exerciseImage: {
    width: 80,
    height: 70,
    borderRadius: 12,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 4,
  },
  exerciseDuration: {
    fontSize: 14,
    color: '#8A8D95',
    fontFamily: 'Poppins_400Regular',
  },
  infoButton: {
    padding: 8,
  },
  startButton: {
    backgroundColor: '#05E5FF',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 35,
    marginTop: 40,
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0E1016',
    fontFamily: 'Poppins_700Bold',
  },
});

export default WorkoutDayDetailScreen;