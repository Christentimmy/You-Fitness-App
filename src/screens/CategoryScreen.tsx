import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft, Search, ChevronRight } from 'lucide-react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { useNavigation } from '@react-navigation/native';

const CategoryScreen = () => {
  useFonts({
    'Poppins_400Regular': Poppins_400Regular,
    'Poppins_500Medium': Poppins_500Medium,
    'Poppins_600SemiBold': Poppins_600SemiBold,
    'Poppins_700Bold': Poppins_700Bold,
  });

  const navigation = useNavigation<any>();

  const categories = [
    { id: 1, icon: '📓', name: 'Personal Trainings', workouts: 2 },
    { id: 2, icon: '🧘', name: 'Yoga', workouts: 13 },
    { id: 3, icon: '🤸', name: 'Stretch', workouts: 16 },
    { id: 4, icon: '🥊', name: 'Boxing', workouts: 3 },
    { id: 5, icon: '🏃', name: 'Running', workouts: 10 },
    { id: 6, icon: '💪', name: 'Upper Body', workouts: 9 },
    { id: 7, icon: '🏋️', name: 'Gym', workouts: 17 },
    { id: 8, icon: '🏋️', name: 'Gym', workouts: 17 },
  ];

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
        <Text style={styles.headerTitle}>Category</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#8A8D95" style={styles.searchIcon} />
        <Text style={styles.searchPlaceholder}>Search something</Text>
      </View>

      {/* Category List */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => (
          <TouchableOpacity 
            key={category.id} 
            style={styles.categoryCard}
            activeOpacity={0.7}
          >
            <View style={styles.categoryIconContainer}>
              <Text style={styles.categoryIcon}>{category.icon}</Text>
            </View>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryWorkouts}>{category.workouts} workouts</Text>
            </View>
            <ChevronRight size={24} color="#FFFFFF" />
          </TouchableOpacity>
        ))}

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 25,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1D25',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchPlaceholder: {
    fontSize: 15,
    color: '#8A8D95',
    fontFamily: 'Poppins_400Regular',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F3A3D',
    borderRadius: 16,
    // padding: 16,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#05E5FF',
  },
  categoryIconContainer: {
    width: 65,
    height: 65,
    backgroundColor: '#2D4E58',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryIcon: {
    fontSize: 25,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins_600SemiBold',
    // marginBottom: 4,
  },
  categoryWorkouts: {
    fontSize: 14,
    color: '#8A8D95',
    fontFamily: 'Poppins_400Regular',
  },
});

export default CategoryScreen;