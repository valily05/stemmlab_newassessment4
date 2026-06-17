console.log(
  'JEST SETUP LOADED'
);

// MUST BE FIRST
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  },

  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),

  useLocalSearchParams: () => ({}),
}));

// ==========================
// EXPO LINEAR GRADIENT
// ==========================
jest.mock('expo-linear-gradient', () => {
  const React = require('react');
  const { View, Text } = require('react-native');

  return {
    LinearGradient: (props: any) =>
      React.createElement(
        View,
        {},
        React.createElement(
          Text,
          {},
          'LINEAR_GRADIENT_MOCK'
        ),
        props.children
      ),
  };
});
// jest.mock('expo-linear-gradient', () => {
//   const React = require('react');
//   const { View } = require('react-native');

//   return {
//     LinearGradient: (props: any) =>
//       React.createElement(View, props, props.children),
//   };
// });

jest.mock('lucide-react-native', () => {
  const React = require('react');

  return new Proxy(
    {},
    {
      get: () => () => null,
    }
  );
});

// jest.mock(
//   'react-native/Libraries/Image/Image',
//   () => {
//     const React = require('react');
//     const { View } = require('react-native');

//     return function MockImage(
//       props: any
//     ) {
//       return React.createElement(
//         View,
//         props
//       );
//     };
//   }
// );

// ==========================
// EXPO SENSORS
// ==========================
jest.mock('expo-sensors', () => ({
  Accelerometer: {
    setUpdateInterval: jest.fn(),
    addListener: jest.fn(() => ({
      remove: jest.fn(),
    })),
  },
}));

jest.mock('react-native/Libraries/Vibration/Vibration', () => ({
  vibrate: jest.fn(),
}));

// ==========================
// FIREBASE MOCKS
// ==========================
jest.mock('@/services/firebase/config', () => ({
  auth: {
    currentUser: {
      uid: 'test-user',
    },
  },
}));

jest.mock('firebase/firestore', () => ({
  Timestamp: {
    now: jest.fn(() => ({
      seconds: 0,
      nanoseconds: 0,
    })),
  },
}));

jest.mock(
  '@/services/firebase/sessionService',
  () => ({
    createSession: jest.fn(() =>
      Promise.resolve('session-123')
    ),
  })
);

jest.mock(
  '@/services/firebase/iterationService',
  () => ({
    saveIteration: jest.fn(() =>
      Promise.resolve()
    ),
  })
);

jest.mock(
  '@/services/firebase/teamService',
  () => ({
    updateTeamStreak: jest.fn(() =>
      Promise.resolve()
    ),
  })
);

jest.mock(
  '@/services/firebase/userService',
  () => ({
    getUserProfile: jest.fn(() =>
      Promise.resolve({
        teamID: 'team-123',
      })
    ),
  })
);