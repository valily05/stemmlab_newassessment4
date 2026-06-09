// utils/soundUtils.ts

/**
 * Converts Expo metering (-160 to 0)
 * into a nicer display (0 - 120 dB)
 */
export function normalizeMetering(
  metering: number
): number {

  if (metering == null) {
    return 0;
  }

  const clamped = Math.max(
    -160,
    Math.min(0, metering)
  );

  return Math.round(
    ((clamped + 160) / 160) * 120
  );
}

/**
 * Returns a label based on sound level.
 */
export function getNoiseLabel(
  db: number
): string {

  if (db < 25) return "Very Quiet";

  if (db < 45) return "Quiet";

  if (db < 65) return "Normal";

  if (db < 85) return "Loud";

  return "Very Loud";

}