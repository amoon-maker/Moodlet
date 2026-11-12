import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

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

export default function RewardScreen() {
  const { mood } = useLocalSearchParams<{ mood: string }>();
  const selectedReward = rewards.find((item) => item.mood === mood);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>A little reward for you!</Text>

      <Text style={styles.subtitle}>
        You did it! Here's a little something for your {mood?.toLowerCase()}{" "}
        day.
      </Text>
      <Text style={styles.meme}>{selectedReward?.meme}</Text>

      <Text style={styles.caption}>{selectedReward?.caption}</Text>
      <Pressable
        style={styles.saveButton}
        onPress={() => router.push("/collection")}
      >
        <Text style={styles.saveButtonText}>Save reward</Text>
      </Pressable>
      <Pressable
        style={styles.continueButton}
        onPress={() => router.push("/explore")}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F2",
    padding: 28,
    justifyContent: "center",
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
  continueButton: {
    backgroundColor: "#594D78",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 30,
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
    marginTop: 25,
  },
  saveButtonText: {
    color: "#594D78",
    fontSize: 16,
    fontWeight: "600",
  },
});
