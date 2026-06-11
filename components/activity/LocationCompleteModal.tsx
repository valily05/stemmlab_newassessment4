// components/activity/LocationCompleteModal.tsx

import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
    Dimensions,
    Modal,
    PixelRatio,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const wp = (p: number) =>
  PixelRatio.roundToNearestPixel((width * p) / 100);

const hp = (p: number) =>
  PixelRatio.roundToNearestPixel((height * p) / 100);

const rf = (size: number) => {
  const scale = width / 390;

  return Math.round(
    PixelRatio.roundToNearestPixel(size * scale)
  );
};

interface Props {
  visible: boolean;
  onAddAnother: () => void;
  onFinish: () => void;
}

export default function LocationCompleteModal({
  visible,
  onAddAnother,
  onFinish,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>

        <View style={styles.card}>

          <View style={styles.iconCircle}>
            <MaterialCommunityIcons
              name="map-marker-check"
              size={rf(46)}
              color="#FFE95B"
            />
          </View>

          <Text style={styles.title}>
            LOCATION SAVED!
          </Text>

          <Text style={styles.subtitle}>
            All recordings for this location have been completed.
          </Text>

          <Text style={styles.question}>
            Would you like to record another location?
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={onAddAnother}
          >
            <MaterialCommunityIcons
              name="map-marker-plus"
              color="#FFF"
              size={rf(22)}
            />

            <Text style={styles.buttonText}>
              ADD ANOTHER LOCATION
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={onFinish}
          >
            <MaterialCommunityIcons
              name="check-circle"
              color="#FFE95B"
              size={rf(22)}
            />

            <Text style={styles.finishText}>
              FINISH ACTIVITY
            </Text>
          </TouchableOpacity>

        </View>

      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.72)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(7),
  },

  card: {
    width: "100%",

    backgroundColor: "#02032A",

    borderRadius: rf(24),

    borderWidth: 2,
    borderColor: "#3D438F",

    paddingHorizontal: wp(6),
    paddingVertical: hp(4),

    alignItems: "center",

    shadowColor: "#3D438F",
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 12,
  },

  iconCircle: {
    width: wp(24),
    height: wp(24),

    borderRadius: 999,

    backgroundColor: "#181044",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: hp(2),
  },

  title: {
    color: "#FFE95B",

    fontFamily: "Pixel",

    fontSize: rf(17),

    textAlign: "center",
  },

  subtitle: {
    marginTop: hp(1.5),

    color: "#FFFFFF",

    textAlign: "center",

    fontFamily: "PixelOperator",

    fontSize: rf(16),

    lineHeight: rf(22),
  },

  question: {
    marginTop: hp(2),

    color: "#B9AEFF",

    textAlign: "center",

    fontFamily: "PixelOperator",

    fontSize: rf(16),
  },

  primaryButton: {
    marginTop: hp(4),

    width: "100%",
    height: hp(6.2),

    backgroundColor: "#00AEEF",

    borderRadius: rf(14),

    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",
  },

  secondaryButton: {
    marginTop: hp(2),

    width: "100%",
    height: hp(6.2),

    borderRadius: rf(14),

    borderWidth: 2,
    borderColor: "#FFE95B",

    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    marginLeft: wp(2),

    color: "#FFFFFF",

    fontFamily: "PixelBold",

    fontSize: rf(18),
  },

  finishText: {
    marginLeft: wp(2),

    color: "#FFE95B",

    fontFamily: "PixelBold",

    fontSize: rf(14),
  },
});