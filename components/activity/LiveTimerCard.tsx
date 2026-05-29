import {
  Dimensions,
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

interface Props {
  time: string;
  isRecording: boolean;
}

export default function LiveTimerCard({
  time,
  isRecording,
}: Props) {
  return (
    <View style={styles.card}>

      <Text style={styles.title}>
        STOPWATCH
      </Text>

      <Text style={styles.timer}>
        {time}
      </Text>


    </View>
  );
}

const styles = StyleSheet.create({
card: {
  marginHorizontal: wp(5),
  marginTop: hp(2.5),

  padding: wp(5),

  borderRadius: rf(20),

  backgroundColor: '#22134D',

  alignItems: 'center',

  borderWidth: rf(2),
  borderColor: '#5711BE',

  shadowColor: '#5711BE',
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 1,
  shadowRadius: rf(15),

  elevation: 15,
},

  title: {
    color: '#FFFFFF',

    fontFamily: 'Pixel',

    fontSize: rf(16),
  },

  timer: {
    color: '#FFD94E',

    fontSize: rf(36),

    marginTop: hp(1.5),

    fontFamily: 'PressStart2P',

    textAlign: 'center',
  },

  badge: {
    marginTop: hp(2),

    paddingHorizontal: wp(4),

    paddingVertical: hp(0.8),

    borderRadius: rf(20),
  },

  badgeText: {
    color: '#FFFFFF',

    fontFamily: 'Pixel',

    fontSize: rf(13),
  },
});