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

            <Text style={styles.stat}>
              ⭐ {rating}
            </Text>

            <Text style={styles.stat}>
              ⏱ {duration}
            </Text>

            <Text style={styles.stat}>
              📊 {difficulty}
            </Text>

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
    marginTop: hp(2.2),

    padding: wp(3.5),

    borderRadius: wp(5),

    borderWidth: 2,
    borderColor: '#6A3CBC',

    backgroundColor: 'rgba(20, 10, 45, 0.95)',

    flexDirection: 'row',

    position: 'relative',
  },

  /* LOCKED CARD */
  lockedCard: {
    opacity: 0.55,
  },

  /* NEW BADGE */
  newBadge: {
    position: 'absolute',

    top: -hp(1),
    right: wp(4),

    backgroundColor: '#48F5D2',

    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),

    borderRadius: wp(2),

    zIndex: 99,
  },

  /* NEW TEXT */
  newText: {
    color: '#111',

    fontSize: fp(10),

    fontFamily: 'Pixel',

    letterSpacing: 1,
  },

  /* IMAGE */
  cardImage: {
    width: wp(22),
    height: wp(22),

    resizeMode: 'contain',
  },

  /* CONTENT */
  cardContent: {
    flex: 1,

    marginLeft: wp(3),
  },

  /* TITLE */
  cardTitle: {
    color: '#fff',

    fontSize: fp(13),

    fontFamily: 'Pixel',

    lineHeight: hp(2.2),
  },

  /* DESCRIPTION */
  cardDesc: {
    marginTop: hp(0.7),

    color: '#D7CCFF',

    fontSize: fp(10),

    lineHeight: hp(1.9),

    fontFamily: 'PixelOperator',
  },

  /* CATEGORY */
  category: {
    marginTop: hp(1),

    color: '#FFD54A',

    fontSize: fp(9),

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

  /* EACH STAT */
  stat: {
    color: '#F2E7FF',

    fontSize: fp(8.5),

    fontFamily: 'PixelOperator',
  },

  /* BUTTON */
  startBtn: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.8),

    borderRadius: wp(2.5),

    backgroundColor: '#FF5CA8',
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