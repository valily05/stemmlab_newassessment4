import {
  Dimensions,
  PixelRatio,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const wp = (p: number) => PixelRatio.roundToNearestPixel((width * p) / 100);
const rf = (size: number) => Math.round(PixelRatio.roundToNearestPixel(size * (width / 390)));

interface Props {
  stats: {
    average: number;
    highest: number;
    totalLocations: number;
    experimentTime: number;
    risk: string;
  };
}

export default function SoundSummaryCard({ stats }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>SUMMARY_STATS</Text>

      <Row label="Avg Noise" value={`${stats.average.toFixed(1)} dB`} />
      <Row label="Peak Noise" value={`${stats.highest.toFixed(1)} dB`} />
      <View style={styles.divider} />
      <Row label="Locations" value={String(stats.totalLocations)} />
      <Row label="Time Elapsed" value={`${stats.experimentTime}s`} />
      <Row label="Risk Rating" value={stats.risk} highlight={true} />
    </View>
  );
}

function Row({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, highlight && styles.highlightValue]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: wp(5),
    marginTop: 20,
    padding: 24,
    backgroundColor: "rgba(23, 19, 63, 0.6)", // Semi-transparent for overlay feel
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "#4B53A3",
    // Adding a subtle inner shadow/glow effect
    shadowColor: "#4B53A3",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    color: "#FFE95B",
    fontFamily: "PixelBold", // Assuming this is your bold variant
    fontSize: rf(16),
    marginBottom: 20,
    letterSpacing: 1.5,
    opacity: 0.9,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(75, 83, 163, 0.4)",
    marginVertical: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  label: {
    color: "#cbd5e1", // Softer white
    fontFamily: "PixelOperator",
    fontSize: rf(14),
  },
  value: {
    color: "#f8fafc",
    fontFamily: "PixelBold",
    fontSize: rf(14),
  },
  highlightValue: {
    color: "#FFD94E", // Matches the title color for emphasis
    textShadowColor: "rgba(255, 217, 78, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
});