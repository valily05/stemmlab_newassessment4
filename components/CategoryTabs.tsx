import { useTheme } from "@/context/ThemeContext";
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
  const { theme } = useTheme();
  
  // Adjust text color based on light/dark mode to prevent white-on-white
  // (Change 'dark' to whatever your theme context uses to identify dark mode, e.g., theme.mode === 'dark')
  const isDark = theme.activityCard === '#12052F'; // fallback check if needed
  
  const getTextColor = (isActive: boolean) => {
    if (isActive) return '#fff'; // Active tab is always white text
    return isDark ? '#D7CCFF' : '#12052F'; // Inactive tab: light text for dark mode, dark text for light mode
  };

  return (
    <View style={styles.tabs}>
      {/* ALL */}
      <TouchableOpacity
        style={[
          styles.tab,
          {
            borderColor: theme.activityBorder || '#6D28D9',
            backgroundColor: selected === 'ALL' ? '#6D28D9' : 'transparent',
          },
        ]}
        onPress={() => setSelected('ALL')}
      >
        <Text style={[styles.tabText, { color: getTextColor(selected === 'ALL') }]}>
          All
        </Text>
      </TouchableOpacity>

      {/* ENGINEERING */}
      <TouchableOpacity
        style={[
          styles.tab,
          {
            borderColor: theme.activityBorder || '#6D28D9',
            backgroundColor: selected === 'ENGINEERING' ? '#6D28D9' : 'transparent',
          },
        ]}
        onPress={() => setSelected('ENGINEERING')}
      >
        <Text style={[styles.tabText, { color: getTextColor(selected === 'ENGINEERING') }]}>
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
          {
            borderColor: theme.activityBorder || '#6D28D9',
            backgroundColor: selected === 'HEALTH' ? '#6D28D9' : 'transparent',
          },
        ]}
        onPress={() => setSelected('HEALTH')}
      >
        <Text style={[styles.tabText, { color: getTextColor(selected === 'HEALTH') }]}>
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
    paddingHorizontal: 17,
    paddingVertical: 5,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'PixelOperator',
  },
  icon1: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  icon2: {
    width: 20,
    height: 20,
  },
});