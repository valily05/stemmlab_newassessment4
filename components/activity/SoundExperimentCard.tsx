import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Dimensions,
    PixelRatio,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import ExitButton from '@/components/activity/ExitButton';
import SoundExperimentCard from '@/components/activity/SoundExperimentCard';

const { width, height } = Dimensions.get('window');

const wp = (percentage: number) =>
  PixelRatio.roundToNearestPixel((width * percentage) / 100);

const hp = (percentage: number) =>
  PixelRatio.roundToNearestPixel((height * percentage) / 100);

const rf = (size: number) => {
  const scale = width / 390;
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

// Example actions for Activity 2 prediction
const NOISE_ACTIONS = [
  { id: 'clapping', label: 'Clapping Hands' },
  { id: 'tapping', label: 'Tapping Table' },
  { id: 'shouting', label: 'Shouting' },
  { id: 'whispering', label: 'Whispering' },
];

export default function Activity2Experiment() {
  const [hasMadePrediction, setHasMadePrediction] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const handleSaveExperiment = (result: { peakDb: number; averageDb: number; duration: number }) => {
    console.log('Experiment saved:', result);
    // Navigate to results or next step, passing prediction and experiment data
    router.replace({
      pathname: '/activities/activity2/results',
      params: {
        predictedAction: selectedAction,
        peakDb: result.peakDb,
        averageDb: result.averageDb,
        duration: result.duration,
      }
    });
  };

  return (
    <LinearGradient
      colors={['#0B0820', '#14103A', '#1D1854', '#26216D', '#312C88', '#3A35A3']}
      locations={[0, 0.50, 0.75, 0.88, 0.94, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        {!hasMadePrediction ? (
          /* PREDICTION STEP */
          <View style={styles.predictionContainer}>
            <Text style={styles.predictionTitle}>PREDICTION</Text>
            <Text style={styles.predictionQuestion}>
              Which action do you think will produce the most noise?
            </Text>

            <View style={styles.optionsList}>
              {NOISE_ACTIONS.map((action) => (
                <TouchableOpacity
                  key={action.id}
                  style={[
                    styles.optionButton,
                    selectedAction === action.id && styles.selectedOptionButton,
                  ]}
                  onPress={() => setSelectedAction(action.id)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedAction === action.id && styles.selectedOptionText,
                    ]}
                  >
                    {action.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Pressable
              style={[styles.confirmButton, !selectedAction && styles.disabledButton]}
              disabled={!selectedAction}
              onPress={() => setHasMadePrediction(true)}
            >
              <Text style={styles.confirmButtonText}>CONFIRM PREDICTION</Text>
            </Pressable>
          </View>
        ) : (
          /* EXPERIMENT MEASUREMENT STEP */
          <View style={styles.experimentWrapper}>
            <SoundExperimentCard
              actionTitle="SOUND LEVEL EXPERIMENT"
              onSave={handleSaveExperiment}
            />
            
            <TouchableOpacity 
              style={styles.changePredictionLink}
              onPress={() => setHasMadePrediction(false)}
            >
              <Text style={styles.changePredictionText}>← Change Prediction</Text>
            </TouchableOpacity>
          </View>
        )}

        <ExitButton onPress={() => router.back()} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: hp(6),
    paddingBottom: hp(5),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  predictionContainer: {
    width: '92%',
    backgroundColor: '#1D123B',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(168, 85, 247, 0.3)',
    marginTop: hp(5),
  },
  predictionTitle: {
    color: '#FFD94E',
    fontFamily: 'Pixel',
    fontSize: rf(22),
    marginBottom: 15,
    letterSpacing: 1,
  },
  predictionQuestion: {
    color: '#FFFFFF',
    fontFamily: 'PixelOperator',
    fontSize: rf(18),
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: rf(24),
  },
  optionsList: {
    width: '100%',
    gap: 12,
    marginBottom: 30,
  },
  optionButton: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: '#2A1A55',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#4C3575',
    alignItems: 'center',
  },
  selectedOptionButton: {
    backgroundColor: '#EC588C',
    borderColor: '#FF8CB9',
  },
  optionText: {
    color: '#C4B5FD',
    fontFamily: 'Pixel',
    fontSize: rf(14),
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  confirmButton: {
    width: '100%',
    paddingVertical: 18,
    backgroundColor: '#3BCF73',
    borderRadius: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: '#301C63',
    opacity: 0.6,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Pixel',
    fontSize: rf(16),
  },
  experimentWrapper: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changePredictionLink: {
    marginTop: 15,
    paddingVertical: 10,
  },
  changePredictionText: {
    color: '#C4B5FD',
    fontFamily: 'PixelOperator',
    fontSize: rf(16),
  }
});