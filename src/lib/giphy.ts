
const GIPHY_API_KEY = process.env.EXPO_PUBLIC_GIPHY_API_KEY;

export type CatGif = {
  id: string;
  title: string;
  url: string;
};

export async function fetchCatGif(mood: string): Promise<CatGif> {
  const moodSearches: Record<string, string> = {
    Happy: "funny happy cat",
    Sad: "cute comforting cat",
    Stressed: "confused stressed cat",
    Tired: "sleepy tired cat",
    Bored: "funny chaotic cat",
  };

  const searchTerm = moodSearches[mood] || "funny cat";

  if (!GIPHY_API_KEY) {
    throw new Error("GIPHY API key is missing.");
  }

  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(searchTerm)}&limit=10&rating=g`,
  );

  if (!response.ok) {
    throw new Error("Could not load cat GIFs.");
  }

  const result = await response.json();

  if (!result.data || result.data.length === 0) {
    throw new Error("No cat GIFs found.");
  }

  const randomIndex = Math.floor(Math.random() * result.data.length);
  const gif = result.data[randomIndex];

  return {
    id: gif.id,
    title: gif.title,
    url: gif.images.fixed_height.url,
  };
}
