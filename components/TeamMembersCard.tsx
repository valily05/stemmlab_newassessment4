import {
    Dimensions,
    PixelRatio,
    StyleSheet,
    Text,
    View,
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

const rf = (size: number) => {
  const scale = width / 390;

  return Math.round(
    PixelRatio.roundToNearestPixel(size * scale)
  );
};

export default function TeamMembersCard() {
  return (
    <View style={styles.membersContainer}>

      <Text style={styles.membersTitle}>
        TEAM MEMBERS
      </Text>

      <View style={styles.membersRow}>

        <View style={styles.memberItem}>
          <View style={styles.avatarLeader}>
            <Text style={styles.avatarText}>V</Text>
          </View>

          <Text style={styles.memberName}>
            Valencia
          </Text>

          <Text style={styles.memberRoleLeader}>
            Leader
          </Text>
        </View>

        <View style={styles.memberItem}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>

          <Text style={styles.memberName}>
            Audrey
          </Text>

          <Text style={styles.memberRole}>
            Member
          </Text>
        </View>

        <View style={styles.memberItem}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>V</Text>
          </View>

          <Text style={styles.memberName}>
            Vanessa
          </Text>

          <Text style={styles.memberRole}>
            Member
          </Text>
        </View>

        <View style={styles.memberItem}>
          <View style={styles.avatarEmpty}>
            <Text style={styles.plusText}>+</Text>
          </View>

          <Text style={styles.memberName}>
            Invite
          </Text>

          <Text style={styles.memberRole}>
            Open Slot
          </Text>
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  membersContainer: {
    marginTop: hp(2),

    backgroundColor: '#120522',

    borderRadius: rf(20),

    padding: wp(5),

    borderWidth: 1,

    borderColor: '#2B1459',
  },

  membersTitle: {
    color: '#FFF',

    fontSize: rf(18),

    fontFamily: 'Pixel',
  },

  membersRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    marginTop: hp(2),
  },

  memberItem: {
    alignItems: 'center',

    flex: 1,
  },

  avatarLeader: {
    width: wp(16),
    height: wp(16),

    borderRadius: wp(8),

    backgroundColor: '#FFD45A',

    justifyContent: 'center',
    alignItems: 'center',
  },

  avatar: {
    width: wp(16),
    height: wp(16),

    borderRadius: wp(8),

    backgroundColor: '#30185F',

    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarEmpty: {
    width: wp(16),
    height: wp(16),

    borderRadius: wp(8),

    borderWidth: 2,

    borderStyle: 'dashed',

    borderColor: '#A88DFF',

    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#FFF',

    fontSize: rf(18),

    fontFamily: 'Pixel',
  },

  plusText: {
    color: '#A88DFF',

    fontSize: rf(22),

    fontFamily: 'Pixel',
  },

  memberName: {
    marginTop: hp(1),

    color: '#FFF',

    fontSize: rf(13),

    fontFamily: 'PixelOperator',

    textAlign: 'center',
  },

  memberRoleLeader: {
    color: '#FFD45A',

    fontSize: rf(11),

    fontFamily: 'PixelOperator',
  },

  memberRole: {
    color: '#A88DFF',

    fontSize: rf(11),

    fontFamily: 'PixelOperator',
  },
});