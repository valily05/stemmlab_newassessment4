import { useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  PixelRatio,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import ActivityHeader from '@/components/activity/ActivityHeader';
import ActivityHero from '@/components/activity/ActivityHero';
import ActivityStats from '@/components/activity/ActivityStats';
import MaterialsChecklist from '@/components/activity/MaterialsChecklist';
import ProgressBar from '@/components/activity/ProgressBar';
import SafetyNotes from '@/components/activity/SafetyNotes';
import SetupGuideCarousel from '@/components/activity/SetupGuideCarousel';
import StartButton from '@/components/activity/StartButton';
import StepInstructions from '@/components/activity/StepInstructions';
import ReferenceSetupCard from '@/components/activity/ReferenceSetupCard';
import PixelDivider from '@/components/PixelDivider';

import { activities } from '@/data/activities';

const activity = activities.activity1;

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

export default function Activity1Screen() {
const [materialProgress,
  setMaterialProgress] =
  useState(0);


const [safetyComplete,
  setSafetyComplete] =
  useState(false);
const progress =
  Math.round(
    materialProgress * 0.5 +
    (safetyComplete ? 50 : 0)
  );
const canStart =
  progress === 100;


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
          source={require('../../assets/images/miffyspace.png')}
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
          />
  <PixelDivider />
          <StepInstructions
            steps={activity.instructions}
          />


          <ReferenceSetupCard
            image={require('../../assets/images/referenceSetup.png')}
          />


<SafetyNotes
  onAcceptedChange={
    setSafetyComplete
  }
/>
<StartButton
  disabled={!canStart}
  onPress={() =>
    router.push({
      pathname:'/activities/ActivityIntroScreen',
      params: {
        activityNumber: 1,
        title:
          'PARACHUTE DROP CHALLENGE',
        objective:
          'Design and test a parachute to achieve the slowest drop time.',
        nextScreen:
          '/activities/activity1/experiment',
      },
    })
  }
/>
        </View>

      </ScrollView>
<ProgressBar
  progress={progress}
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
  },

  /* HERO IMAGE */
  heroImage: {
    resizeMode: 'cover',

  
  },

  /* OVERLAY */
  overlay: {
    paddingBottom: hp(4),
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
    marginTop: -hp(1),
  },

});