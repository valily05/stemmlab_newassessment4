// components/activity/StartButton.tsx

import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';


export default function StartButton() {
  return (
    <TouchableOpacity style={styles.button}>
  <Text style={{ color: 'white' }}>
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
    height: 70,
    backgroundColor: '#FF5AA9',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },

  text: {
    color: 'white',
    fontFamily: 'PressStart2P',
    fontSize: 14,
  },
});