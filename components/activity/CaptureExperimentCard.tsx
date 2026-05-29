// components/activity/CaptureExperimentCard.tsx

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

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
  return (
    <View style={styles.container}>
      {/* Camera Preview */}
      <View style={styles.cameraContainer}>
        <Text style={styles.cameraText}>
          CAMERA PREVIEW
        </Text>
      </View>

      {/* Start Recording */}
      {!hasStarted && (
        <TouchableOpacity
          style={styles.startButton}
          onPress={onStart}
        >
          <Text style={styles.buttonText}>
            START RECORDING
          </Text>
        </TouchableOpacity>
      )}

      {/* Stop Recording */}
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

      {/* Retry + Save */}
      {hasStarted && (
        <View style={styles.actionContainer}>
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

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
  },

  cameraContainer: {
    height: 240,
    borderRadius: 20,
    backgroundColor: '#24164F',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cameraText: {
    color: '#FFFFFF',
    fontFamily: 'Pixel',
    fontSize: 14,
  },

  startButton: {
    marginTop: 16,
    height: 58,
    borderRadius: 16,
    backgroundColor: '#FF5AA9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  stopButton: {
    marginTop: 16,
    height: 58,
    borderRadius: 16,
    backgroundColor: '#FF4D4D',
    justifyContent: 'center',
    alignItems: 'center',
  },

  actionContainer: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
  },

  retryButton: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#5711BE',
    justifyContent: 'center',
    alignItems: 'center',
  },

  saveButton: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#2AE3DA',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Pixel',
    fontSize: 13,
  },
});