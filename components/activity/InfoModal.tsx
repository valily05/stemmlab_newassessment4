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
  title: string;
  instructions: string[];
  onClose: () => void;
}

export default function InfoModal({
  visible,
  title,
  instructions,
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
            {title}
          </Text>

          {instructions.map(
            (instruction, index) => (
              <Text
                key={index}
                style={styles.text}
              >
                {index + 1}. {instruction}
              </Text>
            )
          )}

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

    fontSize: rf(10),

    fontFamily: 'Pixel',

    marginBottom: hp(2),

    textAlign: 'center',
  },

  text: {
    color: '#FFFFFF',

    fontSize: rf(16),

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