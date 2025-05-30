import type { Context } from "hono";
import { geminiAI } from "../services/gemini";

const geminiTalk = async (c: Context) => {
  const res = await geminiAI();

  return c.json({
    message: res,
  });
};

export { geminiTalk };
