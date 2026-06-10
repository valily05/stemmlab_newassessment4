import { useTheme } from "@/context/ThemeContext";
import { auth, db } from '@/services/firebase/config';
import { LinearGradient } from 'expo-linear-gradient';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
const { width, height } = Dimensions.get('window');

// Helper functions for responsiveness
const wp = (p: number) => PixelRatio.roundToNearestPixel((width * p) / 100);
const hp = (p: number) => PixelRatio.roundToNearestPixel((height * p) / 100);
const rf = (s: number) => Math.round(PixelRatio.roundToNearestPixel(s * (width / 390)));

export default function NoTeamCard() {
  const { theme, isDark } = useTheme();
  const [teamCode, setTeamCode] = useState('');
  const [loading, setLoading] = useState(false);
const inputRef = useRef<TextInput>(null);
  const handleJoinTeam = async () => {
    if (teamCode.length !== 4) {
      Alert.alert('Invalid Code', 'Please enter a 4-digit team code.');
      return;
    }

    setLoading(true);
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const userSnap = await getDoc(doc(db, 'users', uid));
      if (userSnap.data()?.teamID) {
        Alert.alert('Notice', 'You are already in a team.');
        return;
      }

      const teamQuery = query(collection(db, 'teams'), where('teamCode', '==', teamCode));
      const teamSnapshot = await getDocs(teamQuery);

      if (teamSnapshot.empty) {
        Alert.alert('Error', 'Team not found. Please check the code.');
        return;
      }

      const teamDoc = teamSnapshot.docs[0];
const teamData = teamDoc.data();
const currentMembers = teamData.members || [];
const teamName = teamData.teamName;
const userData = userSnap.data();

const username =
  userData?.displayName ||
  userData?.username ||
  auth.currentUser?.displayName ||
  "A teammate";// Max 4 members per team
if (currentMembers.length >= 4) {
  Alert.alert(
    'Team Full',
    'This team already has the maximum number of members.'
  );
  return;
}

await updateDoc(doc(db, 'teams', teamDoc.id), {
  members: arrayUnion(uid),
});

await updateDoc(doc(db, 'users', uid), {
  teamID: teamDoc.id,
});
await addDoc(collection(db, "notifications"), {
  userID: uid,
  type: "team",
  title: "Welcome aboard!",
  subtitle: `You've joined ${teamName}. Start earning points together!`,
  route: "/team",
  read: false,
  createdAt: serverTimestamp(),
});
for (const memberId of currentMembers) {
  if (memberId === uid) continue;

  await addDoc(collection(db, "notifications"), {
    userID: memberId,
    type: "team",
    title: "A new teammate joined! 🎉",
    subtitle: `${username} is now part of your team.`,
    route: "/team",
    read: false,
    createdAt: serverTimestamp(),
  });
}
      Alert.alert('Success', 'Joined the crew!');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.card}>


      <Image
        source={require('../assets/images/miffyd.png')}
        style={styles.image}
      />

            <Text style={styles.subtitle}>
You are not part of any team yet.
Join a team to collaborate, compete and complete missions together!      </Text>
<View style={styles.featureContainer}>
  <View style={styles.featureItem}>
  <Image
  source={require('../assets/images/Group 267.png')}
  style={styles.collaborateIcon}
/>

    <Text style={styles.featureText}>
      Collaborate{"\n"}with peers
    </Text>
  </View>

<View style={styles.dashedDivider}>
  {[...Array(5)].map((_, i) => (
    <View key={i} style={styles.dash} />
  ))}
</View>
  <View style={styles.featureItem}>
 <Image
  source={require('../assets/images/star.png')}
  style={styles.starIcon}
/>
    <Text style={styles.featureText}>
      Earn more{"\n"}points
    </Text>
  </View>

<View style={styles.dashedDivider}>
  {[...Array(5)].map((_, i) => (
    <View key={i} style={styles.dash} />
  ))}
</View>
  <View style={styles.featureItem}>
   <Image
  source={require('../assets/images/Group 77.png')}
  style={styles.leaderboardIcon}
/>
    <Text style={styles.featureText}>
      Climb ranks{"\n"}together
    </Text>
  </View>
</View>
<View style={styles.codeSection}>
<Text style={styles.readyText}>
  <Text style={styles.readyStar}>✦{"\u00A0\u00A0\u00A0"}</Text>
  Ready To Start Your Journey?
  <Text style={styles.readyStar}>{"\u00A0\u00A0\u00A0"}✦</Text>
</Text>

  <TouchableOpacity
    activeOpacity={1}
    onPress={() => inputRef.current?.focus()}
  >
    <View style={styles.codeBoxes}>
      {[0, 1, 2, 3].map((i) => (
        <View key={i} style={styles.codeBox}>
          <Text style={styles.codeDigit}>
            {teamCode[i] || '#'}
          </Text>
        </View>
      ))}
    </View>
  </TouchableOpacity>

  <TextInput
    ref={inputRef}
    value={teamCode}
    onChangeText={(text) =>
      setTeamCode(text.replace(/[^0-9]/g, '').slice(0, 4))
    }
    keyboardType="number-pad"
    maxLength={4}
    style={styles.hiddenInput}
  />
</View>

<TouchableOpacity
  activeOpacity={0.85}
  onPress={handleJoinTeam}
  disabled={loading}
  style={{ width: '100%' }}
>

 <LinearGradient
  colors={['#5B21B6', '#DB2777']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}
  style={styles.joinButton}
>
    {loading ? (
      <ActivityIndicator color="#FFF" />
    ) : (
      <Text style={styles.joinButtonText}>
        JOIN TEAM
      </Text>
    )}
  </LinearGradient>
</TouchableOpacity>

      <View style={styles.dividerRow}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

<LinearGradient
  colors={
    isDark
      ? ["#E879F9", "#A970FF", "#6D5CFF"]
      : ["#C084FC", "#A78BFA", "#8B5CF6"]
  }
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.createTeamBorder}
>
  <TouchableOpacity
    activeOpacity={0.85}
    style={[
      styles.createTeamBtn,
      {
        backgroundColor: theme.card,
      },
    ]}
  >
    <View
      style={[
        styles.createIcon,
        {
          backgroundColor: theme.primary,
        },
      ]}
    >
      <Text style={styles.plus}>+</Text>
    </View>

    <Text
      style={[
        styles.createTeamText,
        {
          color: theme.primary,
        },
      ]}
    >
      CREATE TEAM
    </Text>


  </TouchableOpacity>
</LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  codeSection: {
  width: '100%',
  alignItems: 'center',
  marginTop: hp(2),
},
featureContainer: {
  flexDirection: 'row',
  width: '100%',
  borderWidth: 3,
  borderColor: '#3E2A78',
  borderRadius: 18,
  paddingVertical: hp(2),
  marginBottom: hp(1.4),
  backgroundColor:'#0D102E'
},

featureItem: {
  flex: 1,
  alignItems: 'center',
},

collaborateIcon: {
  width: wp(13),
  height: wp(7),
  marginBottom: hp(1),
},

starIcon: {
  width: wp(7),
  height: wp(7),
  marginBottom: hp(1),
},

leaderboardIcon: {
  width: wp(13),
  height: wp(7),
  marginBottom: hp(1),
},
titleContainer: {
  position: 'relative',
  alignItems: 'center',
},

title: {
  fontFamily: 'PressStart2P-Regular', // or your pixel font
  fontSize: 22,
  letterSpacing: 1,
},

readyText: {
  color: '#FFFFFF',
  fontFamily: 'PixelBold',
  fontSize: rf(19),
  marginBottom: hp(3),
  textAlign: 'center',
},
dashedDivider: {
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: hp(0.5),
},

dash: {
  width: 2,
  height: hp(0.7),
  backgroundColor: '#3E2A78',
  marginVertical: hp(0.3),
},
readyStar: {
  color: '#ED359D',
},

noTeam: {
  color: '#FFFFFF',
},

detected: {
  color: '#FFD93D', // yellow
  textShadowColor: '#A855F7',
  textShadowOffset: {
    width: 2,
    height: 2,
  },
  textShadowRadius: 0,
},
featureText: {
  color: '#FFFFFF',
  textAlign: 'center',
  fontSize: rf(12),
  fontFamily: 'PixelOperator',
},

featureDivider: {
  width: 1,
  backgroundColor: '#3E2A78',
},


codeBoxes: {
  flexDirection: 'row',
  justifyContent: 'center',
  gap: wp(3),
  marginBottom: hp(3),
},

codeBox: {
  width: wp(14),
  height: wp(14),
  borderRadius: 10,
  borderWidth: 2,
  borderColor: '#6F42FF',
  backgroundColor: '#1B1235',
  justifyContent: 'center',
  alignItems: 'center',
},

codeDigit: {
  color: '#ffffff', 
  fontSize: rf(25),
  fontFamily: 'PixelBold',
},
createTeamBorder: {
  padding: 2,
  borderRadius: 16,
  width: "100%",
},



hiddenInput: {
  position: 'absolute',
  opacity: 0,
},

joinButton: {
  width: '100%',
  height: hp(7),
  borderRadius: 18,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: hp(3),
},

joinButtonText: {
  color: '#FFF',
  fontFamily: 'Pixel',
  fontSize: rf(14),
},

dividerRow: {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  marginBottom: hp(3),
},

line: {
  flex: 1,
  height: 1,
  backgroundColor: '#26344F',
},

orText: {
  color: '#7184A8',
  marginHorizontal: wp(4),
  fontFamily: 'PixelOperator',
  fontSize:15,
},

createTeamCard: {
  width: '100%',
  height: hp(8),
  borderRadius: 20,
  borderWidth: 2,
  borderColor: '#6F42FF',
  backgroundColor: '#0D102E',
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: wp(5),
},


createTeamBtn: {
  width: "100%",
  borderRadius: 16,

  paddingVertical: hp(1.8),

  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
},

createIcon: {
  width: wp(8),
  height: wp(8),

  borderRadius: 999,

  justifyContent: "center",
  alignItems: "center",

  marginRight: wp(2.5), // closer to text
},

plus: {
  color: "#FFF",
  fontFamily: "PixelOperator",
  fontSize: rf(40),

  includeFontPadding: false,
  textAlignVertical: "center",

  transform: [{ translateY: -6 }], // centers it vertically
},
createTeamText: {
  fontFamily: "PixelBold",
  fontSize: wp(6),
  letterSpacing: 1,
},
arrow: {
  color: '#FFF',
  fontSize: rf(22),
},
  card: {
    alignItems: 'center',
width:'100%'
  },
  star: { position: 'absolute', color: '#FFD166', fontSize: rf(16) },

image: {
  width: wp(97),
  height: wp(80),

},  
  subtitle: {
    color: '#FFFFFF',
    fontSize: rf(15),
    textAlign: 'center',
    lineHeight: hp(2.2),
    fontFamily: 'PixelOperator',
    marginBottom: hp(3),
    width:'80%'
  },
  codeContainer: { width: '100%', marginBottom: hp(3) },
  codeLabel: { color: '#7E8FB5', fontFamily: 'PixelOperator', fontSize: rf(10), marginBottom: hp(1) },
  input: {
    height: hp(7),
    backgroundColor: '#1A2338',
    borderWidth: 2,
    borderColor: '#32415F',
    borderRadius: 18,
    color: '#FFF',
    textAlign: 'center',
    fontSize: rf(24),
    letterSpacing: 10,
  },







  createCrew: { color: '#B794F4', fontFamily: 'Pixel', fontSize: rf(14) },
});