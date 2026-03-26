import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export const getGeminiClient = () => {
  if (!apiKey) {
    throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not defined");
  }
  return new GoogleGenAI({ apiKey });
};
