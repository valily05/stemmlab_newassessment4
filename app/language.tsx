import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
    Animated,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';

type Language = 'English' | 'Bahasa Indonesia';

export default function LanguageScreen() {
  const router = useRouter();
const { language, setLanguage, t } = useLanguage();

  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -8,
          duration: 2000,
          useNativeDriver: true
        }),
        Animated.timing(floatAnim, {
          toValue: 8,
          duration: 2000,
          useNativeDriver: true
        })
      ])
    ).start();
  }, []);

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    setTimeout(() => router.back(), 150);
  };

  return (
    <ImageBackground
      source={require('../assets/images/space.png')}
      style={styles.container}
      resizeMode="cover"
    >

      {/* BACK (PIXEL STYLE) */}
      <TouchableOpacity style={styles.backRow} onPress={() => router.back()}>
        <Image
          source={require('../assets/images/pixel-back.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      {/* CONTENT */}
      <View style={styles.inner}>
       <Text style={styles.title}>
  {t.chooseLanguage}
</Text>

        {/* ENGLISH */}
        <TouchableOpacity
          style={[
            styles.card,
            language === 'English' && styles.selected
          ]}
          onPress={() => handleSelect('English')}
        >
          <Image
            source={require('../assets/images/uk.png')}
            style={styles.flagIcon}
          />
          <Text style={styles.text}>English</Text>

          {language === 'English' && (
            <Image
              source={require('../assets/images/checkmark.png')}
              style={styles.checkIcon}
            />
          )}
        </TouchableOpacity>

        {/* INDONESIA */}
        <TouchableOpacity
          style={[
            styles.card,
            language === 'Bahasa Indonesia' && styles.selected
          ]}
          onPress={() => handleSelect('Bahasa Indonesia')}
        >
          <Image
            source={require('../assets/images/indo.png')}
            style={styles.flagIcon}
          />
          <Text style={styles.text}>Bahasa Indonesia</Text>

          {language === 'Bahasa Indonesia' && (
            <Image
              source={require('../assets/images/checkmark.png')}
              style={styles.checkIcon}
            />
          )}
        </TouchableOpacity>
      </View>

      {/* UFO */}
      <Animated.View
        style={[
          styles.petContainer,
          { transform: [{ translateY: floatAnim }] }
        ]}
      >
        <View style={styles.centerWrapper}>

          <ImageBackground
            source={require('../assets/images/speech.png')}
            style={styles.speech}
            resizeMode="stretch"
          >
           <Text style={styles.speechText}>
  {t.readyExplore}
</Text>
          </ImageBackground>

          <Image
            source={require('../assets/images/ufo.png')}
            style={styles.ufo}
          />

        </View>
      </Animated.View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

backRow: {
  marginTop: 60,
  marginLeft: 20,
},

  backIcon: {
    width: 120,
    height: 120,
    resizeMode: 'contain'
  },

  /* FLAGS */
  flagIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },

  inner: {
    paddingHorizontal: 20,
    bottom:12,
  },

  title: {
    color: 'white',
    fontSize: 34,
    fontFamily: 'Pixel',
    marginBottom: 40,
    lineHeight: 40
  },

  /* CARDS */
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(15,23,42,0.85)',
    padding: 18,
    borderRadius: 20,
    marginBottom: 16,

    borderWidth: 1,
    borderColor: 'rgba(99,102,241,0.2)',
  },

  selected: {
    borderWidth: 2,
    borderColor: '#8B5CF6',
    backgroundColor: 'rgba(139,92,246,0.12)',

    shadowColor: '#8B5CF6',
    shadowOpacity: 0.9,
    shadowRadius: 10,
  },

  centerWrapper: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  text: {
    color: 'white',
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'PixelIntv'
  },

  checkIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain'
  },

  /* UFO */
  petContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },

  ufo: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginTop: -2
  },

  speech: {
    width: 175,
    height: 48,
    transform: [{ translateX: 50 }],
    marginBottom: -10
  },

  speechText: {
    color: '#434444',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'PixelIntv',
    paddingTop: 11.4,
    width: 280,
    right: 51,
  }
});