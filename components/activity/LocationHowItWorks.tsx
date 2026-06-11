import {
    Dimensions,
    Image,
    PixelRatio,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const wp = (p: number) =>
  PixelRatio.roundToNearestPixel((width * p) / 100);

const hp = (p: number) =>
  PixelRatio.roundToNearestPixel((height * p) / 100);

const rf = (s: number) => {
  const scale = width / 390;
  return Math.round(
    PixelRatio.roundToNearestPixel(s * scale)
  );
};

export default function LocationHowItWorks() {
  return (
    <View style={styles.card}>

      <View style={styles.titleRow}>
        <View style={styles.line} />

        <Text style={styles.title}>
          HOW IT WORKS
        </Text>

        <View style={styles.line} />
      </View>

      <View style={styles.steps}>

<View style={styles.step}>
  <Image
    source={require('@/assets/images/gps.png')}
    style={styles.stepIcon}
  />

  <Text style={styles.stepTitle}>
    DETECT
  </Text>

  <Text style={styles.stepText}>
    Detect your GPS location.
  </Text>
</View>
<View style={styles.step}>
  <Image
    source={require('@/assets/images/edit.png')}
    style={styles.stepIcon}
  />

  <Text style={styles.stepTitle}>
    NAME
  </Text>

  <Text style={styles.stepText}>
    Save a custom location name.
  </Text>
</View>
<View style={styles.step}>
  <Image
    source={require('@/assets/images/save.png')}
    style={styles.stepIcon}
  />

  <Text style={styles.stepTitle}>
    SAVE
  </Text>

  <Text style={styles.stepText}>
    Begin the sound investigation.
  </Text>
</View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    marginHorizontal: wp(5),
    marginTop: hp(2),
    backgroundColor: '#02032A',
    borderRadius: rf(20),
    borderWidth: rf(2),
    borderColor: '#3D438F',
    padding: wp(5),
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2.5),
  },

  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#323A7A',
  },

  title: {
    color: '#2AE3DA',
    fontFamily: 'Pixel',
    fontSize: rf(15),
    marginHorizontal: wp(3),
  },

  steps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  step: {
    width: '30%',
    alignItems: 'center',
  },

  stepTitle: {
    color: '#FFE95B',
    fontFamily: 'Pixel',
    fontSize: rf(12),
    marginTop: hp(1),
  },
stepIcon: {
  width: rf(42),
  height: rf(42),
  resizeMode: 'contain',
  marginBottom: hp(0.8),
},
  stepText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'PixelOperator',
    fontSize: rf(12),
    lineHeight: rf(16),
    marginTop: hp(0.8),
  },

});