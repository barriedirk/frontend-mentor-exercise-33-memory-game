export function shuffle<T>(array: T[], timeToShuffle = 1): T[] {
  const result = [...array];

  for (let x = 0; x < timeToShuffle; x++) {
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [result[i], result[j]] = [result[j], result[i]];
    }
  }

  return result;
}
