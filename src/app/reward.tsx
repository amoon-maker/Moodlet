import { fetchCatGifs, fetchQuote, type GiphyGif } from "@/lib/api";
import { loadRewards, saveRewards } from "@/lib/storage";
import type { Quote, Reward } from "@/lib/types";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const moodSearches: Record<string, string> = {
  Happy: "funny happy cat",
  Sad: "cute comforting cat",
  Stressed: "confused stressed cat",
  Tired: "sleepy tired cat",
  Bored: "funny chaotic cat",
};

const fallbackQuote: Quote = {
  id: 0,
  quote: "Every day is a fresh start.",
  author: "Moodlet",
};

const fallbackGif: GiphyGif = {
  id: "fallback",
  title: "Moodlet cat",
  url: "",
  imageUrl: "https://cataas.com/cat",
};

const rewards = [
  { mood: "Happy", caption: "Enjoy this little win. You deserve it!" },
  { mood: "Sad", caption: "It's okay to take things one step at a time." },
  { mood: "Stressed", caption: "One thing at a time. You've got this!" },
  { mood: "Tired", caption: "Rest is productive too. Take it easy!" },
  { mood: "Bored", caption: "A little curiosity can make any day better." },
];

export default function RewardScreen() {
  const { mood } = useLocalSearchParams<{ mood: string }>();

  const selectedReward = rewards.find((item) => item.mood === mood);

  const [quote, setQuote] = useState<Quote | null>(null);
  const [catGif, setCatGif] = useState<GiphyGif | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasQuoteError, setHasQuoteError] = useState(false);
  const [hasGifError, setHasGifError] = useState(false);

  useEffect(() => {
    async function loadReward() {
      try {
        const [quoteResult, gifResult] = await Promise.allSettled([
          fetchQuote(),
          fetchCatGifs(moodSearches[mood || ""] || "funny cat"),
        ]);

        if (quoteResult.status === "fulfilled") {
          setQuote(quoteResult.value);
        } else {
          setQuote(fallbackQuote);
          setHasQuoteError(true);
        }

        if (gifResult.status === "fulfilled" && gifResult.value.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * gifResult.value.length,
          );
          setCatGif(gifResult.value[randomIndex]);
        } else {
          setCatGif(fallbackGif);
          setHasGifError(true);
        }
      } catch {
        setQuote(fallbackQuote);
        setCatGif(fallbackGif);
        setHasQuoteError(true);
        setHasGifError(true);
      } finally {
        setIsLoading(false);
      }
    }

    loadReward();
  }, [mood]);

  async function handleSaveReward() {
    if (!selectedReward || !quote || !catGif) return;

    const savedRewards: Reward[] = await loadRewards();

    const newReward: Reward = {
      mood: selectedReward.mood,
      meme: catGif.title || "Funny cat",
      caption: selectedReward.caption,
      quote: quote.quote,
      author: quote.author,
      gifUrl: catGif.imageUrl,
      gifTitle: catGif.title,
    };

    const alreadySaved = savedRewards.some(
      (item) =>
        item.mood === newReward.mood &&
        item.gifUrl === newReward.gifUrl &&
        item.quote === newReward.quote,
    );

    if (!alreadySaved) {
      await saveRewards(JSON.stringify([...savedRewards, newReward]));
    }

    router.push("/collection");
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>‹ </Text>
      </Pressable>

      <Text style={styles.title}>A little reward for you!</Text>

      <Text style={styles.subtitle}>
        You did it! Here's a little something for your {mood?.toLowerCase()}{" "}
        day.
      </Text>

      <View style={styles.gifContainer}>
        {isLoading ? (
          <Text style={styles.loadingText}>Finding a cat for you...</Text>
        ) : (
          <Image
            source={{ uri: catGif?.imageUrl }}
            style={styles.gif}
            resizeMode="contain"
          />
        )}
      </View>

      {hasGifError && (
        <Text style={styles.offlineText}>
          Showing a backup cat because GIFs couldn't load.
        </Text>
      )}

      <Text style={styles.caption}>{selectedReward?.caption}</Text>

      <View style={styles.quoteBox}>
        <Text style={styles.quoteTitle}>A little extra positivity</Text>

        {isLoading ? (
          <Text style={styles.quoteText}>Loading quote...</Text>
        ) : (
          <>
            <Text style={styles.quoteText}>"{quote?.quote}"</Text>
            <Text style={styles.quoteAuthor}>— {quote?.author}</Text>
            {hasQuoteError && (
              <Text style={styles.offlineText}>Offline quote shown.</Text>
            )}
          </>
        )}
      </View>

      <Pressable
        style={styles.saveButton}
        onPress={handleSaveReward}
        disabled={isLoading || !quote || !catGif}
      >
        <Text style={styles.saveButtonText}>Save reward</Text>
      </Pressable>

      <Pressable
        style={styles.continueButton}
        onPress={() => router.push("/explore")}
      >
        <Text style={styles.continueButtonText}>Choose another mood</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F2",
    padding: 28,
    paddingTop: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#594D78",
    marginBottom: 18,
  },
  subtitle: {
    fontSize: 17,
    lineHeight: 26,
    color: "#777080",
  },
  gifContainer: {
    height: 230,
    marginTop: 25,
    marginBottom: 18,
    backgroundColor: "#F0E2DF",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  gif: {
    width: "100%",
    height: "100%",
  },
  loadingText: {
    color: "#777080",
    fontSize: 15,
  },
  caption: {
    fontSize: 16,
    color: "#777080",
    textAlign: "center",
    lineHeight: 24,
  },
  quoteBox: {
    backgroundColor: "#F0E2DF",
    padding: 18,
    borderRadius: 14,
    marginTop: 25,
  },
  quoteTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#594D78",
    marginBottom: 10,
  },
  quoteText: {
    fontSize: 15,
    color: "#443B50",
    lineHeight: 23,
  },
  quoteAuthor: {
    fontSize: 14,
    color: "#777080",
    marginTop: 8,
    textAlign: "right",
  },
  offlineText: {
    fontSize: 12,
    color: "#777080",
    marginTop: 8,
    textAlign: "center",
  },
  continueButton: {
    backgroundColor: "#594D78",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 20,
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "#ECD9BC",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#594D78",
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 24,
    minHeight: 24,
    justifyContent: "center",
  },
  backButtonText: {
    fontSize: 20,
    color: "#594D78",
    fontWeight: "600",
  },
});
