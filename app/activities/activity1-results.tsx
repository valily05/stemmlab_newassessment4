import { useLocalSearchParams } from 'expo-router';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function Activity1Results() {
  const params = useLocalSearchParams();

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

  const totalIterations =
    parsedResults.length;

  const inTargetCount =
    parsedResults.filter(
      item => item.inTarget
    ).length;

  const accuracy =
    totalIterations > 0
      ? Math.round(
          (inTargetCount /
            totalIterations) *
            100
        )
      : 0;

  const experimentTime =
    parsedResults.reduce(
      (
        total,
        item
      ) =>
        total +
        (item.dropTime || 0),
      0
    );

  const bestResult =
    parsedResults.reduce(
      (
        best,
        current
      ) => {

        if (!best) {
          return current;
        }

        const bestTarget =
          best.inTarget
            ? 1
            : 0;

        const currentTarget =
          current.inTarget
            ? 1
            : 0;

        if (
          currentTarget >
          bestTarget
        ) {
          return current;
        }

        if (
          currentTarget ===
            bestTarget &&
          current.dropTime <
            best.dropTime
        ) {
          return current;
        }

        return best;
      },
      null as any
    );

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

      <View style={styles.summaryCard}>

        <Text style={styles.scoreTitle}>
          ACCURACY
        </Text>

        <Text style={styles.score}>
          {accuracy}%
        </Text>

        <View style={styles.statsRow}>

          <View>
            <Text
              style={
                styles.statLabel
              }
            >
              Iterations
            </Text>

            <Text
              style={
                styles.statValue
              }
            >
              {totalIterations}
            </Text>
          </View>

          <View>
            <Text
              style={
                styles.statLabel
              }
            >
              In Target
            </Text>

            <Text
              style={
                styles.statValue
              }
            >
              {inTargetCount}
            </Text>
          </View>

        </View>

        <View
          style={{
            marginTop: 20,
            alignItems:
              'center',
          }}
        >

          <Text
            style={
              styles.statLabel
            }
          >
            Experiment Time
          </Text>

          <Text
            style={
              styles.statValue
            }
          >
            {experimentTime.toFixed(
              2
            )}
            s
          </Text>

          <Text
            style={[
              styles.statLabel,
              {
                marginTop:
                  15,
              },
            ]}
          >
            Best Iteration
          </Text>

          <Text
            style={
              styles.bestIteration
            }
          >
            🏆{' '}
            {bestResult?.stage ||
              'N/A'}
          </Text>

        </View>

      </View>

      <Text
        style={
          styles.sectionTitle
        }
      >
        ITERATION COMPARISON
      </Text>

      {parsedResults.map(
        (
          item: any,
          index: number
        ) => (
          <View
            key={index}
            style={[
              styles.card,

              bestResult
                ?.stage ===
                item.stage && {
                borderWidth:
                  3,
                borderColor:
                  '#FFE95B',
              },
            ]}
          >
            <View
              style={
                styles.cardHeader
              }
            >

              <Text
                style={
                  styles.stage
                }
              >
                {item.stage}
              </Text>

              {bestResult
                ?.stage ===
                item.stage && (
                <Text
                  style={
                    styles.bestBadge
                  }
                >
                  🏆 BEST
                  RESULT
                </Text>
              )}

            </View>

            <Text
              style={
                styles.text
              }
            >
              First Hit
              Ground:{' '}
              {
                item.firstHitTime
              }
            </Text>

            <Text
              style={
                styles.text
              }
            >
              Stop Moving:{' '}
              {
                item.stopMovingTime
              }
            </Text>

            <Text
              style={
                styles.text
              }
            >
              Drop Time:{' '}
              {item.dropTime?.toFixed(
                2
              )}
              s
            </Text>

            <Text
              style={
                styles.text
              }
            >
              In Target:{' '}
              {item.inTarget
                ? 'Yes'
                : 'No'}
            </Text>

            <Text
              style={
                styles.text
              }
            >
              Bounce:{' '}
              {item.bounced
                ? 'Yes'
                : 'No'}
            </Text>
<Text style={styles.text}>
  Impact Force:{' '}
  {item.impactForce}
</Text>
            <Text
              style={
                styles.text
              }
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

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        '#0B0820',
    },

    content: {
      padding: 20,
      paddingTop: 80,
      paddingBottom: 40,
    },

    title: {
      color: 'white',
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign:
        'center',
    },

    summaryCard: {
      backgroundColor:
        '#15112F',

      borderWidth: 2,
      borderColor:
        '#6954A6',

      borderRadius: 20,

      padding: 20,

      marginBottom: 20,
    },

    scoreTitle: {
      color: '#FFFFFF',

      textAlign:
        'center',

      fontSize: 16,
    },

    score: {
      color: '#FFE95B',

      textAlign:
        'center',

      fontSize: 42,

      fontWeight:
        'bold',

      marginTop: 10,
    },

    statsRow: {
      flexDirection:
        'row',

      justifyContent:
        'space-around',

      marginTop: 20,
    },

    statLabel: {
      color: '#BFC4FF',

      textAlign:
        'center',
    },

    statValue: {
      color: '#FFFFFF',

      fontSize: 24,

      fontWeight:
        'bold',

      textAlign:
        'center',
    },

    bestIteration: {
      color: '#FFE95B',

      fontSize: 24,

      fontWeight:
        'bold',

      marginTop: 5,
    },

    sectionTitle: {
      color: '#FFE95B',

      fontSize: 22,

      fontWeight:
        'bold',

      marginBottom: 16,
    },

    card: {
      backgroundColor:
        '#1A123D',

      padding: 16,

      borderRadius: 16,

      marginBottom: 12,
    },

    cardHeader: {
      flexDirection:
        'row',

      justifyContent:
        'space-between',

      alignItems:
        'center',

      marginBottom: 10,
    },

    stage: {
      color: '#FFD54F',

      fontSize: 20,

      fontWeight:
        'bold',
    },

    bestBadge: {
      color: '#FFE95B',

      fontWeight:
        'bold',
    },

    text: {
      color: 'white',

      fontSize: 16,

      marginBottom: 4,
    },
  });