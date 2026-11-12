import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function SavedRewardScreen() {
  const { mood, meme, caption, quote, author } =
    useLocalSearchParams<{
      mood: string;
      meme: string;
      caption: string;
      quote: string;
      author: string;
    }>();

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>‹ </Text>
      </Pressable>

      <Text style={styles.title}>Your saved reward</Text>

      <Text style={styles.mood}>{mood}</Text>

      <Text style={styles.meme}>{meme}</Text>

      <Text style={styles.caption}>{caption}</Text>

      <View style={styles.quoteBox}>
        <Text style={styles.quoteTitle}>A little extra positivity</Text>

        <Text style={styles.quoteText}>"{quote}"</Text>

        <Text style={styles.quoteAuthor}>— {author}</Text>
      </View>
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
});