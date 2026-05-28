// components/activity/ReferenceSetupCard.tsx

import {
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  View,
} from 'react-native';

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

interface Props {
  image: any;
}

export default function ReferenceSetupCard({
  image,
}: Props) {

  return (

    <View style={styles.container}>

      {/* FRAME */}
      <View style={styles.frame}>

        <Image
          source={image}
          style={styles.image}
        />

      </View>

      {/* CAPTION */}
      <View style={styles.captionRow}>

        <Text style={styles.captionArrow}>
          ▶
        </Text>

<Text style={styles.caption}>

  Make sure your setup is prepared
  to match the{' '}

  <Text style={styles.highlightText}>
    reference photo
  </Text>

  {' '}before starting the experiment.

</Text>

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  /* CONTAINER */
  container: {
    marginHorizontal: wp(3),

    marginTop: hp(3),
  },

  /* FRAME */
  frame: {
    width: '100%',

    height: hp(30),

    borderWidth: rf(3),


    borderRadius: rf(18),

    overflow: 'hidden',

    backgroundColor: '#0B001B',

    justifyContent: 'center',

    alignItems: 'center',
  },

  /* IMAGE */
  image: {
    width: '100%',

    height: '100%',

    resizeMode: 'contain',
  },

  /* CAPTION ROW */
  captionRow: {
    flexDirection: 'row',

    alignItems: 'flex-start',

    marginTop: hp(1.8),
  },

  /* CAPTION ARROW */
  captionArrow: {
    color: '#ED359D',

    fontFamily: 'PressStart2P',

    fontSize: rf(14),

    marginRight: wp(2),

    top: hp(0.2),
  },

  /* CAPTION */
  caption: {
    flex: 1,

    color: 'white',

    fontFamily: 'PixelOperator',

    fontSize: rf(14),

    lineHeight: rf(20),
  },

  /* HIGHLIGHT TEXT */
highlightText: {
  color: '#ED359D',

  fontFamily: 'PixelOperator',
},

});