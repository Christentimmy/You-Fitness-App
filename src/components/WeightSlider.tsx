import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type WeightUnit = 'kg' | 'lbs';

interface WeightSliderProps {
  unit: WeightUnit;
  value: number;
  onValueChange: (value: number) => void;
}

const WeightSlider: React.FC<WeightSliderProps> = ({ unit, value, onValueChange }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const prevUnit = useRef(unit);
  const isInitialized = useRef(false);
  
  // Get min and max values based on unit
  const getRange = () => {
    if (unit === 'kg') {
      return { min: 30, max: 150, step: 1 };
    } else {
      return { min: 66, max: 330, step: 1 }; // lbs
    }
  };

  const { min, max, step } = getRange();
  
  // Generate array of values
  const values: any = [];
  for (let i = min; i <= max; i += step) {
    values.push(i);
  }

  // Convert weight between units
  const convertWeight = (weight: number, fromUnit: WeightUnit, toUnit: WeightUnit) => {
    if (fromUnit === toUnit) return weight;
    if (fromUnit === 'kg' && toUnit === 'lbs') {
      return Math.round(weight * 2.20462);
    }
    if (fromUnit === 'lbs' && toUnit === 'kg') {
      return Math.round(weight / 2.20462);
    }
    return weight;
  };

  // Initialize scroll position on mount
  useEffect(() => {
    if (!isInitialized.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: (value - min) * 8 - (SCREEN_WIDTH / 2),
          animated: false,
        });
        isInitialized.current = true;
      }, 100);
    }
  }, []);

  // Handle unit change
  useEffect(() => {
    if (isInitialized.current && prevUnit.current !== unit) {
      const convertedValue = convertWeight(value, prevUnit.current, unit);
      const clampedValue = Math.max(min, Math.min(max, convertedValue));
      
      // Update the value immediately without triggering scroll
      onValueChange(clampedValue);
      
      // Scroll to the new position
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: (clampedValue - min) * 8 - (SCREEN_WIDTH / 2),
          animated: false,
        });
      }, 50);
      
      prevUnit.current = unit;
    }
  }, [unit]);

  const handleScroll = (event: any) => {
    if (isScrolling) return;
    
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const centerPosition = scrollPosition + (SCREEN_WIDTH / 2);
    const itemWidth = 8;
    const index = Math.round(centerPosition / itemWidth);
    const newValue = Math.max(min, Math.min(max, min + index));
    
    if (newValue !== value) {
      onValueChange(newValue);
    }
  };

  const handleScrollBeginDrag = () => {
    setIsScrolling(true);
  };

  const handleScrollEndDrag = () => {
    setIsScrolling(false);
  };

  const renderBars = () => {
    const itemWidth = 8;
    
    return values.map((val: any, index: any) => {
      const distance = Math.abs(value - val);
      const maxHeight = 80;
      const minHeight = 20;
      
      let height = maxHeight;
      if (distance === 0) {
        height = maxHeight;
      } else if (distance <= 5) {
        height = maxHeight - (distance * 12);
      } else {
        height = minHeight;
      }
      
      const opacity = distance === 0 ? 1 : Math.max(0.2, 1 - (distance * 0.15));
      
      return (
        <View
          key={index}
          style={[
            styles.barWrapper,
            { width: itemWidth }
          ]}
        >
          <View
            style={[
              styles.bar,
              {
                height: height,
                opacity: opacity,
              },
            ]}
          />
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderWrapper}>
        {/* Center indicator line */}
        <View style={styles.centerIndicator} />
        
        {/* Scrollable bars */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          onScrollBeginDrag={handleScrollBeginDrag}
          onScrollEndDrag={handleScrollEndDrag}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollContent}
          snapToInterval={8}
          decelerationRate="fast"
        >
          {renderBars()}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderWrapper: {
    width: SCREEN_WIDTH - 80,
    height: 100,
    position: 'relative',
    overflow: 'hidden',
  },
  centerIndicator: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: '#05E5FF',
    zIndex: 10,
    transform: [{ translateX: -1.5 }],
  },
  scrollContent: {
    alignItems: 'flex-end',
    paddingHorizontal: SCREEN_WIDTH / 2,
  },
  barWrapper: {
    height: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
  bar: {
    width: 3,
    backgroundColor: '#05E5FF',
    borderRadius: 2,
  },
});

export default WeightSlider;