import { loadRewards, resetApp, saveRewards } from "@/lib/storage";
import type { Reward } from "@/lib/types";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function CollectionScreen() {
  const [savedRewards, setSavedRewards] = useState<Reward[]>([]);

  useEffect(() => {
    async function getSavedRewards() {
      const rewards = await loadRewards();
      setSavedRewards(rewards);
    }

    getSavedRewards();
  }, []);

  function handleReset() {
    Alert.alert(
      "Reset Moodlet?",
      "This will delete your name and all saved rewards. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            await resetApp();
            setSavedRewards([]);
            router.replace("/welcome");
          },
        },
      ],
    );
  }

  function openReward(item: Reward) {
    router.push({
      pathname: "/saved-reward",
      params: {
        mood: item.mood,
        meme: item.meme,
        caption: item.caption,
        quote: item.quote ?? "",
        author: item.author ?? "",
      },
    });
  }

  async function handleDeleteReward(item: Reward) {
    Alert.alert(
      "Delete reward?",
      "This reward will be removed from your collection.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const updatedRewards = savedRewards.filter(
              (reward) => reward !== item,
            );

            await saveRewards(JSON.stringify(updatedRewards));
            setSavedRewards(updatedRewards);
          },
        },
      ],
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Collection</Text>

      <FlatList
        style={styles.list}
        data={savedRewards}
        keyExtractor={(item, index) => `${item.mood}-${index}`}
        renderItem={({ item }) => (
          <Pressable style={styles.rewardCard} onPress={() => openReward(item)}>
            <Pressable
              style={styles.deleteButton}
              onPress={() => handleDeleteReward(item)}
              hitSlop={8}
            >
              <Text style={styles.deleteButtonText}>×</Text>
            </Pressable>

            <Text style={styles.mood}>{item.mood}</Text>
            <Text style={styles.meme}>{item.meme}</Text>
            <Text style={styles.caption}>{item.caption}</Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={styles.subtitle}>
            Your saved rewards will appear here.
          </Text>
        }
      />

      <Pressable style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetButtonText}>Reset App</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F2",
    padding: 24,
    paddingTop: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#594D78",
    marginBottom: 24,
  },
  list: {
    flex: 1,
  },
  subtitle: {
    fontSize: 17,
    color: "#777080",
  },
  rewardCard: {
    backgroundColor: "#F0E2DF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  mood: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#594D78",
    marginBottom: 10,
  },
  meme: {
    fontSize: 16,
    color: "#443B50",
    marginBottom: 10,
  },
  caption: {
    fontSize: 14,
    color: "#777080",
  },

  resetButton: {
    alignItems: "center",
    padding: 14,
    marginTop: 12,
  },
  resetButtonText: {
    fontSize: 14,
    color: "#A45D5D",
    fontWeight: "600",
  },
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 12,
    paddingHorizontal: 8,
    zIndex: 1,
  },
  deleteButtonText: {
    fontSize: 23,
    color: "#A45D5D",
    fontWeight: "600",
  },
});
