// components/activity/ActivityHero.tsx

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
  title: string;
  overview: string;
}

export default function ActivityHero({
  title,
  overview,
}: Props) {

  return (

    <View style={styles.container}>

      <View style={styles.left}>

        <Text style={styles.title}>
          {title}
        </Text>

        {/* OVERVIEW */}
        <View style={styles.overviewRow}>

          <View style={styles.overviewCircle}>

            <Text style={styles.circleText}>
              1
            </Text>

          </View>

          <Text style={styles.overviewText}>
            Overview
          </Text>

        </View>

        {/* DESCRIPTION */}
        <Text style={styles.description}>
          {overview}
        </Text>

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  /* CONTAINER */
  container: {
    flexDirection: 'row',

    paddingHorizontal: wp(5),

    marginTop: hp(2.2),
  },

  /* LEFT */
  left: {
    flex: 1,
  },

  /* TITLE */
  title: {
    color: '#F8EC4D',

    fontFamily: 'Pixel',

    fontSize: rf(20),

    lineHeight: rf(35),

    width:hp(39)
  },

  /* OVERVIEW ROW */
  overviewRow: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: hp(3),
  },

  /* CIRCLE */
  overviewCircle: {
    width: wp(8),

    height: wp(8),

    borderRadius: wp(10),

    backgroundColor: '#FF5AA9',

    justifyContent: 'center',

    alignItems: 'center',

    marginRight: wp(2.5),
  },

  /* NUMBER */
  circleText: {
    color: 'white',

    fontSize: rf(8),

    fontFamily: 'PressStart2P',
  },

  /* OVERVIEW TEXT */
  overviewText: {
    color: '#FF5AA9',

    fontFamily: 'Pixel',

    fontSize: rf(15),
  },

  /* DESCRIPTION */
  description: {
    color: 'white',

    fontFamily: 'PixelOperator',

    marginTop: hp(1),

    lineHeight: rf(20),

    fontSize: rf(16),

    paddingRight: wp(3),

    width:rf(290),
  },

});