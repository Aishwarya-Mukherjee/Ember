import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import prisma from '@/lib/prisma';
import { evaluateSymptomRisk, evaluateVitalsRisk } from '@/lib/server/riskEngine';

// Optional API Key, allows the server to start without it and error gracefully at runtime
const apiKey = process.env.ANTHROPIC_API_KEY || 'missing_key';
const anthropic = new Anthropic({ apiKey });

export async function POST(request: Request) {
  try {
    const { text, patientId } = await request.json();

    if (!text || !patientId) {
      return NextResponse.json({ error: 'Missing text or patientId' }, { status: 400 });
    }
    
    if (apiKey === 'missing_key') {
      console.warn("[API/Chat] ANTHROPIC_API_KEY is missing. Cannot perform extraction.");
      return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured on server' }, { status: 500 });
    }

    const response = await anthropic.messages.create({
      model: 'claude-3-5-haiku-latest',
      max_tokens: 1024,
      system: `You are a medical data extraction assistant. Your job is to extract structured vitals and symptoms from free-text patient logs. Use the provided tool to return the structured data. Do not add conversational text.`,
      messages: [{ role: 'user', content: text }],
      tools: [
        {
          name: 'record_health_data',
          description: 'Record extracted vitals and symptoms',
          input_schema: {
            type: 'object',
            properties: {
              vitals: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    type: { type: 'string', description: "e.g., 'blood_sugar', 'blood_pressure', 'weight', 'temperature'" },
                    value: { type: 'number' },
                    unit: { type: 'string', description: "e.g., 'mg/dL', 'mmHg', 'kg', 'F'" },
                  },
                  required: ['type', 'value', 'unit'],
                },
              },
              symptoms: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    symptoms: { type: 'array', items: { type: 'string' }, description: "List of identified symptoms like 'dizziness', 'fatigue', 'nausea'" },
                    severity: { type: 'number', description: "Estimated severity from 1 to 5" },
                  },
                  required: ['symptoms', 'severity'],
                },
              },
            },
            required: ['vitals', 'symptoms'],
          },
        },
      ],
      tool_choice: { type: 'tool', name: 'record_health_data' },
    });

    const toolCall = response.content.find((c) => c.type === 'tool_use');
    if (!toolCall || toolCall.type !== 'tool_use') {
      return NextResponse.json({ error: 'Failed to extract data' }, { status: 500 });
    }

    const { vitals, symptoms } = toolCall.input as { 
      vitals: Array<{ type: string; value: number; unit: string }>;
      symptoms: Array<{ symptoms: string[]; severity: number }>;
    };

    const savedVitals = [];
    const savedSymptoms = [];

    // Save vitals
    for (const v of vitals) {
      const entry = await prisma.vitalsEntry.create({
        data: {
          patientId,
          type: v.type,
          value: v.value,
          unit: v.unit,
          timestamp: new Date(),
        }
      });
      // Evaluate risk rules synchronously
      await evaluateVitalsRisk(patientId);
      savedVitals.push(entry);
    }

    // Save symptoms
    for (const s of symptoms) {
      const entry = await prisma.symptomLog.create({
        data: {
          patientId,
          symptoms: s.symptoms,
          severity: s.severity,
          rawText: text,
          timestamp: new Date(),
        }
      });
      // Evaluate risk rules synchronously
      await evaluateSymptomRisk(patientId);
      savedSymptoms.push(entry);
    }

    return NextResponse.json({ vitals: savedVitals, symptoms: savedSymptoms }, { status: 201 });
  } catch (error) {
    console.error("[API/Chat] error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
