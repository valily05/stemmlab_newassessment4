import { Stack } from 'expo-router';

export default function ActivitiesLayout() {

  return (

    <Stack>

      <Stack.Screen
        name="activity1"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="activity2"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="activity3"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="activity4"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="activity5"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="activity6"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="activity7"
        options={{
          headerShown: false,
        }}

        />
      <Stack.Screen
        name="ActivityIntroScreen"
        options={{
          headerShown: false,
        }}
      />

    </Stack>

  );

}