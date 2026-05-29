// app/activities/activity1-experiment.tsx

import {
  useCameraPermissions,
} from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import CaptureExperimentCard from '../../components/activity/CaptureExperimentCard';
import ExitButton from '../../components/activity/ExitButton';
import ExperimentHero from '../../components/activity/ExperimentHero';
import ExperimentStats from '../../components/activity/ExperimentStats';
import ExperimentTipCard from '../../components/activity/ExperimentTipCard';
import InfoModal from '../../components/activity/InfoModal';
import LiveTimerCard from '../../components/activity/LiveTimerCard';
import StopwatchCard from '../../components/activity/StopwatchCard';
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

    const [showReview, setShowReview] =
  useState(false);

const [firstHitTime, setFirstHitTime] =
  useState<string | null>(null);

const [stopMovingTime, setStopMovingTime] =
  useState<string | null>(null);

  const [currentStage, setCurrentStage] =
    useState(0);

const [results, setResults] = useState<
  {
    stage: string;
    dropTime: number;
    firstHitTime: string;
    stopMovingTime: string;
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
const result = {
  stage: stages[currentStage],
  dropTime: elapsedTime,
  firstHitTime: firstHitTime ?? '',
  stopMovingTime: stopMovingTime ?? '',
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
setElapsedTime(0);
setIsRecording(false);
    } else {
      console.log(
        'Activity Complete',
        updatedResults
      );

      router.push(
        '/activities/activity1'
      );
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
          isRecording={
            isRecording
          }
          hasStarted={
            hasStarted
          }
onStart={async () => {

  if (!permission?.granted) {

    const result =
      await requestPermission();

    if (!result.granted) {
      return;
    }
  }

  setHasStarted(true);
  setIsRecording(true);
  setElapsedTime(0);

}}
onStop={() => {
  setIsRecording(false);
}}
onRetry={() => {
  setIsRecording(true);
  setElapsedTime(0);
}}
          onSaveIteration={
            saveIteration
          }
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

        <TouchableOpacity
          style={styles.hitButton}
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
          style={styles.stopButton}
          disabled={
            !isRecording ||
            !firstHitTime ||
            !!stopMovingTime
          }
          onPress={() => {
            setStopMovingTime(
              formatTime(elapsedTime)
            );

            setIsRecording(false);
          }}
        >
          <Text style={styles.hitButtonText}>
            STOPPED MOVING
          </Text>
        </TouchableOpacity>

        {firstHitTime && (
          <Text style={styles.resultText}>
            First Hit Ground:
            {' '}
            {firstHitTime}
          </Text>
        )}

        {stopMovingTime && (
          <Text style={styles.resultText}>
            Stopped Moving:
            {' '}
            {stopMovingTime}
          </Text>
        )}

      </View>
    </>
  )
}

{!hasStarted && (
  <ExperimentTipCard
    tips={[
      'Complete all iterations before finishing the experiment.',
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
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.75)',
  justifyContent: 'center',
  alignItems: 'center',
  padding: wp(5),
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

resultText: {
  color: '#FFD94E',

  fontFamily: 'PixelOperator',

  fontSize: rf(15),

  textAlign: 'center',
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