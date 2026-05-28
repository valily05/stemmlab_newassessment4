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
              style={styles.timeIcon}
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
                styles.statsIcon,
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

    alignItems: 'center',

    marginTop: hp(1),
  },

  /* MISSION CARD */
  missionCard: {
    width: hp(21),

    height: hp(7.5),

    justifyContent: 'center',

    paddingHorizontal: wp(3.2),

    overflow: 'hidden',

    zIndex: 20,
  },

  /* STATS CARD */
  statsCard: {
    width: hp(21),

    height: hp(7.5),

    marginLeft: wp(2),

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-evenly',

    paddingHorizontal: wp(1),

    overflow: 'hidden',

    zIndex: 20,
  },

  /* INFO BLOCK */
  infoBlock: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  /* DIVIDER */
  divider: {
    width: 1,

    height: hp(2.5),

    backgroundColor: '#FFFFFF',
  },

  /* TIME ICON */
  timeIcon: {
    width: rf(24),

    height: rf(24),

    marginRight: wp(1.5),
  },

  /* STATS ICON */
  statsIcon: {
    width: rf(19),

    height: rf(19),

    marginRight: wp(1.5),
  },

  /* LABEL */
  label: {
    color: 'white',

    fontFamily: 'PixelOperator',

    fontSize: rf(13),
  },

  /* TIME VALUE */
  timeValue: {
    color: '#FF5A5A',

    fontFamily: 'PixelOperator',

    fontSize: rf(14),

  },

  /* DIFFICULTY VALUE */
  difficultyValue: {
    fontFamily: 'PixelOperator',

    fontSize: rf(14),

  },

  /* MISSION ROW */
  missionRow: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  /* MISSION ICON */
  missionIcon: {
    width: rf(37),

    height: rf(37),

    marginRight: wp(1.9),

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

    fontSize: rf(10.2),

    marginBottom: hp(0.4),
  },

  /* MISSION TEXT */
  missionText: {
    color: 'white',

    fontFamily: 'PixelOperator',

    lineHeight: rf(11),

    fontSize: rf(12),

    width: rf(122),
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