import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  PixelRatio,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
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
type Props = {
  onCompleted: (completed: boolean) => void;
};


export default function LocationAccess({
  onCompleted,
}: Props) {
  // Animated values for the single wave ring
  const waveScale = useRef(new Animated.Value(1)).current;
  const waveOpacity = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Single continuous natural ripple loop
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(waveScale, {
            toValue: 2.0,
            duration: 2200,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(waveOpacity, {
            toValue: 0,
            duration: 2200,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(waveScale, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(waveOpacity, {
            toValue: 0.8,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, []);

  const [status, setStatus] = useState<
    "idle" | "checking" | "success" | "failed"
  >("idle");

  async function enableLocation() {
    setStatus("checking");
    onCompleted(false);

    const { status: permission } =
      await Location.requestForegroundPermissionsAsync();

    if (permission !== "granted") {
      setStatus("failed");
      return;
    }

    try {
      await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setTimeout(() => {
        setStatus("success");
        onCompleted(true);
      }, 700);
    } catch {
      setStatus("failed");
    }
  }

  function retry() {
    setStatus("idle");
    onCompleted(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {/* SINGLE WAVE / RIPPLE EFFECT */}
        <Animated.View
          style={[
            styles.iconGlow,
            {
              opacity: waveOpacity,
              transform: [{ scale: waveScale }],
            },
          ]}
        />

        <Image
          source={require("@/assets/images/location.png")}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>

      

        {status === "checking" && (
          <>
            <Text style={styles.message}>Checking location...</Text>

            <View style={styles.progressBar}>
              {Array.from({ length: 10 }).map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.progressBlock,
                    i < 10 && styles.progressBlockActive,
                  ]}
                />
              ))}
            </View>
          </>
        )}

        {status === "success" && (
          <>
            <Text style={styles.success}>✓ Location Enabled</Text>
            <Text style={styles.successSub}>You're all set!</Text>
          </>
        )}

        {status === "failed" && (
          <Text style={styles.failed}>
            Location permission was denied.
            {"\n"}
            Please enable it to continue.
          </Text>
        )}

      <Pressable
        style={styles.buttonWrapper}
        disabled={status === "checking" || status === "success"}
        onPress={() => {
          if (status === "idle") enableLocation();
          else if (status === "failed") retry();
        }}
      >
        <LinearGradient
          colors={
            status === "checking"
              ? ["#6B6288", "#57506F"]
              : status === "success"
              ? ["#3BCF73", "#2FAE5C"]
              : ["#EC4899", "#8B5CF6"]
          }
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {status === "idle"
              ? "ENABLE LOCATION"
              : status === "checking"
              ? "CHECKING..."
              : status === "success"
              ? "LOCATION ENABLED"
              : "TRY AGAIN"}
          </Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    alignSelf: "center",
    top: hp(7),
  },

  feedback: {
    width: "100%",
    minHeight: hp(9),
    justifyContent: "center",
    alignItems: "center",
  },

  message: {
    color: "#ECE7FF",
    fontFamily: "PixelOperator",
    fontSize: rf(15),
    textAlign: "center",
    marginTop: hp(3.5),
  },

  progressBar: {
    flexDirection: "row",
    marginTop: hp(1.5),
  },

  progressBlock: {
    width: wp(2.8),
    height: hp(0.9),
    borderRadius: rf(2),
    backgroundColor: "#453761",
    marginHorizontal: wp(0.5),
  },

  progressBlockActive: {
    backgroundColor: "#EC4899",
  },

  failed: {
    textAlign: "center",
    color: "#FF8A8A",
    fontFamily: "PixelOperator",
    fontSize: rf(14),
    lineHeight: hp(2.8),
  },

  buttonWrapper: {
    width: "100%",
    marginTop: hp(2.5),
  },

  button: {
    height: hp(6.8),
    borderRadius: rf(18),
    justifyContent: "center",
    alignItems: "center",
    marginTop:rf(30),
    marginBottom:rf(70)
  },

  success: {
    color: "#41E07A",
    fontFamily: "PixelBold",
    fontSize: rf(20),
    marginBottom: hp(0.9),
  },

  successSub: {
    color: "#CFC8FF",
    fontFamily: "PixelOperator",
    fontSize: rf(16),
    textAlign: "center",
  },

  iconContainer: {
    width: wp(40),
    height: wp(40),
    borderRadius: wp(99),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#24174A",
    borderWidth: rf(1),
    borderColor: "rgba(255,255,255,0.05)",
    overflow: "visible",
    marginBottom: hp(12),
    marginTop:rf(40)
  },

  iconGlow: {
    position: "absolute",
    width: wp(38),
    height: wp(38),
    borderRadius: wp(38),
    backgroundColor: "rgba(168,85,247,0.25)",
  },

  icon: {
    width: wp(21),
    height: wp(21),
  },

  buttonText: {
    color: "#FFFFFF",
    fontFamily: "Pixel",
    fontSize: rf(16),
  },

});