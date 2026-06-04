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
  // Handle empty state to prevent chart errors
  if (!data || data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No activity data recorded yet.</Text>
      </View>
    );
  }

  return (
    <BarChart
      data={{
        labels: data.map((item) => item.name),
        datasets: [{ data: data.map((item) => item.time) }],
      }}
      width={Dimensions.get('window').width - 40}
      height={220}
      yAxisLabel=""        // Required by the library
      yAxisSuffix="m"      // Label for Y-axis (e.g., 10m)
      chartConfig={{
        backgroundColor: '#000',
        backgroundGradientFrom: '#2D0B58',
        backgroundGradientTo: '#1A0612',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        propsForLabels: {
          fontSize: 10,
        },
      }}
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
      showValuesOnTopOfBars
      verticalLabelRotation={30}
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A0E32',
    borderRadius: 16,
    marginVertical: 8,
  },
  emptyText: {
    color: '#A0A0A0',
    fontFamily: 'PixelOperator',
    fontSize: 12,
  },
});