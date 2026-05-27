// components/activity/ActivityStats.tsx

import {
  Dimensions,
  Image,
  ImageBackground,
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

      {/* ROW */}
      <View style={styles.row}>

        {/* MISSION CARD */}
        <ImageBackground
          source={require('../../assets/images/pinkbox.png')}
          style={styles.missionCard}
          resizeMode="cover"
        >

          <View style={styles.missionRow}>

            <Image
              source={require('../../assets/images/target.png')}
              style={styles.missionIcon}
              resizeMode="contain"
            />

            <View style={styles.missionContent}>

              <Text style={styles.missionTitle}>
                MISSION :
              </Text>

              <Text style={styles.missionText}>

                Make the toy land as{' '}

                <Text style={styles.pinkText}>
                  SLOWLY
                </Text>

                ,{' '}

                <Text style={styles.cyanText}>
                  SAFELY
                </Text>

                , and{' '}

                <Text style={styles.yellowText}>
                  ACCURATELY
                </Text>

                {' '}as possible!

              </Text>

            </View>

          </View>

        </ImageBackground>

        {/* STATS CARD */}
        <ImageBackground
          source={require('../../assets/images/purplebox.png')}
          style={styles.statsCard}
          resizeMode="cover"
        >

          {/* TIME */}
          <View style={styles.infoBlock}>

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

          {/* DIVIDER */}
          <View style={styles.divider} />

          {/* DIFFICULTY */}
          <View style={styles.infoBlock}>

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

        </ImageBackground>

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  /* CONTAINER */
  container: {
    paddingHorizontal: wp(5),

    marginTop: hp(2),
  },

  /* ROW */
  row: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  /* MISSION CARD */
  missionCard: {
    width: '47%',

    aspectRatio: 2.8,

    justifyContent: 'center',

    paddingHorizontal: wp(3),
  },

  /* STATS CARD */
  statsCard: {
    width: '50%',

    aspectRatio: 2.8,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-evenly',

    paddingHorizontal: wp(3),
  },

  /* INFO BLOCK */
  infoBlock: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  /* DIVIDER */
  divider: {
    width: 1,

    height: '45%',

    backgroundColor: '#FFFFFF',
  },

  /* ICON */
  icon: {
    width: rf(22),

    height: rf(22),

    marginRight: wp(1.5),
  },

  /* LABEL */
  label: {
    color: 'white',

    fontFamily: 'PixelOperator',

    fontSize: rf(8),
  },

  /* TIME VALUE */
  orangeValue: {
    color: '#22E7FF',

    fontFamily: 'PixelOperator',

    fontSize: rf(10),

    marginTop: hp(0.2),
  },

  /* DIFFICULTY VALUE */
  difficultyValue: {
    fontFamily: 'PixelOperator',

    fontSize: rf(10),

    marginTop: hp(0.2),
  },

  /* MISSION ROW */
  missionRow: {
    flexDirection: 'row',

    alignItems: 'flex-start',
  },

  /* MISSION ICON */
  missionIcon: {
    width: rf(28),

    height: rf(28),

    marginRight: wp(2),

    tintColor: '#FF4FB4',
  },

  /* MISSION CONTENT */
  missionContent: {
    flex: 1,
  },

  /* MISSION TITLE */
  missionTitle: {
    color: '#FF4FB4',

    fontFamily: 'Pixel',

    fontSize: rf(10),

    marginBottom: hp(0.3),
  },

  /* MISSION TEXT */
  missionText: {
    color: 'white',

    fontFamily: 'PixelOperator',

    lineHeight: rf(10),

    fontSize: rf(6.8),
  },

  /* PINK */
  pinkText: {
    color: '#F141A7',

    fontFamily: 'PixelOperator',
  },

  /* CYAN */
  cyanText: {
    color: '#3FFFE0',

    fontFamily: 'PixelOperator',
  },

  /* YELLOW */
  yellowText: {
    color: '#F8EC66',

    fontFamily: 'PixelOperator',
  },

});