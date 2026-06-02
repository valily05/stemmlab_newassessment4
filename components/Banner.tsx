import {
  Dimensions,
  Image,
  ImageBackground,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');
// responsive scale
const scale = (size: number) => {
  const baseWidth = 390;
  return PixelRatio.roundToNearestPixel((width / baseWidth) * size);
};
/* RESPONSIVE HELPERS */
const wp = (percentage: number) => {
  return PixelRatio.roundToNearestPixel(
    (width * percentage) / 100
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

export default function Banner() {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.container}
    >
      <ImageBackground
        source={require('../assets/images/image 112.png')}
        style={styles.bg}
        imageStyle={styles.bgImage}
      >

        {/* TROPHY LEFT */}
        <Image
          source={require('../assets/images/trophy.png')}
          style={styles.image}
        />

        {/* TEXT RIGHT */}
        <View style={styles.right}>

          <Text style={styles.title}>
            KEEP EXPLORING !
          </Text>

          <Text style={styles.desc}>
            Complete activities, earn points and level up your team!
          </Text>

        </View>

      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

container: {
  borderRadius: scale(12),

  overflow: 'visible',

  width: '112%',

  marginTop: rf(-16),

  shadowColor: '#8B5CF6',
  shadowOpacity: 0.35,
  shadowRadius: scale(14),

  shadowOffset: {
    width: 0,
    height: 0,
  },

  elevation: 12,
},
  bg: {
    width: '100%',

    height: scale(105),

    paddingHorizontal: scale(20),

    flexDirection: 'row',
    alignItems: 'center',

    gap: scale(14),
  },

  bgImage: {
    borderRadius: scale(12),

    resizeMode: 'stretch',
    
  },

  right: {
    flex: 1,

    justifyContent: 'center',
  },

  title: {
    color: '#FACC15',

    fontSize: scale(14),

    fontFamily: 'Pixel',

    marginBottom: scale(5),
  },

  desc: {
    color: '#E9D5FF',

    fontSize: scale(13),

    lineHeight: scale(15),

    fontFamily: 'PixelOperator',
    width:scale(220),
  },

  image: {
    width: scale(77),
    height: scale(77),
    right:scale(4),
    resizeMode: 'contain',

  },

});