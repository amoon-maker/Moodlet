import { loadRewards } from "@/lib/storage";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

type Reward = {
  mood: string;
  meme: string;
  caption: string;
};

export default function CollectionScreen() {
  const [savedRewards, setSavedRewards] = useState<Reward[]>([]);

  useEffect(() => {
    async function getSavedRewards() {
      const rewards = await loadRewards();
      setSavedRewards(rewards);
    }

    getSavedRewards();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Collection</Text>

      <FlatList
        data={savedRewards}
        keyExtractor={(item, index) => `${item.mood}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.rewardCard}>
            <Text style={styles.mood}>{item.mood}</Text>
            <Text style={styles.meme}>{item.meme}</Text>
            <Text style={styles.caption}>{item.caption}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.subtitle}>
            Your saved rewards will appear here.
          </Text>
        }
      />
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
});
