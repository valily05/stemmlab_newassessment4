// components/activity/StartButton.tsx

import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

interface StartButtonProps {
  onPress?: () => void;
}

export default function StartButton({
  onPress,
}: StartButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.playIcon}>
        ▶
      </Text>

      <Text style={styles.text}>
        START ACTIVITY
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 20,
    marginTop: 30,
    height: 60,
    backgroundColor: '#FF5AA9',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },

  playIcon: {
    color: 'white',
    fontSize: 28,
    fontFamily: 'PressStart2P',
    bottom: 1,
  },

  text: {
    color: 'white',
    fontFamily: 'Pixel',
    fontSize: 15,
  },
});