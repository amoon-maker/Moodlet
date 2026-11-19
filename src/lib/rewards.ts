export function getRandomCaption(captions: string[]): string {
  if (captions.length === 0) {
    return "Every day is a fresh start.";
  }

  const randomIndex = Math.floor(Math.random() * captions.length);

  return captions[randomIndex];
}