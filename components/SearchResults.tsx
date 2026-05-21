import { useMemo } from 'react';

import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { router } from 'expo-router';

import { activities } from '../data/activities';
import { teams } from '../data/team';

export default function SearchResults({
  search,
}: any) {

  const activityResults = useMemo(() => {

    if (!search.trim()) return [];

    return activities.filter((activity) =>
      activity.title
        .toLowerCase()
        .includes(search.toLowerCase())

      ||

      activity.tags.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase())
      )
    );

  }, [search]);

  const teamResults = useMemo(() => {

    if (!search.trim()) return [];

    return teams.filter((team) =>
      team.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [search]);

  if (!search.length) return null;

  return (
    <View style={styles.container}>

      {/* ACTIVITIES */}
      {activityResults.length > 0 && (
        <>
          <Text style={styles.title}>
            ACTIVITIES
          </Text>

          {activityResults.map((item) => (

            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => router.push(item.route as any)}
            >

              <Image
                source={item.image}
                style={styles.image}
              />

              <View style={{ flex: 1 }}>

                <Text style={styles.cardTitle}>
                  {item.title}
                </Text>

                <View style={styles.tagsRow}>

                  {item.tags.map((tag, index) => (

                    <View
                      key={index}
                      style={styles.tag}
                    >
                      <Text style={styles.tagText}>
                        {tag}
                      </Text>
                    </View>

                  ))}

                </View>

              </View>

            </TouchableOpacity>

          ))}
        </>
      )}

      {/* TEAMS */}
      {teamResults.length > 0 && (
        <>
          <Text style={styles.title}>
            TEAMS
          </Text>

          {teamResults.map((team) => (

            <TouchableOpacity
              key={team.id}
              style={styles.teamCard}
              onPress={() => router.push(team.route as any)}
            >

              <Text style={styles.teamText}>
                👥 {team.name}
              </Text>

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

  title: {
    color: '#a855f7',
    marginBottom: 12,
    fontFamily: 'Pixel',
    fontSize: 12,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(17,24,39,0.85)',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
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
    fontSize: 11,
    fontFamily: 'Pixel',
    lineHeight: 18,
  },

  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },

  tag: {
    backgroundColor: 'rgba(168,85,247,0.2)',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginTop: 4,
  },

  tagText: {
    color: '#fff',
    fontSize: 10,
  },

  teamCard: {
    backgroundColor: 'rgba(17,24,39,0.85)',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },

  teamText: {
    color: '#fff',
    fontFamily: 'Pixel',
  },

});