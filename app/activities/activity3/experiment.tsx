import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { Accelerometer } from "expo-sensors";
import { Timestamp } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import {
    Alert,
    Dimensions,
    Image,
    PixelRatio,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import ExitButton from "@/components/activity/ExitButton";
import ExperimentHero from "@/components/activity/ExperimentHero";
import ExperimentStats from "@/components/activity/ExperimentStats";
import ExperimentTipCard from "@/components/activity/ExperimentTipCard";
import InfoModal from "@/components/activity/InfoModal";
import MotionExperimentCard from "@/components/activity/MotionExperimentCard";

import { activities } from "@/data/activities";
import { createSession } from "@/services/firebase/sessionService";

const activity = activities.activity3;

const { width, height } = Dimensions.get("window");

const wp = (percentage: number) =>
  PixelRatio.roundToNearestPixel((width * percentage) / 100);

const hp = (percentage: number) =>
  PixelRatio.roundToNearestPixel((height * percentage) / 100);

const rf = (size: number) => {
  const scale = width / 390;

  return Math.round(
    PixelRatio.roundToNearestPixel(size * scale)
  );
};

const stages = [
  "SETUP",
  "PAPER FAN (15 cm)",
  "PAPER FAN (30 cm)",
  "PAPER FAN (45 cm)",
  "CARDBOARD FAN (30 cm)",
];

export default function Activity3Experiment() {
  const { prediction } =
    useLocalSearchParams<{
      prediction?: string;
    }>();

  const scrollRef = useRef<ScrollView>(null);

  const [currentStage, setCurrentStage] = useState(0);
  const [sessionID, setSessionID] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  const [hasStarted, setHasStarted] = useState(false);

  const [timeLeft, setTimeLeft] = useState(20 * 60);

  const [accelerometerData, setAccelerometerData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  useEffect(() => {
    if (prediction) {
      console.log(
        "Prediction:",
        prediction
      );
    }
  }, [prediction]);

  // Accelerometer
  useEffect(() => {
    Accelerometer.setUpdateInterval(100);

    const subscription =
      Accelerometer.addListener((data) => {
        setAccelerometerData({
          x: data.x,
          y: data.y,
          z: data.z,
        });
      });

    return () => {
      subscription.remove();
    };
  }, []);

  // Overall experiment timer
  useEffect(() => {
    if (!hasStarted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) =>
        prev > 0 ? prev - 1 : 0
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted]);

  const formatCountdown = (
    seconds: number
  ) => {
    const mins = Math.floor(
      seconds / 60
    );

    const secs = seconds % 60;

    return `${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const handleStartExperiment =
    async () => {
      try {
        const newSessionID =
          await createSession({
            activityID: 3,
            teamID: "team1",
            experimentTime: 0,
            totalIterations: 4,
            pointsEarned: 0,
            completedAt:
              Timestamp.now(),
            insights: {},
          });

        setSessionID(newSessionID);
        setHasStarted(true);
        setCurrentStage(1);

        setTimeout(() => {
          scrollRef.current?.scrollTo({
            y: hp(35),
            animated: true,
          });
        }, 300);
      } catch (e) {
        console.log(e);

        Alert.alert(
          "Error",
          "Failed to create experiment session."
        );
      }
    };
  return (
    <LinearGradient
      colors={[
        "#0B0820",
        "#14103A",
        "#1D1854",
        "#26216D",
        "#312C88",
        "#3A35A3",
      ]}
      locations={[0, 0.5, 0.75, 0.88, 0.94, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => setShowInfo(true)}
        >
          <Image
            source={require("@/assets/images/info-icon.png")}
            style={styles.infoIcon}
          />
        </TouchableOpacity>

        <ExperimentHero
          title={activity.title}
          image={require("@/assets/images/miffyfan.png")}
          imageStyle={{
            width: wp(39),
            height: hp(20),
            right: -wp(9),
          }}
          activityID={3}
          description={
            currentStage === 0 ? (
              <Text style={styles.heroDescription}>
                Prepare your{" "}
                <Text style={styles.pinkText}>
                  HAND FAN
                </Text>{" "}
                before starting the experiment.
              </Text>
            ) : (
              <Text style={styles.heroDescription}>
                Wave the{" "}
                <Text style={styles.pinkText}>
                  {stages[currentStage]}
                </Text>{" "}
                for 20 seconds while your phone measures the motion using the
                accelerometer.
              </Text>
            )
          }
        />

        <ExperimentStats
          timeLeft={formatCountdown(timeLeft)}
          iteration={stages[currentStage]}
        />

        {currentStage === 0 ? (
          <View style={styles.setupContainer}>
            <TouchableOpacity
              style={styles.startButton}
              onPress={handleStartExperiment}
            >
              <Text style={styles.startButtonText}>
                START EXPERIMENT
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <MotionExperimentCard
            key={currentStage}
            sessionID={sessionID}
            stage={stages[currentStage]}
            iteration={currentStage}
            accelerometerData={accelerometerData}
            isLastIteration={
              currentStage === stages.length - 1
            }
            onNext={() => {
              if (currentStage === stages.length - 1) {
                router.push({
                  pathname:
                    "/activities/activity3/results",
                  params: {
                    sessionID,
                    prediction: prediction || "",
                    activityID: 3,
                  },
                });
              } else {
                setCurrentStage((prev) => prev + 1);

                setTimeout(() => {
                  scrollRef.current?.scrollTo({
                    y: hp(35),
                    animated: true,
                  });
                }, 300);
              }
            }}
          />
        )}

        {currentStage === 0 ? (
          <ExperimentTipCard
            tips={[
              "Prepare your paper and cardboard fans before starting.",
              "Make sure your phone is held securely.",
              "Stand in an open area.",
            ]}
          />
        ) : (
          <ExperimentTipCard
            tips={[
              "Wave the fan naturally.",
              "Keep the same speed for the full 20 seconds.",
              "Do not shake the phone intentionally.",
            ]}
          />
        )}

        <ExitButton
          onPress={() => router.back()}
        />
      </ScrollView>

      <InfoModal
        visible={showInfo}
        title={
          currentStage === 0
            ? "HOW TO COMPLETE THIS ACTIVITY"
            : "HOW TO PERFORM THE TEST"
        }
        instructions={
          currentStage === 0
            ? [
                "Prepare the selected fan.",
                "Hold your phone securely.",
                "Press Start Experiment.",
                "Complete every design.",
              ]
            : [
                "Wave the selected fan.",
                "Continue for 20 seconds.",
                "Wait for the results.",
                "Save and continue.",
              ]
        }
        onClose={() => setShowInfo(false)}
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

  infoButton: {
    position: "absolute",
    top: hp(7),
    right: wp(6),
    zIndex: 999,
  },

  infoIcon: {
    width: rf(34),
    height: rf(34),
    resizeMode: "contain",
  },

  heroDescription: {
    color: "#FFFFFF",
    fontSize: rf(15),
    fontFamily: "PixelOperator",
    lineHeight: rf(22),
    width: rf(252),
  },

  pinkText: {
    color: "#EC588C",
    fontFamily: "PixelBold",
  },

  setupContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(4),
    marginBottom: hp(3),
  },

  startButton: {
    backgroundColor: "#EC588C",
    paddingHorizontal: wp(10),
    paddingVertical: hp(1.8),
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#EC588C",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },

  startButtonText: {
    color: "#FFFFFF",
    fontFamily: "PixelOperatorBold",
    fontSize: rf(17),
    letterSpacing: 1,
  },

  sectionSpacing: {
    marginTop: hp(2),
  },

  divider: {
    width: "90%",
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignSelf: "center",
    marginVertical: hp(2),
  },

  cardSpacing: {
    marginTop: hp(2),
    marginBottom: hp(2),
  },

  center: {
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: "#FFFFFF",
    fontFamily: "PixelOperatorBold",
    fontSize: rf(22),
  },

  subtitle: {
    color: "#A09CBF",
    fontFamily: "PixelOperator",
    fontSize: rf(14),
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
  },

  spacer: {
    height: hp(2),
  },
});