import { auth } from "@/services/firebase/config";
import { getAllTeams, getTeam, getTopTeams } from "@/services/firebase/teamService";
import { getUserProfile } from "@/services/firebase/userService";
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Image, PixelRatio, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const wp = (p: number) => PixelRatio.roundToNearestPixel((width * p) / 100);
const hp = (p: number) => PixelRatio.roundToNearestPixel((width * p) / 100); // Using width-based scaling for consistency
const fp = (s: number) => PixelRatio.roundToNearestPixel((width / 430) * s);

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [userTeam, setUserTeam] = useState<any>(null);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboardData();
  }, []);

  async function loadLeaderboardData() {
    try {
      setLoading(true);
      const topTeams = await getTopTeams();
      setLeaderboard(topTeams);

      const uid = auth.currentUser?.uid;
      if (uid) {
        const user = await getUserProfile(uid);
        if (user?.teamID) {
          const team = await getTeam(user.teamID);
          setUserTeam(team);
          const allTeams = await getAllTeams();
          const index = allTeams.findIndex((t) => t.id === user.teamID);
          setUserRank(index >= 0 ? index + 1 : null);
        }
      }
    } catch (error) {
      console.error("Leaderboard Error:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <ActivityIndicator size="large" color="#8A65F2" style={{ marginTop: 20 }} />;
  }

  return (
    <LinearGradient
      colors={['#2D0B58', '#140528', '#000000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        {leaderboard.map((team, index) => (
          <View key={team.id} style={[styles.row, team.id === userTeam?.id && styles.activeRow]}>
            <Text style={styles.rank}>{index + 1}</Text>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.initials}>{team.teamName?.substring(0, 2).toUpperCase()}</Text>
            </View>
            <Text style={styles.teamName} numberOfLines={1}>{team.teamName}</Text>
            <View style={styles.pointsWrapper}>
              <Image source={require('@/assets/images/star.png')} style={styles.starIcon} />
              <Text style={styles.points}>{team.totalPoints?.toLocaleString()} pts</Text>
            </View>
          </View>
        ))}

        {userTeam && !leaderboard.find(t => t.id === userTeam.id) && (
          <View style={[styles.row, styles.activeRow, { marginTop: 10, borderWidth: 1, borderColor: '#8A65F2' }]}>
            <Text style={[styles.rank, { color: '#8A65F2' }]}>#{userRank}</Text>
            <View style={[styles.avatarPlaceholder, { backgroundColor: '#8A65F2' }]}>
              <Text style={styles.initials}>{userTeam.teamName?.substring(0, 2).toUpperCase()}</Text>
            </View>
            <Text style={[styles.teamName, { color: '#FFF' }]}>{userTeam.teamName}</Text>
            <View style={styles.pointsWrapper}>
              <Image source={require('@/assets/images/star.png')} style={styles.starIcon} />
              <Text style={styles.points}>{userTeam.totalPoints?.toLocaleString()} pts</Text>
            </View>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 20,
    marginHorizontal: 15,
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(138, 101, 242, 0.4)',
    marginTop:70
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  title: { color: '#FFF', fontSize: fp(20), fontFamily: 'PixelBold' },
  viewAll: { color: '#B8A0FF', fontFamily: 'PixelOperator', fontSize: fp(14) },
  listContainer: { gap: 8 , marginTop:20},
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 16 },
  activeRow: { backgroundColor: 'rgba(138, 101, 242, 0.2)' },
  rank: { color: '#A0A0A0', fontFamily: 'PixelBold', width: 30, fontSize: fp(14) },
  avatarPlaceholder: {
    width: 36, height: 36, borderRadius: 12,
    backgroundColor: '#3D256B', justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  initials: { color: '#FFF', fontSize: fp(10) },
  teamName: { flex: 1, color: '#E0E0E0', fontFamily: 'PixelOperator', fontSize: fp(15) },
  pointsWrapper: { flexDirection: 'row', alignItems: 'center' },
  starIcon: { width: 16, height: 16, marginRight: 4, resizeMode: 'contain' },
  points: { color: '#FFD45A', fontFamily: 'PixelBold', fontSize: fp(13) },
});