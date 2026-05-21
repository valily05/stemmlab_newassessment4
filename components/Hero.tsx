import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function Hero() {

  return (
    <View style={styles.hero}>

      <Text style={styles.small}>
        WELCOME BACK
      </Text>

      <Text style={styles.title}>
        EXPLORER
      </Text>

      <Text style={styles.desc}>
        Let's explore the universe together!
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  hero: {
    marginTop: 50,
  },

  small: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Pixel',
  },

 title: {
  color: '#C084FC',
  fontSize: 42,
  lineHeight: 42,
  fontFamily: 'Pixel',
  marginTop: 8,

  textShadowColor: '#A855F7',
  textShadowRadius: 18,
},
  desc: {
    color: '#e9d5ff',
    marginTop: 10,
    fontSize: 15,
  },

});