import type { Quote } from "@/lib/types";

export async function fetchQuote(): Promise<Quote> {
  const response = await fetch("https://dummyjson.com/quotes/random");

  if (!response.ok) {
    throw new Error("Could not load a quote.");
  }

  const data: Quote = await response.json();

  return data;
}

export type GiphyGif = {
  id: string;
  title: string;
  url: string;
  imageUrl: string;
};

export async function fetchCatGifs(
  searchTerm = "funny cats",
): Promise<GiphyGif[]> {
  const apiKey = process.env.EXPO_PUBLIC_GIPHY_API_KEY;

  if (!apiKey) {
    throw new Error("GIPHY API key is missing.");
  }

  const params = new URLSearchParams({
    api_key: apiKey,
    q: searchTerm,
    limit: "10",
    rating: "g",
  });

  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Could not load GIFs.");
  }

  const data = await response.json();

  return data.data.map((gif: any) => ({
    id: gif.id,
    title: gif.title,
    url: gif.url,
    imageUrl: gif.images.fixed_height.url,
  }));
}
