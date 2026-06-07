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
import { useState } from 'react';
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
      {/* Decorative Elements */}
      <Text style={[styles.star, { top: hp(2), right: wp(10) }]}>✦</Text>
      <Text style={[styles.star, { top: hp(8), left: wp(8) }]}>✦</Text>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>CREW STATUS</Text>
      </View>

      <Image
        source={require('../assets/images/miffy.png')}
        style={styles.image}
      />

      <Text style={styles.title}>NO CREW DETECTED</Text>
      <Text style={styles.subtitle}>
        Every explorer needs a crew to discover new worlds and complete missions together.
      </Text>

      <View style={styles.codeContainer}>
        <Text style={styles.codeLabel}>ENTER TEAM CODE</Text>
        <TextInput
          style={styles.input}
          placeholder="0000"
          placeholderTextColor="#3B4A6B"
          keyboardType="number-pad"
          maxLength={4}
          value={teamCode}
          onChangeText={(text) => setTeamCode(text.replace(/[^0-9]/g, ''))}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleJoinTeam}
        disabled={loading}
      >
        <LinearGradient
          colors={['#A855F7', '#7C5CFF']}
          style={styles.joinButton}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.joinButtonText}>JOIN CREW</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.dividerRow}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity onPress={() => console.log('Create Team')}>
        <Text style={styles.createCrew}>+ CREATE NEW CREW</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111827',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#2A3655',
    padding: wp(6),
    alignItems: 'center',
    marginHorizontal: wp(4),
  },
  star: { position: 'absolute', color: '#FFD166', fontSize: rf(16) },
  badge: {
    backgroundColor: '#1D2540',
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.8),
    borderRadius: 999,
    marginBottom: hp(2),
  },
  badgeText: { color: '#B794F4', fontFamily: 'PixelOperator', fontSize: rf(12) },
  image: { width: wp(35), height: wp(35), marginBottom: hp(2) },
  title: { color: '#FFF', fontSize: rf(20), fontFamily: 'Pixel', marginBottom: hp(1) },
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
  joinButton: {
    width: wp(70),
    height: hp(6.5),
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinButtonText: { color: '#FFF', fontFamily: 'Pixel', fontSize: rf(14) },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: hp(3) },
  line: { flex: 1, height: 1, backgroundColor: '#26344F' },
  orText: { color: '#7184A8', marginHorizontal: 15, fontFamily: 'PixelOperator' },
  createCrew: { color: '#B794F4', fontFamily: 'Pixel', fontSize: rf(14) },
});