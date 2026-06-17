import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    PixelRatio,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import PointsEarnedCard from "@/components/activity/PointsEarnedCard";
import { db } from "@/services/firebase/config";
import {
    collection,
    doc,
    getDoc,
    getDocs,
} from "firebase/firestore";

const { width, height } = Dimensions.get("window");

const wp = (p: number) =>
  PixelRatio.roundToNearestPixel(width * p / 100);

const hp = (p: number) =>
  PixelRatio.roundToNearestPixel(height * p / 100);

const rf = (size: number) =>
  Math.round(
    PixelRatio.roundToNearestPixel(
      size * (width / 390)
    )
  );

export default function Activity3Results() {

  const params = useLocalSearchParams();

  const activityID = Number(params.activityID);

  const sessionID = params.sessionID as string;

  const prediction = params.prediction as string;

  const [loading, setLoading] = useState(true);

  const [isSaving, setIsSaving] =
    useState(false);

  const [iterations, setIterations] =
    useState<any[]>([]);

  const [stats, setStats] = useState({

    averageAcceleration: 0,

    highestAcceleration: 0,

    experimentTime: 0,

    totalIterations: 0,

    bestFan: "",

    totalPoints: 0,

  });

  useEffect(() => {

    if (sessionID) {

      loadResults();

    }

  }, [sessionID]);

  async function loadResults() {

    try {

      setLoading(true);

      const sessionSnap = await getDoc(
        doc(db, "sessions", sessionID)
      );

      const iterationSnap = await getDocs(
        collection(
          db,
          "sessions",
          sessionID,
          "iterations"
        )
      );

      const iterationList: any[] = [];

      iterationSnap.forEach(doc => {

        iterationList.push({

          id: doc.id,

          ...doc.data(),

        });

      });

      setIterations(iterationList);

      if (sessionSnap.exists()) {

        calculateStatistics(

          sessionSnap.data(),

          iterationList

        );

      }

    }

    catch (e) {

      console.log(e);

    }

    finally {

      setLoading(false);

    }

  }

  function calculateStatistics(

    sessionData: any,

    iterationData: any[]

  ) {

    if (iterationData.length === 0) return;

    let highest = 0;

    let total = 0;

    let bestFan = "";

    iterationData.forEach(item => {

      const avg =
        item.data?.averageAcceleration ?? 0;

      const peak =
        item.data?.peakAcceleration ?? 0;

      total += avg;

      if (peak > highest) {

        highest = peak;

        bestFan =
          item.data?.fanType ??
          "Unknown";

      }

    });

    const average =
      total / iterationData.length;

    let points = 100;

    if (highest > 2.5)

      points = 100;

    else if (highest > 2.0)

      points = 90;

    else if (highest > 1.5)

      points = 80;

    else

      points = 70;

    let experimentTime =
      sessionData?.experimentTime;

    if (
      experimentTime &&
      typeof experimentTime === "object" &&
      "seconds" in experimentTime
    ) {

      experimentTime =
        experimentTime.seconds;

    }

    setStats({

      averageAcceleration:
        Number(average.toFixed(2)),

      highestAcceleration:
        Number(highest.toFixed(2)),

      experimentTime:
        experimentTime || 0,

      totalIterations:
        iterationData.length,

      bestFan,

      totalPoints: points,

    });

  }

  if (loading) {

    return (

      <LinearGradient

        colors={[
          "#0B0820",
          "#14103A",
          "#1D1854",
        ]}

      >

        <ActivityIndicator

          size="large"

          color="#FFD94E"

        />

      </LinearGradient>

    );

  }
    return (
    <LinearGradient
      colors={[
        "#0B0820",
        "#14103A",
        "#1D1854",
        "#312C88",
      ]}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}

        <View style={styles.headerWrapper}>
          <Text style={styles.headerTitle}>
            RESULTS
          </Text>

          <View style={styles.neonDivider} />
        </View>

        {/* Prediction */}

        {prediction ? (
          <View style={styles.predictionBanner}>
            <Text style={styles.predictionBannerTitle}>
              YOUR PREDICTION
            </Text>

            <Text style={styles.predictionBannerText}>
              {prediction}
            </Text>
          </View>
        ) : null}

        {/* Highest Acceleration */}

        <View style={styles.statBanner}>

          <Text style={styles.statBannerTitle}>
            HIGHEST ACCELERATION
          </Text>

          <Text style={styles.statBannerText}>
            {stats.highestAcceleration.toFixed(2)} g
          </Text>

          <Text style={styles.statBannerSubtitle}>
            {stats.bestFan.toUpperCase()}
          </Text>

        </View>

        {/* Points */}

        <View style={styles.cardWrapper}>
          <PointsEarnedCard
            points={stats.totalPoints}
          />
        </View>

        {/* Motion Summary */}


        {/* Best Fan */}

      

        {/* Breakdown */}



        <TouchableOpacity
          style={[
            styles.saveButton,
            isSaving && {
              opacity: 0.7,
            },
          ]}
          disabled={isSaving}
          onPress={() =>
            router.push({
              pathname:
                "/activities/activity3/feedback",

              params: {
                activityID,
                sessionID,
                pointsEarned:
                  stats.totalPoints,

                prediction:
                  prediction || "",
              },
            })
          }
        >
          <Text
            style={
              styles.saveButtonText
            }
          >
            SAVE & REFLECT
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    paddingTop: hp(6),
    paddingBottom: hp(6),
    alignItems: "center",
  },

  headerWrapper: {
    alignItems: "center",
    marginBottom: hp(3),
  },

  headerTitle: {
    fontFamily: "PixelOperatorBold",
    fontSize: rf(34),
    color: "#FFFFFF",
    letterSpacing: 1,
  },

  neonDivider: {
    marginTop: hp(1),
    width: wp(28),
    height: 3,
    borderRadius: 10,
    backgroundColor: "#EC588C",
  },

  predictionBanner: {
    width: wp(88),
    backgroundColor: "#26216D",
    borderRadius: 18,
    paddingVertical: hp(2),
    paddingHorizontal: wp(6),
    marginBottom: hp(2.5),
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#4C42C2",
  },

  predictionBannerTitle: {
    color: "#A09CBF",
    fontFamily: "PixelOperatorBold",
    fontSize: rf(15),
    marginBottom: hp(0.5),
  },

  predictionBannerText: {
    color: "#FFFFFF",
    fontFamily: "PixelOperatorBold",
    fontSize: rf(24),
    textAlign: "center",
  },

  statBanner: {
    width: wp(88),
    backgroundColor: "#EC588C",
    borderRadius: 20,
    paddingVertical: hp(2.3),
    alignItems: "center",
    marginBottom: hp(3),
  },

  statBannerTitle: {
    color: "#FFFFFF",
    fontFamily: "PixelOperatorBold",
    fontSize: rf(15),
  },

  statBannerText: {
    color: "#FFFFFF",
    fontFamily: "PixelOperatorBold",
    fontSize: rf(34),
    marginTop: hp(0.5),
  },

  statBannerSubtitle: {
    color: "#FFE8F1",
    fontFamily: "PixelOperator",
    fontSize: rf(15),
    marginTop: hp(0.4),
  },

  cardWrapper: {
    width: "100%",
    alignItems: "center",
    marginBottom: hp(2.5),
  },

  buttonSpacing: {
    marginTop: hp(2),
    marginBottom: hp(2),
    alignItems: "center",
  },

  saveButton: {
    width: wp(84),
    backgroundColor: "#EC588C",
    borderRadius: 18,
    paddingVertical: hp(2),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp(4),
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontFamily: "PixelOperatorBold",
    fontSize: rf(18),
    letterSpacing: 0.5,
  },
});