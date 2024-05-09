import { StreamingTextResponse, experimental_streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const result = await experimental_streamText({
    model: openai('gpt-3.5-turbo'),
    prompt,
  });

  return new StreamingTextResponse(result.toAIStream());
}
