import { auth, db } from '@/services/firebase/config';
import { LinearGradient } from 'expo-linear-gradient';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { getAvatarSource } from '../../data/avatarData';

import ActivitiesSection from '../../components/ActivitiesSection';
import Banner from '../../components/Banner';
import BottomNavbar from '../../components/BottomNavBar';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import SearchBar from '../../components/SearchBar';
import SearchResults from '../../components/SearchResults';
import Streak from '../../components/streak';
import TeamRankingCard from '../../components/TeamRankingCard';
export default function HomeScreen() {

  const [search, setSearch] = useState('');
  const [hasTeam, setHasTeam] = useState(false);
  const [loading, setLoading] = useState(true);

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
        const userData = snapshot.data();

        setHasTeam(!!userData.teamID);
      } else {
        setHasTeam(false);
      }

      setLoading(false);
    },
    (error) => {
      console.log('Error checking team:', error);
      setLoading(false);
    }
  );

  return unsubscribe;
}, []);

  if (loading) {
    return null;
  }

  return (

    <View style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 180,
        }}
      >

        {/* HERO IMAGE SECTION */}
        <ImageBackground
          source={require('../../assets/images/spacebg1.png')}
          style={styles.topSection}
          resizeMode="cover"
        >

          {/* DARK OVERLAY */}
          <View style={styles.overlay}>

<Header
  avatarSource={getAvatarSource(
    auth.currentUser?.photoURL,
    auth.currentUser?.uid
  )}
/>
            <Hero />

            {/* POINTS CARD HIDDEN */}

          </View>

        <LinearGradient
  colors={[
    'rgba(4,6,27,0)',
    'rgba(4,6,27,0.35)',
    'rgba(4,6,27,0.75)',
    'rgba(4,6,27,0.96)',
    '#04061B',
  ]}
  locations={[0, 0.35, 0.6, 0.82, 1]}
  style={styles.gradient}
/>

        </ImageBackground>

        {/* MAIN CONTENT */}
        <View style={styles.content}>

        <SearchBar
  search={search}
  setSearch={setSearch}
  placeholder="Search Activities , Achievements , Teams ..."
/>

          <SearchResults search={search} />

          {/* ACTIVITIES */}
          <ActivitiesSection userPoints={userPoints} />

<Streak
  hasTeam={hasTeam}
  streak={4}
  points={250}
/>

          <Banner />

<TeamRankingCard />
        </View>

      </ScrollView>

      {/* FLOATING NAVBAR */}
      <BottomNavbar />

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#07021B',
  },

  /* TOP HERO SECTION */
  topSection: {
    width: '100%',

    minHeight: 420,

    overflow: 'hidden',
  },

  /* DARK OVERLAY */
  overlay: {
    paddingHorizontal: 16,

    zIndex: 2,

    paddingTop: 12,

  },

  gradient: {
    position: 'absolute',
    bottom: 0,

    width: '100%',
    height: 180,

    zIndex: 1,
  },

  /* MAIN CONTENT */
  content: {
    paddingHorizontal: 16,

    marginTop: -110,
  },

});

