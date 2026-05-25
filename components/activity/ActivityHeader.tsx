// components/activity/ActivityHeader.tsx

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { useRouter } from 'expo-router';

export default function ActivityHeader() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
      <Text>←</Text>

        <Text style={styles.backText}>BACK</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 65,
    paddingHorizontal: 20,
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  backText: {
    color: '#3CFF89',
    fontFamily: 'PressStart2P',
    fontSize: 10,
  },
});