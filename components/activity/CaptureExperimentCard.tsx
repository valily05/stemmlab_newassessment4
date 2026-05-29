// components/activity/CaptureExperimentCard.tsx

import {
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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

interface Props {
  isRecording: boolean;
  hasStarted: boolean;
  onStart: () => void;
  onStop: () => void;
  onRetry: () => void;
  onSaveIteration: () => void;
}

export default function CaptureExperimentCard({
  isRecording,
  hasStarted,
  onStart,
  onStop,
  onRetry,
  onSaveIteration,
}: Props) {
  if (hasStarted) {
    return (
      <View style={styles.recordingCard}>

        <View style={styles.recordingHeader}>
          <Text style={styles.recordingTitle}>
            VIDEO RECORDING
          </Text>

          <Text style={styles.recordingBadge}>
            ● RECORDING
          </Text>
        </View>

        <View style={styles.cameraPreview}>
          <Image
            source={require('../../assets/images/camera-icon.png')}
            style={styles.cameraIcon}
          />
        </View>

        {isRecording && (
          <TouchableOpacity
            style={styles.stopButton}
            onPress={onStop}
          >
            <Text style={styles.buttonText}>
              STOP RECORDING
            </Text>
          </TouchableOpacity>
        )}

        {!isRecording && (
          <View style={styles.actionButtons}>

            <TouchableOpacity
              style={styles.retryButton}
              onPress={onRetry}
            >
              <Text style={styles.buttonText}>
                RETRY
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={onSaveIteration}
            >
              <Text style={styles.buttonText}>
                SAVE ITERATION
              </Text>
            </TouchableOpacity>

          </View>
        )}

      </View>
    );
  }

  return (
    <View style={styles.card}>

      <View style={styles.header}>

        <View>

          <Text style={styles.title}>
            CAPTURE EXPERIMENT
          </Text>

          <View style={styles.requiredBadge}>
            <Text style={styles.requiredText}>
              Required
            </Text>
          </View>

        </View>

        <Image
          source={require('../../assets/images/phone-camera.png')}
          style={styles.phoneImage}
        />

      </View>

      <Text style={styles.description}>
        Record the entire experiment to
        analyze your parachute's performance.
      </Text>

      <Text style={styles.tipTitle}>
        ★ BUNNY TIP
      </Text>

      <Text style={styles.tip}>
        Use a ruler in frame for scale
      </Text>

      <Text style={styles.tip}>
        Identify first contact for contact time
      </Text>

      <Text style={styles.tip}>
        Identify when object leaves surface for bounce calculation
      </Text>

      <View style={styles.divider} />

      <Text style={styles.howTitle}>
        HOW IT WORKS
      </Text>

      <View style={styles.stepsRow}>

        <View style={styles.step}>
          <Text style={styles.stepEmoji}>
            📹
          </Text>

          <Text style={styles.stepTitle}>
            1. RECORD
          </Text>

          <Text style={styles.stepText}>
            Timer starts automatically when recording begins.
          </Text>
        </View>

        <View style={styles.step}>
          <Text style={styles.stepEmoji}>
            🪂
          </Text>

          <Text style={styles.stepTitle}>
            2. DROP
          </Text>

          <Text style={styles.stepText}>
            Let your parachute drop and hit the ground.
          </Text>
        </View>

        <View style={styles.step}>
          <Text style={styles.stepEmoji}>
            ⏱️
          </Text>

          <Text style={styles.stepTitle}>
            3. STOP
          </Text>

          <Text style={styles.stepText}>
            Press stop the moment the parachute hits the ground.
          </Text>
        </View>

      </View>

      <TouchableOpacity
        style={styles.startButton}
        onPress={onStart}
      >
        <Text style={styles.startIcon}>
          🎥
        </Text>

        <Text style={styles.startText}>
          START
        </Text>
      </TouchableOpacity>

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
    borderWidth: rf(1.5),
    borderColor: '#5711BE',
    shadowColor: '#6A36FF',
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 12,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    color: '#FFE95B',
    fontSize: rf(18),
    fontFamily: 'Pixel',
  },

  requiredBadge: {
    backgroundColor: '#8B002B',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.4),
    borderRadius: rf(10),
    marginTop: hp(1),
    alignSelf: 'flex-start',
  },

  requiredText: {
    color: '#FF4D6D',
    fontSize: rf(9),
    fontFamily: 'PixelOperator',
  },

  phoneImage: {
    width: rf(75),
    height: rf(75),
    resizeMode: 'contain',
  },

  description: {
    color: '#FFFFFF',
    fontSize: rf(12),
    lineHeight: rf(18),
    fontFamily: 'PixelOperator',
    marginTop: hp(1),
  },

  tipTitle: {
    color: '#FFE95B',
    fontSize: rf(18),
    fontFamily: 'Pixel',
    marginTop: hp(2),
  },

  tip: {
    color: '#FFFFFF',
    fontSize: rf(12),
    lineHeight: rf(18),
    fontFamily: 'PixelOperator',
  },

  divider: {
    height: 1,
    backgroundColor: '#2B2F68',
    marginTop: hp(2),
  },

  howTitle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: rf(12),
    fontFamily: 'PixelOperator',
    marginTop: hp(1),
  },

  stepsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
  },

  step: {
    width: wp(24),
    alignItems: 'center',
  },

  stepEmoji: {
    fontSize: rf(28),
  },

  stepTitle: {
    color: '#FFE95B',
    fontSize: rf(11),
    fontFamily: 'Pixel',
    marginTop: hp(1),
  },

  stepText: {
    color: '#FFFFFF',
    fontSize: rf(8),
    textAlign: 'center',
    marginTop: hp(0.5),
    fontFamily: 'PixelOperator',
  },

  startButton: {
    height: hp(6),
    backgroundColor: '#3E79E8',
    borderRadius: rf(14),
    marginTop: hp(3),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  startIcon: {
    fontSize: rf(18),
    marginRight: wp(2),
  },

  startText: {
    color: '#FFFFFF',
    fontSize: rf(16),
    fontFamily: 'Pixel',
  },

  /* RECORDING MODE */

  recordingCard: {
    marginHorizontal: wp(5),
    marginTop: hp(3),
    backgroundColor: '#02032A',
    borderRadius: rf(22),
    padding: wp(5),
    borderWidth: rf(1.5),
    borderColor: '#5711BE',
  },

  recordingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  recordingTitle: {
    color: '#FFE95B',
    fontSize: rf(18),
    fontFamily: 'Pixel',
  },

  recordingBadge: {
    color: '#FF3B3B',
    fontSize: rf(12),
    fontFamily: 'Pixel',
  },

  cameraPreview: {
    height: hp(35),
    borderRadius: rf(18),
    backgroundColor: '#010125',
    marginTop: hp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },

  cameraIcon: {
    width: rf(80),
    height: rf(80),
    resizeMode: 'contain',
  },

  stopButton: {
    height: hp(6),
    borderRadius: rf(14),
    backgroundColor: '#FF4D4D',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2),
  },

  actionButtons: {
    flexDirection: 'row',
    gap: wp(3),
    marginTop: hp(2),
  },

  retryButton: {
    flex: 1,
    height: hp(6),
    borderRadius: rf(14),
    backgroundColor: '#5711BE',
    justifyContent: 'center',
    alignItems: 'center',
  },

  saveButton: {
    flex: 1,
    height: hp(6),
    borderRadius: rf(14),
    backgroundColor: '#27AE60',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: rf(13),
    fontFamily: 'Pixel',
  },

});