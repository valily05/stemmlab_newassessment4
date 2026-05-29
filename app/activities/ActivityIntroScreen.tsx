import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface Props {
  activityNumber: number;
  title: string;
  objective: string;
  attempt?: number;
  onStart?: () => void;
}

export default function ActivityIntroScreen({
  activityNumber,
  title,
  objective,
  attempt = 1,
  onStart,
}: Props) {
  return (
    <View style={styles.container}>
      {/* Background */}
      <Image
        source={require('../../assets/images/activity-bg.png')}
        style={styles.background}
      />

 

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.activityNumber}>
          ACTIVITY #{activityNumber}
        </Text>

        <Text style={styles.title}>
          {title}
        </Text>

        <View style={styles.attemptBadge}>
          <Text style={styles.attemptText}>
            ATTEMPT #{attempt}
          </Text>
        </View>
      </View>

      {/* Objective Card */}
      <View style={styles.card}>
        <Text style={styles.objectiveTitle}>
          ✨ Activity Objective :
        </Text>

        <Text style={styles.objectiveText}>
          {objective}
        </Text>
      </View>

      {/* Character */}
      <Image
        source={require('../../assets/images/miffy-scientist.png')}
        style={styles.character}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={onStart}
      >
        <Text style={styles.buttonText}>
          START ACTIVITY
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#04061B',
  },

  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },


  header: {
    paddingHorizontal: 24,
    marginTop: 80,
  },

  activityNumber: {
    color: '#FFD94E',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1,
  },

  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: '900',
    marginTop: 10,
    width: 250,
    lineHeight: 34,
  },

  attemptBadge: {
    marginTop: 16,
    backgroundColor: '#FFE66A',
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 8,
  },

  attemptText: {
    color: '#3D55E6',
    fontWeight: '900',
    fontSize: 14,
  },

  card: {
    marginTop: 140,
    marginHorizontal: 30,
    backgroundColor: '#F6F6F6',
    borderWidth: 4,
    borderColor: '#C7C7C7',
    padding: 20,
  },

  objectiveTitle: {
    color: '#4D7FFF',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
  },

  objectiveText: {
    marginTop: 12,
    color: '#111',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 32,
  },

  character: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 120,
    left: 20,
  },

  button: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#5711BE',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 12,
  },

  buttonText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 16,
  },
});