import {
    Dimensions,
    Image,
    PixelRatio,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

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

      {/* PROFILE */}
      <Image
        source={require('../assets/images/miffy.png')}
        style={styles.avatar}
      />

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
    color: '#fff',

    fontSize: fp(22),
  },

  logo: {
    color: '#fff',

    fontSize: fp(14),

    fontFamily: 'Pixel',

    letterSpacing: 1,
  },

  subtitle: {
    color: '#ddd6fe',

    fontSize: fp(11),

    marginTop: hp(0.6),

    fontFamily: 'PixelOperator',

    textAlign: 'center',
  },

  star: {
    color: '#EC588C',
  },

  avatar: {
    width: wp(13),
    height: wp(13),

    resizeMode: 'contain',
  },

});