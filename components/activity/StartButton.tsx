import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

interface StartButtonProps {
  onPress?: () => void;
  disabled?: boolean;
}

export default function StartButton({
  onPress,
  disabled = false,
}: StartButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,

        disabled &&
          styles.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={
        disabled ? 1 : 0.8
      }
    >
      <Text
        style={[
          styles.playIcon,

          disabled &&
            styles.disabledText,
        ]}
      >
        ▶
      </Text>

      <Text
        style={[
          styles.text,

          disabled &&
            styles.disabledText,
        ]}
      >
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

  buttonDisabled: {
    backgroundColor: '#4A4A4A',

    opacity: 0.6,
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

  disabledText: {
    color: '#BDBDBD',
  },

});