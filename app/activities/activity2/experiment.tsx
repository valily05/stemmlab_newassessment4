import {
  useCameraPermissions,
} from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
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

import { Timestamp } from 'firebase/firestore';

import ExitButton from '@/components/activity/ExitButton';
import Experiment1Observation from '@/components/activity/Experiment1Observation';
import ExperimentHero from '@/components/activity/ExperimentHero';
import ExperimentStats from '@/components/activity/ExperimentStats';
import ExperimentTipCard from '@/components/activity/ExperimentTipCard';
import InfoModal from '@/components/activity/InfoModal';
import LiveTimerCard from '@/components/activity/LiveTimerCard';
import LocationHowItWorks from '@/components/activity/LocationHowItWorks';
import SoundExperimentCard from '@/components/activity/SoundExperimentCard';

import { activities } from '@/data/activities';

import { uploadVideoToCloudinary } from '@/services/cloudinary';
import { auth } from '@/services/firebase/config';
import { saveIteration as saveIterationToFirestore } from '@/services/firebase/iterationService';
import { createSession } from '@/services/firebase/sessionService';
import { updateTeamStreak } from '@/services/firebase/teamService';
import { getUserProfile } from '@/services/firebase/userService';

type ExperimentResult = {
  stage: string;

  dropTime: number;

  firstHitTime: string;
  stopMovingTime: string;

  velocity: number;
  acceleration: number;
  gForce: number;

  dropHeight: number;
  objectWeight: number;

  inTarget: boolean | null;
  bounced: boolean | null;

  impactForce: string;

  videoUri?: string;
  videoURL?: string;
}

const activity = activities.activity2;

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
  'LOCATION',
  'TALKING',
  'DROP OBJECT',
  'STMOMP',
];

export default function Activity2Experiment() {
  const [isUploading, setIsUploading] =
    useState(false);

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

        velocity: number;
        acceleration: number;
        gForce: number;

        dropHeight: number;
        weight: number;
        impactForce: string;

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

  const [canStopRecording, setCanStopRecording] =
    useState(false);

  const [recordingComplete, setRecordingComplete] =
    useState(false);

  const [dropHeight, setDropHeight] =
    useState('');

  const [objectWeight, setObjectWeight] =
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

  useEffect(() => {
    if (!hasStarted) return;

    const timer = setInterval(() => {
      setTimeLeft(prev =>
        prev > 0 ? prev - 1 : 0
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted]);

  useEffect(() => {
    if (timeLeft !== 0) return;

    if (!hasStarted) return;

    setIsRecording(false);

    Alert.alert(
      'MISSION FAILED',
      'You ran out of time!',
      [
        {
          text: 'GO HOME',
          onPress: () =>
            router.replace('/'),
        },
      ],
      { cancelable: false }
    );
  }, [timeLeft, hasStarted]);

  const formatCountdown = (
    seconds: number
  ) => {
    const mins = Math.floor(
      seconds / 60
    );

    const secs = seconds % 60;

    return `${String(mins).padStart(
      2,
      '0'
    )}:${String(secs).padStart(
      2,
      '0'
    )}`;
  };

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

  const uid = auth.currentUser?.uid;

  const saveIteration = async () => {
    if (isUploading) return;

    const parseTime = (value: string | null) => {
      if (!value) return 0;

      const [minSec, centi] = value.split('.');
      const [min, sec] = minSec.split(':');

      return (
        Number(min) * 60 +
        Number(sec) +
        Number(centi) / 100
      );
    };

    const first = parseTime(firstHitTime);
    const stop = parseTime(stopMovingTime);

    const contactTime = Math.max(
      stop - first,
      0.01
    );

    const heightMeters =
      Number(dropHeight);

    const velocity = Math.sqrt(
      2 * 9.81 * heightMeters
    );

    const acceleration =
      velocity / contactTime;

    const gForce =
      velocity /
      (contactTime * 9.81);

    let impactForce = 'SAFE';

    if (
      gForce >= 5 &&
      gForce < 10
    ) {
      impactForce = 'CAUTION';
    }

    if (
      gForce >= 10 &&
      gForce < 30
    ) {
      impactForce = 'HIGH';
    }

    if (
      gForce >= 30 &&
      gForce < 50
    ) {
      impactForce = 'SEVERE';
    }

    if (gForce >= 50) {
      impactForce = 'EXTREME';
    }

    const result = {
      stage: stages[currentStage],

      dropTime: elapsedTime,

      firstHitTime: firstHitTime ?? '',
      stopMovingTime: stopMovingTime ?? '',

      velocity,
      acceleration,
      gForce,

      dropHeight: Number(dropHeight),

      weight: Number(objectWeight),

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

    if(currentStage < stages.length - 1) {
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
      setIsUploading(true);

      const profile = await getUserProfile(uid!);

      if(!profile) {
        throw new Error('User profile not found');
      }

      const teamID = profile?.teamID;

      if(!teamID) {
        throw new Error('Team ID missing');
      }

      const resultsWithUrls =
        await Promise.all(
          updatedResults.map(
            async result => {
              let videoURL = '';

              if (result.videoUri) {
                videoURL =
                  await uploadVideoToCloudinary(
                    result.videoUri
                  );
              }

              return {
                ...result,
                videoURL,
              };
            }
          )
        );

      console.log(
        'UPLOADED RESULTS:',
        resultsWithUrls
      );

      setIsUploading(false);

      setHasStarted(false);
      setIsRecording(false);

      // console.log(
      //   'RESULTS SENT TO RESULTS PAGE:',
      //   resultsWithUrls
      // );

      const totalIterations = resultsWithUrls.length;

      const inTargetCount =
        resultsWithUrls.filter(
          item => item.inTarget
        ).length;

      const accuracy =
        totalIterations > 0
          ? Math.round(
              (inTargetCount /
                totalIterations) *
                100
            )
          : 0;

      const bestResult =
        resultsWithUrls.reduce(
          (best, current) => {
            if (!best) {
              return current;
            }

            const bestTarget =
              best.inTarget ? 1 : 0;

            const currentTarget =
              current.inTarget ? 1 : 0;

            if (
              currentTarget >
              bestTarget
            ) {
              return current;
            }

            if (
              currentTarget === bestTarget &&
              current.dropTime > best.dropTime
            ) {
              return current;
            }

            return best;
          },
          null as any
        );
      
      const impactScore =
        bestResult?.impactForce === 'SAFE'
          ? 500
          : bestResult?.impactForce === 'CAUTION'
          ? 400
          : bestResult?.impactForce === 'HIGH'
          ? 250
          : bestResult?.impactForce === 'SEVERE'
          ? 100
          : 0;
      
      const accuracyScore =
        accuracy * 2.5;

      const dropTimeScore =
        Math.min(
          150,
          bestResult
            ? bestResult.dropTime / 50
            : 0
        );
      
      const experimentTime = (60*20) - timeLeft;

      const experimentScore =
        Math.min(
          100,
          experimentTime / 200
        );
      
      const totalScore =
        Math.round(
          impactScore +
          accuracyScore +
          dropTimeScore +
          experimentScore
        );

      console.log('Creating session');
      const sessionID = 
        await createSession({
          teamID,
          activityID: 2,
          experimentTime,
          totalIterations,
          pointsEarned: totalScore,
          completedAt: Timestamp.now(),

          insights: {
            bestTime: bestResult.dropTime,
            avgAccuracy: accuracy,
          }
        });
      console.log('Session created:', sessionID);

      for(
        let i=0;
        i<resultsWithUrls.length;
        i++
      ) {
        const result = resultsWithUrls[i];

        console.log('Saving iteration', i);
        await saveIterationToFirestore(
          sessionID,
          {
            iterationNo: i,
            videoURL: result.videoURL,

            data: {
              dropTime: result.dropTime,
              firstHitTime: result.firstHitTime,
              stopMovingTime: result.stopMovingTime,
              velocity: result.velocity,
              acceleration: result.acceleration,
              gForce: result.gForce,
              impactForce: result.impactForce,
              dropHeight: result.dropHeight,
              objectWeight: result.weight,
              inTarget: result.inTarget,
              bounced: result.bounced,
            }
          }
        );
        console.log('Iteration saved', i);
      }

      if (teamID) {
        console.log("Updating team streak...");

        try {
          await updateTeamStreak(teamID);
          console.log("Team streak updated");
        } catch (e) {
          console.log("TEAM STREAK ERROR:", e);
        }
      }

      console.log("Going to results page");

      router.replace({
        pathname:
          '/activities/activity2/results',
        params: {
          sessionID,
          totalScore,
          totalIterations,
          accuracy,
          bestResult: JSON.stringify(bestResult),
          results: JSON.stringify(resultsWithUrls),
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
            source={require('@/assets/images/info-icon.png')}
            style={styles.infoIcon}
          />
        </TouchableOpacity>

        <ExperimentHero
          title={activity.title}
            image={require('@/assets/images/sound-bunny.png')}
             imageStyle={{
        width: wp(39),
        height: hp(20),
        right: -wp(9),
    }}
            activityNumber={2}
          description={
            currentStage === 0 ? (
<Text style={styles.heroDescription}>
  Measure the{' '}
  <Text style={styles.pinkText}>
    SOUND LEVEL
  </Text>{' '}
  produced by each activity.
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
          timeLeft={formatCountdown(timeLeft)}
          iteration={stages[currentStage]}
        />

        <SoundExperimentCard
          isRecording={isRecording}
          hasStarted={hasStarted}
          canStopRecording={canStopRecording}
          videoUri={currentVideoUri}
          dropHeight={dropHeight}
          setDropHeight={setDropHeight}
          objectWeight={objectWeight}
          setObjectWeight={setObjectWeight}
          onStartRecording={startRecording}

          onVideoSaved={(url) => {
            setCurrentVideoUri(url);
            setVideos(prev => [
              ...prev,
              url,
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

        {!hasStarted ? (
          <LocationHowItWorks/>
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
                  source={require('@/assets/images/Group 224.png')}
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
                firstHitTime={firstHitTime}
                stopMovingTime={stopMovingTime}
                dropHeight={Number(dropHeight)}
              />

              <TouchableOpacity
                style={[
                  styles.hitButton,
                  (
                    inTarget === null ||
                    bounced === null ||
                    isUploading
                  ) && {
                    opacity: 0.4,
                  },
                ]}
                disabled={
                  inTarget === null ||
                  bounced === null ||
                  isUploading
                }
                onPress={saveIteration}
              >
                {isUploading ? (
                  <>
                    <ActivityIndicator color="#FFF" />
                    <Text style={styles.hitButtonText}>
                      UPLOADING ...
                    </Text>
                  </>
                ) : (
                  <Text style={styles.hitButtonText}>
                    SAVE ITERATION
                  </Text>
                )}
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
        )}

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