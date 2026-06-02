import { auth } from "@/services/firebase/config";
import { getAllTeams, getTeam, getTopTeams } from "@/services/firebase/teamService";
import { getUserProfile } from "@/services/firebase/userService";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

const wp = (percentage: number) =>
  PixelRatio.roundToNearestPixel(
    (width * percentage) / 100
  );

const hp = (percentage: number) =>
  PixelRatio.roundToNearestPixel(
    (height * percentage) / 100
  );

const fp = (size: number) =>
  PixelRatio.roundToNearestPixel(
    (width / 430) * size
  );

  const getTeamInitials = (
  teamName?: string
) => {
  if (!teamName) return '?';

  return teamName
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};

export default function TeamRankingCard() {


const [leaderboard, setLeaderboard] = useState<any[]>([]);

const [userTeam, setUserTeam] = useState<any>(null);
const [userRank, setUserRank] = useState<number | null>(null);
const isTopThree =
  userRank !== null &&
  userRank <= 3;
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {

      const topTeams = await getTopTeams();

      setLeaderboard(topTeams);

      const uid = auth.currentUser?.uid;

      if (!uid) return;

      const user = await getUserProfile(uid);

      if (!user?.teamId) return;

      const team = await getTeam(user.teamId);

      setUserTeam(team);
const allTeams = await getAllTeams();

const index = allTeams.findIndex(
  (t) => t.id === user.teamId
);

setUserRank(index >= 0 ? index + 1 : null);



    } catch (error) {
      console.error(error);
    }
    
  }

  return (
    <View style={styles.card}>

      {/* HEADER */}
      <View style={styles.header}>
    <View style={styles.headerLeft}>
  <Text style={styles.title}>
    Team Ranking
  </Text>

<Image
  source={require('../assets/images/medal-red.png')}
  style={styles.placeBadge}
/>
</View>

        <TouchableOpacity>
          <Text style={styles.viewAll}>
            View all
          </Text>
        </TouchableOpacity>
      </View>

      {/* TOP 3 */}
{leaderboard.map((team, index) => (
  <View
    key={team.id}
    style={styles.teamRow}
  >

    <Image
      source={
        index === 0
          ? require('../assets/images/first_place.png')
          : index === 1
          ? require('../assets/images/second_place.png')
          : require('../assets/images/third_place.png')
      }
      style={styles.placeBadge}
    />

{team.teamPhoto ? (
  <Image
    source={{ uri: team.teamPhoto }}
    style={styles.avatar}
  />
) : (
  <View style={styles.teamAvatar}>
    <Text style={styles.teamAvatarText}>
      {getTeamInitials(team.teamName)}
    </Text>
  </View>
)}

    <Text
      style={styles.teamName}
      numberOfLines={1}
    >
      {team.teamName}
    </Text>

    <View style={styles.pointsContainer}>
      <Image
        source={require('../assets/images/points_star.png')}
        style={styles.pointsIcon}
      />

      <Text style={styles.points}>
        {team.totalPoints.toLocaleString()} pts
      </Text>
    </View>




  </View>
))}

        
      
  
{/* NO TEAM MESSAGE */}
{!userTeam && (
  <View style={styles.userTeamContainer}>
    <Text style={styles.userTeamName}>
      🚀 Join a team now to compete on the leaderboard!
    </Text>
  </View>
)} 

    
{/* USER TEAM */}
{userTeam && !isTopThree && (
<View style={styles.userTeamContainer}>
<View style={styles.rankCircle}>
  <Text style={styles.rankCircleText}>
    {userRank}
  </Text>
</View>

{userTeam?.teamPhoto ? (
  <Image
    source={{ uri: userTeam.teamPhoto }}
    style={styles.avatar}
  />
) : (
  <View style={styles.teamAvatar}>
    <Text style={styles.teamAvatarText}>
      {getTeamInitials(userTeam?.teamName)}
    </Text>
  </View>
)}

  <View style={{ flex: 1 }}>
    <Text style={styles.userTeamName}>
   {userTeam?.teamName}
    </Text>

<Text style={styles.teamSubtext}>
  Rank #{userRank}
</Text>
  </View>

  <Text style={styles.userPoints}>
  {userTeam?.totalPoints ?? 0} pts
  </Text>

 </View>
)}

</View>
);
}

const styles = StyleSheet.create({
card: {
  marginTop: hp(2),

  backgroundColor: '#120C2E',

  borderRadius: fp(14),

  borderWidth: 1,
  borderColor: '#2B1B59',

  paddingHorizontal: wp(3),
  paddingVertical: hp(1.3),

  shadowColor: '#7058FF',
  shadowOpacity: 0.25,
  shadowRadius: fp(8),

  elevation: 8,
},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 14,
  },
placeBadge: {
  width: wp(12),
  height: wp(5.5),

  resizeMode: 'contain',

  marginRight: wp(2),
},
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },

  trophy: {
    width: 18,
    height: 18,

    marginLeft: 6,
  },

  viewAll: {
    color: '#9F8BFF',
    fontSize: 11,
  },

teamRow: {
  flexDirection: 'row',
  alignItems: 'center',

  minHeight: hp(4),

  marginBottom: hp(0.7),
},

avatar: {
  width: wp(6),
  height: wp(6),

  borderRadius: wp(3),

  marginRight: wp(2),
},
crown: {
  width: wp(4),
  height: wp(4),

  marginLeft: wp(1),
},




pointsIcon: {
  width: wp(3.5),
  height: wp(3.5),

  marginRight: wp(1),
},
teamName: {
  flex: 1,

  color: '#FFF',

  fontSize: fp(12),
  fontWeight: '500',
},
teamAvatarText: {
  color: '#FFF',
  fontWeight: '800',
  fontSize: fp(10),
},
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },



points: {
  color: '#FFD45A',

  fontSize: fp(10),
  fontWeight: '700',
},

  userTeamContainer: {
    marginTop: 8,

    backgroundColor: '#241758',

    borderRadius: 14,

    paddingVertical: 10,
    paddingHorizontal: 10,

    flexDirection: 'row',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#7A5FFF',
  },
teamAvatar: {
  width: wp(6),
  height: wp(6),

  borderRadius: wp(3),

  backgroundColor: '#7A5FFF',

  justifyContent: 'center',
  alignItems: 'center',

  marginRight: wp(2),
},
teamSubtext: {
  color: '#B8B4D8',

  fontSize: 10,

  marginTop: 2,
},
  rankCircle: {
    width: 24,
    height: 24,

    borderRadius: 12,

    backgroundColor: '#37257F',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 8,
  },

  rankCircleText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '700',
  },

  userTeamName: {
    flex: 1,

    color: 'white',
    fontWeight: '600',
  },

  userPoints: {
    color: '#FFD15C',
    fontWeight: '700',
  },

});