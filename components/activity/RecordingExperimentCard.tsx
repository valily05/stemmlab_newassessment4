// components/activity/RecordingExperimentCard.tsx

import { saveIteration } from "@/services/firebase/iterationService";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from 'react';
import {
  Dimensions,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Waveform from './Waveform';

const { width, height } = Dimensions.get('window');

const wp = (p: number) =>
  PixelRatio.roundToNearestPixel((width * p) / 100);

const hp = (p: number) =>
  PixelRatio.roundToNearestPixel((height * p) / 100);

const rf = (size: number) => {
  const scale = width / 390;

  return Math.round(
    PixelRatio.roundToNearestPixel(size * scale)
  );
};

interface Props {
  sessionID: string;
  locationID: string;
  stage: string;
  iteration: number;
  onNext: () => void;

  isLastIteration: boolean;
  onFinishLocation: () => void;
}
export default function RecordingExperimentCard({
  sessionID,
  locationID,
  stage,
  iteration,
  onNext,
  isLastIteration,
  onFinishLocation,
}: Props) {
  const recorder = useAudioRecorder(
    RecordingPresets.HIGH_QUALITY
  );

  const recorderState = useAudioRecorderState(recorder, 100);
  

  const [recording, setRecording] =
    useState(false);

  const [recordedUri, setRecordedUri] =
    useState<string | null>(null);

  const [recordingTime, setRecordingTime] =
    useState(0);

  const [saving, setSaving] =
    useState(false);

  const [soundLevel, setSoundLevel] =
    useState(0);
    const [averageDecibel, setAverageDecibel] = useState(0);
const [maxDecibel, setMaxDecibel] = useState(0);
const [allReadings, setAllReadings] = useState<number[]>([]);
useEffect(() => {
  if (!recording) return;
 console.log("Metering:", recorderState.metering);
  console.log("Duration:", recorderState.durationMillis);

  // Always update timer
  setRecordingTime(
    Math.floor((recorderState.durationMillis ?? 0) / 1000)
  );

  // Update dB only if metering exists
  if (recorderState.metering != null) {
    const db = Math.max(
      0,
      recorderState.metering + 100
    );

   setSoundLevel(db);

setAllReadings(prev => {
  const readings = [...prev, db];

  const avg =
    readings.reduce((sum, value) => sum + value, 0) /
    readings.length;

  const max = Math.max(...readings);

  setAverageDecibel(avg);
  setMaxDecibel(max);

  return readings;
});
  }
}, [
  recording,
  recorderState.durationMillis,
  recorderState.metering,
]);

async function startRecording() {
  const permission =
    await requestRecordingPermissionsAsync();

  if (!permission.granted) return;

  await setAudioModeAsync({
    allowsRecording: true,
    playsInSilentMode: true,
  });

await recorder.prepareToRecordAsync({
  ...RecordingPresets.HIGH_QUALITY,
  isMeteringEnabled: true,
});

setAllReadings([]);
setAverageDecibel(0);
setMaxDecibel(0);
  await recorder.record();

  setRecordedUri(null);

  setRecording(true);
}


async function stopRecording() {
  await recorder.stop();

  setRecording(false);

  setRecordedUri(recorder.uri ?? null);
}
async function handleSaveIteration() {
    setSaving(true);

    try {
await saveIteration(
  sessionID,
  {
    iterationNo: iteration,

    data: {
      action: stage,
      duration: recordingTime,
    averageDecibel,
maxDecibel,
      audioURL: recordedUri,
      createdAt: Timestamp.now(),
    },
  },
  locationID
);
if (isLastIteration) {
    onFinishLocation();
} else {
    onNext();
}

    } catch (e) {

      console.log(e);

    }

    setSaving(false);

  }

function retryRecording() {
setAllReadings([]);
setAverageDecibel(0);
setMaxDecibel(0);
  setRecordedUri(null);

  setRecording(false);

  setRecordingTime(0);

  setSoundLevel(0);

}
  return (

    <View style={styles.card}>

      <View style={styles.header}>

        <Text style={styles.title}>
          {stage} RECORDING
        </Text>

       

      </View>

      <Text style={styles.description}>
        Record the required sound for this iteration.
      </Text>

      {/* Live dB */}

<View style={styles.dbCircle}>

  <Text style={styles.dbValue}>
    {soundLevel.toFixed(0)}
  </Text>

  <Text style={styles.dbUnit}>
    dB
  </Text>

</View>

      {/* Graph */}

<View style={styles.waveWrapper}>

  <Waveform
    value={soundLevel}
    testing={recording}
  />

</View>

<Text style={styles.statusText}>
{
recording
? "Listening..."
: recordedUri
? "Recording Complete"
: "Ready to Record"
}
</Text>

      {/* Time */}

    <Text style={styles.timer}>
  {String(Math.floor(recordingTime / 60)).padStart(2, '0')}
  :
  {String(recordingTime % 60).padStart(2, '0')}
</Text>
<View style={styles.statsContainer}>
  <View style={styles.statCard}>
    <Text style={styles.statLabel}>AVERAGE</Text>
    <Text style={styles.statValue}>
      {averageDecibel.toFixed(1)} dB
    </Text>
  </View>

  <View style={styles.statCard}>
    <Text style={styles.statLabel}>MAX</Text>
    <Text style={styles.statValue}>
      {maxDecibel.toFixed(1)} dB
    </Text>
  </View>
</View>

      {!recording && !recordedUri && (

        <TouchableOpacity

          style={styles.primaryButton}

          onPress={startRecording}

        >

          <MaterialCommunityIcons

            name="microphone"

            color="#FFF"

            size={rf(26)}

          />

          <Text style={styles.buttonText}>
            START RECORDING
          </Text>

        </TouchableOpacity>

      )}

      {recording && (

        <TouchableOpacity

          style={styles.stopButton}

          onPress={stopRecording}

        >

          <MaterialCommunityIcons

            name="stop"

            color="#FFF"

            size={rf(24)}

          />

          <Text style={styles.buttonText}>
            STOP RECORDING
          </Text>

        </TouchableOpacity>

      )}

      {recordedUri && (

        <>

          <TouchableOpacity

            style={styles.retryButton}

            onPress={retryRecording}

          >

            <MaterialCommunityIcons

              name="reload"

              color="#FFD94E"

              size={rf(22)}

            />

            <Text style={styles.retryText}>
              RECORD AGAIN
            </Text>

          </TouchableOpacity>

          <TouchableOpacity

            style={styles.saveButton}

onPress={handleSaveIteration}

            disabled={saving}

          >

            <MaterialCommunityIcons

              name="content-save"

              color="#FFF"

              size={rf(22)}

            />

            <Text style={styles.buttonText}>

              {saving
                ? "SAVING..."
                : "SAVE ITERATION"}

            </Text>

          </TouchableOpacity>

        </>

      )}

    </View>

  );

}
const styles = StyleSheet.create({

  card: {
    marginHorizontal: wp(5),
    marginTop: hp(3),

    backgroundColor: '#02032A',

    borderRadius: rf(22),

    borderWidth: 2,
    borderColor: '#3D438F',

    padding: wp(5),

    shadowColor: '#3D438F',
    shadowOpacity: 1,
    shadowRadius: rf(10),
    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 12,
  },
  
statsContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: hp(2),
},

statCard: {
  flex: 1,
  marginHorizontal: wp(1),
  backgroundColor: "#181044",
  borderRadius: rf(12),
  paddingVertical: hp(1.5),
  alignItems: "center",
},

statLabel: {
  color: "#B9AEFF",
  fontFamily: "PixelOperator",
  fontSize: rf(12),
},

statValue: {
  color: "#FFFFFF",
  fontFamily: "PixelBold",
  fontSize: rf(18),
  marginTop: hp(0.5),
},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    color: '#FFE95B',
    fontFamily: 'Pixel',
    fontSize: rf(16),
  },



  description: {
    marginTop: hp(1.8),

    color: '#FFFFFF',

    fontFamily: 'PixelOperator',

    fontSize: rf(15),

    lineHeight: rf(20),
  },

dbCircle:{
    width:wp(42),
    height:wp(42),

    alignSelf:"center",

    borderRadius:999,

    backgroundColor:"#181044",

    justifyContent:"center",
    alignItems:"center",

    marginTop:hp(3),
},

dbValue:{
    color:"#FFFFFF",
    fontFamily:"PixelBold",
    fontSize:rf(48),
},

dbUnit:{
    marginTop:-hp(.5),

    color:"#B9AEFF",

    fontFamily:"PixelOperator",

    fontSize:rf(18),
},

waveWrapper:{
    marginTop:hp(3),

    alignItems:"center",
},

statusText:{
    marginTop:hp(1),

    textAlign:"center",

    color:"#FFFFFF",

    fontFamily:"PixelOperator",

    fontSize:rf(18),
},

progressContainer:{
    marginTop:hp(2),

    flexDirection:"row",

    justifyContent:"center",
},

progressDash:{
    width:wp(3),

    height:hp(.8),

    borderRadius:999,

    marginHorizontal:3,

    backgroundColor:"#463A74",
},

progressDashActive:{
    backgroundColor:"#B96FFF",
},

recordingRow:{
  flexDirection:"row",
  alignItems:"center",
  justifyContent:"center",
  marginTop:hp(1),
},

redDot:{
  width:10,
  height:10,
  borderRadius:999,
  backgroundColor:"#FF4D4D",
  marginRight:8,
},

recordingText:{
  color:"#FFFFFF",
  fontFamily:"PixelOperator",
  fontSize:rf(14),
},



  dbLabel: {
    marginTop: hp(.5),

    color: '#FFFFFF',

    fontFamily: 'PixelOperator',

    fontSize: rf(16),
  },
  timer: {

    marginTop: hp(2),

    alignSelf: 'center',

    color: '#FFE95B',

    fontFamily: 'Pixel',

    fontSize: rf(20),

  },

  primaryButton: {

    marginTop: hp(3),

    height: hp(6),

    backgroundColor: '#00AEEF',

    borderRadius: rf(14),

    flexDirection: 'row',

    justifyContent: 'center',

    alignItems: 'center',

  },

  stopButton: {

    marginTop: hp(3),

    height: hp(6),

    backgroundColor: '#D64B4B',

    borderRadius: rf(14),

    flexDirection: 'row',

    justifyContent: 'center',

    alignItems: 'center',

  },

  retryButton: {

    marginTop: hp(2),

    height: hp(6),

    borderRadius: rf(14),

    borderWidth: 2,

    borderColor: '#FFD94E',

    flexDirection: 'row',

    justifyContent: 'center',

    alignItems: 'center',

  },

  retryText: {

    marginLeft: wp(2),

    color: '#FFD94E',

    fontFamily: 'Pixel',

    fontSize: rf(14),

  },

  saveButton: {

    marginTop: hp(2),

    height: hp(6),

    borderRadius: rf(14),

    backgroundColor: '#34B36B',

    flexDirection: 'row',

    justifyContent: 'center',

    alignItems: 'center',

  },

  buttonText: {

    marginLeft: wp(2),

    color: '#FFFFFF',

    fontFamily: 'Pixel',

    fontSize: rf(14),

  },

});