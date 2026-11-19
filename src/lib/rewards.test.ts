import { getRandomCaption } from "./rewards";

describe("getRandomCaption", () => {
  it("returns a caption from the provided list", () => {
    const captions = ["You got this!", "Take it easy.", "Keep smiling!"];

    const result = getRandomCaption(captions);

    expect(captions).toContain(result);
  });

  it("returns a fallback message when the list is empty", () => {
    const result = getRandomCaption([]);

    expect(result).toBe("Every day is a fresh start.");
  });
});
