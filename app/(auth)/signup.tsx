import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { AuthButton, AuthInput } from '@/components/AuthElements';
import PasswordChecklist from '@/components/PasswordChecklist';
import PasswordStrength from '@/components/PasswordStrength';
import StarField from '@/components/backgrounds/StarField';
import { LAYOUT } from '@/constants/layout';
import { useLanguage } from '@/context/LanguageContext';

import { signUp } from "@/services/firebase/authService";
import { createUserProfile } from '@/services/firebase/userService';

import { validatePassword } from '@/utils/passwordValidation';
import { containsOffensiveContent } from '@/utils/profanityFilter';

export default function RegisterScreen() {
  const router = useRouter();
  const FONT = LAYOUT.width * 0.035;
  const scrollRef = useRef<ScrollView>(null);
  const confirmRef = useRef(null);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const shakeAnim = useState(new Animated.Value(0))[0];

  const hasTypedConfirm = confirmPassword.length > 0;
  const isMatch = password === confirmPassword && hasTypedConfirm;
  const isMismatch = password !== confirmPassword && hasTypedConfirm;

  const borderColor = isMatch
    ? '#22c55e'
    : isMismatch
    ? '#ef4444'
    : '#8B7CFF';

  // UPDATED VALIDATION
  const passwordValidation = validatePassword(password);

  const isPasswordValid = passwordValidation.isValid;
  const isCommonPassword = passwordValidation.isCommonPassword;

  const isNameOffensive = containsOffensiveContent(fullName);
  const isEmailOffensive = containsOffensiveContent(email);

  const isOffensive = passwordValidation.isOffensive;

  const isFormValid =
    fullName.trim().length > 0 &&
    email.trim().length > 0 &&
    isPasswordValid &&
    confirmPassword.length > 0 &&
    isMatch &&
    !isNameOffensive &&
    !isEmailOffensive;
  
  const { language, setLanguage, t } = useLanguage();

  const scrollTo = (y: number) => {
    scrollRef.current?.scrollTo({ y, animated: true });
  };

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 6, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -6, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const handleRegister = async () => {
    if(!isFormValid) return;

    try {
      //Create Firebase Authentication account
      const userCredential = await signUp(email.trim(), password);
      const uid = userCredential.user.uid;

      //Create Firestore profile
      await createUserProfile({
        uid,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),

        role: "Student",
      });

      router.replace('/(tabs)/homescreen');
    } catch(error:any) {
      console.error(error);

      switch(error.code) {
        case "auth/email-already-in-use":
        alert("This email is already registered.");
        break;

        case "auth/invalid-email":
          alert("Please enter a valid email.");
          break;

        case "auth/weak-password":
          alert("Password is too weak.");
          break;

        default:
          alert("Registration failed. Please try again.");
      }
    }
  };

  return (
    //<TouchableWithoutFeedback onPress={Keyboard.dismiss}> This causes weird scroll behavior
      <View style={{ flex: 1, backgroundColor: '#020617' }}>
        <StarField />

        {/* UI stays unchanged below */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={{ flexGrow: 1, paddingTop: 60, paddingBottom: 40 }}
            keyboardShouldPersistTaps="handled"
          >
            <TouchableOpacity
              style={styles.langContainer}
              onPress={() => router.push('/language')}
            >
              <Image source={require('../../assets/images/globe.png')} style={styles.langIcon} />
              <Text style={[styles.langText, { fontSize: FONT }]}>{language}</Text>
              <Text style={styles.langArrow}>▼</Text>
            </TouchableOpacity>

            <Image source={require('../../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />

            <View style={styles.content}>

              {/* FULL NAME */}
              <AuthInput
                label={t.fullName}
                image={require('../../assets/images/User.png')}
                placeholder={t.placeholderName}
                value={fullName}
                onChangeText={setFullName}
              />

              {isNameOffensive && (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 4, marginBottom: 9, marginTop: -2 }}>
                  <Image
                    source={require('../../assets/images/warning.png')}
                    style={{ width: 16, height: 16, marginRight: 7 }}
                  />
                  <Text style={{
                    color: '#ef4444',
                    fontSize: 11,
                    fontFamily: 'LEMONMILK',
                    backgroundColor: 'rgba(0,0,0,0.9)'
                  }}>
                    {t.warningName}
                  </Text>
                </View>
              )}
              <AuthInput
                label={t.email} 
                image={require('../../assets/images/Letter.png')}
                placeholder={t.placeholderEmail}
                value={email} 
                onChangeText={setEmail}
              />

              {isEmailOffensive && (
                <View style={{ flexDirection: 'row', alignItems: 'center',marginLeft: 4,marginBottom:9,marginTop:-2 }}>
                  <Image
                    source={require('../../assets/images/warning.png')}
                    style={{ width: 16, height: 16, marginRight: 7 }}
                  />
                  <Text style={{
                    color: '#ef4444',
                    fontSize: 11,
                    fontFamily: 'LEMONMILK',
                    backgroundColor: 'rgba(0,0,0,0.9)'
                  }}>
                    {t.warningEmail}
                  </Text>
                </View>
              )}
              <AuthInput 
                label={t.password} 
                image={require('../../assets/images/Lock.png')} 
                placeholder={t.placeholderPassword} 
                isPassword value={password} 
                onChangeText={setPassword} 
                onFocus={() => scrollTo(100)} 
                borderColor={borderColor} 
              />

              <PasswordChecklist validation={passwordValidation} t={t} />
              <PasswordStrength password={password} score={passwordValidation.score} labelEmpty={t.PS} t={t} />
              
              {/* PASSWORD WARNINGS */}
              {isCommonPassword && (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 4, marginTop: 4 }}>
                  <Image
                    source={require('../../assets/images/warning.png')}
                    style={{ width: 16, height: 16, marginRight: 7 }}
                  />
                  <Text style={{
                    color: '#ef4444',
                    fontSize: 11,
                    fontFamily: 'LEMONMILK',
                    backgroundColor: 'rgba(0,0,0,0.9)'
                  }}>
                    Avoid common passwords
                  </Text>
                </View>
              )}

              {isOffensive && (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 4, marginTop: 4,marginBottom:9, }}>
                  <Image
                    source={require('../../assets/images/warning.png')}
                    style={{ width: 16, height: 16, marginRight: 7 }}
                  />
                  <Text style={{
                    color: '#ef4444',
                    fontSize: 11,
                    fontFamily: 'LEMONMILK',
                    backgroundColor: 'rgba(0,0,0,0.9)'
                  }}>
                    {t.warningOffensive}    
                  </Text>
                </View>
              )}
              <View ref={confirmRef}>
                <AuthInput 
                  label={t.confirmPassword} 
                  image={require('../../assets/images/Lock.png')} 
                  placeholder={t.placeholderConfirm}
                  isPassword value={confirmPassword} 
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    if (text.length > 0 && text !== password) triggerShake();
                  }} 
                  onFocus={() => scrollTo(260)} 
                  borderColor={borderColor} 
                />
              </View>

              <Animated.View style={{ transform: [{ translateX: shakeAnim }], marginTop: 6, marginLeft: 4, opacity: confirmPassword.length > 0 ? 0.9 : 0 }}>
                <Text style={{ fontFamily: 'BebasNeue', fontSize: 14, color: isMatch ? '#22c55e' : '#ef4444', top: -13, backgroundColor: 'rgba(0,0,0,0.9)' }}>
                  {isMatch ? '✓ Passwords match' : '✕ Passwords do not match'}
                </Text>
              </Animated.View>

              <AuthButton 
                title={t.register}
                onPress={handleRegister}
                disabled={!isFormValid}
              />
            </View>

            <View style={styles.footer}>
              <Text style={[styles.footerText, { fontSize: FONT * 0.8 }]}>
                {t.already}
              </Text>

              <TouchableOpacity onPress={() => router.push('/login')}>
                <Text style={[styles.loginLink, { fontSize: FONT }]}>
                  {t.login}
                </Text>
                <View style={styles.underline} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    //</TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: LAYOUT.width * 0.9, 
    height: 120, 
    alignSelf: 'center', 
    marginTop: LAYOUT.height * 0.03 
  },

  content: { 
    paddingHorizontal: LAYOUT.paddingHorizontal 
  },

  footer: { 
    marginTop: LAYOUT.height * 0.03, 
    alignItems: 'center' 
  },

  footerText: { 
    color: 'white', 
    marginBottom: 18, 
    fontFamily: 'Pixel' 
  },

  loginLink: { 
    color: 'yellow', 
    fontFamily: 'Pixel' 
  },

  underline: { 
    height: 3, 
    backgroundColor: 'yellow', 
    marginTop: 4 
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

  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1
  },

  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.9)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },

  modalContent: { 
    padding: 25 
  },

  langIcon: { 
    width: 19, 
    height: 19, 
    marginRight: 8 
  },

  langText: { 
    color: '#E6E6FA', 
    marginRight: 8 
  },

  langArrow: { 
    fontSize: 10, 
    color: '#899AF7' 
  },
  
  flag: {
    fontSize: 18
  },

  optionText: { 
    color: 'white', 
    textAlign: 'center', 
    padding: 15, 
    fontFamily: 'Wix' 
  },
});