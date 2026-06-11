import { LinearGradient } from "expo-linear-gradient";
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
  locations: any[];
  iterations: any[];
}

export default function LocationBreakdownCard({ locations, iterations }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}> AREA_ANALYSIS</Text>

      {locations.map((location) => {
        const currentIterations = iterations.filter((i) => i.locationID === location.id);
        const average = currentIterations.length === 0
          ? 0
          : currentIterations.reduce((sum, item) => sum + (item.data?.averageDecibel ?? 0), 0) / currentIterations.length;

        return (
          <LinearGradient
            key={location.id}
            colors={["rgba(64, 55, 130, 0.4)", "rgba(37, 32, 90, 0.4)"]}
            style={styles.locationCard}
          >
            <Text style={styles.locationName}>📍 {location.name.toUpperCase()}</Text>
            
            <View style={styles.statRow}>
              <Text style={styles.text}>Noise Level</Text>
              <Text style={styles.highlightText}>{average.toFixed(1)} dB</Text>
            </View>
            
            <View style={styles.statRow}>
              <Text style={styles.text}>Samples Taken</Text>
              <Text style={styles.highlightText}>{currentIterations.length}</Text>
            </View>
          </LinearGradient>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: wp(5),
    marginTop: 20,
    padding: 20,
    backgroundColor: "rgba(23, 19, 63, 0.5)",
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
  locationCard: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(75, 83, 163, 0.3)",
  },
  locationName: {
    color: "#FFFFFF",
    fontFamily: "PixelBold",
    fontSize: rf(14),
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
    paddingBottom: 5,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  text: {
    color: "#a0a0c0",
    fontFamily: "PixelOperator",
    fontSize: rf(13),
  },
  highlightText: {
    color: "#FFD94E",
    fontFamily: "Pixel",
    fontSize: rf(13),
  },
});