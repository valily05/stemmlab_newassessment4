import { auth, db } from '@/services/firebase/config';
import { router } from 'expo-router';
import { collection, doc, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore';
import { ChevronLeft } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function ActivityHistory() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamAndSessions = async () => {
      if (!auth.currentUser) return;
      try {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        const userData = userDoc.data();
        
        if (userData?.teamID) {
          await loadSessions(userData.teamID);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching team:", error);
        setLoading(false);
      }
    };
    fetchTeamAndSessions();
  }, []);

  const loadSessions = async (teamID: string) => {
    try {
      const q = query(
        collection(db, 'session'),
        where("teamID", "==", teamID),
        orderBy('completedAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSessions(data);
    } catch (error) {
      console.log('SESSION ERROR:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityName = (activityID: number) => {
    switch (activityID) {
      case 1: return 'Parachute Drop Challenge';
      case 2: return 'Sound Pollution Hunter';
      case 3: return 'Human Performance Lab';
      default: return `Activity ${activityID}`;
    }
  };

  const renderSession = ({ item }: any) => {
    const date = item.completedAt?.toDate 
      ? item.completedAt.toDate().toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) 
      : 'Unknown';

    return (
      <TouchableOpacity 
        style={styles.card} 
        activeOpacity={0.8} 
        onPress={() => router.push({ pathname: '/sidebar/sessionDetails', params: { sessionId: item.id } })}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.activityName}>{getActivityName(item.activityID)}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statBox}><Text style={styles.statLabel}>PTS</Text><Text style={styles.statValue}>{item.pointsEarned ?? 0}</Text></View>
          <View style={styles.statBox}><Text style={styles.statLabel}>ACC</Text><Text style={styles.statValue}>{item.insights?.avgAccuracy ?? '-'}%</Text></View>
          <View style={styles.statBox}><Text style={styles.statLabel}>TIME</Text><Text style={styles.statValue}>{item.insights?.bestTime ?? '-'}</Text></View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft color="#FFE95B" size={28} />
        </TouchableOpacity>
        <Text style={styles.title}>TEAM MISSION LOGS</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#FFE95B" style={{ marginTop: 50 }} />
      ) : sessions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>MISSION CONTROL EMPTY</Text>
          <Text style={styles.emptyText}>No experiments found for your team yet.</Text>
        </View>
      ) : (
        <FlatList
          data={sessions}
          keyExtractor={item => item.id}
          renderItem={renderSession}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#07021B' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingTop: 10, 
    marginBottom: 20 
  },
  backButton: { marginRight: 15, padding: 5 },
  title: { 
    color: '#FFE95B', 
    fontSize: 20, 
    fontFamily: 'Pixel', 
    letterSpacing: 3, // Increased letter spacing for retro feel
    textTransform: 'uppercase' 
  },
  listContent: { paddingHorizontal: 20, paddingBottom: 40 },
  
  // Polished Card Component
  card: { 
    backgroundColor: '#120A38', 
    borderRadius: 16, 
    padding: 22, 
    marginBottom: 18, 
    borderWidth: 1, 
    borderColor: '#3D2F75', // Sophisticated purple border
    shadowColor: '#5C38FF',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 18 
  },
  activityName: { 
    color: '#FFFFFF', 
    fontSize: 15, 
    fontFamily: 'Pixel', 
    flex: 1, 
    letterSpacing: 0.5 
  },
  date: { 
    color: '#9D88E3', 
    fontSize: 10, 
    fontFamily: 'PixelOperator', 
    letterSpacing: 1 
  },
  
  // Modernized Stats Row
  statsRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    paddingTop: 16, 
    borderTopWidth: 1, 
    borderTopColor: '#281F54' 
  },
  statBox: { alignItems: 'center' },
  statLabel: { 
    color: '#7C67C4', 
    fontSize: 9, 
    fontFamily: 'PixelOperator', 
    marginBottom: 6, 
    letterSpacing: 1 
  },
  statValue: { 
    color: '#FFE95B', 
    fontSize: 16, 
    fontFamily: 'Pixel' 
  },
  
  // Empty State
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyTitle: { color: '#FFFFFF', fontSize: 18, fontFamily: 'Pixel', marginBottom: 12 },
  emptyText: { color: '#7C67C4', fontSize: 13, textAlign: 'center', fontFamily: 'PixelOperator' },
});