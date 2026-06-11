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
  return PixelRatio.roundToNearestPixel((width * percentage) / 100);
};

const hp = (percentage: number) => {
  return PixelRatio.roundToNearestPixel((height * percentage) / 100);
};

const fp = (size: number) => {
  return PixelRatio.roundToNearestPixel((width / 430) * size);
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
  const type = category.toUpperCase();

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
        colors={theme.activityCardGradient as [string, string, ...string[]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* OUTER PIXEL BLOCKS */}
      <View style={[styles.topBlock, { backgroundColor: theme.activityBorder }]} />
      <View style={[styles.bottomBlock, { backgroundColor: theme.activityBorder }]} />
      <View style={[styles.leftBlock, { backgroundColor: theme.activityBorder }]} />
      <View style={[styles.rightBlock, { backgroundColor: theme.activityBorder }]} />

      {/* INNER CUT BLOCKS */}
      <View style={[styles.topInnerBlock, { backgroundColor: theme.activityCard }]} />
      <View style={[styles.bottomInnerBlock, { backgroundColor: theme.activityCard }]} />
      <View style={[styles.topInnerBlockk, { backgroundColor: theme.activityCard }]} />
      <View style={[styles.bottomInnerBlockk, { backgroundColor: theme.activityCard }]} />

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
        <Text style={[styles.cardTitle, { color: theme.activityTitle }]}>
          {title}
        </Text>

        {/* DESCRIPTION */}
        <Text style={[styles.cardDesc, { color: theme.activityDescription }]}>
          {description}
        </Text>

        {/* CATEGORY TAG */}
        <View
          style={[
            styles.categoryTag,
            {
              borderColor:
                type === "ENGINEERING"
                  ? theme.engineeringBorder
                  : type === "ENVIRONMENT"
                  ? theme.environmentBorder
                  : type === "SCIENCE"
                  ? theme.scienceBorder
                  : theme.technologyBorder,
              backgroundColor:
                type === "ENGINEERING"
                  ? theme.engineeringBackground
                  : type === "ENVIRONMENT"
                  ? theme.environmentBackground
                  : type === "SCIENCE"
                  ? theme.scienceBackground
                  : theme.technologyBackground,
            },
          ]}
        >
          <Text
            style={[
              styles.categoryText,
              category.toLowerCase() === 'engineering' && styles.engineeringText,
              category.toLowerCase() === 'environment' && styles.environmentText,
              category.toLowerCase() === 'science' && styles.scienceText,
              category.toLowerCase() === 'technology' && styles.technologyText,
            ]}
          >
            {category}
          </Text>
        </View>

        {/* BOTTOM */}
        <View style={styles.bottomRow}>
          <View style={styles.stats}>
            {/* RATING */}
            <View style={[styles.statItem, { backgroundColor: theme.activityStatBackground }]}>
              <Image source={require('../assets/images/star.png')} style={styles.statIcon} />
              <Text style={[styles.stat, { color: theme.activityStatText }]} numberOfLines={1}>
                {rating}
              </Text>
            </View>

            {/* DURATION */}
            <View style={[styles.statItem, { backgroundColor: theme.activityStatBackground }]}>
              <Image source={require('../assets/images/time.png')} style={styles.statIcon} />
              <Text style={[styles.stat, { color: theme.activityStatText }]}>
                {duration}
              </Text>
            </View>

            {/* DIFFICULTY */}
            <View style={[styles.statItem, { backgroundColor: theme.activityStatBackground }]}> 
              <Image
                source={require('../assets/images/chart.png')}
                style={[
                  styles.statIcon,
                  {
                    tintColor:
                      difficulty === "Easy"
                        ? theme.activityEasyIcon
                        : difficulty === "Medium"
                        ? theme.activityMediumIcon
                        : difficulty === "Hard"
                        ? theme.activityHardIcon
                        : undefined,
                  },
                ]}
              />
              <Text
                style={[
                  styles.stat,
                  {
                    color:
                      difficulty === "Easy"
                        ? theme.activityEasy
                        : difficulty === "Medium"
                        ? theme.activityMedium
                        : difficulty === "Hard"
                        ? theme.activityHard
                        : theme.activityStatText,
                  },
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
            style={{ marginLeft: wp(5) }}
          >
            <LinearGradient
              colors={
                locked
                  ? (theme.activityButtonDisabledGradient as [string, string, ...string[]])
                  : (theme.activityButtonGradient as [string, string, ...string[]])
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[
                styles.startBtn,
                {
                  shadowColor: theme.activityButtonShadow,
                  paddingHorizontal: 0,
                },
              ]}
            >
              <Text style={[styles.startText, { color: theme.activityButtonText }]}>
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
  card: {
    marginTop: hp(2),
    borderWidth: wp(0.7),
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(2),
    position: 'relative',
    overflow: 'visible',
    shadowOpacity: 0.18,
    shadowRadius: wp(3),
    shadowOffset: {
      width: 0,
      height: hp(0.6),
    },
    elevation: 8,
  },
  lockedCard: {
    opacity: 0.55,
  },
  topBlock: {
    position: 'absolute',
    top: -2,
    right: '0%',
    width: wp(1.4),
    height: wp(1.4),
  },
  bottomBlock: {
    position: 'absolute',
    bottom: -2,
    left: '0%',
    width: wp(1.4),
    height: wp(1.4),
  },
  leftBlock: {
    position: 'absolute',
    left: -2,
    top: '0%',
    width: wp(1.4),
    height: wp(1.4),
  },
  rightBlock: {
    position: 'absolute',
    right: -2,
    bottom: '0%',
    width: wp(1.4),
    height: 7,
  },
  topInnerBlock: {
    position: 'absolute',
    top: -4,
    left: '-2%',
    width: 7,
    height: 7,
    zIndex: 5,
  },
  bottomInnerBlock: {
    position: 'absolute',
    bottom: -4,
    right: '-2%',
    width: 7,
    height: 7,
    zIndex: 5,
  },
  topInnerBlockk: {
    position: 'absolute',
    top: -4,
    right: '-2%',
    width: 7,
    height: 7,
    zIndex: 5,
  },
  bottomInnerBlockk: {
    position: 'absolute',
    bottom: -4,
    left: '-2%',
    width: 7,
    height: 7,
    zIndex: 5,
  },
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
  cardContent: {
    width: '100%',
  },
  cardTitle: {
    fontFamily: 'Pixel',
    fontSize: fp(13),
    lineHeight: hp(2.8),
    marginBottom: hp(0.8),
    letterSpacing: 1,
    maxWidth: '100%',
  },
  cardDesc: {
    fontFamily: 'PixelOperator',
    fontSize: fp(15),
    lineHeight: hp(2),
    marginBottom: hp(1.8),
  },
  categoryTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.5),
    borderWidth: wp(0.5),
    borderRadius: wp(1.2),
    marginBottom: hp(1.5),
  },
  categoryText: {
    fontSize: fp(8),
    fontFamily: 'Pixel',
  },
  engineeringText: {
    color: '#F5730C',
  },
  environmentText: {
    color: '#60BB3F',
  },
  scienceText: {
    color: '#59C8FF',
  },
  technologyText: {
    color: '#D176FF',
    padding: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1),
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(2.6),
    paddingVertical: hp(0.6),
    borderRadius: wp(4),
    gap: wp(1),
    alignSelf: 'flex-start',
  },
  statIcon: {
    width: wp(3.8),
    height: wp(3.8),
    resizeMode: 'contain',
  },
  stat: {
    fontSize: fp(16),
    fontFamily: 'PixelOperator',
  },
startBtn: {
  width: wp(25),
  height: hp(3.2),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: wp(1.4),
  shadowOpacity: 0.8,
  shadowRadius: wp(5),
  shadowOffset: {
    width: 0,
    height: hp(0.3),
  },
  elevation: 15,
},
startText: {
  fontFamily: 'Pixel',
  fontSize: fp(12),
  textAlign: 'center',
  includeFontPadding: false,
  width: '100%',
  // Removed the negative margin to allow perfect vertical centering
},
});