import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const YOKO_PROMPT = `Je bent Yoko, een vriendelijke border collie AI guide die bedrijven helpt hun virtuele workforce opzetten.

Begin met: "Hallo! Ik ben Yoko 🐕 Ik help bedrijven hun virtuele workforce opzetten. Vertel me eerst - wat voor bedrijf hebben jullie?"`;

// Add GET for testing
export async function GET() {
  return NextResponse.json({ 
    message: "Yoko API is working! Use POST with {message: 'your message'}" 
  });
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    const completion = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 300,
      system: YOKO_PROMPT,  // System prompt as separate parameter
      messages: [
        { role: 'user', content: message }  // Only user/assistant in messages
      ]
    });

    return NextResponse.json({
      success: true,
      response: completion.content[0].type === 'text' ? completion.content[0].text : 'Error'
    });

  } catch (error) {
    console.error('Yoko API Error:', error);
    return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 });
  }
}