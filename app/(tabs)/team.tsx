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
  PixelRatio.roundToNearestPixel(
    (width * percentage) / 100
  );

const hp = (percentage: number) =>
  PixelRatio.roundToNearestPixel(
    (height * percentage) / 100
  );

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
}

export default function TeamCard({
  teamName,
  teamCode,
  totalPoints,
  rank,
}: TeamCardProps) {
  const [flipped, setFlipped] = useState(false);

  const flipAnim = useRef(
    new Animated.Value(0)
  ).current;

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
    <TouchableOpacity
      activeOpacity={1}
      onPress={flipCard}
    >
      <View style={styles.flipContainer}>

        {/* FRONT */}

        <Animated.View
          style={[
            styles.cardFace,
                      
            {
transform: [
  { perspective: 1000 },
  { rotateY: frontInterpolate },
],
            },
          ]}
        >
          <LinearGradient
            colors={[
              '#0A041D',
              '#160734',
              '#220A4D',
              '#160734',
              '#0A041D',
            ]}
            locations={[
              0,
              0.25,
              0.5,
              0.75,
              1,
            ]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.8 }}
            style={styles.container}
          >
            <View style={styles.topRow}>

              <View>
                <Text style={styles.label}>
                  TEAM
                </Text>

                <Text style={styles.teamName}>
                  {teamName}
                </Text>

                <Text style={styles.teamCode}>
                  {teamCode}
                </Text>
              </View>

              <View style={styles.rankBadge}>
                <Text style={styles.rankText}>
                  #{rank}
                </Text>
              </View>

            </View>

            <View style={styles.divider} />

            <View style={styles.statsRow}>

              <View style={styles.stat}>
                <Text style={styles.statValue}>
{(totalPoints ?? 0).toLocaleString()}                </Text>

                <Text style={styles.statLabel}>
                  Team Points
                </Text>
              </View>

              <View style={styles.stat}>
                <Text style={styles.statValue}>
                  4
                </Text>

                <Text style={styles.statLabel}>
                  Members
                </Text>
              </View>

            </View>

            <Text style={styles.flipHint}>
              Tap to view details
            </Text>

          </LinearGradient>
        </Animated.View>

        {/* BACK */}

        <Animated.View
          style={[
            styles.cardFace,
            {
transform: [
  { perspective: 1000 },
  { rotateY: backInterpolate },
],
            },
          ]}
        >
          <LinearGradient
            colors={[
              '#0A041D',
              '#160734',
              '#220A4D',
              '#160734',
              '#0A041D',
            ]}
            locations={[
              0,
              0.25,
              0.5,
              0.75,
              1,
            ]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.8 }}
            style={styles.container}
          >
            <Text style={styles.backTitle}>
              TEAM DETAILS
            </Text>

            <Text style={styles.backText}>
              👑 Leader: Valencia
            </Text>

            <Text style={styles.backText}>
              🚀 Members: 4 / 4
            </Text>

            <Text style={styles.backText}>
              🏆 Rank: #{rank}
            </Text>

            <Text style={styles.backText}>
              ⭐ Total Points:
              {' '}
{(totalPoints ?? 0).toLocaleString()}            </Text>

            <Text style={styles.backHint}>
              Tap to flip back
            </Text>

          </LinearGradient>
        </Animated.View>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  flipContainer: {
    height: hp(26),
  },

  cardFace: {
    position: 'absolute',
    width: '100%',
    backfaceVisibility: 'hidden',
  },

  container: {
    height: hp(26),

    borderRadius: rf(24),

    padding: wp(5),

    borderWidth: 1,

    borderColor: 'rgba(255,255,255,0.08)',

    overflow: 'hidden',
  },

  topRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  label: {
    color: '#A88DFF',

    fontSize: rf(12),

    fontFamily: 'PixelOperator',
  },

  teamName: {
    color: '#FFFFFF',

    fontSize: rf(24),

    marginTop: hp(0.5),

    fontFamily: 'Pixel',
  },

  teamCode: {
    color: 'rgba(255,255,255,0.65)',

    marginTop: hp(0.4),

    fontSize: rf(14),

    fontFamily: 'PixelOperator',
  },

  rankBadge: {
    width: wp(15),

    height: wp(15),

    borderRadius: wp(7.5),

    backgroundColor:
      'rgba(160,97,245,0.15)',

    justifyContent: 'center',

    alignItems: 'center',

    borderWidth: 1,

    borderColor:
      'rgba(255,255,255,0.08)',
  },

  rankText: {
    color: '#F4C86B',

    fontSize: rf(18),

    fontFamily: 'Pixel',
  },

  divider: {
    height: 1,

    backgroundColor:
      'rgba(255,255,255,0.08)',

    marginVertical: hp(2),
  },

  statsRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',
  },

  stat: {
    flex: 1,
  },

  statValue: {
    color: '#FFF',

    fontSize: rf(22),

    fontFamily: 'Pixel',
  },

  statLabel: {
    color:
      'rgba(255,255,255,0.6)',

    fontSize: rf(13),

    marginTop: hp(0.5),

    fontFamily: 'PixelOperator',
  },

  flipHint: {
    marginTop: hp(2.5),

    color: '#A88DFF',

    textAlign: 'center',

    fontSize: rf(12),

    fontFamily: 'PixelOperator',
  },

  backTitle: {
    color: '#FFF',

    fontSize: rf(22),

    marginBottom: hp(2),

    fontFamily: 'Pixel',
  },

  backText: {
    color: '#FFF',

    marginBottom: hp(1.2),

    fontSize: rf(15),

    fontFamily: 'PixelOperator',
  },

  backHint: {
    position: 'absolute',

    bottom: hp(2),

    alignSelf: 'center',

    color: '#A88DFF',

    fontSize: rf(12),

    fontFamily: 'PixelOperator',
  },
cardBack: {
  position: 'absolute',
  width: '100%',
},


});