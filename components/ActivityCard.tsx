
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { router } from 'expo-router';

export default function ActivityCard({
  item,
}: any) {

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.card}
      onPress={() => router.push(item.route)}
    >

    

      {/* IMAGE */}
      <Image
        source={item.image}
        style={styles.image}
      />

      {/* TITLE */}
      <Text style={styles.title}>
        {item.title}
      </Text>

      {/* TAGS */}
      <View style={styles.tagsRow}>

        {item.tags.map((tag: string, index: number) => (

          <View
            key={index}
            style={styles.tag}
          >
            <Text style={styles.tagText}>
              {tag}
            </Text>
          </View>

        ))}

      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

card: {
  width: 150,
  backgroundColor: '#120C2E',
  borderRadius: 24,
  padding: 10,
  marginRight: 14,
  borderWidth: 1,
  borderColor: '#2B1B59',
  overflow: 'hidden',
},

image: {
  width: 120,
  height: 120,

  resizeMode: 'contain',

  alignSelf: 'center',

  marginTop: 12,
},

title: {
  color: '#fff',

  fontFamily: 'Pixel',

  fontSize: 9,

  lineHeight: 16,

  marginTop: 10,
},

  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    marginTop: 0,
  },

tag: {
  backgroundColor: 'rgba(168,85,247,0.16)',

  paddingHorizontal: 8,
  paddingVertical: 5,

  borderRadius: 999,

  marginRight: 6,
  marginTop: 8,
},

  tagText: {
    color: '#fff',
    fontSize: 9,
    fontFamily: 'PixelOperator',
  },

});