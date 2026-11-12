import { loadRewards, saveRewards } from "@/lib/storage";
import type { Quote } from "@/lib/types";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export async function fetchQuote(): Promise<Quote> {
  const response = await fetch("https://dummyjson.com/quotes/random");

  if (!response.ok) {
    throw new Error("Could not load a quote.");
  }

  const data: Quote = await response.json();

  return data;
}
const rewards = [
  {
    mood: "Happy",
    meme: "When everything goes right for once.",
    caption: "Enjoy this little win. You deserve it!",
  },
  {
    mood: "Sad",
    meme: "Me giving myself a little extra kindness today.",
    caption: "It's okay to take things one step at a time.",
  },
  {
    mood: "Stressed",
    meme: "Me after finally taking a deep breath.",
    caption: "One thing at a time. You've got this!",
  },
  {
    mood: "Tired",
    meme: "My bed and I have an appointment.",
    caption: "Rest is productive too. Take it easy!",
  },
  {
    mood: "Bored",
    meme: "Me looking for something interesting to happen.",
    caption: "A little curiosity can make any day better.",
  },
];

const fallbackQuote: Quote = {
  id: 0,
  quote: "Every day is a fresh start.",
  author: "Moodlet",
};

export default function RewardScreen() {
  const { mood } = useLocalSearchParams<{ mood: string }>();
  const selectedReward = rewards.find((item) => item.mood === mood);

  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function getQuote() {
      try {
        const data = await fetchQuote();
        setQuote(data);
      } catch (error) {
        setQuote(fallbackQuote);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getQuote();
  }, []);

  async function handleSaveReward() {
    if (!selectedReward) return;

    const savedRewards = await loadRewards();
    const updatedRewards = [...savedRewards, selectedReward];

    await saveRewards(JSON.stringify(updatedRewards));

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

      <Text style={styles.meme}>{selectedReward?.meme}</Text>
      <Text style={styles.caption}>{selectedReward?.caption}</Text>

      <View style={styles.quoteBox}>
        <Text style={styles.quoteTitle}>A little extra positivity</Text>

        {isLoading ? (
          <Text style={styles.quoteText}>Loading quote...</Text>
        ) : (
          <>
            <Text style={styles.quoteText}>"{quote?.quote}"</Text>
            <Text style={styles.quoteAuthor}>— {quote?.author}</Text>
            {hasError && (
              <Text style={styles.offlineText}>Offline quote shown.</Text>
            )}
          </>
        )}
      </View>

      <Pressable style={styles.saveButton} onPress={handleSaveReward}>
        <Text style={styles.saveButtonText}>Save reward</Text>
      </Pressable>

      <Pressable
        style={styles.continueButton}
        onPress={() => router.push("/explore")}
      >
        <Text style={styles.continueButtonText}>Choose another mood</Text>{" "}
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
  meme: {
    fontSize: 22,
    fontWeight: "600",
    color: "#594D78",
    textAlign: "center",
    lineHeight: 32,
    marginTop: 35,
    marginBottom: 18,
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
