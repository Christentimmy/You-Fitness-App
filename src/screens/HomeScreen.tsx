

import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Search, Bell, MoreVertical, Heart, PlayCircle } from 'lucide-react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  useFonts({
    'Poppins_400Regular': Poppins_400Regular,
    'Poppins_500Medium': Poppins_500Medium,
    'Poppins_600SemiBold': Poppins_600SemiBold,
    'Poppins_700Bold': Poppins_700Bold,
  });

  const navigation = useNavigation<any>();

  const progressCards = [
    { title: 'Chest Workout', progress: '5/12', remaining: '15 min remaining' },
    { title: 'Legs Workout', progress: '3/20', remaining: '23 min remaining' },
    { title: 'Legs Workout', progress: '3/20', remaining: '23 min remaining' },
  ];

  const categories = [
    { id: 1, name: 'Cardio', icon: '🏃' },
    { id: 2, name: 'Yoga', icon: '🧘' },
    { id: 3, name: 'Pilate', icon: '🤸' },
    { id: 4, name: 'Gym', icon: '🏋️‍♂️' },
  ];

  const workouts = [
    { id: 1, title: 'Rapid Lower Body', level: 'Beginner', duration: '42 min', liked: true },
    { id: 2, title: 'Bodyweight Strength', level: 'Beginner', duration: '25 min', liked: false },
  ];

  const exercises = [
    { id: 1, title: 'Front and Back Lunge', duration: '0:30', visible: true },
    { id: 2, title: 'Front and Back Lunge', duration: '0:30', visible: true },
    { id: 3, title: 'Front and Back Lunge', duration: '0:30', visible: false },
    { id: 4, title: 'Front and Back Lunge', duration: '0:30', visible: false },
    { id: 5, title: 'Front and Back Lunge', duration: '0:30', visible: false },
    { id: 6, title: 'Front and Back Lunge', duration: '0:30', visible: false },
  ];

  const handleStartWorkout = () => {
    navigation.navigate("WorkoutPlan");
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop' }}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.greeting}>Good morning!</Text>
              <Text style={styles.userName}>William Anderson</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="#05E5FF" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B6E76" style={styles.searchIcon} />
          <Text style={styles.searchPlaceholder}>Search something</Text>
        </View>

        {/* Featured Workout Card */}
        <View style={styles.featuredCard}>
          <Image 
            source={require('../../assets/image7.png')}
            style={styles.featuredImage}
          />
          <View style={styles.featuredOverlay}>
            <Text style={styles.featuredTitle}>Full Body Toning{'\n'}Workout</Text>
            <Text style={styles.featuredSubtitle}>Today's Workout</Text>
            <TouchableOpacity style={styles.startButton} onPress={handleStartWorkout}>
              <Text style={styles.startButtonText}>Start Workout</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Progress Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Progress</Text>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.progressScroll}
        >
          {progressCards.map((card, index) => (
            <View key={index} style={styles.progressCard}>
              <View style={styles.progressCardHeader}>
                <View style={styles.progressCircle}>
                  <Text style={styles.progressText}>{card.progress}</Text>
                </View>
                <TouchableOpacity>
                  <MoreVertical size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              <Text style={styles.progressCardTitle}>{card.title}</Text>
              <Text style={styles.progressCardSubtitle}>{card.remaining}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Category Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Category</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoryGrid}>
          {categories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryCard}>
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Popular Workouts Section */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Popular Workouts for{'\n'}you</Text>
            <Text style={styles.workoutsCount}>Workouts: 80</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.workoutsScroll}
        >
          {workouts.map((workout) => (
            <TouchableOpacity key={workout.id} style={styles.workoutCard}>
              <Image 
                source={require('../../assets/mask.png')}
                style={styles.workoutImage}
              />
              <TouchableOpacity style={styles.likeButton}>
                <Heart size={20} color={workout.liked ? "#FF0000" : "#FFFFFF"} fill={workout.liked ? "#FF0000" : "transparent"} />
              </TouchableOpacity>
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutTitle}>{workout.title}</Text>
                <Text style={styles.workoutMeta}>
                  {workout.level} • {workout.duration}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Exercises Section */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Exercises</Text>
            <Text style={styles.exercisesCount}>Exercises: 210</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.exercisesList}>
          {exercises.map((exercise) => (
            <TouchableOpacity 
              key={exercise.id} 
              style={[
                styles.exerciseCard,
                !exercise.visible && styles.exerciseCardBlurred
              ]}
            >
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop' }}
                style={[
                  styles.exerciseThumbnail,
                  !exercise.visible && styles.blurredImage
                ]}
              />
              <View style={styles.exerciseInfo}>
                <Text style={[
                  styles.exerciseTitle,
                  !exercise.visible && styles.blurredText
                ]}>
                  {exercise.title}
                </Text>
                <Text style={[
                  styles.exerciseDuration,
                  !exercise.visible && styles.blurredText
                ]}>
                  {exercise.duration}
                </Text>
              </View>
              <TouchableOpacity style={styles.playButton}>
                <PlayCircle size={24} color={exercise.visible ? "#05E5FF" : "#2A4A52"} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  greeting: {
    fontSize: 14,
    color: '#8A8D95',
    fontFamily: 'Poppins_400Regular',
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Poppins_700Bold',
  },
  notificationButton: {
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchPlaceholder: {
    fontSize: 14,
    color: '#6B6E76',
    fontFamily: 'Poppins_400Regular',
  },
  featuredCard: {
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 16,
    overflow: 'hidden',
    height: 200,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  featuredOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 20,
    justifyContent: 'flex-end',
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Poppins_700Bold',
    marginBottom: 4,
  },
  featuredSubtitle: {
    fontSize: 14,
    color: '#CCCCCC',
    fontFamily: 'Poppins_400Regular',
    marginBottom: 16,
  },
  startButton: {
    backgroundColor: '#0E1016',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignSelf: 'flex-start',
    shadowColor: '#05E5FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(5, 229, 255, 0.3)',
  },
  startButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins_600SemiBold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Poppins_700Bold',
  },
  viewAllText: {
    fontSize: 14,
    color: '#05E5FF',
    fontFamily: 'Poppins_600SemiBold',
  },
  progressScroll: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 30,
  },
  progressCard: {
    width: 160,
    backgroundColor: '#1F3A3D',
    borderRadius: 16,
    padding: 16,
  },
  progressCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: '#05E5FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#05E5FF',
    fontFamily: 'Poppins_700Bold',
  },
  progressCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 4,
  },
  progressCardSubtitle: {
    fontSize: 12,
    color: '#8A8D95',
    fontFamily: 'Poppins_400Regular',
  },
  categoryGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 30,
  },
  categoryCard: {
    flex: 1,
    backgroundColor: '#1F3A3D',
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    gap: 8,
  },
  categoryIcon: {
    fontSize: 32,
  },
  categoryName: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Poppins_500Medium',
  },
  workoutsCount: {
    fontSize: 12,
    color: '#8A8D95',
    fontFamily: 'Poppins_400Regular',
    marginTop: 4,
  },
  workoutsScroll: {
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 30,
  },
  workoutCard: {
    width: 220,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#1A1D25',
  },
  workoutImage: {
    width: '100%',
    height: 140,
  },
  likeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  workoutInfo: {
    padding: 12,
  },
  workoutTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 4,
  },
  workoutMeta: {
    fontSize: 12,
    color: '#8A8D95',
    fontFamily: 'Poppins_400Regular',
  },
  exercisesCount: {
    fontSize: 12,
    color: '#8A8D95',
    fontFamily: 'Poppins_400Regular',
    marginTop: 4,
  },
  exercisesList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#05E5FF',
    borderRadius: 16,
    padding: 12,
    gap: 12,
  },
  exerciseCardBlurred: {
    backgroundColor: '#1F3A3D',
    opacity: 0.5,
  },
  exerciseThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  blurredImage: {
    opacity: 0.3,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0E1016',
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 2,
  },
  exerciseDuration: {
    fontSize: 12,
    color: '#0E1016',
    fontFamily: 'Poppins_400Regular',
  },
  blurredText: {
    color: '#4A4D55',
  },
  playButton: {
    padding: 4,
  },
});

export default HomeScreen;