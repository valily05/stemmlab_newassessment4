import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import {
    ChevronRight,
    HelpCircle,
    History,
    Languages,
    LogOut,
    Moon,
    Settings,
    Sun
} from 'lucide-react-native';
import React, { useMemo } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    Easing,
    PixelRatio,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import { useTheme } from "@/context/ThemeContext";
import { auth } from '@/services/firebase/config';
import { useLanguage } from '../context/LanguageContext';

const { width } = Dimensions.get('window');
const wp = (p: number) => PixelRatio.roundToNearestPixel((width * p) / 100);

const SWITCH_WIDTH = wp(16);
const SWITCH_HEIGHT = wp(8);
const KNOB_SIZE = wp(6.5);
const KNOB_MARGIN = wp(0.75);

interface CustomSwitchProps {
    value: boolean;
    theme: any;
}

const CustomThemeSwitch = ({ value, theme }: CustomSwitchProps) => {
    const animatedKnobPosition = useMemo(
      () => new Animated.Value(value ? 1 : 0),
      [value]
    );

    React.useEffect(() => {
      Animated.timing(animatedKnobPosition, {
        toValue: value ? 1 : 0,
        duration: 250,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }, [value, animatedKnobPosition]);

    const interpolateKnobX = animatedKnobPosition.interpolate({
        inputRange: [0, 1],
        outputRange: [KNOB_MARGIN, SWITCH_WIDTH - KNOB_SIZE - KNOB_MARGIN],
    });

    return (
        <View style={[styles.switchTrack, { backgroundColor: value ? theme.switchOnBg : theme.switchOffBg }]}>
            <Animated.View
                style={[
                    styles.switchKnob,
                    {
                        backgroundColor: value ? theme.knobOnColor : theme.knobOffColor,
                        transform: [{ translateX: interpolateKnobX }],
                    },
                ]}
            >
                {value ? (
                    <Moon color="#fff" size={KNOB_SIZE * 0.6} />
                ) : (
                    <Sun color="#fff" size={KNOB_SIZE * 0.6} />
                )}
            </Animated.View>
        </View>
    );
};

interface SidebarProps {
    onClose: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
    const router = useRouter();
    const { language, t } = useLanguage();
    const { theme, isDark, toggleTheme } = useTheme();

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            Alert.alert("Logout Failed", "Could not sign out.");
        }
    };

    return (
        <LinearGradient
            colors={theme.sidebarGradient}
            style={styles.gradientContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <SafeAreaView style={styles.innerContainer}>
                <View>
                    <Text style={[styles.title, { color: theme.sidebarTitle }]}>STEMM LAB</Text>
                    
                    <Text style={[styles.subtitle, { color: theme.sidebarSubtitle }]}>
                        Learn<Text style={styles.star}> ✦ </Text>
                        Experiment<Text style={styles.star}> ✦ </Text>
                        Innovate
                    </Text>

                    <TouchableOpacity activeOpacity={0.7} style={[styles.menuItem, { borderBottomColor: theme.sidebarDivider }]} onPress={() => { onClose(); router.push('/sidebar/activityhistory'); }}>
                        <View style={styles.row}>
                            <History color="#C084FC" size={20} />
                            <Text style={[styles.label, { color: theme.sidebarText }]}>{t.activityHistory || "Activity History"}</Text>
                        </View>
                        <ChevronRight color="rgba(255,255,255,0.4)" size={20} />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} style={[styles.menuItem, { borderBottomColor: theme.sidebarDivider }]} onPress={onClose}>
                        <View style={styles.row}>
                            <Settings color="#3B82F6" size={20} />
                            <Text style={[styles.label, { color: theme.sidebarText }]}>{t.settings || "Settings"}</Text>
                        </View>
                        <ChevronRight color="rgba(255,255,255,0.4)" size={20} />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} style={[styles.menuItem, { borderBottomColor: theme.sidebarDivider }]} onPress={() => { onClose(); router.push('/language'); }}>
                        <View style={styles.row}>
                            <Languages color="#10B981" size={20} />
                            <Text style={[styles.label, { color: theme.sidebarText }]}>{language}</Text>
                        </View>
                        <ChevronRight color="rgba(255,255,255,0.4)" size={20} />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} style={[styles.menuItem, { borderBottomColor: theme.sidebarDivider }]} onPress={() => { onClose(); router.push('/'); }}>
                        <View style={styles.row}>
                            <HelpCircle color="#EAB308" size={20} />
                            <Text style={[styles.label, { color: theme.sidebarText }]}>{t.helpSupport || "Help & Support"}</Text>
                        </View>
                        <ChevronRight color="rgba(255,255,255,0.4)" size={20} />
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity 
                        activeOpacity={0.7}
                        style={[styles.menuItem, styles.modeToggleContainer, { backgroundColor: theme.sidebarToggleBg }]}
                        onPress={toggleTheme}
                    >
                        <View style={styles.row}>
                            <Text style={[styles.label, { color: theme.sidebarText }]}>{isDark ? "Dark Mode" : "Light Mode"}</Text>
                        </View>
                        <CustomThemeSwitch value={isDark} theme={theme} />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        activeOpacity={0.7} 
                        style={[
                            styles.logoutButton, 
                            { 
                                borderColor: theme.logoutBorder, 
                                backgroundColor: theme.logoutBg 
                            }
                        ]} 
                        onPress={handleLogout}
                    >
                        <LogOut color={theme.logoutText} size={20} />
                        <Text style={[styles.logoutText, { color: theme.logoutText }]}>{t.logout || "LOGOUT"}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradientContainer: { flex: 1 },
    innerContainer: { flex: 1, padding: wp(5), justifyContent: 'space-between' },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: wp(10), marginLeft: wp(4), fontFamily: 'Pixel', marginTop: wp(8) },
    subtitle: { fontSize: 14, marginBottom: wp(8), marginLeft: wp(4), fontFamily: 'PixelOperator', marginTop: -wp(7) },
    menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: wp(5), borderBottomWidth: 1, marginLeft: wp(4), marginRight: wp(4) },
    modeToggleContainer: {
        paddingHorizontal: wp(4),
        borderRadius: wp(3),
        borderBottomWidth: 0,
        marginBottom: wp(4),
    },
    row: { flexDirection: 'row', alignItems: 'center', gap: wp(4) },
    label: { fontSize: 16, fontFamily: 'PixelOperator' },
    star: { color: '#EC588C' },
    logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, padding: wp(4), borderWidth: 1, borderRadius: wp(3), marginLeft: wp(4), marginRight: wp(4), marginBottom: wp(2) },
    logoutText: { fontFamily:'PixelBold', fontSize: 22 },
    switchTrack: { width: SWITCH_WIDTH, height: SWITCH_HEIGHT, borderRadius: SWITCH_HEIGHT / 2, padding: KNOB_MARGIN, justifyContent: 'center' },
    switchKnob: { width: KNOB_SIZE, height: KNOB_SIZE, borderRadius: KNOB_SIZE / 2, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 1 },
});

export default Sidebar;