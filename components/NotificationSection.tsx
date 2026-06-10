import { useTheme } from '@/context/ThemeContext';
import { StyleSheet, Text, View } from 'react-native';
import NotificationCard from './NotificationCard';

interface Notification {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  time: string;
  unread: boolean;
  route: string;
}

interface Props {
  title: string;
  notifications: Notification[];
}

export default function NotificationSection({
  title,
  notifications,
}: Props) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text 
        style={[
          styles.heading, 
          { color: theme.activityTitle || '#A970FF' }
        ]}
      >
        {title}
      </Text>

      {notifications.map((item) => (
        <NotificationCard
          key={item.id}
          notification={item}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },

  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
});