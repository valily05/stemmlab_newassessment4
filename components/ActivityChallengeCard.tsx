import { useTheme } from "@/context/ThemeContext";
import { LinearGradient } from 'expo-linear-gradient';
import {
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
type Props = {
  title: string;
  description: string;
  category: string;
  rating: string;
  duration: string;
  difficulty: string;
  buttonText: string;
  isNew?: boolean;
  locked?: boolean;
  onPress?: () => void;
};

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

const fp = (size: number) => {
  return PixelRatio.roundToNearestPixel(
    (width / 430) * size
  );
};

export default function ActivityChallengeCard({
  title,
  description,
  category,
  rating,
  duration,
  difficulty,
  buttonText,
  isNew,
  locked,
  onPress,
}: Props) {
const { theme } = useTheme();

  return (

<View
  style={[
    styles.card,
    {
      backgroundColor: theme.activityCard,
      borderColor: theme.activityBorder,
      shadowColor: theme.activityShadow,
    },
    locked && styles.lockedCard,
  ]}
>
  <LinearGradient
 colors={theme.activityCardGradient}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={StyleSheet.absoluteFillObject}
  />
      {/* OUTER PIXEL BLOCKS */}
<View
  style={[
    styles.topBlock,
    { backgroundColor: theme.activityBorder },
  ]}
/>
   <View
  style={[
    styles.bottomBlock,
    { backgroundColor: theme.activityBorder },
  ]}
/>
<View
  style={[
    styles.leftBlock,
    { backgroundColor: theme.activityBorder },
  ]}
/>
<View
  style={[
    styles.rightBlock,
    { backgroundColor: theme.activityBorder },
  ]}
/>

      {/* INNER CUT BLOCKS */}
<View
  style={[
    styles.topInnerBlock,
    { backgroundColor: theme.activityCard },
  ]}
/>
<View
  style={[
    styles.bottomInnerBlock,
    { backgroundColor: theme.activityCard },
  ]}
/>
<View
  style={[
    styles.topInnerBlockk,
    { backgroundColor: theme.activityCard },
  ]}
/>
<View
  style={[
    styles.bottomInnerBlockk,
    { backgroundColor: theme.activityCard },
  ]}
/>
 

      {/* NEW BADGE OR BOOKMARK */}
      
{/* NEW BADGE */}
{isNew && !locked && (
  <Image
    source={require('../assets/images/new-badge.png')}
    style={styles.newBadgeImage}
  />
)}
    

      {/* CONTENT */}
      <View style={styles.cardContent}>

        {/* TITLE */}
<Text
  style={[
    styles.cardTitle,
    { color: theme.activityTitle },
  ]}
>          {title}
        </Text>

        {/* DESCRIPTION */}
     <Text
  style={[
    styles.cardDesc,
    { color: theme.activityDescription },
  ]}
>
          {description}
        </Text>

        {/* CATEGORY TAG */}
        <View
        style={[
    styles.categoryTag,
    {
        borderColor:
            category === "Engineering"
                ? theme.engineeringBorder
                : category === "Environment"
                ? theme.environmentBorder
                : category === "Science"
                ? theme.scienceBorder
                : theme.technologyBorder,

        backgroundColor:
            category === "Engineering"
                ? theme.engineeringBackground
                : category === "Environment"
                ? theme.environmentBackground
                : category === "Science"
                ? theme.scienceBackground
                : theme.technologyBackground,
    },
]}
        >

          <Text
            style={[
              styles.categoryText,

              category.toLowerCase() === 'engineering' &&
                styles.engineeringText,

              category.toLowerCase() === 'environment' &&
                styles.environmentText,

              category.toLowerCase() === 'science' &&
                styles.scienceText,

              category.toLowerCase() === 'technology' &&
                styles.technologyText,
            ]}
          >
            {category}
          </Text>
        </View>
        {/* BOTTOM */}
        <View style={styles.bottomRow}>

          {/* STATS */}
          <View style={styles.stats}>

            {/* RATING */}
<View
  style={[
    styles.statItem,
    {
      backgroundColor: theme.activityStatBackground,
    },
  ]}
>              <Image
                source={require('../assets/images/star.png')}
                style={styles.statIcon}
              />

<Text
  style={[
    styles.stat,
    {
      color: theme.activityStatText,
    },
  ]}
>                {rating}
              </Text>
            </View>


            {/* DURATION */}
<View
  style={[
    styles.statItem,
    {
      backgroundColor: theme.activityStatBackground,
    },
  ]}
>                 <Image
                source={require('../assets/images/time.png')}
                style={styles.statIcon}
              />

           <Text
  style={[
    styles.stat,
    {
      color: theme.activityStatText,
    },
  ]}
>
  {duration}
</Text>
            </View>

   
            {/* DIFFICULTY */}
<View
  style={[
    styles.statItem,
    {
      backgroundColor: theme.activityStatBackground,
    },
  ]}
>   
              <Image
                source={require('../assets/images/chart.png')}
                style={[
                  styles.statIcon,

                  difficulty === 'Easy' && styles.easyIcon,
                  difficulty === 'Medium' && styles.mediumIcon,
                  difficulty === 'Hard' && styles.hardIcon,
                ]}
              />

<Text
  style={[
    styles.stat,
    {
      color: theme.activityStatText,
    },

    difficulty === "Easy" && styles.easyText,
    difficulty === "Medium" && styles.mediumText,
    difficulty === "Hard" && styles.hardText,
  ]}
>
  {difficulty}
</Text>

            </View>

          </View>

          {/* BUTTON */}
<TouchableOpacity
  onPress={onPress}
  disabled={locked}
>
  <LinearGradient
  colors={
  locked
    ? theme.activityButtonDisabledGradient
    : theme.activityButtonGradient
}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
  style={[
  styles.startBtn,
  {
    shadowColor: theme.activityButtonShadow,
  },
]}
  >
    <Text style={styles.startText}>
      {buttonText}
    </Text>
  </LinearGradient>
</TouchableOpacity>

        </View>

      </View>

    </View>

  );
}

const styles = StyleSheet.create({

  /* CARD */
card: {
  marginTop: hp(2),

  backgroundColor: '#12052F',

  borderWidth: wp(0.7),
  borderColor: '#7B4DFF',

  paddingHorizontal: wp(4.5),
  paddingVertical: hp(2),

  position: 'relative',
  overflow: 'visible',
    shadowColor: '#7B4DFF',
  shadowOpacity: 0.18,
  shadowRadius: wp(3),
  shadowOffset: {
    width: 0,
    height: hp(0.6),
  },

  elevation: 8,

},

  /* LOCKED */
  lockedCard: {
    opacity: 0.55,
  },

  /* OUTER PIXEL BLOCKS */
  topBlock: {
    position: 'absolute',

    top: -2,

    right: '0%',

    width: wp(1.4),
   height: wp(1.4),

    backgroundColor: '#7B4DFF',
  },

  bottomBlock: {
    position: 'absolute',

    bottom: -2,

    left: '0%',

    width: wp(1.4),
    height: wp(1.4),

    backgroundColor: '#7B4DFF',
  },

  leftBlock: {
    position: 'absolute',

    left: -2,

    top: '0%',

    width: wp(1.4),
    height: wp(1.4),

    backgroundColor: '#7B4DFF',
  },

  rightBlock: {
    position: 'absolute',

    right: -2,

    bottom: '0%',

   width: wp(1.4),
    height: 7,

    backgroundColor: '#7B4DFF',
  },

  /* INNER CUT BLOCKS */
  topInnerBlock: {
    position: 'absolute',
    top: -4,
    left: '-2%',
    width: 7,
    height: 7,
    backgroundColor: '#12052F',
    zIndex: 5,
  },

  bottomInnerBlock: {
    position: 'absolute',
    bottom: -4,
    right: '-2%',
    width: 7,
    height: 7,
    backgroundColor: '#12052F',
    zIndex: 5,
  },

  topInnerBlockk: {
    position: 'absolute',
    top: -4,
    right: '-2%',
    width: 7,
    height: 7,
    backgroundColor: '#12052F',
    zIndex: 5,
  },

  bottomInnerBlockk: {
    position: 'absolute',
    bottom: -4,
    left: '-2%',
    width: 7,
    height: 7,
    backgroundColor: '#12052F',
    zIndex: 5,
  },

  /* NEW BADGE IMAGE */
newBadgeImage: {
  position: 'absolute',

  top: -hp(1.6),
  right: -wp(0.5),

  width: wp(16),
  height: hp(4),

  resizeMode: 'contain',

  zIndex: 999,
  elevation: 999,
},





  /* IMAGE */
  cardImage: {
    width: wp(20),
    height: wp(20),
    resizeMode: 'contain',
    marginTop: hp(0.5),
    right: 8,
  },

  /* CONTENT */
cardContent: {
  width: '100%',
},

  /* TITLE */
cardTitle: {
  color: '#fff',

  fontFamily: 'Pixel',

  fontSize: fp(13),

  lineHeight: hp(2.8),

  marginBottom: hp(0.8),
  letterSpacing:1,
  maxWidth: '90%',
},

  /* DESCRIPTION */
cardDesc: {
  color: '#D7CCFF',

  fontFamily: 'PixelOperator',

  fontSize: fp(15),

  lineHeight: hp(2),

  marginBottom: hp(1.8),
},

  /* CATEGORY TAG */
categoryTag: {
  alignSelf: 'flex-start',

  paddingHorizontal: wp(2.5),
  paddingVertical: hp(0.5),

  borderWidth: wp(0.5),
  borderRadius: wp(1.2),

  marginBottom: hp(1.5),
},

  /* CATEGORY TEXT */
  categoryText: {
    color: '#fff',

    fontSize: fp(8),

    fontFamily: 'Pixel',
  },

  /* ENGINEERING */
engineeringTag: {
  borderColor:'#F5730C',

  backgroundColor:'#24153F',

  shadowColor:'#F5730C',
  shadowOpacity:.35,
  shadowRadius:wp(2),

  elevation:6,
},

  engineeringText: {
    color: '#F5730C',
  },

  /* ENVIRONMENT */
environmentTag: {
  borderColor: '#60BB3F',

  backgroundColor: '#1A2E16',

  shadowColor: '#60BB3F',
  shadowOpacity: 0.35,
  shadowRadius: wp(2),

  elevation: 6,
},

  environmentText: {
    color: '#60BB3F',
  },

  /* SCIENCE */
  scienceTag: {
    borderColor: '#59C8FF',
    backgroundColor: '#150F31',
    borderRadius: 4,
  },

  scienceText: {
    color: '#59C8FF',
  },

  /* TECHNOLOGY */
  technologyTag: {
    borderColor: '#D176FF',
    backgroundColor: '#150F31',
    borderRadius: 4,
  },

  technologyText: {
    color: '#D176FF',
    padding: 2,
  },

  /* BOTTOM */
bottomRow: {
  flexDirection: 'row',

  justifyContent: 'space-between',

  alignItems: 'center',

  marginTop: hp(1),

  columnGap: wp(4), // Space between stats and button
},

  /* STATS */
stats: {
  flexDirection: 'row',

  alignItems: 'center',


  gap: wp(1.2),
},

  /* STAT ITEM */
statItem: {
  flexDirection: 'row',
  alignItems: 'center',

  backgroundColor: '#1C103D',

  paddingHorizontal: wp(2.8),
  paddingVertical: hp(0.6),

  borderRadius: wp(4),
  gap:wp(1.2)
},


statIcon: {
  width: wp(3.8),
  height: wp(3.8),

  resizeMode: 'contain',
},

  /* EACH STAT */
  stat: {
    color: '#F2E7FF',

    fontSize: fp(16),

    fontFamily: 'PixelOperator',
  },

  /* EASY TEXT */
  easyText: {
    color: '#6DFF7A',
  },

  /* MEDIUM TEXT */
  mediumText: {
    color: '#FFB84D',
  },

  /* HARD TEXT */
  hardText: {
    color: '#FF5F5F',
  },

  /* EASY ICON */
  easyIcon: {
    tintColor: '#6DFF7A',
  },

  /* MEDIUM ICON */
  mediumIcon: {
    tintColor: '#FFB84D',
  },

  /* HARD ICON */
  hardIcon: {
    tintColor: '#FF5F5F',
  },

startBtn: {

  paddingHorizontal: wp(4.5),
  paddingVertical: hp(1.1),

  borderRadius: wp(1.4),

  minWidth: wp(22),

  alignItems: 'center',
  justifyContent: 'center',

  // ✨ Glow
  shadowColor: '#FF5CA8',
shadowOpacity: 0.8,
shadowRadius: wp(5),
  shadowOffset: {
    width: 0,
    height: hp(0.3),
  },

  elevation: 15,
},
  /* LOCKED BUTTON */
  lockedBtn: {
    backgroundColor: '#555',
  },

startText: {
  color: '#fff',

  fontFamily: 'Pixel',

  fontSize: fp(9),
},

});