'use server'

import { createStreamableValue, createStreamableUI, createAI, getMutableAIState } from 'ai/rsc';
import { CoreMessage, generateText, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { ReactNode } from 'react';
import { sql } from '@vercel/postgres';
import { User } from '@/lib/hooks/use-user-profile';
import { notFound } from 'next/navigation';

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

export type History = {
    count: number;
    conversations: Array<any>;
};

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

export async function getConversationList(user: User): Promise<History> {
    try {
        console.log(`Fetching conversation list for user ${user.emailAddress}`);
        const {rowCount, rows} = await sql`
            SELECT id, title, updated_at FROM conversations WHERE email = ${user.emailAddress} ORDER BY updated_at DESC;
        `;
        console.log(`${rowCount} conversation(s) found for ${user.emailAddress}`);
        return { count: rowCount, conversations: rows };
    } catch (error) {
        console.error(`Failed to fetch conversation list for user ${user.emailAddress}: ${error}`);
        return { count: 0, conversations: []};
    }
}

export async function getConversation(id: string, user: User) {
    try {
        console.log(`Fetching conversation for user ${user.emailAddress}`);
        const {rowCount, rows} = await sql`
            SELECT * FROM conversations WHERE id = ${id} AND email = ${user.emailAddress};
        `;
        if(rowCount !==  1) {
            console.error(`No conversation found for user ${user.emailAddress} (id: ${id})`);
            return notFound();
        }
        console.log(`${rowCount} conversation found for ${user.emailAddress}`);
        return rows[0];
    } catch (error) {
        console.error(`Failed to fetch conversation for user ${user.emailAddress}: ${error}`);
        throw error;
    }
}

export async function saveConversation(userInfo: User & {conversationId: string, action: 'create' | 'update'}, messages: CoreMessage[]) {
    if(!userInfo) return;

    const currentUtcTime = (new Date()).toUTCString();
    try {
        if(userInfo.action === 'create') {
            console.log(`Creating conversation (id: ${userInfo.conversationId})..`);
            const response = await generateText({
                model: openai('gpt-3.5-turbo'),
                messages: [...messages, { role: 'user', content: 'Give a title summarizing our current discussion' }],
            });
            const title = response.text.replace(/^"|"$/g, '');
            await sql`
                INSERT INTO conversations (id, username, email, title, content, created_at, updated_at)
                VALUES (${userInfo.conversationId}, ${userInfo.userName}, ${userInfo.emailAddress}, ${title}, ${JSON.stringify(messages)}, ${currentUtcTime}, ${currentUtcTime});
            `;
            console.log(`Conversation (id: ${userInfo.conversationId}) created`);
        } else {
            console.log(`Updating conversation (id: ${userInfo.conversationId})..`);
            await sql` 
                UPDATE conversations SET content = ${JSON.stringify(messages)}, updated_at = ${currentUtcTime}
                WHERE id = ${userInfo.conversationId};
            `;
            console.log(`Conversation (id: ${userInfo.conversationId}) updated`);
        }
    } catch (error) {
        console.error('Failed to save conversation:', error);
    }
}
