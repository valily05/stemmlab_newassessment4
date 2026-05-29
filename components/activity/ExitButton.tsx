import {
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
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

interface Props {
  onPress?: () => void;
}

export default function ExitButton({
  onPress,
}: Props) {
  return (

    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >

      <Image
        source={require('../../assets/images/exit-icon.png')}
        style={styles.icon}
      />

      <Text style={styles.text}>
        EXIT
      </Text>

    </TouchableOpacity>

  );
}

const styles = StyleSheet.create({
  container: {
    width: rf(64),
    height: rf(64),

    backgroundColor: '#7A224A',

    borderRadius: rf(12),

    justifyContent: 'center',
    alignItems: 'center',

    alignSelf: 'flex-start', // left side

    marginTop: hp(3),
    marginLeft: wp(5), // distance from left edge

    borderWidth: rf(2),
    borderColor: '#A83A6A',


    elevation: 8,
  },

  icon: {
    width: rf(24),
    height: rf(24),

    resizeMode: 'contain',
  },

  text: {
    color: '#FFF',

    fontSize: rf(10),

    marginTop: hp(0.3),

    fontFamily: 'PixelOperator',
  },
});