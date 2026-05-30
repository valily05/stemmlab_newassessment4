// components/activity/CaptureExperimentCard.tsx
import { ResizeMode, Video } from 'expo-av';
import {
  CameraView,
  useCameraPermissions,
} from 'expo-camera';
import { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
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
  canStopRecording: boolean;
onStartRecording: () => void;
  videoUri: string | null;

  onSaveIteration: () => void;

  onVideoSaved?: (
    uri: string
  ) => void;
    dropHeight: string;
  setDropHeight: (
    value: string
  ) => void;
}

export default function CaptureExperimentCard({
  isRecording,
  hasStarted,
  onStart,
  onStop,
  onRetry,
  onSaveIteration,
  onVideoSaved,
  canStopRecording,
  videoUri,
  onStartRecording,
    dropHeight,
  setDropHeight,
}: Props) {

  const [permission, requestPermission] =
  useCameraPermissions();
  const cameraRef = useRef<any>(null);


console.log(
  'CURRENT VIDEO URI',
  videoUri
);
console.log(
  'CAN STOP?',
  canStopRecording
);
const [cameraReady, setCameraReady] =
  useState(false);

  if (hasStarted) {
    return (
      <View style={styles.recordingCard}>

        <View style={styles.recordingHeader}>
          <Text style={styles.recordingTitle}>
            VIDEO RECORDING
          </Text>

<View style={styles.recordingBadgeContainer}>

  {isRecording ? (
    <>
      <Text style={styles.recordingIcon}>
        ●
      </Text>

      <Text
        style={[
          styles.recordingBadge,
          { color: '#FF4D4D' },
        ]}
      >
        RECORDING
      </Text>
    </>
  ) : videoUri ? (
    <>
      <Text style={styles.reviewIcon}>
        ▶
      </Text>

      <Text
        style={[
          styles.recordingBadge,
          { color: '#FFA726' },
        ]}
      >
        REVIEW
      </Text>
    </>
  ) : (
    <Text
      style={[
        styles.recordingBadge,
        { color: '#4CAF50' },
      ]}
    >
      READY
    </Text>
  )}

</View>
        </View>

<View style={styles.cameraPreview}>

{videoUri ? (
  <Video
    source={{ uri: videoUri }}
    style={{
      flex: 1,
    }}
    useNativeControls
    resizeMode={ResizeMode.CONTAIN}
    shouldPlay
  />
) : (
<CameraView
  ref={cameraRef}
  style={{
    flex: 1,
    borderRadius: 20,
  }}
  facing="back"
  mode="video"
  onCameraReady={() => {
    console.log('CAMERA READY');
    setCameraReady(true);
  }}
/>
)}

</View>



{isRecording ? (
<TouchableOpacity
  style={[
    styles.stopRecordingButton,
    !canStopRecording && {
      opacity: 0.4,
    },
  ]}
  disabled={!canStopRecording}
onPress={() => {

  console.log('STOP PRESSED');

  try {

    cameraRef.current?.stopRecording();

    onStop();

  } catch (err) {

    console.log(
      'STOP ERROR',
      err
    );

  }

}}
>
    <Text style={styles.stopRecordingText}>
      <Text style={styles.stopIcon}>
        ■
      </Text>{' '}
      <Text style={styles.stopLabel}>
        STOP
      </Text>
    </Text>
  </TouchableOpacity>

) : (

  <>
    <TouchableOpacity
      style={styles.startRecordingButton}
onPress={async () => {


try {

  console.log('START RECORDING PRESSED');

  onStartRecording();

  const recordingPromise =
    cameraRef.current?.recordAsync();

recordingPromise
  ?.then((video: any) => {

    console.log(
      'RECORDING FINISHED',
      video
    );

      if (video?.uri) {

        console.log(
          'SETTING URI',
          video.uri
        );

        onVideoSaved?.(
          video.uri
        );

        onStop();

      }

    })
.catch((err: any) => {      console.log(
        'RECORD ERROR',
        err
      );
    });

} catch (err) {

  console.log(err);

}
  
}}
    >
      <Text style={styles.startRecordingText}>
        <Text style={styles.playIcon}>
          ▶
        </Text>{' '}
        <Text style={styles.startLabel}>
          START
        </Text>
      </Text>
    </TouchableOpacity>

  </>

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
<View style={styles.heightCard}>

  <Text style={styles.heightLabel}>
    DROP HEIGHT (m)
  </Text>

  <TextInput
    style={styles.heightInput}
    placeholder="e.g. 1.0"
    placeholderTextColor="#8A8FBF"
    keyboardType="numeric"
    value={dropHeight}
    onChangeText={setDropHeight}
  />

</View>


     <TouchableOpacity
  style={styles.startButton}
onPress={async () => {

  onStart();

}}
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

stopIcon: {
  fontSize: rf(18),
  color: '#FF4D8D',
  fontFamily: 'PixelOperator', // different font
},
recordingBadgeContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: wp(1),
},

recordingIcon: {
  color: '#FF4D4D',
  fontSize: rf(12),
  fontFamily: 'PressStart2P', // different font
},

reviewIcon: {
  color: '#FFA726',
  fontSize: rf(12),
  fontFamily: 'PressStart2P', // different font
},

recordingBadge: {
  fontSize: rf(16),
  fontFamily: 'PixelOperator',
},
stopLabel: {
  fontSize: rf(14),
  color: '#FF4D8D',
  fontFamily: 'Pixel',
},
retryRecordingButton: {
  marginTop: hp(1.2),

  height: hp(5.5),

  borderRadius: rf(10),

  borderWidth: rf(1.5),

  borderColor: '#FFD94E',

  justifyContent: 'center',

  alignItems: 'center',
},
heightCard: {
  marginTop: hp(2),

  backgroundColor: '#150F31',

  borderWidth: rf(1.5),
  borderColor: '#6954A6',

  borderRadius: rf(12),

  padding: wp(4),
},

heightLabel: {
  color: '#FFE95B',

  fontFamily: 'Pixel',

  fontSize: rf(12),

  marginBottom: hp(1),
},

heightInput: {
  height: hp(5.5),

  backgroundColor: '#0E0B24',

  borderRadius: rf(10),

  paddingHorizontal: wp(4),

  color: 'white',

  fontFamily: 'PixelOperator',

  fontSize: rf(15),
},
retryRecordingText: {
  color: '#FFD94E',

  fontFamily: 'Pixel',

  fontSize: rf(14),
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
recordControls: {
  flexDirection: 'row',
  gap: wp(3),
  marginTop: hp(2),
},

startRecordingButton: {
  flex: 1,
  height: hp(5.5),
  borderRadius: rf(10),
  borderWidth: rf(1.5),
  borderColor: '#00D9FF',
  justifyContent: 'center',
  alignItems: 'center',
},

stopRecordingButton: {
  flex: 1,
  height: hp(5.5),
  borderRadius: rf(10),
  borderWidth: rf(1.5),
  borderColor: '#FF4D8D',
  justifyContent: 'center',
  alignItems: 'center',
},

startRecordingText: {
  color: '#00D9FF',
  fontFamily: 'Pixel',
  fontSize: rf(14),
  
},

stopRecordingText: {
  color: '#FF4D8D',
  fontFamily: 'Pixel',
  fontSize: rf(14),
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
playIcon: {
  fontSize: rf(18),
  color: '#00D9FF',
  fontFamily:'PressStart2P'
},

startLabel: {
  fontSize: rf(14),
  color: '#00D9FF',
  fontFamily: 'Pixel', // your normal font
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
    fontSize: rf(20),
    fontFamily: 'PixelBold',
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