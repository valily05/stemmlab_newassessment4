
import { ScrollView, StyleSheet, View } from 'react-native';

import ActivityHeader from '../../components/activity/ActivityHeader';
import ActivityHero from '../../components/activity/ActivityHero';
import ActivityStats from '../../components/activity/ActivityStats';
import MaterialsChecklist from '../../components/activity/MaterialsChecklist';
import ReferenceSetupCard from '../../components/activity/ReferenceSetupCard';
import SafetyNotes from '../../components/activity/SafetyNotes';
import SetupGuideCarousel from '../../components/activity/SetupGuideCarousel';
import StartButton from '../../components/activity/StartButton';
import StepInstructions from '../../components/activity/StepInstructions';

const activityData = {
  title: 'PARACHUTE DROP\nCHALLENGE',

  overview:
    'Design, build, and test a parachute for a small toy to reduce its landing speed and impact force. Teams iterate their designs under time and material constraints.',

  timeLimit: '20 Minutes',

  difficulty: 'Easy',

  mission:
    'Make the toy land as slowly, safely and accurately as possible.',

  materials: [
    {
      name: 'STEMM APP ON MOBILE PHONE',
      quantity: 'x1',
    },

    {
      name: 'SMALL TOY OR FIGURE',
      quantity: 'x1',
    },

    {
      name: 'TABLES / ELEVATED SURFACE',
      quantity: 'x1',
    },

    {
      name: 'PLASTIC BAG',
      quantity: 'x2',
    },

    {
      name: 'STRING',
      quantity: 'x4',
    },

    {
      name: 'TAPE',
      quantity: 'x1',
    },

    {
      name: 'SCISSORS',
      quantity: 'x1',
    },
  ],

  setupSteps: [
    {
      title: 'PREPARE THE PLASTIC BAG',

      image: require('../../assets/images/setup1.png'),

      instruction: 'Cut the plastic bag into a circle',

      bunnyTip:
        'Make a smooth circle for better air resistance!',
    },

    {
      title: 'ATTACH THE STRINGS',

      image: require('../../assets/images/setup2.png'),

      instruction:
        'Tape the strings evenly around the parachute',

      bunnyTip:
        'Equal string lengths help stabilize the drop!',
    },
  ],

  instructions: [
    'Drop the toy without a parachute and record the fall (baseline test)',

    'Build a parachute using provided materials',

    'Drop the toy from the same height and record the fall',

    'Review speed and landing accuracy results in the app',

    'Redesign and test up to three prototypes within 20 minutes',

    'Upload videos, results, and team reflections',
  ],
};

export default function Activity1Screen() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ActivityHeader />

        <ActivityHero
          title={activityData.title}
          overview={activityData.overview}
          bunnyImage={require('../../assets/images/spacebunny.png')}
        />

        <ActivityStats
          timeLimit={activityData.timeLimit}
          difficulty={activityData.difficulty}
          mission={activityData.mission}
        />

        <MaterialsChecklist
          materials={activityData.materials}
        />

        <SetupGuideCarousel
          steps={activityData.setupSteps}
        />

        <StepInstructions
          steps={activityData.instructions}
        />

        <ReferenceSetupCard
          image={require('../../assets/images/referenceSetup.png')}
        />

        <SafetyNotes />

        <StartButton />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050014',
  },

  scrollContent: {
    paddingBottom: 60,
  },
});