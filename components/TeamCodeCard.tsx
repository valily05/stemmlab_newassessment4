import {
    Dimensions,
    PixelRatio,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const wp = (percentage: number) =>
  PixelRatio.roundToNearestPixel(
    (width * percentage) / 100
  );

const hp = (percentage: number) =>
  PixelRatio.roundToNearestPixel(
    (height * percentage) / 100
  );

const rf = (size: number) => {
  const scale = width / 390;

  return Math.round(
    PixelRatio.roundToNearestPixel(size * scale)
  );
};

export default function TeamCodeCard() {
  return (
    <View style={styles.teamCodeCard}>

      <Text style={styles.teamCodeLabel}>
        TEAM CODE
      </Text>

      <Text style={styles.teamCodeValue}>
        STEMM47
      </Text>

      <Text style={styles.teamCodeHint}>
        Share this code with friends
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  teamCodeCard: {
    marginTop: hp(2),

    backgroundColor: '#120522',

    borderRadius: rf(16),

    paddingVertical: hp(2),
    paddingHorizontal: wp(5),

    borderWidth: 1,

    borderColor: '#2B1459',

    alignItems: 'center',
  },

  teamCodeLabel: {
    color: '#A88DFF',

    fontSize: rf(12),

    fontFamily: 'PixelOperator',
  },

  teamCodeValue: {
    color: '#FFF',

    fontSize: rf(24),

    marginTop: hp(1),

    fontFamily: 'Pixel',
  },

  teamCodeHint: {
    color: 'rgba(255,255,255,0.6)',

    marginTop: hp(1),

    fontSize: rf(12),

    fontFamily: 'PixelOperator',
  },
});