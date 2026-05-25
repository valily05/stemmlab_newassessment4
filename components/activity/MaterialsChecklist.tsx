// components/activity/MaterialsChecklist.tsx

import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

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
  return (
    <View style={styles.wrapper}>
      <View style={styles.headerContainer}>
        <View style={styles.headerBox}>
          <Text style={styles.headerText}>
            MATERIALS CHECKLIST
          </Text>
        </View>
      </View>

      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>
          MATERIAL
        </Text>

        <Text style={styles.tableHeaderText}>
          QUANTITY
        </Text>
      </View>

      {materials.map((item, index) => (
        <View key={index} style={styles.row}>
          <View style={styles.left}>
            <View style={styles.checkbox} />

            <Text style={styles.material}>
              ▶ {item.name}
            </Text>
          </View>

          <Text style={styles.quantity}>
            {item.quantity}
          </Text>
        </View>
      ))}

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
  wrapper: {
    marginHorizontal: 16,
    marginTop: 42,
    borderWidth: 3,
    borderColor: '#701BFF',
    paddingHorizontal: 14,
    paddingBottom: 18,
    backgroundColor: '#0B001B',
  },

  headerContainer: {
    alignItems: 'center',
  },

  headerBox: {
    marginTop: -24,
    backgroundColor: '#160029',
    borderWidth: 2,
    borderColor: '#701BFF',
    paddingHorizontal: 18,
    paddingVertical: 12,
  },

  headerText: {
    color: 'white',
    fontFamily: 'PressStart2P',
    fontSize: 11,
  },

  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#701BFF',
  },

  tableHeaderText: {
    color: '#9B47FF',
    fontFamily: 'PressStart2P',
    fontSize: 8,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#701BFF',
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },

  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: '#6FFF57',
    borderRadius: 3,
  },

  material: {
    color: 'white',
    fontFamily: 'PixeloidSans',
    fontSize: 11,
    flex: 1,
  },

  quantity: {
    color: '#FF4FB4',
    fontFamily: 'PressStart2P',
    fontSize: 9,
  },

  warningBox: {
    flexDirection: 'row',
    gap: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#FF4FB4',
    borderRadius: 12,
    padding: 14,
    marginTop: 18,
  },

  warningIcon: {
    color: '#FF4FB4',
    fontSize: 18,
  },

  warningText: {
    flex: 1,
    color: 'white',
    fontFamily: 'PixeloidSans',
    fontSize: 11,
    lineHeight: 20,
  },
});