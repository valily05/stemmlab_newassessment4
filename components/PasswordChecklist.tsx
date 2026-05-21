import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface Props {
  password: string;
  t: any; // translation object
}

export default function PasswordChecklist({ password, t }: Props) {
  const rules = [
    { label: t.strength, valid: password.length >= 8 },
    { label: t.lowercase || 'Lowercase letter', valid: /[a-z]/.test(password) },
    { label: t.uppercase || 'Uppercase letter', valid: /[A-Z]/.test(password) },
    { label: t.number || 'Number', valid: /[0-9]/.test(password) },
    { label: t.special || 'Special character', valid: /[^A-Za-z0-9]/.test(password) },
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