// components/activity/ActivityHeader.tsx

import {
  Dimensions,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useRouter } from 'expo-router';

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

export default function ActivityHeader() {

  const router = useRouter();

  return (

    <View style={styles.container}>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() =>
          router.replace('/(tabs)/activities')
        }
        activeOpacity={0.8}
      >

        {/* PIXEL ARROW */}
        <View style={styles.pixelArrow}>

          <View
            style={[
              styles.pixel,
              styles.p1,
            ]}
          />

          <View
            style={[
              styles.pixel,
              styles.p2,
            ]}
          />

          <View
            style={[
              styles.pixel,
              styles.p3,
            ]}
          />

          <View
            style={[
              styles.pixel,
              styles.p4,
            ]}
          />

          <View
            style={[
              styles.pixel,
              styles.p5,
            ]}
          />

          <View
            style={[
              styles.pixel,
              styles.p6,
            ]}
          />

          <View
            style={[
              styles.pixel,
              styles.p7,
            ]}
          />

           <View
            style={[
              styles.pixel,
              styles.p8,
            ]}
          />

        </View>

        <Text style={styles.backText}>
          BACK
        </Text>

      </TouchableOpacity>

    </View>

  );

}

const styles = StyleSheet.create({

  /* CONTAINER */
  container: {
    paddingTop: hp(9),

    paddingHorizontal: wp(5),
  },

  /* BUTTON */
  backButton: {
    flexDirection: 'row',

    alignItems: 'center',

  
  },

  /* PIXEL ARROW */
  pixelArrow: {
    width: rf(29),

    height: rf(24),

    position: 'relative',

    marginRight: wp(2.5),
  },

  pixel: {
    position: 'absolute',

    width: rf(6),

    height: rf(7),

    backgroundColor: '#2AE3DA',
  },

  p1: {
    left: 0,
    top: rf(9),
  },

  p2: {
    left: rf(4),
    top: rf(5),
  },

  p3: {
    left: rf(4),
    top: rf(13),
  },

  p4: {
    left: rf(8),
    top: rf(1),
  },

  p5: {
    left: rf(8),
    top: rf(9),
  },

  p6: {
    left: rf(8),
    top: rf(17),
  },

  p7: {
      width: rf(14),
  height: rf(10),
    left: rf(5),
    top: rf(8),
  },

    p8: {
          width: rf(11),
  height: rf(10),

    left: rf(19),
    top: rf(8),
  },


  /* TEXT */
  backText: {
    color: '#2AE3DA',

    fontFamily: 'Pixel',

    fontSize: rf(15),

    letterSpacing: rf(1),
  },

});