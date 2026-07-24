import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const apiKey = process.env.ANTHROPIC_API_KEY || 'missing_key';
const anthropic = new Anthropic({ apiKey });

export async function POST(req: Request) {
  try {
    const { imageBase64, mimeType } = await req.json();

    if (!imageBase64 || !mimeType) {
      return NextResponse.json({ error: "Missing image data" }, { status: 400 });
    }

    if (apiKey === 'missing_key') {
      return NextResponse.json({ error: "ANTHROPIC_API_KEY not configured" }, { status: 500 });
    }

    // Anthropic API uses image media types like image/jpeg, image/png
    let mediaType = mimeType;
    if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(mediaType)) {
      mediaType = 'image/jpeg'; // fallback
    }

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-latest',
      max_tokens: 1024,
      system: "You are an AI assistant that extracts medication information from images of prescription or OTC medication labels. You strictly output JSON with exactly three keys: 'name', 'dosage', and 'frequency'. Do not include any other text or markdown formatting outside the JSON object.",
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
                data: imageBase64,
              },
            },
            {
              type: 'text',
              text: 'Extract the medication name, dosage (e.g., 500mg), and frequency (e.g., Take 1 tablet daily) from this medication label.',
            },
          ],
        },
      ],
      temperature: 0.1,
    });

    const textContent = response.content.find(c => c.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error("Failed to extract data: No text content returned");
    }
    
    // Parse the JSON string
    // Occasionally Claude wraps JSON in markdown blocks despite instructions
    let jsonStr = textContent.text.trim();
    if (jsonStr.startsWith('```json')) {
      jsonStr = jsonStr.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/^```/, '').replace(/```$/, '').trim();
    }

    const data = JSON.parse(jsonStr);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("[POST /api/medications/scan]", error);
    return NextResponse.json({ error: "Failed to process image" }, { status: 500 });
  }
}
