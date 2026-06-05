import { db } from '@/services/firebase/config';
import { router } from 'expo-router';
import {
    collection,
    getDocs,
    orderBy,
    query,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ActivityHistory() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const q = query(
        collection(db, 'session'),
        orderBy('completedAt', 'desc')
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSessions(data);

    } catch (error) {
      console.log(
        'SESSION ERROR:',
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const getActivityName = (
    activityID: number
  ) => {
    switch (activityID) {
      case 1:
        return 'Parachute Drop Challenge';

      case 2:
        return 'Sound Pollution Hunter';

      case 3:
        return 'Human Performance Lab';

      default:
        return `Activity ${activityID}`;
    }
  };

  const renderSession = ({
    item,
  }: any) => {
    const date =
      item.completedAt?.toDate
        ? item.completedAt
            .toDate()
            .toLocaleDateString()
        : 'Unknown Date';

    return (
    <TouchableOpacity
  style={styles.card}
  activeOpacity={0.9}
  onPress={() =>
    router.push({
      pathname:
        '/sidebar/sessionDetails',
      params: {
        sessionId: item.id,
      },
    })
  }
>
        <Text style={styles.activityName}>
          {getActivityName(
            item.activityID
          )}
        </Text>

        <Text style={styles.detail}>
          Points Earned:{' '}
          {item.pointsEarned}
        </Text>

        <Text style={styles.detail}>
          Iterations:{' '}
          {item.totalIterations}
        </Text>

        <Text style={styles.detail}>
          Best Time:{' '}
          {item.insights?.bestTime ??
            '-'}
        </Text>

        <Text style={styles.detail}>
          Accuracy:{' '}
          {item.insights?.avgAccuracy ??
            '-'}
          %
        </Text>

        <Text style={styles.date}>
          {date}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={styles.container}
    >
      <Text style={styles.title}>
        ACTIVITY HISTORY
      </Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#FFE95B"
        />
      ) : sessions.length === 0 ? (
        <View
          style={styles.emptyContainer}
        >
          <Text
            style={styles.emptyTitle}
          >
            No Activities Yet
          </Text>

          <Text
            style={styles.emptyText}
          >
            Complete an activity
            to see your history.
          </Text>
        </View>
      ) : (
        <FlatList
          data={sessions}
          keyExtractor={item =>
            item.id
          }
          renderItem={renderSession}
          showsVerticalScrollIndicator={
            false
          }
        />
      )}
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
    marginBottom: 8,
  },

  detail: {
    color: '#D1D5DB',
    marginTop: 4,
    fontFamily: 'PixelOperator',
  },

  date: {
    color: '#9CA3AF',
    marginTop: 10,
    fontFamily: 'PixelOperator',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Pixel',
    marginBottom: 10,
  },

  emptyText: {
    color: '#9CA3AF',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'PixelOperator',
  },
});