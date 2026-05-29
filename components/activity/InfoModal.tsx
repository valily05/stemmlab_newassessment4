import {
  Dimensions,
  Modal,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } =
  Dimensions.get('window');

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

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function InfoModal({
  visible,
  onClose,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.card}>

          <Text style={styles.title}>
            HOW TO COMPLETE THIS ACTIVITY
          </Text>

          <Text style={styles.text}>
            1. Place the object at the drop height.
          </Text>

          <Text style={styles.text}>
            2. Press Start Recording.
          </Text>

          <Text style={styles.text}>
            3. Drop the object.
          </Text>

          <Text style={styles.text}>
            4. Press Stop Recording.
          </Text>

          <Text style={styles.text}>
            5. Review the recording.
          </Text>

          <Text style={styles.text}>
            6. Determine the first hit time.
          </Text>

          <Text style={styles.text}>
            7. Determine the stop moving time.
          </Text>

          <Text style={styles.text}>
            8. Save Iteration.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>
              GOT IT
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,

    backgroundColor:
      'rgba(0,0,0,0.75)',

    justifyContent: 'center',
    alignItems: 'center',

    padding: wp(5),
  },

  card: {
    width: '100%',

    backgroundColor: '#1A123D',

    borderRadius: rf(24),

    padding: wp(6),

    borderWidth: rf(2),

    borderColor: '#5711BE',
  },

  title: {
    color: '#FFD94E',

    fontSize: rf(18),

    fontFamily: 'Pixel',

    marginBottom: hp(2),

    textAlign: 'center',
  },

  text: {
    color: '#FFFFFF',

    fontSize: rf(15),

    lineHeight: rf(28),

    marginBottom: hp(0.8),

    fontFamily: 'PixelOperator',
  },

  button: {
    marginTop: hp(2),

    height: hp(6.5),

    borderRadius: rf(16),

    backgroundColor: '#FF5AA9',

    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',

    fontFamily: 'Pixel',

    fontSize: rf(15),
  },
});