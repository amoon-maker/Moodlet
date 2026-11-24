import { router } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

export default function BackButton() {
  return (
    <Pressable style={styles.backButton} onPress={() => router.back()}>
      <Text style={styles.backButtonText}>‹</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
