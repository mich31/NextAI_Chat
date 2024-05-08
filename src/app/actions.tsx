'use server'

import { createStreamableValue, createStreamableUI } from 'ai/rsc';
import { CoreMessage, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function continueConversation(messages: CoreMessage[]) {
    const result = await streamText({
        model: openai('gpt-3.5-turbo'),
        messages
    });

    const data = { test: 'hello' }
    const stream = createStreamableValue(result.textStream);
    return { message: stream.value, data };
}

export async function getWeather() {
    const weatherUI = createStreamableUI();

    weatherUI.update(<div style={{ color: 'gray' }}>Loading...</div>);

    setTimeout(() => {
        weatherUI.done(<div>It&lsquo;s a sunny day!</div>);
    }, 3000);

    return weatherUI.value;
}

export async function runThread() {
    const streamableStatus = createStreamableValue('thread.init');
  
    setTimeout(() => {
        streamableStatus.update('thread.run.create');
        streamableStatus.update('thread.run.update');
        streamableStatus.update('thread.run.end');
        streamableStatus.done('thread.end');
    }, 1000);
  
    return { status: streamableStatus.value };
  };
