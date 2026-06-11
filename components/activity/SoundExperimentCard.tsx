// components/activity/CaptureExperimentCard.tsx
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  PixelRatio,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

const wp = (percentage: number) =>
  PixelRatio.roundToNearestPixel(
    (width * percentage) / 100
  );

const hp = (percentage: number) =>
  PixelRatio.roundToNearestPixel(
    (height * percentage) / 100
  );

const rf = (size: number) => {
  const scale = width / 390;

  return Math.round(
    PixelRatio.roundToNearestPixel(
      size * scale
    )
  );
};

interface Props {
  location: Location.LocationObject | null;
  loadingLocation: boolean;
  locationName: string;
  setLocationName: (value: string) => void;
  onDetectLocation: () => void | Promise<void>;
  onSaveLocation: () => void;
  onInputFocus: () => void;
}

export default function SoundExperimentCard({
  location,
  loadingLocation,
  locationName,
  setLocationName,
  onDetectLocation,
  onSaveLocation,
}: Props) {

  return (
    
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.cardWrapper}
    >
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.leftContent}>
            
            {/* Title and Required Badge on the same line */}
            <View style={styles.titleRow}>
              <Text
                style={styles.title}
                numberOfLines={1}
              >
                LOCATION SETUP
              </Text>

              <View style={styles.requiredBadge}>
                <Text style={styles.requiredText}>
                  Required
                </Text>
              </View>
            </View>

            <Text style={styles.description}>
              Detect and save your
            {' '}
              <Text style={styles.yellowText}>
                current investigation
              </Text>{' '}
              location before measuring sound.
            </Text>

          </View>
        </View>

        <View style={styles.mapContainer}>
          <Image
            source={require('../../assets/images/map.png')}
            style={styles.mapImage}
          />

          {loadingLocation && (
            <View style={styles.coordinateOverlay}>
              <Text style={styles.coordinateTitle}>
                DETECTING GPS...
              </Text>
            </View>
          )}

          {location && (
            <View style={styles.coordinateOverlay}>
              <Text style={styles.coordinateText}>
                LATITUDE: <Text style={styles.coordinateValue}>{location.coords.latitude.toFixed(6)}</Text>
              </Text>

              <Text style={styles.coordinateText}>
                LONGTITUDE: <Text style={styles.coordinateValue}>{location.coords.longitude.toFixed(6)}</Text>
              </Text>
            </View>
          )}
        </View>
          
        {location && (
          <>
            <Text style={styles.inputLabel}>
              LOCATION NAME
            </Text>

            <TextInput
              style={styles.input}
              value={locationName}
              onChangeText={setLocationName}
              placeholder="e.g. School Entrance"
              placeholderTextColor="#888"
            />
          </>
        )}

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => {
            if (!location) {
              onDetectLocation();
            } else {
              onSaveLocation();
            }
          }}
        >
          <MaterialCommunityIcons
            name={location ? 'content-save' : 'crosshairs-gps'}
            size={rf(28)}
            color="#FFFFFF"
            style={{ marginRight: wp(3) }}
          />

          <Text style={styles.startText}>
            {loadingLocation
              ? 'DETECTING...'
              : location
              ? 'SAVE LOCATION'
              : 'DETECT LOCATION'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  leftContent: {
    flex: 1,
    paddingRight: wp(3),
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  mapContainer: {
    marginTop: hp(2),
    marginBottom: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: rf(16),
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: hp(20),
    resizeMode: 'cover',
    opacity: 0.35,
  },
  coordinateTitle: {
    color: '#5CC8FF',
    fontFamily: 'Pixel',
    fontSize: rf(11),
    marginBottom: hp(0.5),
  },
  inputLabel: {
    color: '#ffffff',
    fontFamily: 'PixelBold',
    fontSize: rf(18),
    marginTop: hp(2),
    marginBottom: hp(1),
  },
  coordinateOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -wp(31) }, 
      { translateY: -hp(5) },
    ],
    backgroundColor: 'rgba(21, 27, 77, 0.75)',
    borderWidth: 1.5,
    borderColor: '#5CC8FF',
    borderRadius: rf(12),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    alignItems: 'flex-start',
    width: wp(60),
  },
  input: {
    backgroundColor: '#151B4D',
    borderWidth: 2,
    borderColor: '#3D438F',
    borderRadius: rf(12),
    color: '#FFFFFF',
    fontFamily: 'PixelOperator',
    fontSize: rf(14),
    paddingHorizontal: wp(4),
    height: hp(6),
  },
  coordinateText: {
    color: '#FFFF', 
    fontFamily: 'PixelBold',
    fontSize: rf(20),
  },
  coordinateValue: {
    color: '#5CC8FF',
    fontFamily: 'PixelOperator',
    fontSize: rf(21),
  },
  stopLabel: {
    fontSize: rf(14),
    color: '#FF4D8D',
    fontFamily: 'Pixel',
  },
  card: {
    marginHorizontal: wp(5),
    marginTop: hp(3),
    backgroundColor: '#02032A',
    borderRadius: rf(22),
    padding: wp(5),
    paddingTop: wp(6),
    borderWidth: rf(2),
    borderColor: '#3D438F',
    shadowColor: '#3D438F',
    shadowOpacity: 1,
    shadowRadius: rf(10),
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  yellowText: {
    color: '#FFE95B',
  },
  title: {
    color: '#FFE95B',
    fontSize: rf(14),
    fontFamily: 'Pixel',
  },
  requiredBadge: {
    backgroundColor: '#FF000036',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.4),
    borderRadius: rf(10),
    left: rf(13),
  },
  requiredText: {
    color: '#FF0000',
    fontSize: rf(14),
    fontFamily: 'PixelOperator',
  },
  description: {
    color: '#FFFFFF',
    fontSize: rf(15),
    lineHeight: rf(18),
    fontFamily: 'PixelOperator',
    marginTop: hp(2),
  },
  startButton: {
    height: hp(6),
    backgroundColor: '#3E79E8',
    borderRadius: rf(14),
    marginTop: hp(3),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startText: {
    color: '#FFFFFF',
    fontSize: rf(14),
    fontFamily: 'Pixel',
  },
});