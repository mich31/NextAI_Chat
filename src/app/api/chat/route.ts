import { openai } from '@ai-sdk/openai';
import { StreamingTextResponse, streamText, StreamData } from 'ai';

export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = await streamText({
        model: openai('gpt-3.5-turbo'),
        messages
    });

    const data = new StreamData();
    data.append({ test: 'value'});

    const stream = result.toAIStream({
        onFinal(completion) {
            data.close();
        },
    });

    return new StreamingTextResponse(stream, {}, data);
}
