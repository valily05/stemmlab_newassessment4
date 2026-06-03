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
<View style={styles.frontContent}>

  <Text style={styles.teamName}>
    STEMM LAB
  </Text>


  <Text style={styles.flipHint}>
    Tap to view team info
  </Text>

</View>

          </LinearGradient>
        </Animated.View>

        {/* BACK */}
<Animated.View
  style={[
    styles.cardBack,
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
          ><Text style={styles.backTitle}>
  TEAM INFO
</Text>

<View style={styles.infoRow}>
  <Text style={styles.infoLabel}>
    Team
  </Text>

  <Text style={styles.infoValue}>
    STEMM LAB
  </Text>
</View>

<View style={styles.infoRow}>
  <Text style={styles.infoLabel}>
    Members
  </Text>

  <Text style={styles.infoValue}>
    4 / 4
  </Text>
</View>

<View style={styles.infoRow}>
  <Text style={styles.infoLabel}>
    Points
  </Text>

  <Text style={styles.infoValue}>
    {(totalPoints ?? 0).toLocaleString()}
  </Text>
</View>

<View style={styles.infoRow}>
  <Text style={styles.infoLabel}>
    Rank
  </Text>

  <Text style={styles.infoValue}>
    #{rank}
  </Text>
</View>

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
  infoRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

  paddingVertical: hp(1.2),

  borderBottomWidth: 1,
  borderBottomColor: 'rgba(255,255,255,0.05)',
},
teamCodeCard: {
  marginTop: hp(2),

  backgroundColor: '#140726',

  borderRadius: rf(18),

  paddingVertical: hp(2),
  paddingHorizontal: wp(5),

  borderWidth: 1,
  borderColor: '#2B1459',

  alignItems: 'center',
},

teamCodeLabel: {
  color: '#A88DFF',
  fontSize: rf(12),
  fontFamily: 'PixelOperator',
},

teamCodeValue: {
  color: '#FFF',

  fontSize: rf(28),

  marginTop: hp(1),

  fontFamily: 'Pixel',
},

teamCodeHint: {
  color: 'rgba(255,255,255,0.6)',

  marginTop: hp(1),

  fontSize: rf(12),

  fontFamily: 'PixelOperator',
},
infoLabel: {
  color: '#A88DFF',
  fontSize: rf(14),
  fontFamily: 'PixelOperator',
},

infoValue: {
  color: '#FFF',
  fontSize: rf(15),
  fontFamily: 'Pixel',
},
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


  teamCode: {
    color: 'rgba(255,255,255,0.65)',

    marginTop: hp(0.4),

    fontSize: rf(14),

    fontFamily: 'PixelOperator',
  },
frontContent: {
  flex: 1,

  justifyContent: 'center',

  alignItems: 'center',
},

teamName: {
  color: '#FFF',

  fontSize: rf(30),

  fontFamily: 'Pixel',

  textAlign: 'center',
},



flipHint: {
  position: 'absolute',

  bottom: hp(2),

  color: '#A88DFF',

  fontSize: rf(12),

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


});