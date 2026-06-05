import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

interface CategoryData {
  [category: string]: number;
}

export default function CategoryBreakdown({ data }: { data: CategoryData }) {
  const colors = ['#FF57A0', '#8B5CF6', '#34D399', '#FBBF24'];

  const chartData = Object.entries(data).map(([cat, count], index) => ({
    name: cat,
    population: count,
    color: colors[index % colors.length],
    legendFontColor: '#FFF',
    legendFontSize: 12,
  }));

  return (
    <View style={styles.container}>
      <PieChart
        data={chartData}
        width={Dimensions.get('window').width - 40}
        height={200}
        chartConfig={{ color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})` }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
      
      {/* Legend added below the PieChart */}
      <View style={styles.legendContainer}>
        {Object.entries(data).map(([cat, count]) => (
          <Text key={cat} style={styles.legendText}>
            {cat}: {count}/7
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginVertical: 10 },
  legendContainer: { 
    marginTop: 10, 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'center',
    gap: 15 
  },
  legendText: { 
    color: '#FFF', 
    fontSize: 12, 
    fontFamily: 'PixelOperator' 
  },
});