import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CategoryBreakdown from '../components/CategoryBreakdown';
import StatCard from '../components/StatCard';
import TeamProgressChart from '../components/TeamProgressChart';

// 1. Define the interface based on your Firebase structure
interface TeamData {
  totalPoints: number;
  totalActivitiesCompleted: number;
  averageCompletionTime: number;
  // This comes from Firebase as an object { "Mon": 5, "Tue": 3 }
  weeklyCompletions: { [day: string]: number };
  categories: { [category: string]: number };
}

interface TeamDashboardProps {
  teamData: TeamData;
}

export default function TeamDashboard({ teamData }: TeamDashboardProps) {
  
  // 2. Transform the object into the format the Chart expects: [{ name: "Mon", time: 5 }, ...]
  const chartData = Object.entries(teamData.weeklyCompletions || {}).map(([day, count]) => ({
    name: day,
    time: count
  }));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Team Galaxy</Text>
      
      {/* 3 Mini Stats */}
      <View style={styles.statRow}>
        <StatCard icon="⭐" value={teamData.totalPoints} label="Points" />
        <StatCard icon="🚀" value={teamData.totalActivitiesCompleted} label="Missions" />
        <StatCard icon="⚡" value={`${teamData.averageCompletionTime}m`} label="Avg Time" />
      </View>

      {/* Progress Chart */}
      <Text style={styles.sectionTitle}>Activity Progress (Weekly)</Text>
      <TeamProgressChart data={chartData} />

      {/* Categories */}
      <Text style={styles.sectionTitle}>Category Breakdown</Text>
      <CategoryBreakdown data={teamData.categories} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0208' },
  content: { padding: 20 },
  header: { fontSize: 24, color: '#FFF', fontFamily: 'PixelBold', marginBottom: 20 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  sectionTitle: { color: '#B8A0FF', fontSize: 18, marginBottom: 15, fontFamily: 'PixelBold' }
});