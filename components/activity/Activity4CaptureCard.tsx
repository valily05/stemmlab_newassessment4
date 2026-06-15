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
  numberOfPillars: string;
  setNumberOfPillars: (
    value: string
  ) => void;

  layerType:
    | 'Paper Folds'
    | 'Cardboard Folds'
    | 'Mixed'
    | null;
  setLayerType: (
    value:
    | 'Paper Folds'
    | 'Cardboard Folds'
    | 'Mixed'
  ) => void;

  layerDesign: string;
  setLayerDesign: (
    value: string
  ) => void;

  description: string;
  setDescription: (
    value: string
  ) => void;

  onStartVibration: () => void;

  isTesting: boolean;
};

export default function Activity4CaptureCard({
  numberOfPillars,
  setNumberOfPillars,
  layerType,
  setLayerType,
  layerDesign,
  setLayerDesign,
  description,
  setDescription,
  onStartVibration,
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
            Record the{' '}
            <Text style={styles.yellowText}>
              ANTI-VIBRATION LAYER DESIGN
            </Text>{' '}
            to analyze the best design.
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
          NUMBER OF PILLARS
        </Text>
      
        <TextInput
          style={styles.textInput}
          placeholder="e.g. 1"
          placeholderTextColor="#8A8FBF"
          keyboardType="numeric"
          value={numberOfPillars}
          onChangeText={setNumberOfPillars}
        />
        {!numberOfPillars.trim() && (
          <Text
            style={{
              color: '#FF6B6B',
              fontSize: rf(14),
              fontFamily: 'PixelOperator',
              marginTop: hp(0.8),
            }}
          >
            * Enter the number of pillars
          </Text>
        )}
      </View>

      <View style={styles.inputCard}>
        <Text style={styles.inputLabel}>
          LAYER TYPE
        </Text>

        <View style={styles.radioButton}>
          <TouchableOpacity
            onPress={() =>
              setLayerType('Paper Folds')
            }
          >
            <Text
              style={[
                styles.option,
                layerType === 'Paper Folds' &&
                  styles.selected,
              ]}
            >
              ● Paper Folds
            </Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            onPress={() =>
              setLayerType('Cardboard Folds')
            }
          >
            <Text
              style={[
                styles.option,
                layerType === 'Cardboard Folds' &&
                  styles.selected,
              ]}
            >
              ● Cardboard Folds
            </Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            onPress={() =>
              setLayerType('Mixed')
            }
          >
            <Text
              style={[
                styles.option,
                layerType === 'Mixed' &&
                  styles.selected,
              ]}
            >
              ● Mixed
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputCard}>
        <Text style={styles.inputLabel}>
          LAYER DESIGN
        </Text>

        <TextInput
          style={styles.textInput}
          placeholder="e.g. Prototype 1"
          placeholderTextColor="#8A8FBF"
          keyboardType="default"
          value={layerDesign}
          onChangeText={setLayerDesign}
        />
        {!layerDesign.trim() && (
          <Text
            style={{
              color: '#FF6B6B',
              fontSize: rf(14),
              fontFamily: 'PixelOperator',
              marginTop: hp(0.8),
            }}
          >
            * Enter the layer design
          </Text>
        )}
      </View>
    
      <View style={styles.inputCard}>
        <Text style={styles.inputLabel}>
          SHORT DESCRIPTION OF YOUR SETUP
        </Text>

        <TextInput
          style={[styles.textInput, styles.multilineInput]}
          placeholder={"e.g. 2 layers of cardboards\n4 pillars at the corners"}
          placeholderTextColor="#8A8FBF"
          keyboardType="default"
          multiline
          textAlignVertical='top'
          value={description}
          onChangeText={setDescription}
        />
        {!description.trim() && (
          <Text
            style={{
              color: '#FF6B6B',
              fontSize: rf(14),
              fontFamily: 'PixelOperator',
              marginTop: hp(0.8),
            }}
          >
            * Enter the short description
          </Text>
        )}
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