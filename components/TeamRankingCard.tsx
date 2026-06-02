import { auth } from "@/services/firebase/config";
import { getAllTeams, getTeam, getTopTeams } from "@/services/firebase/teamService";
import { getUserProfile } from "@/services/firebase/userService";
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
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
// PUT IT HERE
const GradientText = ({ children }: any) => (
  <MaskedView
    maskElement={
      <Text style={styles.gradientText}>
        {children}
      </Text>
    }
  >
    <LinearGradient
      colors={[
        '#FF9BEF',
        '#FF69C9',
        '#FF3DAA',
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <Text
        style={[
          styles.gradientText,
          { opacity: 0 }
        ]}
      >
        {children}
      </Text>
    </LinearGradient>
  </MaskedView>
);

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
<LinearGradient
colors={[
  '#24114F',
  '#321A6B',
  '#4A2792',
  '#321A6B',
  '#24114F',
]}
  locations={[0, 0.25, 0.5, 0.75, 1]}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.card}
>

      {/* HEADER */}
      <View style={styles.header}>
    <View style={styles.headerLeft}>
  <Text style={styles.title}>
    Team Ranking
  </Text>

<Image
  source={require('../assets/images/medal-red.png')}
  style={styles.medal}
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

        
      
  
{!userTeam && (
<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
  <Text style={styles.userTeamName}>Join a </Text>

<Text style={styles.highlightText}>
  team
</Text>
  <Text style={styles.userTeamName}>
    {' '}now to compete on the{' '}
  </Text>

  <GradientText>
    leaderboard
  </GradientText>

  <Text style={styles.userTeamName}>!</Text>
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

</LinearGradient>
);
}

const styles = StyleSheet.create({
card: {
  marginTop: hp(2),
  borderRadius: fp(12),
  overflow: 'hidden',



  paddingHorizontal: wp(4),
  paddingVertical: hp(1.8),


    borderWidth: 1,
  borderColor: 'rgba(186, 142, 255, 0.18)',

  shadowColor: '#9B6BFF',
  shadowOpacity: 0.28,
  shadowRadius: fp(12),
},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

   marginBottom: hp(1.5),
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
     fontSize: fp(25),
    fontWeight: '700',
    fontFamily:'PixelBold'
  },

  medal: {
    width: wp(4),
  height: wp(6.8),
  marginLeft: wp(3),
  },

  viewAll: {
    color: '#9F8BFF',
fontSize: fp(15),
fontFamily:'PixelOperator'
  },
highlightText: {
  color: '#FFB7F1',
  fontFamily: 'PixelBold',

  backgroundColor: 'rgba(255,105,201,0.15)',

  paddingHorizontal: wp(1),
  borderRadius: fp(4),
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
joinTeamContainer: {
  marginTop: hp(1),

  paddingVertical: hp(1.4),
  paddingHorizontal: wp(3.5),

  borderRadius: fp(14),

  backgroundColor: 'rgba(122, 95, 255, 0.15)',

  borderWidth: 1,
  borderColor: 'rgba(155, 107, 255, 0.45)',

  shadowColor: '#9B6BFF',
  shadowOpacity: 0.25,
  shadowRadius: fp(10),

  elevation: 5,
},
gradientText: {
  fontFamily: 'PixelBold',
  fontSize: fp(16),

  includeFontPadding: false,
},

joinTitle: {
  color: '#FF8FD8',

  fontSize: fp(12),
  fontWeight: '700',

  marginBottom: hp(0.2),
  fontFamily:'PixelOperator'
},

joinSubtitle: {
  color: '#F5EFFF',

  fontSize: fp(10),
  lineHeight: fp(14),
    fontFamily:'PixelOperator'

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
  borderRadius: fp(14),

  paddingVertical: hp(1.2),
  paddingHorizontal: wp(3),

   

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

    fontSize: fp(9),
  marginTop: hp(0.2),
},
  rankCircle: {
  width: wp(6),
  height: wp(6),

  borderRadius: wp(3),
    backgroundColor: '#37257F',

    justifyContent: 'center',
    alignItems: 'center',

  marginRight: wp(2),
  },

  rankCircleText: {
    color: 'white',
  fontSize: fp(10),
    fontWeight: '700',
  },

  userTeamName: {
    flex: 1,
  color: 'white',
  fontSize: fp(16),
  fontWeight: '600',
  fontFamily:'PixelOperator'
  },

  userPoints: {
    color: '#FFD15C',
  fontSize: fp(11),
  fontWeight: '700',
  },

});