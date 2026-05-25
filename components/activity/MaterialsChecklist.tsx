// components/activity/MaterialsChecklist.tsx

import {
    Dimensions,
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

        <View style={styles.headerBox}>

          <Text style={styles.headerText}>
            MATERIALS CHECKLIST
          </Text>

        </View>

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

          <View
            key={index}
            style={styles.row}
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

                  <View
                    style={styles.checkInner}
                  />

                )}

              </Pressable>

              {/* MATERIAL */}
              <Text style={styles.material}>
                ▶ {item.name}
              </Text>

            </View>

            {/* QUANTITY */}
            <Text style={styles.quantity}>
              {item.quantity}
            </Text>

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
    marginHorizontal: wp(4),

    marginTop: hp(5),

    borderWidth: rf(3),

    borderColor: '#701BFF',

    paddingHorizontal: wp(3.5),

    paddingBottom: hp(2.2),

    backgroundColor: '#0B001B',
  },

  /* HEADER */
  headerContainer: {
    alignItems: 'center',
  },

  headerBox: {
    marginTop: -hp(2.5),

    backgroundColor: '#160029',

    borderWidth: rf(2),

    borderColor: '#701BFF',

    paddingHorizontal: wp(4.5),

    paddingVertical: hp(1.4),
  },

  headerText: {
    color: 'white',

    fontFamily: 'PressStart2P',

    fontSize: rf(11),
  },

  /* TABLE */
  tableHeader: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    marginTop: hp(3),

    paddingBottom: hp(1.2),

    borderBottomWidth: 1,

    borderBottomColor: '#701BFF',
  },

  tableHeaderText: {
    color: '#9B47FF',

    fontFamily: 'PressStart2P',

    fontSize: rf(8),
  },

  /* ROW */
  row: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    paddingVertical: hp(1.8),

    borderBottomWidth: 1,

    borderBottomColor: '#701BFF',
  },

  /* LEFT */
  left: {
    flexDirection: 'row',

    alignItems: 'center',

    flex: 1,
  },

  /* CHECKBOX */
  checkbox: {
    width: rf(18),

    height: rf(18),

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

  checkInner: {
    width: rf(8),

    height: rf(8),

    backgroundColor: '#0B001B',
  },

  /* MATERIAL */
  material: {
    color: 'white',

    fontFamily: 'PixeloidSans',

    fontSize: rf(11),

    flex: 1,
  },

  /* QUANTITY */
  quantity: {
    color: '#ED359D',

    fontFamily: 'PressStart2P',

    fontSize: rf(9),
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

    fontSize: rf(18),

    marginRight: wp(3),
  },

  warningText: {
    flex: 1,

    color: 'white',

    fontFamily: 'PixeloidSans',

    fontSize: rf(11),

    lineHeight: rf(20),
  },

});