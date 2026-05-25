// components/activity/SafetyNotes.tsx

import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function SafetyNotes() {

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        ⚠ SAFETY NOTES
      </Text>

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
    marginTop: 28,

    backgroundColor: '#6D264E',

    borderRadius: 16,

    borderWidth: 2,
    borderColor: '#FF4FB4',

    padding: 18,
  },

  title: {
    color: 'white',

    fontFamily: 'PressStart2P',

    fontSize: 11,
  },

  notesContainer: {
    marginTop: 18,
  },

  note: {
    color: 'white',

    fontFamily: 'PixeloidSans',

    fontSize: 12,

    lineHeight: 20,

    marginBottom: 12,
  },

});