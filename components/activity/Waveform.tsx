import { useEffect, useMemo } from "react";
import {
    Animated,
    Easing,
    StyleSheet,
    View,
} from "react-native";

type Props = {
  value: number;
  testing: boolean;
};

const BAR_COUNT = 29;
const MIN_HEIGHT = 8;
const MAX_HEIGHT = 82;

export default function Waveform({
  value,
  testing,
}: Props) {

  const bars = useMemo(
    () =>
      Array.from(
        { length: BAR_COUNT },
        () => new Animated.Value(MIN_HEIGHT)
      ),
    []
  );

  useEffect(() => {

    // Reset when not testing
    if (!testing) {

      bars.forEach(bar => {

        Animated.timing(bar, {

          toValue: MIN_HEIGHT,

          duration: 250,

          easing: Easing.out(Easing.ease),

          useNativeDriver: false,

        }).start();

      });

      return;

    }

    // Convert dB into animation strength
    const intensity = Math.min(
      1,
      value / 100
    );

    const center = (BAR_COUNT - 1) / 2;

    bars.forEach((bar, index) => {

      // distance from centre
      const distance =
        Math.abs(index - center);

      // middle bars grow tallest
      const falloff =
        Math.max(
          0,
          1 - distance / center
        );

      // smooth curve
      const curve =
        Math.pow(falloff, 0.65);

      // tiny random wobble
      const wobble =
        (Math.random() - 0.5) * 4;

      const target =

        MIN_HEIGHT +

        curve *

        intensity *

        (MAX_HEIGHT - MIN_HEIGHT)

        +

        wobble;

      Animated.timing(bar, {

        toValue: Math.max(
          MIN_HEIGHT,
          target
        ),

        duration: 60,

        easing: Easing.linear,

        useNativeDriver: false,

      }).start();

    });

  }, [
    value,
    testing,
    bars,
  ]);  return (
    <View style={styles.container}>

      {bars.map((bar, index) => {

        const center = (BAR_COUNT - 1) / 2;
        const distance = Math.abs(index - center);

        const opacity =
          0.45 +
          (1 - distance / center) * 0.55;

        return (
          <Animated.View
            key={index}
            style={[
              styles.bar,
              {
                height: bar,
                opacity,
              },
            ]}
          />
        );

      })}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {

    height: 100,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "flex-end",

    marginVertical: 18,

    paddingHorizontal: 4,

  },

  bar: {

    width: 5,

    borderRadius: 999,

    backgroundColor: "#A67DFF",

    shadowColor: "#9C6CFF",

    shadowOpacity: 0.7,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 6,

  },

});