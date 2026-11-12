export type Quote = {
  id: number;
  quote: string;
  author: string;
};

export async function fetchQuote(): Promise<Quote> {
  const response = await fetch("https://dummyjson.com/quotes/random");

  if (!response.ok) {
    throw new Error("Could not load a quote.");
  }

  const data: Quote = await response.json();

  return data;
}
