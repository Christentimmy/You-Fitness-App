import { NavigationContainer, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { StatusBar } from 'react-native';
import SelectAgeScreen from './src/screens/SelectAgeScreen';
import GenderSelectionScreen from './src/screens/GenderSelectionScreen';
import SelectHeightScreen from './src/screens/SelectHeightScreen';
import SelectWeightScreen from './src/screens/SelectWeightScreen';
import WeightGoalScreen from './src/screens/WeightGoalScreen';

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    background: '#0E1016',
    card: '#0E1016',
    text: '#FFFFFF',
    primary: '#05E5FF',
    border: 'transparent',
  },
};

export default function App() {
  return (
    <>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#0E1016" 
        translucent={false}
      />
      <NavigationContainer 
        theme={MyTheme}
        fallback={null} // Prevents white flash during initial render
      >
        <Stack.Navigator 
          screenOptions={{ 
            headerShown: false,
            contentStyle: { backgroundColor: '#0E1016' }, // Set screen background
          }}
          initialRouteName="GenderSelection"
        >
          <Stack.Screen name="GenderSelection" component={GenderSelectionScreen} />
          <Stack.Screen 
            name="SelectAge" 
            component={SelectAgeScreen}
            options={{
              gestureEnabled: true,
              animation: 'slide_from_right', // Add smooth transition
            }}
          />
          <Stack.Screen 
            name="SelectHeight" 
            component={SelectHeightScreen}
            options={{
              gestureEnabled: true,
              animation: 'slide_from_right', // Add smooth transition
            }}
          />
          <Stack.Screen 
            name="SelectWeight" 
            component={SelectWeightScreen}
            options={{
              gestureEnabled: true,
              animation: 'slide_from_right', // Add smooth transition
            }}
          />
          <Stack.Screen 
            name="WeightGoal" 
            component={WeightGoalScreen}
            options={{
              gestureEnabled: true,
              animation: 'slide_from_right', // Add smooth transition
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}