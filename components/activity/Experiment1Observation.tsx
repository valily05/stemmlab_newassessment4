import {
  ArrowDown,
  Calculator,
  ChartColumn,
  Clock3,
  ShieldAlert
} from 'lucide-react-native';
import { useState } from 'react';
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
type Props = {
  inTarget: boolean | null;
  setInTarget: (
    value: boolean | null
  ) => void;

  bounced: boolean | null;
  setBounced: (
    value: boolean | null
  ) => void;

  dropHeight: number;

  firstHitTime: string | null;
  stopMovingTime: string | null;


};
export default function Experiment1Observation({
  inTarget,
  setInTarget,
  bounced,
  setBounced,
  dropHeight,
  firstHitTime,
  stopMovingTime,
}: Props) {



  const [showTimeFormula, setShowTimeFormula] =
    useState(false);
const [showimpactForceFormula, setShowimpactForceFormula] =
  useState(false);
  const [showVelocityFormula, setShowVelocityFormula] =
  useState(false);

const [showAccelerationFormula, setShowAccelerationFormula] =
  useState(false);
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

const acceleration =
  velocity / contactTime;

const gForce =
  velocity /
  (contactTime * 9.81);
let impactRating = 'SAFE';
let ratingColor = '#00E84A';

if (gForce  >= 5 && gForce  < 10) {
  impactRating = 'CAUTION';
  ratingColor = '#FFD54F';
}

if (gForce  >= 10 && gForce  < 30) {
  impactRating = 'HIGH';
  ratingColor = '#FF9800';
}

if (gForce  >= 30 && gForce  < 50) {
  impactRating = 'SEVERE';
  ratingColor = '#FF4D4D';
}
if (gForce  >= 50) {
  impactRating = 'EXTREME';
  ratingColor = '#A00000';
}

const iconColor =
  impactRating === 'SAFE'
    ? '#00E84A'
    : impactRating === 'CAUTION'
    ? '#FFD54F'
    : impactRating === 'HIGH'
    ? '#FF9800'
    : impactRating === 'SEVERE'
    ? '#FF4D4D'
    : '#A00000';

const ratingBackground =
  impactRating === 'SAFE'
    ? '#10311A'
    : impactRating === 'CAUTION'
    ? '#3A2F08'
    : impactRating === 'HIGH'
    ? '#3A2000'
    : impactRating === 'SEVERE'
    ? '#3A1010'
    : '#200000';
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

<View style={styles.metricHeader}>
  <Calculator
    size={rf(22)}
    color="#9B6DFF"
  />

  <Text style={styles.metricHeaderText}>
    FORMULA USED
  </Text>
</View>

      <View style={styles.formulaBox}>
        <Text style={styles.formula}>
          {bounced
            ? 'G = (v + vr) / (t × 9.81)'
            : 'G = v / (t × 9.81)'}
        </Text>
      </View>
<View style={styles.metricRow}>
  <View style={styles.metricLeft}>
    <ArrowDown
      size={rf(20)}
      color="#9B6DFF"
    />

    <Text style={styles.metricLabel}>
      DROP HEIGHT
    </Text>
  </View>

  <Text style={styles.metricValue}>
    {dropHeight} m
  </Text>
</View>
<TouchableOpacity
  style={styles.metricRow}
  onPress={() =>
    setShowVelocityFormula(
      !showVelocityFormula
    )
  }
>
  <View style={styles.metricLeft}>
    <ChartColumn
      size={rf(22)}
      color="#9B6DFF"
    />

    <Text style={styles.metricLabel}>
      VELOCITY
    </Text>
  </View>

  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      gap: wp(2),
    }}
  >
    <Text style={styles.metricValue}>
      {velocity.toFixed(2)} m/s
    </Text>

    <Text style={styles.expandIcon}>
      {showVelocityFormula ? '−' : '+'}
    </Text>
  </View>
</TouchableOpacity>
{showVelocityFormula && (
  <View style={styles.dropdownBox}>
    <Text style={styles.dropdownTitle}>
      Formula
    </Text>

    <Text style={styles.dropdownText}>
      Velocity = √(2 × g × h)
    </Text>

    <Text style={styles.dropdownExample}>
      √(2 × 9.81 × {dropHeight})
    </Text>

    <Text style={styles.dropdownResult}>
      = {velocity.toFixed(2)} m/s
    </Text>
  </View>
)}
<TouchableOpacity
  style={styles.metricRow}
  onPress={() =>
    setShowTimeFormula(
      !showTimeFormula
    )
  }
>
  <View style={styles.metricLeft}>
    <Clock3
      size={rf(20)}
      color="#9B6DFF"
    />

    <Text style={styles.metricLabel}>
      TIME TO STOP
    </Text>
  </View>

<View
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  }}
>
  <Text style={styles.metricValue}>
    {contactTime.toFixed(2)} s
  </Text>

  <Text style={styles.expandIcon}>
    {showTimeFormula ? '−' : '+'}
  </Text>
</View>
</TouchableOpacity>

{showTimeFormula && (
  <View style={styles.dropdownBox}>
    <Text style={styles.dropdownTitle}>
      Formula
    </Text>

    <Text style={styles.dropdownText}>
      Time To Stop =
      Stop Moving Time -
      First Hit Time
    </Text>

    <Text style={styles.dropdownExample}>
      {stopMovingTime || '--'} -
      {firstHitTime || '--'}
    </Text>

    <Text style={styles.dropdownResult}>
      = {contactTime.toFixed(2)} s
    </Text>
  </View>
)}
<TouchableOpacity
  style={styles.metricRow}
  onPress={() =>
    setShowAccelerationFormula(
      !showAccelerationFormula
    )
  }
>
  <View style={styles.metricLeft}>
    <Calculator
      size={rf(22)}
      color="#9B6DFF"
    />

    <Text style={styles.metricLabel}>
      ACCELERATION
    </Text>
  </View>

  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      gap: wp(2),
    }}
  >
    <Text style={styles.metricValue}>
      {acceleration.toFixed(2)} m/s²
    </Text>

    <Text style={styles.expandIcon}>
      {showAccelerationFormula ? '−' : '+'}
    </Text>
  </View>
</TouchableOpacity>
{showAccelerationFormula && (
  <View style={styles.dropdownBox}>
    <Text style={styles.dropdownTitle}>
      Formula
    </Text>

    <Text style={styles.dropdownText}>
      Acceleration = Velocity ÷ Time
    </Text>

    <Text style={styles.dropdownExample}>
      {velocity.toFixed(2)} ÷
      {contactTime.toFixed(2)}
    </Text>

    <Text style={styles.dropdownResult}>
      = {acceleration.toFixed(2)} m/s²
    </Text>
  </View>
)}
<TouchableOpacity
  style={styles.metricRow}
  onPress={() =>
    setShowimpactForceFormula(
      !showimpactForceFormula
    )
  }
>
  <View style={styles.metricLeft}>
    <ChartColumn
      size={rf(22)}
      color="#9B6DFF"
    />

    <Text style={styles.metricLabel}>
      CALCULATED G-FORCE 
    </Text>
  </View>

  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      gap: wp(2),
    }}
  >
    <Text style={styles.metricValue}>
{gForce.toFixed(2)} g
    </Text>
<Text style={styles.expandIcon}>
  {showimpactForceFormula ? '−' : '+'}
</Text>
</View>
</TouchableOpacity>

{showimpactForceFormula && (
  <View style={styles.dropdownBox}>
    <Text style={styles.dropdownTitle}>
      Formula
    </Text>

    <Text style={styles.dropdownText}>
      G = v / (t × 9.81)
    </Text>

    <Text style={styles.dropdownExample}>
      {velocity.toFixed(2)} / (
      {contactTime.toFixed(2)} ×
      9.81)
    </Text>

    <Text style={styles.dropdownResult}>
= {gForce.toFixed(2)} g    </Text>
  </View>
)}
<Text style={styles.impactLabel}>
  IMPACT RATING
</Text>

<View
  style={[
    styles.ratingBox,
    {
      backgroundColor: ratingBackground,
      borderColor: iconColor,
    },
  ]}
>
  <ShieldAlert
    size={rf(22)}
    color={iconColor}
  />

  <Text
    style={[
      styles.ratingText,
      {
        color: iconColor,
      },
    ]}
  >
    {impactRating}
  </Text>
</View>

<View style={styles.legendCard}>
  <Text style={styles.legendText}>
    🟢 SAFE (1–5g)
  </Text>

  <Text style={styles.legendText}>
    🟡 CAUTION (5–10g)
  </Text>

  <Text style={styles.legendText}>
    🟠 HIGH (10–30g)
  </Text>

  <Text style={styles.legendText}>
    🔴 SEVERE (30–50g)
  </Text>

  <Text style={styles.legendText}>
    ⚫ EXTREME (50g+)
  </Text>
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  legendCard: {
  backgroundColor: '#0E0B24',
  borderRadius: rf(14),
  padding: wp(4),
  gap: hp(0.8),
},

legendText: {
  color: '#FFFFFF',
  fontFamily: 'PixelOperator',
  fontSize: rf(13),
},
  card: {
    backgroundColor: '#15112F',
    borderWidth: rf(2),
    borderColor: '#6954A6',
    borderRadius: rf(16),
    padding: wp(4),
    marginTop: hp(1.5),
  },
dropdownBox: {
  backgroundColor: '#0E0B24',
  borderWidth: 1,
  borderColor: '#2B2554',
  borderRadius: rf(12),
  padding: wp(4),
  marginTop: hp(1),
  marginBottom: hp(1),
},
expandIcon: {
  color: '#AC60FC',
  fontFamily: 'PixelOperator',
  fontSize: rf(27),
  width: rf(27),
  textAlign: 'center',
},
dropdownTitle: {
  color: '#ffffff',
  fontFamily: 'PixelBold',
  fontSize: rf(17),
  marginBottom: hp(1),
  backgroundColor:'#FF6BB5',
  width:rf(68),
  padding:rf(4)
},

dropdownText: {
  color: '#ffffff',
  fontFamily: 'PixelOperator',
  fontSize: rf(16),
},

dropdownExample: {
  color: '#ffffff',
  fontFamily: 'PixelOperator',
  fontSize: rf(16),
  marginTop: hp(1),
},

dropdownResult: {
  color: '#00E84A',
  fontFamily: 'PixelBold',
  fontSize: rf(17),
  marginTop: hp(1),
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
metricHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: wp(3),
  marginTop: hp(2),
  marginBottom: hp(1),
},

metricHeaderText: {
  color: '#FF6BB5',
  fontFamily: 'PixelBold',
  fontSize: rf(17),
},

metricRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingVertical: hp(1.5),
  borderBottomWidth: 1,
  borderBottomColor: '#2B2554',
},

metricLeft: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: wp(3),
},

metricLabel: {
  color: '#AC60FC',
  fontFamily: 'PixelOperator',
  fontSize: rf(15),
},

metricValue: {
  color: '#00D9FF',
  fontFamily: 'PixelBold',
  fontSize: rf(19),
},

impactLabel: {
  color: '#FF6BB5',
  fontFamily: 'PixelBold',
  fontSize: rf(19),
  marginTop: hp(3),
  marginBottom: hp(2),
},

ratingBox: {
  backgroundColor: '#0E0B24',
  borderWidth: 1,
  borderColor: '#2B2554',
  borderRadius: rf(14),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: wp(3),
  paddingVertical: hp(2),
  marginBottom: hp(2),
},

ratingText: {
  fontFamily: 'PixelBold',
  fontSize: rf(32),
},

legendItem: {
  flex: 1,
  alignItems: 'center',
},

legendDivider: {
  width: 1,
  height: hp(5),
  backgroundColor: '#2B2554',
},

legendCircle: {
  width: rf(18),
  height: rf(18),
  borderRadius: rf(9),
  marginBottom: hp(0.8),
},
  question: {
    color: '#AC60FC',
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
    color: '#FFC509',
  },

  formulaBox: {
    backgroundColor: '#0E0B24',

    borderRadius: rf(12),

    padding: wp(4),

    marginTop: hp(1),
  },

  formula: {
    color: '#FFC509',
    textAlign: 'center',
    fontFamily: 'PixelOperator',
    fontSize: rf(17),
  },

  value: {
    color: '#00D9FF',
    textAlign: 'center',
    fontFamily: 'PixelOperator',
    fontSize: rf(20),
  },

  rating: {
    textAlign: 'center',

    fontFamily: 'PixelOperator',

    fontSize: rf(34),

    marginTop: hp(1),

    marginBottom: hp(2.5),
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
  fontFamily: 'PixelBold',
  fontSize: rf(14),
},
legendSubtitle: {
  color: '#BFC4FF',
  fontFamily: 'PixelOperator',
  fontSize: rf(11),
  marginTop: hp(0.3),
},
});