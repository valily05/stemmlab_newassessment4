// components/common/PixelDivider.tsx

import {
    Dimensions,
    PixelRatio,
    StyleSheet,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

/* RESPONSIVE HELPERS */
const wp = (percentage: number) => {

  return PixelRatio.roundToNearestPixel(
    (width * percentage) / 100
  );

};

export default function PixelDivider() {

  return (

    <View style={styles.container}>

      {/* LEFT LINE */}
      <View style={styles.line} />

      {/* CENTER SYMBOL */}
      <View style={styles.symbolWrapper}>       

        {/* LEFT BLOCK */}
        <View
          style={[
            styles.block,
            styles.leftBlock,
          ]}
        />

        {/* CENTER BLOCK */}
        <View
          style={[
            styles.block,
            styles.centerBlock,
          ]}
        />

        {/* RIGHT BLOCK */}
        <View
          style={[
            styles.block,
            styles.rightBlock,
          ]}
        />

        {/* BOTTOM BLOCK */}
        <View
          style={[
            styles.block,
            styles.bottomBlock,
          ]}
        />

        {/* TOP LEFT CIRCLE */}
        <View
          style={[
            styles.circle,
            styles.topLeftCircle,
          ]}
        />

        {/* TOP RIGHT CIRCLE */}
        <View
          style={[
            styles.circle,
            styles.topRightCircle,
          ]}
        />

        {/* BOTTOM LEFT CIRCLE */}
        <View
          style={[
            styles.circle,
            styles.bottomLeftCircle,
          ]}
        />

        {/* BOTTOM RIGHT CIRCLE */}
        <View
          style={[
            styles.circle,
            styles.bottomRightCircle,
          ]}
        />

      </View>

      {/* RIGHT LINE */}
      <View style={styles.line} />

    </View>

  );

}

const styles = StyleSheet.create({

  /* CONTAINER */
  container: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    marginVertical: wp(7),

    marginBottom:-wp(2)
  },

  /* LINE */
line: {
  width: wp(42),

  height: wp(0.7),

  backgroundColor: '#ED359D',
},
  /* SYMBOL WRAPPER */
/* SYMBOL WRAPPER */
symbolWrapper: {
  width: wp(5.5),

  height: wp(5.5),

  marginHorizontal: wp(0.8),

  position: 'relative',
},

/* BLOCK */
block: {
  width: wp(1.2),

  height: wp(1.2),

  backgroundColor: '#ED5A9D',

  position: 'absolute',
},

/* CENTER BLOCK */
centerBlock: {
  top: wp(0.8),

  left: wp(2.15),
},

/* LEFT BLOCK */
leftBlock: {
  top: wp(2.15),

  left: wp(0.8),
},

/* RIGHT BLOCK */
rightBlock: {
  top: wp(2.15),

  right: wp(0.8),
},

/* BOTTOM BLOCK */
bottomBlock: {
  bottom: wp(0.8),

  left: wp(2.15),
},

/* CIRCLE */
circle: {
  width: wp(1),

  height: wp(1),

  borderRadius: wp(5),

  backgroundColor: '#ED5A9D',

  position: 'absolute',
},

/* CORNER CIRCLES */
topLeftCircle: {
  top: 1.3,

  left: 1,
},

topRightCircle: {
  top: 1.3,

  right: 1,
},

bottomLeftCircle: {
  bottom: 1.3,

  left: 1,
},

bottomRightCircle: {
  bottom: 1.3,

  right: 1,
},
});