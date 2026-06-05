import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

interface Activity {
  name: string;
  time: number;
}

interface ChartProps {
  data: Activity[];
}

export default function TeamProgressChart({ data }: ChartProps) {
  // Safety check: Ensure data is an array
  const safeData = Array.isArray(data) ? data : [];

  if (safeData.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No activity data yet.</Text>
      </View>
    );
  }

  return (
    <BarChart
      data={{
        labels: safeData.map((item) => item.name),
        datasets: [{ data: safeData.map((item) => item.time) }],
      }}
      width={Dimensions.get('window').width - 40}
      height={220}
      yAxisLabel=""
      yAxisSuffix="m"
      chartConfig={{
        backgroundColor: '#000',
        backgroundGradientFrom: '#2D0B58',
        backgroundGradientTo: '#1A0612',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      }}
      style={{ marginVertical: 8, borderRadius: 16 }}
      showValuesOnTopOfBars
      verticalLabelRotation={30}
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: { height: 220, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1A0E32', borderRadius: 16 },
  emptyText: { color: '#A0A0A0', fontSize: 12 },
});