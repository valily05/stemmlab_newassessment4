import * as FileSystem from 'expo-file-system/legacy';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import * as Sharing from 'expo-sharing';
import {
  Clock3,
  Crosshair,
  RotateCcw,
  Trophy,
} from 'lucide-react-native';
import {
  Dimensions,
  Image,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
const { width, height } = Dimensions.get('window');

const wp = (percentage: number) =>
  PixelRatio.roundToNearestPixel(
    (width * percentage) / 100
  );

const rf = (size: number) => {
  const scale = width / 390;

  return Math.round(
    PixelRatio.roundToNearestPixel(
      size * scale
    )
  );
};
const hp = (percentage: number) =>
  PixelRatio.roundToNearestPixel(
    (height * percentage) / 100
  );
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
    (total, item) =>
      total + (item.dropTime || 0),
    0
  );

const formatSeconds = (
  value: string | number | null | undefined
) => {
  if (value === null || value === undefined) {
    return '0.00 s';
  }

  if (typeof value === 'number') {
    return `${(value / 1000).toFixed(2)} s`;
  }

  const parts = value.split(':');

  if (parts.length === 2) {
    const minutes = Number(parts[0]);
    const seconds = Number(parts[1]);

    return `${(
      minutes * 60 +
      seconds
    ).toFixed(2)} s`;
  }

  return value;
};
const downloadResultsTable = async () => {
  const csvContent = [
    [
      'Iteration',
      'First Hit (s)',
      'Stop Moving (s)',
      'Drop Time (s)',
      'In Target',
      'Bounce',
      'Impact Force',
    ].join(','),

    ...parsedResults.map(item =>
      [
        item.stage,
        formatSeconds(item.firstHitTime).replace(' s', ''),
        formatSeconds(item.stopMovingTime).replace(' s', ''),
        formatSeconds(item.dropTime).replace(' s', ''),
        item.inTarget ? 'Yes' : 'No',
        item.bounced ? 'Yes' : 'No',
        item.impactForce,
      ].join(',')
    ),
  ].join('\n');

const fileUri =
  FileSystem.documentDirectory +
  'Activity1Results.csv';
  await FileSystem.writeAsStringAsync(
    fileUri,
    csvContent
  );

  await Sharing.shareAsync(fileUri);
};

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
        best.inTarget ? 1 : 0;

      const currentTarget =
        current.inTarget ? 1 : 0;

      if (
        currentTarget >
        bestTarget
      ) {
        return current;
      }

if (
  currentTarget === bestTarget &&
  current.dropTime > best.dropTime
) {
  return current;
}

      return best;
    },
    null as any
  );

const impactScore =
  bestResult?.impactForce === 'Low'
    ? 500
    : bestResult?.impactForce ===
      'Medium'
    ? 250
    : 0;

const accuracyScore =
  accuracy * 2.5;

const dropTimeScore =
  Math.min(
    150,
    bestResult
      ? bestResult.dropTime / 50
      : 0
  );

const experimentScore =
  Math.min(
    100,
    experimentTime / 200
  );

const totalScore =
  Math.round(
    impactScore +
    accuracyScore +
    dropTimeScore +
    experimentScore
  );

return (
  <View style={styles.container}>
    <ScrollView
      contentContainerStyle={
        styles.content
      }
      showsVerticalScrollIndicator={
        false
      }
    >
      <Text style={styles.title}>
        ACTIVITY 1 RESULTS
      </Text>

<LinearGradient
  colors={[
    '#090714',
    '#120D2D',
    '#1A1242',
    '#24185A',
  ]}
  locations={[
    0,
    0.45,
    0.75,
    1,
  ]}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.heroCard}
>

<Text style={styles.heroTitle}>
  Total Score:
</Text>

<View style={styles.scoreRow}>

  <Image
    source={require(
      '@/assets/images/medal.png'
    )}
    style={styles.bigMedal}
  />

<Text style={styles.heroScore}>
  {totalScore}
</Text>
 <Image
  source={require(
    '@/assets/images/medal.png'
  )}
  style={styles.bigMedal}
/>

</View>

<View style={styles.heroDivider} />

<View style={styles.heroGrid}>

  <View style={styles.heroStatRow}>
    <Clock3
      size={rf(34)}
      color="#A855F7"
      strokeWidth={2.5}
    />

    <View>
      <Text style={styles.heroLabel}>
        EXPERIMENT TIME
      </Text>

      <Text style={styles.heroValue}>
        {formatSeconds(experimentTime)}
      </Text>
    </View>
  </View>

  <View style={styles.heroStatRow}>
    <RotateCcw
      size={rf(34)}
      color="#60A5FA"
      strokeWidth={2.5}
    />

    <View>
      <Text style={styles.heroLabel}>
        TOTAL ITERATIONS
      </Text>

      <Text style={styles.heroValue}>
        {totalIterations}
      </Text>
    </View>
  </View>

</View>





  <View style={styles.heroGrid}>
<View style={styles.heroStatRow}>
  <Trophy
    size={rf(34)}
    color="#FACC15"
    strokeWidth={2.5}
  />

  <View>
    <Text style={styles.heroLabel}>
      BEST TIME
    </Text>

    <Text style={styles.heroValue}>
      {bestResult
        ? formatSeconds(
            bestResult.dropTime
          )
        : '--'}
    </Text>
  </View>
</View>

<View style={styles.heroStatRow}>
  <Crosshair
    size={rf(34)}
    color="#4ADE80"
    strokeWidth={2.5}
  />

  <View>
    <Text style={styles.heroLabel}>
      AVG ACCURACY
    </Text>

    <Text style={styles.heroValue}>
      {accuracy}%
    </Text>
  </View>
</View>


</View>
</LinearGradient>
<View style={styles.videoCard}>

  <Text style={styles.videoTitle}>
    🎥 EXPERIMENT RECORDING
  </Text>

  <TouchableOpacity
    style={styles.videoPlaceholder}
  >
    <Text style={styles.playIcon}>
      ▶
    </Text>

    <Text style={styles.playText}>
      PLAY VIDEO
    </Text>
  </TouchableOpacity>

</View>


<View style={styles.headerRow}>

  <Text style={styles.sectionTitle}>
    ITERATION COMPARISON
  </Text>

  <TouchableOpacity
    style={styles.csvButton}
    onPress={downloadResultsTable}
  >
    <Text style={styles.csvText}>
      CSV
    </Text>
  </TouchableOpacity>

</View>
    {parsedResults.map(
  (
    item: any,
    index: number
  ) => (
    <View
      key={index}
      style={[
        styles.resultCard,

        bestResult?.stage ===
          item.stage && {
          borderWidth: 3,
          borderColor:
            '#FFE95B',
        },
      ]}
    >


      <View
        style={
          styles.resultTop
        }
      >
        <View>
          <Text
            style={
              styles.resultStage
            }
          >
            {item.stage}
          </Text>

          {bestResult?.stage ===
            item.stage && (
            <Text
              style={
                styles.bestResultTag
              }
            >
              ⭐ BEST RESULT
            </Text>
          )}
        </View>

        <Text
          style={
            styles.resultTime
          }
        >
          {formatSeconds(
            item.dropTime
          )}
        </Text>
      </View>

      <View
        style={
          styles.resultRow
        }
      >
        <View>
          <Text
            style={
              styles.miniLabel
            }
          >
            Landing Accuracy
          </Text>

          <Text
            style={[
              styles.resultValue,

              {
                color:
                  item.inTarget
                    ? '#32FF7E'
                    : '#FF6B6B',
              },
            ]}
          >
            {item.inTarget
              ? 'IN TARGET'
              : 'OFF TARGET'}
          </Text>
        </View>

        <View>
          <Text
            style={
              styles.miniLabel
            }
          >
            Impact Force
          </Text>

          <Text
            style={[
              styles.resultValue,

              {
     color:
  item.impactForce?.toLowerCase() === 'low'
    ? '#40A560'
    : item.impactForce?.toLowerCase() === 'medium'
    ? '#FFC509'
    : item.impactForce?.toLowerCase() === 'high'
    ? '#DC412F'
    : '#FFFFFF',
              },
            ]}
          >
{item.impactForce}     </Text>
        </View>
        
      </View>

    </View>
    
  )
)}
<View style={styles.feedbackCard}>

  <Text style={styles.feedbackTitle}>
    GREAT WORK!
  </Text>

<Text style={styles.feedbackText}>
  Great work! Your parachute
  improved significantly across
  iterations.{' '}

  <Text
    style={styles.highlightStage}
  >
    {bestResult?.stage}
  </Text>{' '}

  achieved the best landing
  performance with a flight time
  of{' '}

  <Text
    style={styles.highlightTime}
  >
    {bestResult
      ? formatSeconds(
          bestResult.dropTime
        )
      : '--'}
  </Text>

  .
</Text>
<TouchableOpacity
  style={styles.saveButton}
>
  <Text style={styles.saveButtonText}>
    SAVE & REFLECT
  </Text>
</TouchableOpacity>
</View>
</ScrollView>
</View>
);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  backgroundColor:'#050816',
  },

  content: {
    padding: wp(6),
    paddingTop: hp(9),
    paddingBottom: hp(10),
  },

  title: {
    color: '#FFFFFF',
    fontSize: rf(14),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: hp(2),
    fontFamily: 'Pixel',
    letterSpacing: 1,
  },

heroCard:{
  borderRadius: rf(28),

  padding: rf(24),

  marginBottom: hp(3),

  shadowColor:'#5A3DFF',
  shadowOpacity:0.6,
  shadowRadius:20,
  shadowOffset:{
    width:0,
    height:0,
  },

  elevation:15,

  overflow:'hidden',
},

  heroTitle: {
    color: '#D8D8FF',
    fontSize: rf(18),
    textAlign: 'center',
    marginBottom: hp(1),
    fontWeight: '700',
  },

  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(2),
  },

  bigMedal: {
    width: wp(14),
    height: wp(14),
    resizeMode: 'contain',
  },

  heroScore: {
    color: '#FFFFFF',
    fontSize: rf(64),
    fontWeight: '900',
    marginHorizontal: wp(4),
  },

  heroDivider: {
    height: 1,
    backgroundColor: '#4A4A7A',
    marginVertical: hp(2),
  },

  heroGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(1.5),
  },

  heroItem: {
    flex: 1,
    alignItems: 'center',
  },

  heroLabel: {
    color: '#AAB5FF',
    fontSize: rf(12),
    marginBottom: hp(0.5),
  },
heroStatRow: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: wp(3),
},
  heroValue: {
    color: '#FFFFFF',
    fontSize: rf(24),
    fontWeight: 'bold',
  },

  videoCard: {
    backgroundColor: '#121127',
    borderRadius: rf(24),
    padding: rf(20),
    marginBottom: hp(3),
    borderWidth: 2,
    borderColor: '#30265A',
  },

  videoTitle: {
    color: '#FFFFFF',
    fontSize: rf(18),
    fontWeight: 'bold',
    marginBottom: hp(2),
  },

  videoPlaceholder: {
    height: hp(24),
    borderRadius: rf(20),
    backgroundColor: '#080A1E',
    justifyContent: 'center',
    alignItems: 'center',
  },

  playIcon: {
    color: '#9B5DFF',
    fontSize: rf(60),
  },

  playText: {
    color: '#9B5DFF',
    fontSize: rf(16),
    marginTop: hp(1),
    fontWeight: 'bold',
  },


  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(2),
  },

  sectionTitle: {
    color: '#FFE95B',
    fontSize: rf(22),
    fontWeight: 'bold',
  },

  csvButton: {
    backgroundColor: '#2D1E6F',
    borderRadius: rf(12),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
  },

  csvText: {
    color: '#FFFFFF',
    fontSize: rf(14),
    fontWeight: 'bold',
  },

  resultCard: {
    backgroundColor: '#121127',
    borderRadius: rf(22),
    padding: rf(20),
    marginBottom: hp(2),
    borderWidth: 2,
    borderColor: '#30265A',
  },

  resultTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(2),
  },

  resultStage: {
    color: '#FFFFFF',
    fontSize: rf(20),
    fontWeight: 'bold',
  },

  bestResultTag: {
    color: '#FFE95B',
    fontSize: rf(13),
    fontWeight: 'bold',
    marginTop: hp(0.5),
  },

  resultTime: {
    color: '#FFE95B',
    fontSize: rf(30),
    fontWeight: '900',
  },

  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1),
  },

  miniLabel: {
    color: '#9AA3D8',
    fontSize: rf(12),
    marginBottom: hp(0.5),
  },

  resultValue: {
    fontSize: rf(16),
    fontWeight: 'bold',
  },

  feedbackCard: {
    backgroundColor: '#121127',
    borderRadius: rf(24),
    padding: rf(24),
    marginTop: hp(2),
    borderWidth: 2,
    borderColor: '#30265A',
  },

  feedbackTitle: {
    color: '#FFE95B',
    fontSize: rf(22),
    fontWeight: 'bold',
    marginBottom: hp(1),
  },

  feedbackText: {
    color: '#D6D8FF',
    fontSize: rf(16),
    lineHeight: rf(24),
  },

  highlightStage: {
    color: '#FFE95B',
    fontWeight: 'bold',
  },

  highlightTime: {
    color: '#32FF7E',
    fontWeight: 'bold',
  },

  saveButton: {
    backgroundColor: '#7A4DFF',
    borderRadius: rf(18),
    paddingVertical: hp(2.2),
    marginTop: hp(3),
    alignItems: 'center',
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: rf(22),
    fontWeight: '900',
  },
});