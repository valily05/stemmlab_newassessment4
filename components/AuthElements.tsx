import React, { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { COLORS, LAYOUT } from '../constants/layout';

interface AuthInputProps {
  label: string;
  image: ImageSourcePropType;
  secure?: boolean;
  isPassword?: boolean;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
  onFocus?: () => void;
  borderColor?: string;
}

export const AuthInput: React.FC<AuthInputProps> = ({
  label,
  image,
  secure,
  isPassword,
  placeholder,
  onChangeText,
  value,
  onFocus,
  borderColor
}) => {
  const FONT = LAYOUT.width * 0.035;
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View style={styles.inputContainer}>
      <View style={styles.labelRow}>
        <Image source={image} style={styles.icon} />
        <Text style={[styles.labelText, { fontSize: FONT * 0.9 }]}>
          {label}
        </Text>
      </View>

      <View style={styles.inputWrapper}>
      <TextInput
  placeholder={placeholder}
  placeholderTextColor={COLORS.lightPurple}
  secureTextEntry={isPassword ? hidePassword : secure}
  style={[
    styles.inputField,
    {
      height: LAYOUT.inputHeight,
      fontSize: FONT * 1.3,
      borderColor: borderColor || '#8B7CFF'
    }
  ]}
  value={value}
  onChangeText={onChangeText}
  onFocus={onFocus}
  autoCorrect={false}
  autoCapitalize="none"
  textContentType="oneTimeCode"
  autoComplete="off"
/>

        {isPassword && (
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setHidePassword(!hidePassword)}
            activeOpacity={0.7}
          >
            <Image
              source={
                hidePassword
                  ? require('../assets/images/eye-off.png')
                  : require('../assets/images/eye.png')
              }
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export const AuthButton: React.FC<{
  title: string;
  onPress: () => void;
  disabled?: boolean;
}> = ({ title, onPress, disabled }) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.7}
    style={[
      styles.button,
      { height: LAYOUT.inputHeight },
      disabled && styles.buttonDisabled
    ]}
  >
    <Text style={[styles.buttonText, { fontSize: LAYOUT.width * 0.035 }]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: LAYOUT.height * 0.02
  },

  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },

  icon: {
    width: 28,
    height: 28,
    marginRight: 8
  },

  labelText: {
    fontFamily: 'Pixel',
    color: 'white'
  },

  inputWrapper: {
    position: 'relative',
    justifyContent: 'center'
  },

  inputField: {
  borderWidth: 2,
  borderRadius: 12,
  paddingHorizontal: 18,
  paddingRight: 48,
  color: 'white',
  backgroundColor: 'rgba(15, 10, 35, 0.95)',
  fontFamily: 'PixelOperator',
  letterSpacing: 0.5,

  shadowColor: '#6C63FF',
  shadowOpacity: 0.8,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 0 },
  elevation: 6,
},

  eyeButton: {
    position: 'absolute',
    right: 14,
    padding: 8
  },

  eyeIcon: {
    width: 22,
    height: 22,
    tintColor: '#8B7CFF'
  },

  button: {
    marginTop: LAYOUT.height * 0.001,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6C63FF',
    shadowColor: '#6C63FF',
    shadowOpacity: 0.7,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },

  buttonDisabled: {
    opacity: 0.4,
    backgroundColor: '#3a355f'
  },

  buttonText: {
    fontFamily: 'Pixel',
    color: 'white'
  }
});