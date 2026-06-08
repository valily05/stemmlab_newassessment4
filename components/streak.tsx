// components/Streak.tsx

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  View,
} from 'react-native';
const { width } = Dimensions.get('window');

const rf = (size: number) =>
  PixelRatio.roundToNearestPixel((width / 390) * size);

type Props = {
  streak?: number;
  points?: number;
  hasTeam?: boolean;
};

export default function Streak({
  streak = 0,
  points = 0,
  hasTeam = false,
}: Props) {
  const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'];
if (!hasTeam) {
  return (
<LinearGradient
  colors={[
    '#0A041D',
    '#160734',
    '#220A4D',
    '#160734',
    '#0A041D',
  ]}
  locations={[
    0,
    0.25,
    0.5,
    0.75,
    1,
  ]}
  start={{ x: 0, y: 0.5 }}
  end={{ x: 1, y: 0.8 }}
  style={styles.container}
>
      <View style={styles.lockedContent}>
        <View style={styles.lockIconContainer}>
          <Ionicons
            name="people"
            size={28}
            color="#B882FF"
          />
        </View>

        <Text style={styles.title}>
          TEAM STREAK LOCKED
        </Text>

<Text style={styles.footerText1}>
  Join a team to unlock{' '}
  <Text style={styles.streakText}>
    streaks
  </Text>
  , earn{' '}
  <Text style={styles.rewardText}>
    points
  </Text>
  , and climb the{' '}
  <Text style={styles.leaderboardText}>
    leaderboard
  </Text>
  .
</Text>
      </View>
    </LinearGradient>
  );
}
     const getState = (index: number) => {
  if (index < streak - 1) return 'completed';
  if (index === streak - 1) return 'current';
  return 'future';
};

  return (
    
<LinearGradient
  colors={[
    '#0A041D',
    '#160734',
    '#220A4D',
    '#160734',
    '#0A041D',
  ]}
  locations={[
    0,
    0.25,
    0.5,
    0.75,
    1,
  ]}
  start={{ x: 0, y: 0.5 }}
  end={{ x: 1, y: 0.8 }}
  style={styles.container}
>
    
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.leftHeader}>
       <View style={styles.flameWrapper}>
  <Image
    source={require('../assets/images/flame.png')}
    style={styles.flame}
  />
</View>

          <View>
            <Text style={styles.title}>
              {streak} DAYS STREAK
            </Text>

<Text style={styles.subtitle}>
  {streak} days in a row • Keep it going!
</Text>
          </View>
        </View>

        <View style={styles.pointsContainer}>
          <Image
            source={require('../assets/images/starpoint.png')}
            style={styles.star}
          />

          <View>
            <Text style={styles.points}>
              {points}
            </Text>

            <Text style={styles.pointsLabel}>
              Points
            </Text>
          </View>
        </View>
      </View>

      {/* Progress */}
      <View style={styles.progressRow}>
{days.map((day, index) => {
  const state = getState(index);
          return (
            <View
              key={day}
              style={styles.dayWrapper}
            >

              <View style={styles.row}>
                <View
                
style={[
  styles.circle,
  state === 'completed' && styles.completedCircle,
  state === 'current' && styles.currentCircle,
]}
>
{state === 'completed' && (
  <Text style={styles.check}>
    ✓
  </Text>
)}

{state === 'current' && (
  <Text style={styles.check}>
    🔥
  </Text>
)}
                
                </View>

                {index !== days.length - 1 && (
                  <View style={styles.line} />
                )}
              </View>

              <Text style={styles.dayText}>
                {day}
              </Text>
            </View>
          );
        })}
      </View>

<Text style={styles.footerText}>
  Complete 1 activity today to earn{' '}
  <Text style={styles.rewardText}>
    +50 points
  </Text>
  !
</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
container: {
  marginTop: rf(-18),
  borderRadius: rf(12),

  overflow: 'hidden', 

  width: '100%',
 paddingHorizontal: rf(18),
  paddingVertical: rf(18),
  marginBottom: rf(33),

  borderWidth: 1,
  borderColor: 'rgba(170,120,255,0.65)',

  shadowColor: '#7058FF',
  shadowOpacity: 0.25,
  shadowRadius: rf(8),

  elevation: 8,

},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  flame: {
    width: rf(40),
    height: rf(40),
    resizeMode: 'contain',
    marginRight: rf(12),
  },

  title: {
    color: '#FFFFFF',
    fontSize: rf(14),
    fontFamily: 'Pixel',
    marginBottom: rf(8),
  },

  subtitle: {
    color: '#E7D9FF',
    fontSize: rf(15),
    fontFamily: 'PixelOperator',
  },

  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:rf(3)
  },
lockedContent: {
  alignItems: 'center',
  justifyContent: 'center',
},
streakText: {
  color: '#FF8A65',
  fontFamily: 'PixelBold',
},

leaderboardText: {
  color: '#69D2FF',
  fontFamily: 'PixelBold',
},

rewardText: {
  color: '#FFD84D',
  fontFamily: 'PixelBold',
},
lockIconContainer: {
  width: rf(60),
  height: rf(60),
  borderRadius: rf(30),

  justifyContent: 'center',
  alignItems: 'center',

  marginBottom: rf(14),

  backgroundColor: 'rgba(122,45,255,0.15)',

  borderWidth: 1,
  borderColor: 'rgba(170,120,255,0.45)',

  shadowColor: '#7A2DFF',
  shadowOpacity: 0.4,
  shadowRadius: 8,

  elevation: 6,
},

  pointsLabel: {
    color: '#D7C7FF',
    fontSize: rf(11),
    fontFamily: 'PixelBold',
  },

progressRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: rf(23),
marginLeft:rf(6)
},

dayWrapper: {
  width: rf(67),
  alignItems: 'center',
},
currentCircle: {
  backgroundColor: '#FF8A65',
  borderColor: '#FFD84D',
},
star: {
  width: rf(27),
  height: rf(27),
  marginRight: rf(6),
},

points: {
  color: '#FFFFFF',
  fontSize: rf(22),
  fontFamily: 'PixelBold',
  lineHeight: rf(20),
},
row: {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
},
flameWrapper: {
  width: rf(48),
  height: rf(48),
  justifyContent: 'center',
  alignItems: 'center',

  shadowColor: '#B14DFF',
  shadowOpacity: 0.8,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 0 },

  elevation: 12,
},
  circle: {
    width: rf(39),
    height: rf(39),
    borderRadius: rf(99),

    borderWidth: 2.5,
    borderColor: '#7A2DFF',

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#190038',
  },

  completedCircle: {
    backgroundColor: '#8426FF',
    borderColor: '#A65CFF',
  },

  check: {
    color: '#FFFFFF',
    fontSize: rf(16),
    fontFamily:'Wix'
  },

line: {
  width: rf(21),
  height: 2.2,
  backgroundColor: '#7A2DFF',
  marginHorizontal: rf(4),
},

  dayText: {
    color: '#FFFFFF',
    marginTop: rf(8),
    fontSize: rf(13),
    marginRight:rf(23),
    fontFamily: 'PixelBold',
  },

  footerText: {
    marginTop: rf(20),
    color: '#FFFFFF',
    fontSize: rf(16),
    fontFamily: 'PixelOperator',
    marginLeft:rf(7)
  },

    footerText1: {
    marginTop: rf(5),
    color: '#FFFFFF',
    fontSize: rf(16),
    fontFamily: 'PixelOperator',
    marginLeft:rf(7),
    textAlign:'center'
  },
});