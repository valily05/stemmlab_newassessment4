import { useRouter } from 'expo-router';

import {
  StyleSheet,
  View,
} from 'react-native';

import ActivityChallengeCard from './ActivityChallengeCard';

type Props = {
  search: string;
  selectedCategory: string;
};

export default function ActivitiesResults({
  search,
  selectedCategory,
}: Props) {

  const router = useRouter();

  /* ACTIVITIES DATA */
  const activities = [

    {
      title: 'PARACHUTE DROP CHALLENGE',
 group: 'ENGINEERING', 
      description:
        'Design and test your own parachute to explore gravity, air resistance, and safe landings!',

      category: 'ENGINEERING',

      rating: '4.7',

      duration: '30 min',

      difficulty: 'Easy',

      buttonText: 'Start',

      route: '/activities/activity1/overview' as const,
    },

    {
      title: 'SOUND POLLUTION HUNTER',
 group: 'ENGINEERING', 
      description:
        'Track and measure noise levels around you to discover how sound affects daily life and health.',

      category: 'ENVIRONMENT',

      rating: '3.5',

      duration: '90 min',

      difficulty: 'Hard',

      buttonText: 'Start',

      isNew: true,


      route:'/activities/activity2/overview' as const,
    },

    {
      title: 'HUMAN PERFORMANCE LAB',
 group: 'HEALTH', 
      description:
        'Test your reflexes, balance, and reaction speed through fun experiments about the human body.',

      category: 'MEDICAL SCIENCE',

      rating: '5',

      duration: '60 min',

      difficulty: 'Medium',

      buttonText: 'Locked',

      locked: true,

    },

  ];

  /* FILTER */
  const filteredActivities = activities.filter(
    (activity) => {

      const query = search
        .trim()
        .toLowerCase();

      const matchesSearch =

        !query

        ||

        activity.title
          .toLowerCase()
          .includes(query)

        ||

        activity.category
          .toLowerCase()
          .includes(query)

        ||

        activity.description
          .toLowerCase()
          .includes(query);

      const matchesCategory =
  selectedCategory === 'ALL' ||
  activity.group === selectedCategory;
      return matchesSearch && matchesCategory;
    }
  );

  return (

    <View style={styles.container}>

      {filteredActivities.map(
        (activity, index) => (

          <ActivityChallengeCard
            key={index}

            title={activity.title}

            description={activity.description}

            category={activity.category}

            rating={activity.rating}

            duration={activity.duration}

            difficulty={activity.difficulty}

            buttonText={activity.buttonText}


            isNew={activity.isNew}

            locked={activity.locked}

            onPress={() => {

              if (
                activity.route &&
                !activity.locked
              ) {

                router.push(activity.route);

              }

            }}
          />

        )
      )}

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    marginTop: 10,
  },

});