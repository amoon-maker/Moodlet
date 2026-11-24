import { saveName } from "@/lib/storage";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function WelcomeScreen() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  async function handleContinue() {
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Please enter your name to continue.");
      return;
    }

    setError("");
    await saveName(trimmedName);
    router.replace("/(tabs)");
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>moodlet</Text>

        <View style={styles.welcome}>
          <Text style={styles.title}>Welcome to Moodlet!</Text>
          <Text style={styles.subtitle}>What should we call you?</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#9991A0"
            value={name}
            onChangeText={(value) => {
              setName(value);
              setError("");
            }}
            maxLength={30}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>

        <Pressable style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Let's go!</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F2",
  },
  content: {
    flex: 1,
    padding: 28,
    justifyContent: "space-between",
  },
  logo: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#594D78",
  },
  welcome: {
    gap: 18,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#594D78",
  },
  subtitle: {
    fontSize: 17,
    color: "#777080",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6DAC7",
    borderRadius: 16,
    padding: 17,
    fontSize: 16,
    color: "#443B50",
  },
  error: {
    fontSize: 14,
    color: "#C04B4B",
  },
  button: {
    backgroundColor: "#E9DFF5",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#594D78",
  },
});
