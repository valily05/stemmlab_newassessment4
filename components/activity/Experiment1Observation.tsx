import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

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

      <Text style={styles.title}>
        OBSERVATION
      </Text>

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
    borderWidth: 2,
    borderColor: '#6954A6',
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
  },

  title: {
    color: '#FFE95B',
    fontFamily: 'Pixel',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },

  question: {
    color: 'white',
    fontFamily: 'PixelOperator',
    fontSize: 16,
    marginTop: 12,
    marginBottom: 8,
  },

  row: {
    flexDirection: 'row',
    gap: 30,
  },

  option: {
    color: 'white',
    fontFamily: 'PixelOperator',
    fontSize: 16,
  },

  selected: {
    color: '#FFE95B',
  },

  formulaBox: {
    backgroundColor: '#0E0B24',
    borderRadius: 12,
    padding: 14,
    marginTop: 8,
  },

  formula: {
    color: '#00D9FF',
    textAlign: 'center',
    fontFamily: 'PixelOperator',
    fontSize: 15,
  },

  value: {
    color: '#00D9FF',
    textAlign: 'center',
    fontFamily: 'PixelOperator',
    fontSize: 18,
  },

  rating: {
    textAlign: 'center',
    fontFamily: 'Pixel',
    fontSize: 28,
    marginTop: 8,
    marginBottom: 20,
  },

  legendCard: {
    backgroundColor: '#0E0B24',
    borderRadius: 14,
    padding: 16,
    gap: 14,
  },

  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  legendDot: {
    fontSize: 24,
    marginRight: 12,
  },

  legendTitle: {
    color: 'white',
    fontFamily: 'Pixel',
    fontSize: 18,
  },

  legendSubtitle: {
    color: '#BFC4FF',
    fontFamily: 'PixelOperator',
    fontSize: 14,
    marginTop: 2,
  },
});