import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface Props {
  onPress?: () => void;
}

export default function StopwatchCard({
  onPress,
}: Props) {

  return (

    <View style={styles.container}>

      <View style={{ flex: 1 }}>

        <Text style={styles.title}>
          STOPWATCH
        </Text>

        <Text style={styles.description}>
          Press the button the moment the object hits the ground.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={onPress}
        >

          <Text style={styles.buttonText}>
            START TIMER
          </Text>

        </TouchableOpacity>

      </View>

      <Image
        source={require('../../assets/images/stopwatch-large.png')}
        style={styles.image}
      />

    </View>

  );

}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: '#5711BE',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    color: '#FACC15',
    fontFamily: 'Pixel',
    fontSize: 18,
  },

  description: {
    color: '#FFF',
    marginTop: 8,
    fontFamily: 'PixelOperator',
  },

  image: {
    width: 80,
    height: 80,
  },

  button: {
    marginTop: 16,
    backgroundColor: '#ED359D',
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontFamily: 'Pixel',
  },
});