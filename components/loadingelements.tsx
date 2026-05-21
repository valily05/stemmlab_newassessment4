import React, { useEffect, useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import { COLORS, LAYOUT } from '../constants/layout';

interface ProgressProps {
  progress: number;
}

export const PixelProgressBar: React.FC<ProgressProps> = ({ progress }) => {
  const { barWidth, unit, height } = LAYOUT;

  return (
    <View style={{ marginBottom: 24, alignItems: 'center' }}>
      {/* OUTER FRAME */}
      <View style={{
        backgroundColor: COLORS.white,
        paddingHorizontal: LAYOUT.width * 0.019,
        paddingVertical: LAYOUT.height * 0.005,
        position: 'relative',
        zIndex: 11,
      }}>

        {/* 🔲 TOP + BOTTOM LONG PIXELS */}
        {[
          { top: -unit, left: -unit },
          { top: -unit, right: -unit },
          { bottom: -unit, left: -unit },
          { bottom: -unit, right: -unit }
        ].map((pos, i) => (
          <View key={`tb-${i}`} style={{
            position: 'absolute',
            width: barWidth * 0.72,
            height: unit,
            backgroundColor: COLORS.green,
            ...pos,
            zIndex: 11,
          }} />
        ))}

        {/* 🟩 SIDE WHITE BLOCKS */}
        {[
          { top: 0, left: -unit },
          { top: 0, right: -unit },
          { bottom: 0, left: -unit },
          { bottom: 0, right: -unit }
        ].map((pos, i) => (
          <View key={`sw-${i}`} style={{
            position: 'absolute',
            width: unit,
            height: unit * 5,
            backgroundColor: COLORS.white,
            ...pos,
            zIndex: 11,
          }} />
        ))}


  {/* 🟩 INNER GREEN PIXEL */}
    <View style={{
      position: 'absolute',
      top: unit * 1.3,
      left: unit * -0.3,
      width: unit * 3,
      height: unit * (unit/2),
      backgroundColor: COLORS.green,
      zIndex: 11,
    }} />
        {/* 🟩 OUTER GREEN EDGES */}
        {[
          { top: 0, left: -unit * 2 },
          { top: 0, right: -unit * 2 },
          { bottom: 0, left: -unit * 2 },
          { bottom: 0, right: -unit * 2 }
        ].map((pos, i) => (
          <View key={`ge-${i}`} style={{
            position: 'absolute',
            width: unit,
            height: unit,
            backgroundColor: COLORS.green,
            ...pos,
            zIndex: 11,
          }} />
        ))}

        {/* 🟩 SECOND LAYER WHITE */}
        {[
          { top: unit, left: -unit * 2 },
          { top: unit, right: -unit * 2 },
          { bottom: unit, left: -unit * 2 },
          { bottom: unit, right: -unit * 2 }
        ].map((pos, i) => (
          <View key={`slw-${i}`} style={{
            position: 'absolute',
            width: unit,
            height: unit * 2,
            backgroundColor: COLORS.white,
            ...pos,
            zIndex: 11,
          }} />
        ))}

        {/* 🟩 OUTER GREEN FINAL */}
        {[
          { top: unit, left: -unit * 3 },
          { top: unit, right: -unit * 3 },
          { bottom: unit, left: -unit * 3 },
          { bottom: unit, right: -unit * 3 }
        ].map((pos, i) => (
          <View key={`ogf-${i}`} style={{
            position: 'absolute',
            width: unit,
            height: unit * 1.9,
            backgroundColor: COLORS.green,
            ...pos,
            zIndex: 11,
          }} />
        ))}

        {/* INNER BAR */}
        <View style={{
          width: barWidth,
          height: height * 0.03,
          backgroundColor: COLORS.white,
          overflow: 'hidden',
          position: 'relative',
          zIndex: 11,
        }}>
          {/* PROGRESS FILL */}
          <View style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: COLORS.green,
            zIndex: 11,
          }} />
        </View>

      </View>
    </View>
  );
};

interface FactProps {
  facts: readonly string[];
}

export const FactCarousel: React.FC<FactProps> = ({ facts }) => {
  const [index, setIndex] = useState<number>(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        setIndex((prev) => (prev + 1) % facts.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }).start();
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [facts, fadeAnim]);

  return (
    <Animated.Text style={{
      fontFamily: 'PixelOperator',
      fontSize: LAYOUT.fontBase * 0.156,
      color: COLORS.white,
      textAlign: 'center',
      opacity: fadeAnim
    }}>
      {facts[index]}
    </Animated.Text>
  );
};