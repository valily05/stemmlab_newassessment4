import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Image,
    PixelRatio,
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";

type Props = {
  onCompleted: (completed: boolean) => void;
};

const rf = (size: number) =>
  Math.round(PixelRatio.roundToNearestPixel(size));

export default function LocationAccess({
  onCompleted,
}: Props) {
const pulse = useRef(new Animated.Value(1)).current;

useEffect(() => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(pulse, {
        toValue: 1.05,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(pulse, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
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

 
<Animated.View
  style={[
    styles.iconContainer,
    {
      transform: [{ scale: pulse }],
    },
  ]}
>
  <View style={styles.iconGlow} />

  <Image
    source={require("@/assets/images/location.png")}
    style={styles.icon}
    resizeMode="contain"
  />
</Animated.View>

      <View style={styles.feedback}>
        {status === "idle" && (
          <Text style={styles.message}>
Allow STEMM Lab to
record your location
during this activity.        </Text>
        )}

        {status === "checking" && (
          <>
            <Text style={styles.message}>
              Checking location...
            </Text>

            <View style={styles.progressBar}>
              {Array.from({ length: 10 }).map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.progressBlock,
                    i < 10 &&
                      styles.progressBlockActive,
                  ]}
                />
              ))}
            </View>
          </>
        )}

   {status === "success" && (
  <>
    <Text style={styles.success}>
      ✓ Location Enabled
    </Text>

    <Text style={styles.successSub}>
      You're all set!
    </Text>
  </>
)}
      

        {status === "failed" && (
          <Text style={styles.failed}>
            Location permission was denied.
            {"\n"}
            Please enable it to continue.
          </Text>
        )}
      </View>

      <Pressable
        style={styles.buttonWrapper}
disabled={
  status === "checking" ||
  status === "success"
}        onPress={() => {
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
    width: "97%",
    alignItems: "center",
    alignSelf: "center",
  },


feedback: {
  width: "100%",
  minHeight: 70,
  justifyContent: "center",
  alignItems: "center",
},

  message: {
    color: "#ECE7FF",
    fontFamily: "PixelOperator",
    fontSize: rf(14),
    textAlign: "center",
    marginBottom: 16,
  },

  progressBar: {
    flexDirection: "row",
  },

  progressBlock: {
    width: 12,
    height: 8,
    borderRadius: 2,
    backgroundColor: "#453761",
    marginHorizontal: 2,
  },

  progressBlockActive: {
    backgroundColor: "#EC4899",
  },





  failed: {
    textAlign: "center",
    color: "#FF8A8A",
    fontFamily: "PixelOperator",
    fontSize: rf(14),
    lineHeight: 22,
  },

  buttonWrapper: {
    width: "100%",
    marginTop: 18,
  },

  button: {
    height: 56,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  success: {
  color: "#41E07A",
  fontFamily: "Pixel",
  fontSize: rf(16),
  marginBottom: 8,
},

successSub: {
  color: "#CFC8FF",
  fontFamily: "PixelOperator",
  fontSize: rf(13),
  textAlign: "center",
  marginBottom: 10,
},
iconContainer: {
  width: 130,
  height: 130,

  borderRadius: 999,

  justifyContent: "center",
  alignItems: "center",

  backgroundColor: "#24174A",

  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.05)",

  overflow: "visible",

  marginBottom: 22,
},

iconGlow: {
  position: "absolute",

  width: 170,
  height: 170,

  borderRadius: 999,

  backgroundColor: "rgba(168,85,247,0.10)",

  transform: [
    {
      scale: 1.15,
    },
  ],
},
icon: {
  width: 82,
  height: 82,
},
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "Pixel",
    fontSize: rf(16),
  },
});