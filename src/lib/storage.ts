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
const NAME_KEY = "user_name";

export async function saveName(name: string) {
  try {
    await AsyncStorage.setItem(NAME_KEY, name);
  } catch (error) {
    console.log("Error saving name:", error);
  }
}

export async function loadName() {
  try {
    return await AsyncStorage.getItem(NAME_KEY);
  } catch (error) {
    console.log("Error loading name:", error);
    return null;
  }
}

export async function resetApp() {
  try {
    await AsyncStorage.multiRemove([NAME_KEY, STORAGE_KEY]);
  } catch (error) {
    console.log("Error resetting app:", error);
  }
}