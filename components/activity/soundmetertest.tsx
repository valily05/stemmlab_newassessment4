import {
  RecordingPresets,
  requestRecordingPermissionsAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import { LinearGradient } from "expo-linear-gradient";
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
  const recorder = useAudioRecorder({
    ...RecordingPresets.HIGH_QUALITY,
    isMeteringEnabled: true,
  });
  
  const recorderState = useAudioRecorderState(recorder, 50);
  
  const [isTesting, setIsTesting] = useState(false);
  const [displayDb, setDisplayDb] = useState(0);
  const [peakDb, setPeakDb] = useState(0);
  
  const [status, setStatus] = useState<"idle" | "testing" | "success" | "failed">("idle");

  const pulse = useRef(new Animated.Value(1)).current;
  const initialDb = useRef<number | null>(null);
  const hasFinished = useRef(false);

  // Handle metering updates
  useEffect(() => {
    console.log(JSON.stringify(recorderState, null, 2));
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
    if (status === "testing" && countdown <= 0) {
      finishFailed();
    }
  }, [countdown, status]);

  async function requestPermission() {
    const result = await requestRecordingPermissionsAsync();
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
      await recorder.prepareToRecordAsync({
        ...RecordingPresets.HIGH_QUALITY,
        isMeteringEnabled: true,
      });
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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        {status === "success" && (
          <View style={styles.checkBadge}>
            <Text style={styles.checkText}>✓</Text>
          </View>
        )}
      </View>


<Animated.View
  style={[
    styles.dbCircle,
    {
      transform: [{ scale: pulse }],
    },
  ]}
>
  <View style={styles.dbRow}>
    <Text style={styles.dbNumber}>
      {displayDb}
    </Text>

    <Text style={styles.dbUnit}>
      dB
    </Text>
  </View>
</Animated.View>

      {/* Waveform */}
    <Waveform
        value={displayDb}
        testing={isTesting}
    />


      {/* Status */}
      <View style={styles.feedbackContainer}>
      {status === "idle" && (
        <Text style={styles.statusText}>
Press "Start Testing" to begin.
        </Text>
      )}

{status === "testing" && (
  <View style={styles.testingContainer}>
    <Text style={styles.listeningText}>
      Listening...
    </Text>

    <View style={styles.progressBar}>
      {Array.from({ length: 10 }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.progressBlock,
            i <
              Math.ceil(((5 - countdown) / 5) * 10) &&
              styles.progressBlockActive,
          ]}
        />
      ))}
    </View>
  </View>
)}

      {status === "success" && (
<View style={styles.successCard}>

  <Text style={styles.successEmoji}>
    🎉
  </Text>

  <Text style={styles.successTitle}>
    MICROPHONE VERIFIED
  </Text>

  <Text style={styles.peakLabel}>
    Loudest Sound
  </Text>

  <Text style={styles.peakNumber}>
    {peakDb} dB
  </Text>

</View>
      )}

      {status === "failed" && (
        <Text style={styles.failedText}>
          Didn't quite hear that.
          {"\n"}
          Try speaking, clapping, or making any louder sound.
        </Text>
      )}
</View>
     <View style={styles.buttonPressable}>
  <Pressable
    disabled={status === "testing"}
    onPress={() => {
      if (status === "idle") startTesting();
      else if (status === "failed") retry();
      else if (status === "success") retry();
    }}
  >
    <LinearGradient
      colors={
        status === "testing"
          ? ["#8E80A8", "#6F638C"]
          : ["#FF63C3", "#C05CFF"]
      }
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={[
        styles.button,
        status === "testing" && styles.disabledButton,
      ]}
    >
      <Text style={styles.buttonText}>
        {status === "idle"
          ? "START TESTING"
          : status === "testing"
          ? "TESTING..."
          : status === "failed"
          ? "TRY AGAIN"
          : "TEST AGAIN"}
      </Text>
    </LinearGradient>
  </Pressable>
</View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Card styling removed so it inherits cleanly from your parent wrapper
    flex: 1,
    width: "97%",
    marginTop:rf(20),
    justifyContent:'center',
    alignItems:'center'
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,

  },
  title: {
    color: "#FFD84D",
    fontSize: rf(27),
    fontFamily: "PixelBold",
    letterSpacing: 1,
    textAlign:"center",
    marginTop:rf(18)
    
  },
  feedbackContainer: {
    width: "100%",
    minHeight: 0,
    justifyContent: "center",
    alignItems: "center",
},
  dbRow:{
    flexDirection:"row",
    alignItems:"flex-end",
},


  subtitle: {
    color: "#D7CCFF",
    fontSize: rf(13),
    lineHeight: 20,
    marginBottom: 22,
    fontFamily: "PixelOperator",
    textAlign:'center'
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
buttonPressable: {
  width: "90%",
  marginTop: rf(10),
  marginBottom: rf(20),
},
dbCircle: {
  width: 145,
  height: 145,

  borderRadius: 999,

  justifyContent: "center",
  alignItems: "center",

  marginBottom: 20,

  backgroundColor: "rgba(166, 136, 201, 0.03)",

  shadowColor: "#000",
  shadowOpacity: 0.2,
  shadowRadius: 8,
  shadowOffset: {
    width: 0,
    height: 4,
  },

  elevation: 3,
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
    fontFamily: "PixelBold",
        marginLeft:6,
    marginBottom:8,
  },
  testingContainer:{
    alignItems:"center",
    width:"100%",
    marginVertical:18,
},

listeningText:{
    color:"#FFFFFF",
    fontFamily:"PixelBold",
    fontSize:rf(17),
    marginBottom:12,
},

progressBar:{
    flexDirection:"row",
},

progressBlock:{
    width:14,
    height:8,
    borderRadius:3,
    backgroundColor:"#473A66",
    marginHorizontal:2,
},

progressBlockActive:{
    backgroundColor:"#EC4899",
},

successCard:{
    width:"100%",

    alignItems:"center",

    paddingVertical:18,

    borderRadius:18,

    borderWidth:2,

    borderColor:"#3CE78B",

    backgroundColor:"#18382E",

    marginVertical:18,
},

successEmoji:{
    fontSize:32,
},

successTitle:{
    marginTop:8,
    color:"#41E07A",
    fontFamily:"Pixel",
    fontSize:rf(14),
},

peakLabel:{
    marginTop:10,
    color:"#B8F6D2",
    fontFamily:"PixelOperator",
    fontSize:rf(13),
},

peakNumber:{
    marginTop:6,
    color:"#FFFFFF",
    fontFamily:"PixelBold",
    fontSize:rf(24),
},
  statusText: {
    textAlign: "center",
    color: "#ECE7FF",
    marginVertical: 20,
    fontSize: rf(19),
    fontFamily: "PixelOperator",
  },
  successText: {
    textAlign: "center",
    color: "#41E07A",
    fontSize: rf(16),
    fontFamily: "PixelOperator",
    marginBottom: 8,
    marginTop: 12,
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
    marginVertical: 20,
    fontFamily: "PixelOperator",
  },
button:{
    width:"100%",
    height:60,

    borderRadius:18,

    justifyContent:"center",
    alignItems:"center",

    overflow:"hidden",
    shadowColor:"#B95EFF",

shadowOpacity:0.18,
borderWidth:1,

borderColor:"rgba(255,255,255,0.12)",
shadowRadius:8,

shadowOffset:{
    width:0,
    height:4,
},
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