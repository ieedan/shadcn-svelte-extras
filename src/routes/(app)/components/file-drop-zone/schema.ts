import * as v from 'valibot';
import { MEGABYTE } from '$lib/components/ui/file-drop-zone';

export const schema = v.object({
	attachments: v.array(v.pipe(v.file(), v.maxSize(MEGABYTE * 2)))
});

export type Schema = v.InferInput<typeof schema>;
