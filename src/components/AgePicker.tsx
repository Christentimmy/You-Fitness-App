import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Animated,
} from 'react-native';

const AgePickerWheel = () => {
  const minAge = 18;
  const maxAge = 100;
  const itemHeight = 60;
  const visibleItems = 7;

  const ages = Array.from({ length: maxAge - minAge + 1 }, (_, i) => minAge + i);
  const initialAge = 36;
  const initialIndex = ages.indexOf(initialAge);

  const scrollY = useRef(new Animated.Value(initialIndex * itemHeight)).current;
  const currentScrollValue = useRef(initialIndex * itemHeight);
  const [selectedAge, setSelectedAge] = useState(initialAge);

  useEffect(() => {
    const listenerId = scrollY.addListener(({ value }) => {
      currentScrollValue.current = value;
      const index = Math.round(value / itemHeight);
      const newAge = ages[Math.max(0, Math.min(index, ages.length - 1))];
      if (newAge !== selectedAge) {
        setSelectedAge(newAge);
      }
    });

    return () => scrollY.removeListener(listenerId);
  }, [selectedAge]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        scrollY.stopAnimation((value) => {
          currentScrollValue.current = value;
          scrollY.setOffset(value);
          scrollY.setValue(0);
        });
      },
      onPanResponderMove: (_, gestureState) => {
        scrollY.setValue(-gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        scrollY.flattenOffset();
        
        // Calculate velocity-based momentum
        const velocity = -gestureState.vy;
        const targetIndex = Math.round(currentScrollValue.current / itemHeight);
        const clampedIndex = Math.max(0, Math.min(targetIndex, ages.length - 1));

        Animated.spring(scrollY, {
          toValue: clampedIndex * itemHeight,
          useNativeDriver: true,
          friction: 7,
          tension: 50,
          velocity: velocity,
        }).start();
      },
    })
  ).current;

  const getItemStyle = (index: number) => {
    const inputRange = [
      (index - 2) * itemHeight,
      (index - 1) * itemHeight,
      index * itemHeight,
      (index + 1) * itemHeight,
      (index + 2) * itemHeight,
    ];

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.5, 0.7, 1, 0.7, 0.5],
      extrapolate: 'clamp',
    });

    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.2, 0.4, 1, 0.4, 0.2],
      extrapolate: 'clamp',
    });

    return {
      transform: [{ scale }],
      opacity,
    };
  };

  return (
    <View style={styles.container}>
      {/* Selection indicator lines */}
      <View style={styles.topLine} />
      <View style={styles.bottomLine} />

      {/* Scrollable age list */}
      <View
        style={[styles.scrollContainer, { height: itemHeight * visibleItems }]}
        {...panResponder.panHandlers}
      >
        <Animated.View
          style={{
            transform: [
              {
                translateY: Animated.subtract(
                  (visibleItems / 2 - 0.5) * itemHeight,
                  scrollY
                ),
              },
            ],
          }}
        >
          {ages.map((age, index) => (
            <Animated.View
              key={age}
              style={[styles.itemContainer, getItemStyle(index)]}
            >
              <Text style={styles.itemText}>{age}</Text>
            </Animated.View>
          ))}
        </Animated.View>
      </View>
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
  scrollContainer: {
    width: '100%',
    overflow: 'hidden',
  },
  topLine: {
    position: 'absolute',
    top: '50%',
    marginTop: -30,
    left: '15%',
    right: '15%',
    height: 2,
    backgroundColor: '#00D9FF',
    zIndex: 10,
  },
  bottomLine: {
    position: 'absolute',
    top: '50%',
    marginTop: 30,
    left: '15%',
    right: '15%',
    height: 2,
    backgroundColor: '#00D9FF',
    zIndex: 10,
  },
  itemContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default AgePickerWheel;