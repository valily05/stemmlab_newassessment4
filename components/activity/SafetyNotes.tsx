// components/activity/SafetyNotes.tsx

import { useState } from 'react';

import {
  Dimensions,
  Image,
  PixelRatio,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
const { width, height } =
  Dimensions.get('window');

const wp = (
  percentage: number
) =>
  PixelRatio.roundToNearestPixel(
    (width * percentage) / 100
  );

const hp = (
  percentage: number
) =>
  PixelRatio.roundToNearestPixel(
    (height * percentage) / 100
  );

const rf = (
  size: number
) => {
  const scale = width / 390;

  return Math.round(
    PixelRatio.roundToNearestPixel(
      size * scale
    )
  );
};
interface Props {
  notes: string[];

  onAcceptedChange?: (
    accepted: boolean
  ) => void;
}

export default function SafetyNotes({
  notes,
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
  {notes.map((note, index) => (
    <Text
      key={index}
      style={styles.note}
    >
      • {note}
    </Text>
  ))}
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
  marginHorizontal: rf(18),
  marginTop: rf(20),

  backgroundColor: '#6C2E44',

  borderRadius: rf(16),

  borderWidth: rf(2),

  borderColor: '#FF5AA9',

  padding: rf(18),
},

/* TITLE ROW */
titleRow: {
  flexDirection: 'row',
  alignItems: 'center',
},

/* WARNING ICON */
warningIcon: {
  width: rf(28),
  height: rf(28),
  marginRight: rf(10),
},

title: {
  color: 'white',
  fontFamily: 'Pixel',
  fontSize: rf(15),
},

notesContainer: {
  marginTop: rf(10),
},

note: {
  color: 'white',
  fontFamily: 'PixelOperator',
  fontSize: rf(16),
  marginBottom: rf(9),

  flexShrink: 1,
},

/* CHECKBOX ROW */
checkboxRow: {
  flexDirection: 'row',

  alignItems: 'center',

  marginTop: rf(12),

  paddingTop: rf(12),

  borderTopWidth: rf(1),

  borderTopColor: 'rgba(255,255,255,0.15)',
},

checkbox: {
  width: rf(20),

  height: rf(20),

  borderWidth: rf(2),

  borderColor: '#60BB3F',

  borderRadius: rf(4),

  justifyContent: 'center',

  alignItems: 'center',

  marginRight: rf(12),
},

checkboxActive: {
  backgroundColor: '#60BB3F',
},

checkMark: {
  color: '#FFFFFF',

  fontSize: rf(16),

  fontWeight: 'bold',
},

checkboxText: {
  flex: 1,

  color: '#FFFFFF',

  fontFamily: 'PixelOperator',

  fontSize: rf(14),
},

});