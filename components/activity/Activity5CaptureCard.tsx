import { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

const wp = (percentage: number) =>
  PixelRatio.roundToNearestPixel(
    (width * percentage) / 100
  );

const hp = (percentage: number) =>
  PixelRatio.roundToNearestPixel(
    (height * percentage) / 100
  );

const rf = (size: number) => {
  const scale = width / 390;

  return Math.round(
    PixelRatio.roundToNearestPixel(
      size * scale
    )
  );
};

type Props = {
  movementType:
    | 'Arm Rotation'
    | 'Up and Down Motion'
    | 'Side Motion'
    | null;

  setMovementType: (
    value:
    | 'Arm Rotation'
    | 'Up and Down Motion'
    | 'Side Motion'
  ) => void;

  isTesting: boolean;
};

export default function Activity4CaptureCard({
  movementType,
  setMovementType,
  isTesting,
}: Props) {
  return(
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.leftContent}>
          <Text
            style={styles.title}
            numberOfLines={1}
          >
            CAPTURE EXPERIMENT
          </Text>

          <Text style={styles.description}>
            Choose the{' '}
            <Text style={styles.yellowText}>
              MOVEMENT TYPE
            </Text>{' '}
            to investigate how the human body moves.
          </Text>
        </View>
      </View>

      {/* <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>
          <Text style={styles.tipStar}>
            ★
          </Text>{' '}
          BUNNY TIP
        </Text>
      
        <Text style={styles.tip}>
          • Use a ruler in frame for scale
        </Text>
      
        <Text style={styles.tip}>
          • Identify first contact for contact time
        </Text>
      
        <Text style={styles.tip}>
          • Identify when the object leaves the surface for bounce calculation
        </Text>
      </View> */}

      <View style={styles.inputCard}>
        <Text style={styles.inputLabel}>
          MOVEMENT TYPE
        </Text>

        <View style={styles.radioButton}>
          <TouchableOpacity
            onPress={() =>
              setMovementType('Arm Rotation')
            }
          >
            <Text
              style={[
                styles.option,
                movementType === 'Arm Rotation' &&
                  styles.selected,
              ]}
            >
              ● Arm Rotation
            </Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            onPress={() =>
              setMovementType('Up and Down Motion')
            }
          >
            <Text
              style={[
                styles.option,
                movementType === 'Up and Down Motion' &&
                  styles.selected,
              ]}
            >
              ● Up and Down Motion
            </Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            onPress={() =>
              setMovementType('Side Motion')
            }
          >
            <Text
              style={[
                styles.option,
                movementType === 'Side Motion' &&
                  styles.selected,
              ]}
            >
              ● Side Motion
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: wp(5),
    marginTop: hp(3),

    backgroundColor: '#02032A',

    borderRadius: rf(22),
    padding: wp(5),
    paddingTop:wp(6),
    borderWidth: rf(2),
    borderColor: '#3D438F',

    shadowColor: '#3D438F',
    shadowOpacity: 1,
    shadowRadius: rf(10),
    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 12,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  leftContent: {
    flex: 1,
    paddingRight: wp(3),
  },

  title: {
    color: '#FFE95B',
    fontSize: rf(14),
    fontFamily: 'Pixel',

    width: wp(70),
  },

  description: {
    color: '#FFFFFF',
    fontSize: rf(15),
    lineHeight: rf(18),
    fontFamily: 'PixelOperator',
    marginTop: hp(1),
    width: wp(65),
  },

  yellowText: {
    color: '#FFE95B',
  },

  inputCard: {
    marginTop: hp(2),

    backgroundColor: '#150F31',

    borderWidth: rf(1.5),
    borderColor: '#6954A6',

    borderRadius: rf(12),

    padding: wp(4),
  },

  inputLabel: {
    color: '#FFE95B',

    fontFamily: 'PixelBold',

    fontSize: rf(19),

    marginBottom: hp(1),
  },

  textInput: {
    height: hp(5.5),

    backgroundColor: '#0E0B24',

    borderRadius: rf(10),

    paddingHorizontal: wp(4),

    color: 'white',

    fontFamily: 'PixelOperator',

    fontSize: rf(15),
  },

  multilineInput: {
    height: hp(15), // taller input box
    paddingTop: hp(1.5),
  },

  radioButton: {
    flexDirection: 'column',
    gap: wp(2),
  },

  option: {
    color: 'white',
    fontFamily: 'PixelOperator',
    fontSize: rf(18),
  },

  selected: {
    color: '#FFC509',
  },
})