// components/activity/SetupGuideCarousel.tsx

import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

interface Step {
  title: string;
  image: any;
  instruction: string;
  bunnyTip?: string;
}

interface Props {
  steps: Step[];
}

export default function SetupGuideCarousel({
  steps,
}: Props) {

  return (

    <View style={styles.container}>

      <View style={styles.titleRow}>

        <Text style={styles.title}>
          EXPERIMENT SETUP GUIDE
        </Text>

        <Text style={styles.subtitle}>
          Complete all setup steps before
          starting your experiment mission.
        </Text>

      </View>

      <FlatList
        horizontal
        pagingEnabled
        data={steps}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) =>
          index.toString()
        }

        renderItem={({ item, index }) => {

          return (

            <View style={styles.card}>

              <Text style={styles.cardTitle}>
                {item.title}
              </Text>

              <Image
                source={item.image}
                style={styles.image}
              />

              <Text style={styles.instruction}>
                ▶ {item.instruction}
              </Text>

              {item.bunnyTip && (

                <View style={styles.tipBox}>

                  <Text style={styles.tipTitle}>
                    ★ BUNNY TIP
                  </Text>

                  <Text style={styles.tipText}>
                    {item.bunnyTip}
                  </Text>

                </View>

              )}

              <Text style={styles.stepCounter}>
                STEP {index + 1} / {steps.length}
              </Text>

            </View>

          );

        }}
      />

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    marginTop: 40,
  },

  titleRow: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  title: {
    color: 'white',
    fontFamily: 'PressStart2P',
    fontSize: 14,
  },

  subtitle: {
    color: 'white',
    fontFamily: 'PixeloidSans',
    fontSize: 11,
    marginTop: 10,
    lineHeight: 18,
  },

  card: {
    width: width - 40,

    marginHorizontal: 20,

    borderWidth: 3,
    borderColor: '#8B52FF',

    backgroundColor: '#120023',

    padding: 18,
  },

  cardTitle: {
    color: '#F8EC4D',

    fontFamily: 'PressStart2P',

    textAlign: 'center',

    fontSize: 13,

    lineHeight: 22,
  },

  image: {
    width: '100%',

    height: 220,

    resizeMode: 'contain',

    marginVertical: 18,
  },

  instruction: {
    color: 'white',

    fontFamily: 'PixeloidSans',

    fontSize: 12,
  },

  tipBox: {
    borderWidth: 2,

    borderStyle: 'dashed',

    borderColor: '#FF4FB4',

    borderRadius: 12,

    padding: 16,

    marginTop: 20,
  },

  tipTitle: {
    color: '#FF4FB4',

    fontFamily: 'PressStart2P',

    fontSize: 10,
  },

  tipText: {
    color: 'white',

    fontFamily: 'PixeloidSans',

    fontSize: 11,

    lineHeight: 18,

    marginTop: 10,
  },

  stepCounter: {
    alignSelf: 'center',

    marginTop: 20,

    color: '#FF4FB4',

    fontFamily: 'PressStart2P',

    fontSize: 9,
  },

});