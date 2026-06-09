import { auth, db } from "@/services/firebase/config";
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';
const { width, height } = Dimensions.get('window');

// RESPONSIVE HELPERS
const wp = (p: number) => PixelRatio.roundToNearestPixel((width * p) / 100);
const hp = (p: number) => PixelRatio.roundToNearestPixel((height * p) / 100);
const fp = (size: number) => PixelRatio.roundToNearestPixel((width / 430) * size);

type HeaderProps = {
  avatarSource: ImageSourcePropType;
  onMenuPress: () => void;
};

export default function Header({ avatarSource, onMenuPress }: HeaderProps) {
  const { t } = useLanguage();
const [hasNotification, setHasNotification] =
  useState(false);
  useEffect(() => {
  const uid = auth.currentUser?.uid;

  if (!uid) return;

  const q = query(
    collection(db, "notifications"),
    where("userID", "==", uid),
    where("read", "==", false)
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    setHasNotification(!snapshot.empty);
  });

  return unsubscribe;
}, []);
  return (
    <View style={styles.header}>
      {/* HAMBURGER */}
      <TouchableOpacity onPress={onMenuPress} style={styles.menuBtn}>
        <Ionicons name="menu" size={fp(24)} color="#C084FC" />
      </TouchableOpacity>

      {/* CENTER */}
      <View style={styles.center}>
        <Text style={styles.logo}>STEMM LAB</Text>
        <Text style={styles.subtitle}>
          {t.learn}
          <Text style={styles.star}> ✦ </Text>
          {t.experiment}
          <Text style={styles.star}> ✦ </Text>
          {t.innovate}
        </Text>
      </View>

      {/* RIGHT SIDE */}
      <View style={styles.rightSection}>
<TouchableOpacity
  style={styles.notifBtn}
  onPress={() => router.push('/notification')}
>
  <Ionicons
    name="notifications"
    size={fp(24)}
    color="#C084FC"
  />

  {hasNotification && <View style={styles.dot} />}
</TouchableOpacity>
        
        <Image source={avatarSource} style={styles.avatar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { marginTop: hp(7), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: wp(1) },
  center: { alignItems: 'center', flex: 1,marginRight:hp(2.6) },
  logo: { color: '#fff', fontSize: fp(18), fontFamily: 'Pixel', letterSpacing: 1 },
  subtitle: { color: '#ddd6fe', fontSize: fp(14), marginTop: hp(0.4), fontFamily: 'PixelOperator', textAlign: 'center' },
  star: { color: '#EC588C' },
  rightSection: { flexDirection: 'row', alignItems: 'center', gap: wp(2.5) },
  notifBtn: { width: wp(11), height: wp(11), borderRadius: wp(5.5), backgroundColor: '#130C36', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#301E6A' },
  menuBtn: { width: wp(11), height: wp(11), borderRadius: wp(6), backgroundColor: '#130C36', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#301E6A' },
dot: {
  position: "absolute",

  top: wp(1.8),
  right: wp(1.8),

  width: wp(2.8),
  height: wp(2.8),

  borderRadius: 999,

  backgroundColor: "#EC588C",

  borderWidth: 2,
  borderColor: "#130C36",
},  avatar: { width: wp(11), height: wp(11), borderRadius: wp(5.5), resizeMode: 'cover' },
});