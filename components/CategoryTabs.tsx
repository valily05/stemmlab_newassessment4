import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type Props = {
  selected: string;
  setSelected: (value: string) => void;
};

export default function CategoryTabs({
  selected,
  setSelected,
}: Props) {

  return (

    <View style={styles.tabs}>

      {/* ALL */}
      <TouchableOpacity
        style={[
          styles.tab,
          selected === 'ALL' && styles.activeTab,
        ]}
        onPress={() => setSelected('ALL')}
      >

        <Text
          style={[
            styles.tabText,
            selected === 'ALL' && styles.activeText,
          ]}
        >
          All
        </Text>

      </TouchableOpacity>

      {/* ENGINEERING */}
      <TouchableOpacity
        style={[
          styles.tab,
          selected === 'ENGINEERING' && styles.activeTab,
        ]}
        onPress={() => setSelected('ENGINEERING')}
      >

        <Text
          style={[
            styles.tabText,
            selected === 'ENGINEERING' && styles.activeText,
          ]}
        >
          Engineering
        </Text>

        <Image
          source={require('../assets/images/engineering.png')}
          style={styles.icon1}
        />

      </TouchableOpacity>

      {/* HEALTH */}
      <TouchableOpacity
        style={[
          styles.tab,
          selected === 'HEALTH' && styles.activeTab,
        ]}
        onPress={() => setSelected('HEALTH')}
      >

        <Text
          style={[
            styles.tabText,
            selected === 'HEALTH' && styles.activeText,
          ]}
        >
          Health
        </Text>

        <Image
          source={require('../assets/images/health.png')}
          style={styles.icon2}
        />

      </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({

  tabs: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 30,
  },

  tab: {
    borderWidth: 1,

    borderColor: '#6D28D9',

    paddingHorizontal: 17,
    paddingVertical: 5,

    borderRadius: 12,

    flexDirection: 'row',

    alignItems: 'center',

    gap: 8,
  },

  activeTab: {
    backgroundColor: '#6D28D9',
  },

  activeText: {
    color: '#fff',
  },

  tabText: {
    color: '#fff',

    opacity: 0.85,

    fontSize: 16,

    fontFamily: 'PixelOperator',
  },

  icon1: {
    width: 30,
    height: 30,

    resizeMode:'contain'
  },

  icon2: {
    width: 20,
    height: 20,
  },

});