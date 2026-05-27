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

/* PROPS */
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

      <View style={styles.row}>

        {/* MISSION CARD */}
        <ImageBackground
          source={require('../../assets/images/pinkbox.png')}
          style={styles.missionCard}
          resizeMode="stretch"
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
          resizeMode="stretch"
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

              <Text style={styles.timeValue}>
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

    marginTop: hp(1.5),
  },

  /* ROW */
  row: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    marginTop: hp(1),
  },

  /* MISSION CARD */
  missionCard: {
    width: '79%',

    height: hp(10),

    justifyContent: 'center',

    paddingHorizontal: wp(3.2),

    overflow: 'hidden',
    zIndex:20
  },

  /* STATS CARD */
  statsCard: {
    width: '68%',

    height: hp(8.5),

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-evenly',

    paddingHorizontal: wp(3),

    overflow: 'hidden',
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
    width: rf(18),

    height: rf(18),

    marginRight: wp(1.3),
  },

  /* LABEL */
  label: {
    color: 'white',

    fontFamily: 'PixelOperator',

    fontSize: rf(7),
  },

  /* TIME VALUE */
  timeValue: {
    color: '#FF5A5A',

    fontFamily: 'PixelOperator',

    fontSize: rf(8.8),

    marginTop: hp(0.15),
  },

  /* DIFFICULTY VALUE */
  difficultyValue: {
    fontFamily: 'PixelOperator',

    fontSize: rf(8.8),

    marginTop: hp(0.15),
  },

  /* MISSION ROW */
  missionRow: {
    flexDirection: 'row',

    alignItems: 'flex-start',
  },

  /* MISSION ICON */
  missionIcon: {
    width: rf(24),

    height: rf(24),

    marginRight: wp(1.8),

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

    fontSize: rf(8.8),

    marginBottom: hp(0.15),
  },

  /* MISSION TEXT */
  missionText: {
    color: 'white',

    fontFamily: 'PixelOperator',

    lineHeight: rf(8.8),

    fontSize: rf(5.8),
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