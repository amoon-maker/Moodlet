import type { Reward } from "@/lib/types";
import { Pressable, StyleSheet, Text } from "react-native";

type RewardCardProps = {
  item: Reward;
  onPress: () => void;
  onDelete: () => void;
};

export default function RewardCard({
  item,
  onPress,
  onDelete,
}: RewardCardProps) {
  return (
    <Pressable style={styles.rewardCard} onPress={onPress}>
      <Pressable style={styles.deleteButton} onPress={onDelete} hitSlop={8}>
        <Text style={styles.deleteButtonText}>×</Text>
      </Pressable>

      <Text style={styles.mood}>{item.mood}</Text>
      <Text style={styles.meme}>{item.meme}</Text>
      <Text style={styles.caption}>{item.caption}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
