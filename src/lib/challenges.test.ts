import { getRandomChallenge } from "./challenges";

describe("getRandomChallenge", () => {
  it("returns a challenge from the provided list", () => {
    const challenges = ["Take a walk", "Drink water", "Stretch"];

    const result = getRandomChallenge(challenges);

    expect(challenges).toContain(result);
  });

  it("returns a fallback message when the list is empty", () => {
    const result = getRandomChallenge([]);

    expect(result).toBe("Try taking a moment for yourself today.");
  });
});