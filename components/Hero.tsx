import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Dimensions,
  PixelRatio,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from '../context/LanguageContext';

const { width, height } = Dimensions.get('window');

/* RESPONSIVE HELPERS */
const wp = (p: number) =>
  PixelRatio.roundToNearestPixel((width * p) / 100);

const hp = (p: number) =>
  PixelRatio.roundToNearestPixel((height * p) / 100);

const rf = (size: number) =>
  Math.round(
    PixelRatio.roundToNearestPixel(size * (width / 390))
  );

export default function Hero() {
  const { t } = useLanguage();
  const { theme, isDark } = useTheme();

  return (
    <View style={styles.hero}>
      <View style={styles.textWrap}>
        {/* Welcome */}
       <Text
  style={[
    styles.small,
    {
      color: isDark
        ? "#FFFFFF"
        : "#6E7396",   // blue-gray
    },
  ]}
>
          {t.welcomeBack}
        </Text>

        {/* Gradient Title */}
        <MaskedView
          maskElement={
            <Text
              style={[
                styles.title,
                {
                  textShadowColor: isDark
                    ? '#9C4077'
                    : '#D946EF',
                },
              ]}
            >
              {t.explorer}
              <Text
                style={[
                  styles.star,
                  {
                    textShadowColor: isDark
                      ? '#FF8BD6'
                      : '#F472B6',
                  },
                ]}
              >
                ✦
              </Text>
            </Text>
          }
        >
          <LinearGradient
  colors={
    isDark
      ? ["#A061F5", "#E879C6", "#C95A9E"]
      : [
          "#BDA6FF",
          "#A88BFF",
          "#D99BFF",
        ]
  }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text
              style={[
                styles.title,
                {
                  opacity: 0,
                  textShadowColor: isDark
                    ? '#9C4077'
                    : '#D946EF',
                },
              ]}
            >
              {t.explorer}
              <Text
                style={[
                  styles.star,
                  {
                    textShadowColor: isDark
                      ? '#FF8BD6'
                      : '#F472B6',
                  },
                ]}
              >
                ✦
              </Text>
            </Text>
          </LinearGradient>
        </MaskedView>

        {/* Description */}
     <Text
  style={[
    styles.desc,
    {
      color: isDark
        ? "#FFFFFF"
        : "#747A99",
    },
  ]}
>
          {t.exploreDesc}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    marginTop: hp(6),
    paddingHorizontal: wp(6),
    width: '100%',
  },

  textWrap: {
    marginTop: hp(2),
    right: wp(4),
    top: wp(7),
    width: '100%',
    elevation: 10,
  },

  small: {
    fontSize: rf(12),
    fontFamily: 'Pixel',
    marginBottom: hp(1),
  },

  title: {
    fontSize: rf(25),
    lineHeight: rf(36),
    fontFamily: 'Pixel',
    marginTop: hp(0.3),

    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: wp(4),
  },

  star: {
    marginLeft: wp(0.9),

    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: wp(4),
  },

  desc: {
    fontSize: rf(17),
    width: '88%',
    lineHeight: rf(23),
    fontFamily: 'PixelOperator',
  },
});