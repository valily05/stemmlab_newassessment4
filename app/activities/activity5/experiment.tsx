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
  Vibration,
  View
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Accelerometer, Gyroscope } from 'expo-sensors';

import { Timestamp } from 'firebase/firestore';

import Activity5CaptureCard from '@/components/activity/Activity5CaptureCard';
import Activity4Observation from '@/components/activity/Activity4Observation';
import Activity5TestCard from '@/components/activity/Activity5TestCard';
import ExitButton from '@/components/activity/ExitButton';
import ExperimentHero from '@/components/activity/ExperimentHero';
import ExperimentStats from '@/components/activity/ExperimentStats';
import ExperimentTipCard from '@/components/activity/ExperimentTipCard';
import InfoModal from '@/components/activity/InfoModal';

import { activities } from '@/data/activities';

import { auth } from '@/services/firebase/config';
import { saveIteration as saveIterationToFirestore } from '@/services/firebase/iterationService';
import { createSession } from '@/services/firebase/sessionService';
import { updateTeamStreak } from '@/services/firebase/teamService';
import { getUserProfile } from '@/services/firebase/userService';

type ExperimentResult = {
  iterationNo: number;
  
  movementType:
    | 'Arm Rotation'
    | 'Up and Down Motion'
    | 'Side Motion';

  movementIntensity: number;// g

  averageAngularVelocity: number;
  speed: number;// mm/s
  smoothness: number;//%
  rangeOfMotion: number;//degrees

  performanceScore: number;
};

const activity = activities.activity5;

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
  //'BASELINE',
  'PROTOTYPE 1',
  'PROTOTYPE 2',
  'PROTOTYPE 3',
];

export default function Activity5Experiment() {
  const [isUploading, setIsUploading] =
    useState(false);

  const [showInfo, setShowInfo] =
    useState(false);

  const [currentIteration, setCurrentIteration] =
    useState(1);

  const getIterationLabel = () => {
    return `ITERATION ${currentIteration}`;
  };

  const [experimentPhase, setExperimentPhase] =
    useState<'setup'|'testing'|'observation'>('setup');

  const [isTesting, setIsTesting] = useState(false);

  const [movementType, setMovementType] =
    useState<
      | 'Arm Rotation'
      | 'Up and Down Motion'
      | 'Side Motion'
      | null
    >(null);

  const [notes, setNotes] =
    useState('');

  const [movementIntensity,
    setMovementIntensity] =
    useState(0);

  const [speed, setSpeed] =
    useState(0);

  const [averageAngularVelocity,
    setAverageAngularVelocity] =
    useState(0);

  const [smoothness, setSmoothness] =
    useState(0);

  const [rangeOfMotion,
    setRangeOfMotion] =
    useState(0);

  const [performanceScore,
    setPerformanceScore] =
    useState(0);

  const [readings,
    setReadings] =
    useState<number[]>([]);

  const canStartTest =
    movementType !== null;

  const [results, setResults] =
    useState<ExperimentResult[]>([]);

  const TEST_DURATION = 10000;

  const startTest = async () => {
    setExperimentPhase('testing');
    setIsTesting(true);

    setMovementIntensity(0);
    setSpeed(0);
    setSmoothness(0);
    setRangeOfMotion(0);
    setPerformanceScore(0);

    const accelSamples:number[] = [];
    const gyroSamples:number[] = [];

    // let maxMagnitude = 0;
    // let minMagnitude = Number.MAX_VALUE;

    let totalJerk = 0;
    let previousAccel = 0;
    let accumulatedAngle = 0;

    Accelerometer.setUpdateInterval(100);
    Gyroscope.setUpdateInterval(100);

    const accelSubscription =
      Accelerometer.addListener(
        data => {
          const magnitude =
            Math.sqrt(
              data.x * data.x +
              data.y * data.y +
              data.z * data.z
            );

          accelSamples.push(magnitude);

          totalJerk +=
            Math.abs(
              magnitude -
              previousAccel
            );

          previousAccel = magnitude;
        }
      );

    const gyroSubscription =
      Gyroscope.addListener(data => {

        const angularVelocity =
          Math.sqrt(
            data.x * data.x +
            data.y * data.y +
            data.z * data.z
          );

        gyroSamples.push(
          angularVelocity
        );

        accumulatedAngle +=
          angularVelocity * 0.1;
      });

    setTimeout(() => {
      accelSubscription.remove();
      gyroSubscription.remove();

      if (accelSamples.length === 0 ||
      gyroSamples.length === 0) {
        setIsTesting(false);
        setExperimentPhase('observation');
        return;
      }

      const avgAcceleration =
        accelSamples.reduce(
          (sum, value) =>
            sum + value,
          0
        ) / accelSamples.length;

      const avgAngularVelocity =
        gyroSamples.reduce(
          (sum, value) =>
            sum + value,
          0
        ) / gyroSamples.length;

      const speedValue =
        Math.round(
          avgAngularVelocity *
          60
        );

      const smoothnessValue =
        Math.max(
          0,
          Math.min(
            100,
            Math.round(
              100 -
              totalJerk /
                accelSamples.length *
                15
            )
          )
        );

      const rangeValue =
        Math.round(
          accumulatedAngle *
          (180 / Math.PI)
        );

      const performanceValue =
        Math.round(
          speedValue * 0.25 +
          smoothnessValue * 0.40 +
          Math.min(
            rangeValue,
            180
          ) * 0.35
        );

      setMovementIntensity(
        Number(
          avgAcceleration.toFixed(2)
        )
      );

      setAverageAngularVelocity(
        Number(
          avgAngularVelocity.toFixed(2)
        )
      );

      setSpeed(speedValue);

      setSmoothness(
        smoothnessValue
      );

      setRangeOfMotion(
        rangeValue
      );

      setPerformanceScore(
        performanceValue
      );

      setIsTesting(false);

      setExperimentPhase(
        'observation'
      );
    }, TEST_DURATION);
  }

  // const [hasStarted, setHasStarted] =
  //   useState(false);

  // const [elapsedTime, setElapsedTime] =
  //   useState(0);

  const [timeLeft, setTimeLeft] =
    useState(10 * 60);

  useEffect(() => {
    const checkTeam = async () => {
      const uid = auth.currentUser?.uid;

      if(!uid) return;

      const profile = await getUserProfile(uid);

      if(!profile?.teamID) {
        Alert.alert(
          'Join a Team First',
          'You must join a team before starting activities.',
          [
            {
              text: 'Go to Teams',
              onPress: () => router.replace('/team')
            },
          ]
        );
      }
    };

    checkTeam();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev =>
        prev > 0 ? prev - 1 : 0
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft !== 0) return;

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
  }, [timeLeft]);

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

  // const formatTime = (
  //   milliseconds: number
  // ) => {
  //   const mins = Math.floor(
  //     milliseconds / 60000
  //   );

  //   const secs = Math.floor(
  //     (milliseconds % 60000) / 1000
  //   );

  //   const centiseconds = Math.floor(
  //     (milliseconds % 1000) / 10
  //   );

  //   return `${String(mins).padStart(
  //     2,
  //     '0'
  //   )}:${String(secs).padStart(
  //     2,
  //     '0'
  //   )}.${String(
  //     centiseconds
  //   ).padStart(2, '0')}`;
  // };

  const uid = auth.currentUser?.uid;

  const saveIteration = async () => {
    if (isUploading) return;

    // const parseTime = (value: string | null) => {
    //   if (!value) return 0;

    //   const [minSec, centi] = value.split('.');
    //   const [min, sec] = minSec.split(':');

    //   return (
    //     Number(min) * 60 +
    //     Number(sec) +
    //     Number(centi) / 100
    //   );
    // };

    const result: ExperimentResult = {
      iterationNo: currentIteration,

      movementType: movementType!,

      movementIntensity,
      averageAngularVelocity,
      speed,
      smoothness,
      rangeOfMotion,

      performanceScore,
    };

    const updatedResults = [
      ...results,
      result,
    ];

    // setResults(prev => [
    //   ...prev,
    //   result
    // ]);

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
            return {
              ...result,
            };
          }
        )
      );

    console.log(
      'UPLOADED RESULTS:',
      resultsWithUrls
    );

    setIsUploading(false);

      //setHasStarted(false);
      
      // console.log(
      //   'RESULTS SENT TO RESULTS PAGE:',
      //   resultsWithUrls
      // );

    const totalIterations = resultsWithUrls.length;

      const fastestSpeed =
        Math.max(
          ...updatedResults.map(
            r => r.speed
          )
        );

      const highestSmoothness =
        Math.max(
          ...updatedResults.map(
            r => r.smoothness
          )
        );

      const largestRangeOfMotion =
        Math.max(
          ...updatedResults.map(
            r => r.rangeOfMotion
          )
        );

      const bestPerformanceScore =
        Math.max(
          ...updatedResults.map(
            r => r.performanceScore
          )
        );

      const bestResult =
        resultsWithUrls.reduce(
          (best, current) => {
            if (!best) {
              return current;
            }

            if (
              current.performanceScore >
              best.performanceScore
            ) {
              return current;
            }

            return best;
          },
          null as ExperimentResult | null
        );
      
      const speedPoints =
        Math.min(
          250,
          fastestSpeed * 2.5
        );

      const smoothnessPoints =
        Math.min(
          300,
          highestSmoothness * 3
        );

      const rangePoints =
        Math.min(
          250,
          largestRangeOfMotion * 1.5
        );

      const performancePoints =
        Math.min(
          150,
          bestPerformanceScore * 1.5
        );
        
      const experimentTime = (60*10) - timeLeft;

      const experimentScore =
        Math.min(
          50,
          experimentTime / 12
        );
      
      const totalScore =
        Math.round(
          speedPoints +
          smoothnessPoints +
          rangePoints +
          performancePoints +
          experimentScore
        );

      console.log('Creating session');
      const sessionID = 
        await createSession({
          teamID,
          activityID: activity.id,
          experimentTime,
          totalIterations,
          pointsEarned: totalScore,
          completedAt: Timestamp.now(),

          insights: {
            fastestSpeed,
            highestSmoothness,
            largestRangeOfMotion,
            bestPerformanceScore,
          },
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
            iterationNo: i+1,

            data: {
              movementType:
                result.movementType,

              movementIntensity:
                result.movementIntensity,

              averageAngularVelocity:
                result.averageAngularVelocity,

              speed:
                result.speed,

              smoothness:
                result.smoothness,

              rangeOfMotion:
                result.rangeOfMotion,

              performanceScore:
                result.performanceScore,
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
          '/activities/activity5/results',
        params: {
          sessionID,
          totalScore,
          totalIterations,
          fastestSpeed,
          highestSmoothness,
          largestRangeOfMotion,
          bestPerformanceScore,
          bestResult: JSON.stringify(bestResult),
          results: JSON.stringify(resultsWithUrls),
        },
      });
    
  };

  const nextIteration = () => {
    setCurrentIteration(prev => prev+1);
    setExperimentPhase('setup');

    setMovementType(null);

    setMovementIntensity(0);

    setAverageAngularVelocity(0);

    setSpeed(0);

    setSmoothness(0);

    setRangeOfMotion(0);

    setPerformanceScore(0);

    setReadings([]);
  }

  const retryTest = () => {
    setExperimentPhase('setup');

    setMovementIntensity(0);

    setAverageAngularVelocity(0);

    setSpeed(0);

    setSmoothness(0);

    setRangeOfMotion(0);

    setPerformanceScore(0);

    setReadings([]);

    setIsTesting(false);
  }

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
          activityID={activity.id}
          title={activity.title}
          description={
            <Text style={styles.heroDescription}>
              Choose the{' '}
              <Text style={styles.pinkText}>
                MOVEMENT TYPE{' '}
              </Text>
              and start the{' '}
              <Text style={styles.pinkText}>
                MOVEMENT
              </Text>
              .
            </Text>
          }
        />

        <ExperimentStats
          timeLeft={formatCountdown(timeLeft)}
          iteration={getIterationLabel()}
        />
        
        {experimentPhase==='setup' && (
          <>
            <Activity5CaptureCard 
              movementType={movementType}
              setMovementType={setMovementType}
              isTesting={isTesting}
            />
          
            <View 
              style={styles.movementButtonArea}
            >
              <TouchableOpacity
                style={[
                  styles.stopButton,
                  !canStartTest && {
                    opacity: 0.4,
                  },
                ]}
                onPress={() => {
                  Alert.alert(
                    'Ready to Start?',
                    'Are you ready to start the movement?',
                    [
                      {
                        text: 'No',
                        style: 'cancel',
                      },
                      {
                        text: 'Yes',
                        onPress: startTest,
                      },
                    ]
                  );
                }}
                disabled={!canStartTest}
              >
                <Text style={styles.buttonText}>
                  START MOVEMENT
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {experimentPhase==='testing' && (
          <Activity5TestCard />
        )}

        {experimentPhase==='observation' && (
          <View
            style={{
              marginHorizontal: wp(5),
              marginTop: hp(2),
              gap: hp(1.5),
            }}
          >
            <View style={styles.frame}>
              <ImageBackground
                source={require('@/assets/images/Group 224.png')}
                style={styles.ribbonImage}
                resizeMode="stretch"
              >
                <Text style={styles.resultHeader}>
                  ITERATION {currentIteration} RESULTS
                </Text>
              </ImageBackground>

              <Text style={styles.resultText}>
                Movement Type: {movementType}
              </Text>

              <Text style={styles.resultText}>
                Movement Intensity: {movementIntensity} g
              </Text>

              <Text style={styles.resultText}>
                Average Rotation: {averageAngularVelocity} rad/s
              </Text>

              <Text style={styles.resultText}>
                Speed: {speed}°/s
              </Text>

              <Text style={styles.resultText}>
                Smoothness: {smoothness}%
              </Text>

              <Text style={styles.resultText}>
                Range of Motion: {rangeOfMotion}°
              </Text>

              <Text style={styles.resultText}>
                Performance Score: {performanceScore}
              </Text>
            </View>

            {/* <Activity4Observation
              distanceMoved={distanceMoved}
              setDistanceMoved={setDistanceMoved}
              movementLevel={movementLevel}
              setMovementLevel={setMovementLevel}
              stabilityScore={stabilityScore}
              setStabilityScore={setStabilityScore}
            /> */}

            <TouchableOpacity
              style={[
                styles.button,
                // (
                //   // distanceMoved === '' ||
                //   // movementLevel === null
                // ) && {
                //   opacity: 0.4,
                // },
              ]}
              // disabled={
              //   // distanceMoved === '' ||
              //   // movementLevel === null
              // }
              onPress={nextIteration}
            >
              <Text style={styles.buttonText}>
                NEXT ITERATION
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.stopButton}
              onPress={retryTest}
            >
              <Text style={styles.buttonText}>
                RETRY
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.finishButton,
                // (
                //   distanceMoved === '' ||
                //   movementLevel === null ||
                //   isUploading
                // ) && {
                //   opacity: 0.4,
                // },
              ]}
              // disabled={
              //   distanceMoved === '' ||
              //   movementLevel === null ||
              //   isUploading
              // }
              onPress={saveIteration}
            >
              {isUploading ? (
                <>
                  <ActivityIndicator color="#FFF" />
                  <Text style={styles.buttonText}>
                    UPLOADING ...
                  </Text>
                </>
              ) : (
                <Text style={styles.buttonText}>
                  FINISH EXPERIMENT
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
        
        <ExperimentTipCard
          tips={[
            'The timer continues running even if you exit the app. Complete all integrations before finishing.',
          ]}
        />
        
        <ExitButton
          onPress={() =>
            router.back()
          }
        />
      </ScrollView>

      <InfoModal
        visible={showInfo}
        title="HOW TO COMPLETE THIS ACTIVITY"
        instructions={activity.instructions}
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

  button: {
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

  buttonText: {
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

  movementButtonArea: {
    marginHorizontal: wp(5),
    marginTop: hp(2),
    gap: hp(1.5),
  },

  retryButton: {
    marginTop: hp(1.5),

    height: hp(6.5),

    borderRadius: rf(16),

    backgroundColor: '#5711BE',

    justifyContent: 'center',
    alignItems: 'center',
  },

  finishButton: {
    marginTop: hp(1.5),

    height: hp(6.5),

    borderRadius: rf(16),

    backgroundColor: '#44963A',

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