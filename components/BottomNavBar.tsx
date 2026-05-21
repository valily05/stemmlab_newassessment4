
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { router, usePathname } from 'expo-router';

export default function BottomNavbar() {

  const pathname = usePathname();

  return (
    <View style={styles.container}>

      {/* HOME */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push('/')}
      >

        <Text style={[
          styles.icon,
          pathname === '/' && styles.activeIcon
        ]}>
          🌍
        </Text>

        <Text style={[
          styles.label,
          pathname === '/' && styles.activeLabel
        ]}>
          HOME
        </Text>

      </TouchableOpacity>

      {/* ACTIVITIES */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push('/activities')}
      >

        <Text style={[
          styles.icon,
          pathname.includes('/activities') && styles.activeIcon
        ]}>
          🚀
        </Text>

        <Text style={[
          styles.label,
          pathname.includes('/activities') && styles.activeLabel
        ]}>
          ACTIVITIES
        </Text>

      </TouchableOpacity>

      {/* LEADERBOARD */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push('/leaderboard')}
      >

        <Text style={[
          styles.icon,
          pathname.includes('/leaderboard') && styles.activeIcon
        ]}>
          🏆
        </Text>

        <Text style={[
          styles.label,
          pathname.includes('/leaderboard') && styles.activeLabel
        ]}>
          LEADERBOARD
        </Text>

      </TouchableOpacity>

      {/* TEAM */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push('/team')}
      >

        <Text style={[
          styles.icon,
          pathname.includes('/team') && styles.activeIcon
        ]}>
          👥
        </Text>

        <Text style={[
          styles.label,
          pathname.includes('/team') && styles.activeLabel
        ]}>
          TEAM
        </Text>

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

 container: {
  position: 'absolute',

  bottom: 24,
  left: 20,
  right: 20,

  height: 74,

  borderRadius: 28,

  backgroundColor: 'rgba(5,10,25,0.92)',

  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',

  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.05)',

  shadowColor: '#000',
  shadowOpacity: 0.3,
  shadowRadius: 10,
},

  item: {
    alignItems: 'center',
  },

  icon: {
    fontSize: 24,
    opacity: 0.5,
  },

  activeIcon: {
    opacity: 1,
  },

  label: {
    color: '#64748B',

    fontSize: 9,

    marginTop: 6,

    fontFamily: 'Pixel',
  },

  activeLabel: {
    color: '#FACC15',

    textShadowColor: '#FACC15',
    textShadowRadius: 10,
  },

});