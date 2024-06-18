import { generateId, loadApiKey, withoutTrailingSlash } from '@ai-sdk/provider-utils';
import { ChatLanguageModel } from './chat-language-model';
import { ChatModelId, ChatSettings } from './chat-settings';
import { EmbeddingModel } from './embedding-model';
import { EmbeddingModelId, EmbeddingSettings } from './embedding-settings'

// model factory function with additional methods and properties
export interface CustomProvider {
    (modelId: ChatModelId, settings?: ChatSettings): ChatLanguageModel;
  
    // Creates a model for text generation.
    chat(modelId: ChatModelId, settings?: ChatSettings): ChatLanguageModel;

     // Creates a model for text embeddings.
    embedding(modelId: EmbeddingModelId, settings?: EmbeddingSettings): EmbeddingModel;
}

export interface CustomProviderSettings {
    /**
        Use a different URL prefix for API calls, e.g. to use proxy servers.
        The default prefix is `https://api.openai.com/v1`.
    */
    baseURL?: string;
  
    /**
     @deprecated Use `baseURL` instead.
    */
    baseUrl?: string;
  
    /**
        API key that is being send using the `Authorization` header.
        It defaults to the `AI_PROVIDER_API_KEY` environment variable.
     */
    apiKey?: string;
  
    /** Custom headers to include in the requests.*/
    headers?: Record<string, string>;
  
    generateId?: () => string;
}

/**
Create a custom provider instance.
 */
export function createProvider(options: CustomProviderSettings = {}): CustomProvider {
    const baseURL = withoutTrailingSlash(options.baseURL ?? options.baseUrl) ?? 'https://api.mistral.ai/v1'; // TODO: Review default URL
  
    const getHeaders = () => ({
        Authorization: `Bearer ${loadApiKey({
            apiKey: options.apiKey,
            environmentVariableName: 'AI_PROVIDER_API_KEY',
            description: 'AI custom provider',
        })}`,
        ...options.headers,
    });
  
    const createChatModel = (modelId: ChatModelId, settings: ChatSettings = {}) =>
        new ChatLanguageModel(modelId, settings, {
            provider: 'chat', // TODO: Set a generic value (example: 'mistral.chat')
            baseURL,
            headers: getHeaders,
            generateId: options.generateId ?? generateId,
        });
  
    const createEmbeddingModel = (modelId: EmbeddingModelId, settings: EmbeddingSettings = {}) =>
        new EmbeddingModel(modelId, settings, {
            provider: 'embedding', // TODO: Set a generic value (example: 'mistral.embedding')
            baseURL,
            headers: getHeaders,
        });
  
    const provider = function (modelId: ChatModelId, settings?: ChatSettings) {
        if(new.target) {
            throw new Error('This model function cannot be called with the new keyword.'); // TODO: Make this error message model-agnostic
            //throw new Error('The Mistral model function cannot be called with the new keyword.');
        }
        return createChatModel(modelId, settings);
    };
  
    provider.chat = createChatModel;
    provider.embedding = createEmbeddingModel;
  
    return provider as CustomProvider;
}
  
/**
    Default custom provider instance.
*/
export const customProvider = createProvider({
    baseURL: process.env.AI_PROVIDER_BASE_URL,
    apiKey: process.env.AI_PROVIDER_API_KEY
});
