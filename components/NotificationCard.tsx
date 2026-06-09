import { router } from 'expo-router';
import {
    Dimensions,
    PixelRatio,
    Pressable,
    StyleSheet,
    Text,
    View,
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
const getIcon = () => {
    switch(notification.type){
        case 'team':
            return require('../assets/images/team.png');

        case 'leaderboard':
            return require('../assets/images/trophy.png');

        case 'streak':
            return require('../assets/images/fire.png');

        case 'rank':
            return require('../assets/images/rank.png');

        case 'challenge':
            return require('../assets/images/flask.png');

        default:
            return require('../assets/images/bell.png');
    }
}
    
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
      android_ripple={{ color: '#2C214F' }}
 style={({ pressed }) => [
  styles.card,
  pressed && {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
]}
      onPress={() => router.push(notification.route as any)}
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
        {getIcon()}
      </View>

      {/* Middle */}

      <View style={styles.content}>
<Text
  style={[
    styles.title,
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
        <Text style={styles.time}>
          {notification.time}
        </Text>

        {notification.unread && (
          <View style={styles.dot} />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
card: {
  flexDirection: 'row',
  alignItems: 'center',

  backgroundColor: 'rgba(22, 20, 45, 0.72)',

  borderRadius: 22,

  paddingHorizontal: wp(4),
  paddingVertical: hp(2),

  marginBottom: hp(1.8),

  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.08)',

  shadowColor: '#000',
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

  content: {
    flex: 1,

    marginLeft: wp(4),
  },

  title: {
    color: '#FFFFFF',

    fontSize: wp(4.8),

    fontWeight: '700',
  },

  subtitle: {
    color: '#B7B8D0',

    fontSize: wp(3.8),

    marginTop: hp(0.5),

    lineHeight: hp(2.6),
  },

  right: {
    alignItems: 'flex-end',

    justifyContent: 'space-between',

    height: hp(6),
  },

  time: {
    color: '#BDBDD4',

    fontSize: wp(3.5),
  },

  dot: {
    width: 12,
    height: 12,

    borderRadius: 6,

    backgroundColor: '#8B5CF6',

    marginTop: hp(1),
  },
});