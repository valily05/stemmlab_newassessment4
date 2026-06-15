import { saveIteration } from "@/services/firebase/iterationService";
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface AccelerometerData {
  x: number;
  y: number;
  z: number;
}

interface Props {
  sessionID: string;
  stage: string;
  iteration: number;
  onNext: () => void;
  isLastIteration: boolean;
  accelerometerData: AccelerometerData;
}

export default function RecordingExperimentCard({
  sessionID,
  stage,
  iteration,
  onNext,
  isLastIteration,
  accelerometerData,
}: Props) {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [timer, setTimer] = useState(20);
  const [samples, setSamples] = useState<number[]>([]);
  const [averageAcceleration, setAverageAcceleration] = useState<number | null>(null);
  const [peakAcceleration, setPeakAcceleration] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Collect samples when recording
  useEffect(() => {
    if (!isRecording) return;

    const magnitude = Math.max(
      0,
      Math.sqrt(
        accelerometerData.x ** 2 +
        accelerometerData.y ** 2 +
        accelerometerData.z ** 2
      ) - 9.81
    );

    setSamples((prevSamples) => [...prevSamples, magnitude]);
  }, [accelerometerData, isRecording]);

  // Timer logic
  useEffect(() => {
    if (!isRecording) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          stopRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = () => {
    setSamples([]);
    setAverageAcceleration(null);
    setPeakAcceleration(null);
    setTimer(20);
    setIsRecording(true);
  };

  const stopRecording = () => {
const stopRecording = () => {
  setIsRecording(false);

  setTimeout(() => {
    if (samples.length === 0) return;

    const avg =
      samples.reduce((a, b) => a + b, 0) /
      samples.length;

    const peak = Math.max(...samples);

    setAverageAcceleration(avg);
    setPeakAcceleration(peak);
    setHasRecorded(true);
  }, 100);
};

    const avg = samples.reduce((a, b) => a + b, 0) / samples.length;
    const peak = Math.max(...samples);

    setAverageAcceleration(avg);
    setPeakAcceleration(peak);
  };

  const handleSaveAndNext = async () => {
    if (averageAcceleration === null || peakAcceleration === null) return;

    setIsSaving(true);
    try {
      await saveIteration(sessionID, {
        iterationNo: iteration,
        data: {
          fanType: stage,
          duration: 20,
          averageAcceleration,
          peakAcceleration,
        },
      });

      setIsSaving(false);
      onNext();
    } catch (error) {
      console.error('Error saving iteration:', error);
      setIsSaving(false);
      Alert.alert('Error', 'Failed to save acceleration data. Please try again.');
    }
  };

  const liveAcceleration = Math.max(
    0,
    Math.sqrt(
      accelerometerData.x ** 2 +
      accelerometerData.y ** 2 +
      accelerometerData.z ** 2
    ) - 9.81
  ).toFixed(2);

  return (
    <View style={styles.card}>
      {!isRecording && !hasRecorded && (
        <TouchableOpacity style={styles.button} onPress={startRecording}>
          <Text style={styles.buttonText}>Start Recording</Text>
        </TouchableOpacity>
      )}

      {isRecording && (
        <View style={styles.recordingContainer}>
          <Text style={styles.timerText}>{timer}s</Text>
<Text style={styles.recordingSubtext}>
Move the phone by waving the fan for 20 seconds.
</Text>
          <Text style={styles.liveAccText}>{liveAcceleration} m/s²</Text>
        </View>
      )}

      {hasRecorded && (
        <View style={styles.resultsContainer}>
          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>Peak Acceleration</Text>
            <Text style={styles.resultValue}>
              {peakAcceleration ? `${peakAcceleration.toFixed(2)} m/s²` : '0.00 m/s²'}
            </Text>
          </View>

          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>Average Acceleration</Text>
            <Text style={styles.resultValue}>
              {averageAcceleration ? `${averageAcceleration.toFixed(2)} m/s²` : '0.00 m/s²'}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.button, isSaving && { opacity: 0.7 }]}
            onPress={handleSaveAndNext}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>
                {isLastIteration ? 'Finish' : 'Save & Next'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#26216D',
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  button: {
    backgroundColor: '#EC588C',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'PixelOperatorBold',
    fontWeight: 'bold',
  },
  recordingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    color: '#FFFFFF',
    fontSize: 48,
    fontFamily: 'PixelOperatorBold',
    marginBottom: 10,
  },
  recordingSubtext: {
    color: '#A09CBF',
    fontSize: 14,
    fontFamily: 'PixelOperator',
  },
  liveAccText: {
    color: '#EC588C',
    fontSize: 20,
    fontFamily: 'PixelOperatorBold',
    marginTop: 8,
  },
  resultsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  resultItem: {
    backgroundColor: '#14103A',
    width: '100%',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  resultLabel: {
    color: '#A09CBF',
    fontSize: 14,
    fontFamily: 'PixelOperator',
    marginBottom: 4,
  },
  resultValue: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'PixelOperatorBold',
  },
});