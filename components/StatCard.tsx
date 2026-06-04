import { StyleSheet, Text, View } from 'react-native';

// Define the interface for the props
interface StatCardProps {
  icon: string;
  value: string | number;
  label: string;
}

// Apply the interface to the function
export default function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.value}>{String(value)}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { 
    backgroundColor: '#1A0E32', 
    padding: 15, 
    borderRadius: 12, 
    width: '30%', 
    alignItems: 'center' 
  },
  icon: { fontSize: 20 },
  value: { 
    color: '#FFF', 
    fontSize: 18, 
    fontFamily: 'PixelBold', 
    marginVertical: 5 
  },
  label: { 
    color: '#A0A0A0', 
    fontSize: 10, 
    fontFamily: 'PixelOperator' 
  }
});