
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

      {/* LOCKED */}
      {item.locked && (
        <View style={styles.lockedBadge}>
          <Text style={styles.lockedText}>
            🔒 LOCKED
          </Text>
        </View>
      )}

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
  width: 155,

  backgroundColor: 'rgba(8,12,30,0.88)',

  borderRadius: 24,

  padding: 16,

  marginRight: 14,

  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.05)',

  overflow: 'hidden',
},

  lockedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,

    backgroundColor: 'rgba(239,68,68,0.2)',

    paddingHorizontal: 8,
    paddingVertical: 4,

    borderRadius: 999,

    zIndex: 10,
  },

  lockedText: {
    color: '#FCA5A5',
    fontSize: 9,
    fontFamily: 'PixelOperator',
  },
image: {
  width: 62,
  height: 62,

  resizeMode: 'contain',

  alignSelf: 'center',

  marginTop: 12,
},

title: {
  color: '#fff',

  fontFamily: 'Pixel',

  fontSize: 9,

  lineHeight: 16,

  marginTop: 18,
},

  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    marginTop: 10,
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