
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import ActivityCard from './ActivityCard';

import { activities } from '../data/activities';

export default function ActivitiesSection() {

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        <Text style={styles.title}>
          AVAILABLE ACTIVITIES 🧪
        </Text>

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
    marginTop: 28,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 18,
  },

  title: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Pixel',
  },

  viewAll: {
    color: '#A855F7',
    fontSize: 12,
    fontFamily: 'PixelOperator',
  },

});