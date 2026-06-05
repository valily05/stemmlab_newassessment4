import { db } from '@/services/firebase/config';
import { useLocalSearchParams } from 'expo-router';
import {
    VideoView,
    useVideoPlayer,
} from 'expo-video';
import {
    collection,
    getDocs,
    orderBy,
    query,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
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

const wp = (p: number) =>
  PixelRatio.roundToNearestPixel(
    (width * p) / 100
  );

const hp = (p: number) =>
  PixelRatio.roundToNearestPixel(
    (height * p) / 100
  );

const rf = (size: number) =>
  PixelRatio.roundToNearestPixel(
    (width / 390) * size
  );

export default function SessionDetails() {

  const { sessionId } =
    useLocalSearchParams();

  const [iterations,
    setIterations] =
    useState<any[]>([]);

  const [loading,
    setLoading] =
    useState(true);

  const [selectedIteration,
    setSelectedIteration] =
    useState(0);

  useEffect(() => {
    loadIterations();
  }, []);

  const loadIterations =
    async () => {

      try {

        const q = query(
          collection(
            db,
            'session',
            String(sessionId),
            'iterations'
          ),
          orderBy(
            'iterationNo',
            'asc'
          )
        );

        const snapshot =
          await getDocs(q);

        const data =
          snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

        setIterations(data);

      } catch (error) {

        console.log(
          'ITERATION ERROR',
          error
        );

      } finally {

        setLoading(false);

      }
    };

  const current =
    iterations[selectedIteration];

  const player =
    useVideoPlayer(
      current?.videoURL || ''
    );

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        SESSION DETAILS
      </Text>

      {loading ? (

        <ActivityIndicator
          size="large"
          color="#FFE95B"
        />

      ) : (

        <>

          {/* ITERATION TABS */}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={
              false
            }
            contentContainerStyle={
              styles.tabsContainer
            }
          >

            {iterations.map(
              (
                item,
                index
              ) => (

                <TouchableOpacity
                  key={item.id}
                  onPress={() =>
                    setSelectedIteration(
                      index
                    )
                  }
                  style={[
                    styles.tab,

                    selectedIteration ===
                      index &&
                      styles.activeTab,
                  ]}
                >

                  <Text
                    style={
                      styles.tabText
                    }
                  >
                    Iteration{' '}
                    {item.iterationNo}
                  </Text>

                </TouchableOpacity>

              )
            )}

          </ScrollView>

          {/* VIDEO */}

          <View
            style={styles.videoCard}
          >

            <Text
              style={styles.sectionTitle}
            >
              Recording
            </Text>

            {current?.videoURL ? (

              <VideoView
                player={player}
                style={
                  styles.video
                }
                allowsFullscreen
                allowsPictureInPicture
              />

            ) : (

              <View
                style={
                  styles.emptyVideo
                }
              >

                <Text
                  style={
                    styles.emptyText
                  }
                >
                  No Video
                </Text>

              </View>

            )}

          </View>

          {/* DETAILS */}

          <View
            style={styles.detailsCard}
          >

            <Text
              style={
                styles.sectionTitle
              }
            >
              Iteration Data
            </Text>

            <Text
              style={styles.detail}
            >
              Stage:{' '}
              {current?.stage}
            </Text>

            <Text
              style={styles.detail}
            >
              Drop Time:{' '}
              {current?.dropTime} ms
            </Text>

            <Text
              style={styles.detail}
            >
              First Hit:{' '}
              {
                current?.firstHitTime
              }
            </Text>

            <Text
              style={styles.detail}
            >
              Stop Moving:{' '}
              {
                current?.stopMovingTime
              }
            </Text>

            <Text
              style={styles.detail}
            >
              Impact Force:{' '}
              {
                current?.impactForce
              }
            </Text>

            <Text
              style={styles.detail}
            >
              In Target:{' '}
              {current?.inTarget
                ? 'YES'
                : 'NO'}
            </Text>

            <Text
              style={styles.detail}
            >
              Bounced:{' '}
              {current?.bounced
                ? 'YES'
                : 'NO'}
            </Text>

          </View>

        </>

      )}

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor:
      '#07021B',
    padding: wp(5),
    paddingTop: hp(8),
  },

  title: {
    color: '#FFE95B',
    fontSize: rf(22),
    fontFamily: 'Pixel',
    marginBottom: hp(2),
  },

  tabsContainer: {
    paddingBottom: hp(2),
  },

  tab: {
    backgroundColor:
      '#242630',

    borderWidth: 1,
    borderColor:
      'rgba(255,255,255,0.1)',

    borderRadius: rf(10),

    paddingHorizontal:
      wp(4),

    paddingVertical:
      hp(1),

    marginRight: wp(2),
  },

  activeTab: {
    backgroundColor:
      '#3A245E',

    borderColor:
      '#C86DFF',
  },

  tabText: {
    color: '#FFF',
    fontFamily:
      'PixelOperator',
  },

  videoCard: {
    backgroundColor:
      '#150F31',

    borderRadius: rf(16),

    padding: rf(14),

    marginBottom: hp(2),
  },

  sectionTitle: {
    color: '#FFF',
    fontSize: rf(18),
    fontFamily: 'Pixel',
    marginBottom: hp(1),
  },

  video: {
    width: '100%',
    height: hp(28),
    borderRadius: rf(12),
  },

  emptyVideo: {
    height: hp(28),

    justifyContent:
      'center',

    alignItems:
      'center',
  },

  emptyText: {
    color: '#AAA',
    fontFamily:
      'PixelOperator',
  },

  detailsCard: {
    backgroundColor:
      '#150F31',

    borderRadius: rf(16),

    padding: rf(16),
  },

  detail: {
    color: '#D1D5DB',
    marginBottom: hp(1),
    fontFamily:
      'PixelOperator',
  },

});