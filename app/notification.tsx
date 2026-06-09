import NotificationCard from '@/components/NotificationCard';
import { auth, db } from '@/services/firebase/config';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    where,
    writeBatch,
} from "firebase/firestore";
import { useEffect, useState } from 'react';
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


export default function NotificationPage() {
    const [notifications, setNotifications] = useState<any[]>([]);
    useEffect(() => {
  const uid = auth.currentUser?.uid;

  if (!uid) return;

const q = query(
  collection(db, "notifications"),
  where("userID", "==", uid),
  orderBy("createdAt", "desc")
);

  const unsubscribe = onSnapshot(q, snapshot => {
    const data = snapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
  
    setNotifications(data);
  });

  return unsubscribe;
}, []);
const handleMarkAllRead = async () => {
  const batch = writeBatch(db);

  notifications.forEach((notification) => {
    if (!notification.read) {
      batch.update(
        doc(db, "notifications", notification.id),
        {
          read: true,
        }
      );
    }
  });

  await batch.commit();
};
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

        
          </ScrollView>

{notifications.some((n) => !n.read) && (
<Pressable onPress={handleMarkAllRead}>
  <LinearGradient
    colors={['#A970FF', '#6D5CFF']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.markRead}
  >
    <Text style={styles.markReadText}>
       Mark all as read
    </Text>
  </LinearGradient>
</Pressable>
)}
{notifications.length === 0 ? (
  <Text
    style={{
      color: "#B7B8D0",
      textAlign: "center",
      marginTop: hp(8),
      fontFamily: "PixelOperator",
    }}
  >
    No notifications yet.
  </Text>
) : (
  notifications.map((item: any) => (
    <NotificationCard
      key={item.id}
      notification={{
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        type: item.type,
        unread: !item.read,
        route:
  item.type === "streak"
    ? "/activities"
    : item.type === "leaderboard"
    ? "/leaderboard"
    : item.type === "team"
    ? "/team"
    : "/",
        time: item.createdAt
          ? item.createdAt
              .toDate()
              .toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })
          : "",
      }}
    />
  ))
)}

     
       
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

  paddingHorizontal: wp(4.5),
  paddingVertical: hp(1.1),

  borderRadius: 999,

  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.15)',

  shadowColor: '#9B6CFF',
  shadowOpacity: 0.35,
  shadowRadius: 10,
  shadowOffset: {
    width: 0,
    height: 3,
  },

  elevation: 6,
},

markReadText: {
  color: '#FFFFFF',
  fontFamily: 'PixelOperator',
  fontSize: wp(3.7),
},

  section: {
    color: '#9B6CFF',
    fontSize: wp(6),
    fontWeight: '700',
    marginBottom: hp(1.5),
    fontFamily:'PixelBold'
  },
});