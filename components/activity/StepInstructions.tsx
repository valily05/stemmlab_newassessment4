// components/activity/StepInstructions.tsx

import {
  Dimensions,
  PixelRatio,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

/* RESPONSIVE HELPERS */
const wp = (percentage: number) => {

  return PixelRatio.roundToNearestPixel(
    (width * percentage) / 100
  );

};

const hp = (percentage: number) => {

  return PixelRatio.roundToNearestPixel(
    (height * percentage) / 100
  );

};

const rf = (size: number) => {

  const scale = width / 390;

  return Math.round(
    PixelRatio.roundToNearestPixel(
      size * scale
    )
  );

};

interface Props {
  steps: string[];
}

export default function StepInstructions({
  steps,
}: Props) {

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        STEP-BY-STEP INSTRUCTIONS :
      </Text>

      <View style={styles.stepsContainer}>

        {steps.map((step, index) => (

          <View
            key={index}
            style={styles.stepRow}
          >

            <View style={styles.numberCircle}>

              <Text style={styles.numberText}>
                {index + 1}
              </Text>

            </View>

            <Text style={styles.stepText}>
              {step}
            </Text>

          </View>

        ))}

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  /* CONTAINER */
  container: {
    marginHorizontal: wp(4),

    marginTop: hp(5),

    borderWidth: wp(0.8),

    borderColor: '#701BFF',

    backgroundColor: '#150F31',

    padding: wp(4),
  },

title: {
  color: '#F8EC4D',

  fontFamily: 'Pixel',

  fontSize: rf(12),

  width: hp(60),

},

  /* STEPS CONTAINER */
  stepsContainer: {
    marginTop: hp(3),

    gap: hp(2.2),
  },

  /* STEP ROW */
  stepRow: {
    flexDirection: 'row',

    alignItems: 'flex-start',

    gap: wp(3.5),
  },

  /* NUMBER CIRCLE */
  numberCircle: {
    width: wp(6),

    height: wp(6),

    borderRadius: wp(10),

    backgroundColor: '#FF5AA9',

    justifyContent: 'center',

    alignItems: 'center',

    marginTop: hp(0.2),
  },

  /* NUMBER TEXT */
  numberText: {
    color: 'white',

    fontFamily: 'Pixel',

    fontSize: rf(10),
  },

  /* STEP TEXT */
  stepText: {
    flex: 1,

    color: 'white',

    fontFamily: 'PixelOperator',

    fontSize: rf(17),

    lineHeight: hp(2.5),
  },

});