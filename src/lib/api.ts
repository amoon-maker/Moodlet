import type { Quote } from "@/lib/types";

export async function fetchQuote(): Promise<Quote> {
  const response = await fetch("https://dummyjson.com/quotes/random");

  if (!response.ok) {
    throw new Error("Could not load a quote.");
  }

  const data: Quote = await response.json();

  return data;
}
