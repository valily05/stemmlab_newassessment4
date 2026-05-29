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
  tips: string[];
}

export default function ExperimentTipCard({
  tips,
}: Props) {
  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        <Text style={styles.star}>
          ★
        </Text>{' '}
        <Text style={styles.bunnyTip}>
          BUNNY TIP
        </Text>
      </Text>

      {tips.map((tip, index) => (

        <Text
          key={index}
          style={styles.tip}
        >
         {tip}
        </Text>

      ))}

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(5),
    marginTop: hp(2.5),

    paddingHorizontal: wp(4.5),
    paddingVertical: hp(2),

    borderWidth: rf(2),
    borderColor: '#5711BE',
    borderRadius: rf(15),

    backgroundColor: '#020423',

    shadowColor: '#5711BE',
    shadowOpacity: 1,

  },

  title: {
    marginBottom: hp(1.2),
  },

  star: {
    color: '#FACC15',
    fontFamily: 'Pixel',
    fontSize: rf(20), // bigger star
  },

  bunnyTip: {
    color: '#FACC15',
    fontFamily: 'Pixel',
    fontSize: rf(13), // smaller than star
  },

  tip: {
    color: '#FFF',

    marginBottom: hp(0.8),

    fontFamily: 'PixelOperator',
    fontSize: rf(14),
    lineHeight: rf(20),
  },
});