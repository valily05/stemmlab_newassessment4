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

// RESPONSIVE FONT
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
          WELCOME BACK
        </Text>

        {/* GRADIENT TITLE */}
        <MaskedView
          maskElement={
            <Text style={styles.title}>
              EXPLORER ✦
            </Text>
          }
        >

          <LinearGradient
            colors={[
              '#F0ABFC',
              '#C084FC',
              '#8B5CF6',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >

            <Text style={[styles.title, { opacity: 0 }]}>
              EXPLORER ✦
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

  hero: {
    marginTop: height * 0.06,
    paddingHorizontal: width * 0.06,
  },

  /* WRAPPER */
  textWrap: {
    marginTop: height * 0.04,
    right: height * 0.02,
  },

  small: {
    color: '#fff',
    fontSize: rf(15),
    fontFamily: 'Pixel',
  },

  title: {
    fontSize: rf(24),
    lineHeight: rf(40),
    fontFamily: 'Pixel',
    marginTop: height * 0.01,
    /* GLOW */
    textShadowColor: '#C084FC',
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: 20,
  },

  desc: {
    color: '#ffffff',
    fontSize: rf(17),
    width: '90%',
    lineHeight: rf(20),
    fontFamily: 'PixelOperator',
  },

});