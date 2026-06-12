import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import {
  Alert,
  Dimensions,
  ImageBackground,
  PixelRatio,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';

import ActivityHeader from '@/components/activity/ActivityHeader';
import ActivityHero from '@/components/activity/ActivityHero';
import ActivityStats from '@/components/activity/ActivityStats';
import LocationAccess from "@/components/activity/LocationAccess";
import MaterialsChecklist from '@/components/activity/MaterialsChecklist';
import ProgressBar from '@/components/activity/ProgressBar';
import ReferenceSetupCard from '@/components/activity/ReferenceSetupCard';
import SafetyNotes from '@/components/activity/SafetyNotes';
import SetupGuideCarousel from '@/components/activity/SetupGuideCarousel';
import SoundMeterTest from '@/components/activity/soundmetertest';
import StartButton from '@/components/activity/StartButton';
import StepInstructions from '@/components/activity/StepInstructions';
import PixelDivider from '@/components/PixelDivider';
import { activities } from '@/data/activities';

import { auth } from '@/services/firebase/config';
import { getUserProfile } from '@/services/firebase/userService';

const activity = activities.activity2;


const { width, height } = Dimensions.get('window');

/* RESPONSIVE HELPERS */
const wp = (percentage: number) => {
  return PixelRatio.roundToNearestPixel(
    (width * percentage) / 100
  );
};

const hp = (percentage: number) => {
  return PixelRatio.roundToNearestPixel(
    (height * percentage) / 100
  );
};

const rf = (size: number) => {

  const scale = width / 390;

  return Math.round(
    PixelRatio.roundToNearestPixel(
      size * scale
    )
  );

};

useEffect(() => {
  const checkTeam = async () => {
    const uid = auth.currentUser?.uid;

    if(!uid) return;

    const profile = await getUserProfile(uid);

    if(!profile?.teamID) {
      Alert.alert(
        'Join a Team First',
        'You must join a team before starting activities.',
        [
          {
            text: 'Go to Teams',
            onPress: () => router.replace('/team')
          },
        ]
      );
    }
  };

  checkTeam();
}, []);

export default function Activity2Overview() {
const [materialProgress,
  setMaterialProgress] =
  useState(0);


const [safetyComplete,
  setSafetyComplete] =
  useState(false);
  const [soundMeterVerified,
  setSoundMeterVerified] =
  useState(false);
  const [locationVerified, setLocationVerified] =
  useState(false);
const progress = Math.round(
  materialProgress * 0.3 +
  (soundMeterVerified ? 20 : 0) +
  (locationVerified ? 20 : 0) +
  (safetyComplete ? 30 : 0)
);
const canStart =
  materialProgress >= 80 
  // &&
  // soundMeterVerified &&
  // locationVerified &&
  // safetyComplete;

  const missingSteps = [];

if (materialProgress !== 100) {
  missingSteps.push("Materials");
}

if (!soundMeterVerified) {
  missingSteps.push("Sound Meter");
}

if (!locationVerified) {
  missingSteps.push("Location");
}

if (!safetyComplete) {
  missingSteps.push("Safety");
}

const readinessMessage =
  canStart
    ? "🚀 READY FOR LAUNCH"
    : `Complete: ${missingSteps.join(", ")}`;
  return (

    <View style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.scrollContent
        }
      >

        {/* HERO SECTION */}
        <ImageBackground
          source={require('@/assets/images/miffysound.png')}
          style={styles.heroBackground}
          imageStyle={styles.heroImage}
        >

          {/* OVERLAY */}
          <View style={styles.overlay}>

            <ActivityHeader />

            <ActivityHero
              title={activity.title}
              overview={activity.overview}
            />

            <ActivityStats
              timeLimit={activity.duration}
              difficulty={activity.difficulty}
              mission={activity.mission}
            />

          </View>

          {/* BOTTOM BLUR */}
          <LinearGradient
            colors={[
              'rgba(5,0,20,0)',
              'rgba(5,0,20,0.35)',
              'rgba(5,0,20,0.75)',
              '#050014',
            ]}
            locations={[0, 0.4, 0.72, 1]}
            style={styles.bottomBlur}
          />

        </ImageBackground>

        {/* CONTENT */}
        <View style={styles.content}>

<MaterialsChecklist
  materials={activity.materials}
  onProgressChange={
    setMaterialProgress
  }
/>

<SetupGuideCarousel
  steps={activity.setupSteps}
  renderBottomComponent={(stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <SoundMeterTest
            onCompleted={setSoundMeterVerified}
          />
        );

      case 1:
        return (
          <LocationAccess
            onCompleted={setLocationVerified}
          />
        );

      default:
        return null;
    }
  }}
/>

  <PixelDivider />
          <StepInstructions
            steps={activity.instructions}
          />


          <ReferenceSetupCard
            image={require('@/assets/images/referenceSetup2.png')}
          />


<SafetyNotes
  notes={activity.safetyNotes}
  onAcceptedChange={
    setSafetyComplete
  }
/>
<StartButton
  disabled={!canStart}
  onPress={() =>
    router.push({
      pathname: '/activities/ActivityIntroScreen',
      params: {
        activityID: 2,
        nextScreen:
          '/activities/activity2/prediction',
      },
    })
  }
/>
        </View>

      </ScrollView>
<ProgressBar
  progress={progress}
  subtitle={readinessMessage}
/>
    </View>

  );

}

const styles = StyleSheet.create({

  /* SCREEN */
  container: {
    flex: 1,
    backgroundColor: '#050014',
  },

  /* SCROLL */
scrollContent: {
  paddingBottom: hp(20),
},



  /* HERO BG */
  heroBackground: {
    width: '100%',
    justifyContent: 'flex-end',
    top:rf(20),
    zIndex:-1
  },

  /* HERO IMAGE */
  heroImage: {
    resizeMode: 'cover', // This ensures the whole image is visible
  },

  /* OVERLAY */
  overlay: {
    paddingBottom: hp(0),
  },

  /* BOTTOM BLUR */
  bottomBlur: {
    position: 'absolute',

    bottom: 0,

    width: '100%',

    height: hp(12),

    zIndex: 1,
  },

  /* CONTENT */
  content: {
    marginTop: hp(4),
  },

});