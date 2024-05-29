'use server'

import { createStreamableValue, createStreamableUI, createAI, getMutableAIState } from 'ai/rsc';
import { CoreMessage, generateText, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { ReactNode } from 'react';
import { sql } from '@vercel/postgres';
import { User } from '@/lib/hooks/use-user-profile';

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
        saveConversation,
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
        try {
            weatherUI.done(<div>It&lsquo;s a sunny day!</div>);
        } catch (e: any) {
            weatherUI.error(<div>Error: {e.message}</div>);
        }
    }, 3000);

    return weatherUI.value;
}

export async function runThread() {
    const streamableStatus = createStreamableValue('thread.init');
  
    setTimeout(() => {
        try {
            streamableStatus.update('thread.run.create');
            streamableStatus.update('thread.run.update');
            streamableStatus.update('thread.run.end');
            streamableStatus.done('thread.end');
        } catch (e: any) {
            return { error: e.message };
        }
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

export async function saveConversation(userInfo: User & {conversationId: string, action: 'create' | 'update'}, messages: CoreMessage[]) {
    try {
        if(userInfo.action === 'create') {
            console.log(`Creating conversation (id: ${userInfo.conversationId})..`);
            const response = await generateText({
                model: openai('gpt-3.5-turbo'),
                messages: [...messages, { role: 'user', content: 'Give a title summarizing our current discussion' }],
            });
            const title = response.text;
            await sql`
                INSERT INTO conversations (id, username, email, title, content)
                VALUES (${userInfo.conversationId}, ${userInfo.userName}, ${userInfo.emailAddress}, ${title}, ${JSON.stringify(messages)});
            `;
            console.log(`Conversation (id: ${userInfo.conversationId}) created`);
        } else {
            console.log(`Updating conversation (id: ${userInfo.conversationId})..`);
            await sql` UPDATE SET content = ${JSON.stringify(messages)} WHERE id = ${userInfo.conversationId}; `;
            console.log(`Conversation (id: ${userInfo.conversationId}) updated`);
        }
    } catch (error) {
        console.error('Failed to save conversation:', error);
    }
}
