import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { LAYOUT } from '@/constants/layout';

type Props = {
    variant?: 'simple' | 'full';
};

export default function StarField({ variant = 'full',}: Props) {
    const STAR_COLORS = [
        '#ffffff',
        '#60A5FA', // blue
        '#FACC15', // yellow
        '#FB923C', // orange
    ];

    const SPECIAL_COLORS = [
        '#C084FC', // purple
        '#F472B6', // pink
        '#A78BFA', // soft violet
    ];

    const staticStarCount =
        variant === 'simple'
            ? 0
            : 30;

    const staticStars = useRef(
        Array.from({ length: staticStarCount }).map(() => {
            const isSpecial = Math.random() > 0.6; 

            return {
            x: Math.random() * LAYOUT.width,
            y: Math.random() * LAYOUT.height,
            size: isSpecial
                ? Math.random() * 3 + 2.5   
                : Math.random() * 2 + 1.5,
            opacity: isSpecial ? 1 : Math.random() * 0.8 + 0.3,
            color: isSpecial
                ? SPECIAL_COLORS[Math.floor(Math.random() * SPECIAL_COLORS.length)]
                : STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
            isSparkle: Math.random() > 0.7,
            };
        })
    ).current;

    const stars = useRef(
        Array.from({
            length: variant === 'simple'
                ? 60
                : 90,
        }).map(() => {
          const isSpecial = Math.random() > 0.7;
    
          return {
            x: Math.random() * LAYOUT.width,
            y: Math.random() * LAYOUT.height,
            size: isSpecial
              ? Math.random() * 2 + 1.5
              : Math.random() * 1.5 + 0.5,
            opacity: new Animated.Value(Math.random()),
            scale: new Animated.Value(1), 
            isSpecial,
            color: 
                variant === 'simple'
                    ? '#FFFFFF'
                    : isSpecial
                        ? SPECIAL_COLORS[Math.floor(Math.random() * SPECIAL_COLORS.length)]
                        : STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
          };
        })
    ).current;

    useEffect(() => {
        stars.forEach((star) => {
          const minOpacity = star.isSpecial ? 0.15 : Math.random() * 0.2 + 0.05;
          const maxOpacity = star.isSpecial ? 1 : Math.random() * 0.4 + 0.6;
          const fadeOutDur = 800 + Math.random() * 2400;
          const fadeInDur  = 600 + Math.random() * 1800;
          const holdDur    = Math.random() * 1200;
    
          const twinkle = Animated.loop(
            Animated.sequence([
              Animated.timing(star.opacity, {
                toValue: maxOpacity,
                duration: fadeInDur,
                useNativeDriver: true,
              }),
              Animated.delay(holdDur),
              Animated.timing(star.opacity, {
                toValue: minOpacity,
                duration: fadeOutDur,
                useNativeDriver: true,
              }),
              Animated.delay(Math.random() * 800),
            ])
          );
    
          setTimeout(() => twinkle.start(), Math.random() * 3000);
    
          if (variant === 'full' && star.isSpecial) {
            Animated.loop(
              Animated.sequence([
                Animated.timing(star.scale, {
                  toValue: 1.3,
                  duration: 1200 + Math.random() * 800,
                  useNativeDriver: true,
                }),
                Animated.timing(star.scale, {
                  toValue: 0.85,
                  duration: 1200 + Math.random() * 800,
                  useNativeDriver: true,
                }),
              ])
            ).start();
          }
        });
    }, [variant]);

    return (
        <>
        {/* ⭐ STAR BACKGROUND */}
        <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
            {/* STATIC STARS */}
            {variant === 'full' && staticStars.map((star, index) => (
                <View
                    key={'static-' + index}
                    style={{
                    position: 'absolute',
                    left: star.x,
                    top: star.y,
                    width: star.size,
                    height: star.size,
                    opacity: star.opacity,
                    alignItems: 'center',
                    justifyContent: 'center',
                    }}
                >
                    {star.isSparkle ? (
                    <>
                        {/* vertical */}
                        <View style={{
                        position: 'absolute',
                        width: 2,
                        height: star.size * 2,
                        backgroundColor: star.color,
                        shadowColor: star.color,
                        shadowOpacity: 0.6,
                        shadowRadius: 8,
                        }} />
                        {/* horizontal */}
                        <View style={{
                        position: 'absolute',
                        width: star.size * 2,
                        height: 2,
                        backgroundColor: star.color,
                        shadowColor: star.color,
                        shadowOpacity: 0.6,
                        shadowRadius: 8,
                        }} />
                    </>
                    ) : (
                    <View style={{
                        width: star.size,
                        height: star.size,
                        borderRadius: 50,
                        backgroundColor: star.color,
                        shadowColor: star.color,
                        shadowOpacity: 1,
                        shadowRadius: 6,
                    }} />
                    )}
                </View>
            ))}

            {/* ANIMATED STARS */}
            {stars.map((star, index) => (
            <Animated.View
                key={index}
                style={{
                position: 'absolute',
                left: star.x,
                top: star.y,
                width: star.size,
                height: star.size,
                borderRadius: 50,
                backgroundColor: star.color,
                opacity: star.opacity,
                transform: [{ scale: star.scale || 1 }], 
                shadowColor: star.color,
                shadowOpacity: 1,
                shadowRadius: star.isSpecial ? 8 : 4,
            }}
            />
            ))}
        </View></>
    );
}