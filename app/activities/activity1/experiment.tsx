import {
  useCameraPermissions,
} from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import CaptureExperimentCard from '../../../components/activity/CaptureExperimentCard';
import ExitButton from '../../../components/activity/ExitButton';
import Experiment1Observation from '../../../components/activity/Experiment1Observation';
import ExperimentHero from '../../../components/activity/ExperimentHero';
import ExperimentStats from '../../../components/activity/ExperimentStats';
import ExperimentTipCard from '../../../components/activity/ExperimentTipCard';
import InfoModal from '../../../components/activity/InfoModal';
import LiveTimerCard from '../../../components/activity/LiveTimerCard';
import StopwatchCard from '../../../components/activity/StopwatchCard';
const { width, height } = Dimensions.get('window');

const wp = (percentage: number) =>
  PixelRatio.roundToNearestPixel(
    (width * percentage) / 100
  );

const rf = (size: number) => {
  const scale = width / 390;

  return Math.round(
    PixelRatio.roundToNearestPixel(
      size * scale
    )
  );
};

const hp = (percentage: number) =>
  PixelRatio.roundToNearestPixel(
    (height * percentage) / 100
  );

const stages = [
  'BASELINE',
  'PROTOTYPE 1',
  'PROTOTYPE 2',
  'PROTOTYPE 3',
];

export default function Activity1Experiment() {
const [permission, requestPermission] =
  useCameraPermissions();

  const [showInfo, setShowInfo] =
    useState(false);
const startRecording = () => {
  setIsRecording(true);
  setElapsedTime(0);
};

    const [showReview, setShowReview] =
  useState(false);

const [firstHitTime, setFirstHitTime] =
  useState<string | null>(null);

const [stopMovingTime, setStopMovingTime] =
  useState<string | null>(null);

  const [currentStage, setCurrentStage] =
    useState(0);

const [results, setResults] =
  useState<
    {
      stage: string;
      dropTime: number;
      firstHitTime: string;
      stopMovingTime: string;

      videoUri?: string;

      inTarget?: boolean | null;
      bounced?: boolean | null;
    }[]
  >([]);

  const [isRecording, setIsRecording] =
    useState(false);

  const [hasStarted, setHasStarted] =
    useState(false);

  const [elapsedTime, setElapsedTime] =
    useState(0);

  const [timeLeft, setTimeLeft] =
    useState(20 * 60);
const [videos, setVideos] =
  useState<string[]>([]);
const [currentVideoUri, setCurrentVideoUri] =
  useState<string | null>(null);

console.log(
  'PARENT VIDEO',
  currentVideoUri
);
const [canStopRecording, setCanStopRecording] =
  useState(false);

const [recordingComplete, setRecordingComplete] =
  useState(false);

const [dropHeight, setDropHeight] =
  useState('');

const [inTarget, setInTarget] =
  useState<boolean | null>(null);

const [bounced, setBounced] =
  useState<boolean | null>(null);
  
  useEffect(() => {
    let interval: ReturnType<
      typeof setInterval
    >;

  if (isRecording) {
    interval = setInterval(() => {
      setElapsedTime(prev => prev + 10);
    }, 10);
  }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRecording]);

const formatTime = (
  milliseconds: number
) => {

  const mins = Math.floor(
    milliseconds / 60000
  );

  const secs = Math.floor(
    (milliseconds % 60000) / 1000
  );

  const centiseconds = Math.floor(
    (milliseconds % 1000) / 10
  );

  return `${String(mins).padStart(
    2,
    '0'
  )}:${String(secs).padStart(
    2,
    '0'
  )}.${String(
    centiseconds
  ).padStart(2, '0')}`;
};

const saveIteration = () => {

const impactForce =
  bounced === true
    ? 'MEDIUM'
    : 'LOW';

const result = {
  stage: stages[currentStage],
  dropTime: elapsedTime,
  firstHitTime: firstHitTime ?? '',
  stopMovingTime: stopMovingTime ?? '',
  videoUri: videos[currentStage] ?? '',

  inTarget,
  bounced,

  impactForce,
};

  const updatedResults = [
    ...results,
    result,
  ];

  setResults(updatedResults);

  if (
    currentStage <
    stages.length - 1
  ) {

    setCurrentStage(
      prev => prev + 1
    );

    setFirstHitTime(null);
    setStopMovingTime(null);
    setCurrentVideoUri(null);

    setInTarget(null);
    setBounced(null);

    setCanStopRecording(false);
    setRecordingComplete(false);

    setHasStarted(true);
    setIsRecording(false);

  } else {

    console.log(
      'Activity Complete',
      updatedResults
    );

router.push({
  pathname:
    '/activities/activity1/results',
  params: {
    results: JSON.stringify(
      updatedResults
    ),
  },
});

}
};

return (
<LinearGradient
 colors={[
    '#0B0820', 
    '#14103A', 
    '#1D1854',
    '#26216D',
    '#312C88',
    '#3A35A3',
  ]}
  locations={[
    0,
    0.50,
    0.75,
    0.88,
    0.94,
    1,
  ]}
  start={{ x: 0.5, y: 0 }}
  end={{ x: 0.5, y: 1 }}
  style={styles.container}
>


<ScrollView
  showsVerticalScrollIndicator={false}
  contentContainerStyle={styles.content}
>
  <TouchableOpacity
  style={styles.infoButton}
  onPress={() =>
    setShowInfo(true)
  }
>
  <Image
    source={require('../../assets/images/info-icon.png')}
    style={styles.infoIcon}
  />
</TouchableOpacity>
<ExperimentHero
  title="PARACHUTE DROP CHALLENGE"
  description={
    currentStage === 0 ? (
      <Text style={styles.heroDescription}>
        Drop the toy{' '}
        <Text style={styles.pinkText}>
          WITHOUT
        </Text>{' '}
        a parachute.
      </Text>
    ) : (
      <Text style={styles.heroDescription}>
        Drop the toy{' '}
        <Text style={styles.pinkText}>
          WITH
        </Text>{' '}
        your parachute design.
      </Text>
    )
  }
/>

        <ExperimentStats
          timeLeft={formatTime(
            timeLeft
          )}
          iteration={
            stages[currentStage]
          }
        />

<CaptureExperimentCard
  isRecording={isRecording}
  hasStarted={hasStarted}
  canStopRecording={canStopRecording}
  videoUri={currentVideoUri}
    dropHeight={dropHeight}
  setDropHeight={setDropHeight}

onStartRecording={startRecording}
onVideoSaved={(uri) => {

  setCurrentVideoUri(uri);

  setVideos(prev => [
    ...prev,
    uri,
  ]);

}}

onStart={async () => {

  if (!permission?.granted) {

    const result =
      await requestPermission();

    if (!result.granted) {
      return;
    }
  }

  setHasStarted(true);

}}

onStop={() => {

  console.log('PARENT ONSTOP');

  setIsRecording(false);

  setRecordingComplete(true);

setHasStarted(true);

}}
onRetry={() => {

  setCurrentVideoUri(null);

  setElapsedTime(0);

  setFirstHitTime(null);
  setStopMovingTime(null);

  setCanStopRecording(false);
  setRecordingComplete(false);

  setIsRecording(false);
setHasStarted(false);
}}

  onSaveIteration={saveIteration}
/>

{
  !hasStarted ? (
    <StopwatchCard />
  ) : (
    <>
      <LiveTimerCard
        time={formatTime(elapsedTime)}
        isRecording={isRecording}
      />


      <View
        style={{
          marginHorizontal: wp(5),
          marginTop: hp(2),
          gap: hp(1.5),
        }}
      >
        {firstHitTime && stopMovingTime && (
  <View style={styles.frame}>

    <ImageBackground
      source={require('../../assets/images/Group 224.png')}
      style={styles.ribbonImage}
      resizeMode="stretch"
    >
      <Text style={styles.resultHeader}>
        {stages[currentStage]} RESULTS
      </Text>
    </ImageBackground>

    <Text style={styles.resultText}>
      First Hit Ground: {firstHitTime}
    </Text>

    <Text style={styles.resultText}>
      Stopped Moving: {stopMovingTime}
    </Text>

  </View>
)}
{!recordingComplete && (
  <>
<TouchableOpacity
  style={[
    styles.hitButton,
    (!isRecording || !!firstHitTime) && {
      opacity: 0.4,
    },
  ]}
  disabled={!isRecording || !!firstHitTime}    
onPress={() => {
  setFirstHitTime(
    formatTime(elapsedTime)
  );
}}
        >
          
          <Text style={styles.hitButtonText}>
            HIT GROUND
          </Text>
        </TouchableOpacity>
<TouchableOpacity
style={[
  styles.stopButton,
  (!isRecording || !firstHitTime || !!stopMovingTime) && {
    opacity: 0.4,
  },
]}
disabled={
  !isRecording ||
  !firstHitTime ||
  !!stopMovingTime
}
onPress={() => {

  const time =
    formatTime(elapsedTime);

  console.log(
    'STOPPED MOVING:',
    time
  );

  setStopMovingTime(time);

  setCanStopRecording(true);

  console.log(
    'can stop enabled'
  );

}}
>
          <Text style={styles.hitButtonText}>
            STOPPED MOVING
          </Text>
        </TouchableOpacity>
</>
)}

{recordingComplete && (
  <>
<Experiment1Observation
  inTarget={inTarget}
  setInTarget={setInTarget}
  bounced={bounced}
  setBounced={setBounced}

  dropHeight={Number(dropHeight)}

  firstHitTime={firstHitTime}
  stopMovingTime={stopMovingTime}
/>

    <TouchableOpacity
      style={[
        styles.hitButton,
        (inTarget === null ||
          bounced === null) && {
          opacity: 0.4,
        },
      ]}
      disabled={
        inTarget === null ||
        bounced === null
      }
      onPress={saveIteration}
    >
      <Text style={styles.hitButtonText}>
        SAVE ITERATION
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.stopButton}
onPress={() => {
  setCurrentVideoUri(null);

  setRecordingComplete(false);
  setCanStopRecording(false);

  setFirstHitTime(null);
  setStopMovingTime(null);

  setInTarget(null);
  setBounced(null);

  setElapsedTime(0);

  setHasStarted(true);
  setIsRecording(false);
}}
    >
      <Text style={styles.hitButtonText}>
        RETRY
      </Text>
    </TouchableOpacity>
  </>
)}

        

      </View>
    </>
  )
}

{!hasStarted && (
  <ExperimentTipCard
    tips={[
      'The timer continues running even if you exit the app. Complete all integrations before finishing.',
    ]}
  />
)}

        <ExitButton
          onPress={() =>
            router.back()
          }
        />
      </ScrollView>

<InfoModal
  visible={showInfo}
  title="HOW TO COMPLETE THIS ACTIVITY"
  instructions={[
    'Place the object at the drop height.',
    'Press Start Recording.',
    'Drop the object.',
    'Press Stop Recording.',
    'Review the recording.',
    'Determine the first hit time.',
    'Determine the stop moving time.',
    'Save Iteration.',
  ]}
  onClose={() =>
    setShowInfo(false)
  }
/>


</LinearGradient>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
},

  content: {
    paddingTop: hp(4),
    paddingBottom: hp(5),
  },

infoIcon: {
  width: rf(34),
  height: rf(34),
  resizeMode: 'contain',
},

infoButton: {
  position: 'absolute',
  top: hp(7),
  right: wp(6),
  zIndex: 999,
},

ribbonImage: {
  width: wp(70),

  height: hp(7),

  alignSelf: 'center',

  justifyContent: 'center',
  alignItems: 'center',
  marginTop: hp(-6),
  marginBottom:hp(2),
  zIndex:100
},
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.75)',
  justifyContent: 'center',
  alignItems: 'center',
  padding: wp(5),
},
ribbonContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',

  marginBottom: hp(1.5),
},

ribbonCenter: {
  backgroundColor: '#EC588C',

  minWidth: wp(55),

  paddingVertical: hp(0.8),
  paddingHorizontal: wp(4),

  justifyContent: 'center',
  alignItems: 'center',
},

ribbonLeft: {
  width: 0,
  height: 0,

  borderTopWidth: rf(10),
  borderBottomWidth: rf(10),
  borderRightWidth: rf(14),

  borderTopColor: 'transparent',
  borderBottomColor: 'transparent',
  borderRightColor: '#D94079',
},

ribbonRight: {
  width: 0,
  height: 0,

  borderTopWidth: rf(10),
  borderBottomWidth: rf(10),
  borderLeftWidth: rf(14),

  borderTopColor: 'transparent',
  borderBottomColor: 'transparent',
  borderLeftColor: '#D94079',
},

resultHeader: {
  color: '#FFFFFF',

  fontFamily: 'PixelOperator',

  fontSize: rf(21),

  textAlign: 'center',
  marginBottom:rf(10)
},
hitButton: {
  height: hp(6.5),

  borderRadius: rf(16),

  backgroundColor: '#ED359D',

  justifyContent: 'center',
  alignItems: 'center',
},

stopButton: {
  height: hp(6.5),

  borderRadius: rf(16),

  backgroundColor: '#5711BE',

  justifyContent: 'center',
  alignItems: 'center',
},

hitButtonText: {
  color: '#FFFFFF',

  fontFamily: 'Pixel',

  fontSize: rf(14),
},

frame: {
  backgroundColor: '#140B3A',

  borderWidth: 3,
  borderColor: '#7D5AC7',

  borderRadius: 0,

  paddingVertical: hp(2),
  paddingHorizontal: wp(4),

  position: 'relative',

  marginTop: hp(5),
},


resultText: {
  color: '#FFFFFF',

  fontFamily: 'PixelOperator',

  fontSize: rf(16),

  textAlign: 'center',

  lineHeight: rf(22),
},
heroDescription: {
  color: '#FFFFFF',
  fontSize: rf(15),
  fontFamily: 'PixelOperator',
  lineHeight: rf(22),
  width:rf(252)
},

pinkText: {
  color: '#EC588C',
},
modalCard: {
  width: '100%',
  backgroundColor: '#1A123D',
  borderRadius: rf(24),
  padding: wp(6),
  borderWidth: rf(2),
  borderColor: '#5711BE',
},
modalTitle: {
  color: '#FFD94E',
  fontSize: rf(19),
  fontFamily: 'Pixel',
  marginBottom: hp(2),
  textAlign: 'center',
  width:hp(36)
},
modalText: {
  color: 'white',
  fontSize: rf(15),
  lineHeight: rf(28),
  marginBottom: hp(0.8),
  fontFamily: 'PixelOperator',
},
closeButton: {
  marginTop: hp(2),
  height: hp(6.5),
  borderRadius: rf(16),
  backgroundColor: '#FF5AA9',
  justifyContent: 'center',
  alignItems: 'center',
},
retryButton: {
  marginTop: hp(1.5),

  height: hp(6.5),

  borderRadius: rf(16),

  backgroundColor: '#5711BE',

  justifyContent: 'center',
  alignItems: 'center',
},
closeText: {
  color: 'white',
  fontFamily: 'Pixel',
  fontSize: rf(15),
},

inputLabel: {
  color: '#FFD94E',
  marginTop: hp(1.5),
  marginBottom: hp(0.8),
  fontSize: rf(20),
  fontFamily: 'PixelOperator',
},

input: {
  height: hp(6),
  backgroundColor: '#2A1A55',
  borderRadius: rf(12),
  paddingHorizontal: wp(4),
  color: 'white',
  fontSize: rf(15),
  fontFamily: 'PixelOperator',
},
});