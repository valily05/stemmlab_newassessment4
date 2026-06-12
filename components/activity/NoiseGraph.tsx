import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, PixelRatio, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");
const wp = (p: number) => PixelRatio.roundToNearestPixel((width * p) / 100);
const rf = (size: number) => Math.round(PixelRatio.roundToNearestPixel(size * (width / 390)));

interface Props {
  iterations: any[];
}

export default function NoiseGraph({ iterations }: Props) {
  const highest = Math.max(
    ...iterations.map((i) => i.data?.averageDecibel ?? 0),
    40
  );

  const max = Math.ceil(highest / 10) * 10;
  
  // Calculate dynamic widths to space out items evenly based on array length
  const graphInnerWidth = width - wp(10) - 40 - 50; // Screen minus margins, padding, and Y-axis
  const containerWidth = iterations.length > 0 ? graphInnerWidth / iterations.length : 60;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>NOISE_TRENDS</Text>
      
      <View style={styles.graphContainer}>
        {/* Y-Axis Labels */}
        <View style={styles.yAxis}>
          <Text style={styles.yLabel}>{max.toFixed(0)}</Text>
          <Text style={styles.yLabel}>{(max * 0.75).toFixed(0)}</Text>
          <Text style={styles.yLabel}>{(max * 0.5).toFixed(0)}</Text>
          <Text style={styles.yLabel}>{(max * 0.25).toFixed(0)}</Text>
          <Text style={styles.yLabel}>0</Text>
        </View>

        {/* Graph Body */}
        <View style={styles.graph}>
          {/* Background Grid Lines */}
          <View style={styles.gridLines}>
            {[...Array(4)].map((_, i) => (
              <View key={i} style={styles.gridLine} />
            ))}
            <View style={[styles.gridLine, { backgroundColor: "rgba(75, 83, 163, 0.6)" }]} /> 
          </View>

          {iterations.map((item, index) => {
            const value = item.data?.averageDecibel ?? 0;
            const barHeight = (value / max) * 140;

            return (
              <View key={index} style={[styles.barContainer, { width: containerWidth }]}>
                <LinearGradient
                  colors={["#FFD94E", "#FF7E67"]}
                  style={[styles.bar, { height: Math.max(barHeight, 5) }]}
                />
                <Text style={styles.barLabel} numberOfLines={2}>
                  {item.data?.action?.toUpperCase() || "N/A"}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: wp(4),
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
  graphContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  graph: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 180,
    paddingBottom: 10,
    marginRight: 2,
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
    justifyContent: "flex-end",
    paddingHorizontal: 2,
  },
  bar: {
    width: 18,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
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
    fontSize: rf(10),
    textAlign: "center",
    width: "100%",
  },
  yAxis: {
    height: 180,
    justifyContent: "space-between",
    marginRight: 8,
    width: 30,
    alignItems: "flex-end",
    paddingBottom: 14,
  },
  yLabel: {
    color: "#94A3B8",
    fontFamily: "PixelOperator",
    fontSize: rf(14),
  },
});