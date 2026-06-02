import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

import { PasswordValidationResult } from '@/utils/passwordValidation';

interface Props {
  validation: PasswordValidationResult;
  t: any; // translation object
}

export default function PasswordChecklist({ validation, t }: Props) {
  const rules = [
    { label: t.strength, valid: validation.hasMinLength },
    { label: t.lowercase || 'Lowercase letter', valid: validation.hasLowercase },
    { label: t.uppercase || 'Uppercase letter', valid: validation.hasUppercase },
    { label: t.number || 'Number', valid: validation.hasNumber },
    { label: t.special || 'Special character', valid: validation.hasSpecial },
  ];

  return (
    <View style={{ marginTop: -3 }}>
      {rules.map((item, index) => (
        <View
          key={index}
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}
        >
          <Ionicons
            name={item.valid ? 'checkmark' : 'close'}
            size={16}
            color={item.valid ? '#22c55e' : '#9ca3af'}
            style={{ marginRight: 7 }}
          />

          <Text
            style={{
              fontSize: 12,
              color: item.valid ? '#22c55e' : '#9ca3af'
            }}
          >
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
}