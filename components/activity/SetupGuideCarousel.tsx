// components/activity/SetupGuideCarousel.tsx

import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

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
    PixelRatio.roundToNearestPixel(
      size * scale
    )
  );

};

interface Step {
  title: string;
  image?: any;
  instruction: string;
  bunnyTip?: string;
}

interface Props {
  steps: Step[];
  renderBottomComponent?: (index: number) => ReactNode;
}

export default function SetupGuideCarousel({
  steps,
  renderBottomComponent,
}: Props) {

  const [activeIndex, setActiveIndex] =
    useState(0);

  const [hasSwiped, setHasSwiped] =
    useState(false);

  const fadeAnim =
    useRef(
      new Animated.Value(1)
    ).current;

  useEffect(() => {

    if (hasSwiped) {
      return;
    }

    Animated.loop(

      Animated.sequence([

        Animated.timing(fadeAnim, {
          toValue: 0.2,
          duration: 730,
          useNativeDriver: true,
        }),

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 730,
          useNativeDriver: true,
        }),

      ])

    ).start();

  }, []);

  return (

    <View style={styles.container}>

      {/* TITLE SECTION */}
      <View style={styles.titleRow}>

        <Image
          source={require('../../assets/images/Group 220.png')}
          style={styles.titleIcon}
          resizeMode="contain"
        />

        <View style={styles.titleTextContainer}>

          <Text style={styles.title}>
            EXPERIMENT SETUP GUIDE
          </Text>

          <Text style={styles.subtitle}>
            Complete all setup steps before
            starting your experiment mission.
          </Text>

        </View>

      </View>

      {/* FRAME */}
      <View style={styles.frameWrapper}>

        {/* OUTER PIXEL CORNERS */}
        <View style={[styles.edgeBox, styles.topLeft]} />
        <View style={[styles.edgeBox, styles.topRight]} />
        <View style={[styles.edgeBox, styles.bottomLeft]} />
        <View style={[styles.edgeBox, styles.bottomRight]} />

        {/* INNER PIXEL DOTS */}
        <View
          style={[
            styles.innerBox,
            styles.innerTopLeft,
          ]}
        />

        <View
          style={[
            styles.innerBox,
            styles.innerTopRight,
          ]}
        />

        <View
          style={[
            styles.innerBox,
            styles.innerBottomLeft,
          ]}
        />

        <View
          style={[
            styles.innerBox,
            styles.innerBottomRight,
          ]}
        />

        {/* FRAME CIRCLE DOTS */}
        <View
          style={[
            styles.circleDot,
            styles.circleTopLeft,
          ]}
        />

        <View
          style={[
            styles.circleDot,
            styles.circleTopRight,
          ]}
        />

        <View
          style={[
            styles.circleDot,
            styles.circleBottomLeft,
          ]}
        />

        <View
          style={[
            styles.circleDot,
            styles.circleBottomRight,
          ]}
        />

        {/* CAROUSEL */}
        <FlatList
          horizontal
          pagingEnabled
          data={steps}
          showsHorizontalScrollIndicator={false}
          disableIntervalMomentum
          style={{width: width -wp(6)}}
          snapToAlignment='start'
          keyExtractor={(_, index) =>
            index.toString()
          }

          onMomentumScrollEnd={(event) => {

            const index = Math.round(
              event.nativeEvent.contentOffset.x /
              (width - wp(6))
            );

            setActiveIndex(index);

            setHasSwiped(true);

          }}

renderItem={({ item, index: stepIndex }) => {
            return (

        <View style={styles.card}>


  <Text style={styles.cardTitle}>
    {item.title}
  </Text>
{renderBottomComponent?.(stepIndex)}

{item.image && (
  <Image
    source={item.image}
    style={styles.image}
  />
)}
{/* INSTRUCTION */}
<View style={styles.instructionRow}>

  <Text style={styles.arrow}>
    ▶
  </Text>

  <Text style={styles.instruction}>
    {item.instruction}
  </Text>

</View>


{/* TIP */}
                {item.bunnyTip && (

                  <View style={styles.tipBox}>

                    {/* MIFFY */}
                    <Image
                      source={require('../../assets/images/Group 221.png')}
                      style={styles.miffy}
                      resizeMode="contain"
                    />

                    <View style={styles.tipTitleRow}>

                      <Text style={styles.tipStar}>
                        ★
                      </Text>

                      <Text style={styles.tipTitle}>
                        BUNNY TIP
                      </Text>

                    </View>

                    <Text style={styles.tipText}>
                      {item.bunnyTip}
                    </Text>

                  </View>

                )}

              </View>

            );

          }}
        />

        {/* PAGINATION */}
        <View style={styles.pagination}>

          {steps.map((_, index) => {

            const isActive =
              activeIndex === index;

            return (

              <View
                key={index}
                style={[
                  styles.paginationDot,

                  isActive &&
                  styles.activeDot,
                ]}
              >

                {isActive && (

                  <Text style={styles.activeStar}>
                    ✦
                  </Text>

                )}

              </View>

            );

          })}

        </View>

        {/* SWIPE HINT */}
        {!hasSwiped && (

          <Animated.View
            style={[
              styles.swipeHintRow,
              {
                opacity: fadeAnim,
              },
            ]}
          >

            <Text style={styles.swipeHint}>
              swipe to continue
            </Text>

            <Text style={styles.swipeArrow}>
              →
            </Text>

          </Animated.View>

        )}

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  /* CONTAINER */
  container: {
    marginTop: hp(5),
  },

  /* TITLE ROW */
  titleRow: {
    flexDirection: 'row',

    alignItems: 'flex-start',

    paddingHorizontal: wp(5),

    marginBottom: hp(2.5),
  },

  /* TITLE ICON */
  titleIcon: {
    width: wp(14),

    height: wp(14),

    marginRight: wp(4),
  },

  /* TITLE TEXT CONTAINER */
  titleTextContainer: {
    flex: 1,
  },

  /* TITLE */
  title: {
    color: 'white',

    fontFamily: 'Pixel',

    fontSize: rf(12),

    width: wp(90),
  },

  /* SUBTITLE */
  subtitle: {
    color: 'white',

    fontFamily: 'PixelOperator',

    fontSize: rf(17),

    marginTop: hp(0.9),

    lineHeight: hp(2),
  },

  /* FRAME */
frameWrapper: {
  width: width - wp(6),
  alignSelf: "center",
  borderWidth: wp(1.4),
  borderColor: "#5711BE",
  backgroundColor: "#150F31",
  paddingTop: hp(2),
  paddingBottom: hp(3),

},

  /* OUTER PIXEL CORNERS */
  edgeBox: {
    width: wp(2),

    height: wp(2),

    backgroundColor: '#04061B',

    borderWidth: wp(0.5),

    borderColor: '#04061B',

    position: 'absolute',

    zIndex: 50,
  },

  /* INNER PIXEL DOT */
  innerBox: {
    width: wp(1.6),

    height: wp(1.6),

    backgroundColor: '#5711BE',

    position: 'absolute',

    zIndex: 60,
  },

  /* FRAME CIRCLE DOT */
  circleDot: {
    width: wp(1.2),

    height: wp(1.2),

    borderRadius: wp(5),

    backgroundColor: '#5711BE',

    position: 'absolute',

    zIndex: 70,
  },

  /* OUTER CORNERS */
  topLeft: {
    top: -wp(2),

    left: -wp(2),
  },

  topRight: {
    top: -wp(2),

    right: -wp(2),
  },

  bottomLeft: {
    bottom: -wp(2),

    left: -wp(2),
  },

  bottomRight: {
    bottom: -wp(2),

    right: -wp(2),
  },

  /* INNER PIXEL POSITIONS */
  innerTopLeft: {
    top: wp(0),

    left: wp(0),
  },

  innerTopRight: {
    top: wp(0),

    right: wp(0),
  },

  innerBottomLeft: {
    bottom: wp(0),

    left: wp(0),
  },

  innerBottomRight: {
    bottom: wp(0),

    right: wp(0),
  },

  /* CIRCLE POSITIONS */
  circleTopLeft: {
    top: hp(1.2),

    left: wp(1.8),
  },

  circleTopRight: {
    top: hp(1.2),

    right: wp(1.8),
  },

  circleBottomLeft: {
    bottom: hp(1.2),

    left: wp(1.8),
  },

  circleBottomRight: {
    bottom: hp(1.2),

    right: wp(1.8),
  },

  /* CARD */
card: {
  width: width - wp(6),
  paddingHorizontal: wp(5),
},
  /* CARD TITLE */
  cardTitle: {
    color: '#F8EC4D',

    fontFamily: 'Pixel',

    textAlign: 'center',

    fontSize: rf(12.5),

    lineHeight: hp(3),
  },

  /* IMAGE */
  image: {
    width: '100%',

    height: hp(28),

    resizeMode: 'contain',

    marginVertical: hp(2.2),
  },

  /* INSTRUCTION ROW */
  instructionRow: {
    flexDirection: 'row',

    alignItems: 'flex-start',

    marginTop: hp(0.5),
  },

  /* ARROW */
  arrow: {
    color: '#ED359D',

    fontFamily: 'PressStart2P',

    fontSize: rf(17),

    marginRight: wp(2),

    bottom: wp(0.5),
  },

  /* INSTRUCTION */
  instruction: {
    flex: 1,

    color: 'white',

    fontFamily: 'PixelOperator',

    fontSize: rf(16),
  },

  /* TIP BOX */
  tipBox: {
    borderWidth: wp(0.5),

    borderStyle: 'dashed',

    borderColor: '#FF4FB4',

    borderRadius: wp(3),

    padding: wp(4),

    marginTop: hp(2.5),
  },

  /* MIFFY */
  miffy: {
    width: wp(15),

    height: wp(15),

    position: 'absolute',

    right: -wp(3),

    top: hp(1),

    zIndex: 100,
  },

  /* TIP TITLE ROW */
  tipTitleRow: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  /* TIP STAR */
  tipStar: {
    color: '#F8EC4D',

    fontFamily: 'Pixel',

    fontSize: rf(19),

    marginRight: wp(1.5),
  },

  /* TIP TITLE */
  tipTitle: {
    color: '#FBF479',

    fontFamily: 'Pixel',

    fontSize: rf(12),
  },

  /* TIP TEXT */
  tipText: {
    color: 'white',

    fontFamily: 'PixelOperator',

    fontSize: rf(14),

    lineHeight: hp(1.8),

    marginTop: hp(0.2),
  },

  /* PAGINATION */
  pagination: {
    flexDirection: 'row',

    justifyContent: 'center',

    alignItems: 'center',

    marginTop: hp(2.5),

    gap: wp(3),
  },

  /* PAGINATION DOT */
  paginationDot: {
    width: wp(6),

    height: wp(6),

    borderRadius: wp(10),

    borderWidth: wp(0.7),

    borderColor: '#5711BE',

    backgroundColor: '#2D0B4C',

    justifyContent: 'center',

    alignItems: 'center',
  },

  /* ACTIVE DOT */
  activeDot: {
    backgroundColor: '#ED359D',

    borderColor: '#F94CE7',
  },

  /* ACTIVE STAR */
  activeStar: {
    color: 'white',

    fontSize: rf(14),

    fontFamily: 'Pixel',

    textShadowColor: '#FFFFFF',

    textShadowOffset: {
      width: 0,
      height: 0,
    },

    textShadowRadius: wp(0.5),
  },

  /* SWIPE HINT ROW */
  swipeHintRow: {
    flexDirection: 'row',

    justifyContent: 'center',

    alignItems: 'center',

    marginTop: hp(2),
  },

  /* SWIPE HINT */
  swipeHint: {
    color: '#8D73D6',

    fontFamily: 'PixelOperator',

    fontSize: rf(17),

  },

  /* SWIPE ARROW */
  swipeArrow: {
    color: '#8D73D6',

    fontFamily: 'Pixel',

    fontSize: rf(12),

    marginLeft: wp(2),

  },

});