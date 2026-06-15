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

import { Timestamp } from 'firebase/firestore';

import ExitButton from '@/components/activity/ExitButton';
import ExperimentHero from '@/components/activity/ExperimentHero';
import ExperimentStats from '@/components/activity/ExperimentStats';
import ExperimentTipCard from '@/components/activity/ExperimentTipCard';
import InfoModal from '@/components/activity/InfoModal';

import { activities } from '@/data/activities';

import { auth } from '@/services/firebase/config';
import { saveIteration as saveIterationToFirestore } from '@/services/firebase/iterationService';
import { createSession } from '@/services/firebase/sessionService';
import { getTeamByID, updateTeamStreak } from '@/services/firebase/teamService';
import { getUserProfile } from '@/services/firebase/userService';

type ExperimentResult = {
  iterationNo: number;
  
  dominantReactionTime: number;
  nonDominantReactionTime: number;
  tracingAccuracy: number;
  tracingDelay: number;

  performanceScore: number;
};

const activity = activities.activity6;

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

export default function Activity6Experiment() {
  const [isUploading, setIsUploading] =
    useState(false);

  const [showInfo, setShowInfo] =
    useState(false);

  const [currentIteration, setCurrentIteration] =
    useState(1);

  const getIterationLabel = () => {
    return `MEMBER ${currentIteration}/${totalMembers}`;
  };

  const [totalMembers, setTotalMembers] =
    useState(1);

  const [memberCount, setMemberCount] = useState(1);

  const [experimentPhase, setExperimentPhase] =
    useState<
    | 'dominant'
    | 'nonDominant'
    | 'tracing'
    | 'results'
    >('dominant');

  const [
    dominantReactionTime,
    setDominantReactionTime
  ] = useState(0);

  const [
    nonDominantReactionTime,
    setNonDominantReactionTime
  ] = useState(0);

  const [tracingLayout, setTracingLayout] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const [target, setTarget] = useState({
    x: 150,
    y: 300,
  });

  const [fingerPos, setFingerPos] = useState({
    x: 0,
    y: 0,
  });

  const [traceErrors, setTraceErrors] = useState<number[]>([]);
  const [isTracing, setIsTracing] = useState(false);

  const [traceSamples, setTraceSamples] = useState(0);

  const [accurateFrames,
      setAccurateFrames] =
    useState(0);

  const [totalFrames,
      setTotalFrames] =
    useState(0);

  const [
    tracingAccuracy,
    setTracingAccuracy
  ] = useState(0);

  const [
    tracingDelay,
    setTracingDelay
  ] = useState(0);

  const [showTarget, setShowTarget] =
    useState(false);

  const [reactionStartTime,
    setReactionStartTime] =
    useState(0);
  
  const [traceTimeLeft, setTraceTimeLeft] = useState(10);

  const [waitingForTarget,
    setWaitingForTarget] =
    useState(false);

  const [performanceScore,
    setPerformanceScore] =
    useState(0);

//   const canStartTest =
//     movementType !== null;

  const [results, setResults] =
    useState<ExperimentResult[]>([]);
  

  // const [hasStarted, setHasStarted] =
  //   useState(false);

  // const [elapsedTime, setElapsedTime] =
  //   useState(0);

  const [timeLeft, setTimeLeft] =
    useState(12 * 60);

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

      const teamID = profile?.teamID;
      if(!teamID) return;

      const team = await getTeamByID(teamID);

      if (!team || !team.members) return;

      setTotalMembers(
        team.members.length
      )
    };

    checkTeam();
  }, []);

  useEffect(() => {
    const loadTeam = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const profile = await getUserProfile(uid);
      if (!profile?.teamID) return;

      const team = await getTeamByID(profile.teamID);

      if (team?.members) {
        setMemberCount(team.members.length);
      }
    };

    loadTeam();
  }, []);

  useEffect(() => {
    if (experimentPhase !== 'tracing') return;

    setTraceTimeLeft(10);

    const timer = setInterval(() => {
      setTraceTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishTracing();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [experimentPhase]);

  useEffect(() => {
    if (experimentPhase !== 'tracing') {
      setIsTracing(true);
    }

    setTraceErrors([]);
    setAccurateFrames(0);
    setTotalFrames(0);

    setIsTracing(true);

    let angle = 0;

    const interval = setInterval(() => {
      if (tracingLayout.width === 0 || tracingLayout.height === 0) {
        return; // ⛔ wait until layout is measured
      }

      angle += 0.05;

      const centerX = tracingLayout.width / 2;
      const centerY = tracingLayout.height / 2;
      const radius = Math.min(tracingLayout.width, tracingLayout.height) * 0.3;

      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      setTarget({ x, y });

      // update frame counter
      setTotalFrames(prev => prev + 1);

    }, 50);

    return () => clearInterval(interval);
  }, [experimentPhase]);

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

  const startDominantReactionTest =
    () => {
      setWaitingForTarget(true);

      const delay =
        Math.random() * 4000 + 1000;

      setTimeout(() => {
        setReactionStartTime(
          Date.now()
        );

        setShowTarget(true);

        setWaitingForTarget(false);
      }, delay);
    };

  const handleReactionTap =
    () => {
      const reactionTime =
        Date.now() -
        reactionStartTime;

      if (
        experimentPhase ===
        'dominant'
      ) {
        setDominantReactionTime(
          reactionTime
        );

        setExperimentPhase(
          'nonDominant'
        );
      } else {
        setNonDominantReactionTime(
          reactionTime
        );

        setExperimentPhase(
          'tracing'
        );
      }

      setShowTarget(false);
    };

  let lastUpdate = 0;
  const THROTTLE = 50;

  const recordTraceError = (x: number, y: number) => {
    const now = Date.now();
    if (now - lastUpdate < THROTTLE) return;
    lastUpdate = now;

    const dx = x - target.x;
    const dy = y - target.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    setTraceErrors(prev => [...prev, distance]);

    if (distance < 30) {
      setAccurateFrames(prev => prev + 1);
    }
  };

  const finishTracing = () => {
    const accuracy =
      traceSamples === 0
        ? 0
        : Math.round(
            (accurateFrames /
              totalFrames) *
              100
          );

    const avgError =
      traceErrors.length === 0
        ? 0
        : traceErrors.reduce(
            (a, b) => a + b,
            0
          ) / traceErrors.length;

    const delay = Math.round(avgError);

    setTracingAccuracy(accuracy);
    setTracingDelay(delay);

    const avgReaction =
      (dominantReactionTime +
        nonDominantReactionTime) /
      2;

    const reactionScore =
      Math.max(0, 100 - avgReaction / 5);

    const delayScore =
      Math.max(0, 100 - delay);

    const finalScore = Math.round(
      reactionScore * 0.3 +
        accuracy * 0.5 +
        delayScore * 0.2
    );

    setPerformanceScore(finalScore);

    const result: ExperimentResult = {
      iterationNo: currentIteration,
      dominantReactionTime,
      nonDominantReactionTime,
      tracingAccuracy: accuracy,
      tracingDelay: delay,
      performanceScore: finalScore,
    };

    setResults(prev => [...prev, result]);

    setExperimentPhase('results');
  };

  const saveIteration = async () => {
    if (isUploading) return;

    setIsUploading(true);

    try {
      const uid = auth.currentUser?.uid;
      if (!uid) throw new Error('No user logged in');

      const profile = await getUserProfile(uid);
      if (!profile?.teamID) throw new Error('Team ID missing');

      const teamID = profile.teamID;

      // -----------------------------
      // 1. Calculate experiment time
      // -----------------------------
      const experimentTime = (12 * 60) - timeLeft;

      const experimentScore = Math.min(50, experimentTime / 12);

      const totalScore = Math.round(experimentScore);

      // -----------------------------
      // 2. Create session in Firebase
      // -----------------------------
      const sessionID = await createSession({
        teamID,
        activityID: activity.id,
        experimentTime,
        pointsEarned: totalScore,
        completedAt: Timestamp.now(),

        totalIterations: results.length + 1,

        insights: {
          averageReactionTime:
            (dominantReactionTime + nonDominantReactionTime) / 2,

          tracingAccuracy,
          tracingDelay,
        },
      });

      // -----------------------------
      // 3. Save current iteration
      // -----------------------------
      await saveIterationToFirestore(sessionID, {
        iterationNo: currentIteration,
        data: {
          dominantReactionTime,
          nonDominantReactionTime,
          tracingAccuracy,
          tracingDelay,
          performanceScore,
        },
      });

      // -----------------------------
      // 4. Optional: update team streak
      // -----------------------------
      try {
        await updateTeamStreak(teamID);
      } catch (e) {
        console.log('Team streak update failed:', e);
      }

      // -----------------------------
      // 5. Navigate to results page
      // -----------------------------
      router.replace({
        pathname: '/activities/activity6/results',
        params: {
          sessionID,
          totalScore,
          totalIterations: results.length + 1,
          bestResult: JSON.stringify({
            iterationNo: currentIteration,
            dominantReactionTime,
            nonDominantReactionTime,
            tracingAccuracy,
            tracingDelay,
            performanceScore,
          }),
          results: JSON.stringify([
            ...results,
            {
              iterationNo: currentIteration,
              dominantReactionTime,
              nonDominantReactionTime,
              tracingAccuracy,
              tracingDelay,
              performanceScore,
            },
          ]),
        },
      });

    } catch (error) {
      console.log('SAVE ITERATION ERROR:', error);
      Alert.alert('Error', 'Failed to save experiment. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const nextIteration = () => {
    if(currentIteration>=totalMembers) {
      return;
    }

    setCurrentIteration(prev => prev+1);
    setExperimentPhase('dominant');

    setDominantReactionTime(0);

    setNonDominantReactionTime(0);

    setTracingAccuracy(0);

    setTracingDelay(0);

    setPerformanceScore(0);
  }

  const retryTest = () => {
    setExperimentPhase('dominant');

    // setMovementIntensity(0);

    // setAverageAngularVelocity(0);

    // setSpeed(0);

    // setSmoothness(0);

    // setRangeOfMotion(0);

    setPerformanceScore(0);
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
        scrollEnabled={experimentPhase !== 'tracing'}
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
              {experimentPhase === 'dominant' && (
                <>
                  <Text style={styles.phaseText}>
                    Phase 1 -{'\n'}
                  </Text>
                  Tap the screen as soon as the hidden button appears
                  <Text style={styles.pinkText}>
                    {' '}WITH YOUR DOMINANT HAND
                  </Text>
                  .
                </>
              )}

              {experimentPhase === 'nonDominant' && (
                <>
                  <Text style={styles.phaseText}>
                    Phase 2 -{'\n'}
                  </Text>
                  Tap the screen as soon as the hidden button appears
                  <Text style={styles.pinkText}>
                    {' '}WITH YOUR NON-DOMINANT HAND
                  </Text>
                  .
                </>
              )}

              {experimentPhase === 'tracing' && (
                <>
                  <Text style={styles.phaseText}>
                    Phase 3 -{'\n'}
                  </Text>
                  Trace the moving target
                  <Text style={styles.pinkText}>
                    {' '}AS ACCURATELY AS POSSIBLE
                  </Text>
                  .
                </>
              )}
            </Text>
          }
        />

        <ExperimentStats
          timeLeft={formatCountdown(timeLeft)}
          iteration={getIterationLabel()}
        />
        
        {(
          experimentPhase ===
            'dominant' ||
          experimentPhase ===
            'nonDominant'
        ) && (
          <View style={styles.card}>
            <View style={styles.header}>
              <View style={styles.leftContent}>
                <Text
                  style={styles.title}
                  numberOfLines={1}
                >
                  CAPTURE EXPERIMENT
                </Text>
              </View>
            </View>

            <View
              style={{
                paddingVertical: hp(10),
                paddingHorizontal: wp(10),
                alignItems: 'center'
              }}
            >
              {!showTarget &&
              !waitingForTarget && (
                <TouchableOpacity
                  style={styles.startButton}
                  onPress={
                    startDominantReactionTest
                  }
                >
                  <Text
                    style={styles.buttonText}
                  >
                    START TEST
                  </Text>
                </TouchableOpacity>
              )}

              {waitingForTarget && (
                <Text
                  style={styles.resultText}
                >
                  Wait...
                </Text>
              )}

              {showTarget && (
                <TouchableOpacity
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 75,
                    backgroundColor:
                      'red',
                  }}
                  onPress={
                    handleReactionTap
                  }
                />
              )}
            </View>
          </View>
        )}

        {experimentPhase === 'tracing' && (
          <View
            style={[styles.card, { overflow: 'hidden' }]}
            onLayout={(e) => {
              const { width, height, x, y } = e.nativeEvent.layout;

              setTracingLayout({ width, height, x, y });
            }}
          >
            <Text style={styles.title}>
              TRACING CHALLENGE
            </Text>

            <Text style={styles.title}>
              Time Left: {traceTimeLeft}s
            </Text>

            <View
              style={styles.tracingArea}
              onStartShouldSetResponder={() => true}
              onMoveShouldSetResponder={() => true}
              onResponderTerminationRequest={() => false}
              onResponderGrant={(e) => {
                const { locationX, locationY } =
                  e.nativeEvent;

                setTraceSamples(prev => prev + 1);
                recordTraceError(locationX, locationY);
              }}
              onResponderMove={(e) => {
                const { locationX, locationY } =
                  e.nativeEvent;
                
                setTraceSamples(prev => prev + 1);
                recordTraceError(locationX, locationY);
              }}
            >

              {/* MOVING TARGET */}
              <View
                style={[
                  styles.target,
                  {
                    left: target.x - 20,
                    top: target.y - 20,
                  }
                ]}
              />

              {/* USER TRACE DEBUG DOT */}
              {/* <View
                style={[
                  styles.finger,
                  {
                    left: fingerPos.x,
                    top: fingerPos.y,
                  }
                ]}
              /> */}
            </View>

            {/* <TouchableOpacity
              style={styles.button}
              onPress={finishTracing}
            >
              <Text style={styles.buttonText}>
                COMPLETE TRACING
              </Text>
            </TouchableOpacity> */}
          </View>
        )}

        {experimentPhase==='results' && (
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
                Dominant Hand:
                {dominantReactionTime} ms
              </Text>

              <Text style={styles.resultText}>
                Non-Dominant Hand:
                {nonDominantReactionTime} ms
              </Text>

              <Text style={styles.resultText}>
                Accuracy:
                {tracingAccuracy}%
              </Text>

              <Text style={styles.resultText}>
                Delay:
                {tracingDelay} ms
              </Text>

              <Text style={styles.resultText}>
                Performance Score:
                {performanceScore}
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

            {currentIteration < totalMembers && (
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
                onPress={nextIteration}
              >
                <Text style={styles.buttonText}>
                  NEXT MEMBER
                </Text>
              </TouchableOpacity>
            )}

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

  startButton: {
    height: hp(6.5),
    width: wp(75),

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

  phaseText: {
    color: '#4EA6FD',
    fontSize: rf(24)
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

  card: {
    marginHorizontal: wp(5),
    marginTop: hp(3),

    backgroundColor: '#02032A',

    borderRadius: rf(22),
    padding: wp(5),
    paddingTop:wp(6),
    borderWidth: rf(2),
    borderColor: '#3D438F',

    shadowColor: '#3D438F',
    shadowOpacity: 1,
    shadowRadius: rf(10),
    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 12,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  leftContent: {
    flex: 1,
    paddingRight: wp(3),
  },

  title: {
    color: '#FFE95B',
    fontSize: rf(14),
    fontFamily: 'Pixel',

    width: wp(70),
  },

  tracingArea: {
    width: '100%',
    height: Math.min(height * 0.45, 280),
    marginTop: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    overflow: 'hidden',
  },

  target: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'red',
  },

  finger: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'blue',
  },
});