import { z } from 'zod';
import { MEGABYTE } from '$lib/components/ui/file-drop-zone';

const maxBytes = MEGABYTE * 2;

const fileWithMaxSize = z.instanceof(File).refine((file) => file.size <= maxBytes, {
	message: `Each file must be ${maxBytes} bytes or smaller`
});

export const schema = z.object({
	attachments: z.array(fileWithMaxSize)
});

export type Schema = z.infer<typeof schema>;
