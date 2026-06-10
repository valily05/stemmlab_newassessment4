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

import { useTheme } from "@/context/ThemeContext";

const { width, height } = Dimensions.get('window');

/* RESPONSIVE HELPERS */
const wp = (percentage: number) => {
  return PixelRatio.roundToNearestPixel((width * percentage) / 100);
};
const rf = (size: number) => {
  const scale = width / 390;
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};
const hp = (percentage: number) => {
  return PixelRatio.roundToNearestPixel((height * percentage) / 100);
};
const fp = (size: number) => {
  return PixelRatio.roundToNearestPixel((width / 430) * size);
};

export default function BottomNavbar() {
  const { theme, isDark } = useTheme();
  const pathname = usePathname();

  /* ACTIVE STATES */
  const isHome = pathname.includes('/homescreen');
  const isActivities = pathname.includes('/activities');
  const isLeaderboard = pathname.includes('/leaderboard');
  const isTeam = pathname.includes('/team');

  return (
    <View 
      style={[
        styles.container, 
        { 
          backgroundColor: isDark ? 'rgba(18, 12, 46, 0.75)' : 'rgba(255, 255, 255, 0.9)',
          borderTopColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'
        }
      ]}
    >
      <BlurView
        intensity={20}
        tint={isDark ? "prominent" : "light"}
        style={StyleSheet.absoluteFillObject}
      />

      {/* HOME */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push('/(tabs)/homescreen')}
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
              { color: isDark ? '#B2B0C7' : theme.secondaryText },
              isHome && [styles.activeLabel, { color: theme.primary, textShadowColor: theme.primary }],
            ]}
          >
            HOME
          </Text>
          {isHome && (
            <View style={[styles.underline, { backgroundColor: theme.primary, shadowColor: theme.primary }]} />
          )}
        </View>
      </TouchableOpacity>

      {/* ACTIVITIES */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push('/(tabs)/activities')}
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
              { color: isDark ? '#B2B0C7' : theme.secondaryText },
              isActivities && [styles.activeLabel, { color: theme.primary, textShadowColor: theme.primary }],
            ]}
          >
            ACTIVITIES
          </Text>
          {isActivities && (
            <View style={[styles.underline, { backgroundColor: theme.primary, shadowColor: theme.primary }]} />
          )}
        </View>
      </TouchableOpacity>

      {/* LEADERBOARD */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push('/(tabs)/leaderboard')}
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
              { color: isDark ? '#B2B0C7' : theme.secondaryText },
              isLeaderboard && [styles.activeLabel, { color: theme.primary, textShadowColor: theme.primary }],
            ]}
          >
            LEADERBOARD
          </Text>
          {isLeaderboard && (
            <View style={[styles.underline, { backgroundColor: theme.primary, shadowColor: theme.primary }]} />
          )}
        </View>
      </TouchableOpacity>

      {/* TEAM */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push('/(tabs)/team')}
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
              { color: isDark ? '#B2B0C7' : theme.secondaryText },
              isTeam && [styles.activeLabel, { color: theme.primary, textShadowColor: theme.primary }],
            ]}
          >
            TEAM
          </Text>
          {isTeam && (
            <View style={[styles.underline, { backgroundColor: theme.primary, shadowColor: theme.primary }]} />
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
    width: '100%',
    height: hp(10),
    paddingHorizontal: wp(3),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    overflow: 'hidden',
    borderTopWidth: 1.5,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    elevation: 20,
  },
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
  activeIconImage: {
    opacity: 1,
  },
  labelWrapper: {
    alignItems: 'center',
    marginTop: hp(0.5),
    paddingHorizontal: wp(1),
  },
  label: {
    fontSize: fp(9),
    fontFamily: 'Pixel',
    opacity: 0.5,
  },
  activeLabel: {
    textShadowRadius: 10,
    opacity: 1,
  },
  underline: {
    marginTop: hp(0.5),
    height: hp(0.25),
    alignSelf: 'stretch',
    borderRadius: wp(2),
    shadowOpacity: 1,
    shadowRadius: 6,
  },
});