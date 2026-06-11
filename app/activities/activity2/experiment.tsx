import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
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
import LocationHowItWorks from '@/components/activity/LocationHowItWorks';
import SoundExperimentCard from '@/components/activity/SoundExperimentCard';
import { activities } from '@/data/activities';
import * as Location from 'expo-location';


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
];

export default function Activity2Experiment() {
  const [location, setLocation] =
  useState<Location.LocationObject | null>(null);
const [locationName, setLocationName] = useState('');

const [loadingLocation, setLoadingLocation] =
  useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20 * 60);
const scrollRef = useRef<ScrollView>(null);
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
  const formatCountdown = (
    seconds: number
  ) => {
    const mins = Math.floor(
      seconds / 60
    );

    const secs = seconds % 60;

    return `${String(mins).padStart(
      2,
      '0'
    )}:${String(secs).padStart(
      2,
      '0'
    )}`;
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
      locations={[
        0,
        0.50,
        0.75,
        0.88,
        0.94,
        1,
      ]}
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
          onPress={() =>
            setShowInfo(true)
          }
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
          activityNumber={2}
          description={
            <Text style={styles.heroDescription}>
              Detect and save your{' '}
              <Text style={styles.pinkText}>
                CURRENT LOCATION
              </Text>{' '}
              before measuring sound level.
            </Text>
          }
        />

        <ExperimentStats
          timeLeft={formatCountdown(timeLeft)}
iteration="LOCATION"
        />
<SoundExperimentCard
  location={location}
  loadingLocation={loadingLocation}
  locationName={locationName}
  setLocationName={setLocationName}
  onDetectLocation={detectLocation}
  onSaveLocation={() => {
    if (!locationName.trim()) {
      Alert.alert('Please enter a location name.');
      return;
    }

    // TODO: Save location and continue
  }}
  onInputFocus={() => {
    scrollRef.current?.scrollTo({
      y: hp(55),
      animated: true,
    });
  }}
/>

        {!hasStarted ? (
          <LocationHowItWorks/>
        ) : null}

        {!hasStarted && (
          <ExperimentTipCard
tips={[
  'Stay at the same spot while detecting your location. Move to a different location after completing all sound activities.',
]}
          />
        )}

        <ExitButton
          onPress={() =>
            router.back()
          }
        />
      </ScrollView>

      <InfoModal
        visible={showInfo}
        title="HOW TO COMPLETE THIS ACTIVITY"
instructions={[
  'Tap Detect Location.',
  'Allow GPS permission.',
  'Give your location a name.',
  'Save the location.',
  'Continue to the first sound activity.',
]}
        onClose={() =>
          setShowInfo(false)
        }
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