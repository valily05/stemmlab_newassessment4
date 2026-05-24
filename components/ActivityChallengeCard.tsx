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
}: Props) {

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

      {/* NEW BADGE */}
      {isNew && (

        <View style={styles.newBadge}>

          <Text style={styles.newText}>
            NEW
          </Text>

        </View>

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

        {/* CATEGORY */}
        <Text style={styles.category}>
          {category}
        </Text>

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

  /* NEW BADGE */
  newBadge: {
    position: 'absolute',
    top: -hp(1),
    right: wp(4),
    backgroundColor: '#48F5D2',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    zIndex: 99,
  },

  /* NEW TEXT */
  newText: {
    color: '#111',
    fontSize: fp(10),
    fontFamily: 'Pixel',
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

  /* CATEGORY */
  category: {
    marginTop: hp(1),

    color: '#FFD54A',

    fontSize: fp(8),

    fontFamily: 'Pixel',
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

    gap: wp(2),
  },

  /* STAT ITEM */
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1),
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

    fontSize: fp(15),

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

    paddingHorizontal: wp(5),
    paddingVertical: hp(0.9),

    borderRadius: 5,

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

    fontSize: fp(10),

    fontFamily: 'Pixel',
  },

});