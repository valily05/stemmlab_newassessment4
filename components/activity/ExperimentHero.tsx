import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface Props {
  title: string;
  description: string;
}

export default function ExperimentHero({
  title,
  description,
}: Props) {

  return (

    <View style={styles.container}>

      <View style={styles.left}>

        <Text style={styles.activity}>
          ACTIVITY #1
        </Text>

        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.description}>
          {description}
        </Text>

      </View>

      <Image
        source={require('../../assets/images/parachute-bunny.png')}
        style={styles.image}
      />

    </View>

  );

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },

  left: {
    flex: 1,
  },

  activity: {
    color: '#FACC15',
    fontFamily: 'Pixel',
  },

  title: {
    color: '#FFF',
    fontSize: 24,
    fontFamily: 'Pixel',
    marginTop: 6,
  },

  description: {
    color: '#FFF',
    marginTop: 10,
    width: 180,
    fontFamily: 'PixelOperator',
  },

  image: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
  },
});