import { loadRewards, saveRewards } from "@/lib/storage";
import type { Reward } from "@/lib/types";
import { router, useLocalSearchParams } from "expo-router";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function SavedRewardScreen() {
  const { id, mood, meme, caption, quote, author, gifUrl } =
    useLocalSearchParams<{
      id: string;
      mood: string;
      meme: string;
      caption: string;
      quote: string;
      author: string;
      gifUrl: string;
    }>();

  async function handleDeleteReward() {
    if (!id) return;

    Alert.alert(
      "Delete reward?",
      "This reward will be permanently removed from your collection.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const savedRewards: Reward[] = await loadRewards();

            const updatedRewards = savedRewards.filter(
              (reward) => reward.id !== id,
            );

            await saveRewards(JSON.stringify(updatedRewards));
            router.replace("/(tabs)/collection");
          },
        },
      ],
    );
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>‹ </Text>
      </Pressable>

      <Text style={styles.title}>Your saved reward</Text>

      <Text style={styles.mood}>{mood}</Text>

      {gifUrl ? (
        <Image
          source={{ uri: gifUrl }}
          style={styles.gif}
          resizeMode="contain"
        />
      ) : (
        <Text style={styles.meme}>{meme}</Text>
      )}

      <Text style={styles.caption}>{caption}</Text>

      <View style={styles.quoteBox}>
        <Text style={styles.quoteTitle}>A little extra positivity</Text>
        <Text style={styles.quoteText}>"{quote}"</Text>
        <Text style={styles.quoteAuthor}>— {author}</Text>
      </View>
      <Pressable style={styles.deleteRewardButton} onPress={handleDeleteReward}>
        <Text style={styles.deleteRewardButtonText}>Delete reward</Text>
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
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#594D78",
    marginBottom: 24,
  },
  mood: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#594D78",
    marginBottom: 20,
  },
  gif: {
    width: "100%",
    height: 230,
    backgroundColor: "#F0E2DF",
    borderRadius: 18,
    marginBottom: 18,
  },
  meme: {
    fontSize: 22,
    fontWeight: "600",
    color: "#594D78",
    textAlign: "center",
    lineHeight: 32,
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
    marginTop: 30,
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
  deleteRewardButton: {
    alignItems: "center",
    padding: 16,
    marginTop: 18,
  },
  deleteRewardButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#A45D5D",
  },
});
