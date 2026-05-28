// components/activity/SafetyNotes.tsx

import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function SafetyNotes() {

  return (

    <View style={styles.container}>

    <View style={styles.titleRow}>

  <Image
    source={require('../../assets/images/Group 184.png')}
    style={styles.warningIcon}
    resizeMode="contain"
  />

  <Text style={styles.title}>
    SAFETY NOTES
  </Text>

</View>

      <View style={styles.notesContainer}>

        <Text style={styles.note}>
          • Ensure the drop area is clear
          of people
        </Text>

        <Text style={styles.note}>
          • Use a stable elevated surface
        </Text>

        <Text style={styles.note}>
          • Handle scissors with care
        </Text>

      </View>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    marginHorizontal: 18,
    marginTop: 20,

    backgroundColor: '#6C2E44',

    borderRadius: 16,

    borderWidth: 2,
    borderColor: '#FF5AA9',

    padding: 18,
  },

  title: {
    color: 'white',

    fontFamily: 'Pixel',

    fontSize: 15,
  },

  notesContainer: {
    marginTop: 10,
  },

  note: {
    color: 'white',

    fontFamily: 'PixelOperator',

    fontSize: 16,


    marginBottom: 9,
  },
/* TITLE ROW */
titleRow: {
  flexDirection: 'row',

  alignItems: 'center',
},

/* WARNING ICON */
warningIcon: {
  width: 28,

  height: 28,

  marginRight: 10,
},
});