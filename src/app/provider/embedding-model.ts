import { EmbeddingModelV1, TooManyEmbeddingValuesForCallError } from '@ai-sdk/provider';
import { createJsonResponseHandler, postJsonToApi } from '@ai-sdk/provider-utils';
import { z } from 'zod';
import { EmbeddingModelId, EmbeddingSettings } from './embedding-settings';
import { failedResponseHandler } from './provider-error';
  
type EmbeddingConfig = {
    provider: string;
    baseURL: string;
    headers: () => Record<string, string | undefined>;
};
  
export class EmbeddingModel implements EmbeddingModelV1<string> {
    readonly specificationVersion = 'v1';
    readonly modelId: EmbeddingModelId;
  
    private readonly config: EmbeddingConfig;
    private readonly settings: EmbeddingSettings;
  
    get provider(): string {
        return this.config.provider;
    }
  
    get maxEmbeddingsPerCall(): number {
        return this.settings.maxEmbeddingsPerCall ?? 32;
    }
  
    get supportsParallelCalls(): boolean {
        // Parallel calls are technically possible,
        // but I have been hitting rate limits and disable them for now.
        return this.settings.supportsParallelCalls ?? false;
    }
  
    constructor(modelId: EmbeddingModelId, settings: EmbeddingSettings, config: EmbeddingConfig) {
        this.modelId = modelId;
        this.settings = settings;
        this.config = config;
    }
  
    async doEmbed(
        { values, abortSignal }: Parameters<EmbeddingModelV1<string>['doEmbed']>[0]
    ): Promise<Awaited<ReturnType<EmbeddingModelV1<string>['doEmbed']>>> {
        if (values.length > this.maxEmbeddingsPerCall) {
            throw new TooManyEmbeddingValuesForCallError({
                provider: this.provider,
                modelId: this.modelId,
                maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
                values,
            });
        }
  
        const { responseHeaders, value: response } = await postJsonToApi({
            url: `${this.config.baseURL}/embeddings`,
            headers: this.config.headers(),
            body: { model: this.modelId, input: values, encoding_format: 'float' },
            failedResponseHandler: failedResponseHandler,
            successfulResponseHandler: createJsonResponseHandler(TextEmbeddingResponseSchema),
            abortSignal,
        });
  
        return {
                embeddings: response.data.map(item => item.embedding),
                rawResponse: { headers: responseHeaders },
        };
    }
}
  
// minimal version of the schema, focused on what is needed for the implementation
// this approach limits breakages when the API changes and increases efficiency
const TextEmbeddingResponseSchema = z.object({
    data: z.array(
        z.object({ embedding: z.array(z.number()) }),
    ),
});
