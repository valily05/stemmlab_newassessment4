import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

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

      <View
        style={[
          styles.badge,
          {
            backgroundColor:
              isRecording
                ? '#FF5AA9'
                : '#2AE3DA',
          },
        ]}
      >
        <Text style={styles.badgeText}>
          {isRecording
            ? 'RECORDING'
            : 'READY'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#22134D',
    alignItems: 'center',
  },

  title: {
    color: '#FFF',
    fontFamily: 'Pixel',
    fontSize: 16,
  },

  timer: {
    color: '#FFD94E',
    fontSize: 42,
    marginTop: 12,
    fontFamily: 'PressStart2P',
  },

  badge: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  badgeText: {
    color: '#FFF',
    fontFamily: 'Pixel',
  },
});