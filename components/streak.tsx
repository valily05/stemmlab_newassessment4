// components/Streak.tsx

import { useTheme } from "@/context/ThemeContext";
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
  const { theme } = useTheme();
  const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'];
if (!hasTeam) {
  return (
<LinearGradient
colors={theme.streakGradient}
  locations={[
    0,
    0.25,
    0.5,
    0.75,
    1,
  ]}
  start={{ x: 0, y: 0.5 }}
  end={{ x: 1, y: 0.8 }}
style={[
  styles.container,
  {
    borderColor: theme.streakBorder,
    shadowColor: theme.streakShadow,
  },
]}
>
      <View style={styles.lockedContent}>
        <View style={[
    styles.lockIconContainer,
    {
        backgroundColor: theme.lockedIconBackground,
        borderColor: theme.lockedIconBorder,
        shadowColor: theme.streakShadow,
    },
]}>
          <Ionicons
    name="people"
    size={28}
    color={theme.lockedIconColor}
/>
        </View>

<Text
  style={[
    styles.lockedTitle,
    {
      color: theme.streakTitle,
    },
  ]}
>
  TEAM STREAK LOCKED
</Text>

<Text
    style={[
        styles.footerText1,
        {
            color: theme.streakFooter,
        },
    ]}
>  Join a team to unlock{' '}
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
  colors={
    theme.streakGradient as readonly [
      string,
      string,
      ...string[]
    ]
  }
  locations={[0, 0.25, 0.5, 0.75, 1]}
  start={{ x: 0, y: 0.5 }}
  end={{ x: 1, y: 0.8 }}
  style={[
    styles.container,
    {
      borderColor: theme.streakBorder,
      shadowColor: theme.streakShadow,
    },
  ]}
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
<Text
  style={[
    styles.title,
    {
      color: theme.streakTitle,
    },
  ]}
>
  {streak} DAYS STREAK
</Text>
<Text
    style={[
        styles.subtitle,
        {
            color: theme.streakSubtitle,
        },
    ]}
>
  {streak} days in a row • Keep it going!
</Text>
          </View>
        </View>

     

<View style={styles.pointsContainer}>
  <Text
    style={[
      styles.points,
      {
        color: theme.streakPoints,
      },
    ]}
  >
    {points}
  </Text>

  <Text
    style={[
      styles.pointsLabel,
      {
        color: theme.streakPointsLabel,
      },
    ]}
  >
    Points
  </Text>
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
  {
    backgroundColor: theme.streakCircle,
    borderColor: theme.streakCircleBorder,
  },

  state === "completed" && {
    backgroundColor: theme.streakCompleted,
    borderColor: theme.streakCompletedBorder,
  },

  state === "current" && {
    backgroundColor: theme.streakCurrent,
    borderColor: theme.streakCurrentBorder,
  },
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
<View
    style={[
        styles.line,
        {
            backgroundColor: theme.streakLine,
        },
    ]}
/>                )}
              </View>

<Text
    style={[
        styles.dayText,
        {
            color: theme.streakText,
        },
    ]}
>                {day}
              </Text>
            </View>
          );
        })}
      </View>

<Text
    style={[
        styles.footerText,
        {
            color: theme.streakFooter,
        },
    ]}
>  Complete 1 activity today to earn{' '}
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

  shadowOpacity: 0.25,
  shadowRadius: rf(8),

  elevation: 8,

},
lockedTitle: {
  fontSize: rf(17),
  fontFamily: 'Pixel',
  textAlign: 'center',
  marginBottom: rf(10),
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
  alignItems: 'flex-start',
  marginTop: rf(3)
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

  shadowOpacity: 0.4,
  shadowRadius: 8,

  elevation: 6,
},

  pointsLabel: {
    color: '#D7C7FF',
    fontSize: rf(12),
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
  right:rf(4)

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

    justifyContent: 'center',
    alignItems: 'center',

  },


  check: {
    fontSize: rf(16),
    fontFamily:'Wix'
  },

line: {
  width: rf(21),
  height: 2.2,
  marginHorizontal: rf(4),
},

  dayText: {
    marginTop: rf(1),
    fontSize: rf(14),
    marginLeft:rf(5),
    fontFamily: 'PixelBold',
  },

  footerText: {
    marginTop: rf(20),
    fontSize: rf(16),
    fontFamily: 'PixelOperator',
    marginLeft:rf(7)
  },

    footerText1: {
    marginTop: rf(5),
    fontSize: rf(16),
    fontFamily: 'PixelOperator',
    marginLeft:rf(7),
    textAlign:'center'
  },
});