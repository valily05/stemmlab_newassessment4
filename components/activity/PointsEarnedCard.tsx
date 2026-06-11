import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  points: number;
}

export default function PointsEarnedCard({ points }: Props) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#3b0764", "#1e1b4b"]}
        style={styles.card}
      >
        <Text style={styles.title}>SCORE MULTIPLIER</Text>
        
        <View style={styles.glowContainer}>
          <Text style={styles.points}>+{points}</Text>
          <Text style={styles.label}>POINTS</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    // Outer shadow for the "glow"
    shadowColor: "#FFD94E",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  card: {
    padding: 32,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 217, 78, 0.2)",
    alignItems: "center",
  },
  title: {
    color: "#c084fc",
    fontFamily: "PixelBold",
    fontSize: 14,
    letterSpacing: 2,
    marginBottom: 8,
  },
  glowContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  points: {
    fontSize: 64, // Larger, more impactful score
    fontFamily: "PixelBold",
    color: "#FFE95B",
    textShadowColor: "rgba(255, 217, 78, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  label: {
    color: "#a78bfa",
    fontFamily: "PixelOperator",
    fontSize: 14,
    letterSpacing: 1,
    marginTop: -4,
  },
});