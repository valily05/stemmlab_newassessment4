import {
  ActivityIndicator,
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

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
    PixelRatio.roundToNearestPixel(
      size * scale
    )
  );
};
interface Props {
  activityNumber: number;
  title: string;
  objective: string;
  attempt?: number;
}

export default function ActivityIntroScreen({
  activityNumber,
  title,
  objective,
  attempt = 1,
}: Props) {
  return (
    <View style={styles.container}>

      {/* BACKGROUND */}
      <Image
        source={require('../../assets/images/activity-bg.png')}
        style={styles.background}
      />

      {/* HEADER */}
      <View style={styles.header}>

        <Text style={styles.activityNumber}>
          ACTIVITY #{activityNumber}
        </Text>

        <Text style={styles.title}>
          {title}
        </Text>

        {/* ATTEMPT BADGE */}
        <View style={styles.attemptBadge}>
          <Text style={styles.attemptText}>
            ATTEMPT : {attempt}
          </Text>
        </View>

      </View>

      {/* SPEECH BUBBLE */}
      <View style={styles.speechBubbleContainer}>

        <Image
          source={require('../../assets/images/Group 14.png')}
          style={styles.speechBubble}
        />

        <View style={styles.speechContent}>

          <Text style={styles.objectiveTitle}>
            Activity Objective :
          </Text>

          <Text style={styles.objectiveText}>
            {objective}
          </Text>

        </View>

      </View>

      {/* CHARACTER */}
      <Image
        source={require('../../assets/images/miffy-scientist.png')}
        style={styles.character}
      />

      {/* LOADING */}
      <View style={styles.loadingContainer}>

        <ActivityIndicator
          size="large"
          color="#FFFFFF"
        />

        <Text style={styles.loadingText}>
          LOADING ACTIVITY...
        </Text>

      </View>

    </View>
  );
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#04061B',
  },

  background: {
    position: 'absolute',

    width: '100%',
    height: '100%',

    resizeMode: 'cover',
  },

  /* HEADER */
  header: {
    paddingHorizontal: wp(6),

    marginTop: hp(8),
  },

  activityNumber: {
    color: '#FFD94E',

    fontSize: rf(22),

    fontWeight: '900',

    letterSpacing: rf(1),
  },

  title: {
    color: '#FFFFFF',

    fontSize: rf(30),

    fontWeight: '900',

    lineHeight: rf(34),

    width: wp(65),

    marginTop: hp(1),
  },

  /* ATTEMPT */
  attemptBadge: {
    marginTop: hp(1.5),

    alignSelf: 'flex-start',
  },

  attemptText: {
    color: '#FFFFFF',

    fontSize: rf(18),

    fontWeight: '700',
  },

  /* SPEECH BUBBLE */
  speechBubbleContainer: {
    marginTop: hp(5),

    alignItems: 'center',

    position: 'relative',
  },

  speechBubble: {
    width: wp(90),

    height: wp(55),

    resizeMode: 'contain',
  },

  speechContent: {
    position: 'absolute',

    width: wp(58),

    top: hp(2.7),

    alignItems: 'center',
  },

  objectiveTitle: {
    color: '#4D7FFF',

    fontSize: rf(18),

    fontWeight: '700',

    marginBottom: hp(1),
  },

  objectiveText: {
    color: '#111111',

    textAlign: 'center',

    fontSize: rf(20),

    fontWeight: '700',

    lineHeight: rf(30),
  },

  /* CHARACTER */
  character: {
    width: wp(115),

    height: wp(115),

    resizeMode: 'contain',

    position: 'absolute',

    right: wp(-8),

    bottom: hp(-2),
  },

  /* LOADING */
  loadingContainer: {
    position: 'absolute',

    bottom: hp(5),

    alignSelf: 'center',

    alignItems: 'center',
  },

  loadingText: {
    marginTop: hp(1),

    color: '#FFFFFF',

    fontSize: rf(18),

    fontWeight: '700',

    letterSpacing: rf(1),
  },

});