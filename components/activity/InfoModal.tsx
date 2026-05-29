// components/activity/InfoModal.tsx

import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface Props {
  visible: boolean;
  currentStage: string;
  isBaseline: boolean;
  onClose: () => void;
}

export default function InfoModal({
  visible,
  currentStage,
  isBaseline,
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
            {currentStage}
          </Text>

          {isBaseline ? (
            <>
              <Text style={styles.text}>
                1. Do not attach the parachute.
              </Text>

              <Text style={styles.text}>
                2. Place the toy at the drop height.
              </Text>

              <Text style={styles.text}>
                3. Press Start Recording.
              </Text>

              <Text style={styles.text}>
                4. Drop the toy.
              </Text>

              <Text style={styles.text}>
                5. Press Stop Recording.
              </Text>

              <Text style={styles.text}>
                6. Save Iteration.
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.text}>
                1. Attach your parachute.
              </Text>

              <Text style={styles.text}>
                2. Use the same drop height.
              </Text>

              <Text style={styles.text}>
                3. Press Start Recording.
              </Text>

              <Text style={styles.text}>
                4. Drop the toy.
              </Text>

              <Text style={styles.text}>
                5. Press Stop Recording.
              </Text>

              <Text style={styles.text}>
                6. Save Iteration.
              </Text>
            </>
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
    padding: 20,
  },

  card: {
    width: '100%',
    backgroundColor: '#1A123D',
    borderRadius: 24,
    padding: 24,
    borderWidth: 2,
    borderColor: '#5711BE',
  },

  title: {
    color: '#FFD94E',
    fontSize: 20,
    fontFamily: 'Pixel',
    marginBottom: 18,
    textAlign: 'center',
  },

  text: {
    color: 'white',
    fontSize: 14,
    lineHeight: 26,
    marginBottom: 6,
    fontFamily: 'Pixel',
  },

  button: {
    marginTop: 20,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#FF5AA9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontFamily: 'Pixel',
    fontSize: 14,
  },
});