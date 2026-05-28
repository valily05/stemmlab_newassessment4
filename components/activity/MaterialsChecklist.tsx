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
}

export default function MaterialsChecklist({
  materials,
}: Props) {

  const [checkedItems, setCheckedItems] =
    useState<number[]>([]);

  const toggleCheck = (index: number) => {

    if (checkedItems.includes(index)) {

      setCheckedItems(
        checkedItems.filter(
          (item) => item !== index
        )
      );

    } else {

      setCheckedItems([
        ...checkedItems,
        index,
      ]);

    }

  };

  return (

    <View style={styles.wrapper}>

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

            <View style={styles.row}>

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

                  <Text style={styles.material}>
                    {item.name}
                  </Text>

                </View>

              </View>

              {/* QUANTITY */}
              <Text style={styles.quantity}>
                {item.quantity}
              </Text>

            </View>

            {/* DASHED DIVIDER */}
            <View style={styles.dashedDivider} />

          </View>

        );

      })}

      {/* WARNING */}
      <View style={styles.warningBox}>

        <Text style={styles.warningIcon}>
          ⚠
        </Text>

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

    marginTop: hp(5),

    borderWidth: rf(3),

    borderColor: '#701BFF',

    paddingHorizontal: wp(3.5),

    paddingBottom: hp(2.2),

    backgroundColor: '#150F31',
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
  },

  headerText: {
    color: 'white',

    fontFamily: 'Pixel',

    fontSize: rf(14),

    marginTop: hp(0.2),
  },

  /* TABLE */
  tableHeader: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    marginTop: hp(3),

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
  },

  /* DASHED DIVIDER */
  dashedDivider: {
    borderBottomWidth: 2,

    borderBottomColor: '#5711BE',

    borderStyle: 'dashed',
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

    marginRight: wp(3),

    justifyContent: 'center',

    alignItems: 'center',
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
  },

  warningIcon: {
    color: '#ED359D',

    fontSize: rf(40),

    marginRight: wp(3),
  },

  warningText: {
    flex: 1,

    color: 'white',

    fontFamily: 'PixelOperator',

    fontSize: rf(15),

    lineHeight: rf(20),
  },

});