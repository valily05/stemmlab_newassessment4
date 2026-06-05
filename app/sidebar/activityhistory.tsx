// app/sidebar/activityhist.tsx

import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ActivityHistory() {

  const history = [
    {
      id: '1',
      activityName: 'Parachute Challenge',
      dropHeight: '1.5',
      date: '5 Jun 2026',
    },
    {
      id: '2',
      activityName: 'Egg Drop Challenge',
      dropHeight: '2.0',
      date: '4 Jun 2026',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      
      <Text style={styles.title}>
        ACTIVITY HISTORY
      </Text>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            
            <Text style={styles.activityName}>
              {item.activityName}
            </Text>

            <Text style={styles.detail}>
              Drop Height: {item.dropHeight}m
            </Text>

            <Text style={styles.date}>
              {item.date}
            </Text>

          </View>
        )}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07021B',
    padding: 20,
  },

  title: {
    color: '#FFE95B',
    fontSize: 24,
    fontFamily: 'Pixel',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#150F31',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#6954A6',
  },

  activityName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Pixel',
  },

  detail: {
    color: '#D1D5DB',
    marginTop: 8,
    fontFamily: 'PixelOperator',
  },

  date: {
    color: '#9CA3AF',
    marginTop: 4,
    fontFamily: 'PixelOperator',
  },
});