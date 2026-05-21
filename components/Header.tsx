import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function Header() {

  return (

    <View style={styles.header}>

      {/* MENU BUTTON */}
      <TouchableOpacity style={styles.circleBtn}>
        <Text style={styles.menu}>
          ☰
        </Text>
      </TouchableOpacity>

      {/* LOGO + SUBTITLE */}
      <View>

        <Text style={styles.logo}>
          STEMM LAB
        </Text>

        <Text style={styles.subtitle}>

          Learn

          <Text style={styles.star}>
            {' '}✦{' '}
          </Text>

          Experiment

          <Text style={styles.star}>
            {' '}✦{' '}
          </Text>

          Innovate

        </Text>

      </View>

      {/* PROFILE */}
      <Image
        source={require('../assets/images/miffy.png')}
        style={styles.avatar}
      />

    </View>

  );
}

const styles = StyleSheet.create({

  header: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  circleBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(91,33,182,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  menu: {
    color: '#fff',
    fontSize: 28,
  },

  logo: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Pixel',
  },

  subtitle: {
    color: '#ddd6fe',
    fontSize: 16,
    marginTop: 8,
    fontFamily: 'PixelOperator',
  },

  star: {
    color: '#EC588C',
  },

  avatar: {
    width: 54,
    height: 54,
    resizeMode: 'contain',
  },

});