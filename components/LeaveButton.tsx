import { auth, db } from '@/services/firebase/config';
import {
    arrayRemove,
    doc,
    getDoc,
    updateDoc,
} from 'firebase/firestore';
import {
    Alert,
    Dimensions,
    PixelRatio,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';

const { width } = Dimensions.get('window');

const hp = (percentage: number) =>
  PixelRatio.roundToNearestPixel((width * percentage) / 100);

const rf = (size: number) => {
  const scale = width / 390;
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

export default function LeaveButton() {
  const handleLeaveTeam = async () => {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) {
        Alert.alert('Error', 'User session not found.');
        return;
      }

      Alert.alert(
        'Leave Team',
        'Are you sure you want to exit your current team?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Leave',
            style: 'destructive',
            onPress: async () => {
              try {
                // 1. Fetch current team tracking reference
                const userSnap = await getDoc(doc(db, 'users', uid));
                const teamID = userSnap.data()?.teamID;

                if (!teamID) {
                  Alert.alert('Notice', 'You are not currently in a team.');
                  return;
                }

                // 2. Clear user out of the team array
                await updateDoc(doc(db, 'teams', teamID), {
                  members: arrayRemove(uid),
                });

                // 3. Reset user profile mapping state
                await updateDoc(doc(db, 'users', uid), {
                  teamID: null,
                });

                Alert.alert('Success', 'You have left the team.');
              } catch (dbError) {
                console.error('[Firebase Error]: ', dbError);
                Alert.alert('Error', 'Failed to update database records.');
              }
            },
          },
        ]
      );
    } catch (error) {
      console.log('[LeaveTeam Handler Error]: ', error);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={styles.button}
      onPress={handleLeaveTeam}
    >
      <Text style={styles.text}>LEAVE TEAM</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: hp(3),
    width: '100%',
    backgroundColor: '#160C0E', // Dark, smoked charcoal crimson backing
    borderWidth: 1.5,
    borderColor: 'rgba(194, 59, 59, 0.45)', // Muted threat-border indicator
    borderRadius: rf(15), // Matches your Team Card rounded configuration
    height: hp(14.5), // Perfectly scaled responsive height line
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    color: '#D46A6A', // Soft pastel rust red (highly visible, non-blinding)
    fontFamily: 'Pixel',
    fontSize: rf(12),
    letterSpacing: 0.5,
  },
});