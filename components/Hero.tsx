import {
    Dimensions,
    PixelRatio,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

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
    PixelRatio.roundToNearestPixel(size * scale)
  );
};

export default function Hero() {

  return (

    <View style={styles.hero}>

      {/* TEXT WRAPPER */}
      <View style={styles.textWrap}>

        <Text style={styles.small}>
          WELCOME BACK,
        </Text>

        {/* GRADIENT TITLE */}
        <MaskedView
          maskElement={
            <Text style={styles.title}>
              EXPLORER
              <Text style={styles.star}>
                ✦
              </Text>
            </Text>
          }
        >

          <LinearGradient
            colors={[
              '#A061F5',
              '#E879C6',
              '#C95A9E',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >

            <Text
              style={[
                styles.title,
                { opacity: 0 },
              ]}
            >
              EXPLORER
              <Text style={styles.star}>
                ✦
              </Text>
            </Text>

          </LinearGradient>

        </MaskedView>

        <Text style={styles.desc}>
          Let's explore the universe together!
        </Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  /* MAIN CONTAINER */
  hero: {
    marginTop: hp(6),
    paddingHorizontal: wp(6),
    width: '100%',
  },

  /* TEXT WRAPPER */
  textWrap: {
    marginTop: hp(2),
    right: wp(4),
top:wp(7),
    width: '100%',
    elevation:10,
  },

  /* SMALL TEXT */
  small: {
    color: '#fff',
    fontSize: rf(20),
    fontFamily: 'Pixel',

    marginBottom: hp(1),
  },

  /* MAIN TITLE */
  title: {
    fontSize: rf(28),
    lineHeight: rf(36),

    fontFamily: 'Pixel',

    marginTop: hp(0.3),

    /* GLOW */
    textShadowColor: '#9C4077',
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: wp(4),
  },

  /* STAR */
  star: {
    marginLeft: wp(0.9),

    textShadowColor: '#FF8BD6',
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: wp(4),
  },

  /* DESCRIPTION */
  desc: {
    color: '#ffffff',

    fontSize: rf(18),

    width: '88%',

    lineHeight: rf(23),


    fontFamily: 'PixelOperator',
  },

});