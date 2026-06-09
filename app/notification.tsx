import NotificationCard from '@/components/NotificationCard';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
    Dimensions,
    Image,
    ImageBackground,
    PixelRatio,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const wp = (p: number) =>
  PixelRatio.roundToNearestPixel((width * p) / 100);

const hp = (p: number) =>
  PixelRatio.roundToNearestPixel((height * p) / 100);

const todayNotifications = [
  {
    id: '1',
    type: 'team',
    title: 'Emily joined your team!',
    subtitle: 'Welcome Emily to Team Newton 👋',
    time: '10:42 AM',
    unread: true,
    route: '/team',
  },
  {
    id: '2',
    type: 'leaderboard',
    title: "You're in the Top 3!",
    subtitle: 'Keep making your way to the top! 🚀',
    time: '9:15 AM',
    unread: true,
    route: '/leaderboard',
  },
  {
    id: '3',
    type: 'streak',
    title: "Don't let your streak end!",
    subtitle: 'Complete a challenge within the next hour 🔥',
    time: '11:00 AM',
    unread: true,
    route: '/',
  },
  {
    id: '4',
    type: 'rank',
    title: 'Your team climbed 2 places!',
    subtitle: "Great job! You're now in 4th place.",
    time: '8:30 AM',
    unread: true,
    route: '/leaderboard',
  },
  {
    id: '5',
    type: 'challenge',
    title: 'New challenge available!',
    subtitle: 'Bridge Building Challenge is waiting.',
    time: '7:45 AM',
    unread: true,
    route: '/activities',
  },
];

const yesterdayNotifications = [
  {
    id: '6',
    type: 'team',
    title: 'Jason left your team.',
    subtitle: 'Your team now has 4 members.',
    time: 'Yesterday, 6:20 PM',
    unread: false,
    route: '/team',
  },
  {
    id: '7',
    type: 'leaderboard',
    title: "You're only 150 points from 2nd!",
    subtitle: 'Keep going, you can do it! 💪',
    time: 'Yesterday, 3:10 PM',
    unread: false,
    route: '/leaderboard',
  },
];

export default function NotificationPage() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/notifbg.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[
            'rgba(4,6,27,0)',
            'rgba(4,6,27,0.45)',
            '#04061B',
          ]}
          style={styles.gradient}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* Header */}

<View style={styles.header}>
  {/* Pixel Back Button */}
  <TouchableOpacity
    style={styles.backRow}
    onPress={() => router.back()}
  >
    <Image
      source={require('../assets/images/backbtn.png')}
      style={styles.backIcon}
    />
  </TouchableOpacity>

  <Text style={styles.title}>
    NOTIFICATIONS
  </Text>

  {/* Empty View to keep title centered */}
  <View style={styles.placeholder} />
</View>

          {/* Filter */}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}
          >
            <Pressable style={styles.activeChip}>
              <Text style={styles.activeChipText}>All</Text>
            </Pressable>

            <Pressable style={styles.chip}>
              <Text style={styles.chipText}>Team Updates</Text>
            </Pressable>

            <Pressable style={styles.chip}>
              <Text style={styles.chipText}>Leaderboard</Text>
            </Pressable>

            <Pressable style={styles.chip}>
              <Text style={styles.chipText}>Reminders</Text>
            </Pressable>

            <Pressable style={styles.chip}>
              <Text style={styles.chipText}>Challenges</Text>
            </Pressable>
          </ScrollView>

          <Pressable style={styles.markRead}>
            <Text style={styles.markReadText}>
              Mark all as read
            </Text>
          </Pressable>

          {/* Today */}

          <Text style={styles.section}>Today</Text>

          {todayNotifications.map((item) => (
            <NotificationCard
              key={item.id}
              notification={item}
            />
          ))}

          <Text style={[styles.section, { marginTop: hp(2) }]}>
            Yesterday
          </Text>

          {yesterdayNotifications.map((item) => (
            <NotificationCard
              key={item.id}
              notification={item}
            />
          ))}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07021B',
  },

  background: {
    flex: 1,
   
  },

  gradient: {
    ...StyleSheet.absoluteFillObject,
  },

  content: {
    paddingHorizontal: wp(5),
    paddingTop: hp(7),
    paddingBottom: hp(16),
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

backRow: {
  width: wp(18),
  height: wp(13),

  justifyContent: 'center',
  alignItems: 'center',
},

backIcon: {
  width: wp(15),
  height: wp(15),
marginRight:wp(4),
  resizeMode: 'contain',
},

placeholder: {
  width: wp(11),
},

  title: {
color: '#8E74E8',
    fontSize: wp(5),
    fontFamily:'Pixel',
    letterSpacing:1,
  },

  filterRow: {
    gap: wp(3),
    paddingVertical: hp(2.5),
  },

  activeChip: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: wp(5),
    height: hp(5),
    borderRadius: 10,
    justifyContent: 'center',
  },

  chip: {
    borderWidth: 1,
    borderColor: '#ffffff85',
    paddingHorizontal: wp(5),
    height: hp(5),
    borderRadius: 10,
    justifyContent: 'center',
  },

  activeChipText: {
    color: 'white',
    fontFamily:'PixelOperator'
  },

  chipText: {
    color: '#ffffff',
        fontFamily:'PixelOperator'

  },

  markRead: {
    alignSelf: 'flex-end',
    marginBottom: hp(2),
  },

  markReadText: {
    color: '#9B6CFF',
    fontWeight: '600',
        fontFamily:'PixelOperator'

  },

  section: {
    color: '#9B6CFF',
    fontSize: wp(6),
    fontWeight: '700',
    marginBottom: hp(1.5),
    fontFamily:'PixelBold'
  },
});