import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages } from 'ai';
import arcjet, { detectBot, shield, tokenBucket } from '@arcjet/next';
import { NextResponse } from 'next/server';
import { QUALTEC_SYSTEM_PROMPT } from '@/lib/ai/system-prompt';

// 1. Initialize Arcjet
const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({ mode: 'LIVE' }), // Protect against common attacks (SQLi, XSS)
    detectBot({ mode: 'LIVE', allow: ['CATEGORY:SEARCH_ENGINE'] }), // Block scraper bots
    tokenBucket({
      mode: 'LIVE',
      characteristics: ['ip.src'], // Rate limit by IP
      refillRate: 5, // 5 messages
      interval: 60, // per 60 seconds
      capacity: 10, // allow a burst of up to 10
    }),
  ],
});

export const maxDuration = 30;

export async function POST(req: Request) {
  if (process.env.DEMO_MODE === 'true') {
    return NextResponse.json(
      { error: 'Demo mode is enabled' },
      { status: 403 },
    );
  }

  // 2. Run Arcjet protection
  const decision = await aj.protect(req, {
    requested: 1,
  });

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { messages } = await req.json();

  // 3. Stateless AI Call
  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: QUALTEC_SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
