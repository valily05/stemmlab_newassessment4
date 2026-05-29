import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface Props {
  timeLeft: string;
  iteration: string;
}

export default function ExperimentStats({
  timeLeft,
  iteration,
}: Props) {

  return (

    <View style={styles.card}>

      <View style={styles.item}>

        <Image
          source={require('../../assets/images/hourglass.png')}
          style={styles.icon}
        />

        <View>

          <Text style={styles.label}>
            TIME LEFT
          </Text>

          <Text style={styles.value}>
            {timeLeft}
          </Text>

        </View>

      </View>

      <View style={styles.divider} />

      <View style={styles.item}>

        <Image
          source={require('../../assets/images/iteration.png')}
          style={styles.icon}
        />

        <View>

          <Text style={styles.label}>
            ITERATION
          </Text>

          <Text style={styles.value}>
            {iteration}
          </Text>

        </View>

      </View>

    </View>

  );

}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: '#5711BE',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    width: 34,
    height: 34,
    marginRight: 10,
  },

  label: {
    color: '#2AE3DA',
    fontFamily: 'PixelOperator',
  },

  value: {
    color: '#FFF',
    fontFamily: 'Pixel',
    fontSize: 18,
  },

  divider: {
    width: 1,
    backgroundColor: '#5711BE',
  },
});