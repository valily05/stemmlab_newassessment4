import {
    Dimensions,
    PixelRatio,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

const wp = (percentage: number) => {
  return PixelRatio.roundToNearestPixel(
    (width * percentage) / 100
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

interface Props {
  progress: number;
}

export default function ProgressBar({
  progress,
}: Props) {

  return (

    <View style={styles.container}>

      <View style={styles.headerRow}>

        <Text style={styles.title}>
          MISSION READINESS
        </Text>

        <Text style={styles.percent}>
          {progress}%
        </Text>

      </View>

      <View style={styles.track}>

        <View
          style={[
            styles.fill,
            {
              width: `${progress}%`,
            },
          ]}
        />

      </View>

      <Text style={styles.subtitle}>

        {progress === 100
          ? '🚀 READY FOR LAUNCH'
          : 'Complete all requirements'}

      </Text>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    position: 'absolute',

    bottom: 20,

    left: 16,
    right: 16,

    backgroundColor: '#150F31',

    borderWidth: 2,

    borderColor: '#701BFF',

    borderRadius: 20,

    padding: 14,

    zIndex: 999,
  },

  headerRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    marginBottom: 10,
  },

  title: {
    color: '#FACC15',

    fontFamily: 'Pixel',

    fontSize: rf(13),
  },

  percent: {
    color: '#FFFFFF',

    fontFamily: 'Pixel',

    fontSize: rf(13),
  },

  track: {
    height: 14,

    backgroundColor: '#291A56',

    borderRadius: 99,

    overflow: 'hidden',
  },

  fill: {
    height: '100%',

    backgroundColor: '#60BB3F',
  },

  subtitle: {
    marginTop: 8,

    color: '#FFFFFF',

    textAlign: 'center',

    fontFamily: 'PixelOperator',

    fontSize: rf(14),
  },

});