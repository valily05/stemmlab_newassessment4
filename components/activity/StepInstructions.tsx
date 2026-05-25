// components/activity/StepInstructions.tsx

import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface Props {
  steps: string[];
}

export default function StepInstructions({
  steps,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        STEP-BY-STEP INSTRUCTIONS :
      </Text>

      <View style={styles.stepsContainer}>
        {steps.map((step, index) => (
          <View
            key={index}
            style={styles.stepRow}
          >
            <View style={styles.numberCircle}>
              <Text style={styles.numberText}>
                {index + 1}
              </Text>
            </View>

            <Text style={styles.stepText}>
              {step}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 40,
    borderWidth: 3,
    borderColor: '#701BFF',
    backgroundColor: '#0B001B',
    padding: 16,
  },

  title: {
    color: '#F8EC4D',
    fontFamily: 'PressStart2P',
    fontSize: 13,
    lineHeight: 22,
  },

  stepsContainer: {
    marginTop: 24,
    gap: 18,
  },

  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },

  numberCircle: {
    width: 24,
    height: 24,
    borderRadius: 50,
    backgroundColor: '#FF5AA9',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },

  numberText: {
    color: 'white',
    fontFamily: 'PressStart2P',
    fontSize: 8,
  },

  stepText: {
    flex: 1,
    color: 'white',
    fontFamily: 'PixeloidSans',
    fontSize: 12,
    lineHeight: 22,
  },
});