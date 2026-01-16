import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const ITEM_HEIGHT = 80;
const VISIBLE_ITEMS = 5;

type HeightUnit = 'feet' | 'inches' | 'centimeters';

interface HeightPickerWheelProps {
  unit: HeightUnit;
  onValueChange?: (value: number) => void;
}

const HeightPickerWheel: React.FC<HeightPickerWheelProps> = ({ unit, onValueChange }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [selectedIndex, setSelectedIndex] = useState(67); // Default to 167cm (index 67)

  useFonts({
    'Poppins_400Regular': Poppins_400Regular,
    'Poppins_700Bold': Poppins_700Bold,
  });

  // Generate values based on unit
  const getValues = () => {
    switch (unit) {
      case 'feet':
        // 3 to 8 feet
        return Array.from({ length: 61 }, (_, i) => (3 + i * 0.1).toFixed(1));
      case 'inches':
        // 36 to 96 inches
        return Array.from({ length: 61 }, (_, i) => 36 + i);
      case 'centimeters':
      default:
        // 100 to 250 cm
        return Array.from({ length: 151 }, (_, i) => 100 + i);
    }
  };

  const values = getValues();

  const getUnitLabel = () => {
    switch (unit) {
      case 'feet':
        return 'ft';
      case 'inches':
        return 'in';
      case 'centimeters':
      default:
        return 'cm';
    }
  };

  // Reset to default when unit changes
  useEffect(() => {
    let defaultIndex = 0;
    switch (unit) {
      case 'feet':
        defaultIndex = 25; // ~5.5 feet
        break;
      case 'inches':
        defaultIndex = 31; // 67 inches
        break;
      case 'centimeters':
      default:
        defaultIndex = 67; // 167 cm
        break;
    }
    setSelectedIndex(defaultIndex);
    
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        y: defaultIndex * ITEM_HEIGHT,
        animated: false,
      });
    }, 100);
  }, [unit]);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    setSelectedIndex(index);
    
    if (onValueChange) {
      const value = parseFloat(values[index].toString());
      onValueChange(value);
    }
  };

  const handleScrollEnd = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    
    scrollViewRef.current?.scrollTo({
      y: index * ITEM_HEIGHT,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      {/* Selection Indicator Lines */}
      <View style={styles.selectionIndicatorTop} />
      <View style={styles.selectionIndicatorBottom} />
      
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingVertical: ITEM_HEIGHT * 2,
        }}
      >
        {values.map((value, index) => {
          const distance = Math.abs(index - selectedIndex);
          const isActive = distance === 0;
          const opacity = Math.max(0.15, 1 - distance * 0.3);
          const scale = Math.max(0.7, 1 - distance * 0.15);

          return (
            <View key={index} style={[styles.itemContainer, { height: ITEM_HEIGHT }]}>
              <Text
                style={[
                  isActive ? styles.activeItemText : styles.itemText,
                  {
                    opacity,
                    transform: [{ scale }],
                  },
                ]}
              >
                {value}
                {isActive && (
                  <Text style={styles.unitText}> {getUnitLabel()}</Text>
                )}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  selectionIndicatorTop: {
    position: 'absolute',
    top: '50%',
    left: '20%',
    right: '20%',
    height: 2,
    backgroundColor: '#05E5FF',
    transform: [{ translateY: -40 }],
    zIndex: 10,
  },
  selectionIndicatorBottom: {
    position: 'absolute',
    top: '50%',
    left: '20%',
    right: '20%',
    height: 2,
    backgroundColor: '#05E5FF',
    transform: [{ translateY: 40 }],
    zIndex: 10,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeItemText: {
    fontSize: 64,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
  },
  itemText: {
    fontSize: 48,
    fontWeight: '400',
    color: '#4A4D55',
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
  },
  unitText: {
    fontSize: 32,
    color: '#8A8D95',
    fontFamily: 'Poppins_400Regular',
  },
});

export default HeightPickerWheel;