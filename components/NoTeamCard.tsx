import { auth, db } from '@/services/firebase/config';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
    Dimensions,
    Image,
    PixelRatio,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

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
const { width, height } = Dimensions.get('window');

const wp = (percentage: number) =>
  PixelRatio.roundToNearestPixel(
    (width * percentage) / 100
  );

const hp = (percentage: number) =>
  PixelRatio.roundToNearestPixel(
    (height * percentage) / 100
  );

const rf = (size: number) => {
  const scale = width / 390;

  return Math.round(
    PixelRatio.roundToNearestPixel(size * scale)
  );
};

export default function NoTeamCard() {
  const [teamCode, setTeamCode] = useState('');
const handleJoinTeam = async () => {
  try {
    const uid = auth.currentUser?.uid;

    if (!uid) return;

    if (teamCode.length !== 4) {
      alert('Please enter a valid 4 digit code');
      return;
    }

    const userSnap = await getDoc(
      doc(db, 'users', uid)
    );

    if (userSnap.data()?.teamID) {
      alert(
        'You are already in a team.'
      );
      return;
    }

    const teamQuery = query(
      collection(db, 'teams'),
      where('teamCode', '==', teamCode)
    );

    const teamSnapshot =
      await getDocs(teamQuery);

    if (teamSnapshot.empty) {
      alert('Team not found.');
      return;
    }

    const teamDoc =
      teamSnapshot.docs[0];

    await updateDoc(
      doc(db, 'teams', teamDoc.id),
      {
        members: arrayUnion(uid),
      }
    );

    await updateDoc(
      doc(db, 'users', uid),
      {
        teamID: teamDoc.id,
      }
    );

    alert('Joined team!');
} catch (error: any) {
  console.log(
    'JOIN ERROR:',
    error.message
  );

  alert(error.message);
}
};

  const handleCreateTeam = () => {
    console.log('Create Team');
  };

  return (
    <View style={styles.container}>
      {/* Floating Stars */}
      <Text style={styles.star1}>✦</Text>
      <Text style={styles.star2}>✦</Text>
      <Text style={styles.star3}>✦</Text>

      {/* Status Badge */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          CREW STATUS
        </Text>
      </View>

      {/* Bunny */}
      <Image
        source={require('../assets/images/miffy.png')}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={styles.title}>
        NO CREW DETECTED
      </Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Every explorer needs a crew
        to discover new worlds and
        complete missions together.
      </Text>

      {/* Team Code */}
      <View style={styles.codeContainer}>
        <Text style={styles.codeLabel}>
          TEAM CODE
        </Text>

        <TextInput
          style={styles.input}
          placeholder="____"
          placeholderTextColor="#546483"
          keyboardType="number-pad"
          maxLength={4}
          value={teamCode}
          onChangeText={(text) =>
            setTeamCode(
              text.replace(/[^0-9]/g, '')
            )
          }
        />
      </View>

      {/* Join Button */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handleJoinTeam}
      >
        <LinearGradient
          colors={[
            '#A855F7',
            '#7C5CFF',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.joinButton}
        >
          <Text style={styles.joinButtonText}>
            JOIN CREW
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.dividerRow}>
        <View style={styles.line} />

        <Text style={styles.orText}>
          OR
        </Text>

        <View style={styles.line} />
      </View>

      {/* Create Team */}
      <TouchableOpacity
        onPress={handleCreateTeam}
      >
        <Text style={styles.createCrew}>
          + CREATE NEW CREW
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: hp(2),

    backgroundColor: '#111827',

    borderRadius: rf(28),

    borderWidth: 1,

    borderColor: '#2A3655',

    paddingHorizontal: wp(6),

    paddingVertical: hp(4),

    alignItems: 'center',

    overflow: 'hidden',
  },

  badge: {
    backgroundColor: '#1D2540',

    paddingHorizontal: wp(4),

    paddingVertical: hp(0.8),

    borderRadius: 999,

    marginBottom: hp(2),
  },

  badgeText: {
    color: '#B794F4',

    fontFamily: 'PixelOperator',

    fontSize: rf(13),
  },

  image: {
    width: wp(42),

    height: wp(42),

    marginBottom: hp(2),
  },

  title: {
    color: '#FFFFFF',

    fontSize: rf(22),

    fontFamily: 'Pixel',

    textAlign: 'center',

    marginBottom: hp(1.2),
  },

  subtitle: {
    color: '#A3AED0',

    fontSize: rf(14),

    textAlign: 'center',

    lineHeight: hp(2.8),

    fontFamily: 'PixelOperator',

    marginBottom: hp(3),
  },

  codeContainer: {
    width: '100%',

    marginBottom: hp(3),
  },

  codeLabel: {
    color: '#7E8FB5',

    fontFamily: 'PixelOperator',

    marginBottom: hp(1),

    fontSize: rf(12),
  },

  input: {
    height: hp(7),

    backgroundColor: '#1A2338',

    borderWidth: 2,

    borderColor: '#32415F',

    borderRadius: rf(18),

    color: '#FFF',

    fontFamily: 'Pixel',

    fontSize: rf(24),

    textAlign: 'center',

    letterSpacing: 8,
  },

  joinButton: {
    width: wp(72),

    height: hp(6.5),

    borderRadius: rf(18),

    justifyContent: 'center',

    alignItems: 'center',

    shadowColor: '#8B5CF6',

    shadowOpacity: 0.6,

    shadowRadius: 12,

    elevation: 10,
  },

  joinButtonText: {
    color: '#FFFFFF',

    fontFamily: 'Pixel',

    fontSize: rf(14),
  },

  dividerRow: {
    flexDirection: 'row',

    alignItems: 'center',

    width: '100%',

    marginVertical: hp(3),
  },

  line: {
    flex: 1,

    height: 1,

    backgroundColor: '#26344F',
  },

  orText: {
    color: '#7184A8',

    marginHorizontal: wp(3),

    fontFamily: 'PixelOperator',
  },

  createCrew: {
    color: '#B794F4',

    fontFamily: 'Pixel',

    fontSize: rf(14),
  },

  star1: {
    position: 'absolute',

    top: hp(2),

    right: wp(10),

    color: '#FFD166',

    fontSize: rf(18),
  },

  star2: {
    position: 'absolute',

    top: hp(8),

    left: wp(8),

    color: '#FFD166',

    fontSize: rf(14),
  },

  star3: {
    position: 'absolute',

    top: hp(18),

    right: wp(14),

    color: '#FFD166',

    fontSize: rf(16),
  },
});