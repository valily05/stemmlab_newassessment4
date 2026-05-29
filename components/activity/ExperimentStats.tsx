import {
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

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

interface Props {
  timeLeft: string;
  iteration: string;
}

export default function ExperimentStats({
  timeLeft,
  iteration,
}: Props) {
  return (
    <View style={styles.card}>

      <View style={styles.item}>

        <Image
          source={require('../../assets/images/hourglass.png')}
          style={styles.icon}
        />

        <View>

          <Text style={styles.label}>
            TIME LEFT
          </Text>

          <Text style={styles.value}>
            {timeLeft}
          </Text>

        </View>

      </View>

      <View style={styles.divider} />

      <View style={styles.item}>

        <Image
          source={require('../../assets/images/iteration.png')}
          style={styles.icon}
        />

        <View>

          <Text style={styles.label}>
            ITERATION
          </Text>

          <Text style={styles.value}>
            {iteration}
          </Text>

        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    marginHorizontal: wp(5),
    marginTop: hp(3),
    padding: wp(5),
    borderWidth: rf(2.5),
    borderColor: '#5711BE',
    borderRadius: rf(18),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  icon: {
    width: rf(34),
    height: rf(34),
    marginRight: wp(2.5),
    resizeMode: 'contain',
  },

  label: {
    color: '#2AE3DA',
    fontFamily: 'PixelOperator',
    fontSize: rf(20),
    marginBottom: hp(0.4),
  },

  value: {
    color: '#FFF',
    fontFamily: 'Pixel',
    fontSize: rf(10),
  },

  divider: {
    width: rf(1),
    height: hp(5),
    backgroundColor: '#5711BE',
    marginHorizontal: wp(3),
  },

});