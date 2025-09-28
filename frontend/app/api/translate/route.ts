import { NextResponse } from 'next/server';
import { findMatch } from '@/lib/eliteBallKnowledge';
import { expandSentenceButThreaded } from '@/lib/gptRequest';

export async function POST(request: Request) {
  try {
    const { textInput } = await request.json();

    if (!textInput?.trim()) {
      return NextResponse.json({ error: "Empty input" }, { status: 400 });
    }

    // Step 1: Find match using the dictionary
    const substitution = findMatch(textInput);

    // Step 2: Expand the sentence using the AI models
    const result = await expandSentenceButThreaded(substitution);

    return NextResponse.json({
      original: textInput,
      translated: result
    });

  } catch (error) {
    console.error("Error in translate API:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}