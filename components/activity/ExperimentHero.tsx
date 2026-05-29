import {
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

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

import { ReactNode } from 'react';

interface Props {
  title: string;
  description: ReactNode;
}

export default function ExperimentHero({
  title,
  description,
}: Props) {
  return (
    <View style={styles.container}>

      {/* TOP HEADER */}
      <View style={styles.topBar}>

        <View>
          <Text style={styles.logo}>
            STEMM LAB
          </Text>

          <Text style={styles.tagline}>
            Learn <Text style={styles.star}>✦</Text> Experiment{' '}
            <Text style={styles.star}>✦</Text> Innovate
          </Text>
        </View>

      </View>

      {/* HERO CONTENT */}
      <View style={styles.heroRow}>

        <View style={styles.left}>

          <Text style={styles.activity}>
            ACTIVITY #1
          </Text>

          <Text style={styles.title}>
            {title}
          </Text>
<View style={styles.descriptionContainer}>
  {description}
</View>

        </View>

        <Image
          source={require('../../assets/images/parachute-bunny.png')}
          style={styles.image}
        />

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    marginHorizontal: wp(7),
    marginTop: hp(4),
  },

  /* HEADER */
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
descriptionContainer: {
  marginTop: hp(1.5),
  width: wp(42),
},
  logo: {
    color: '#FFFFFF',
    fontSize: rf(20),
    fontFamily: 'Pixel',
  },

  /* HERO */
  heroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(4),
  },

  left: {
    flex: 1,
    paddingRight: wp(3),
  },

  activity: {
    color: '#F7E35B',
    fontSize: rf(13),
    fontFamily: 'Pixel',
    marginBottom: hp(1),
  },

  title: {
    color: '#FFFFFF',
    fontSize: rf(16),
    lineHeight: rf(25),
    fontFamily: 'Pixel',
    width: wp(90),
  },

  description: {
    color: '#FFFFFF',
    fontSize: rf(18),
    lineHeight: rf(18),
    width: wp(42),
    marginTop: hp(1.5),
    fontFamily: 'PixelOperator',
  },

image: {
  width: wp(32),
  height: hp(18),
  resizeMode: 'contain',

  right: -wp(6),
},
  tagline: {
    color: '#FFFFFF',
    fontSize: rf(13),
    marginTop: hp(0.5),
    fontFamily: 'PixelOperator',
  },

  star: {
    color: '#EC588C',
  },

});