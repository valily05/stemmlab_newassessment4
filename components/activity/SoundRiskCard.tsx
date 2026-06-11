import { LinearGradient } from "expo-linear-gradient";
import {
    Dimensions,
    PixelRatio,
    StyleSheet,
    Text,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

const wp = (p: number) =>
  PixelRatio.roundToNearestPixel((width * p) / 100);

const rf = (size: number) =>
  Math.round(
    PixelRatio.roundToNearestPixel(
      size * (width / 390)
    )
  );

interface Props {
  highest: number;
  risk: string;
}

export default function SoundRiskCard({
  highest,
  risk,
}: Props) {
  const getColor = () => {
    switch (risk) {
      case "LOW":
        return "#5EEA8B";

      case "MEDIUM":
        return "#FFD94E";

      default:
        return "#FF5B5B";
    }
  };

  const getDescription = () => {
    switch (risk) {
      case "LOW":
        return "Your recordings stayed within a safe environmental noise level.";

      case "MEDIUM":
        return "Some recordings reached moderate noise levels. Prolonged exposure may become uncomfortable.";

      default:
        return "High noise levels were detected. Long-term exposure may affect hearing health.";
    }
  };

  // Dynamic subtle glow based on risk level
  const getGlowColor = () => {
    switch (risk) {
      case "LOW": return "rgba(94, 234, 139, 0.2)";
      case "MEDIUM": return "rgba(255, 217, 78, 0.2)";
      default: return "rgba(255, 91, 91, 0.2)";
    }
  };

  return (
    <View style={[styles.cardWrapper, { shadowColor: getColor(), borderColor: getColor() }]}>
      <LinearGradient 
        colors={["rgba(23, 19, 63, 0.8)", "rgba(35, 28, 86, 0.8)"]}
        style={styles.card}
      >
        <Text style={styles.title}>NOISE_RISK_ANALYSIS</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Peak Recording</Text>
          <Text style={styles.value}>{highest.toFixed(1)} dB</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Overall Status</Text>
          <Text style={[styles.risk, { color: getColor() }]}>
            {risk}
          </Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.description}>
          {getDescription()}
        </Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    marginHorizontal: wp(5),
    marginTop: 18,
    borderRadius: 22,
    borderWidth: 1.5,
    elevation: 6,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  card: {
    padding: 24,
    borderRadius: 20.5,
  },
  title: {
    color: "#FFE95B",
    fontFamily: "PixelBold",
    fontSize: rf(16),
    marginBottom: 20,
    letterSpacing: 1,
    opacity: 0.9,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  label: {
    color: "#cbd5e1",
    fontFamily: "PixelOperator",
    fontSize: rf(14),
  },
  value: {
    color: "#f8fafc",
    fontFamily: "PixelBold",
    fontSize: rf(14),
  },
  risk: {
    fontFamily: "PixelBold",
    fontSize: rf(14),
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(75, 83, 163, 0.3)",
    marginVertical: 16,
  },
  description: {
    color: "#e2e8f0",
    fontFamily: "PixelOperator",
    fontSize: rf(14),
    lineHeight: rf(22),
  },
});