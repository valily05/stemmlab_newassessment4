import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, PixelRatio, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");
const wp = (p: number) => PixelRatio.roundToNearestPixel((width * p) / 100);
const rf = (size: number) => Math.round(PixelRatio.roundToNearestPixel(size * (width / 390)));

interface Props {
  iterations: any[];
}

export default function NoiseGraph({ iterations }: Props) {
  const max = Math.max(...iterations.map((i) => i.data?.averageDecibel ?? 0), 1);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>NOISE_TRENDS</Text>

      <View style={styles.graph}>
        {/* Background Grid Lines */}
        <View style={styles.gridLines}>
          {[...Array(4)].map((_, i) => (
            <View key={i} style={styles.gridLine} />
          ))}
        </View>

        {iterations.map((item, index) => {
          const value = item.data?.averageDecibel ?? 0;
          const barHeight = (value / max) * 140;

          return (
            <View key={index} style={styles.barContainer}>
              <LinearGradient
                colors={["#FFD94E", "#FF7E67"]}
                style={[styles.bar, { height: Math.max(barHeight, 5) }]}
              />
              <Text style={styles.barLabel}>{item.data?.action?.charAt(0).toUpperCase()}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: wp(5),
    marginTop: 20,
    padding: 20,
    backgroundColor: "rgba(23, 19, 63, 0.6)",
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#4B53A3",
  },
  title: {
    color: "#FFE95B",
    fontFamily: "PixelBold",
    fontSize: rf(16),
    marginBottom: 20,
    letterSpacing: 1,
  },
  graph: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: 180,
    paddingBottom: 10,
  },
  gridLines: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  gridLine: {
    height: 1,
    backgroundColor: "rgba(75, 83, 163, 0.3)",
    width: "100%",
  },
  barContainer: {
    alignItems: "center",
    width: wp(12),
  },
  bar: {
    width: 18,
    borderRadius: 4,
    // Add a subtle outer glow/shadow
    shadowColor: "#FF7E67",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 6,
  },
  barLabel: {
    marginTop: 10,
    color: "#CBD5E1",
    fontFamily: "PixelOperator",
    fontSize: rf(12),
  },
});