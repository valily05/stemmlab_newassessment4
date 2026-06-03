import { LinearGradient } from 'expo-linear-gradient';
import {
    Dimensions,
    PixelRatio,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

/* RESPONSIVE HELPERS */
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
  return (
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
      {/* TOP ROW */}
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

      {/* DIVIDER */}
      <View style={styles.divider} />

      {/* STATS */}
      <View style={styles.statsRow}>

        <View style={styles.stat}>
          <Text style={styles.statValue}>
            {totalPoints.toLocaleString()}
          </Text>

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

      {/* BUTTON */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          Manage Team
        </Text>
      </TouchableOpacity>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({

  container: {
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

    marginTop: hp(0.4),

    fontFamily: 'Pixel',
  },

  teamCode: {
    color: 'rgba(255,255,255,0.65)',

    fontSize: rf(15),

    marginTop: hp(0.5),

    fontFamily: 'PixelOperator',
  },

  rankBadge: {
    width: wp(16),

    height: wp(16),

    borderRadius: wp(8),

    backgroundColor: 'rgba(160,97,245,0.15)',

    borderWidth: 1,

    borderColor: 'rgba(255,255,255,0.08)',

    justifyContent: 'center',

    alignItems: 'center',
  },

  rankText: {
    color: '#F4C86B',

    fontSize: rf(18),

    fontFamily: 'Pixel',
  },

  divider: {
    height: 1,

    backgroundColor: 'rgba(255,255,255,0.08)',

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
    color: '#FFFFFF',

    fontSize: rf(22),

    fontFamily: 'Pixel',
  },

  statLabel: {
    color: 'rgba(255,255,255,0.6)',

    fontSize: rf(13),

    marginTop: hp(0.5),

    fontFamily: 'PixelOperator',
  },

  button: {
    marginTop: hp(2.5),

    backgroundColor: 'rgba(160,97,245,0.18)',

    borderRadius: rf(14),

    borderWidth: 1,

    borderColor: 'rgba(255,255,255,0.08)',

    paddingVertical: hp(1.4),

    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',

    fontSize: rf(15),

    fontFamily: 'Pixel',
  },

});