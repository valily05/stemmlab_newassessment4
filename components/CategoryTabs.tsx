
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function CategoryTabs() {
  return (
    <View style={styles.tabs}>
      <TouchableOpacity style={styles.activeTab}>
        <Text style={styles.activeText}>All</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab}>
        <Text style={styles.tabText}>Engineering ⚒️</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab}>
        <Text style={styles.tabText}>Health ⚕️</Text>
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

  activeTab: {
    backgroundColor: '#6D28D9',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 12,
  },

  activeText: {
    color: '#fff',
    fontFamily:'PixelOperator',


  },

  tab: {
    borderWidth: 1,
    borderColor: '#6D28D9',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },

  tabText: {
    color: '#fff',
    opacity: 0.85,
    fontFamily:'PixelOperator',

  },
});