import { Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

export async function initializeNotifications() {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowBanner: true,
            shouldShowList: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
        }),
    });

    const { status } = await Notifications.requestPermissionsAsync();

    if(status!=='granted') {
        Alert.alert(
            'Notifications Disabled',
            'Please enable notifications if you want to receive mission completion updates.'
        );
    }
}

export async function sendCompletionNotification(activityName: string, pointsEarned: number) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🚀 TEAM MISSION COMPLETE',
      body: `${activityName} completed (+${pointsEarned} Team Points)`,
      sound: true,
    },
    trigger: null,
  });
};