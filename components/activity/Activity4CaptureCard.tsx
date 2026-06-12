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

  layerType: string | null;
  setLayerType: (
    value: string
  ) => void;

  layerDesign: string | null;
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

      <View style={styles.tipCard}>
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
      </View>

      <View style={styles.inputCard}>
        <Text style={styles.inputLabel}>
          DROP HEIGHT (m)
        </Text>
      
        <TextInput
          style={styles.textInput}
          placeholder="e.g. 1.0"
          placeholderTextColor="#8A8FBF"
          keyboardType="numeric"
          value={}
          onChangeText={set}
        />
        {!dropHeight.trim() && (
          <Text
            style={{
              color: '#FF6B6B',
              fontSize: rf(14),
              fontFamily: 'PixelOperator',
              marginTop: hp(0.8),
            }}
          >
            * Enter the drop height before starting
          </Text>
        )}
      </View>

      <View style={styles.inputCard}>
        <Text style={styles.inputLabel}>
          OBJECT WEIGHT (g)
        </Text>
      
        <TextInput
          style={styles.textInput}
          placeholder="e.g. 85"
          placeholderTextColor="#8A8FBF"
          keyboardType="numeric"
          value={}
          onChangeText={set}
        />
        {!dropHeight.trim() && (
          <Text
            style={{
              color: '#FF6B6B',
              fontSize: rf(14),
              fontFamily: 'PixelOperator',
              marginTop: hp(0.8),
            }}
          >
            * Enter the drop weight before starting
          </Text>
        )}
      </View>
    </View>
  );
}