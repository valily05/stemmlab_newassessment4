import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useMemo } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Ensure your imports point to the correct files
import { activities } from '../data/activities';
import { teams } from '../data/team';

type Props = {
  search: string;
  showActivities?: boolean;
  showTeams?: boolean;
};

export default function SearchResults({
  search,
  showActivities = true,
  showTeams = true,
}: Props) {

  /* ACTIVITY RESULTS */
  const activityResults = useMemo(() => {
    if (!search || !search.trim()) return [];
    
    // Convert the activities object into an array of its values
    const dataList = Object.values(activities);
    const query = search.toLowerCase();

    return dataList.filter((activity: any) => {
      const title = (activity.title || '').toLowerCase();
      const matchesTitle = title.includes(query);

      let matchesCategory = false;
      if (Array.isArray(activity.category)) {
        matchesCategory = activity.category.some((c: string) => c.toLowerCase().includes(query));
      } else if (typeof activity.category === 'string') {
        matchesCategory = activity.category.toLowerCase().includes(query);
      }

      return matchesTitle || matchesCategory;
    });
  }, [search]);

  /* TEAM RESULTS */
  const teamResults = useMemo(() => {
    if (!search || !search.trim()) return [];

    // Safely check if teams is an array before filtering
    const dataList = Array.isArray(teams) ? teams : [];

    return dataList.filter((team: any) =>
      (team.name || '')
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  // Safely trigger navigation
  const handlePress = (route: string | undefined) => {
    if (route) {
      router.push(route as any);
    }
  };

  if (!search || !search.length) return null;

  return (
    <View style={styles.container}>
      {/* ACTIVITIES */}
      {showActivities && activityResults.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>ACTIVITIES</Text>
          {activityResults.map((item: any) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => handlePress(item.route)}
              style={styles.cardWrapper}
            >
              <LinearGradient
                colors={['#1e1b4b', '#4c1d95']}
                style={styles.card}
              >
                <Image
                  source={item.image?.dark || item.image}
                  style={styles.image}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>
                    {item.title}
                  </Text>

                  <View style={styles.tagsRow}>
                    {(Array.isArray(item.category) ? item.category : (item.category ? [item.category] : [])).map((category: string, index: number) => (
                      <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>
                          {category.toUpperCase()}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </>
      )}

      {/* TEAMS */}
      {showTeams && teamResults.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>TEAMS</Text>
          {teamResults.map((team: any) => (
            <TouchableOpacity
              key={team.id}
              activeOpacity={0.8}
              onPress={() => handlePress(team.route)}
              style={styles.cardWrapper}
            >
              <LinearGradient
                colors={['#1e1b4b', '#4c1d95']}
                style={styles.teamCard}
              >
                <Text style={styles.teamText}>
                  👥 {team.name}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  sectionTitle: {
    color: '#a855f7',
    marginBottom: 12,
    fontFamily: 'PixelBold',
    fontSize: 16,
    letterSpacing: 1,
  },
  cardWrapper: {
    borderRadius: 18,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#3730a3',
  },
  card: {
    flexDirection: 'row',
    borderRadius: 18,
    padding: 14,
    alignItems: 'center',
  },
  image: {
    width: 55,
    height: 55,
    marginRight: 14,
    resizeMode: 'contain',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'PixelBold',
    lineHeight: 20,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#a855f7',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginTop: 4,
  },
  tagText: {
    color: '#ffffff',
    fontSize: 10,
    fontFamily: 'PixelOperator',
  },
  teamCard: {
    padding: 18,
    borderRadius: 16,
  },
  teamText: {
    color: '#fff',
    fontFamily: 'PixelBold',
    fontSize: 14,
  },
});