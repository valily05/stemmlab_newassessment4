import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

import { AuthButton, AuthInput } from '@/components/AuthElements';
import { LAYOUT } from '@/constants/layout';
import { useLanguage } from '@/context/LanguageContext';

import { login } from "@/services/firebase/authService";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { language, t } = useLanguage();

  // ⭐ STAR BACKGROUND (same as signup)
  const stars = useRef(
    Array.from({ length: 60 }).map(() => ({
      x: Math.random() * LAYOUT.width,
      y: Math.random() * LAYOUT.height,
      size: Math.random() * 2 + 1,
      opacity: new Animated.Value(Math.random()),
    }))
  ).current;

  React.useEffect(() => {
    stars.forEach((star) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(star.opacity, {
            toValue: 0.8,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(star.opacity, {
            toValue: 0.3,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

  async function handleLogin() {
    try {
      await login(email, password);

      router.replace('/(tabs)/homescreen');

      // Alert.alert(
      //   "Success",
      //   "Logged in!"
      // );
    } catch(error: any) {
      Alert.alert(
        "Error",
        error.message
      );
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: '#020617' }}>

        {/*  BACKGROUND */}
        <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
          {stars.map((star, i) => (
            <Animated.View
              key={i}
              style={{
                position: 'absolute',
                left: star.x,
                top: star.y,
                width: star.size,
                height: star.size,
                borderRadius: 50,
                backgroundColor: '#fff',
                opacity: star.opacity,
              }}
            />
          ))}
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ paddingTop: 60, paddingBottom: 40 }}>

            {/* LANGUAGE */}
            <TouchableOpacity style={styles.langContainer}>
              <Image source={require('../../assets/images/globe.png')} style={styles.langIcon}/>
              <Text style={styles.langText}>{language}</Text>
              <Text style={styles.langArrow}>▼</Text>
            </TouchableOpacity>

            <Image source={require('../../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />

            {/*  TITLE */}
            <Text style={styles.title}>{t.loginTitle || "WELCOME BACK !"}</Text>
            <Text style={styles.subtitle}>{t.loginSubtitle || "LOGIN TO CONTINUE YOUR MISSION"}</Text>

            <View style={styles.content}>

              {/*  EMAIL */}
              <AuthInput
                label={t.email}
                image={require('../../assets/images/Letter.png')}
                placeholder={t.enterEmail || "Enter your email"}
                value={email}
                onChangeText={setEmail}
              />

              {/*  PASSWORD */}
              <AuthInput
                label={t.password}
                image={require('../../assets/images/Lock.png')}
                placeholder={t.enterPassword || "Enter your password"}
                isPassword
                value={password}
                onChangeText={setPassword}
              />

              {/*  FORGOT */}
              <View style={styles.forgotContainer}>
                <TouchableOpacity>
                  <Text style={styles.forgot}>
                    {t.forgot || "FORGOT PASSWORD?"}
                  </Text>
                </TouchableOpacity>
                <View style={styles.topLine} />
              </View>

              {/*  LOGIN BUTTON */}
              <AuthButton 
                title={t.login || "LOGIN"} 
                onPress={handleLogin}
              />

              <Text style={styles.or}>OR</Text>

              {/*  GOOGLE */}
              <TouchableOpacity style={styles.googleBtn} activeOpacity={0.8}>
                <View style={styles.googleContent}>
                  <Image
                    source={require('../../assets/images/google.png')}
                    style={styles.googleIcon}
                  />
                  <Text style={styles.googleText}>
                    {t.googleLogin || "Login with Google"}
                  </Text>
                </View>
              </TouchableOpacity>

              {/*  REGISTER */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  {t.noAccount || "Don't have an account?"}
                </Text>

                <TouchableOpacity onPress={() => router.push('/signup')}>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={styles.register}>
                      {t.registerNow || "REGISTER NOW →"}
                    </Text>
                    <View style={styles.registerUnderline}/>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  logo: { 
    width: LAYOUT.width * 0.9, 
    height: 120, 
    alignSelf: 'center', 
    marginTop: LAYOUT.height * 0.03 
  },

  content:{ 
    paddingHorizontal:20 
  },

  title:{
    color:'white',
    textAlign:'center',
    fontFamily:'Pixel',
    fontSize:18
  },

  langArrow: { 
    fontSize: 10, 
    color: '#899AF7' 
  },

  subtitle:{
    color:'#FACC15',
    textAlign:'center',
    marginBottom:20,
    fontFamily:'Pixel',
    fontSize:11,
    marginTop:13,
  },

  forgotContainer:{
    alignSelf:'flex-start',
    marginBottom:15,
  },

  forgot:{
    color:'#60A5FA',
    fontFamily:'Pixel',
    fontSize:10,
  },

  topLine:{
    width:160,
    height:2,
    backgroundColor:'#60A5FA',
    marginTop:6,
    borderRadius:2,
  },

  or:{
    color:'white',
    textAlign:'center',
    marginTop:18,
    marginBottom:8,
  },

  footer:{
    alignItems:'center',
    marginTop:20
  },

  footerText:{
    color:'white',
    fontFamily:'Pixel'
  },

  register:{
    color:'yellow',
    marginTop:10,
    fontFamily:'Pixel',
  },

  registerUnderline:{
    height:2,
    backgroundColor:'#FACC15',
    width:'100%',
    marginTop:3,
  },

  langContainer: {
    position: 'absolute', 
    top: LAYOUT.height * 0.08, 
    right: LAYOUT.width * 0.05,
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 12, 
    paddingVertical: 8,
    backgroundColor: 'rgba(0,0,0,0.9)', 
    borderRadius: 20, 
    borderWidth: 1.5,
    borderColor: '#899AF7', 
    shadowColor: '#899AF7', 
    shadowOpacity: 0.6, 
    shadowRadius: 6, 
    elevation: 5
  },

  langIcon:{ 
    width:18, 
    height:18, 
    marginRight:6 
  },

  langText: { 
    color: '#E6E6FA', 
    marginRight: 8 
  },

  googleBtn:{
    marginTop:15,
    borderRadius:30,
    paddingVertical:16,
    alignItems:'center',
    backgroundColor:'rgba(255,255,255,0.12)',
    borderWidth:1.2,
    borderColor:'rgba(255,255,255,0.25)',
  },

  googleContent:{
    flexDirection:'row',
    alignItems:'center',
  },

  googleIcon:{
    width:20,
    height:20,
    marginRight:12,
  },

  googleText:{
    color:'#ffffff',
    fontSize:15,
  },
});