import {
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
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
    PixelRatio.roundToNearestPixel(
      size * scale
    )
  );
};

export default function Activity4VibrationCard() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.leftContent}>
          <Text
            style={styles.title}
            numberOfLines={1}
          >
            CAPTURE EXPERIMENT
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.contentTitle}>
          EARTHQUAKE TEST IN PROGRESS
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: wp(5),
    marginTop: hp(3),

    backgroundColor: '#02032A',

    borderRadius: rf(22),
    padding: wp(5),
    paddingTop:wp(6),
    borderWidth: rf(2),
    borderColor: '#3D438F',

    shadowColor: '#3D438F',
    shadowOpacity: 1,
    shadowRadius: rf(10),
    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 12,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  leftContent: {
    flex: 1,
    paddingRight: wp(3),
  },

  title: {
    color: '#FFE95B',
    fontSize: rf(14),
    fontFamily: 'Pixel',

    width: wp(70),
  },

  content: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentTitle: {
    color: 'red',
    fontSize: rf(25),
    fontFamily: 'Pixel',
    textAlign: 'center',
    width: wp(70),
  },
})