import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';

interface Props {
  onPress?: () => void;
}

export default function ExitButton({
  onPress,
}: Props) {

  return (

    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >

      <Image
        source={require('../../assets/images/exit-icon.png')}
        style={styles.icon}
      />

      <Text style={styles.text}>
        EXIT
      </Text>

    </TouchableOpacity>

  );

}

const styles = StyleSheet.create({
  container: {
    width: 64,
    height: 64,
    backgroundColor: '#7A224A',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
  },

  icon: {
    width: 24,
    height: 24,
  },

  text: {
    color: '#FFF',
    fontSize: 10,
    marginTop: 2,
    fontFamily: 'PixelOperator',
  },
});