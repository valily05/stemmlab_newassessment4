// components/activity/ActivityStats.tsx

import {
    Dimensions,
    Image,
    PixelRatio,
    StyleSheet,
    Text,
    View,
} from 'react-native';

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

interface Props {
  timeLimit: string;
  difficulty: string;
  mission: string;
}

export default function ActivityStats({
  timeLimit,
  difficulty,
  mission,
}: Props) {

  /* DIFFICULTY COLOR */
  const difficultyColor =

    difficulty === 'Easy'
      ? '#4DFF88'

      : difficulty === 'Medium'
      ? '#FFB648'

      : '#FF5A5A';

  return (

    <View style={styles.container}>

      {/* TOP ROW */}
      <View style={styles.row}>

        {/* TIME CARD */}
        <View style={styles.smallCard}>

          <Image
            source={require('../../assets/images/time.png')}
            style={styles.icon}
            resizeMode="contain"
          />

          <View>

            <Text style={styles.label}>
              Time Limit
            </Text>

            <Text style={styles.orangeValue}>
              {timeLimit}
            </Text>

          </View>

        </View>

        {/* DIFFICULTY CARD */}
        <View style={styles.smallCard}>

          <Image
            source={require('../../assets/images/chart.png')}
            style={[
              styles.icon,
              {
                tintColor: difficultyColor,
              },
            ]}
            resizeMode="contain"
          />

          <View>

            <Text style={styles.label}>
              Difficulty
            </Text>

            <Text
              style={[
                styles.difficultyValue,
                {
                  color: difficultyColor,
                },
              ]}
            >
              {difficulty}
            </Text>

          </View>

        </View>

      </View>

      {/* MISSION */}
      <View style={styles.missionCard}>

        <Text style={styles.missionTitle}>
          MISSION :
        </Text>

        <Text style={styles.missionText}>
          {mission}
        </Text>

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  /* CONTAINER */
  container: {
    paddingHorizontal: wp(5),

    marginTop: hp(3),
  },

  /* ROW */
  row: {
    flexDirection: 'row',

    justifyContent: 'space-between',
  },

  /* SMALL CARD */
  smallCard: {
    width: '48%',

    flexDirection: 'row',

    backgroundColor: '#120022',

    borderWidth: rf(2),

    borderColor: '#FF4FB4',

    borderRadius: rf(12),

    padding: wp(3.5),

    alignItems: 'center',
  },

  /* ICON */
  icon: {
    width: rf(26),

    height: rf(26),

    marginRight: wp(2.5),
  },

  /* LABEL */
  label: {
    color: 'white',

    fontFamily: 'PressStart2P',

    fontSize: rf(8),
  },

  /* TIME VALUE */
  orangeValue: {
    color: '#FFB648',

    fontFamily: 'PixeloidSans',

    fontSize: rf(12),

    marginTop: hp(0.6),
  },

  /* DIFFICULTY VALUE */
  difficultyValue: {
    fontFamily: 'PixeloidSans',

    fontSize: rf(12),

    marginTop: hp(0.6),
  },

  /* MISSION CARD */
  missionCard: {
    marginTop: hp(1.5),

    backgroundColor: '#120022',

    borderWidth: rf(2),

    borderColor: '#FF4FB4',

    borderRadius: rf(12),

    padding: wp(3.5),
  },

  /* MISSION TITLE */
  missionTitle: {
    color: '#FF4FB4',

    fontFamily: 'PressStart2P',

    fontSize: rf(10),
  },

  /* MISSION TEXT */
  missionText: {
    color: 'white',

    fontFamily: 'PixeloidSans',

    marginTop: hp(1.2),

    lineHeight: rf(20),

    fontSize: rf(11),
  },

});