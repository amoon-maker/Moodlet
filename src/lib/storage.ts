import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "saved_rewards";

export async function saveRewards(rewards: string) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, rewards);
  } catch (error) {
    console.log("Error saving rewards:", error);
  }
}

export async function loadRewards() {
  try {
    const rewards = await AsyncStorage.getItem(STORAGE_KEY);
    return rewards ? JSON.parse(rewards) : [];
  } catch (error) {
    console.log("Error loading rewards:", error);
    return [];
  }
}