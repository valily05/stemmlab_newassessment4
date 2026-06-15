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
import { Accelerometer } from 'expo-sensors';

import { Timestamp } from 'firebase/firestore';

import Activity4CaptureCard from '@/components/activity/Activity4CaptureCard';
import Activity4Observation from '@/components/activity/Activity4Observation';
import Activity4VibrationCard from '@/components/activity/Activity4VibrationCard';
import ExitButton from '@/components/activity/ExitButton';
import ExperimentHero from '@/components/activity/ExperimentHero';
import ExperimentStats from '@/components/activity/ExperimentStats';
import ExperimentTipCard from '@/components/activity/ExperimentTipCard';
import InfoModal from '@/components/activity/InfoModal';
import LiveTimerCard from '@/components/activity/LiveTimerCard';
import StopwatchCard from '@/components/activity/StopwatchCard';

import { activities } from '@/data/activities';

import { auth } from '@/services/firebase/config';
import { saveIteration as saveIterationToFirestore } from '@/services/firebase/iterationService';
import { createSession } from '@/services/firebase/sessionService';
import { updateTeamStreak } from '@/services/firebase/teamService';
import { getUserProfile } from '@/services/firebase/userService';

type ExperimentResult = {
  iterationNo: number;
  
  numberOfPillars: number;
  layerType:
    | 'Paper Folds'
    | 'Cardboard Folds'
    | 'Mixed';
  layerDesign: string;
  description: string;

  distanceMoved: number;
  movementLevel: 
    | 'No Movement'
    | 'Slight Movement'
    | 'Strong Shaking'
    | 'Structure Collapsed';

  avgAcceleration: number;
  maxAcceleration: number;

  stabilityScore: number;
}

const activity = activities.activity4;

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

const VIBRATION_DURATION = 10000;

export default function Activity4Experiment() {
  const [isUploading, setIsUploading] =
    useState(false);

  const [showInfo, setShowInfo] =
    useState(false);

  const [currentIteration, setCurrentIteration] =
    useState(1);

  const getIterationLabel = () => {
    return `ITERATION ${currentIteration}`;
  };

  const [currentStage, setCurrentStage] =
    useState(0);

  const [experimentPhase, setExperimentPhase] =
    useState<'setup'|'testing'|'observation'>('setup');

  const [isTesting, setIsTesting] = useState(false);

  const [distanceMoved, setDistanceMoved] = useState('');

  const [movementLevel, setMovementLevel] =
    useState<
      ExperimentResult['movementLevel'] | null
    >(null);

  const [numberOfPillars, setNumberOfPillars] = useState('');
  const [layerType, setLayerType] =
    useState<ExperimentResult['layerType'] | null>(null);
  const [layerDesign, setLayerDesign] = useState('');
  const [description, setDescription] = useState('');

  const [avgAcceleration, setAvgAcceleration] = useState(0);

  const [maxAcceleration, setMaxAcceleration] = useState(0);

  const [stabilityScore, setStabilityScore] = useState(0);

  const [readings,
    setReadings] =
    useState<number[]>([]);

  const canStartVibration =
    numberOfPillars.trim() !== '' &&
    layerType !== null &&
    layerDesign.trim() !== '' &&
    description.trim() !== '';

  const [results, setResults] =
    useState<ExperimentResult[]>([]);

  const startVibration = async () => {
    setExperimentPhase('testing');
    setIsTesting(true);

    setAvgAcceleration(0);
    setMaxAcceleration(0);
    setStabilityScore(0);

    const samples:number[] = [];

    Accelerometer.setUpdateInterval(100);

    let previousMagnitude = 0;

    const subscription =
      Accelerometer.addListener(
        data => {
          const magnitude =
            Math.sqrt(
              data.x * data.x +
              data.y * data.y +
              data.z * data.z
            );
          
          const movement =
            Math.abs(magnitude-previousMagnitude);

          previousMagnitude = magnitude;

          samples.push(magnitude);
        }
      );

    Vibration.vibrate(VIBRATION_DURATION);

    setTimeout(() => {

      subscription.remove();

      const avg =
        samples.reduce(
          (sum, value) =>
            sum + value,
          0
        ) / samples.length;

      const max =
        Math.max(...samples);

      const score =
        Math.max(
          0,
          Math.round(
            100 - avg * 15
          )
        );

      setAvgAcceleration(avg);
      setMaxAcceleration(max);
      setStabilityScore(score);

      setIsTesting(false);

      setExperimentPhase('observation');
    }, VIBRATION_DURATION);
  }

  // const [hasStarted, setHasStarted] =
  //   useState(false);

  // const [elapsedTime, setElapsedTime] =
  //   useState(0);

  const [timeLeft, setTimeLeft] =
    useState(20 * 60);

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

    const result = {
      iterationNo: currentIteration,

      numberOfPillars: Number(numberOfPillars),
      layerType: layerType!,
      layerDesign,
      description,

      distanceMoved: Number(distanceMoved),
      movementLevel: movementLevel!,

      avgAcceleration,
      maxAcceleration,
      stabilityScore
    };

    const updatedResults = [
      ...results,
      result,
    ];

    setResults(prev => [
      ...prev,
      result
    ]);

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

      // const inTargetCount =
      //   resultsWithUrls.filter(
      //     item => item.inTarget
      //   ).length;

      // const accuracy =
      //   totalIterations > 0
      //     ? Math.round(
      //         (inTargetCount /
      //           totalIterations) *
      //           100
      //       )
      //     : 0;

      const bestResult =
        resultsWithUrls.reduce(
          (best, current) => {
            if (!best) {
              return current;
            }

            if(current.stabilityScore > best.stabilityScore) {
              return current;
            }
            // const bestTarget =
            //   best.inTarget ? 1 : 0;

            // const currentTarget =
            //   current.inTarget ? 1 : 0;

            // if (
            //   currentTarget >
            //   bestTarget
            // ) {
            //   return current;
            // }

            // if (
            //   currentTarget === bestTarget &&
            //   current.dropTime > best.dropTime
            // ) {
            //   return current;
            // }

            return best;
          },
          null as ExperimentResult | null
        );
      
      // const accuracyScore =
      //   accuracy * 2.5;
      
      const movementRank = {
        'No Movement': 4,
        'Slight Movement': 3,
        'Strong Shaking': 2,
        'Structure Collapsed': 1,
      }

      const avgDistance = 
        resultsWithUrls.reduce(
          (sum, item) =>
            sum+item.distanceMoved,
          0
        ) / totalIterations;

      const mostStableLayerDesign =
        bestResult?.layerDesign ?? '';

      const lowestMovementLevel =
        resultsWithUrls.reduce(
          (best, current) => {
            if (
              movementRank[current.movementLevel] > movementRank[best.movementLevel]
            ) {
              return current;
            }

            return best;
          }
        ).movementLevel;

      const stabilityPoints =
        Math.min(
          500,
          bestResult
            ? bestResult.stabilityScore * 5
            : 0
        );

      const distancePoints =
        Math.max(
          0,
          250 - avgDistance * 5
        );

      let movementPoints = 0;

      switch (lowestMovementLevel) {
        case 'No Movement':
          movementPoints = 250;
          break;

        case 'Slight Movement':
          movementPoints = 180;
          break;

        case 'Strong Shaking':
          movementPoints = 80;
          break;

        case 'Structure Collapsed':
          movementPoints = 0;
          break;
      }
        
      const experimentTime = (60*20) - timeLeft;

      const experimentScore =
        Math.min(
          100,
          experimentTime / 200
        );
      
      const totalScore =
        Math.round(
          stabilityPoints +
          distancePoints +
          movementPoints +
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
            mostStableLayerDesign,
            shortestDistance:
              Math.min(
                ...resultsWithUrls.map(
                  r => r.distanceMoved
                )
              ),
            lowestMovementLevel,

            bestStability: bestResult?.stabilityScore ?? 0,
            avgDistance: Number(avgDistance.toFixed(2)),
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
            iterationNo: i,

            data: {
              numberOfPillars: result.numberOfPillars,
              layerType: result.layerType,
              layerDesign: result.layerDesign,
              description: result.description,

              distanceMoved: result.distanceMoved,
              movementLevel: result.movementLevel,

              avgAcceleration: result.avgAcceleration,
              maxAcceleration: result.maxAcceleration,
              stabilityScore: result.stabilityScore
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
          '/activities/activity4/results',
        params: {
          sessionID,
          totalScore,
          totalIterations,
          mostStableLayerDesign,
          shortestDistance:
            Math.min(
              ...resultsWithUrls.map(
                r => r.distanceMoved
              )
            ),
          lowestMovementLevel,
          bestStability: bestResult?.stabilityScore ?? 0,
          avgDistance: Number(avgDistance.toFixed(2)),
          bestResult: JSON.stringify(bestResult),
          results: JSON.stringify(resultsWithUrls),
        },
      });
    
  };

  const nextIteration = () => {
    setCurrentIteration(prev => prev+1);
    setExperimentPhase('setup');

    setDistanceMoved('');
    setMovementLevel(null);

    setNumberOfPillars('');
    setLayerType(null);
    setLayerDesign('');
    setDescription('');

    setAvgAcceleration(0);
    setMaxAcceleration(0);
    setStabilityScore(0);
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
              Build the{' '}
              <Text style={styles.pinkText}>
                ANTI-VIBRATION LAYER{' '}
              </Text>
              and activate the{' '}
              <Text style={styles.pinkText}>
                VIBRATION MODE
              </Text>
              .
            </Text>
          }
        />

        <ExperimentStats
          timeLeft={formatCountdown(timeLeft)}
          iteration={getIterationLabel()}
        />

        {/* <StopwatchCard /> */}

          
          {/* <LiveTimerCard
            time={'20:20'}
          /> */}
        
        {experimentPhase==='setup' && (
          <>
            <Activity4CaptureCard 
              numberOfPillars={numberOfPillars}
              setNumberOfPillars={setNumberOfPillars}
              layerType={layerType}
              setLayerType={setLayerType}
              layerDesign={layerDesign}
              setLayerDesign={setLayerDesign}
              description={description}
              setDescription={setDescription}
              onStartVibration={startVibration}
              isTesting={isTesting}
            />
          
            <View 
              style={styles.vibrationButtonArea}
            >
              <TouchableOpacity
                style={[
                  styles.stopButton,
                  !canStartVibration && {
                    opacity: 0.4,
                  },
                ]}
                onPress={() => {
                  Alert.alert(
                    'Ready to Start?',
                    'Is your anti-vibration setup finished and ready for earthquake?',
                    [
                      {
                        text: 'No',
                        style: 'cancel',
                      },
                      {
                        text: 'Yes',
                        onPress: startVibration,
                      },
                    ]
                  );
                }}
                disabled={!canStartVibration}
              >
                <Text style={styles.buttonText}>
                  START VIBRATION
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {experimentPhase==='testing' && (
          <Activity4VibrationCard />
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
                Average Acceleration: {avgAcceleration}
              </Text>

              <Text style={styles.resultText}>
                Maximum Acceleration: {maxAcceleration}
              </Text>
            </View>

            <Activity4Observation
              distanceMoved={distanceMoved}
              setDistanceMoved={setDistanceMoved}
              movementLevel={movementLevel}
              setMovementLevel={setMovementLevel}
              stabilityScore={stabilityScore}
              setStabilityScore={setStabilityScore}
            />

            <TouchableOpacity
              style={[
                styles.button,
                (
                  distanceMoved === '' ||
                  movementLevel === null
                ) && {
                  opacity: 0.4,
                },
              ]}
              disabled={
                distanceMoved === '' ||
                movementLevel === null
              }
              onPress={nextIteration}
            >
              <Text style={styles.buttonText}>
                NEXT ITERATION
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.stopButton}
              onPress={() => {
                setExperimentPhase('setup');

                setNumberOfPillars('');
                setLayerType(null);
                setLayerDesign('');
                setDescription('');

                setDistanceMoved('');
                setMovementLevel(null);

                setAvgAcceleration(0);
                setMaxAcceleration(0);
                setStabilityScore(0);

                setReadings([]);

                setIsTesting(false);
              }}
            >
              <Text style={styles.buttonText}>
                RETRY
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.finishButton,
                (
                  distanceMoved === '' ||
                  movementLevel === null ||
                  isUploading
                ) && {
                  opacity: 0.4,
                },
              ]}
              disabled={
                distanceMoved === '' ||
                movementLevel === null ||
                isUploading
              }
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

  vibrationButtonArea: {
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