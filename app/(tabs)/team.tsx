import { useState } from 'react';

import MaskedView from '@react-native-masked-view/masked-view';

import { auth } from '@/services/firebase/config';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Dimensions,
  ImageBackground,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BottomNavbar from '../../components/BottomNavBar';
import Header from '../../components/Header';
import TeamCard from '../../components/TeamCard';
import TeamCodeCard from '../../components/TeamCodeCard';
import TeamMembersCard from '../../components/TeamMembersCard';
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
  source={require('../../assets/images/teambg2.png')}
  style={styles.topSection}
  resizeMode="cover"
  imageStyle={{
    transform: [
      { scale: 1.14 },
      { translateY: -80 }, // move image UP
    ],
  }}
>

          {/* OVERLAY */}
          <View style={styles.overlay}>

            {/* HEADER */}
         <Header
           avatarSource={getAvatarSource(
             auth.currentUser?.photoURL,
             auth.currentUser?.uid
           )}
         />

            {/* TITLE SECTION */}
            <View style={styles.titleContainer}>

              {/* TITLE ROW */}
              <View style={styles.titleRow}>

                {/* GRADIENT TITLE */}
                <MaskedView
                  maskElement={
                    <Text style={styles.title}>
                      TEAM
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
                      TEAM
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
                Tiny Explorers , Big Ideas
              </Text>

            </View>

          </View>

          {/* BOTTOM GRADIENT */}
          <LinearGradient
            colors={[
              'rgba(4,6,27,0)',
              'rgba(4,6,27,0.45)',
              'rgba(4,6,27,0.75)',
              'rgba(4,6,27,0.99)',
              '#04061B',
            ]}
            locations={[0, 0.35, 0.6, 0.82, 1]}
            style={styles.gradient}
          />

        </ImageBackground>

        {/* CONTENT */}
        <View style={styles.content}>

<TeamCard
  teamName="STEMM LAB"
  teamCode="STEMM47"
  totalPoints={12450}
  rank={1}
/>

<TeamMembersCard />

<TeamCodeCard />

        </View>

      </ScrollView>

      {/* NAVBAR */}
      <BottomNavbar />

    </View>

  );
}

const styles = StyleSheet.create({
membersContainer: {
  marginTop: hp(2),

  backgroundColor: '#120522',

  borderRadius: rf(20),

  padding: wp(5),

  borderWidth: 1,

  borderColor: '#2B1459',
},

membersRow: {
  flexDirection: 'row',

  justifyContent: 'space-between',

  marginTop: hp(2),
},

memberItem: {
  alignItems: 'center',

  flex: 1,
},

avatarLeader: {
  width: wp(16),
  height: wp(16),

  borderRadius: wp(8),

  backgroundColor: '#FFD45A',

  justifyContent: 'center',
  alignItems: 'center',
},

avatar: {
  width: wp(16),
  height: wp(16),

  borderRadius: wp(8),

  backgroundColor: '#30185F',

  justifyContent: 'center',
  alignItems: 'center',
},

avatarEmpty: {
  width: wp(16),
  height: wp(16),

  borderRadius: wp(8),

  borderWidth: 2,

  borderColor: '#A88DFF',

  borderStyle: 'dashed',

  justifyContent: 'center',
  alignItems: 'center',
},

avatarText: {
  color: '#FFF',

  fontSize: rf(18),

  fontFamily: 'Pixel',
},

plusText: {
  color: '#A88DFF',

  fontSize: rf(22),

  fontFamily: 'Pixel',
},

memberName: {
  marginTop: hp(1),

  color: '#FFF',

  fontSize: rf(13),

  fontFamily: 'PixelOperator',
},

memberRoleLeader: {
  color: '#FFD45A',

  fontSize: rf(11),

  fontFamily: 'PixelOperator',
},

memberRole: {
  color: '#A88DFF',

  fontSize: rf(11),

  fontFamily: 'PixelOperator',
},
  /* SCREEN */
  container: {
    flex: 1,
    backgroundColor: '#07021B',
  },

  /* HERO SECTION */
  topSection: {
    width: '100%',

    minHeight: hp(50),

    overflow: 'hidden',
  },

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

    height: hp(16),

    zIndex: 2,
  },
content: {
  paddingHorizontal: wp(4),
},
membersTable: {
  marginTop: hp(2),


  overflow: 'hidden',

  borderWidth: 1,


  backgroundColor: '#120522',
},

membersTitle: {
  padding: wp(4),

  color: '#FFF',

  fontSize: rf(18),

  fontFamily: 'Pixel',

  borderBottomWidth: 1,

  borderBottomColor: '#3B226E',
},

tableHeader: {
  flexDirection: 'row',

  backgroundColor: '#24104A',

  borderBottomWidth: 1,

  borderBottomColor: '#3B226E',

  paddingVertical: hp(1.2),
},

headerCell: {
  flex: 1,

  textAlign: 'center',

  color: '#A88DFF',

  fontFamily: 'PixelOperator',
},

tableRow: {
  flexDirection: 'row',

  paddingVertical: hp(1.6),

  borderBottomWidth: 1,

  borderBottomColor: 'rgba(255,255,255,0.08)',
},

memberCell: {
  flex: 1,

  textAlign: 'center',

  color: '#FFF',

  fontFamily: 'PixelOperator',
},

leaderCell: {
  flex: 1,

  textAlign: 'center',

  color: '#FFD45A',

  fontFamily: 'PixelOperator',
},

pointsCell: {
  flex: 1,

  textAlign: 'center',

  color: '#F69AEF',

  fontFamily: 'PixelOperator',
},
});