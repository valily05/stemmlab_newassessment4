import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { FactCarousel, PixelProgressBar } from '../components/loadingelements';
import { COLORS, FACTS, LAYOUT } from '../constants/layout';
import { useLanguage } from '../context/LanguageContext';

export default function LoadingScreen() {
  const router = useRouter();
  const [dots, setDots] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);

  const { t, language } = useLanguage();

  const [loaded] = useFonts({
    Pixel: require('../assets/fonts/PublicPixel.ttf'),
    Wix: require('../assets/fonts/WixMadeforText-Bold.ttf'),
    PixelOperator: require('../assets/fonts/PixelOperator.ttf'),
    BebasNeue: require('../assets/fonts/BebasNeue-Regular.ttf'),
    PixelIntv: require('../assets/fonts/Pixel Intv.otf'),
    LEMONMILK :require('../assets/fonts/LEMONMILK-Medium.otf'),

  });

  useEffect(() => {
    if (!loaded) return;

    const dotInterval = setInterval(() => {
      setDots((p) => (p.length >= 3 ? '' : p + '.'));
    }, 500);

    const progInterval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 2));
    }, 130);

    const navTimer = setTimeout(() => {
      router.replace('/signup');
    }, 6800);

    return () => {
      clearInterval(dotInterval);
      clearInterval(progInterval);
      clearTimeout(navTimer);
    };
  }, [loaded, router]);

  if (!loaded) return null;

  return (
    <View style={styles.container}>
      {/* Background */}
     <Image
  source={require('../assets/images/bg1.png')}
  style={styles.background}
  resizeMode="cover"
/>

      {/* Logo */}
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{t.loadingTitle}</Text>
      </View>

      {/* Decorations */}
      <Image
        source={require('../assets/images/tb.png')}
        style={styles.textBox}
        resizeMode="contain"
      />
      <Image
        source={require('../assets/images/bunny.png')}
        style={styles.bunny}
        resizeMode="contain"
      />

      {/* Facts */}
      <View style={styles.factWrapper}>
        <Text style={styles.didYouKnow}>{t.didYouKnow}</Text>

        <FactCarousel facts={FACTS[language as keyof typeof FACTS]} />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <PixelProgressBar progress={progress} />

        <Text style={styles.loadingText}>
          {t.loading}
          {dots}
        </Text>
      </View>

      {/* Copyright */}
      <Text style={styles.copyright}>
        {t.copyright}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {
    position: 'absolute',
    bottom: LAYOUT.height * 0.689,
    width: LAYOUT.width * 0.95,
    height: LAYOUT.height * 0.4,
    alignSelf: 'center',
    zIndex: 10,
  },

  titleContainer: {
    paddingTop: LAYOUT.height * 0.17,
    alignItems: 'center',
  },

  titleText: {
    fontFamily: 'Pixel',
    fontSize: LAYOUT.fontBase * 0.089,
    color: COLORS.white,
    textShadowColor: COLORS.black,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },

  bunny: {
    position: 'absolute',
    bottom: LAYOUT.height * 0.06,
    width: LAYOUT.width * 1.6,
    height: LAYOUT.width * 1.6,
    alignSelf: 'center',
    zIndex: 10,
  },

  textBox: {
    position: 'absolute',
    bottom: LAYOUT.height * 0.07,
    width: LAYOUT.width * 0.8,
    height: LAYOUT.height * 0.25,
    alignSelf: 'center',
    zIndex: 10,
  },

  factWrapper: {
    marginTop: LAYOUT.height * 0.56,
    alignSelf: 'center',
    width: LAYOUT.width * 0.7,
    zIndex: 12,
  },

  didYouKnow: {
    fontFamily: 'Pixel',
    fontSize: LAYOUT.fontBase * 0.095,
    color: COLORS.yellow,
    textAlign: 'center',
    marginBottom: 18,
  },

  footer: {
    position: 'absolute',
    bottom: LAYOUT.height * 0.05,
    width: '100%',
    alignItems: 'center',
    zIndex: 15,
  },

  loadingText: {
    fontFamily: 'Pixel',
    fontSize: LAYOUT.fontBase * 0.098,
    color: COLORS.white,
  },

  copyright: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    fontFamily: 'Wix',
    fontSize: 10,
    color: COLORS.white,
    opacity: 0.6,
  },background: {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
},
});