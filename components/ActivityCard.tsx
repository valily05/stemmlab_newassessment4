import { useTheme } from "@/context/ThemeContext";
import { router } from 'expo-router';
import {
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const wp = (percentage: number) =>
  PixelRatio.roundToNearestPixel(
    (width * percentage) / 100
  );

const hp = (percentage: number) =>
  PixelRatio.roundToNearestPixel(
    (height * percentage) / 100
  );

const rf = (size: number) =>
  PixelRatio.roundToNearestPixel(
    (width / 430) * size
  );

export default function ActivityCard({
  item,
}: any) {
 const { isDark } = useTheme();

  return (

    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        router.push(item.route)
      }
      style={styles.card}
    >

<Image
  source={
    isDark
      ? item.image.dark
      : item.image.light
  }
  style={styles.image}
/>


    </TouchableOpacity>

  );

}

const styles = StyleSheet.create({

  image:{
    width:wp(44),
    height:hp(36),

    borderRadius:rf(22),

    resizeMode:'contain',

    marginTop:rf(-37),
  },

  card:{
    marginRight:wp(4),
    position:'relative',
  },



});