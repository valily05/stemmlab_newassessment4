import { Timestamp } from 'firebase/firestore';
import { createSession, } from '@/services/firebase/sessionService';

describe(
  'Session Service Integration',
  () => {
    test(
      'creates a session and returns ID',
      async () => {

        const sessionID =
          await createSession({
            teamID: 'team-123',
            activityID: 1,
            experimentTime: 30,
            totalIterations: 2,
            pointsEarned: 100,
            completedAt: Timestamp.now(),
            insights: {
              title: 'Test Insight',
              description: 'Test Description',
            },
          });

        expect(
          sessionID
        ).toBe('session-123');
      }
    );
  }
);