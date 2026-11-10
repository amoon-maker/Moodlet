import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ChallengeScreen() {
  const { mood } = useLocalSearchParams<{ mood: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your little challenge</Text>

      <Text style={styles.subtitle}>
        Since you're feeling {mood?.toLowerCase()}, here's something for you.
      </Text>
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
});
