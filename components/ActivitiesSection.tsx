import {
    Dimensions,
    Image,
    PixelRatio,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import ActivityCard from './ActivityCard';

import { activities } from '../data/activities';

const { width, height } = Dimensions.get('window');

/* RESPONSIVE HELPERS */
const wp = (percentage: number) => {
  return PixelRatio.roundToNearestPixel(
    (width * percentage) / 100
  );
};

const hp = (percentage: number) => {
  return PixelRatio.roundToNearestPixel(
    (height * percentage) / 100
  );
};

const fp = (size: number) => {
  return PixelRatio.roundToNearestPixel(
    (width / 430) * size
  );
};

export default function ActivitiesSection() {

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        {/* LEFT SIDE */}
        <View style={styles.titleWrapper}>

          <Text style={styles.title}>
            Available Activities
          </Text>

          {/* POTION ICON */}
          <Image
            source={require('../assets/images/Group 163 (1).png')}
            style={styles.icon}
          />

        </View>

        <Text style={styles.viewAll}>
          View all ›
        </Text>

      </View>

      {/* CARDS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >

        {activities.map((item) => (

          <ActivityCard
            key={item.id}
            item={item}
          />

        ))}

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    marginTop: hp(3),
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: hp(2),
  },

  /* TITLE + ICON */
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: wp(4),
  },

  title: {
    color: '#fff',

    fontSize: fp(20),

    fontFamily: 'PixelOperator',
    left:fp(5),

},

  /* POTION ICON */
  icon: {
    width: wp(4),
    height: wp(4),

    resizeMode: 'contain',
  },

  viewAll: {
    color: '#894FD9',

    fontSize: fp(16),

    fontFamily: 'PixelOperator',
  },

});