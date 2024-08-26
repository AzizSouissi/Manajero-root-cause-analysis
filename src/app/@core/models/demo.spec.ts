import { Demo } from "./demo";

describe("Demo Class", () => {
  it("should create a Demo instance with optional properties", () => {
    const demo: Demo = {
      id: "123",
      introduction: "This is an introduction.",
      step1title: "Step 1 Title",
      step1content: "Content for step 1.",
      step2title: "Step 2 Title",
      step2content: "Content for step 2.",
      step3title: "Step 3 Title",
      step3content: "Content for step 3.",
      step4title: "Step 4 Title",
      step4content: "Content for step 4.",
      example: "Example usage of the Demo class.",
      why: "Why this Demo is important.",
      what: "What this Demo covers.",
      how: "How to use this Demo.",
      whatif: "What if scenarios for the Demo.",
    };

    expect(demo.id).toBe("123");
    expect(demo.introduction).toBe("This is an introduction.");
    expect(demo.step1title).toBe("Step 1 Title");
    expect(demo.step1content).toBe("Content for step 1.");
    expect(demo.step2title).toBe("Step 2 Title");
    expect(demo.step2content).toBe("Content for step 2.");
    expect(demo.step3title).toBe("Step 3 Title");
    expect(demo.step3content).toBe("Content for step 3.");
    expect(demo.step4title).toBe("Step 4 Title");
    expect(demo.step4content).toBe("Content for step 4.");
    expect(demo.example).toBe("Example usage of the Demo class.");
    expect(demo.why).toBe("Why this Demo is important.");
    expect(demo.what).toBe("What this Demo covers.");
    expect(demo.how).toBe("How to use this Demo.");
    expect(demo.whatif).toBe("What if scenarios for the Demo.");
  });

  it("should allow missing optional properties", () => {
    const demo: Demo = {
      id: "456",
      introduction: "Introduction without other steps.",
      // Other properties are omitted
    };

    expect(demo.id).toBe("456");
    expect(demo.introduction).toBe("Introduction without other steps.");
    expect(demo.step1title).toBeUndefined();
    expect(demo.step1content).toBeUndefined();
    expect(demo.step2title).toBeUndefined();
    expect(demo.step2content).toBeUndefined();
    expect(demo.step3title).toBeUndefined();
    expect(demo.step3content).toBeUndefined();
    expect(demo.step4title).toBeUndefined();
    expect(demo.step4content).toBeUndefined();
    expect(demo.example).toBeUndefined();
    expect(demo.why).toBeUndefined();
    expect(demo.what).toBeUndefined();
    expect(demo.how).toBeUndefined();
    expect(demo.whatif).toBeUndefined();
  });
});
