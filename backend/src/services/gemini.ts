import { GoogleGenAI } from "@google/genai";

async function geminiAI() {
  const API_KEY = process.env.GEMINI_API;
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  console.log(process.env);
  console.log(API_KEY);
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
  return response.text;
}

export { geminiAI };
