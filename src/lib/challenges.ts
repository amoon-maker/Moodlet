export function getRandomChallenge(challenges: string[]): string {
  if (challenges.length === 0) {
    return "Try taking a moment for yourself today.";
  }

  const randomIndex = Math.floor(Math.random() * challenges.length);

  return challenges[randomIndex];
}