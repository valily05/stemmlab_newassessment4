import {
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function Banner() {

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.container}
    >

      {/* BACKGROUND */}
      <ImageBackground
        source={require('../assets/images/image 112.png')}
        style={styles.bg}
        imageStyle={styles.bgImage}
      >

        {/* LEFT */}
        <View style={styles.left}>

          <Text style={styles.title}>
            KEEP EXPLORING !
          </Text>

          <Text style={styles.desc}>
            Complete activities, earn points and level up your team!
          </Text>


        </View>

        {/* RIGHT */}
        <Image
          source={require('../assets/images/trophy.png')}
          style={styles.image}
        />

      </ImageBackground>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

container: {
  marginTop: 20,

  borderRadius: 22,

  overflow: 'hidden',
},

bg: {
  width: '100%',

  height: 92,

  paddingHorizontal: 18,

  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},

bgImage: {
  borderRadius: 22,

  resizeMode: 'stretch',
},

left: {
  flex: 1,

  justifyContent: 'center',
},

title: {
  color: '#FACC15',

  fontSize: 15,

  fontFamily: 'Pixel',

  marginBottom: 4,
},

desc: {
  color: '#E9D5FF',

  fontSize: 10,

  lineHeight: 15,

  fontFamily: 'PixelOperator',

  width: 160,
},

image: {
  width: 72,
  height: 72,

  resizeMode: 'contain',
},

});