import { GoogleGenAI, Type, Schema } from '@google/genai';
import { z } from 'zod';
import { LLMExtractionSchema } from '../validations';

const apiKey = process.env.GEMINI_API_KEY || 'missing_key';
const ai = new GoogleGenAI({ apiKey });

export async function extractHealthDataFromText(text: string): Promise<z.infer<typeof LLMExtractionSchema>> {
  if (apiKey === 'missing_key') {
    throw new Error('GEMINI_API_KEY not configured on server');
  }

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      symptoms: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            severity: { type: Type.STRING, enum: ["Mild", "Moderate", "Severe", "Critical"] }
          },
          required: ["name", "severity"]
        }
      },
      vitals: {
        type: Type.OBJECT,
        properties: {
          bloodSugar: { type: Type.NUMBER },
          bloodPressure: { type: Type.STRING },
          heartRate: { type: Type.NUMBER },
          weight: { type: Type.NUMBER }
        }
      },
      medications: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            taken: { type: Type.BOOLEAN }
          },
          required: ["name", "taken"]
        }
      },
      summary: { type: Type.STRING }
    },
    required: ["summary"]
  };

  const response = await ai.models.generateContent({
    model: 'gemini-3.5-flash',
    contents: text,
    config: {
      systemInstruction: "You are a medical data extraction assistant. Your job is to extract structured vitals, symptoms, and medication intake from free-text patient logs.",
      responseMimeType: "application/json",
      responseSchema: responseSchema,
    }
  });

  if (!response.text) {
    throw new Error('Failed to extract data: No text content returned');
  }

  try {
    const rawJson = JSON.parse(response.text);
    return LLMExtractionSchema.parse(rawJson);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("[Gemini] Validation failed:", error.flatten());
      throw new Error("Extracted JSON did not match expected schema");
    }
    console.error("[Gemini] JSON parse failed:", error);
    throw new Error("Failed to parse Gemini response as JSON");
  }
}

export async function generateAlertInsight(rule: string, dataSummary: string): Promise<string> {
  if (apiKey === 'missing_key') {
    return "Please consult your doctor regarding these recent readings.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: `Rule: ${rule}\nData: ${dataSummary}`,
      config: {
        systemInstruction: `You are a helpful AI health assistant. You will be provided with a medical alert rule that triggered, and a summary of the data that triggered it. 
Your job is to generate a short, 1-2 sentence plain-language explanation of the pattern for the patient. 

CRITICAL REQUIREMENTS:
- DO NOT diagnose the patient.
- Keep it empathetic but professional.
- You MUST include a medical disclaimer like "Please consult your doctor." or similar at the end.`,
        temperature: 0.7,
      }
    });
    
    return response.text || "Please consult your doctor regarding these recent readings.";
  } catch (error) {
    console.error("[Gemini] Insight generation failed:", error);
    return "Please consult your doctor regarding these recent readings.";
  }
}

export async function generateWellnessTip(patientContext: string): Promise<string> {
  if (apiKey === 'missing_key') {
    return "Drink plenty of water and stay hydrated. *This is a general lifestyle tip, not medical advice.*";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: `Recent data: ${patientContext}`,
      config: {
        systemInstruction: `You are a positive health and wellness coach. Based on the patient's recent data, generate ONE short, encouraging, and actionable daily lifestyle tip (e.g. hydration, light movement, sleep hygiene).

CRITICAL REQUIREMENTS:
- Keep it under 2 sentences.
- DO NOT provide medical advice or diagnosis.
- Make it sound like a friendly tip, not an alarm.
- You MUST end the tip exactly with this disclaimer line: "*This is a general lifestyle tip, not medical advice.*"`,
        temperature: 0.7,
      }
    });
    
    return response.text || "Take a moment to stretch and breathe deeply today. *This is a general lifestyle tip, not medical advice.*";
  } catch (error) {
    console.error("[Gemini] Wellness tip generation failed:", error);
    return "Take a moment to stretch and breathe deeply today. *This is a general lifestyle tip, not medical advice.*";
  }
}

export async function generateAdaptiveSchedule(prompt: string): Promise<any[]> {
  if (apiKey === 'missing_key') {
    throw new Error('GEMINI_API_KEY not configured on server');
  }

  const responseSchema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        type: { type: Type.STRING },
        label: { type: Type.STRING },
        scheduledTime: { type: Type.STRING }
      },
      required: ["type", "label", "scheduledTime"]
    }
  };

  const response = await ai.models.generateContent({
    model: 'gemini-3.5-flash',
    contents: prompt,
    config: {
      systemInstruction: "You are a medical scheduling assistant. You output strictly valid JSON arrays.",
      responseMimeType: "application/json",
      responseSchema: responseSchema,
      temperature: 0.2
    }
  });

  if (!response.text) {
    throw new Error('Failed to generate schedule: No text content returned');
  }

  try {
    return JSON.parse(response.text);
  } catch (error) {
    console.error("[Gemini] Schedule generation failed:", error);
    throw new Error("Failed to parse schedule JSON");
  }
}
