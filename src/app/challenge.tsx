import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const challenges = [
  {
    mood: "Happy",
    challenge: "Write down one thing that made you smile today.",
  },
  {
    mood: "Sad",
    challenge: "Take a few minutes to do something that comforts you.",
  },
  {
    mood: "Stressed",
    challenge: "Take five slow, deep breaths and give yourself a moment.",
  },
  {
    mood: "Tired",
    challenge: "Take a short break and give yourself time to recharge.",
  },
  {
    mood: "Bored",
    challenge: "Try something new, even if it's something small.",
  },
];
export default function ChallengeScreen() {
  const { mood } = useLocalSearchParams<{ mood: string }>();
  const selectedChallenge = challenges.find((item) => item.mood === mood);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your little challenge</Text>

      <Text style={styles.subtitle}>
        Since you're feeling {mood?.toLowerCase()}, here's something for you.
      </Text>

      <Text style={styles.challenge}>{selectedChallenge?.challenge}</Text>

      <Pressable
        style={styles.completeButton}
        onPress={() =>
          router.push({
            pathname: "/reward",
            params: { mood: mood },
          })
        }
      >
        <Text style={styles.completeButtonText}>I did it!</Text>
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
  challenge: {
    fontSize: 20,
    lineHeight: 30,
    color: "#594D78",
    marginTop: 30,
  },
  completeButton: {
    backgroundColor: "#594D78",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 35,
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
