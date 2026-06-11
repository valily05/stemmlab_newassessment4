import { useTheme } from '@/context/ThemeContext';
import { db } from '@/services/firebase/config';
import { router } from 'expo-router';
import { doc, updateDoc } from 'firebase/firestore';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  PixelRatio,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

const wp = (p: number) =>
  PixelRatio.roundToNearestPixel((width * p) / 100);

const hp = (p: number) =>
  PixelRatio.roundToNearestPixel((height * p) / 100);

interface Notification {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  time: string;
  unread: boolean;
  route: string;
}

interface Props {
  notification: Notification;
}

export default function NotificationCard({
  notification,
}: Props) {
  const { theme } = useTheme();

  const getIcon = (): ImageSourcePropType => {
    switch(notification.type){
        case 'team':
            return require('../assets/images/teamicon.png');

        case 'leaderboard':
            return require('../assets/images/trophyicon.png');

        case 'streak':
            return require('../assets/images/fireicon.png');

        case 'rank':
            return require('../assets/images/rankupicon.png');

        default:
            return require('../assets/images/fireicon.png');
    }
  };

  const getGlowColor = () => {
    switch (notification.type) {
      case 'team':
        return '#7A58F2';
      case 'leaderboard':
        return '#FFD54A';
      case 'streak':
        return '#FF6B35';
      case 'rank':
        return '#55E57A';
      default:
        return theme.primary || '#A970FF';
    }
  };
    
  const getCircleColor = () => {
    switch (notification.type) {
      case 'team':
        return 'rgba(169,112,255,0.18)';
      case 'leaderboard':
        return 'rgba(255,182,45,0.18)';
      case 'streak':
        return 'rgba(255,107,53,0.18)';
      case 'rank':
        return 'rgba(74,222,128,0.18)';
      case 'challenge':
        return 'rgba(77,166,255,0.18)';
      default:
        return 'rgba(169,112,255,0.18)';
    }
  };

  return (
    <Pressable
      android_ripple={{ color: theme.border || '#2C214F' }}
      style={({ pressed }) => [
        styles.card,
        { 
          backgroundColor: theme.activityCard || 'rgba(22,20,45,0.72)',
          borderColor: theme.activityBorder || 'rgba(255,255,255,0.08)',
          shadowColor: theme.activityShadow || '#000',
        },
        !notification.unread && {
          opacity: 0.65,
        },
        notification.unread && [
          styles.unreadCard,
          {
            borderColor: theme.primary || '#8B5CF6',
            shadowColor: theme.primary || '#8B5CF6',
          }
        ],
        pressed && {
          transform: [{ scale: 0.98 }],
          opacity: 0.9,
        },
      ]}
      onPress={async () => {
        try {
          await updateDoc(
            doc(db, "notifications", notification.id),
            {
              read: true,
            }
          );

          console.log(notification.route);
          router.push(notification.route as any);
        } catch (err) {
          console.log(err);
        }
      }}
    >
      {/* Left Icon */}
      <View
        style={[
          styles.iconCircle,
          {
            backgroundColor: getCircleColor(),
          },
        ]}
      >
        <View
          style={[
            styles.iconGlow,
            {
              shadowColor: getGlowColor(),
            },
          ]}
        >
          <Image
            source={getIcon()}
            style={styles.icon}
          />
        </View>
      </View>

      {/* Middle */}
      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            { color: theme.activityTitle || '#FFFFFF' },
            !notification.unread && {
              opacity: 0.5,
            },
          ]}
        >
          {notification.title}
        </Text>

        <Text
          style={[
            styles.subtitle,
            { color: theme.activityDescription || '#B7B8D0' },
            !notification.unread && {
              opacity: 0.5,
            },
          ]}
        >
          {notification.subtitle}
        </Text>
      </View>

      {/* Right */}
      <View style={styles.right}>
        <Text style={[styles.time, { color: theme.activityDescription || '#BDBDD4' }]}>
          {notification.time}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    marginBottom: hp(1.8),
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 6,
  },
  iconCircle: {
    width: wp(15),
    height: wp(15),
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  iconGlow: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 12,
  },
  icon: {
    width: wp(8),
    height: wp(8),
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    marginLeft: wp(4),
  },
  unreadCard: {
    borderWidth: 1.5,
    shadowOpacity: 0.45,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 10,
  },
  title: {
    fontSize: wp(5),
    fontFamily: 'PixelBold',
  },
  subtitle: {
    fontSize: wp(4.2),
    marginTop: hp(0.5),
    fontFamily: 'PixelOperator',
    lineHeight: hp(2.6),
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: hp(10),
  },
  time: {
    fontFamily: 'PixelBold',
    fontSize: wp(3.5),
  },
});