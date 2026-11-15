import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const challenges = [
  {
    mood: "Happy",
    challenges: [
      "Write down one thing that made you smile today.",
      "Share something positive with someone you care about.",
      "Take a moment to celebrate something you've accomplished.",
      "Dance to your favorite song for 30 seconds.",
      "Send someone a compliment.",
      "Take a picture of something that makes you happy.",
      "Write down three things you're grateful for.",
      "Do something small that makes you feel good.",
    ],
  },
  {
    mood: "Sad",
    challenges: [
      "Take a few minutes to do something that comforts you.",
      "Listen to a song that makes you feel understood.",
      "Write down one kind thing you can tell yourself today.",
      "Watch a funny video or a comforting show.",
      "Make yourself a warm drink and enjoy it slowly.",
      "Think of one person who makes you feel supported.",
      "Take a few minutes to enjoy some fresh air.",
      "Give yourself permission to have a slow day.",
    ],
  },
  {
    mood: "Stressed",
    challenges: [
      "Take five slow, deep breaths and give yourself a moment.",
      "Step away from your screen for two minutes.",
      "Write down one thing you can focus on right now.",
      "Stretch your shoulders and neck gently.",
      "Tidy one small area around you.",
      "Listen to a calming song.",
      "Take a short walk and clear your mind.",
      "Write down one thing you can leave for tomorrow.",
    ],
  },
  {
    mood: "Tired",
    challenges: [
      "Take a short break and give yourself time to recharge.",
      "Stretch gently for a minute.",
      "Drink a glass of water and give yourself a little pause.",
      "Rest your eyes for two minutes.",
      "Put your phone down and take a quiet moment.",
      "Get comfortable and relax your shoulders.",
      "Step outside for some fresh air.",
      "Give yourself permission to slow down today.",
    ],
  },
  {
    mood: "Bored",
    challenges: [
      "Try something new, even if it's something small.",
      "Find a song you've never listened to before.",
      "Do something creative for five minutes.",
      "Draw something without worrying about how it looks.",
      "Learn one random interesting fact.",
      "Take a different route on your next walk.",
      "Make up a funny story in three sentences.",
      "Find an object nearby and imagine its funny backstory.",
    ],
  },
];

export default function ChallengeScreen() {
  const { mood } = useLocalSearchParams<{ mood: string }>();
  const selectedMood = challenges.find((item) => item.mood === mood);

  const [challenge] = useState(() => {
    if (!selectedMood) return "Try taking a moment for yourself today.";

    const randomIndex = Math.floor(
      Math.random() * selectedMood.challenges.length,
    );

    return selectedMood.challenges[randomIndex];
  });
  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>‹ </Text>
      </Pressable>
      <Text style={styles.title}>Your little challenge</Text>

      <Text style={styles.subtitle}>
        Since you're feeling {mood?.toLowerCase()}, here's something for you.
      </Text>

      <Text style={styles.challenge}>{challenge}</Text>

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
