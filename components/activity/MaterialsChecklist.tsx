// components/activity/MaterialsChecklist.tsx

import {
  Dimensions,
  ImageBackground,
  PixelRatio,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useState } from 'react';

const { width, height } = Dimensions.get('window');

/* RESPONSIVE HELPERS */
const wp = (percentage: number) => {

  return PixelRatio.roundToNearestPixel(
    (width * percentage) / 100
  );

};

const hp = (percentage: number) => {

  return PixelRatio.roundToNearestPixel(
    (height * percentage) / 100
  );

};

const rf = (size: number) => {

  const scale = width / 390;

  return Math.round(
    PixelRatio.roundToNearestPixel(
      size * scale
    )
  );

};

interface Material {
  name: string;
  quantity: string;
}

interface Props {
  materials: Material[];

  onCompleteChange?: (
    complete: boolean
  ) => void;

  onProgressChange?: (
    progress: number
  ) => void;
}
export default function MaterialsChecklist({
  materials,
  onCompleteChange,
  onProgressChange,
}: Props) {
  const [checkedItems, setCheckedItems] =
    useState<number[]>([]);

const toggleCheck = (index: number) => {

  let updatedItems: number[];

  if (checkedItems.includes(index)) {

    updatedItems =
      checkedItems.filter(
        (item) => item !== index
      );

  } else {

    updatedItems = [
      ...checkedItems,
      index,
    ];

  }

  setCheckedItems(updatedItems);

  const materialProgress =
    Math.round(
      (updatedItems.length /
        materials.length) * 100
    );

  onProgressChange?.(
    materialProgress
  );

  onCompleteChange?.(
    updatedItems.length ===
      materials.length
  );

};

  return (

    <View style={styles.wrapper}>

      {/* FULL VERTICAL DASHED LINE */}
      <View style={styles.fullVerticalLine}>

        {Array.from({ length: 28 }).map((_, i) => (
          <View
            key={i}
            style={styles.verticalDash}
          />
        ))}

      </View>

      {/* HEADER */}
      <View style={styles.headerContainer}>

        <ImageBackground
          source={require('../../assets/images/Group 217.png')}
          style={styles.headerBox}
          resizeMode="contain"
        >

          <Text style={styles.headerText}>
            MATERIALS CHECKLIST
          </Text>

        </ImageBackground>

      </View>

      {/* TABLE HEADER */}
      <View style={styles.tableHeader}>

        <Text style={styles.tableHeaderText}>
          MATERIAL
        </Text>

        <Text style={styles.tableHeaderText}>
          QUANTITY
        </Text>

      </View>

      {/* ITEMS */}
      {materials.map((item, index) => {

        const checked =
          checkedItems.includes(index);

        return (

          <View key={index}>

<Pressable
  style={styles.row}
  onPress={() => toggleCheck(index)}
>
              <View style={styles.left}>

                {/* CHECKBOX */}
              <Pressable
  onPress={() =>
    toggleCheck(index)
  }
  style={[
    styles.checkbox,

    checked &&
      styles.checkboxActive,
  ]}
>

  {checked && (
    <Text style={styles.checkMark}>
      ✓
    </Text>
  )}

</Pressable>

                {/* MATERIAL */}
                <View
                  style={styles.materialContainer}
                >

                  <Text style={styles.triangle}>
                    ▶
                  </Text>
<View style={styles.materialWrapper}>

  <Text
    style={[
      styles.material,

      checked && styles.materialChecked,
    ]}
  >
    {item.name}
  </Text>

  {checked && (
    <View style={styles.strikeLine} />
  )}

</View>

                </View>

              </View>

              {/* QUANTITY */}
              <Text style={styles.quantity}>
                {item.quantity}
              </Text>

            </Pressable>

            {/* DASHED DIVIDER */}
            <View style={styles.dashedDivider}>

              {Array.from({ length: 27 }).map((_, i) => (
                <View
                  key={i}
                  style={styles.dash}
                />
              ))}

            </View>

          </View>

        );

      })}

      {/* WARNING */}
      <View style={styles.warningBox}>

     <ImageBackground
  source={require('../../assets/images/Group 183.png')}
  style={styles.warningIcon}
  resizeMode="contain"
/>
        <Text style={styles.warningText}>
          Make sure to check all required
          materials before starting the
          activity.
        </Text>

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  /* WRAPPER */
  wrapper: {
    marginHorizontal: wp(2),

    marginTop: hp(3),

    borderWidth: rf(3),

    borderColor: '#701BFF',

    paddingHorizontal: wp(3.5),

    paddingBottom: hp(2.2),

    backgroundColor: '#150F31',

    position: 'relative',
  },
/* MATERIAL WRAPPER */
materialWrapper: {
  position: 'relative',

  justifyContent: 'center',
},

/* CHECKED MATERIAL */
materialChecked: {
  opacity: 0.5,
},

/* STRIKE LINE */
strikeLine: {
  position: 'absolute',

  width: '100%',

  height: rf(2),

  backgroundColor: '#ED359D',

  top: '50%',
},
  /* FULL VERTICAL DASHED LINE */
  fullVerticalLine: {
    position: 'absolute',

    left: wp(10.9),

    top: hp(11),

    bottom: hp(17),

    gap:hp(0.6),
    justifyContent: 'space-between',

    zIndex: 1,
  },

  /* VERTICAL DASH */
  verticalDash: {
    width: rf(2),

    height: hp(1),

    backgroundColor: '#5711BE',
  },

  /* HEADER */
  headerContainer: {
    alignItems: 'center',
  },

  headerBox: {
    marginTop: -hp(2.9),

    width: wp(80),

    height: hp(8),

    justifyContent: 'center',

    alignItems: 'center',

    overflow: 'hidden',

    zIndex: 2,
  },

  headerText: {
    color: 'white',

    fontFamily: 'Pixel',

    fontSize: rf(14),

  },

  /* TABLE */
  tableHeader: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    marginTop: hp(2),

    paddingBottom: hp(1.2),

    borderBottomWidth: rf(3),

    borderBottomColor: '#5711BE',
  },

  tableHeaderText: {
    color: '#8041df',

    fontFamily: 'PixelOperator',

    fontSize: rf(21),
  },

  /* ROW */
  row: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    paddingVertical: hp(1.8),

    zIndex: 2,
  },

  /* DASHED DIVIDER */
  dashedDivider: {
    flexDirection: 'row',

    gap: wp(1.3),

    marginBottom: hp(0.3),

    width: '100%',
  },

  /* INDIVIDUAL DASH */
  dash: {
    width: wp(2),

    height: rf(2),

    backgroundColor: '#5711BE',
  },

  /* LEFT */
  left: {
    flexDirection: 'row',

    alignItems: 'center',

    flex: 1,
  },

  /* CHECKBOX */
  checkbox: {
    width: rf(20),

    height: rf(20),

    borderWidth: rf(2),

    borderColor: '#60BB3F',

    borderRadius: rf(3),

    marginRight: wp(5),

    justifyContent: 'center',

    alignItems: 'center',

    zIndex: 2,
  },

  checkboxActive: {
    backgroundColor: '#60BB3F',
  },

  /* CHECK MARK */
  checkMark: {
    color: '#ffffff',

    fontSize: rf(16),

    fontFamily: 'LEMONMILK',

    lineHeight: rf(17),
  },

  /* MATERIAL CONTAINER */
  materialContainer: {
    flexDirection: 'row',

    alignItems: 'center',

    flex: 1,
  },

  /* TRIANGLE */
  triangle: {
    color: '#ED359D',

    fontFamily: 'PressStart2P',

    fontSize: rf(14),

    marginRight: wp(2),
  },

  /* MATERIAL */
  material: {
    color: 'white',

    fontFamily: 'PixelOperator',

    fontSize: rf(17),

    flex: 1,
  },

  /* QUANTITY */
  quantity: {
    color: '#ED359D',

    fontFamily: 'PixelOperator',

    fontSize: rf(18),
  },

  /* WARNING */
  warningBox: {
    flexDirection: 'row',

    borderWidth: rf(2),

    borderStyle: 'dashed',

    borderColor: '#ED359D',

    borderRadius: rf(12),

    padding: wp(3.5),

    marginTop: hp(2.2),

    zIndex: 2,
  },

 warningIcon: {
  width: rf(40),

  height: rf(40),

  marginRight: wp(4),

},

  warningText: {
    flex: 1,

    color: 'white',

    fontFamily: 'PixelOperator',

    fontSize: rf(15),

    lineHeight: rf(20),
  },

});