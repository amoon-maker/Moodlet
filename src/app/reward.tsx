import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function RewardScreen() {
  const { mood } = useLocalSearchParams<{ mood: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>A little reward for you!</Text>

      <Text style={styles.subtitle}>
        You did it! Here's a little something for your {mood?.toLowerCase()}{" "}
        day.
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
