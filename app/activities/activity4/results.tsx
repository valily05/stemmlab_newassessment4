import MaskedView from '@react-native-masked-view/masked-view';
import {
  ChartNoAxesColumn,
  Clock3,
  Crosshair,
  Download,
  RotateCcw,
  Star,
  Trophy,
  Video
} from 'lucide-react-native';
import { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import * as FileSystem from 'expo-file-system/legacy';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import * as Sharing from 'expo-sharing';
import {
  VideoView,
  useVideoPlayer,
} from 'expo-video';

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

export default function Activity4Results() {
  const params = useLocalSearchParams();

  const activityID = params.activityID;

  // const totalIterations = Number(
  //   params.totalIterations ?? 0
  // );

  const predictionText = params.prediction ? (params.prediction as string) : 'No prediction made';

  //let bestResult: any = null;

  // try {
  //   if (params.bestResult) {
  //     bestResult = JSON.parse(
  //       params.bestResult as string
  //     );
  //   }
  // } catch (error) {
  //   console.log(
  //     'BEST RESULT PARSE ERROR',
  //     error
  //   );
  // }

  let parsedResults: any[] = [];

  try {
    if (params.results) {
      parsedResults = JSON.parse(
        params.results as string
      );
      console.log(
        'PARSED RESULTS',
        parsedResults
      );
    }
  } catch (error) {
    console.log(
      'JSON PARSE ERROR:',
      error
    );
  }

  const bestResult =
    params.bestResult
      ? JSON.parse(params.bestResult as string)
      : null;

  const mostStableLayerDesign =
    params.mostStableLayerDesign as string;

  const shortestDistance =
    Number(params.shortestDistance);

  const lowestMovementLevel =
    params.lowestMovementLevel as string;

  const bestStability =
    Number(params.bestStability);

  const avgDistance =
    Number(params.avgDistance);

  const totalIterations =
    Number(params.totalIterations);

  const totalScore =
    Number(params.totalScore);

  const [selectedVideo, setSelectedVideo] =
    useState(0);

  const [isSaving, setIsSaving] = useState(false);

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

  const accelerationData = {
    labels: parsedResults.map(
      item =>
        item.stage.replace(
          'PROTOTYPE ',
          'P'
        )
    ),

    datasets: [
      {
        data: parsedResults.map(
          item =>
            Number(
              item.acceleration || 0
            )
        ),
      },
    ],
  };

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
        <MaskedView
          maskElement={
            <Text style={styles.title}>
              ACTIVITY {activityID} RESULTS
            </Text>
          }
        >
          <LinearGradient
            colors={[
              '#E39BFF',
              '#C86DFF',
              '#FF5BC7',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text
              style={[
                styles.title,
                { opacity: 0 },
              ]}
            >
              ACTIVITY {activityID} RESULTS
            </Text>
          </LinearGradient>
        </MaskedView>

        {/* Prediction vs Actual Display Box */}
        {/* <LinearGradient
          colors={[
            '#2A0D45',
            '#351058',
            '#2B0A3D',
            '#12031E',
          ]}
          locations={[0, 0.35, 0.7, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.predictionCard}
        >
          <Text style={styles.predictionCardTitle}>🔍 PREDICTION VS ACTUAL</Text>
          
          <View style={styles.predictionRow}>
            <Text style={styles.predictionLabel}>Your Prediction:</Text>
            <Text style={styles.predictionValueText}>{predictionText}</Text>
          </View>

          <View style={styles.predictionRow}>
            <Text style={styles.predictionLabel}>Best Performing Prototype:</Text>
            <Text style={styles.predictionValueText}>
              {bestResult ? bestResult.stage : '--'}
            </Text>
          </View>

          <View style={styles.predictionDivider} />

          <Text style={styles.predictionSummary}>
            {predictionText !== 'No prediction made' && bestResult
              ? predictionText.includes(bestResult.stage.replace('PROTOTYPE ', '')) 
                ? 'Spot on! Your prediction matched the best prototype.' 
                : 'Interesting results! Let’s analyze why the outcome differed from your prediction.'
              : 'Review your prototype data below to see how it compares.'}
          </Text>
        </LinearGradient> */}

        <LinearGradient
          colors={[
            '#2A0D45',
            '#351058',
            '#2B0A3D',
            '#12031E',
          ]}
          locations={[
            0,
            0.35,
            0.7,
            1,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <Text style={styles.heroTitle}>
            Total Score
          </Text>

          <View style={styles.scoreRow}>
            <Image
              source={require(
                '@/assets/images/medal.png'
              )}
              style={styles.bigMedal}
            />

            <MaskedView
              maskElement={
                <Text style={styles.heroScore}>
                  {params.totalScore}
                </Text>
              }
            >
              <LinearGradient
                colors={[
                  '#FFF8D6',
                  '#FFE95B',
                  '#FFC107',
                  '#FF9800',
                ]}
                locations={[
                  0,
                  0.35,
                  0.75,
                  1,
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text
                  style={[
                    styles.heroScore,
                    { opacity: 0 },
                  ]}
                >
                  {params.totalScore}
                </Text>
              </LinearGradient>
            </MaskedView>

            <Image
              source={require(
                '@/assets/images/medal.png'
              )}
              style={styles.bigMedal}
            />
          </View>

          <View style={styles.heroDivider} />

          <View style={styles.heroGrid}>
            <View style={styles.timeCard}>
              <Clock3 size={rf(30)} color="#ED359D" />
              <Text style={styles.statValue}>
                {formatSeconds(experimentTime)}
              </Text>
              <Text style={styles.statLabel}>
                Experiment Time
              </Text>
            </View>

            <View style={styles.iterationCard}>
              <RotateCcw size={rf(30)} color="#2B70DD" />
              <Text style={styles.statValue}>
                {totalIterations}
              </Text>
              <Text style={styles.statLabel}>
                Total Iterations
              </Text>
            </View>
          </View>

          <View style={styles.heroGrid}>
            <View style={styles.bestTimeCard}>
              <Trophy size={rf(30)} color="#FACC15" />
              <Text style={styles.statValue}>
                {bestResult
                  ? formatSeconds(bestResult.dropTime)
                  : '--'}
              </Text>
              <Text style={styles.statLabel}>
                Best Time
              </Text>
            </View>

            <View style={styles.accuracyCard}>
              <Crosshair size={rf(30)} color="#259F60" />
              <Text style={styles.statValue}>
                {accuracy}%
              </Text>
              <Text style={styles.statLabel}>
                Avg Accuracy
              </Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.videoCard}>
          <Video
            size={rf(26)}
            color="#C86DFF"
            style={{
              marginBottom:wp(-6.5),
              marginLeft:wp(2)
            }}
          />

          <View style={styles.videoTitleRow}>
            <Text style={styles.videoTitle}>
              EXPERIMENT RECORDINGS
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.videoTabs}
          >
            {parsedResults.map(
              (item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    setSelectedVideo(index)
                  }
                  style={[
                    styles.videoTab,

                    selectedVideo === index &&
                      styles.activeVideoTab,

                  ]}
                >
                  <Text
                    style={styles.videoTabText}
                  >
                    {bestResult?.stage === item.stage
                      ? `🏆 ${item.stage}`
                      : item.stage}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </ScrollView>

          <View style={styles.videoPlaceholder}>
            {currentVideo ? (
              <VideoView
                player={player}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: rf(14),
                }}
                allowsFullscreen
                allowsPictureInPicture
              />
            ) : (
              <>
                <Text style={styles.playIcon}>
                  ▶
                </Text>

                <Text style={styles.playText}>
                  No Video Available
                </Text>
              </>
            )}
          </View>

          <View style={styles.heightCard}>
            <Text style={styles.heightLabel}>
              DROP HEIGHT
            </Text>

            <Text style={styles.heightValue}>
              {parsedResults[0]?.dropHeight ?? '--'} m
            </Text>
          </View>

          <View style={styles.metricsCard}>
            <Text style={styles.metricsTitle}>
              EXPERIMENT DATA
            </Text>

            <View style={styles.metricsGrid}>
              <View style={styles.metricBox}>
                <Text style={styles.metricLabel}>
                  Velocity
                </Text>
                <Text style={styles.metricValue}>
                  {Number(
                    parsedResults[selectedVideo]?.velocity || 0
                  ).toFixed(2)} m/s
                </Text>
              </View>

              <View style={styles.metricBox}>
                <Text style={styles.metricLabel}>
                  Time To Stop
                </Text>
                <Text style={styles.metricValue}>
                  {formatSeconds(
                    parsedResults[selectedVideo]?.stopMovingTime
                  )}
                </Text>
              </View>

              <View style={styles.metricBox}>
                <Text style={styles.metricLabel}>
                  Acceleration
                </Text>
                <Text style={styles.metricValue}>
                  {Number(
                    parsedResults[selectedVideo]?.acceleration || 0
                  ).toFixed(2)}
                </Text>
              </View>

              <View style={styles.metricBox}>
                <Text style={styles.metricLabel}>
                  G-Force
                </Text>
                <Text style={styles.metricValue}>
                  {Number(
                    parsedResults[selectedVideo]?.gForce || 0
                  ).toFixed(2)} g
                </Text>
              </View>

              <View style={styles.metricBox}>
                <Text style={styles.metricLabel}>
                  First Hit Time
                </Text>

                <Text style={styles.metricValue}>
                  {formatSeconds(
                    parsedResults[selectedVideo]?.firstHitTime
                  )}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <LinearGradient
          colors={[
            '#2A0D45',
            '#351058',
            '#2B0A3D',
            '#12031E',
          ]}
          locations={[
            0,
            0.35,
            0.7,
            1,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.iterationSection}
        >
          <View style={styles.headerRow}>
            <View style={styles.sectionTitleRow}>
              <ChartNoAxesColumn
                size={rf(22)}
                color="#C86DFF"
              />

              <Text style={styles.sectionTitle}>
                ITERATION COMPARISON
              </Text>
            </View>

            <TouchableOpacity
              style={styles.csvButton}
              onPress={downloadResultsTable}
            >
              <Download
                size={rf(15)}
                color="#FFFFFF"
              />

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
                  bestResult?.stage === item.stage &&
                    styles.bestResultCard,
                ]}
              >
                <View style={styles.resultCardInner}>
                  <View style={styles.resultTop}>
                    <View>
                      <Text style={styles.resultStage}>
                        {item.stage}
                      </Text>

                      {bestResult?.stage ===
                        item.stage && (
                      <View style={styles.bestResultTag}>
                        <Star
                          size={rf(13)}
                          color="#FFD633"
                          fill="#FFD633"
                        />

                        <Text style={styles.bestResultTagText}>
                          BEST RESULT
                        </Text>
                      </View>
                      )}
                    </View>

                    <Text style={styles.resultTime}>
                      {formatSeconds(
                        item.dropTime
                      )}
                    </Text>
                  </View>

                  <View style={styles.resultRow}>
                    <View>
                      <Text style={styles.miniLabel}>
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
                      <Text style={styles.miniLabel}>
                        Impact Force
                      </Text>

                      <Text
                        style={[
                          styles.resultValue,
                          {
                            color:
                              item.impactForce === 'SAFE'
                                ? '#00E84A'
                                : item.impactForce === 'CAUTION'
                                ? '#FFD54F'
                                : item.impactForce === 'HIGH'
                                ? '#FF9800'
                                : item.impactForce === 'SEVERE'
                                ? '#FF4D4D'
                                : item.impactForce === 'EXTREME'
                                ? '#A00000'
                                : '#FFFFFF',
                          },
                        ]}
                      >
                        {item.impactForce}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )
          )}
        </LinearGradient>

        {/* <View style={styles.feedbackCard}>
          <Image
            source={require('@/assets/images/teacher.png')}
            style={styles.teacherImage}
          />

          <View style={styles.feedbackContent}>
            <Text style={styles.feedbackTitle}>
              GREAT WORK!
            </Text>

            <Text style={styles.feedbackText}>
              Your parachute improved significantly across iterations.{' '}

              <Text style={styles.highlightStage}>
                {bestResult?.stage}
              </Text>{' '}

              achieved the best landing performance with a flight time of{' '}

              <Text style={styles.highlightTime}>
                {bestResult
                  ? formatSeconds(
                      bestResult.dropTime
                    )
                  : '--'}
              </Text>
              .
            </Text>
          </View>
        </View> */}

        <TouchableOpacity
          style={[
            styles.saveButton,
            isSaving && { opacity: 0.7 },
          ]}
          onPress={() => 
            router.push({
              pathname: '/activities/activity1/feedback',
              params: {
                sessionID: params.sessionID,
                pointsEarned: params.totalScore,
              },
            })
          }
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <ActivityIndicator
                size="small"
                color="#FFFFFF"
              />
              <Text style={styles.saveButtonText}>
                SAVING RESULTS...
              </Text>
            </>
          ) : (
            <Text style={styles.saveButtonText}>
              SAVE & REFLECT
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#1D0E23',
  },
  content: {
    padding: wp(4),
    paddingTop: hp(12),
    paddingBottom: hp(10),
  },
  title: {
    color: '#FFFFFF',
    fontSize: rf(16),
    textAlign: 'center',
    marginBottom: hp(3),
    fontFamily: 'Pixel',
    letterSpacing: 1,
  },
  // Added Prediction Card Styles
  predictionCard: {
    borderRadius: rf(18),
    padding: rf(20),
    marginBottom: hp(3),
    borderWidth: 2,
    borderColor: 'rgba(200,109,255,0.2)',
    shadowColor:'#C86DFF',
    shadowOpacity:0.2,
    shadowRadius:20,
    shadowOffset:{
      width:0,
      height:0,
    },
    elevation:8,
    overflow:'hidden',
  },
  predictionCardTitle: {
    color: '#E39BFF',
    fontSize: rf(16),
    fontFamily: 'PixelBold',
    marginBottom: hp(1.5),
    textAlign: 'center',
  },
  predictionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp(0.4),
  },
  predictionLabel: {
    color: '#B8BED3',
    fontSize: rf(13),
    fontFamily: 'PixelOperator',
  },
  predictionValueText: {
    color: '#FFFFFF',
    fontSize: rf(13),
    fontFamily: 'PixelBold',
  },
  predictionDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginVertical: hp(1.5),
  },
  predictionSummary: {
    color: '#FFB3E6',
    fontSize: rf(11),
    fontFamily: 'PixelOperator',
    lineHeight: rf(15),
    textAlign: 'center',
  },
  graphCard:{
    backgroundColor:'#121127',
    borderRadius:rf(16),
    padding:rf(16),
    marginTop:hp(3),
    marginBottom:hp(3),
    borderWidth:1,
    borderColor:'rgba(255,255,255,0.08)',
  },
  graphTitle:{
    color:'#FFFFFF',
    fontSize:rf(20),
    fontFamily:'PixelBold',
    textAlign:'center',
  },
  graphSubtitle:{
    color:'#B8BED3',
    fontSize:rf(14),
    fontFamily:'PixelOperator',
    textAlign:'center',
    marginTop:hp(0.5),
    marginBottom:hp(1.5),
  },
  saveButton: {
    backgroundColor: '#7A4DFF',
    borderRadius: rf(18),
    paddingVertical: hp(2.2),
    marginTop: hp(3),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: rf(16),
    fontFamily: 'PixelBold',
  },
  metricsCard:{
    marginTop: hp(2),
    backgroundColor:'#121127',
    borderRadius:rf(14),
    padding:rf(16),
    borderWidth:1,
    borderColor:'rgba(255,255,255,0.08)',
  },
  metricsTitle:{
    color:'#FFFFFF',
    fontSize:rf(18),
    fontFamily:'PixelBold',
    marginBottom:hp(1.5),
  },
  heightCard:{
    marginTop: hp(2),
    backgroundColor:'#2B0A3D',
    borderRadius:rf(14),
    padding:rf(18),
    alignItems:'center',
    borderWidth:2,
    borderColor:'#C86DFF',
  },
  heightLabel:{
    color:'#B8BED3',
    fontSize:rf(13),
    fontFamily:'PixelOperator',
  },
  heightValue:{
    color:'#FFFFFF',
    fontSize:rf(32),
    fontFamily:'PixelBold',
    marginTop:hp(0.5),
  },
  metricsGrid:{
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
  },
  metricBox:{
    width:'48%',
    backgroundColor:'#1A1B35',
    borderRadius:rf(10),
    padding:rf(12),
    marginBottom:hp(1),
  },
  metricLabel:{
    color:'#9AA3D8',
    fontSize:rf(12),
    fontFamily:'PixelOperator',
  },
  metricValue:{
    color:'#FFFFFF',
    fontSize:rf(18),
    fontFamily:'PixelBold',
    marginTop:hp(0.5),
  },
  cvButton: {
    marginTop: hp(3),
    backgroundColor: '#121127',
    borderRadius: rf(18),
    padding: rf(18),
    borderWidth: 2,
    borderColor: '#6D4AFF',
    shadowColor: '#6D4AFF',
    shadowOpacity: 0.35,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 10,
  },
  cvButtonTitle: {
    color: '#FFFFFF',
    fontSize: rf(20),
    fontFamily: 'PixelBold',
    textAlign: 'center',
    marginBottom: hp(0.8),
  },
  cvButtonSubtitle: {
    color: '#B8BED3',
    fontSize: rf(14),
    fontFamily: 'PixelOperator',
    textAlign: 'center',
    lineHeight: rf(18),
  },
  iterationSection:{
    borderRadius:rf(18),
    borderWidth:2,
    borderColor:'rgba(255,255,255,0.08)',
    padding:rf(18),
    marginBottom:hp(2),
    shadowColor:'#A855F7',
    shadowOpacity:0.35,
    shadowRadius:25,
    shadowOffset:{
      width:0,
      height:0,
    },
    elevation:12,
    overflow:'hidden',
  },
  heroCard:{
    borderRadius: rf(18),
    padding: rf(24),
    marginBottom: hp(3),
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.08)',
    shadowColor:'#A855F7',
    shadowOpacity:0.35,
    shadowRadius:25,
    shadowOffset:{
      width:0,
      height:0,
    },
    elevation:12,
    overflow:'hidden',
  },
  bestResultCard:{
    backgroundColor:'#121127',
    borderWidth:2,
    borderColor:'#FF8C1A',
    shadowColor:'#FF8C1A',
    shadowOpacity:0.45,
    shadowRadius:12,
    shadowOffset:{
      width:0,
      height:0,
    },
    elevation:10,
  },
  heroTitle: {
    color: '#D8D8FF',
    fontSize: rf(20),
    textAlign: 'center',
    marginBottom: hp(1),
    fontWeight: '700',
    fontFamily:'PixelBold'
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(1),
  },
  bigMedal: {
    width: wp(14),
    height: wp(14),
    resizeMode: 'contain',
  },
  heroGrid:{
    flexDirection:'row',
    gap: wp(3),
    marginBottom: hp(1.5),
  },
  timeCard:{
    flex:1,
    backgroundColor:'rgba(237,53,157,0.12)',
    borderWidth:1,
    borderColor:'#ED359D',
    borderRadius:rf(10),
    padding:rf(14),
    alignItems:'center',
  },
  iterationCard:{
    flex:1,
    backgroundColor:'rgba(43,112,221,0.12)',
    borderWidth:1,
    borderColor:'#2B70DD',
    borderRadius:rf(10),
    padding:rf(14),
    alignItems:'center',
  },
  bestTimeCard:{
    flex:1,
    backgroundColor:'rgba(250,204,21,0.12)',
    borderWidth:1,
    borderColor:'#FACC15',
    borderRadius:rf(10),
    padding:rf(14),
    alignItems:'center',
  },
  accuracyCard:{
    flex:1,
    backgroundColor:'rgba(37,159,96,0.12)',
    borderWidth:1,
    borderColor:'#259F60',
    borderRadius:rf(10),
    padding:rf(14),
    alignItems:'center',
  },
  videoTab:{
    backgroundColor:'#242630',
    borderWidth:1,
    borderColor:'rgba(255,255,255,0.12)',
    borderRadius:rf(8),
    paddingHorizontal:wp(3),
    paddingVertical:hp(0.9),
    marginRight:wp(2),
    alignItems:'center',
    justifyContent:'center',
  },
  activeVideoTab:{
    backgroundColor:'#3A245E',
    borderColor:'#C86DFF',
    shadowColor:'#C86DFF',
    shadowOpacity:0.4,
    shadowRadius:8,
    shadowOffset:{
      width:0,
      height:0,
    },
    elevation:6,
  },
  videoTabText:{
    color:'#D5D7E0',
    fontSize:rf(13),
    fontFamily:'PixelOperator',
  },
  statValue:{
    color:'#FFFFFF',
    fontSize:rf(22),
    fontFamily:'PixelBold',
    marginTop:hp(1),
  },
  statLabel:{
    color:'#C6CAD5',
    fontSize:rf(17),
    textAlign:'center',
    marginTop:hp(0.5),
    fontFamily:'PixelOperator',
  },
  heroScore: {
    color: '#FFFFFF',
    fontSize: rf(70),
    fontWeight: '900',
    marginHorizontal: wp(4),
    fontFamily:'PixelBold'
  },
  heroDivider: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginVertical: hp(2),
  },
  videoTitleRow:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    gap: wp(1),
  },
  videoCard:{
    backgroundColor:'#0A0A0F',
    borderRadius:rf(16),
    borderWidth:1,
    borderColor:'#8A8A97',
    padding:rf(18),
    marginBottom:hp(3),
    shadowColor:'#A855F7',
    shadowOpacity:0.15,
    shadowRadius:20,
    shadowOffset:{
      width:0,
      height:0,
    },
    elevation:12,
  },
  videoTitle: {
    color: '#FFFFFF',
    fontSize: rf(21),
    fontWeight: 'bold',
    marginBottom: hp(2),
    fontFamily:'PixelBold'
  },
  videoPlaceholder:{
    height:hp(44),
    backgroundColor:'#242833',
    borderRadius:rf(14),
    borderWidth:1,
    borderColor:'rgba(255,255,255,0.06)',
    justifyContent:'center',
    alignItems:'center',
  },
  playIcon: {
    color: '#ffffff',
    fontSize: rf(60),
  },
  videoTabs:{
    flexDirection:'row',
    gap: wp(1),
    marginBottom: hp(2),
  },
  playText: {
    color: '#ffffff',
    fontSize: rf(12),
    marginTop: hp(1),
    fontWeight: 'bold',
    fontFamily:'Pixel'
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  sectionTitle:{
    color:'#FFFFFF',
    fontSize:rf(21),
    fontFamily:'PixelBold',
    marginLeft:rf(5)
  },
  sectionTitleRow:{
    flexDirection:'row',
    alignItems:'center',
    gap:wp(2),
  },
  csvButton:{
    flexDirection:'row',
    alignItems:'center',
    gap:wp(2),
    backgroundColor:'#7A4DFF',
    borderWidth:1,
    borderColor:'#B68CFF',
    borderRadius:rf(10),
    paddingHorizontal:wp(2),
    paddingVertical:hp(0.6),
    shadowColor:'#7A4DFF',
    shadowOpacity:0.35,
    shadowRadius:10,
    shadowOffset:{
      width:0,
      height:0,
    },
    elevation:8,
  },
  csvText: {
    color: '#FFFFFF',
    fontSize: rf(14),
    fontWeight: 'bold',
  },
  resultCard:{
    backgroundColor:'#5b6174',
    borderRadius:rf(18),
    padding:rf(2.7),
    marginBottom:hp(2.2),
  },
  resultCardInner: {
    backgroundColor: '#1A1B35',
    borderRadius: rf(16),
    padding: rf(14),
  },
  resultTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  resultStage: {
    color: '#FFFFFF',
    fontSize: rf(16),
    fontFamily: 'PixelBold',
  },
  bestResultTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,214,51,0.15)',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.3),
    borderRadius: rf(6),
    marginTop: hp(0.5),
    gap: 4,
  },
  bestResultTagText: {
    color: '#FFD633',
    fontSize: rf(10),
    fontFamily: 'PixelBold',
  },
  resultTime: {
    color: '#FFFFFF',
    fontSize: rf(20),
    fontFamily: 'PixelBold',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1),
  },
  miniLabel: {
    color: '#9AA3D8',
    fontSize: rf(10),
    fontFamily: 'PixelOperator',
  },
  resultValue: {
    fontSize: rf(13),
    fontFamily: 'PixelBold',
    marginTop: hp(0.2),
  },
  feedbackCard: {
    flexDirection: 'row',
    backgroundColor: '#121127',
    borderRadius: rf(18),
    padding: rf(16),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginTop: hp(3),
    alignItems: 'center',
    gap: 16,
  },
  teacherImage: {
    width: wp(16),
    height: wp(16),
    resizeMode: 'contain',
  },
  feedbackContent: {
    flex: 1,
  },
  feedbackTitle: {
    color: '#32FF7E',
    fontSize: rf(16),
    fontFamily: 'PixelBold',
    marginBottom: hp(0.5),
  },
  feedbackText: {
    color: '#B8BED3',
    fontSize: rf(12),
    fontFamily: 'PixelOperator',
    lineHeight: rf(16),
  },
  highlightStage: {
    color: '#C86DFF',
    fontFamily: 'PixelBold',
  },
  highlightTime: {
    color: '#FFC107',
    fontFamily: 'PixelBold',
  },
});