import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import ExitButton from '@/components/activity/ExitButton';
import ExperimentHero from '@/components/activity/ExperimentHero';
import ExperimentStats from '@/components/activity/ExperimentStats';
import ExperimentTipCard from '@/components/activity/ExperimentTipCard';
import InfoModal from '@/components/activity/InfoModal';
import LocationCompleteModal from '@/components/activity/LocationCompleteModal';
import LocationHowItWorks from '@/components/activity/LocationHowItWorks';
import RecordingExperimentCard from '@/components/activity/RecordingExperimentCard';
import SoundExperimentCard from '@/components/activity/SoundExperimentCard';
import { activities } from '@/data/activities';
import { auth } from '@/services/firebase/config';
import { createLocation } from '@/services/firebase/locationService';
import { createSession } from '@/services/firebase/sessionService';
import { getUserProfile } from '@/services/firebase/userService';
import * as Location from 'expo-location';
import { Timestamp } from 'firebase/firestore';

const activity = activities.activity2;

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

const stages = [
  'LOCATION',
  'TALKING',
  'DROPPING',
  'STOMPING',
];

export default function Activity2Experiment() {
  // Retrieve the prediction parameter passed from the previous screen
  const { prediction } = useLocalSearchParams<{ prediction?: string }>();

  const [locationNumber, setLocationNumber] = useState(1);
  const [currentStage, setCurrentStage] = useState(0);
  const [sessionID, setSessionID] = useState('');
  const [locationID, setLocationID] = useState('');
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [locationName, setLocationName] = useState('');
  const [showLocationComplete, setShowLocationComplete] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Log the prediction to verify it was received on the experiment page
    if (prediction) {
      console.log('Received prediction on Experiment page:', prediction);
    }
  }, [prediction]);

  useEffect(() => {
    if (!hasStarted) return;

    const timer = setInterval(() => {
      setTimeLeft(prev =>
        prev > 0 ? prev - 1 : 0
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted]);

  const detectLocation = async () => {
    setLoadingLocation(true);

    const { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setLoadingLocation(false);
      return;
    }

    const currentLocation =
      await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

    setLocation(currentLocation);
    setHasStarted(true);
    setLoadingLocation(false);
  };

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <LinearGradient
      colors={[
        '#0B0820', 
        '#14103A', 
        '#1D1854',
        '#26216D',
        '#312C88',
        '#3A35A3',
      ]}
      locations={[0, 0.50, 0.75, 0.88, 0.94, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => setShowInfo(true)}
        >
          <Image
            source={require('@/assets/images/info-icon.png')}
            style={styles.infoIcon}
          />
        </TouchableOpacity>

        <ExperimentHero
          title={activity.title}
          image={require('@/assets/images/sound-bunny.png')}
          imageStyle={{
            width: wp(39),
            height: hp(20),
            right: -wp(9),
          }}
          activityID={2}
          description={
            currentStage === 0 ? (
              <Text style={styles.heroDescription}>
                Detect and save your{' '}
                <Text style={styles.pinkText}>
                  CURRENT LOCATION
                </Text>{' '}
                before measuring sound level.
              </Text>
            ) : (
              <Text style={styles.heroDescription}>
                Record the{' '}
                <Text style={styles.pinkText}>
                  {stages[currentStage]}
                </Text>{' '}
                sound for this location.
              </Text>
            )
          }
        />

        <ExperimentStats
          timeLeft={formatCountdown(timeLeft)}
          iteration={stages[currentStage]}
        />

        {currentStage === 0 ? (
          <SoundExperimentCard
            location={location}
            loadingLocation={loadingLocation}
            locationName={locationName}
            setLocationName={setLocationName}
            onDetectLocation={detectLocation}
            onSaveLocation={async () => {
              if (!locationName.trim()) {
                Alert.alert("Please enter a location name.");
                return;
              }

              try {
                let currentSessionID = sessionID;

                if (!currentSessionID) {
                  const uid = auth.currentUser?.uid;
                  if (!uid) throw new Error("User not logged in");

                  const profile = await getUserProfile(uid);
                  if (!profile?.teamID) throw new Error("No team found");

                  currentSessionID = await createSession({
                    activityID: 2,
                    teamID: profile.teamID,
                    experimentTime: 0,
                    totalIterations: 0,
                    pointsEarned: 0,
                    completedAt: Timestamp.now(),
                    insights: {},
                  });

                  setSessionID(currentSessionID);
                }

                const newLocationID = await createLocation(
                  currentSessionID,
                  {
                    locationNo: locationNumber,
                    name: locationName,
                    latitude: location!.coords.latitude,
                    longitude: location!.coords.longitude,
                  }
                );
                setLocationID(newLocationID);
                setCurrentStage(1);
                setLocation(null);
                setLocationName("");
              } catch (e) {
                console.log(e);
                Alert.alert("Failed to save location.");
              }
            }}
            onInputFocus={() => {
              scrollRef.current?.scrollTo({
                y: hp(55),
                animated: true,
              });
            }}
          />
        ) : (
          <RecordingExperimentCard
            key={currentStage}
            sessionID={sessionID}
            locationID={locationID}
            stage={stages[currentStage]}
            iteration={currentStage}
            onNext={() => {
              setCurrentStage(prev => prev + 1);
            }}
            isLastIteration={currentStage === stages.length - 1}
            onFinishLocation={() => setShowLocationComplete(true)}
          />
        )}

        {currentStage === 0 && !hasStarted && (
          <LocationHowItWorks />
        )}
        
        {currentStage === 0 ? (
          <ExperimentTipCard
            tips={['Stay at the same spot while detecting your location.']}
          />
        ) : (
          <ExperimentTipCard
            tips={[
              'Keep the phone close to the sound source.',
              'Avoid covering the microphone.',
              'Record only the requested sound.',
            ]}
          />
        )}

        <ExitButton onPress={() => router.back()} />
      </ScrollView>

      <InfoModal
        visible={showInfo}
        title={
          currentStage === 0
            ? "HOW TO COMPLETE THIS ACTIVITY"
            : "HOW TO RECORD"
        }
        instructions={
          currentStage === 0
            ? [
                'Tap Detect Location.',
                'Allow GPS permission.',
                'Give your location a name.',
                'Save the location.',
              ]
            : [
                'Press Start Recording.',
                'Perform the sound.',
                'Stop recording.',
                'Save iteration.',
              ]
        }
        onClose={() => setShowInfo(false)}
      />
      
      <LocationCompleteModal
        visible={showLocationComplete}
        onAddAnother={() => {
          setShowLocationComplete(false);
          setLocationNumber(prev => prev + 1);
          setCurrentStage(0);
          setLocation(null);
          setLocationName("");
          setLocationID("");
        }}
        onFinish={() => {
          setShowLocationComplete(false);
          // Forward both sessionID and the prediction param to the results screen
          router.push({
            pathname: "/activities/activity2/results",
            params: {
              activityID: 2,
              sessionID,
              prediction: prediction || '',
            },
          });
        }}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: hp(4),
    paddingBottom: hp(5),
  },
  infoIcon: {
    width: rf(34),
    height: rf(34),
    resizeMode: 'contain',
  },
  infoButton: {
    position: 'absolute',
    top: hp(7),
    right: wp(6),
    zIndex: 999,
  },
  heroDescription: {
    color: '#FFFFFF',
    fontSize: rf(15),
    fontFamily: 'PixelOperator',
    lineHeight: rf(22),
    width: rf(252)
  },
  pinkText: {
    color: '#EC588C',
  },
});