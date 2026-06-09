import {
  RecordingPresets,
  requestRecordingPermissionsAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  PixelRatio,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { normalizeMetering } from "../../utils/soundMeterTest";
import Waveform from "./Waveform";

type Props = {
  onCompleted: (completed: boolean) => void;
};

const rf = (size: number) => {
  return Math.round(PixelRatio.roundToNearestPixel(size));
};

export default function SoundMeterTest({ onCompleted }: Props) {
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
const recorderState =
    useAudioRecorderState(
        recorder,
        50
    );
  const [isTesting, setIsTesting] = useState(false);
  const [displayDb, setDisplayDb] = useState(0);
  const [peakDb, setPeakDb] = useState(0);
  
  const [status, setStatus] = useState<"idle" | "testing" | "success" | "failed">("idle");

  const pulse = useRef(new Animated.Value(1)).current;
const initialDb = useRef<number | null>(null);
const hasFinished = useRef(false);
  // Handle metering updates
  useEffect(() => {
  console.log("Recorder State:", recorderState);

  if (recorderState.metering == null) {
    console.log("Metering is NULL");
    return;
  }

  console.log("Raw Metering:", recorderState.metering);

  const db = normalizeMetering(recorderState.metering);
  console.log("Display dB:", db);

  setDisplayDb(db);

  if (db > peakDb) {
    setPeakDb(db);
  }

  if (status !== "testing") return;

  if (initialDb.current === null) {
    initialDb.current = db;
    return;
  }

  const difference = Math.abs(db - initialDb.current);

  if (!hasFinished.current && difference >= 10) {
    hasFinished.current = true;
    finishSuccess();
  }

}, [recorderState]);
  // Pulse Animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.08,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);
const countdown = Math.max(
  0,
  5 - Math.floor(recorderState.durationMillis / 1000)
);
useEffect(() => {
  if (
    status === "testing" &&
    countdown <= 0
  ) {
    finishFailed();
  }
}, [countdown, status]);
async function requestPermission() {

    const result =
        await requestRecordingPermissionsAsync();

    return result.granted;

}

async function startTesting() {

  const granted = await requestPermission();
  if (!granted) return;

  hasFinished.current = false;

  setStatus("testing");
  initialDb.current = null;
  onCompleted(false);

  setPeakDb(0);
  setDisplayDb(0);
  setIsTesting(true);

  try {
 await recorder.prepareToRecordAsync();
await recorder.record();
  } catch (e) {
    console.log(e);
  }
}

  async function stopRecorder() {
    try {
      recorder.stop();
    } catch (e) {
      // Ignore errors if recorder is already stopped
    }
    setIsTesting(false);
  }

  async function finishSuccess() {
    if (status === "success") return;
    await stopRecorder();
    setStatus("success");
    onCompleted(true);
  }

  async function finishFailed() {
    await stopRecorder();
    setStatus("failed");
  }

async function retry() {

  initialDb.current = null;
  hasFinished.current = false;

  setStatus("idle");
  setIsTesting(false);

  setPeakDb(0);
  setDisplayDb(0);

  onCompleted(false);

}

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>TEST THE SOUND METER</Text>
        {status === "success" && (
          <View style={styles.checkBadge}>
            <Text style={styles.checkText}>✓</Text>
          </View>
        )}
      </View>

      <Text style={styles.subtitle}>
Make any sound to verify that your device's microphone detects changes correctly.      </Text>

      {/* dB Number */}
      <Animated.View
        style={[
          styles.dbContainer,
          {
            transform: [{ scale: pulse }],
          },
        ]}
      >
        <Text style={styles.dbNumber}>{displayDb}</Text>
        <Text style={styles.dbUnit}>dB</Text>
      </Animated.View>

      {/* Waveform */}
      <Waveform value={displayDb} testing={isTesting} />

      {/* Scale */}
      <View style={styles.scaleRow}>
        <Text style={styles.scaleText}>Quiet</Text>
        <View style={styles.scaleLine} />
        <Text style={styles.scaleText}>Loud</Text>
      </View>

      {/* Status */}
      {status === "idle" && (
        <Text style={styles.statusText}>Press "Start Testing"
to begin the microphone check.</Text>
      )}

      {status === "testing" && (
        <Text style={styles.statusText}>Listening... {countdown}s</Text>
      )}

      {status === "success" && (
        <View>
          <Text style={styles.successText}>✓ Sound Meter Verified</Text>
          <Text style={styles.peakText}>Peak Sound: {peakDb} dB</Text>
        </View>
      )}
{status === "failed" && (
  <Text style={styles.failedText}>
    Didn't quite hear that.
    {"\n"}
    Try speaking, clapping,
or making any louder sound.
  </Text>

      )}

      {/* Button */}
      {status === "idle" && (
        <Pressable style={styles.button} onPress={startTesting}>
          <Text style={styles.buttonText}>START TESTING</Text>
        </Pressable>
      )}

      {status === "testing" && (
        <View style={[styles.button, styles.disabledButton]}>
          <Text style={styles.buttonText}>TESTING...</Text>
        </View>
      )}

      {status === "failed" && (
        <Pressable style={styles.button} onPress={retry}>
          <Text style={styles.buttonText}>TRY AGAIN</Text>
        </Pressable>
      )}

      {status === "success" && (
        <Pressable style={styles.button} onPress={retry}>
          <Text style={styles.buttonText}>TEST AGAIN</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 20,
    borderRadius: 18,
    backgroundColor: "#1A1033",
    borderWidth: 2,
    borderColor: "#8B5CF6",
    overflow: "hidden",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    color: "#FFD84D",
    fontSize: rf(18),
    fontFamily: "Pixel",
    letterSpacing: 1,
  },
  subtitle: {
    color: "#D7CCFF",
    fontSize: rf(13),
    lineHeight: 20,
    marginBottom: 22,
    fontFamily: "PixelOperator",
  },
  checkBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#41E07A",
    justifyContent: "center",
    alignItems: "center",
  },
  checkText: {
    color: "#fff",
    fontSize: rf(18),
    fontWeight: "700",
  },
  dbContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  dbNumber: {
    color: "#FFFFFF",
    fontSize: rf(52),
    fontFamily: "PixelBold",
    lineHeight: rf(56),
  },
  dbUnit: {
    color: "#BCAFFF",
    fontSize: rf(16),
    marginTop: -2,
    fontFamily: "PixelBold",
  },
  scaleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    marginBottom: 18,
  },
  scaleText: {
    color: "#BCAFFF",
    fontSize: rf(12),
    fontFamily: "PixelOperator",
  },
  scaleLine: {
    flex: 1,
    height: 3,
    backgroundColor: "#6D4AFF",
    marginHorizontal: 10,
    borderRadius: 3,
  },
  statusText: {
    textAlign: "center",
    color: "#ECE7FF",
    marginBottom: 20,
    fontSize: rf(14),
    fontFamily: "PixelOperator",
  },
  successText: {
    textAlign: "center",
    color: "#41E07A",
    fontSize: rf(16),
    fontFamily: "PixelOperator",
    marginBottom: 8,
  },
  peakText: {
    textAlign: "center",
    color: "#D8CCFF",
    fontSize: rf(13),
    marginBottom: 20,
    fontFamily: "PixelBold",
  },
  failedText: {
    textAlign: "center",
    color: "#FF8A8A",
    fontSize: rf(14),
    lineHeight: 22,
    marginBottom: 20,
    fontFamily: "PixelOperator",
  },
  button: {
    height: 52,
    borderRadius: 14,
    backgroundColor: "#8B5CF6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#8B5CF6",
    shadowOpacity: 0.45,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 6,
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: rf(16),
    fontFamily: "Pixel",
    letterSpacing: 1,
  },
});