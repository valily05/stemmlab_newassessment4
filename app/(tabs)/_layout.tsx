import { Stack } from 'expo-router';

export default function TabsLayout() {
  return (

    <Stack

      screenOptions={{

        headerShown: false,

        /* CHANGE THIS */
animation: 'fade',
        animationDuration: 2,

      }}

    />

  );
}