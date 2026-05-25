// components/activity/ReferenceSetupCard.tsx

import {
    Dimensions,
    Image,
    PixelRatio,
    ScrollView,
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

      {/* FIXED BORDER */}
      <View style={styles.frame}>

        {/* ONLY IMAGE MOVES */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >

          <Image
            source={image}
            style={styles.image}
          />

        </ScrollView>

      </View>

      {/* CAPTION */}
      <Text style={styles.caption}>

        ▶ Make sure your setup is prepared
        to match the reference photo before
        starting the experiment.

      </Text>

    </View>

  );

}

const styles = StyleSheet.create({

  /* CONTAINER */
  container: {
    marginHorizontal: wp(4.5),

    marginTop: hp(3.5),
  },

  /* FIXED FRAME */
  frame: {
    width: '100%',

    height: hp(42),

    borderWidth: rf(3),

    borderColor: '#8B52FF',

    borderRadius: rf(18),

    overflow: 'hidden',

    backgroundColor: '#120023',
  },

  /* IMAGE */
  image: {
    width: width - wp(9),

    height: hp(42),

    resizeMode: 'cover',
  },

  /* CAPTION */
  caption: {
    marginTop: hp(1.8),

    color: 'white',

    fontFamily: 'PixeloidSans',

    fontSize: rf(11),

    lineHeight: rf(20),
  },

});