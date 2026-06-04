import { auth } from "@/services/firebase/config";
import { getAllTeams, getTeam, getTopTeams } from "@/services/firebase/teamService";
import { getUserProfile } from "@/services/firebase/userService";
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from "react";
import { Dimensions, PixelRatio, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const wp = (p: number) => PixelRatio.roundToNearestPixel((width * p) / 100);
const hp = (p: number) => PixelRatio.roundToNearestPixel((height * p) / 100);
const fp = (s: number) => PixelRatio.roundToNearestPixel((width / 430) * s);

export default function TeamRankingCard() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [userTeam, setUserTeam] = useState<any>(null);
  const [userRank, setUserRank] = useState<number | null>(null);

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    try {
      const topTeams = await getTopTeams();
      setLeaderboard(topTeams);
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      const user = await getUserProfile(uid);
      if (user?.teamID) {
        const team = await getTeam(user.teamID);
        setUserTeam(team);
        const allTeams = await getAllTeams();
        const index = allTeams.findIndex((t) => t.id === user.teamID);
        setUserRank(index >= 0 ? index + 1 : null);
      }
    } catch (error) { console.error(error); }
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
        <TouchableOpacity><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        {leaderboard.map((team, index) => (
          <View key={team.id} style={[styles.row, team.id === userTeam?.id && styles.activeRow]}>
            <Text style={styles.rank}>{index + 1}</Text>
            <View style={styles.avatarPlaceholder}>
               <Text style={styles.initials}>{team.teamName?.substring(0, 2).toUpperCase()}</Text>
            </View>
            <Text style={styles.teamName} numberOfLines={1}>{team.teamName}</Text>
            <Text style={styles.points}>{team.totalPoints?.toLocaleString()} pts</Text>
          </View>
        ))}

        {userTeam && !leaderboard.find(t => t.id === userTeam.id) && (
          <View style={[styles.row, styles.activeRow, { marginTop: 10, borderWidth: 1, borderColor: '#8A65F2' }]}>
            <Text style={[styles.rank, { color: '#8A65F2' }]}>#{userRank}</Text>
            <View style={[styles.avatarPlaceholder, { backgroundColor: '#8A65F2' }]}>
               <Text style={styles.initials}>{userTeam.teamName?.substring(0, 2).toUpperCase()}</Text>
            </View>
            <Text style={[styles.teamName, { color: '#FFF' }]}>{userTeam.teamName}</Text>
            <Text style={styles.points}>{userTeam.totalPoints?.toLocaleString()} pts</Text>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: hp(2),
    padding: wp(5),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(138, 101, 242, 0.4)',
    marginTop:hp(2.4)
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(2),
  },
  title: { color: '#FFF', fontSize: fp(20), fontFamily: 'PixelBold' },
  viewAll: { color: '#B8A0FF', fontFamily: 'PixelOperator', fontSize: fp(14) },
  listContainer: { gap: 8 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: hp(1.2), paddingHorizontal: wp(3), borderRadius: 16 },
  activeRow: { backgroundColor: 'rgba(138, 101, 242, 0.2)' },
  rank: { color: '#A0A0A0', fontFamily: 'PixelBold', width: wp(8), fontSize: fp(14) },
  avatarPlaceholder: {
    width: wp(9), height: wp(9), borderRadius: 12,
    backgroundColor: '#3D256B', justifyContent: 'center', alignItems: 'center', marginRight: wp(3),
  },
  initials: { color: '#FFF', fontSize: fp(10) },
  teamName: { flex: 1, color: '#E0E0E0', fontFamily: 'PixelOperator', fontSize: fp(15) },
  points: { color: '#FFD45A', fontFamily: 'PixelBold', fontSize: fp(13) },
});