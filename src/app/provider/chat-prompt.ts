export type ChatPrompt = Array<ChatMessage>;

export type ChatMessage = SystemMessage | UserMessage | AssistantMessage | ToolMessage;

export interface SystemMessage {
    role: 'system';
    content: string;
};

export interface UserMessage {
    role: 'user';
    content: string;
};

export interface AssistantMessage {
    role: 'assistant';
    content: string;
    tool_calls?: Array<{ id: string; type: 'function'; function: { name: string; arguments: string } }>;
};

export interface ToolMessage {
    role: 'tool';
    name: string;
    content: string;
};
