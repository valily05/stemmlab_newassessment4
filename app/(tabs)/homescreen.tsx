import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function HomeScreen() {

const activities = [
  {
    title: 'EARTHQUAKE RESISTANT STRUCTURE',
    icon: require('../../assets/images/building.png'),
    tags: ['Engineering', 'Environmental'],
    iconStyle: { width: 29, height: 30 }
  },
  {
    title: 'PARACHUTE DROP CHALLENGE',
    icon: require('../../assets/images/parachute.png'),
    tags: ['Physics', 'Engineering'],
    iconStyle: { width: 30, height: 30 }
  },
  {
    title: 'REACTION BOARD LAB',
    icon: require('../../assets/images/lightning.png'),
    tags: ['Neuroscience','Physics'],
    iconStyle: { width: 28, height: 28 }
  },
  {
    title: 'HUMAN PERFORMANCE LAB',
    icon: require('../../assets/images/human.png'),
    tags: ['Medical Science', 'Neuroscience'],
    iconStyle: { width: 34, height: 33 }
  },
  {
    title: 'HAND FAN CHALLENGE',
    icon: require('../../assets/images/fan.png'),
    tags: ['Engineering', 'Physics'],
    iconStyle: { width: 40, height: 29 }
  },
  {
    title: 'SOUND POLLUTION HUNTER',
    icon: require('../../assets/images/sound.png'),
    tags: ['Environmental', 'Physics'],
    iconStyle: { width: 30, height: 30 }
  },
];
const TAG_COLORS: any = {
  Engineering: {
    bg: 'rgba(249,115,22,0.2)',
    border: '#F97316',
    text: '#FDBA74'
  },
  Physics: {
    bg: 'rgba(59,130,246,0.2)',
    border: '#3B82F6',
    text: '#93C5FD'
  },
  Environmental: {
    bg: 'rgba(34,197,94,0.2)',
    border: '#22C55E',
    text: '#86EFAC'
  },
  'Medical Science': {
    bg: 'rgba(168,85,247,0.2)',
    border: '#A855F7',
    text: '#D8B4FE'
  },
  Neuroscience: {
    bg: 'rgba(250,204,21,0.2)',
    border: '#FACC15',
    text: '#FDE68A'
  }
};

  return (
    <ImageBackground
      source={require('../../assets/images/space.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>

        {/* HEADER */}
        <View style={styles.header}>
          <Image source={require('../../assets/images/menu.png')} style={styles.menu} />
          <Text style={styles.logo}>STEMM LAB</Text>
          <Image source={require('../../assets/images/user1.png')} style={styles.icon} />
        </View>

        {/* WELCOME */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeText}>
            WELCOME BACK VALENCIA
          </Text>
        </View>

        {/* TITLE */}
<Text style={styles.section}>
  <Text style={styles.emoji}>🎯</Text> AVAILABLE ACTIVITIES
</Text>
  {/* GRID */}
        <View style={styles.grid}>
          {activities.map((item, index) => (
            <TouchableOpacity key={index} activeOpacity={0.85} style={styles.cardWrapper}>
              <View style={styles.card}>

                {/* TOP ROW */}
                <View style={styles.cardRow}>
                  <Image
                    source={item.icon}
                    style={[styles.cardIcon, item.iconStyle]}
                  />
                  <Text style={styles.cardText}>{item.title}</Text>
                </View>

             <View style={styles.tagContainer}>
  {item.tags.map((tag: string, i: number) => {
    const tagStyle = TAG_COLORS[tag] || TAG_COLORS.Engineering;

    return (
      <View
        key={i}
        style={[
          styles.tag,
          {
            backgroundColor: tagStyle.bg,
            borderColor: tagStyle.border,
          }
        ]}
      >
        <Text style={[styles.tagText, { color: tagStyle.text }]}>
          {tag}
        </Text>
      </View>
    );
  })}
</View>

              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.cta}>
          <Image source={require('../../assets/images/trophy.png')} style={styles.ctaIcon} />
          <View>
            <Text style={styles.ctaTitle}>KEEP EXPLORING!</Text>
            <Text style={styles.ctaText}>
              Complete activities, earn badges and level up your team!
            </Text>
          </View>
        </View>

      </ScrollView>

      {/* NAVBAR */}
      <View style={styles.navbar}>
        <NavItem
          icon={require('../../assets/images/home1.png')}
          label="HOME"
          active
          imageStyle={styles.homeIcon}
        />
        <NavItem
          icon={require('../../assets/images/rocket.png')}
          label="ACTIVITIES"
          imageStyle={styles.rocketIcon}
        />
        <NavItem
          icon={require('../../assets/images/leaderboard.png')}
          label="LEADERBOARD"
          imageStyle={styles.leaderboardIcon}
        />
      </View>

    </ImageBackground>
  );
}

const NavItem = ({ icon, label, active = false, imageStyle }: any) => (
  <TouchableOpacity style={styles.navItem} activeOpacity={0.8}>
    
    <Image
      source={icon}
      style={[styles.navImage, imageStyle]}
      resizeMode="contain"
    />

    <Text style={[styles.navText, active && styles.activeText]}>
      {label}
    </Text>

    {active && <View style={styles.activeLine} />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 60,
  },
tagContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 2, 
  marginTop: 8,
},


  icon: {
    width: 27,
    height: 27,
    tintColor: '#fff'
  },

  menu: {
    width: 20,
    height: 20,
    tintColor: '#fff'
  },
  logo: {
    color: '#fff',
    fontFamily: 'Pixel',
    fontSize: 22,
  },
welcomeCard: {
  marginTop: 30,
  padding: 16,
  backgroundColor: 'rgba(109,40,217,0.8)',
  marginHorizontal: -16,
},
emoji: {
  fontSize: 20, 
},
  welcomeText: {
    color: '#fff',
    fontFamily: 'Pixel',
    fontSize: 14,
    textAlign: 'center'
  },

  activeLine: {
    marginTop: 7,
    width: 40,
    height: 2,
    backgroundColor: '#FACC15',
  },

  section: {
    marginTop: 20,
    color: '#9CA3AF',
    fontFamily: 'Pixel',
    fontSize: 12,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  cardWrapper: {
    width: '49%',
    marginBottom: 14,
  },

  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  cardIcon: {
    marginRight: 10,
    marginTop: 4,
  },

cardText: {
  color: '#fff',
  fontFamily: 'Pixel',
  fontSize: 9,
  flex: 1,
  lineHeight: 18,
  flexWrap: 'wrap',     
  minWidth:0, 
},

  tag: {
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: 'rgba(250,204,21,0.2)',
    borderWidth: 1,
    borderColor: '#FACC15',
  },

  tagText: {
    color: '#FACC15',
    fontSize: 13,
    fontFamily: 'PixelOperator',
    padding:2,
  },

  card: {
    backgroundColor: 'rgba(30,41,59,0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 18,
    padding: 16,
    height: 160,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },

  cta: {
    marginTop: 20,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(254, 243, 199, 0.8)',
    borderWidth: 1,
    borderColor: '#FDE68A',
    shadowColor: '#FACC15',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },

  ctaIcon: {
    width: 54,
    height: 48,
    marginRight: 14,
  },

  ctaTitle: {
    fontFamily: 'Pixel',
    fontSize: 14,
    color: '#000'
  },

  ctaText: {
    fontSize: 15,
    color: '#000',
    fontFamily:'PixelOperator',
    marginTop:4,
    width:260,
  },
navbar: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,

  flexDirection: 'row',
  justifyContent: 'center', // 🔥 center everything
  alignItems: 'center',

  paddingVertical: 16,
  backgroundColor: 'rgba(2,6,23,0.95)',
},
navItem: {
  alignItems: 'center',
  marginHorizontal: 20, // 🔥 controls spacing between icons
},

  navImage: {
    marginBottom: 4,
  },

  navText: {
    fontSize: 10,
    color: '#64748B',
    fontFamily: 'Pixel'
  },

  activeText: {
    color: '#FACC15',
    textShadowColor: '#FACC15',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },

  homeIcon: { width: 34, height: 34 },
  rocketIcon: { width: 34, height: 34 },
  leaderboardIcon: { width: 34, height: 34 },
});