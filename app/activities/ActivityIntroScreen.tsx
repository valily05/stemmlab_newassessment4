import {
  router,
  useLocalSearchParams
} from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  Animated,
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

export default function ActivityIntroScreen() {

const {
  activityNumber,
  title,
  objective,
  nextScreen,
} = useLocalSearchParams();
  const blinkAnim = useRef(
    new Animated.Value(1)
  ).current;
useEffect(() => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(blinkAnim, {
        toValue: 0.3,
        duration: 900,
        useNativeDriver: true,
      }),

      Animated.timing(blinkAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
    ])
  ).start();

  const timer = setTimeout(() => {
    if (nextScreen) {
router.replace(
  nextScreen as any
);
    }
  }, 7000);

  return () => {
    clearTimeout(timer);
  };
}, [nextScreen]);

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
      </View>

      {/* SPEECH BUBBLE */}
      <View style={styles.speechBubbleContainer}>
        <Image
          source={require('../../assets/images/Group 14.png')}
          style={styles.speechBubble}
        />

        <View style={styles.speechContent}>
          <Text
            style={styles.objectiveTitle}
            numberOfLines={1}
          >
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

      {/* BLINKING LOADING TEXT */}
      <View style={styles.loadingContainer}>
        <Animated.Text
          style={[
            styles.loadingText,
            {
              opacity: blinkAnim,
            },
          ]}
        >
          SETTING UP EXPERIMENT...
        </Animated.Text>
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
    marginTop: hp(10),
  },

activityNumber: {
  color: '#FFD94E',
  fontSize: rf(25),
  fontFamily: 'Pixel',
  marginBottom:rf(10),

},

title: {
  color: '#FFFFFF',
  fontSize: rf(19),
  lineHeight: rf(34),
  width: wp(78),
  marginTop: hp(1),
  fontFamily: 'Pixel',


},
  /* SPEECH BUBBLE */
  speechBubbleContainer: {
    marginTop: hp(12),
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
    width: wp(85),
    top: hp(5),
    alignItems: 'center',
  },

  objectiveTitle: {
    color: '#4D7FFF',
    fontSize: rf(30),
    fontFamily: 'PixelBold',
    marginLeft:hp(3),
    marginTop:hp(-2),
  },

  objectiveText: {
    color: '#111111',
    textAlign: 'center',
    fontSize: rf(25),
    width: wp(67),
    fontFamily:'PixelOperator',
    marginLeft:rf(9),
    marginTop:rf(4)
  },

  /* CHARACTER */
  character: {
    width: wp(125),
    height: wp(125),
    resizeMode: 'contain',
    position: 'absolute',
    right: wp(-1),
    bottom: hp(-2),
  },

  /* LOADING */
  loadingContainer: {
    position: 'absolute',
    bottom: hp(3),
    alignSelf: 'center',
    alignItems: 'center',
  },

  loadingText: {
    color: '#FFFFFF',
    fontSize: rf(20),
    fontFamily: 'PixelOperator',
    letterSpacing: rf(1),
  },
});