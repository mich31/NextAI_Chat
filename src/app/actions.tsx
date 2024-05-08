'use server'

import { createStreamableValue, createStreamableUI, createAI, getMutableAIState } from 'ai/rsc';
import { CoreMessage, generateText, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { ReactNode } from 'react';

// Define the AI state and UI state types
export type AIState = Array<{
    role: 'user' | 'assistant';
    content: string;
}>;
  
export type UIState = Array<{
    id: string;
    role: 'user' | 'assistant';
    display: ReactNode;
}>;

// Create the AI provider with the initial states and allowed actions
export const AI = createAI({
    initialAIState: [] as AIState,
    initialUIState: [] as UIState,
    actions: {
        sendMessage,
    },
});

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
}

export async function sendMessage(message: string) {
    'use server';

    const history = getMutableAIState();

    // Update the AI state with the new user message.
    history.update([...history.get(), { role: 'user', content: message }]);

    const response = await generateText({
        model: openai('gpt-3.5-turbo'),
        messages: history.get(),
    });

    // Update the AI state again with the response from the model.
    history.done([...history.get(), { role: 'assistant', content: response.text }]);

    return response.text;
}
