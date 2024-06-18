// https://docs.mistral.ai/platform/endpoints/
// https://platform.openai.com/docs/api-reference/
export type ChatModelId =
  | 'open-mistral-7b'
  | 'open-mixtral-8x7b'
  | 'open-mixtral-8x22b'
  | 'mistral-small-latest'
  | 'mistral-medium-latest'
  | 'mistral-large-latest'
  | 'gpt-3.5-turbo'
  | 'gpt-4o'
  | (string & {});

export interface ChatSettings {
  /** Whether to inject a safety prompt before all conversations. Defaults to `false`. */
  safePrompt?: boolean;
}
