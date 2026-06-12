import { DarkTheme, LightTheme } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { auth, db } from '@/services/firebase/config';
import { LinearGradient } from 'expo-linear-gradient';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  PixelRatio,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useLanguage } from '../../context/LanguageContext'; // Update your path
import { getAvatarSource } from '../../data/avatarData';

// Components
import ActivitiesSection from '../../components/ActivitiesSection';
import Banner from '../../components/Banner';
import BottomNavbar from '../../components/BottomNavBar';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import SearchBar from '../../components/SearchBar';
import SearchResults from '../../components/SearchResults';
import Sidebar from '../../components/SideBar';
import Streak from '../../components/streak';
import TeamRankingCard from '../../components/TeamRankingCard';

const { width, height } = Dimensions.get('window');
const wp = (p: number) => PixelRatio.roundToNearestPixel((width * p) / 100);
const hp = (p: number) => PixelRatio.roundToNearestPixel((height * p) / 100);

export default function HomeScreen() {
  const [userPoints, setUserPoints] = useState(0);
  const { t } = useLanguage(); // Access the translation object
  const { isDark } = useTheme();

const colors = isDark ? DarkTheme : LightTheme;
  const [search, setSearch] = useState('');
const sendingReminder = useRef(false);
const sendingStartReminder = useRef(false);
  const [hasTeam, setHasTeam] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const [streak, setStreak] = useState(0);
const [teamPoints, setTeamPoints] = useState(0);
const checkStreakReminder = async () => {
  const uid = auth.currentUser?.uid;

  if (!uid || sendingReminder.current) return;

  sendingReminder.current = true;

  try {
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) return;

    const data = snap.data();

    if (!data.lastActivityDate || data.streak <= 0) return;

    const diffInHours =
      (Date.now() - data.lastActivityDate.toDate().getTime()) /
      (1000 * 60 * 60);

    if (diffInHours < 23 || diffInHours >= 24) return;

    const today = new Date().toDateString();

    const lastReminder =
      data.lastStreakReminder?.toDate()?.toDateString();

    if (lastReminder === today) return;

    await addDoc(collection(db, "notifications"), {
      userID: uid,
      type: "streak",
      title: "Don't lose your streak !",
      subtitle: "Complete an activity within the next hour to keep your streak alive!",
      route: "/activities",
      read: false,
      createdAt: serverTimestamp(),
    });

    await updateDoc(userRef, {
      lastStreakReminder: serverTimestamp(),
    });
  } finally {
    sendingReminder.current = false;
  }
};
useEffect(() => {
  const uid = auth.currentUser?.uid;

  if (!uid) {
    setLoading(false);
    return;
  }

  let unsubscribeTeam: (() => void) | null = null;

const unsubscribeUser = onSnapshot(
  doc(db, 'users', uid),
  async (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();

setHasTeam(!!data.teamID);
setUserPoints(data.points || 0);

let currentStreak = data.streak || 0;

if (data.lastActivityDate) {

  const lastActivity = data.lastActivityDate.toDate();

  const now = new Date();

  const diffInHours =
    (now.getTime() - lastActivity.getTime()) /
    (1000 * 60 * 60);
if (
  diffInHours >= 24 &&
  currentStreak > 0 &&
  data.streak !== 0
) {
  currentStreak = 0;
  setStreak(0);

  const userRef = doc(db, "users", uid);

  await updateDoc(userRef, {
    streak: 0,
  });

const today = new Date().toDateString();

const lastStartReminder =
  data.lastStartReminder?.toDate()?.toDateString();

if (
  lastStartReminder !== today &&
  !sendingStartReminder.current
) {
  sendingStartReminder.current = true;

  try {
    await addDoc(collection(db, "notifications"), {
      userID: uid,
      type: "streak",
      title: "Start your streak today!",
      subtitle: "Complete any activity to begin your streak! 🚀",
      route: "/activities",
      read: false,
      createdAt: serverTimestamp(),
    });

    await updateDoc(userRef, {
      lastStartReminder: serverTimestamp(),
    });
  } finally {
    sendingStartReminder.current = false;
  }
}
}
}

setStreak(currentStreak);

        if (unsubscribeTeam) {
          unsubscribeTeam();
          unsubscribeTeam = null;
        }

        if (data.teamID) {
          unsubscribeTeam = onSnapshot(
            doc(db, 'teams', data.teamID),
            (teamSnap) => {
              if (teamSnap.exists()) {
                setTeamPoints(
                  teamSnap.data().totalPoints || 0
                );
              }
            }
          );
        }
      }

      setLoading(false);
    },
    (error) => {
      console.log('User listener error:', error);
    }
  );

  return () => {
    unsubscribeUser();

    if (unsubscribeTeam) {
      unsubscribeTeam();
    }
  };
}, []);
useEffect(() => {
  if (!loading) {
    checkStreakReminder();
  }
}, [loading]);

  if (loading) return null;

  return (
<View
  style={[
    styles.container,
    {
      backgroundColor: colors.background,
    },
  ]}
>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(20) }}
      >
        <ImageBackground
  source={
    isDark
      ? require('../../assets/images/spacebg1.png')
      : require('../../assets/images/spacebg1_light.png')
  }
  style={styles.topSection}
  resizeMode="cover"
>
          <View style={styles.overlay}>
            <Header
              onMenuPress={() => setIsSidebarOpen(true)}
              avatarSource={getAvatarSource(auth.currentUser?.photoURL, auth.currentUser?.uid)}
            />
            <Hero />
          </View>
          <LinearGradient
colors={
  isDark
    ? [
        'rgba(4,6,27,0)',
        'rgba(4,6,27,0.35)',
        'rgba(4,6,27,0.75)',
        'rgba(4,6,27,0.96)',
        '#04061B',
      ]
    : [
        'rgba(255,255,255,0)',
        'rgba(255,255,255,0.35)',
        'rgba(250,248,255,0.8)',
        'rgba(248,246,255,0.95)',
        '#F8F6FF',
      ]
}            locations={[0, 0.35, 0.6, 0.82, 1]}
            style={styles.gradient}
          />
        </ImageBackground>

        <View style={styles.content}>
        <SearchBar
  search={search}
  setSearch={setSearch}
  placeholder={t.placeholderSearch || "Search..."}
/>

{/* Only render when search has characters */}
{search.length > 0 && <SearchResults search={search} />}

<ActivitiesSection userPoints={userPoints} />
<Streak
  hasTeam={hasTeam}
  streak={streak}
  points={teamPoints}
/>
     <Banner />
          <TeamRankingCard />
          
        </View>
      </ScrollView>

      {isSidebarOpen && (
        <View style={styles.sidebarOverlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setIsSidebarOpen(false)} />
       <View
  style={[
    styles.sidebarWrapper,
    {
      backgroundColor: colors.background,
      borderRightColor: colors.border,
    },
  ]}
>
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </View>
        </View>
      )}
      <BottomNavbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topSection: { width: '100%', minHeight: hp(45), overflow: 'hidden' },
  sidebarOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999, backgroundColor: 'rgba(0,0,0,0.6)' },
  sidebarWrapper: { width: wp(60), height: '100%', borderRightWidth: 1 },
  overlay: { paddingHorizontal: wp(4), zIndex: 2, paddingTop: hp(1.5) },
  gradient: { position: 'absolute', bottom: 0, width: '100%', height: hp(20), zIndex: 1 },
  content: { paddingHorizontal: wp(4), marginTop: -hp(12) },
});