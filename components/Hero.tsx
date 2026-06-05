import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Dimensions,
  PixelRatio,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';

const { width, height } = Dimensions.get('window');

/* RESPONSIVE HELPERS */
const wp = (p: number) => PixelRatio.roundToNearestPixel((width * p) / 100);
const hp = (p: number) => PixelRatio.roundToNearestPixel((height * p) / 100);
const rf = (size: number) => Math.round(PixelRatio.roundToNearestPixel(size * (width / 390)));

export default function Hero() {
  const { t } = useLanguage();

  return (
    <View style={styles.hero}>
      {/* TEXT WRAPPER */}
      <View style={styles.textWrap}>
        <Text style={styles.small}>
          {t.welcomeBack}
        </Text>

        {/* GRADIENT TITLE */}
        <MaskedView
          maskElement={
            <Text style={styles.title}>
              {t.explorer}
              <Text style={styles.star}> ✦ </Text>
            </Text>
          }
        >
          <LinearGradient
            colors={['#A061F5', '#E879C6', '#C95A9E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={[styles.title, { opacity: 0 }]}>
              {t.explorer}
              <Text style={styles.star}> ✦ </Text>
            </Text>
          </LinearGradient>
        </MaskedView>

        <Text style={styles.desc}>
          {t.exploreDesc}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { marginTop: hp(6), paddingHorizontal: wp(6), width: '100%' },
  textWrap: { marginTop: hp(2), right: wp(4), top: wp(7), width: '100%', elevation: 10 },
  small: { color: '#fff', fontSize: rf(12), fontFamily: 'Pixel', marginBottom: hp(1) },
  title: { 
    fontSize: rf(25), 
    lineHeight: rf(36), 
    fontFamily: 'Pixel', 
    marginTop: hp(0.3),
    textShadowColor: '#9C4077',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: wp(4),
  },
  star: { 
    marginLeft: wp(0.9),
    textShadowColor: '#FF8BD6',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: wp(4),
  },
  desc: { color: '#ffffff', fontSize: rf(17), width: '88%', lineHeight: rf(23), fontFamily: 'PixelOperator' },
});