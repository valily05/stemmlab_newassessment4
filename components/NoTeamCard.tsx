import { auth, db } from '@/services/firebase/config';
import { LinearGradient } from 'expo-linear-gradient';
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
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
      await updateDoc(doc(db, 'teams', teamDoc.id), { members: arrayUnion(uid) });
      await updateDoc(doc(db, 'users', uid), { teamID: teamDoc.id });

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
  source={require('../assets/images/planet-blue.png')}
  style={styles.bluePlanet}
/>

<Image
  source={require('../assets/images/planet-jupiter.png')}
  style={styles.jupiterPlanet}
/>
<Image
  source={require('../assets/images/tiny-blue-dot.png')}
  style={styles.dot1}
/>

<Image
  source={require('../assets/images/tiny-purple-dot.png')}
  style={styles.dot2}
/>

<Image
  source={require('../assets/images/tiny-pink-dot.png')}
  style={styles.dot3}
/>

<Image
  source={require('../assets/images/tiny-blue-dot.png')}
  style={styles.dot4}
/>

<Image
  source={require('../assets/images/tiny-purple-dot.png')}
  style={styles.dot5}
/>

<Image
  source={require('../assets/images/star-yellow.png')}
  style={styles.star3}
/>

<Image
  source={require('../assets/images/star-yellow.png')}
  style={styles.star4}
/>
<Image
  source={require('../assets/images/question-purple.png')}
  style={styles.questionMark}
/>

<Image
  source={require('../assets/images/star-yellow.png')}
  style={styles.star1}
/>

<Image
  source={require('../assets/images/star-yellow.png')}
  style={styles.star2}
/>

      <Image
        source={require('../assets/images/qmiffy.png')}
        style={styles.image}
      />

<Text style={styles.title}>
        <Text style={{ color: '#FFFFFF' }}>NO TEAM </Text>
        <Text style={{ color: '#A855F7' }}>DETECTED</Text>
      </Text>
            <Text style={styles.subtitle}>
        Every explorer needs a crew to discover new worlds and complete missions together.
      </Text>
<View style={styles.featureContainer}>
  <View style={styles.featureItem}>
    <Image
      source={require('../assets/images/Group 160.png')}
      style={styles.featureIcon}
    />
    <Text style={styles.featureText}>
      Collaborate{"\n"}with peers
    </Text>
  </View>

  <View style={styles.featureDivider} />

  <View style={styles.featureItem}>
    <Image
      source={require('../assets/images/star.png')}
      style={styles.featureIcon}
    />
    <Text style={styles.featureText}>
      Earn more{"\n"}points
    </Text>
  </View>

  <View style={styles.featureDivider} />

  <View style={styles.featureItem}>
    <Image
      source={require('../assets/images/leaderboard.png')}
      style={styles.featureIcon}
    />
    <Text style={styles.featureText}>
      Climb ranks{"\n"}together
    </Text>
  </View>
</View>
<View style={styles.codeSection}>
  <Text style={styles.readyText}>
    ✦ Ready To Start Your Journey? ✦
  </Text>

  <TouchableOpacity
    activeOpacity={1}
    onPress={() => inputRef.current?.focus()}
  >
    <View style={styles.codeBoxes}>
      {[0, 1, 2, 3].map((i) => (
        <View key={i} style={styles.codeBox}>
          <Text style={styles.codeDigit}>
            {teamCode[i] || '—'}
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
    colors={['#A855F7', '#7C5CFF']}
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

<TouchableOpacity
  activeOpacity={0.85}
  style={styles.createTeamCard}
>
  <View style={styles.createIcon}>
    <Text style={styles.plus}>+</Text>
  </View>

  <Text style={styles.createTeamText}>
    CREATE A TEAM
  </Text>

  <Text style={styles.arrow}>›</Text>
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  codeSection: {
  width: '100%',
  alignItems: 'center',
  marginTop: hp(2),
},
bluePlanet: {
  position: 'absolute',
  top: hp(-1),
  right: wp(40),
  width: wp(48),
  height: wp(45),
},
dot1: {
  position: 'absolute',
  left: wp(4),
  top: hp(18),
  width: 20,
  height: 23,
},

dot2: {
  position: 'absolute',
  left: wp(15),
  top: hp(28),
  width: 5,
  height: 5,
},

dot3: {
  position: 'absolute',
  right: wp(3),
  top: hp(19),
  width: 30,
  height: 30,
},

dot4: {
  position: 'absolute',
  left: wp(7),
  top: hp(22),
  width: 4,
  height: 4,
},

dot5: {
  position: 'absolute',
  right: wp(18),
  top: hp(8),
  width: 5,
  height: 5,
},

star3: {
  position: 'absolute',
  right: wp(5),
  top: hp(4),
  width: wp(4),
  height: wp(4),
},

star4: {
  position: 'absolute',
  left: wp(25),
  top: hp(6),
  width: wp(3),
  height: wp(3),
},
featureContainer: {
  flexDirection: 'row',
  width: '100%',
  borderWidth: 1,
  borderColor: '#3E2A78',
  borderRadius: 18,
  paddingVertical: hp(2),
  marginBottom: hp(3),
},

featureItem: {
  flex: 1,
  alignItems: 'center',
},

featureIcon: {
  width: wp(8),
  height: wp(8),
  marginBottom: hp(1),
},

featureText: {
  color: '#FFFFFF',
  textAlign: 'center',
  fontSize: rf(10),
  fontFamily: 'PixelOperator',
},

featureDivider: {
  width: 1,
  backgroundColor: '#3E2A78',
},
jupiterPlanet: {
  position: 'absolute',
  top: hp(14),
  right: wp(-23),
  width: wp(76),
  height: wp(76),
},

questionMark: {
  position: 'absolute',
  top: hp(7),
  right: wp(19),
  width: wp(13),
  height: wp(17),
  zIndex:10
},

star1: {
  position: 'absolute',
  left: wp(12),
  top: hp(24),
  width: wp(10),
  height: wp(10),
},

star2: {
  position: 'absolute',
  right: wp(10),
  top: hp(38),
  width: wp(8),
  height: wp(8),
},
readyText: {
  color: '#FFFFFF',
  fontFamily: 'PixelOperator',
  fontSize: rf(14),
  marginBottom: hp(2.5),
  textAlign: 'center',
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
  borderRadius: 14,
  borderWidth: 2,
  borderColor: '#6F42FF',
  backgroundColor: '#1B1235',
  justifyContent: 'center',
  alignItems: 'center',
},

codeDigit: {
  color: '#FFFFFF',
  fontSize: rf(20),
  fontFamily: 'Pixel',
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
},

createTeamCard: {
  width: '100%',
  height: hp(8),
  borderRadius: 20,
  borderWidth: 2,
  borderColor: '#6F42FF',
  backgroundColor: '#0F1028',
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: wp(5),
},

createIcon: {
  width: wp(10),
  height: wp(10),
  borderRadius: 999,
  backgroundColor: '#6F42FF',
  justifyContent: 'center',
  alignItems: 'center',
},

plus: {
  color: '#FFF',
  fontSize: rf(18),
  fontWeight: 'bold',
},

createTeamText: {
  flex: 1,
  color: '#FFF',
  fontFamily: 'Pixel',
  fontSize: rf(14),
  marginLeft: wp(4),
},

arrow: {
  color: '#FFF',
  fontSize: rf(22),
},
  card: {
backgroundColor: '#16112D',
borderColor: '#5A35B6',
    borderRadius: 28,
    borderWidth: 1,
    padding: wp(6),
    alignItems: 'center',
    marginHorizontal: wp(4),
    shadowColor: '#7C5CFF',
shadowOpacity: 0.3,
shadowRadius: 20,
elevation: 12,
  },
  star: { position: 'absolute', color: '#FFD166', fontSize: rf(16) },

image: {
  width: wp(99),
  height: wp(99),
},  title: { color: '#FFF', fontSize: rf(20), fontFamily: 'Pixel', marginBottom: hp(1) },
  subtitle: {
    color: '#A3AED0',
    fontSize: rf(13),
    textAlign: 'center',
    lineHeight: hp(2.5),
    fontFamily: 'PixelOperator',
    marginBottom: hp(3),
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