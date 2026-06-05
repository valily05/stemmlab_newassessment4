import { auth } from '@/services/firebase/config';
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
import { useLanguage } from '../context/LanguageContext';

const { width } = Dimensions.get('window');
const wp = (p: number) => PixelRatio.roundToNearestPixel((width * p) / 100);

const THEME_COLORS = {
    switchOnBg: '#FFEBB7',
    switchOffBg: '#0F2F4F',
    knobOnColor: '#FFCB30',
    knobOffColor: '#47CFFF',
};

const SWITCH_WIDTH = wp(16);
const SWITCH_HEIGHT = wp(8);
const KNOB_SIZE = wp(6.5);
const KNOB_MARGIN = wp(0.75);

interface CustomSwitchProps {
    value: boolean;
}

const CustomThemeSwitch = ({ value }: CustomSwitchProps) => {
    const animatedKnobPosition = useMemo(() => new Animated.Value(value ? 0 : 1), [value]);

    React.useEffect(() => {
        Animated.timing(animatedKnobPosition, {
            toValue: value ? 0 : 1,
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
        <View style={[styles.switchTrack, { backgroundColor: value ? THEME_COLORS.switchOnBg : THEME_COLORS.switchOffBg }]}>
            <Animated.View
                style={[
                    styles.switchKnob,
                    {
                        backgroundColor: value ? THEME_COLORS.knobOnColor : THEME_COLORS.knobOffColor,
                        transform: [{ translateX: interpolateKnobX }],
                    },
                ]}
            >
                {value ? (
                    <Sun color="#fff" size={KNOB_SIZE * 0.6} />
                ) : (
                    <Moon color="#fff" size={KNOB_SIZE * 0.6} />
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
    const [isDarkMode, setIsDarkMode] = React.useState(true);

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            Alert.alert("Logout Failed", "Could not sign out.");
        }
    };

    return (
        <LinearGradient
            colors={['#07021B', '#2E1065', '#0F172A']}
            style={styles.gradientContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <SafeAreaView style={styles.innerContainer}>
                <View>
                    <Text style={styles.title}>STEMM LAB</Text>
                    
                    <Text style={styles.subtitle}>
                        Learn<Text style={styles.star}> ✦ </Text>
                        Experiment<Text style={styles.star}> ✦ </Text>
                        Innovate
                    </Text>

                    <TouchableOpacity activeOpacity={0.7} style={styles.menuItem} onPress={() => { onClose(); router.push('/sidebar/activityhistory'); }}>
                        <View style={styles.row}>
                            <History color="#C084FC" size={20} />
                            <Text style={styles.label}>{t.activityHistory || "Activity History"}</Text>
                        </View>
                        <ChevronRight color="rgba(255,255,255,0.4)" size={20} />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} style={styles.menuItem} onPress={onClose}>
                        <View style={styles.row}>
                            <Settings color="#3B82F6" size={20} />
                            <Text style={styles.label}>{t.settings || "Settings"}</Text>
                        </View>
                        <ChevronRight color="rgba(255,255,255,0.4)" size={20} />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} style={styles.menuItem} onPress={() => { onClose(); router.push('/language'); }}>
                        <View style={styles.row}>
                            <Languages color="#10B981" size={20} />
                            <Text style={styles.label}>{language}</Text>
                        </View>
                        <ChevronRight color="rgba(255,255,255,0.4)" size={20} />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} style={styles.menuItem} onPress={() => { onClose(); router.push('/'); }}>
                        <View style={styles.row}>
                            <HelpCircle color="#EAB308" size={20} />
                            <Text style={styles.label}>{t.helpSupport || "Help & Support"}</Text>
                        </View>
                        <ChevronRight color="rgba(255,255,255,0.4)" size={20} />
                    </TouchableOpacity>

                 
                </View>

                <View>
                    <TouchableOpacity 
                        activeOpacity={0.7}
                        style={[styles.menuItem, styles.modeToggleContainer]}
                        onPress={() => setIsDarkMode(!isDarkMode)}
                    >
                        <View style={styles.row}>
                            <Text style={styles.label}>{isDarkMode ? "Light Mode" : "Dark Mode"}</Text>
                        </View>
                        <CustomThemeSwitch value={isDarkMode} />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} style={styles.logoutButton} onPress={handleLogout}>
                        <LogOut color="#FF4D6D" size={20} />
                        <Text style={styles.logoutText}>{t.logout || "LOGOUT"}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradientContainer: { flex: 1 },
    innerContainer: { flex: 1, padding: wp(5), justifyContent: 'space-between' },
    title: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: wp(10), marginLeft: wp(4), fontFamily: 'Pixel', marginTop: wp(8) },
    subtitle: { color: '#ffffff', fontSize: 14, marginBottom: wp(8), marginLeft: wp(4), fontFamily: 'PixelOperator', marginTop: -wp(7) },
    menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: wp(5), borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)', marginLeft: wp(4), marginRight: wp(4) },
    


    modeToggleContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        paddingHorizontal: wp(4),
        borderRadius: wp(3),
        borderBottomWidth: 0,
        marginBottom: wp(4),
    },
    
    row: { flexDirection: 'row', alignItems: 'center', gap: wp(4) },
    label: { color: '#fff', fontSize: 16, fontFamily: 'PixelOperator' },
    star: { color: '#EC588C' },
    logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, padding: wp(4), borderWidth: 1, borderColor: '#FF4D6D', borderRadius: wp(3), backgroundColor: 'rgba(255, 77, 109, 0.15)', marginLeft: wp(4), marginRight: wp(4), marginBottom: wp(2) },
    logoutText: { color: '#FF4D6D', fontFamily:'PixelBold', fontSize: 22 },
    switchTrack: { width: SWITCH_WIDTH, height: SWITCH_HEIGHT, borderRadius: SWITCH_HEIGHT / 2, padding: KNOB_MARGIN, justifyContent: 'center' },
    switchKnob: { width: KNOB_SIZE, height: KNOB_SIZE, borderRadius: KNOB_SIZE / 2, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 1 },
});

export default Sidebar;