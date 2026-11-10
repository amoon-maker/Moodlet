import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>moodlet</Text>

        <View style={styles.welcome}>
          <Text style={styles.title}>A little boost for your day.</Text>

          <Text style={styles.subtitle}>
            How are you feeling today? Let's find a little something to make
            your day better.
          </Text>
        </View>

        <Link href="/explore" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Find my mood</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
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
    fontSize: 38,
    fontWeight: "bold",
    color: "#594D78",
    lineHeight: 46,
  },
  subtitle: {
    fontSize: 17,
    lineHeight: 26,
    color: "#777080",
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
