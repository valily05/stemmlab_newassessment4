// components/activity/CaptureExperimentCard.tsx
import {
  CameraView,
  useCameraPermissions,
} from 'expo-camera';
import {
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';


const { width, height } = Dimensions.get('window');

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

interface Props {
  isRecording: boolean;
  hasStarted: boolean;
  onStart: () => void;
  onStop: () => void;
  onRetry: () => void;
  onSaveIteration: () => void;
}

export default function CaptureExperimentCard({
  isRecording,
  hasStarted,
  onStart,
  onStop,
  onRetry,
  onSaveIteration,

}: Props) {
  const [permission, requestPermission] =
  useCameraPermissions();

  if (hasStarted) {
    return (
      <View style={styles.recordingCard}>

        <View style={styles.recordingHeader}>
          <Text style={styles.recordingTitle}>
            VIDEO RECORDING
          </Text>

          <Text style={styles.recordingBadge}>
            ● RECORDING
          </Text>
        </View>

<View style={styles.cameraPreview}>

  <CameraView
    style={{
      flex: 1,
      borderRadius: 20,
    }}
    facing="back"
  />

</View>

        {isRecording && (
          <TouchableOpacity
            style={styles.stopButton}
            onPress={onStop}
          >
            <Text style={styles.buttonText}>
              STOP RECORDING
            </Text>
          </TouchableOpacity>
        )}

        {!isRecording && (
          <View style={styles.actionButtons}>

            <TouchableOpacity
              style={styles.retryButton}
              onPress={onRetry}
            >
              <Text style={styles.buttonText}>
                RETRY
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={onSaveIteration}
            >
              <Text style={styles.buttonText}>
                SAVE ITERATION
              </Text>
            </TouchableOpacity>

          </View>
        )}

      </View>
    );
  }

  return (
    <View style={styles.card}>

<View style={styles.header}>

  <View style={styles.leftContent}>

<Text
  style={styles.title}
  numberOfLines={1}
>
  CAPTURE EXPERIMENT
</Text>

    <View style={styles.requiredBadge}>
      <Text style={styles.requiredText}>
        Required
      </Text>
    </View>

<Text style={styles.description}>
  Record the{' '}
  <Text style={styles.yellowText}>
    entire experiment
  </Text>{' '}
  to analyze your parachute's performance.
</Text>

  </View>

  <Image
    source={require('../../assets/images/phone-camera.png')}
    style={styles.phoneImage}
  />

</View>

   

<View style={styles.tipCard}>

<Text style={styles.tipTitle}>
  <Text style={styles.tipStar}>
    ★
  </Text>{' '}
  BUNNY TIP
</Text>

  <Text style={styles.tip}>
    • Use a ruler in frame for scale
  </Text>

  <Text style={styles.tip}>
    • Identify first contact for contact time
  </Text>

  <Text style={styles.tip}>
    • Identify when the object leaves the surface for bounce calculation
  </Text>

</View>

<View style={styles.howWorksContainer}>

  <View style={styles.howLine} />

  <Text style={styles.howTitle}>
    HOW IT WORKS
  </Text>

  <View style={styles.howLine} />

</View>

      <View style={styles.stepsRow}>

        <View style={styles.step}>
<Image
  source={require('../../assets/images/record-icon.png')}
  style={styles.stepIcon}
/>

          <Text style={styles.stepTitle}>
            1. RECORD
          </Text>

          <Text style={styles.stepText}>
            Timer starts automatically when recording begins.
          </Text>
        </View>

        <View style={styles.step}>
  <Image
  source={require('../../assets/images/parachute-icon.png')}
  style={styles.stepIcon}
/>

          <Text style={styles.stepTitle}>
            2. DROP
          </Text>

          <Text style={styles.stepText}>
            Let your parachute drop and hit the ground.
          </Text>
        </View>

        <View style={styles.step}>
<Image
  source={require('../../assets/images/stopwatch-icon.png')}
  style={styles.stepIcon}
/>

          <Text style={styles.stepTitle}>
            3. STOP
          </Text>

          <Text style={styles.stepText}>
            Press stop the moment the parachute hits the ground.
          </Text>
        </View>

      </View>

      <TouchableOpacity
        style={styles.startButton}
        onPress={onStart}
      >
<Image
  source={require('../../assets/images/video-icon.png')}
  style={styles.startButtonIcon}
/>

        <Text style={styles.startText}>
          START
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
leftContent: {
  flex: 1,
  paddingRight: wp(3),
},
card: {
  marginHorizontal: wp(5),
  marginTop: hp(3),

  backgroundColor: '#02032A',

  borderRadius: rf(22),
  padding: wp(5),
paddingTop:wp(6),
  borderWidth: rf(2),
  borderColor: '#3D438F',

  shadowColor: '#3D438F',
  shadowOpacity: 1,
  shadowRadius: rf(10),
  shadowOffset: {
    width: 0,
    height: 0,
  },

  elevation: 12,
},

tipStar: {
  color: '#FFE95B',
  fontSize: rf(20), // bigger than Bunny Tip
},

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
yellowText: {
  color: '#FFE95B',
},

title: {
  color: '#FFE95B',
  fontSize: rf(14),
  fontFamily: 'Pixel',

  width: wp(70),
},
  requiredBadge: {
backgroundColor: '#FF000036',    paddingHorizontal: wp(3),
    paddingVertical: hp(0.4),
    borderRadius: rf(10),
    marginTop: hp(1.5),    
    marginBottom: hp(0.5),

    alignSelf: 'flex-start',
  },

  requiredText: {
    color: '#FF0000',
    fontSize: rf(14),
    fontFamily: 'PixelOperator',
  },

phoneImage: {
  width: rf(120),
  height: rf(120),
  resizeMode: 'contain',

  transform: [
    { translateX: rf(34) }
  ],
},

description: {
  color: '#FFFFFF',
  fontSize: rf(15),
  lineHeight: rf(18),
  fontFamily: 'PixelOperator',
  marginTop: hp(1),
  width: wp(65),
},

tipCard: {
  marginTop: hp(0),

  backgroundColor: '#150F31',

  borderWidth: rf(1.5),
  borderColor: '#6954A6',
  borderStyle: 'dashed',

  borderRadius: rf(10),

  paddingHorizontal: wp(4),
  paddingVertical: hp(1.5),
},
tipTitle: {
  color: '#FFE95B',
  fontSize: rf(12),
  fontFamily: 'Pixel',
  marginBottom: hp(1),
},

tip: {
  color: '#FFFFFF',
  fontSize: rf(15),
  lineHeight: rf(16),
  fontFamily: 'PixelOperator',
  marginBottom: hp(0.6),
},



 howWorksContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: hp(2),
},

howLine: {
  flex: 1,
  height: rf(2),
  backgroundColor: '#2B2F68',
},

howTitle: {
  color: '#FFFFFF',
  fontSize: rf(18),
  fontFamily: 'PixelOperator',

  marginHorizontal: wp(3),
},

  stepsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
  },

  step: {
    width: wp(26),
    alignItems: 'center',
  },



  stepTitle: {
    color: '#FFE95B',
    fontSize: rf(19),
    fontFamily: 'PixelOperator',
    marginTop: hp(0.3),
  },

  stepText: {
    color: '#FFFFFF',
    fontSize: rf(14),
    textAlign: 'center',
    marginTop: hp(0.5),
    fontFamily: 'PixelOperator',
    width:rf(98)
  },

  startButton: {
    height: hp(6),
    backgroundColor: '#3E79E8',
    borderRadius: rf(14),
    marginTop: hp(3),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

stepIcon: {
  width: rf(48),
  height: rf(48),
  resizeMode: 'contain',
  marginBottom: hp(1),
},

startButtonIcon: {
  width: rf(22),
  height: rf(22),
  resizeMode: 'contain',
  marginRight: wp(3),
},

  startText: {
    color: '#FFFFFF',
    fontSize: rf(16),
    fontFamily: 'Pixel',
  },

  /* RECORDING MODE */

recordingCard: {
  marginHorizontal: wp(5),
  marginTop: hp(3),

  backgroundColor: '#02032A',

  borderRadius: rf(22),
  padding: wp(5),

  borderWidth: rf(2),
  borderColor: '#3D438F',

  shadowColor: '#3D438F',
  shadowOpacity: 1,
  shadowRadius: rf(18),
  shadowOffset: {
    width: 0,
    height: 0,
  },

  elevation: 15,
},

  recordingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  recordingTitle: {
    color: '#FFE95B',
    fontSize: rf(12),
    fontFamily: 'Pixel',
  },

  recordingBadge: {
    color: '#FF3B3B',
    fontSize: rf(9),
    fontFamily: 'Pixel',
  },

cameraPreview: {
  height: hp(35),
  overflow: 'hidden',
  borderRadius: rf(18),
  marginTop: hp(2),
},

  cameraIcon: {
    width: rf(80),
    height: rf(80),
    resizeMode: 'contain',
  },

  stopButton: {
    height: hp(6),
    borderRadius: rf(14),
    backgroundColor: '#FF4D4D',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2),
  },

  actionButtons: {
    flexDirection: 'row',
    gap: wp(3),
    marginTop: hp(2),
  },

  retryButton: {
    flex: 1,
    height: hp(6),
    borderRadius: rf(14),
    backgroundColor: '#5711BE',
    justifyContent: 'center',
    alignItems: 'center',
  },

  saveButton: {
    flex: 1,
    height: hp(6),
    borderRadius: rf(14),
    backgroundColor: '#27AE60',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: rf(13),
    fontFamily: 'Pixel',
  },

});