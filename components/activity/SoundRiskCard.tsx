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
  if (highest <= 60) return "#5EEA8B";          // Green
  if (highest <= 85) return "#B6E44A";          // Yellow-green
  if (highest <= 100) return "#FFD94E";         // Yellow
  if (highest <= 120) return "#FF8A3D";         // Orange
  return "#FF5B5B";                             // Red
};
  

const getDescription = () => {
  if (highest <= 30) {
    return "No risk. This sound level is comparable to a whisper or a quiet library.";
  }

  if (highest <= 60) {
    return "Safe for long periods. This is similar to a normal conversation or classroom noise.";
  }

  if (highest <= 85) {
    return "Generally safe, but long exposure can cause hearing fatigue. Examples include busy traffic or a vacuum cleaner.";
  }

  if (highest <= 90) {
    return "Hearing damage is possible after long exposure. Similar to a lawn mower, loud classroom, or heavy traffic.";
  }

  if (highest <= 100) {
    return "Hearing damage is likely after short exposure. Examples include motorbikes, power tools, or loud music.";
  }

  if (highest <= 110) {
    return "Serious hearing damage can occur within minutes. Similar to a nightclub, rock concert, or chainsaw.";
  }

  if (highest <= 120) {
    return "Painful sound level. Immediate hearing damage is possible. Comparable to a nearby siren or car horn.";
  }

if (highest <= 140) {
  return "Immediate and severe hearing damage can occur. Similar to standing near a jet engine.";
}

return "Instant and permanent hearing damage is likely. Comparable to an explosion or gunshot.";
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
    <Text style={styles.label}>Hearing Risk</Text>
<Text style={[styles.risk, { color: getColor() }]}>
  {highest <= 30
    ? "NO RISK"
    : highest <= 60
    ? "SAFE"
    : highest <= 85
    ? "LOW RISK"
    : highest <= 90
    ? "POSSIBLE DAMAGE"
    : highest <= 100
    ? "LIKELY DAMAGE"
    : highest <= 110
    ? "SERIOUS DAMAGE"
    : highest <= 120
    ? "IMMEDIATE DAMAGE"
    : highest <= 130
    ? "SEVERE DAMAGE"
    : "PERMANENT DAMAGE"}
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