import { BlurView } from 'expo-blur';
import { router, usePathname } from 'expo-router';
import {
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

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

    <BlurView
      intensity={100}
      tint="dark"
      style={StyleSheet.absoluteFillObject}
    />

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
    styles.icon,
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
  source={require('../assets/images/rocket.png')}
  style={[
    styles.icon,
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
    styles.icon,
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
    styles.icon,
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

container: {
  position: 'absolute',

  bottom: 0,
borderWidth: 1.5,

borderColor:
'rgba(255,255,255,0.12)',
  alignSelf: 'center',

 width:'92%',
bottom:hp(1.5),

borderRadius:rf(24),
  height: hp(10),

  paddingHorizontal: wp(3),

  flexDirection: 'row',

  justifyContent: 'space-around',

  alignItems: 'center',

  overflow: 'hidden',

backgroundColor:
  'rgba(18,12,46,0.35)',

  borderTopWidth: 1,

  borderTopColor:
    'rgba(255,255,255,0.08)',

  shadowColor: '#000',

  shadowOpacity: 0.25,

  shadowRadius: 20,

  shadowOffset: {
    width: 0,
    height: -2,
  },

  elevation: 20,
},

  /* EACH ITEM */
  item: {
    alignItems: 'center',
    justifyContent: 'center',
     bottom: hp(1),
  },



icon: {
  width: wp(9),
  height: wp(9),

  resizeMode: 'contain',

  opacity: 0.4,
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
    opacity:0.5,
  },

  /* ACTIVE LABEL */
  activeLabel: {
    color: '#FFE66D',

    textShadowColor: '#FFE66D',
    textShadowRadius: 10,
    opacity:1
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