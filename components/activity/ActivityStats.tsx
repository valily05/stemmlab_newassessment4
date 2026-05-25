// components/activity/ActivityStats.tsx

import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

interface Props {
  timeLimit: string;
  difficulty: string;
  mission: string;
}

export default function ActivityStats({
  timeLimit,
  difficulty,
  mission,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.smallCard}>
          <Ionicons
            name="timer"
            size={22}
            color="#FFB648"
          />

          <View>
            <Text style={styles.label}>
              Time Limit
            </Text>

            <Text style={styles.orangeValue}>
              {timeLimit}
            </Text>
          </View>
        </View>

        <View style={styles.smallCard}>
          <Ionicons
            name="stats-chart"
            size={22}
            color="#4DFF88"
          />

          <View>
            <Text style={styles.label}>
              Difficulty
            </Text>

            <Text style={styles.greenValue}>
              {difficulty}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.missionCard}>
        <Text style={styles.missionTitle}>
          MISSION :
        </Text>

        <Text style={styles.missionText}>
          {mission}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 24,
  },

  row: {
    flexDirection: 'row',
    gap: 10,
  },

  smallCard: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#120022',
    borderWidth: 2,
    borderColor: '#FF4FB4',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },

  label: {
    color: 'white',
    fontFamily: 'PressStart2P',
    fontSize: 8,
  },

  orangeValue: {
    color: '#FFB648',
    fontFamily: 'PixeloidSans',
    fontSize: 12,
    marginTop: 6,
  },

  greenValue: {
    color: '#4DFF88',
    fontFamily: 'PixeloidSans',
    fontSize: 12,
    marginTop: 6,
  },

  missionCard: {
    marginTop: 10,
    backgroundColor: '#120022',
    borderWidth: 2,
    borderColor: '#FF4FB4',
    borderRadius: 12,
    padding: 14,
  },

  missionTitle: {
    color: '#FF4FB4',
    fontFamily: 'PressStart2P',
    fontSize: 10,
  },

  missionText: {
    color: 'white',
    fontFamily: 'PixeloidSans',
    marginTop: 10,
    lineHeight: 18,
    fontSize: 11,
  },
});