import {
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
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

interface Props {}

export default function StopwatchCard() {
  return (
    <View style={styles.container}>

      <View style={styles.leftContent}>

        <Text style={styles.title}>
          STOPWATCH
        </Text>

        <Text style={styles.description}>
          Press the button to stop the timer,
          the moment the object{' '}
          <Text style={styles.yellowText}>
            hits the ground
          </Text>
          .
        </Text>

      </View>

      <Image
        source={require('../../assets/images/stopwatch-large.png')}
        style={styles.image}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(5),
    marginTop: hp(2.5),
    padding: wp(5),

    borderWidth: rf(2),
    borderColor: '#5711BE',
    borderRadius: rf(20),

    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#020423',

    shadowColor: '#5711BE',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: rf(12),

    elevation: 12,
  },

  leftContent: {
    flex: 1,
    paddingRight: wp(3),
  },

  yellowText: {
    color: '#FFE95B',
  },

  title: {
    color: '#FACC15',
    fontFamily: 'Pixel',
    fontSize: rf(13),
  },

  description: {
    color: '#FFF',
    marginTop: hp(1),
    fontFamily: 'PixelOperator',
    fontSize: rf(15),
    lineHeight: rf(20),
    width: wp(60),
  },

  image: {
    width: rf(80),
    height: rf(80),
    resizeMode: 'contain',
  },
});