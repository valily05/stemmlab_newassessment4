import { useTheme } from "@/context/ThemeContext";
import { useState } from 'react';
import {
  Dimensions,
  Image,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { activities } from '../data/activities';
import ActivityCard from './ActivityCard';

const { width, height } = Dimensions.get('window');

/* TYPES */
type Props = {
  userPoints: number;
};

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

export default function ActivitiesSection({
  userPoints,
}: Props) {
  const { theme } = useTheme();
const [hasScrolled, setHasScrolled] =
  useState(false);
  // ADD LOCK STATE DYNAMICALLY
const activitiesWithLock = Object.values(
  activities
).map((activity: any) => ({
  ...activity,
  locked:
    userPoints <
    (activity.pointsRequired || 0),
}));

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        {/* LEFT SIDE */}
        <View style={styles.titleWrapper}>

<Text
  style={[
    styles.title,
    {
      color: theme.activityTitle,
    },
  ]}
>
  Available Activities
</Text>

          {/* POTION ICON */}
          <Image
            source={require('../assets/images/Group 163 (1).png')}
            style={styles.icon}
          />

        </View>

<Text
  style={[
    styles.viewAll,
    {
      color: theme.activityViewAll,
    },
  ]}
>
  View all ›
</Text>

      </View>

      {/* CARDS */}
     <View style={styles.scrollWrapper}>

  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
onScroll={(event) => {
  const x = event.nativeEvent.contentOffset.x;

  setHasScrolled(x > 20);
}}
scrollEventThrottle={16}
  >

    {activitiesWithLock.map((item) => (

      <ActivityCard
        key={item.id}
        item={item}
      />

    ))}

  </ScrollView>

  {!hasScrolled && (
<View
  style={[
    styles.swipeHint,
    {
      backgroundColor: theme.swipeHintBackground,
    },
  ]}
>
  <Text
    style={[
      styles.swipeArrow,
      {
        color: theme.swipeHintArrow,
      },
    ]}
  >
    »
  </Text>
</View>
  )}

</View>

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
 
    fontSize: fp(20),

    fontFamily: 'PixelOperator',

    left: fp(5),
  },

  /* POTION ICON */
  icon: {
    width: wp(4),
    height: wp(4),

    resizeMode: 'contain',
  },

  viewAll: {
  

    fontSize: fp(16),

    fontFamily: 'PixelOperator',
  },
scrollWrapper:{
  position:'relative',
},

swipeHint: {
  position: 'absolute',

  right: wp(-4),

  top: '40%',

  width: fp(34),
  height: fp(34),

  borderRadius: fp(17),

  justifyContent: 'center',
  alignItems: 'center',

  elevation: 6,

  shadowColor: '#000',

  shadowOffset: {
    width: 0,
    height: 2,
  },

  shadowOpacity: 0.15,

  shadowRadius: 4,
},

swipeArrow:{

  fontSize:fp(26),

  fontFamily:'PixelOperator',
},
});