import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface Props {
  tips: string[];
}

export default function ExperimentTipCard({
  tips,
}: Props) {

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        ★ BUNNY TIP
      </Text>

      {tips.map((tip, index) => (

        <Text
          key={index}
          style={styles.tip}
        >
          • {tip}
        </Text>

      ))}

    </View>

  );

}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 18,
    borderWidth: 2,
    borderColor: '#5711BE',
    borderRadius: 16,
  },

  title: {
    color: '#FACC15',
    fontFamily: 'Pixel',
    marginBottom: 10,
  },

  tip: {
    color: '#FFF',
    marginBottom: 6,
    fontFamily: 'PixelOperator',
  },
});