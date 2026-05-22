import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ActivitiesSection from '../../components/ActivitiesSection';
import Banner from '../../components/Banner';
import BottomNavbar from '../../components/BottomNavBar';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import SearchBar from '../../components/SearchBar';
import SearchResults from '../../components/SearchResults';

export default function HomeScreen() {

  const [search, setSearch] = useState('');

  // USER DATA
  const userPoints = 500;

  const userLevel = 3;

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
          source={require('../../assets/images/spacebg.png')}
          style={styles.topSection}
          resizeMode="cover"
        >

          {/* DARK OVERLAY */}
          <View style={styles.overlay}>

            <Header />

            <Hero />

            {/* POINTS CARD */}
            <View style={styles.pointsCard}>

              <View>

                <Text style={styles.pointsLabel}>
                  TEAM POINTS
                </Text>

                <Text style={styles.pointsText}>
                  ⭐ {userPoints}
                </Text>

              </View>

              <View style={styles.levelBox}>

                <Text style={styles.levelLabel}>
                  LEVEL
                </Text>

                <Text style={styles.levelText}>
                  {userLevel}
                </Text>

              </View>

            </View>

          </View>

          {/* BLEND GRADIENT */}
          <LinearGradient
            colors={[
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0.35)',
              'rgba(4,6,27,0.85)',
              '#04061B',
            ]}
            style={styles.gradient}
          />

        </ImageBackground>

        {/* MAIN CONTENT */}
        <View style={styles.content}>

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          <SearchResults search={search} />

          {/* ACTIVITIES */}
          <ActivitiesSection userPoints={userPoints} />

          <Banner />

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

    paddingTop: 10,

    paddingBottom: 60,
  },

  /* POINTS CARD */
  pointsCard: {
    marginTop: 18,

    backgroundColor: 'rgba(255,255,255,0.08)',

    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.12)',

    borderRadius: 22,

    paddingHorizontal: 18,
    paddingVertical: 16,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  pointsLabel: {
    color: '#C4B5FD',

    fontSize: 11,

    fontFamily: 'PixelOperator',
  },

  pointsText: {
    color: '#FACC15',

    fontSize: 28,

    marginTop: 4,

    fontFamily: 'Pixel',
  },

  levelBox: {
    alignItems: 'center',

    backgroundColor: '#9C4077',

    borderRadius: 16,

    paddingHorizontal: 18,
    paddingVertical: 10,
  },

  levelLabel: {
    color: '#FBCFE8',

    fontSize: 10,

    marginBottom: 2,

    fontFamily: 'PixelOperator',
  },

  levelText: {
    color: '#FFFFFF',

    fontSize: 24,

    fontFamily: 'Pixel',
  },

  gradient: {
    position: 'absolute',
    bottom: 0,

    width: '100%',
    height: 106,

    zIndex: 1,
  },

  /* MAIN CONTENT */
  content: {
    paddingHorizontal: 16,

    marginTop: -40,
  },

});