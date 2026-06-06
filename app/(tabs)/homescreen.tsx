import { auth, db } from '@/services/firebase/config';
import { LinearGradient } from 'expo-linear-gradient';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
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
  const { t } = useLanguage(); // Access the translation object
  const [search, setSearch] = useState('');
  const [hasTeam, setHasTeam] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const [streak, setStreak] = useState(0);
const [teamPoints, setTeamPoints] = useState(0);
  const userPoints = 500;
  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      setLoading(false);
      return;
    }
 const unsubscribe = onSnapshot(
  doc(db, 'users', uid),
  (snapshot) => {
if (snapshot.exists()) {
  const data = snapshot.data();

  setHasTeam(!!data.teamID);
  setStreak(data.streak || 0);

  if (data.teamID) {
    const teamRef = doc(
      db,
      'teams',
      data.teamID
    );

    onSnapshot(teamRef, (teamSnap) => {
      if (teamSnap.exists()) {
        setTeamPoints(
          teamSnap.data().totalPoints || 0
        );
      }
    });
  }
}

    setLoading(false);
  }
);
    return unsubscribe;
  }, []);

  if (loading) return null;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(20) }}
      >
        <ImageBackground
          source={require('../../assets/images/spacebg1.png')}
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
            colors={['rgba(4,6,27,0)', 'rgba(4,6,27,0.35)', 'rgba(4,6,27,0.75)', 'rgba(4,6,27,0.96)', '#04061B']}
            locations={[0, 0.35, 0.6, 0.82, 1]}
            style={styles.gradient}
          />
        </ImageBackground>

        <View style={styles.content}>
          <SearchBar
            search={search}
            setSearch={setSearch}
            placeholder={t.placeholderSearch || "Search..."} // Language-dynamic placeholder
          />
          <SearchResults search={search} />
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
          <View style={styles.sidebarWrapper}>
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </View>
        </View>
      )}
      <BottomNavbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#07021B' },
  topSection: { width: '100%', minHeight: hp(45), overflow: 'hidden' },
  sidebarOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999, backgroundColor: 'rgba(0,0,0,0.6)' },
  sidebarWrapper: { width: wp(60), height: '100%', backgroundColor: '#07021B', borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.1)' },
  overlay: { paddingHorizontal: wp(4), zIndex: 2, paddingTop: hp(1.5) },
  gradient: { position: 'absolute', bottom: 0, width: '100%', height: hp(20), zIndex: 1 },
  content: { paddingHorizontal: wp(4), marginTop: -hp(12) },
});