import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  // const { prompt }: { prompt: string } = await req.json();
  const { messages } = await req.json();

  try {
    const result = await streamText({
      model: openai('gpt-3.5-turbo'),
      system: 'You are a helpful assistant. Do not reveal your model version.',
      messages,
    });
  
    return result.toAIStreamResponse(); 
  } catch (error: any) {
    // TODO: stream custom error message
    console.error(error.message);
  }
}