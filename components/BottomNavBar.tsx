import {
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { router, usePathname } from 'expo-router';

const { width, height } = Dimensions.get('window');

/* RESPONSIVE HELPERS */
const wp = (percentage: number) => {
  return PixelRatio.roundToNearestPixel(
    (width * percentage) / 100
  );
};

const hp = (percentage: number) => {
  return PixelRatio.roundToNearestPixel(
    (height * percentage) / 100
  );
};

const fp = (size: number) => {
  return PixelRatio.roundToNearestPixel(
    (width / 430) * size
  );
};

export default function BottomNavbar() {

  const pathname = usePathname();

  /* ACTIVE STATES */
  const isHome =
    pathname.includes('/homescreen');

  const isActivities =
    pathname.includes('/activities');

  const isLeaderboard =
    pathname.includes('/leaderboard');

  const isTeam =
    pathname.includes('/team');

  return (

    <View style={styles.container}>

      {/* HOME */}
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          router.push('/(tabs)/homescreen')
        }
      >

        <Image
          source={require('../assets/images/Group 74.png')}
          style={[
            styles.homeIcon,
            isHome && styles.activeIconImage,
          ]}
        />

        <View style={styles.labelWrapper}>

          <Text
            style={[
              styles.label,
              isHome && styles.activeLabel,
            ]}
          >
            HOME
          </Text>

          {isHome && (
            <View style={styles.underline} />
          )}

        </View>

      </TouchableOpacity>

      {/* ACTIVITIES */}
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          router.push('/(tabs)/activities')
        }
      >

        <Image
          source={require('../assets/images/Group 75.png')}
          style={[
            styles.activitiesIcon,
            isActivities && styles.activeIconImage,
          ]}
        />

        <View style={styles.labelWrapper}>

          <Text
            style={[
              styles.label,
              isActivities && styles.activeLabel,
            ]}
          >
            ACTIVITIES
          </Text>

          {isActivities && (
            <View style={styles.underline} />
          )}

        </View>

      </TouchableOpacity>

      {/* LEADERBOARD */}
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          router.push('/(tabs)/leaderboard')
        }
      >

        <Image
          source={require('../assets/images/Group 76.png')}
          style={[
            styles.leaderboardIcon,
            isLeaderboard && styles.activeIconImage,
          ]}
        />

        <View style={styles.labelWrapper}>

          <Text
            style={[
              styles.label,
              isLeaderboard && styles.activeLabel,
            ]}
          >
            LEADERBOARD
          </Text>

          {isLeaderboard && (
            <View style={styles.underline} />
          )}

        </View>

      </TouchableOpacity>

      {/* TEAM */}
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          router.push('/(tabs)/team')
        }
      >

        <Image
          source={require('../assets/images/Group 160.png')}
          style={[
            styles.teamIcon,
            isTeam && styles.activeIconImage,
          ]}
        />

        <View style={styles.labelWrapper}>

          <Text
            style={[
              styles.label,
              isTeam && styles.activeLabel,
            ]}
          >
            TEAM
          </Text>

          {isTeam && (
            <View style={styles.underline} />
          )}

        </View>

      </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({

  /* NAVBAR CONTAINER */
  container: {
    position: 'absolute',

    bottom: hp(2.2),

    alignSelf: 'center',

    width: '93%',

    height: hp(9),

    paddingVertical: hp(1),
    paddingHorizontal: wp(2),

    borderRadius: wp(4.5),

    backgroundColor: 'rgba(58, 33, 102, 0.89)',

    borderWidth: 1.2,
    borderColor: 'rgba(185, 160, 255, 0.18)',

    flexDirection: 'row',

    justifyContent: 'space-around',

    alignItems: 'center',

    shadowColor: '#A855F7',
    shadowOpacity: 0.28,
    shadowRadius: 22,
    shadowOffset: {
      width: 0,
      height: 10,
    },

    elevation: 15,
  },

  /* EACH ITEM */
  item: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* HOME ICON */
  homeIcon: {
    width: wp(8.3),
    height: wp(8.3),

    resizeMode: 'contain',

    opacity: 0.72,
  },

  /* ACTIVITIES ICON */
  activitiesIcon: {
    width: wp(8.4),
    height: wp(8.4),

    resizeMode: 'contain',

    opacity: 0.72,
  },

  /* LEADERBOARD ICON */
  leaderboardIcon: {
    width: wp(8.7),
    height: wp(8.7),

    resizeMode: 'contain',

    opacity: 0.72,
  },

  /* TEAM ICON */
  teamIcon: {
    width: wp(7.2),
    height: wp(7.2),

    resizeMode: 'contain',

    opacity: 0.72,
  },

  /* ACTIVE ICON */
  activeIconImage: {
    opacity: 1,
  },

  /* LABEL WRAPPER */
  labelWrapper: {
    alignItems: 'center',

    marginTop: hp(0.5),

    paddingHorizontal: wp(1),
  },

  /* LABEL */
  label: {
    color: '#B2B0C7',

    fontSize: fp(9),

    fontFamily: 'Pixel',
  },

  /* ACTIVE LABEL */
  activeLabel: {
    color: '#FFE66D',

    textShadowColor: '#FFE66D',
    textShadowRadius: 10,
  },

  /* UNDERLINE */
  underline: {
    marginTop: hp(0.5),

    height: hp(0.25),

    alignSelf: 'stretch',

    borderRadius: wp(2),

    backgroundColor: '#FACC15',

    shadowColor: '#FACC15',

    shadowOpacity: 1,

    shadowRadius: 6,
  },

});