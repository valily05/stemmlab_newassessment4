import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

import {
  ImageBackground,
  ScrollView,
  StyleSheet,
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

          <ActivitiesSection />

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

    minHeight: 360,

    overflow: 'hidden',
  },

  /* DARK OVERLAY */
  overlay: {
    paddingHorizontal: 16,
  zIndex:2,

    paddingTop: 10,

    paddingBottom: 60,

  },

gradient: {
  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: 106,
  zIndex:1,
},

  /* MAIN CONTENT */
  content: {
    paddingHorizontal: 16,

    marginTop: -40,
  },

});