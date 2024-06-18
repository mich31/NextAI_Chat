export type EmbeddingModelId = 'mistral-embed' | (string & {}); //  TODO: review default value

export interface EmbeddingSettings {
    /** Override the maximum number of embeddings per call.*/
    maxEmbeddingsPerCall?: number;

    /** Override the parallelism of embedding calls.*/
    supportsParallelCalls?: boolean;
}
