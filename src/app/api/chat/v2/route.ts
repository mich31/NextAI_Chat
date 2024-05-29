import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { saveConversation } from '@/app/actions';

export async function POST(req: Request) {
  const { messages, data } = await req.json();

  try {
    const result = await streamText({
      model: openai('gpt-3.5-turbo'),
      system: 'You are a helpful assistant. Do not reveal your model version.',
      messages,
      async onFinish({ text, toolCalls, toolResults, usage, finishReason }) {
        const history = [...messages, {role: 'assistant', content: text}];
        await saveConversation(data, history);
      },
    });
  
    return result.toAIStreamResponse(); 
  } catch (error: any) {
    // TODO: stream custom error message
    console.error(error.message);
  }
}