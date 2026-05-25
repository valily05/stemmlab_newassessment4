// components/activity/ActivityHero.tsx

import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface Props {
  title: string;
  overview: string;
  bunnyImage: any;
}

export default function ActivityHero({
  title,
  overview,
  bunnyImage,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.overviewRow}>
          <View style={styles.overviewCircle}>
            <Text style={styles.circleText}>1</Text>
          </View>

          <Text style={styles.overviewText}>
            Overview
          </Text>
        </View>

        <Text style={styles.description}>
          {overview}
        </Text>
      </View>

      <Image
        source={bunnyImage}
        style={styles.bunny}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 18,
  },

  left: {
    flex: 1,
  },

  title: {
    color: '#F8EC4D',
    fontFamily: 'PressStart2P',
    fontSize: 24,
    lineHeight: 34,
  },

  overviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    gap: 10,
  },

  overviewCircle: {
    width: 24,
    height: 24,
    borderRadius: 50,
    backgroundColor: '#FF5AA9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  circleText: {
    color: 'white',
    fontSize: 8,
    fontFamily: 'PressStart2P',
  },

  overviewText: {
    color: '#FF5AA9',
    fontFamily: 'PressStart2P',
    fontSize: 12,
  },

  description: {
    color: 'white',
    fontFamily: 'PixeloidSans',
    marginTop: 14,
    lineHeight: 22,
    fontSize: 12,
    paddingRight: 10,
  },

  bunny: {
    width: 130,
    height: 170,
    resizeMode: 'contain',
    marginTop: 12,
  },
});