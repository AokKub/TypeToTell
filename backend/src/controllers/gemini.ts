import type { Context } from "hono";
import { geminiCreateStoryRequest } from "../types/gemini";
import { geminiAI, geminiMakeInvalidStory } from "../services/gemini";

const geminiCreateStory = async (c: Context) => {
  const { prompt } = await c.req.json<geminiCreateStoryRequest>();
  const validStory = await geminiAI(prompt);
  if (!validStory) {
    return c.json(
      {
        message: "Failed to generate story",
      },
      500,
    );
  }

  const invalidStory = await geminiMakeInvalidStory(validStory);
  if (!invalidStory) {
    return c.json(
      {
        message: "Failed to generate invalid story",
      },
      500,
    );
  }

  return c.json({
    message: "Story generated successfully",
    validStory,
    invalidStory,
  });
};

export { geminiCreateStory };
