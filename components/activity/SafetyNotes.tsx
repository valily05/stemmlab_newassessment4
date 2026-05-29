// components/activity/SafetyNotes.tsx

import { useState } from 'react';

import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface Props {
  onAcceptedChange?: (
    accepted: boolean
  ) => void;
}

export default function SafetyNotes({
  onAcceptedChange,
}: Props) {

  const [accepted, setAccepted] =
    useState(false);

  const handleToggle = () => {

    const newValue =
      !accepted;

    setAccepted(newValue);

    onAcceptedChange?.(
      newValue
    );

  };

  return (

    <View style={styles.container}>

      {/* TITLE */}
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

      {/* NOTES */}
      <View style={styles.notesContainer}>

        <Text style={styles.note}>
          • Ensure the drop area is clear
          {'\n'}of people
        </Text>

        <Text style={styles.note}>
          • Use a stable elevated surface
        </Text>

        <Text style={styles.note}>
          • Handle scissors with care
        </Text>

      </View>

      {/* ACKNOWLEDGEMENT */}
      <Pressable
        style={styles.checkboxRow}
        onPress={handleToggle}
      >

        <View
          style={[
            styles.checkbox,

            accepted &&
              styles.checkboxActive,
          ]}
        >

          {accepted && (
            <Text style={styles.checkMark}>
              ✓
            </Text>
          )}

        </View>

        <Text style={styles.checkboxText}>
          I have read and understood all
          safety instructions.
        </Text>

      </Pressable>

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

  /* CHECKBOX ROW */
  checkboxRow: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 12,

    paddingTop: 12,

    borderTopWidth: 1,

    borderTopColor: 'rgba(255,255,255,0.15)',
  },

  checkbox: {
    width: 20,

    height: 20,

    borderWidth: 2,

    borderColor: '#60BB3F',

    borderRadius: 4,

    justifyContent: 'center',

    alignItems: 'center',

    marginRight: 12,
  },

  checkboxActive: {
    backgroundColor: '#60BB3F',
  },

  checkMark: {
    color: '#FFFFFF',

    fontSize: 16,

    fontWeight: 'bold',

  },

  checkboxText: {
    flex: 1,

    color: '#FFFFFF',

    fontFamily: 'PixelOperator',

    fontSize: 14,

  },

});