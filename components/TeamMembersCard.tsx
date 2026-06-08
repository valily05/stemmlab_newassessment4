import {
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { auth, db } from '@/services/firebase/config';
import { useEffect, useState } from 'react';
import { getAvatarSource } from '../data/avatarData';

import {
  doc,
  getDoc,
} from 'firebase/firestore';

const { width, height } = Dimensions.get('window');

const wp = (percentage: number) =>
  PixelRatio.roundToNearestPixel((width * percentage) / 100);

const hp = (percentage: number) =>
  PixelRatio.roundToNearestPixel((height * percentage) / 100);

const rf = (size: number) => {
  const scale = width / 390;
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

export default function TeamMembersCard() {
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const userSnap = await getDoc(doc(db, 'users', uid));
      const teamID = userSnap.data()?.teamID;
      if (!teamID) return;

      const teamSnap = await getDoc(doc(db, 'teams', teamID));
      const teamData = teamSnap.data();

      if (!teamData?.members) return;

      const loadedMembers = [];
      for (const memberUID of teamData.members) {
        const memberSnap = await getDoc(doc(db, 'users', memberUID));
        if (memberSnap.exists()) {
          loadedMembers.push({
            uid: memberUID,
            ...memberSnap.data(),
          });
        }
      }
      setMembers(loadedMembers);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.membersContainer}>
      <Text style={styles.membersTitle}>TEAM MEMBERS</Text>

      <View style={styles.membersRow}>
        {members.map((member, index) => (
          <View key={member.uid} style={styles.memberItem}>
            <View style={index === 0 ? styles.leaderAvatarBorder : styles.standardAvatarWrapper}>
              <Image
                source={getAvatarSource(member.photoURL, member.uid)}
                style={styles.avatarImage}
              />
            </View>

            <Text style={styles.memberName} numberOfLines={1}>
              {member.fullName}
            </Text>

            <Text style={index === 0 ? styles.memberRoleLeader : styles.memberRole}>
              {index === 0 ? 'Leader' : 'Member'}
            </Text>
          </View>
        ))}

        {Array.from({
          length: Math.max(0, 4 - members.length),
        }).map((_, index) => (
          <View key={`empty-${index}`} style={styles.memberItem}>
            <View style={styles.avatarEmpty}>
              <Text style={styles.plusText}>+</Text>
            </View>

            <Text style={styles.memberName}>Invite</Text>
            <Text style={styles.memberRoleOpen}>Open Slot</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  membersContainer: {
    marginTop: hp(2),
    width: '100%',
    backgroundColor: 'rgba(24, 10, 22, 0.45)', // Premium dark clear pink-tinted glass sheet
    borderRadius: rf(16),
    padding: wp(6),
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.12)', // Subtle glass border reflection
  },
  membersTitle: {
    color: '#FFF',
    fontSize: rf(18),
    fontFamily: 'Pixel',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  membersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2.5),
  },
  memberItem: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: wp(1),
  },
  leaderAvatarBorder: {
    width: wp(16),
    height: wp(16),
    borderRadius: wp(8),
    borderWidth: 2,
    borderColor: '#FF007F', // Solid cyber pink accent ring for Leader spotlight
    padding: 1,
  },
  standardAvatarWrapper: {
    width: wp(16),
    height: wp(16),
    borderRadius: wp(8),
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: wp(8),
    backgroundColor: '#1C0514',
  },
  avatarEmpty: {
    width: wp(16),
    height: wp(16),
    borderRadius: wp(8),
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(255, 194, 209, 0.3)', // Semi-transparent pink dash frame
    backgroundColor: 'rgba(28, 5, 20, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    color: '#FFC2D1', // Soft pastel pink "+" icon
    fontSize: rf(20),
    fontFamily: 'Pixel',
  },
  memberName: {
    marginTop: hp(1.2),
    color: '#FFF',
    fontSize: rf(13),
    fontFamily: 'PixelOperator',
    fontWeight: '500',
    textAlign: 'center',
    width: '100%',
  },
  memberRoleLeader: {
    color: '#FF007F', // Punchy pink role text
    fontSize: rf(11),
    fontFamily: 'PixelOperator',
    marginTop: hp(0.2),
  },
  memberRole: {
    color: '#FFC2D1', // Matching palette blush labels for standard members
    fontSize: rf(11),
    fontFamily: 'PixelOperator',
    marginTop: hp(0.2),
  },
  memberRoleOpen: {
    color: 'rgba(255, 194, 209, 0.35)', // Muted color accent for empty slots
    fontSize: rf(11),
    fontFamily: 'PixelOperator',
    marginTop: hp(0.2),
  },
});