import { useState } from 'react';

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
  image: any;
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
  image,
  isNew,
  locked,
  onPress,
}: Props) {

  const [saved, setSaved] = useState(false);

  return (

    <View
      style={[
        styles.card,
        locked && styles.lockedCard,
      ]}
    >

      {/* OUTER PIXEL BLOCKS */}
      <View style={styles.topBlock} />
      <View style={styles.bottomBlock} />

      <View style={styles.leftBlock} />
      <View style={styles.rightBlock} />

      {/* INNER CUT BLOCKS */}
      <View style={styles.topInnerBlock} />
      <View style={styles.bottomInnerBlock} />

      <View style={styles.topInnerBlockk} />
      <View style={styles.bottomInnerBlockk} />

      {/* NEW BADGE OR BOOKMARK */}
      {isNew && !locked ? (

        <Image
          source={require('../assets/images/new-badge.png')}
          style={styles.newBadgeImage}
        />

      ) : (

        !locked && (
          <TouchableOpacity
            style={styles.bookmarkBtn}
            onPress={() => setSaved(!saved)}
          >

            <Image
              source={
                saved
                  ? require('../assets/images/bookmark.png')
                  : require('../assets/images/bookmark-outline.png')
              }
              style={styles.bookmarkImage}
            />

          </TouchableOpacity>
        )

      )}

      {/* IMAGE */}
      <Image
        source={image}
        style={styles.cardImage}
      />

      {/* CONTENT */}
      <View style={styles.cardContent}>

        {/* TITLE */}
        <Text style={styles.cardTitle}>
          {title}
        </Text>

        {/* DESCRIPTION */}
        <Text style={styles.cardDesc}>
          {description}
        </Text>

        {/* CATEGORY TAG */}
        <View
          style={[
            styles.categoryTag,

            category.toLowerCase() === 'engineering' &&
              styles.engineeringTag,

            category.toLowerCase() === 'environment' &&
              styles.environmentTag,

            category.toLowerCase() === 'science' &&
              styles.scienceTag,

            category.toLowerCase() === 'technology' &&
              styles.technologyTag,
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
            <View style={styles.statItem}>
              <Image
                source={require('../assets/images/star.png')}
                style={styles.statIcon}
              />

              <Text style={styles.stat}>
                {rating}
              </Text>
            </View>

            {/* DIVIDER */}
            <View style={styles.statDivider} />

            {/* DURATION */}
            <View style={styles.statItem}>
              <Image
                source={require('../assets/images/time.png')}
                style={styles.statIcon}
              />

              <Text style={styles.stat}>
                {duration}
              </Text>
            </View>

            {/* DIVIDER */}
            <View style={styles.statDivider} />

            {/* DIFFICULTY */}
            <View style={styles.statItem}>

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

                  difficulty === 'Easy' && styles.easyText,
                  difficulty === 'Medium' && styles.mediumText,
                  difficulty === 'Hard' && styles.hardText,
                ]}
              >
                {difficulty}
              </Text>

            </View>

          </View>

          {/* BUTTON */}
       <TouchableOpacity
  style={[
    styles.startBtn,
    locked && styles.lockedBtn,
  ]}
  onPress={onPress}
  disabled={locked}
>

            <Text style={styles.startText}>
              {buttonText}
            </Text>

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

    borderWidth: 3,
    borderColor: '#7B4DFF',

    padding: wp(4),

    flexDirection: 'row',

    position: 'relative',

    overflow: 'visible',
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

    width: 6,
    height: 6,

    backgroundColor: '#7B4DFF',
  },

  bottomBlock: {
    position: 'absolute',

    bottom: -2,

    left: '0%',

    width: 6,
    height: 6,

    backgroundColor: '#7B4DFF',
  },

  leftBlock: {
    position: 'absolute',

    left: -2,

    top: '0%',

    width: 6,
    height: 6,

    backgroundColor: '#7B4DFF',
  },

  rightBlock: {
    position: 'absolute',

    right: -2,

    bottom: '0%',

    width: 6,
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

    top: -hp(1.3),
    right: wp(2.8),

    width: wp(14),
    height: hp(3),

    resizeMode: 'contain',

    zIndex: 100,
  },

  /* BOOKMARK */
  bookmarkBtn: {
    position: 'absolute',

    top: hp(1.2),
    right: wp(3),

    zIndex: 99,

    alignItems: 'center',
  },

  /* BOOKMARK IMAGE */
  bookmarkImage: {
    width: wp(5.5),
    height: wp(5.5),

    resizeMode: 'contain',
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
    flex: 1,
    right: 3,
  },

  /* TITLE */
  cardTitle: {
    color: '#fff',
    fontSize: fp(10),
    fontFamily: 'Pixel',
    lineHeight: hp(2.4),
    maxWidth: '92%',
  },

  /* DESCRIPTION */
  cardDesc: {
    marginTop: hp(0.7),
    color: '#D7CCFF',
    fontSize: fp(14),
    lineHeight: hp(1.9),
    fontFamily: 'PixelOperator',
  },

  /* CATEGORY TAG */
  categoryTag: {
    marginTop: hp(1),

    alignSelf: 'flex-start',

    paddingHorizontal: wp(1.2),
    paddingVertical: hp(0.6),

    borderWidth: 2,

    backgroundColor: '#1A1035',
  },

  /* CATEGORY TEXT */
  categoryText: {
    color: '#fff',

    fontSize: fp(8),

    fontFamily: 'Pixel',
  },

  /* ENGINEERING */
  engineeringTag: {
    borderColor: '#F5730C',
    backgroundColor: '#150F31',
    borderRadius: 4,
  },

  engineeringText: {
    color: '#F5730C',
  },

  /* ENVIRONMENT */
  environmentTag: {
    borderColor: '#60BB3F',
    backgroundColor: '#150F31',
    borderRadius: 4,
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
    marginTop: hp(1.5),

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  /* STATS */
  stats: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: wp(1),
  },

  /* STAT ITEM */
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },

  /* STAT DIVIDER */
  statDivider: {
    width: 1,

    height: hp(1.6),

    backgroundColor: '#FFFF',

    marginHorizontal: wp(0.8),

    alignSelf: 'center',

    opacity: 1,
  },

  /* STAT ICON */
  statIcon: {
    width: wp(3.5),
    height: wp(3.5),
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

  /* BUTTON */
  startBtn: {
    backgroundColor: '#FF5CA8',

    paddingHorizontal: wp(3),
    paddingVertical: hp(0.9),

    borderRadius: 5,

    left: 7,

    alignItems: 'center',
    justifyContent: 'center',
  },

  /* LOCKED BUTTON */
  lockedBtn: {
    backgroundColor: '#555',
  },

  /* BUTTON TEXT */
  startText: {
    color: '#fff',

    fontSize: fp(9),

    fontFamily: 'Pixel',
  },

});