import {
    StyleSheet,
    View,
} from 'react-native';

import ActivityChallengeCard from './ActivityChallengeCard';

type Props = {
  search: string;
};

export default function ActivitiesResults({
  search,
}: Props) {

  /* ACTIVITIES DATA */
  const activities = [

    {
      title: 'PARACHUTE DROP CHALLENGE',

      description:
        'Design and test your own parachute to explore gravity, air resistance, and safe landings!',

      category: 'ENGINEERING',

      rating: '4.7',

      duration: '30 min',

      difficulty: 'Easy',

      buttonText: 'Start',

      image: require('../assets/images/bg2.png'),
    },

    {
      title: 'SOUND POLLUTION HUNTER',

      description:
        'Track and measure noise levels around you to discover how sound affects daily life and health.',

      category: 'ENVIRONMENT',

      rating: '3.5',

      duration: '90 min',

      difficulty: 'Hard',

      buttonText: 'Start',

      isNew: true,

      image: require('../assets/images/bg2.png'),
    },

    {
      title: 'HUMAN PERFORMANCE LAB',

      description:
        'Test your reflexes, balance, and reaction speed through fun experiments about the human body.',

      category: 'MEDICAL SCIENCE',

      rating: '5',

      duration: '60 min',

      difficulty: 'Medium',

      buttonText: 'Locked',

      locked: true,

      image: require('../assets/images/bg2.png'),
    },

  ];

  /* FILTERED RESULTS */
  const filteredActivities = activities.filter(
    (activity) => {

      const query = search.trim().toLowerCase();

      if (!query) return true;

      return (

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
          .includes(query)

      );
    }
  );

  return (

    <View style={styles.container}>

      {filteredActivities.map((activity, index) => (

        <ActivityChallengeCard
          key={index}

          title={activity.title}

          description={activity.description}

          category={activity.category}

          rating={activity.rating}

          duration={activity.duration}

          difficulty={activity.difficulty}

          buttonText={activity.buttonText}

          image={activity.image}

          isNew={activity.isNew}

          locked={activity.locked}
        />

      ))}

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    marginTop: 10,
  },

});