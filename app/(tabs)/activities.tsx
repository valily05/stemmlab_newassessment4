import { useState } from 'react';

import MaskedView from '@react-native-masked-view/masked-view';

import { auth } from '@/services/firebase/config';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Dimensions,
  ImageBackground,
  PixelRatio,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Sidebar from '@/components/SideBar';
import ActivitiesResults from '../../components/ActivitiesResults';
import BottomNavbar from '../../components/BottomNavBar';
import CategoryTabs from '../../components/CategoryTabs';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import { getAvatarSource } from '../../data/avatarData';
const { width, height } = Dimensions.get('window');

/* RESPONSIVE HELPERS */
const wp = (percentage: number) => {
  return PixelRatio.roundToNearestPixel(
    (width * percentage) / 100
  );
};

const hp = (percentage: number) => {
  return PixelRatio.roundToNearestPixel(
    (height * percentage) / 100
  );
};

const rf = (size: number) => {
  const scale = width / 390;

  return Math.round(
    PixelRatio.roundToNearestPixel(size * scale)
  );
};

export default function Activities() {

  const [search, setSearch] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState('ALL');

  return (

    <View style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: hp(22),
        }}
      >

        {/* HERO SECTION */}
        <ImageBackground
          source={require('../../assets/images/spaceships.png')}
          style={styles.topSection}
          resizeMode="cover"
        >

          {/* OVERLAY */}
          <View style={styles.overlay}>

            {/* HEADER */}
        <Header
          onMenuPress={() => setIsSidebarOpen(true)}
          avatarSource={getAvatarSource(auth.currentUser?.photoURL, auth.currentUser?.uid)}
                />

            {/* TITLE SECTION */}
            <View style={styles.titleContainer}>

              {/* TITLE ROW */}
              <View style={styles.titleRow}>

                {/* GRADIENT TITLE */}
                <MaskedView
                  maskElement={
                    <Text style={styles.title}>
                      ACTIVITIES
                    </Text>
                  }
                >

                  <LinearGradient
                    colors={[
                      '#A061F5',
                      '#8B5CF6',
                      '#5D398F',
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >

                    <Text
                      style={[
                        styles.title,
                        styles.hiddenText,
                      ]}
                    >
                      ACTIVITIES
                    </Text>

                  </LinearGradient>

                </MaskedView>

                {/* STAR */}
                <Text style={styles.star}>
                  ✦
                </Text>

              </View>

              {/* SUBTITLE */}
              <Text style={styles.subtitle}>
                Explore fun challenges , missions,
                {'\n'}
                and hands on activities.
              </Text>

            </View>

          </View>

          {/* BOTTOM GRADIENT */}
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

        {/* CONTENT */}
        <View style={styles.content}>

          {/* CATEGORY TABS */}
          <CategoryTabs
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />

          {/* SEARCH */}
     <SearchBar
  search={search}
  setSearch={(text) => {
    console.log(text);
    setSearch(text);
  }}
  placeholder="Search Activities..."
/>

          {/* RESULTS */}
          <ActivitiesResults
            search={search}
            selectedCategory={selectedCategory}
          />

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
      {/* NAVBAR */}
      <BottomNavbar />

    </View>

  );
}

const styles = StyleSheet.create({

  /* SCREEN */
  container: {
    flex: 1,
    backgroundColor: '#07021B',
  },

  /* HERO SECTION */
  topSection: {
    width: '100%',

    minHeight: hp(52),

    overflow: 'hidden',
  },
  sidebarOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999, backgroundColor: 'rgba(0,0,0,0.6)' },
  sidebarWrapper: { width: wp(60), height: '100%', backgroundColor: '#07021B', borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.1)' },
  /* OVERLAY */
  overlay: {
    paddingHorizontal: wp(4),

    zIndex: 2,

    paddingTop: hp(1.5),
  },

  /* TITLE CONTAINER */
  titleContainer: {
    marginTop: hp(10),
  },

  /* TITLE ROW */
  titleRow: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  /* TITLE */
  title: {
    fontSize: rf(20),

    fontFamily: 'Pixel',

    textShadowColor: '#C66CFF',

    textShadowRadius: wp(2.5),
  },

  /* HIDDEN TEXT FOR MASK */
  hiddenText: {
    opacity: 0,
  },

  /* STAR */
star: {
  marginLeft: wp(1.5),

  fontSize: rf(24),

  color: '#EC588C',

  textShadowColor: '#FF4FC3',

  textShadowOffset: {
    width: 0,
    height: 0,
  },

  textShadowRadius: wp(1),

  opacity: 1,
},

  /* SUBTITLE */
  subtitle: {
    marginTop: hp(1.2),

    color: '#FFFFFF',

    fontSize: rf(16),

    lineHeight: hp(2.6),

    fontFamily: 'PixelOperator',
  },

  /* BOTTOM GRADIENT */
  gradient: {
    position: 'absolute',

    bottom: 0,

    width: '100%',

    height: hp(26),

    zIndex: 1,
  },

  /* CONTENT */
  content: {
    paddingHorizontal: wp(4),

    marginTop: -hp(13),
  },

});