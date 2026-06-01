import {
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// RESPONSIVE HELPERS
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

const fp = (size: number) => {
  return PixelRatio.roundToNearestPixel(
    (width / 430) * size
  );
};

export default function Header() {

  // CHANGE THIS
  const hasNotification = false;

  return (

    <View style={styles.header}>

      {/* MENU BUTTON */}
      <TouchableOpacity style={styles.circleBtn}>

        <Text style={styles.menu}>
          ☰
        </Text>

      </TouchableOpacity>

      {/* CENTER */}
      <View style={styles.center}>

        <Text style={styles.logo}>
          STEMM LAB
        </Text>

        <Text style={styles.subtitle}>

          Learn

          <Text style={styles.star}>
            {' '}✦{' '}
          </Text>

          Experiment

          <Text style={styles.star}>
            {' '}✦{' '}
          </Text>

          Innovate

        </Text>

      </View>

      {/* RIGHT SIDE */}
      <View style={styles.rightSection}>

        {/* NOTIFICATION */}
        <TouchableOpacity style={styles.notifBtn}>

          <Ionicons
            name="notifications"
            size={fp(24)}
            color="#C084FC"
          />

          {/* ONLY SHOW IF THERE'S A NOTIFICATION */}
          {hasNotification && (
            <View style={styles.dot} />
          )}

        </TouchableOpacity>

        {/* PROFILE */}
        <Image
          source={require('../assets/images/miffy.png')}
          style={styles.avatar}
        />

      </View>

    </View>

  );
}

const styles = StyleSheet.create({

  header: {
    marginTop: hp(7),

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  center: {
    alignItems: 'center',
  },

  circleBtn: {
    width: wp(12),
    height: wp(12),

    borderRadius: wp(6),

    backgroundColor: '#130C36',

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 2,
    borderColor: '#301E6A',
  },

  menu: {
    color: '#8C4CD8',
    fontSize: fp(29),
  },

  logo: {
    color: '#fff',
    fontSize: fp(18),
    fontFamily: 'Pixel',
    letterSpacing: 1,

    right: fp(20),
  },

  subtitle: {
    color: '#ddd6fe',
    fontSize: fp(16),

    right: fp(5),

    marginTop: hp(0.6),

    fontFamily: 'PixelOperator',
    textAlign: 'center',
  },

  star: {
    color: '#EC588C',
  },

  /* RIGHT SIDE */
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: wp(2.5),
  },

  /* NOTIFICATION BUTTON */
  notifBtn: {
    width: wp(11),
    height: wp(11),

    borderRadius: wp(5.5),

    backgroundColor: '#130C36',

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 2,
    borderColor: '#301E6A',
  },

  /* RED NOTIFICATION DOT */
  dot: {
    position: 'absolute',

    top: wp(2.6),
    right: wp(2.8),

    width: wp(1.9),
    height: wp(1.9),

    borderRadius: wp(1.25),

    backgroundColor: '#FF4D6D',
  },

  avatar: {
    width: wp(12.5),
    height: wp(12.5),

    resizeMode: 'contain',
  },

});