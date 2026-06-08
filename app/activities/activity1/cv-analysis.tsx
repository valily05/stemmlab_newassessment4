import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import {
  Brain,
  Rocket,
  TrendingUp,
  Video
} from 'lucide-react-native';
import { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } =
  Dimensions.get('window');

const wp = (percentage: number) =>
  PixelRatio.roundToNearestPixel(
    (width * percentage) / 100
  );

const hp = (percentage: number) =>
  PixelRatio.roundToNearestPixel(
    (height * percentage) / 100
  );

const rf = (size: number) => {
  const scale = width / 390;

  return Math.round(
    PixelRatio.roundToNearestPixel(
      size * scale
    )
  );
};

export default function CVAnalysis() {
  const params =
    useLocalSearchParams();

  const parsedResults =
    params.results
      ? JSON.parse(
          params.results as string
        )
      : [];
const [cvResult, setCvResult] =
  useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] =
    useState(false);

  const [
    analysisComplete,
    setAnalysisComplete,
  ] = useState(false);

  const [
    selectedIteration,
    setSelectedIteration,
  ] = useState(0);

const analyzeVideo = async () => {
  try {

    console.log(
      'CURRENT RESULT:',
      currentResult
    );

    setIsAnalyzing(true);
console.log(
  'SENDING VIDEO:',
  currentResult.videoURL
);
console.log("CURRENT RESULT:", currentResult);
    const response = await fetch(
      'http://192.168.0.200:8000/analyze',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
     body: JSON.stringify({
videoUrl: currentResult.videoURL,
  dropHeight: 5,
}),
      }
    );console.log("SENDING VIDEO:", currentResult.videoUrl);

    const data = await response.json();
setCvResult(data);
    console.log('CV RESULT:', data);

    setAnalysisComplete(true);

  } catch (err) {
    console.log('ANALYSIS ERROR:', err);
  } finally {
    setIsAnalyzing(false);
  }
};

  const currentResult =
    parsedResults[selectedIteration];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.content
      }
      showsVerticalScrollIndicator={
        false
      }
    >
      <Text style={styles.title}>
        AI MOTION ANALYSIS
      </Text>

      <LinearGradient
        colors={[
          '#2A0D45',
          '#351058',
          '#12031E',
        ]}
        style={styles.heroCard}
      >
        <Text style={styles.robot}>
          🤖
        </Text>

        <Text style={styles.heroTitle}>
          Experimental Feature
        </Text>

        <Text style={styles.heroSubtitle}>
          Uses Computer Vision to
          estimate trajectory,
          velocity and acceleration
          from recorded parachute
          experiments.
        </Text>
      </LinearGradient>

      <View style={styles.statusCard}>
        <Brain
          size={rf(32)}
          color="#C86DFF"
        />

        <Text style={styles.statusTitle}>
          Analysis Status
        </Text>

        <Text style={styles.statusText}>
          {analysisComplete
            ? 'Analysis Complete'
            : 'Not Analyzed Yet'}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        SELECT ITERATION
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={
          false
        }
      >
        {parsedResults.map(
          (
            item: any,
            index: number
          ) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                setSelectedIteration(
                  index
                )
              }
              style={[
                styles.iterationTab,

                selectedIteration ===
                  index &&
                  styles.activeIterationTab,
              ]}
            >
              <Text
                style={
                  styles.iterationText
                }
              >
                {item.stage}
              </Text>
            </TouchableOpacity>
          )
        )}
      </ScrollView>

      <View style={styles.previewCard}>
        <Video
          size={rf(28)}
          color="#C86DFF"
        />

        <Text style={styles.previewTitle}>
          SELECTED VIDEO
        </Text>

        <Text style={styles.previewStage}>
          {currentResult?.stage}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.analyzeButton}
        onPress={analyzeVideo}
        disabled={isAnalyzing}
      >
        {isAnalyzing ? (
          <>
            <ActivityIndicator
              color="#FFFFFF"
            />

            <Text
              style={
                styles.buttonText
              }
            >
              ANALYZING...
            </Text>
          </>
        ) : (
          <>
            <Rocket
              size={rf(18)}
              color="#FFFFFF"
            />

            <Text
              style={
                styles.buttonText
              }
            >
              ANALYZE VIDEO
            </Text>
          </>
        )}
      </TouchableOpacity>

      {analysisComplete && (
        <>
          <View
            style={styles.resultCard}
          >
            <Text
              style={
                styles.resultTitle
              }
            >
              AI MOTION RESULTS
            </Text>

            <View
              style={
                styles.metricRow
              }
            >
              <Text
                style={
                  styles.metricLabel
                }
              >
                Velocity
              </Text>

              <Text
                style={
                  styles.metricValue
                }
              >
              {cvResult?.velocity?.toFixed(2)}{' '}
                m/s
              </Text>
            </View>

            <View
              style={
                styles.metricRow
              }
            >
              <Text
                style={
                  styles.metricLabel
                }
              >
                Acceleration
              </Text>

              <Text
                style={
                  styles.metricValue
                }
              >
             {cvResult?.acceleration?.toFixed(2)}{' '}
                m/s²
              </Text>
            </View>

            <View
              style={
                styles.metricRow
              }
            >
              <Text
                style={
                  styles.metricLabel
                }
              >
                Confidence
              </Text>

              <Text
                style={[
                  styles.metricValue,
                  {
                    color:
                      '#32FF7E',
                  },
                ]}
              >
               {cvResult?.confidence}%
              </Text>
            </View>
          </View>

          <View
            style={styles.insightCard}
          >
            <TrendingUp
              size={rf(26)}
              color="#FFE95B"
            />

            <Text
              style={
                styles.insightTitle
              }
            >
              AI INSIGHT
            </Text>

            <Text
              style={
                styles.insightText
              }
            >
              The parachute showed
              stable descent behaviour
              with reduced impact
              acceleration. Further
              computer vision tracking
              will compare calculated
              and observed motion.
            </Text>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      '#1D0E23',
  },

  content: {
    padding: wp(5),
    paddingTop: hp(10),
    paddingBottom: hp(5),
  },

  title: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: rf(18),
    fontFamily: 'Pixel',
    marginBottom: hp(3),
  },

  heroCard: {
    borderRadius: rf(18),
    padding: rf(20),
    alignItems: 'center',
  },

  robot: {
    fontSize: rf(48),
  },

  heroTitle: {
    color: '#FFFFFF',
    fontSize: rf(24),
    fontFamily: 'PixelBold',
    marginTop: hp(1),
  },

  heroSubtitle: {
    color: '#C6CAD5',
    textAlign: 'center',
    marginTop: hp(1),
    fontFamily: 'PixelOperator',
  },

  statusCard: {
    backgroundColor:
      '#121127',
    borderRadius: rf(18),
    padding: rf(18),
    alignItems: 'center',
    marginTop: hp(3),
  },

  statusTitle: {
    color: '#FFFFFF',
    fontFamily: 'PixelBold',
    marginTop: hp(1),
  },

  statusText: {
    color: '#C86DFF',
    marginTop: hp(0.5),
    fontFamily:
      'PixelOperator',
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontFamily: 'PixelBold',
    marginTop: hp(3),
    marginBottom: hp(1),
  },

  iterationTab: {
    backgroundColor:
      '#242630',
    paddingHorizontal:
      wp(4),
    paddingVertical:
      hp(1),
    borderRadius: rf(10),
    marginRight: wp(2),
  },

  activeIterationTab: {
    backgroundColor:
      '#6D4AFF',
  },

  iterationText: {
    color: '#FFFFFF',
    fontFamily:
      'PixelOperator',
  },

  previewCard: {
    backgroundColor:
      '#121127',
    borderRadius: rf(18),
    padding: rf(20),
    alignItems: 'center',
    marginTop: hp(3),
  },

  previewTitle: {
    color: '#FFFFFF',
    fontFamily: 'PixelBold',
    marginTop: hp(1),
  },

  previewStage: {
    color: '#C86DFF',
    marginTop: hp(0.5),
  },

  analyzeButton: {
    backgroundColor:
      '#6D4AFF',
    borderRadius: rf(16),
    paddingVertical:
      hp(2),
    justifyContent:
      'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginTop: hp(3),
  },

  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'PixelBold',
  },

  resultCard: {
    backgroundColor:
      '#121127',
    borderRadius: rf(18),
    padding: rf(18),
    marginTop: hp(3),
  },

  resultTitle: {
    color: '#FFFFFF',
    fontFamily: 'PixelBold',
    marginBottom: hp(2),
  },

  metricRow: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    marginBottom: hp(1),
  },

  metricLabel: {
    color: '#B8BED3',
    fontFamily:
      'PixelOperator',
  },

  metricValue: {
    color: '#FFFFFF',
    fontFamily: 'PixelBold',
  },

  insightCard: {
    backgroundColor:
      '#2B0A3D',
    borderRadius: rf(18),
    padding: rf(18),
    marginTop: hp(3),
    alignItems: 'center',
  },

  insightTitle: {
    color: '#FFE95B',
    fontFamily: 'PixelBold',
    marginTop: hp(1),
  },

  insightText: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: hp(1),
    fontFamily:
      'PixelOperator',
  },
});