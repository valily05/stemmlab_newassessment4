export function calculateImpactData(
    dropHeight: number,
    contactTime: number
) {
    const velocity = Math.sqrt(
      2 * 9.81 * dropHeight
    );

    const acceleration =
      velocity / contactTime;

    const gForce =
      velocity /
      (contactTime * 9.81);

    let impactForce = 'SAFE';

    if (
      gForce >= 5 &&
      gForce < 10
    ) {
      impactForce = 'CAUTION';
    }

    if (
      gForce >= 10 &&
      gForce < 30
    ) {
      impactForce = 'HIGH';
    }

    if (
      gForce >= 30 &&
      gForce < 50
    ) {
      impactForce = 'SEVERE';
    }

    if (gForce >= 50) {
      impactForce = 'EXTREME';
    }

    return {
        velocity,
        acceleration,
        gForce,
        impactForce,
    };
}