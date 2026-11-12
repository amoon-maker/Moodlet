import { loadName } from "@/lib/storage";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const currentRoute = segments[0];

  useEffect(() => {
    let isActive = true;

    async function checkName() {
      const name = await loadName();

      if (!isActive) return;

      const isWelcomeScreen = currentRoute === "welcome";

      if (!name && !isWelcomeScreen) {
        router.replace("/welcome");
      } else if (name && isWelcomeScreen) {
        router.replace("/(tabs)");
      }
    }

    checkName();

    return () => {
      isActive = false;
    };
  }, [currentRoute]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="challenge" />
      <Stack.Screen name="reward" />
      <Stack.Screen name="saved-reward" />
    </Stack>
  );
}
