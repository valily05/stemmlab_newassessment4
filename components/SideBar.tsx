import { auth } from '@/services/firebase/config';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router'; // Ensure this is installed
import { signOut } from 'firebase/auth';
import { ChevronRight, History, Languages, LogOut, Moon, Settings, Sun } from 'lucide-react-native';
import React from 'react';
import {
    Alert,
    Dimensions,
    PixelRatio,
    SafeAreaView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';

const { width } = Dimensions.get('window');
const wp = (p: number) => PixelRatio.roundToNearestPixel((width * p) / 100);

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

{/* Activity History */}
<TouchableOpacity
    style={styles.menuItem}
    onPress={() => {
        onClose();
        router.push('/sidebar/activityhistory');
    }}
>
    <View style={styles.row}>
        <History color="#C084FC" size={20} />
        <Text style={styles.label}>
            {t.activityHistory || "Activity History"}
        </Text>
    </View>

    <ChevronRight
        color="rgba(255,255,255,0.4)"
        size={20}
    />
</TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={onClose}>
                        <View style={styles.row}>
                            <Settings color="#3B82F6" size={20} />
                            <Text style={styles.label}>{t.settings || "Settings"}</Text>
                        </View>
                        <ChevronRight color="rgba(255,255,255,0.4)" size={20} />
                    </TouchableOpacity>

                    {/* Language Navigation Button */}
                    <TouchableOpacity 
                        style={styles.menuItem} 
                        onPress={() => {
                            onClose();
                            router.push('/language'); 
                        }}
                    >
                        <View style={styles.row}>
                            <Languages color="#10B981" size={20} />
                            <Text style={styles.label}>{language}</Text>
                        </View>
                        <ChevronRight color="rgba(255,255,255,0.4)" size={20} />
                    </TouchableOpacity>

                    {/* Dark Mode Toggle */}
                    <View style={styles.menuItem}>
                        <View style={styles.row}>
                            {isDarkMode ? <Moon color="#F59E0B" size={20} /> : <Sun color="#F59E0B" size={20} />}
                            <Text style={styles.label}>{isDarkMode ? "Dark Mode" : "Light Mode"}</Text>
                        </View>
                        <Switch value={isDarkMode} onValueChange={setIsDarkMode} trackColor={{ true: '#3B82F6' }} />
                    </View>
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <LogOut color="#FF4D6D" size={20} />
                    <Text style={styles.logoutText}>{t.logout || "Logout"}</Text>
                </TouchableOpacity>
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
    row: { flexDirection: 'row', alignItems: 'center', gap: wp(4) },
    label: { color: '#fff', fontSize: 16, fontFamily: 'PixelOperator' },
    star: { color: '#EC588C' },
    logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, padding: wp(4), borderWidth: 1, borderColor: '#FF4D6D', borderRadius: wp(5), backgroundColor: 'rgba(255, 77, 109, 0.15)', marginLeft: wp(4), marginRight: wp(4), marginBottom: wp(2) },
    logoutText: { color: '#FF4D6D', fontWeight: 'bold' }
});

export default Sidebar;