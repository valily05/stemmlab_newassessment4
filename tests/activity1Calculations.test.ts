import {
  calculateImpactData,
} from '../utils/activity1Calculations';

describe(
  'calculateImpactData',
  () => {

    test(
      'returns SAFE impact',
      () => {

        const result =
          calculateImpactData(
            1,
            1
          );

        expect(
          result.impactForce
        ).toBe('SAFE');
      }
    );

  }
);