import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';
import { LLMExtractionSchema } from '../validations';

const apiKey = process.env.ANTHROPIC_API_KEY || 'missing_key';
const anthropic = new Anthropic({ apiKey });

export async function extractHealthDataFromText(text: string): Promise<z.infer<typeof LLMExtractionSchema>> {
  if (apiKey === 'missing_key') {
    throw new Error('ANTHROPIC_API_KEY not configured on server');
  }

  const response = await anthropic.messages.create({
    model: 'claude-3-5-haiku-latest',
    max_tokens: 1024,
    system: `You are a medical data extraction assistant. Your job is to extract structured vitals, symptoms, and medication intake from free-text patient logs.

You MUST return your response as STRICT, valid JSON. DO NOT wrap the response in markdown code blocks. DO NOT include any conversational text.

The JSON MUST match the following format exactly:
{
  "symptoms": [
      {
         "name": "string",
         "severity": "Mild" | "Moderate" | "Severe" | "Critical"
      }
  ],
  "vitals": {
      "bloodSugar": number,
      "bloodPressure": "string",
      "heartRate": number,
      "weight": number
  },
  "medications": [
      {
          "name": "string",
          "taken": boolean
      }
  ],
  "summary": "A brief 1-sentence summary of the patient's state."
}`,
    messages: [{ role: 'user', content: text }],
  });

  const contentBlock = response.content.find((c) => c.type === 'text');
  if (!contentBlock || contentBlock.type !== 'text') {
    throw new Error('Failed to extract data: No text content returned');
  }

  try {
    const rawJson = JSON.parse(contentBlock.text);
    return LLMExtractionSchema.parse(rawJson);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("[Anthropic] Validation failed:", error.flatten());
      throw new Error("Extracted JSON did not match expected schema");
    }
    console.error("[Anthropic] JSON parse failed:", error);
    throw new Error("Failed to parse Anthropic response as JSON");
  }
}
