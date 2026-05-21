
import {
    Image,
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

      {/* LEFT */}
      <View style={styles.left}>

        <Text style={styles.title}>
          KEEP EXPLORING ✨
        </Text>

        <Text style={styles.desc}>
          Complete activities, earn badges and level up your team!
        </Text>

        <View style={styles.button}>
          <Text style={styles.buttonText}>
            START NOW
          </Text>
        </View>

      </View>

      {/* RIGHT */}
      <Image
        source={require('../assets/images/trophy.png')}
        style={styles.image}
      />

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  container: {
    marginTop: 28,

    backgroundColor: 'rgba(76,29,149,0.55)',

    borderRadius: 26,

    padding: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  left: {
    flex: 1,
  },

  title: {
    color: '#FACC15',

    fontSize: 18,

    fontFamily: 'Pixel',

    marginBottom: 10,
  },

  desc: {
    color: '#E9D5FF',

    fontSize: 12,

    lineHeight: 20,

    fontFamily: 'PixelOperator',

    width: 190,
  },

  button: {
    marginTop: 16,

    backgroundColor: '#FACC15',

    alignSelf: 'flex-start',

    paddingHorizontal: 14,
    paddingVertical: 8,

    borderRadius: 999,
  },

  buttonText: {
    color: '#000',

    fontSize: 10,

    fontFamily: 'Pixel',
  },

  image: {
    width: 95,
    height: 95,

    resizeMode: 'contain',
  },

});