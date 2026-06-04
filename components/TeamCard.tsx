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

const { width, height } = Dimensions.get('window');

const wp = (percentage: number) =>
  PixelRatio.roundToNearestPixel((width * percentage) / 100);

const hp = (percentage: number) =>
  PixelRatio.roundToNearestPixel((height * percentage) / 100);

const rf = (size: number) => {
  const scale = width / 390;
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
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
  memberCount
}: TeamCardProps) {
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

  return (
    <TouchableOpacity activeOpacity={1} onPress={flipCard}>
      <View style={styles.flipContainer}>
        
        {/* ================= FRONT FACE ================= */}
        <Animated.View
          style={[
            styles.cardFace,
            {
              transform: [{ perspective: 1000 }, { rotateY: frontInterpolate }],
            },
          ]}
        >
          {/* Card Frame Wrapper */}
          <View style={styles.glassWrapper}>
            
            {/* 1. BLUE: Deep Royal Backing */}
            <LinearGradient
              colors={['#1A0066', '#002082', 'rgba(0,0,0,0)']}
              start={{ x: 0, y: 1 }}
              end={{ x: 0.5, y: 0.5 }}
              style={styles.frontDeepBlueBase}
            />

            {/* 2. CYAN/BLUE: Intense Neon Cyan Flare */}
            <LinearGradient
              colors={['#00F5D4', '#4CC9F0', 'rgba(0,0,0,0)']}
              locations={[0, 0.4, 1]}
              start={{ x: 0.1, y: 0.9 }}
              end={{ x: 0.5, y: 0.4 }}
              style={styles.frontCyanGlow}
            />

            {/* 3. PURPLE: Electric Violet Transition Ring */}
            <LinearGradient
              colors={['#7209B7', '#3A0CA3', 'rgba(0,0,0,0)']}
              start={{ x: 0.8, y: 0.9 }}
              end={{ x: 0.3, y: 0.3 }}
              style={styles.frontVioletGlow}
            />

            {/* 4. PINK: Ultra-Saturated Hot Pink Accent Bloom */}
            <LinearGradient
              colors={['#FF007F', '#FF4797', 'rgba(0,0,0,0)']}
              locations={[0, 0.35, 1]}
              start={{ x: 0.9, y: 1 }}
              end={{ x: 0.4, y: 0.1 }}
              style={styles.frontPinkGlow}
            />

            {/* 5. MAGENTA: Vivid Magenta Fusion Layer */}
            <LinearGradient
              colors={['#B5179E', '#9B5DE5', 'rgba(0,0,0,0)']}
              start={{ x: 1, y: 0.7 }}
              end={{ x: 0.2, y: 0.2 }}
              style={styles.frontMagentaGlow}
            />

            {/* 6. BASE GLASS: The Semi-Transparent Smoky Matte Base */}
            <LinearGradient
              colors={[
                'rgba(12, 15, 30, 0.30)',
                'rgba(8, 10, 22, 0.50)',
                'rgba(4, 5, 10, 0.75)'
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.container}
            >
              {/* Front Content Layout */}
              <View style={styles.frontContentContainer}>
                <Text style={styles.label}>TEAM</Text>
                
                <Text style={styles.teamName} numberOfLines={1}>
                  {teamName}
                </Text>

                <View style={styles.pointsRow}>
                  <Text style={styles.starIcon}>✦</Text>
                  <Text style={styles.pointsValue}>
                    {`${(totalPoints || 0).toLocaleString()} Points`}
                  </Text>
                </View>
              </View>

              <Text style={styles.flipHint}>Tap to view team info</Text>
            </LinearGradient>
          </View>
        </Animated.View>

        {/* ================= BACK FACE ================= */}
        <Animated.View
          style={[
            styles.cardBack,
            {
              transform: [{ perspective: 1000 }, { rotateY: backInterpolate }],
            },
          ]}
        >
          {/* Card Frame Wrapper */}
          <View style={styles.glassWrapper}>
            
            {/* INVERTED MESH CHANNELS FOR THE BACK SIDE */}
            <LinearGradient
              colors={['#1A0066', '#002082', 'rgba(0,0,0,0)']}
              start={{ x: 1, y: 1 }}
              end={{ x: 0.5, y: 0.5 }}
              style={styles.backDeepBlueBase}
            />
            <LinearGradient
              colors={['#00F5D4', '#4CC9F0', 'rgba(0,0,0,0)']}
              locations={[0, 0.4, 1]}
              start={{ x: 0.9, y: 0.9 }}
              end={{ x: 0.5, y: 0.4 }}
              style={styles.backCyanGlow}
            />
            <LinearGradient
              colors={['#7209B7', '#3A0CA3', 'rgba(0,0,0,0)']}
              start={{ x: 0.2, y: 0.9 }}
              end={{ x: 0.7, y: 0.3 }}
              style={styles.backVioletGlow}
            />
            <LinearGradient
              colors={['#FF007F', '#FF4797', 'rgba(0,0,0,0)']}
              locations={[0, 0.35, 1]}
              start={{ x: 0.1, y: 1 }}
              end={{ x: 0.6, y: 0.1 }}
              style={styles.backPinkGlow}
            />
            <LinearGradient
              colors={['#B5179E', '#9B5DE5', 'rgba(0,0,0,0)']}
              start={{ x: 0, y: 0.7 }}
              end={{ x: 0.8, y: 0.2 }}
              style={styles.backMagentaGlow}
            />

            {/* BASE GLASS: Same Smoked Matte overlay texture */}
            <LinearGradient
              colors={[
                'rgba(12, 15, 30, 0.30)',
                'rgba(8, 10, 22, 0.50)',
                'rgba(4, 5, 10, 0.75)'
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.container}
            >
              <View style={styles.backContentContainer}>
                <Text style={styles.backTitle}>TEAM INFO</Text>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Team Name</Text>
                  <Text style={styles.infoValue} numberOfLines={1}>
                    {teamName || 'STEMM LAB'}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Members</Text>
                  <Text style={styles.infoValue}>
                    {`${memberCount} / 4`}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Total Points</Text>
                  <Text style={styles.infoValue}>
                    {(totalPoints ?? 12450).toLocaleString()}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Current Rank</Text>
                  <Text style={styles.infoValue}>
                    {`#${rank ?? 1}`}
                  </Text>
                </View>
              </View>

              <Text style={styles.backHint}>Tap to flip back</Text>
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
    backgroundColor: '#03050c',
  },
  starIcon: {
    color: '#D8B4FE',
    fontSize: rf(18),
    marginRight: wp(2),
    fontFamily: 'Pixel',
  },
  container: {
    height: '100%',
    width: '100%',
    padding: wp(6.5),
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.18)',
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
    color: '#D1C4E9',
    fontSize: rf(20),
    fontFamily: 'PixelOperator',
    letterSpacing: 0.5,
    marginBottom: hp(0.9),
  },
  teamName: {
    color: '#FFF',
    fontSize: rf(24),
    fontFamily: 'Pixel',
    textTransform: 'uppercase',
    marginBottom: hp(1),
    textShadowColor: 'rgba(255, 255, 255, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
        marginTop:rf(7)

  },
  pointsValue: {
    color: '#D1C4E9',
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
    backgroundColor: '#F5E6FF',
    borderRadius: rf(1),
  },
  sparkleHorizontal: {
    position: 'absolute',
    width: '100%',
    height: rf(3.5),
    backgroundColor: '#F5E6FF',
    borderRadius: rf(1),
  },
  sparkleCenter: {
    position: 'absolute',
    width: rf(5.5),
    height: rf(5.5),
    backgroundColor: '#FFF',
    transform: [{ rotate: '45deg' }],
  },
  flipHint: {
    color: '#D1C4E9',
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
    color: '#FFF',
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
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  infoLabel: {
    color: '#B3A5D1', 
    fontSize: rf(14),
    fontFamily: 'PixelOperator',
    fontWeight: '500',
  },
  infoValue: {
    color: '#FFFFFF', 
    fontSize: rf(14),
    fontFamily: 'PixelBold',
    textAlign: 'right',
    maxWidth: wp(45),
  },
  backHint: {
    alignSelf: 'center',
    color: '#D1C4E9',
    fontSize: rf(13),
    fontFamily: 'PixelOperator',
    marginTop: hp(1.5),
  },
});