import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useTheme } from '@/context/ThemeContext';

const { width, height } = Dimensions.get('window');

const wp = (percentage: number) =>
  PixelRatio.roundToNearestPixel((width * percentage) / 100);

const hp = (percentage: number) =>
  PixelRatio.roundToNearestPixel((height * percentage) / 100);

const rf = (size: number) => {
  const scale = width / 390;
  return Math.round(
    PixelRatio.roundToNearestPixel(size * scale)
  );
};

interface TeamCardProps {
  teamName: string;
  teamCode: string;
  totalPoints: number;
  rank: number;
  memberCount: number;
}

export default function TeamCard({
  teamName,
  teamCode,
  totalPoints,
  rank,
  memberCount,
}: TeamCardProps) {
  const { theme, isDark } = useTheme();

  const [flipped, setFlipped] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;

  const flipCard = () => {
    Animated.spring(flipAnim, {
      toValue: flipped ? 0 : 180,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();

    setFlipped(!flipped);
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  /* ---------- LIGHT / DARK PALETTE ---------- */

  const wrapperColor = isDark ? '#03050C' : '#FFFFFF';

  const glassColors = isDark
    ? [
        'rgba(12,15,30,0.30)',
        'rgba(8,10,22,0.50)',
        'rgba(4,5,10,0.75)',
      ]
    : [
        'rgba(255,255,255,0.95)',
        'rgba(248,250,255,0.90)',
        'rgba(239,244,255,0.82)',
      ];

  const borderColor = isDark
    ? 'rgba(255,255,255,0.18)'
    : 'rgba(148,163,184,0.18)';

  const textPrimary = isDark ? '#FFFFFF' : '#1E293B';
  const textSecondary = isDark ? '#D1C4E9' : '#64748B';

  const starColor = isDark ? '#D8B4FE' : '#7C3AED';

  const blueGlow = isDark
    ? ['#1A0066', '#002082', 'transparent']
    : ['#A5D8FF', '#D9ECFF', 'transparent'];

  const cyanGlow = isDark
    ? ['#00F5D4', '#4CC9F0', 'transparent']
    : ['#A7F3FF', '#E7FBFF', 'transparent'];

  const violetGlow = isDark
    ? ['#7209B7', '#3A0CA3', 'transparent']
    : ['#DCCBFF', '#F3EDFF', 'transparent'];

  const pinkGlow = isDark
    ? ['#FF007F', '#FF4797', 'transparent']
    : ['#FFD6EA', '#FFF2F8', 'transparent'];

  const magentaGlow = isDark
    ? ['#B5179E', '#9B5DE5', 'transparent']
    : ['#E7D6FF', '#F7F2FF', 'transparent'];

  return (
    <TouchableOpacity activeOpacity={1} onPress={flipCard}>
      <View style={styles.flipContainer}>
        
        {/* ================= FRONT ================= */}
        <Animated.View
          style={[styles.cardFace, { transform: [{ perspective: 1000 }, { rotateY: frontInterpolate }] }]}
        >
          <View style={[styles.glassWrapper, { backgroundColor: wrapperColor }]}>
            <LinearGradient colors={blueGlow} start={{ x: 0, y: 1 }} end={{ x: 0.55, y: 0.45 }} style={styles.frontDeepBlueBase} />
            <LinearGradient colors={cyanGlow} start={{ x: 0.1, y: 0.35 }} end={{ x: 0.5, y: 0.4 }} locations={[0, 0.4, 1]} style={styles.frontCyanGlow} />
            <LinearGradient colors={violetGlow} start={{ x: 0.85, y: 0.35 }} end={{ x: 0.3, y: 0.25 }} style={styles.frontVioletGlow} />
            <LinearGradient colors={pinkGlow} start={{ x: 1, y: 1 }} end={{ x: 0.45, y: 0.15 }} locations={[0, 0.35, 1]} style={styles.frontPinkGlow} />
            <LinearGradient colors={magentaGlow} start={{ x: 1, y: 0.65 }} end={{ x: 0.2, y: 0.2 }} style={styles.frontMagentaGlow} />

            <LinearGradient colors={glassColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.container, { borderColor }]}>
              <View style={styles.frontContentContainer}>
                <Text style={[styles.label, { color: textSecondary }]}>TEAM</Text>
                <Text style={[styles.teamName, { color: textPrimary }]} numberOfLines={1}>{teamName}</Text>
                <View style={styles.pointsRow}>
                  <Text style={[styles.starIcon, { color: starColor }]}>✦</Text>
                  <Text style={[styles.pointsValue, { color: textSecondary }]}>{(totalPoints ?? 0).toLocaleString()} Points</Text>
                </View>
              </View>
              <Text style={[styles.flipHint, { color: textSecondary }]}>Tap to view team info</Text>
            </LinearGradient>
          </View>
        </Animated.View>

        {/* ================= BACK ================= */}
        <Animated.View
          style={[styles.cardBack, { transform: [{ perspective: 1000 }, { rotateY: backInterpolate }] }]}
        >
          <View style={[styles.glassWrapper, { backgroundColor: wrapperColor }]}>
            <LinearGradient colors={blueGlow} start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }} style={styles.backDeepBlueBase} />
            <LinearGradient colors={cyanGlow} start={{ x: 0.9, y: 0.9 }} end={{ x: 0.1, y: 0.1 }} locations={[0, 0.4, 1]} style={styles.backCyanGlow} />
            <LinearGradient colors={violetGlow} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.backVioletGlow} />
            <LinearGradient colors={pinkGlow} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} locations={[0, 0.35, 1]} style={styles.backPinkGlow} />
            <LinearGradient colors={magentaGlow} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} style={styles.backMagentaGlow} />

            <LinearGradient colors={glassColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.container, { borderColor }]}>
              <View style={styles.backContentContainer}>
                <Text style={[styles.backTitle, { color: textPrimary }]}>TEAM INFO</Text>
                
                <View style={[styles.infoRow, { borderBottomColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)' }]}>
                  <Text style={[styles.infoLabel, { color: textSecondary }]}>Team Code</Text>
                  <Text style={[styles.infoValue, { color: textPrimary }]}>{teamCode}</Text>
                </View>
                <View style={[styles.infoRow, { borderBottomColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)' }]}>
                  <Text style={[styles.infoLabel, { color: textSecondary }]}>Members</Text>
                  <Text style={[styles.infoValue, { color: textPrimary }]}>{memberCount} / 4</Text>
                </View>
                <View style={[styles.infoRow, { borderBottomColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)' }]}>
                  <Text style={[styles.infoLabel, { color: textSecondary }]}>Rank</Text>
                  <Text style={[styles.infoValue, { color: textPrimary }]}>#{rank}</Text>
                </View>
              </View>
              <Text style={[styles.backHint, { color: textSecondary }]}>Tap to flip back</Text>
            </LinearGradient>
          </View>
        </Animated.View>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  flipContainer: {
    height: hp(26),
    width: '100%',
    position: 'relative',
  },
  cardFace: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
  },
  glassWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: rf(26),
    overflow: 'hidden',
  },
  starIcon: {
    fontSize: rf(18),
    marginRight: wp(2),
    fontFamily: 'Pixel',
  },
  container: {
    height: '100%',
    width: '100%',
    padding: wp(6.5),
    borderWidth: 1.5,
    borderRadius: rf(26),
    justifyContent: 'space-between',
  },
  frontContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: hp(1.5),
  },
  label: {
    fontSize: rf(20),
    fontFamily: 'PixelOperator',
    letterSpacing: 0.5,
    marginBottom: hp(0.9),
  },
  teamName: {
    fontSize: rf(24),
    fontFamily: 'Pixel',
    textTransform: 'uppercase',
    marginBottom: hp(1),
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rf(7),
  },
  pointsValue: {
    fontSize: rf(15.5),
    fontFamily: 'PixelOperator',
    fontWeight: '500',
  },
  sparkleIcon: {
    width: rf(14),
    height: rf(14),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(2.2),
  },
  sparkleVertical: {
    position: 'absolute',
    width: rf(3.5),
    height: '100%',
    borderRadius: rf(1),
  },
  sparkleHorizontal: {
    position: 'absolute',
    width: '100%',
    height: rf(3.5),
    borderRadius: rf(1),
  },
  sparkleCenter: {
    position: 'absolute',
    width: rf(5.5),
    height: rf(5.5),
    transform: [{ rotate: '45deg' }],
  },
  flipHint: {
    fontSize: rf(13),
    fontFamily: 'PixelOperator',
  },
  frontDeepBlueBase: {
    position: 'absolute',
    bottom: -hp(10),
    left: -wp(10),
    width: wp(65),
    height: wp(65),
    borderRadius: wp(32.5),
    opacity: 0.9,
  },
  frontCyanGlow: {
    position: 'absolute',
    bottom: -hp(15),
    left: -wp(20),
    width: wp(72),
    height: wp(72),
    borderRadius: wp(36),
    opacity: 0.95,
  },
  frontVioletGlow: {
    position: 'absolute',
    bottom: -hp(15),
    right: -wp(15),
    width: wp(90),
    height: wp(90),
    borderRadius: wp(45),
    opacity: 0.85,
  },
  frontPinkGlow: {
    position: 'absolute',
    bottom: -hp(22),
    right: -wp(10),
    width: wp(80),
    height: wp(80),
    borderRadius: wp(40),
    opacity: 0.95,
  },
  frontMagentaGlow: {
    position: 'absolute',
    bottom: -hp(10),
    right: -wp(30),
    width: wp(85),
    height: wp(85),
    borderRadius: wp(42.5),
    opacity: 0.9,
  },
  backDeepBlueBase: {
    position: 'absolute',
    bottom: -hp(10),
    right: -wp(10),
    width: wp(65),
    height: wp(65),
    borderRadius: wp(32.5),
    opacity: 0.9,
  },
  backCyanGlow: {
    position: 'absolute',
    bottom: -hp(15),
    right: -wp(20),
    width: wp(72),
    height: wp(72),
    borderRadius: wp(36),
    opacity: 0.95,
  },
  backVioletGlow: {
    position: 'absolute',
    bottom: -hp(15),
    left: -wp(15),
    width: wp(90),
    height: wp(90),
    borderRadius: wp(45),
    opacity: 0.85,
  },
  backPinkGlow: {
    position: 'absolute',
    bottom: -hp(22),
    left: -wp(10),
    width: wp(80),
    height: wp(80),
    borderRadius: wp(40),
    opacity: 0.95,
  },
  backMagentaGlow: {
    position: 'absolute',
    bottom: -hp(10),
    left: -wp(30),
    width: wp(85),
    height: wp(85),
    borderRadius: wp(42.5),
    opacity: 0.9,
  },
  backContentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: wp(1),
    marginTop: hp(0.5),
  },
  backTitle: {
    fontSize: rf(20),
    fontFamily: 'Pixel',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
    marginBottom: hp(2),
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(0.8),
    borderBottomWidth: 1,
  },
  infoLabel: {
    fontSize: rf(14),
    fontFamily: 'PixelOperator',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: rf(14),
    fontFamily: 'PixelBold',
    textAlign: 'right',
    maxWidth: wp(45),
  },
  backHint: {
    alignSelf: 'center',
    fontSize: rf(13),
    fontFamily: 'PixelOperator',
    marginTop: hp(1.5),
  },
});