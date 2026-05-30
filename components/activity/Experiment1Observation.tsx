import {
  Dimensions,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
const { width, height } =
  Dimensions.get('window');

const wp = (
  percentage: number
) =>
  PixelRatio.roundToNearestPixel(
    (width * percentage) / 100
  );

const hp = (
  percentage: number
) =>
  PixelRatio.roundToNearestPixel(
    (height * percentage) / 100
  );

const rf = (
  size: number
) => {
  const scale = width / 390;

  return Math.round(
    PixelRatio.roundToNearestPixel(
      size * scale
    )
  );
};
interface Props {
  inTarget: boolean | null;
  setInTarget: (
    value: boolean
  ) => void;

  bounced: boolean | null;
  setBounced: (
    value: boolean
  ) => void;

  dropHeight: number;

  firstHitTime: string | null;
  stopMovingTime: string | null;
}

export default function Experiment1Observation({
  inTarget,
  setInTarget,
  bounced,
  setBounced,
  dropHeight,
  firstHitTime,
  stopMovingTime,
}: Props) {
  const parseTime = (
    value: string | null
  ) => {
    if (!value) {
      return 0;
    }

    const [minSec, centi] =
      value.split('.');

    const [min, sec] =
      minSec.split(':');

    return (
      Number(min) * 60 +
      Number(sec) +
      Number(centi) / 100
    );
  };

  const first =
    parseTime(firstHitTime);

  const stop =
    parseTime(stopMovingTime);

  const contactTime =
    Math.max(
      stop - first,
      0.01
    );

  const velocity =
    Math.sqrt(
      2 * 9.81 * dropHeight
    );

  const gForce =
    velocity /
    (contactTime * 9.81);

  let impactRating =
    'SAFE';

  let ratingColor =
    '#4CAF50';

  if (gForce >= 5) {
    impactRating = 'MEDIUM';
    ratingColor = '#FFD54F';
  }

  if (gForce >= 10) {
    impactRating = 'HARD';
    ratingColor = '#FF4D4D';
  }

  return (
    <View style={styles.card}>

<View style={styles.titleContainer}>
  <Text style={styles.title}>
    OBSERVATION
  </Text>
</View>

      <Text style={styles.question}>
        ① In Target?
      </Text>

      <View style={styles.row}>
        <TouchableOpacity
          onPress={() =>
            setInTarget(true)
          }
        >
          <Text
            style={[
              styles.option,
              inTarget === true &&
                styles.selected,
            ]}
          >
            ● Yes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            setInTarget(false)
          }
        >
          <Text
            style={[
              styles.option,
              inTarget === false &&
                styles.selected,
            ]}
          >
            ● No
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.question}>
        ② Bounce?
      </Text>

      <View style={styles.row}>
        <TouchableOpacity
          onPress={() =>
            setBounced(true)
          }
        >
          <Text
            style={[
              styles.option,
              bounced === true &&
                styles.selected,
            ]}
          >
            ● Yes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            setBounced(false)
          }
        >
          <Text
            style={[
              styles.option,
              bounced === false &&
                styles.selected,
            ]}
          >
            ● No
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.question}>
        Formula Used
      </Text>

      <View style={styles.formulaBox}>
        <Text style={styles.formula}>
          {bounced
            ? 'G = (v + vr) / (t × 9.81)'
            : 'G = v / (t × 9.81)'}
        </Text>
      </View>

      <Text style={styles.question}>
        Drop Height
      </Text>

      <Text style={styles.value}>
        {dropHeight} m
      </Text>

      <Text style={styles.question}>
        Contact Time
      </Text>

      <Text style={styles.value}>
        {contactTime.toFixed(2)} s
      </Text>

      <Text style={styles.question}>
        Calculated G-Force
      </Text>

      <Text style={styles.value}>
        {gForce.toFixed(2)} g
      </Text>

      <Text style={styles.question}>
        Impact Rating
      </Text>

      <Text
        style={[
          styles.rating,
          {
            color: ratingColor,
          },
        ]}
      >
        {impactRating}
      </Text>

      <View style={styles.legendCard}>

        <View style={styles.legendRow}>
          <Text style={styles.legendDot}>
            🟢
          </Text>

          <View>
            <Text style={styles.legendTitle}>
              SAFE
            </Text>

            <Text style={styles.legendSubtitle}>
              1–5 g
            </Text>
          </View>
        </View>

        <View style={styles.legendRow}>
          <Text style={styles.legendDot}>
            🟡
          </Text>

          <View>
            <Text style={styles.legendTitle}>
              MEDIUM
            </Text>

            <Text style={styles.legendSubtitle}>
              5–10 g
            </Text>
          </View>
        </View>

        <View style={styles.legendRow}>
          <Text style={styles.legendDot}>
            🔴
          </Text>

          <View>
            <Text style={styles.legendTitle}>
              HARD
            </Text>

            <Text style={styles.legendSubtitle}>
              10+ g
            </Text>
          </View>
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#15112F',
    borderWidth: rf(2),
    borderColor: '#6954A6',
    borderRadius: rf(16),
    padding: wp(4),
    marginTop: hp(1.5),
  },

  titleContainer: {
    backgroundColor: '#7A224A',

    borderWidth: rf(2),
    borderColor: '#A83A6A',

    borderRadius: rf(12),

    paddingVertical: hp(1.2),

    marginBottom: hp(2.5),
  },

  title: {
    color: '#FFFFFF',
    fontFamily: 'Pixel',
    fontSize: rf(20),
    textAlign: 'center',
  },

  question: {
    color: '#FFC509',
    fontFamily: 'PixelBold',
    fontSize: rf(20),

    marginTop: hp(1.5),
    marginBottom: hp(1),
  },

  row: {
    flexDirection: 'row',
    gap: wp(8),
  },

  option: {
    color: 'white',
    fontFamily: 'PixelOperator',
    fontSize: rf(18),
  },

  selected: {
    color: '#FFE95B',
  },

  formulaBox: {
    backgroundColor: '#0E0B24',

    borderRadius: rf(12),

    padding: wp(4),

    marginTop: hp(1),
  },

  formula: {
    color: '#00D9FF',
    textAlign: 'center',
    fontFamily: 'PixelOperator',
    fontSize: rf(15),
  },

  value: {
    color: '#00D9FF',
    textAlign: 'center',
    fontFamily: 'PixelOperator',
    fontSize: rf(20),
  },

  rating: {
    textAlign: 'center',

    fontFamily: 'Pixel',

    fontSize: rf(34),

    marginTop: hp(1),

    marginBottom: hp(2.5),
  },

  legendCard: {
    backgroundColor: '#0E0B24',

    borderRadius: rf(14),

    padding: wp(4),

    gap: hp(1.5),
  },

  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  legendDot: {
    fontSize: rf(24),

    marginRight: wp(3),
  },

  legendTitle: {
    color: 'white',

    fontFamily: 'Pixel',

    fontSize: rf(20),

    letterSpacing: rf(2),
  },

  legendSubtitle: {
    color: '#BFC4FF',

    fontFamily: 'PixelOperator',

    fontSize: rf(14),

    marginTop: hp(0.2),
  },
});