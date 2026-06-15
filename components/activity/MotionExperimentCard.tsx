import { saveIteration } from "@/services/firebase/iterationService";
import { useEffect, useRef, useState } from 'react';
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

export default function MotionExperimentCard({
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
  const samplesRef = useRef<number[]>([]);
  const [averageAcceleration, setAverageAcceleration] = useState<number | null>(null);
  const [peakAcceleration, setPeakAcceleration] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Collect samples when recording
  useEffect(() => {
if (!isRecording || !accelerometerData) return;

    // Some devices report acceleration in g (~1),
    // while others report m/s² (~9.81).
    // Adjust this calibration value if necessary.
const magnitude = Math.sqrt(
  accelerometerData.x ** 2 +
  accelerometerData.y ** 2 +
  accelerometerData.z ** 2
);

const motion = Math.abs(magnitude - 1);

samplesRef.current.push(motion);


    samplesRef.current.push(magnitude);
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
    samplesRef.current = [];
    setAverageAcceleration(null);
    setPeakAcceleration(null);
    setTimer(20);
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);

    setTimeout(() => {
      if (samplesRef.current.length === 0) return;

      const avg =
        samplesRef.current.reduce((a, b) => a + b, 0) /
        samplesRef.current.length;

      const peak = Math.max(...samplesRef.current);

      setAverageAcceleration(avg);
      setPeakAcceleration(peak);
      setHasRecorded(true);
    }, 100);
  };

  const resetExperiment = () => {
    samplesRef.current = [];
    setAverageAcceleration(null);
    setPeakAcceleration(null);
    setTimer(20);
    setHasRecorded(false);
    setIsRecording(false);
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

const liveAcceleration = Math.abs(
  Math.sqrt(
    accelerometerData.x ** 2 +
    accelerometerData.y ** 2 +
    accelerometerData.z ** 2
  ) - 1
).toFixed(2);


  return (
    <View style={styles.card}>
      {!isRecording && !hasRecorded && (
        <TouchableOpacity style={styles.button} onPress={startRecording}>
          <Text style={styles.buttonText}>START TEST</Text>
        </TouchableOpacity>
      )}

      {isRecording && (
        <View style={styles.recordingContainer}>
          <Text style={styles.timerText}>{timer}s</Text>
          <Text style={styles.recordingSubtext}>
            Current Acceleration
          </Text>
          <Text style={styles.liveAccText}>{liveAcceleration} m/s²</Text>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#D64B4B', marginTop: 15 }]} 
            onPress={stopRecording}
          >
            <Text style={styles.buttonText}>STOP TEST</Text>
          </TouchableOpacity>
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
            style={[styles.button, { backgroundColor: '#FFD94E', marginBottom: 12 }]}
            onPress={resetExperiment}
          >
            <Text style={[styles.buttonText, { color: '#14103A' }]}>TEST AGAIN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, isSaving && { opacity: 0.7 }]}
            onPress={handleSaveAndNext}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>
                {isLastIteration ? 'FINISH' : 'SAVE & NEXT'}
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