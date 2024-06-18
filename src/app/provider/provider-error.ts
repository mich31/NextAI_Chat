import { createJsonErrorResponseHandler } from '@ai-sdk/provider-utils';
import { z } from 'zod';

const errorDataSchema = z.object({
    object: z.literal('error'),
    message: z.string(),
    type: z.string(),
    param: z.string().nullable(),
    code: z.string().nullable(),
});

export type ErrorData = z.infer<typeof errorDataSchema>;

export const failedResponseHandler = createJsonErrorResponseHandler({
    errorSchema: errorDataSchema,
    errorToMessage: data => data.message,
});
