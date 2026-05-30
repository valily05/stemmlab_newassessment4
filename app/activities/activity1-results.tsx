import { useLocalSearchParams } from 'expo-router';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function Activity1Results() {
  const params = useLocalSearchParams();

  console.log('PARAMS:', params);

  let parsedResults: any[] = [];

  try {
    if (params.results) {
      parsedResults = JSON.parse(
        params.results as string
      );
    }
  } catch (error) {
    console.log(
      'JSON PARSE ERROR:',
      error
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.content
      }
    >
      <Text style={styles.title}>
        ACTIVITY 1 RESULTS
      </Text>

      <Text style={styles.debug}>
        Results Count:{' '}
        {parsedResults.length}
      </Text>

      {parsedResults.length === 0 && (
        <View style={styles.card}>
          <Text style={styles.text}>
            No Results Received
          </Text>
        </View>
      )}

      {parsedResults.map(
        (
          item: any,
          index: number
        ) => (
          <View
            key={index}
            style={styles.card}
          >
            <Text
              style={styles.stage}
            >
              {item.stage}
            </Text>

            <Text
              style={styles.text}
            >
              First Hit Ground:{' '}
              {item.firstHitTime}
            </Text>

            <Text
              style={styles.text}
            >
              Stop Moving:{' '}
              {item.stopMovingTime}
            </Text>

            <Text
              style={styles.text}
            >
              In Target:{' '}
              {item.inTarget
                ? 'Yes'
                : 'No'}
            </Text>

            <Text
              style={styles.text}
            >
              Bounce:{' '}
              {item.bounced
                ? 'Yes'
                : 'No'}
            </Text>

            <Text
              style={styles.text}
            >
              Video:{' '}
              {item.videoUri
                ? 'Recorded'
                : 'Missing'}
            </Text>
          </View>
        )
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  content: {
    padding: 20,
    paddingTop: 80,
  },

  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  debug: {
    color: '#FFD54F',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#1A123D',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },

  stage: {
    color: '#FFD54F',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  text: {
    color: 'white',
    fontSize: 16,
    marginBottom: 4,
  },
});