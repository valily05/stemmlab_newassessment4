// app/activities/activity1-experiment.tsx

import { router } from 'expo-router';
import { useEffect, useState } from 'react';

import {
  Dimensions,
  Modal,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import CaptureExperimentCard from '../../components/activity/CaptureExperimentCard';
import ExitButton from '../../components/activity/ExitButton';
import ExperimentHero from '../../components/activity/ExperimentHero';
import ExperimentStats from '../../components/activity/ExperimentStats';
import ExperimentTipCard from '../../components/activity/ExperimentTipCard';
import LiveTimerCard from '../../components/activity/LiveTimerCard';

const { height } = Dimensions.get('window');

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
  const [showInfo, setShowInfo] =
    useState(false);

  const [currentStage, setCurrentStage] =
    useState(0);

  const [results, setResults] = useState<
    {
      stage: string;
      time: number;
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
        setElapsedTime(prev => prev + 1);

        setTimeLeft(prev =>
          prev > 0 ? prev - 1 : 0
        );
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRecording]);

  const formatTime = (
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

  const saveIteration = () => {
    const result = {
      stage:
        stages[currentStage],
      time: elapsedTime,
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

      setElapsedTime(0);
      setHasStarted(false);
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
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.content
        }
      >
        <TouchableOpacity
          style={styles.infoButton}
          onPress={() =>
            setShowInfo(true)
          }
        >
          <Text style={styles.infoIcon}>
            ⓘ
          </Text>
        </TouchableOpacity>

        <ExperimentHero
          title="PARACHUTE DROP CHALLENGE"
          description={
            currentStage === 0
              ? 'Drop the toy WITHOUT a parachute.'
              : 'Drop the toy WITH your parachute design.'
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
          onStart={() => {
            setHasStarted(true);
            setIsRecording(true);
            setElapsedTime(0);
          }}
          onStop={() => {
            setIsRecording(false);
          }}
          onRetry={() => {
            setHasStarted(false);
            setIsRecording(false);
            setElapsedTime(0);
          }}
          onSaveIteration={
            saveIteration
          }
        />

        <LiveTimerCard
          time={formatTime(
            elapsedTime
          )}
          isRecording={
            isRecording
          }
        />

        <ExperimentTipCard
          tips={[
            currentStage === 0
              ? 'This is the baseline test. Do not attach the parachute.'
              : 'Use your parachute design for this test.',
            `Current Stage: ${stages[currentStage]}`,
          ]}
        />

        <ExitButton
          onPress={() =>
            router.back()
          }
        />
      </ScrollView>

      <Modal
        visible={showInfo}
        transparent
        animationType="fade"
      >
        <View
          style={
            styles.modalOverlay
          }
        >
          <View
            style={styles.modalCard}
          >
            <Text
              style={
                styles.modalTitle
              }
            >
              {stages[currentStage]}
            </Text>

            {currentStage === 0 ? (
              <>
                <Text
                  style={
                    styles.modalText
                  }
                >
                  1. Do not attach
                  the parachute.
                </Text>

                <Text
                  style={
                    styles.modalText
                  }
                >
                  2. Place the toy
                  at the drop height.
                </Text>

                <Text
                  style={
                    styles.modalText
                  }
                >
                  3. Press Start
                  Recording.
                </Text>

                <Text
                  style={
                    styles.modalText
                  }
                >
                  4. Drop the toy.
                </Text>

                <Text
                  style={
                    styles.modalText
                  }
                >
                  5. Press Stop
                  Recording.
                </Text>

                <Text
                  style={
                    styles.modalText
                  }
                >
                  6. Save Iteration.
                </Text>
              </>
            ) : (
              <>
                <Text
                  style={
                    styles.modalText
                  }
                >
                  1. Attach your
                  parachute.
                </Text>

                <Text
                  style={
                    styles.modalText
                  }
                >
                  2. Use the same
                  drop height.
                </Text>

                <Text
                  style={
                    styles.modalText
                  }
                >
                  3. Press Start
                  Recording.
                </Text>

                <Text
                  style={
                    styles.modalText
                  }
                >
                  4. Drop the toy.
                </Text>

                <Text
                  style={
                    styles.modalText
                  }
                >
                  5. Press Stop
                  Recording.
                </Text>

                <Text
                  style={
                    styles.modalText
                  }
                >
                  6. Save Iteration.
                </Text>
              </>
            )}

            <TouchableOpacity
              style={
                styles.closeButton
              }
              onPress={() =>
                setShowInfo(false)
              }
            >
              <Text
                style={
                  styles.closeText
                }
              >
                GOT IT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13082E',
  },

  content: {
    paddingTop: hp(4),
    paddingBottom: hp(5),
  },

  infoButton: {
    position: 'absolute',
    top: hp(1),
    right: 20,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#5711BE',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },

  infoIcon: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor:
      'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalCard: {
    width: '100%',
    backgroundColor: '#1A123D',
    borderRadius: 24,
    padding: 24,
    borderWidth: 2,
    borderColor: '#5711BE',
  },

  modalTitle: {
    color: '#FFD94E',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },

  modalText: {
    color: 'white',
    fontSize: 15,
    lineHeight: 28,
    marginBottom: 6,
  },

  closeButton: {
    marginTop: 20,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#FF5AA9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
  },
});