import { useEffect } from "react";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";

import { initializeNotifications } from "@/services/notifications/notificationService";

import "@/i18n";

export default function RootLayout() {
  useEffect(() => {
    initializeNotifications();
  }, []);

  return (
    <LanguageProvider>
      <AuthProvider>
        <ThemeProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
          <StatusBar style="auto" />
        </ThemeProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}