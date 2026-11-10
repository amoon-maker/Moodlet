import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const moods = [
  { name: "Happy", description: "Feeling good and positive", color: "#F3E8C8" },
  { name: "Sad", description: "Having a difficult day", color: "#E2EAF3" },
  { name: "Stressed", description: "A lot on your mind", color: "#F0E2DF" },
  { name: "Tired", description: "Low on energy", color: "#EAE3F0" },
  {
    name: "Bored",
    description: "Looking for something to do",
    color: "#E2ECE5",
  },
];

export default function ExploreScreen() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>How are you feeling?</Text>

      <Text style={styles.subtitle}>
        Choose the mood that feels closest to yours today.
      </Text>

      <View style={styles.moodList}>
        {moods.map((mood) => {
          const isSelected = selectedMood === mood.name;

          return (
            <Pressable
              key={mood.name}
              onPress={() => setSelectedMood(mood.name)}
              style={[
                styles.moodCard,
                { backgroundColor: mood.color },
                isSelected && styles.selectedCard,
              ]}
            >
              <View style={styles.moodText}>
                <Text style={styles.moodName}>{mood.name}</Text>
                <Text style={styles.moodDescription}>{mood.description}</Text>
              </View>

              <Text style={styles.arrow}>›</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.selection}>
        {selectedMood
          ? `Selected: ${selectedMood}`
          : "Select a mood to continue"}
      </Text>

      <Pressable
        style={[styles.continueButton, !selectedMood && styles.disabledButton]}
        disabled={!selectedMood}
        onPress={() =>
          router.push({
            pathname: "/challenge",
            params: { mood: selectedMood! },
          })
        }
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F2",
  },
  content: {
    padding: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#594D78",
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: "#777080",
    marginTop: 10,
    marginBottom: 30,
  },
  moodList: {
    gap: 14,
  },
  moodCard: {
    minHeight: 88,
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedCard: {
    borderColor: "#594D78",
  },
  moodText: {
    gap: 5,
  },
  moodName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#443B50",
  },
  moodDescription: {
    fontSize: 14,
    color: "#716A77",
  },
  arrow: {
    fontSize: 28,
    color: "#594D78",
  },
  selection: {
    textAlign: "center",
    color: "#777080",
    fontSize: 14,
    marginTop: 28,
  },
  continueButton: {
    backgroundColor: "#594D78",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "#D8D1DF",
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
