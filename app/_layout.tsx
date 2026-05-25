import '../i18n';

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';

import { Stack } from 'expo-router';

import { StatusBar } from 'expo-status-bar';

import 'react-native-reanimated';

import { LanguageProvider } from '@/context/LanguageContext';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {

  const colorScheme = useColorScheme();

  return (

    <LanguageProvider>

      <ThemeProvider
        value={
          colorScheme === 'dark'
            ? DarkTheme
            : DefaultTheme
        }
      >

        <Stack

          screenOptions={{
            headerShown: false,
          }}

        >

          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="activities"
            options={{
              headerShown: false,
            }}
          />

        </Stack>

        <StatusBar style="auto" />

      </ThemeProvider>

    </LanguageProvider>

  );

}