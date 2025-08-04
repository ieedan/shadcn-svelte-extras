import type { TagsInputProps } from '$lib/components/ui/tags-input/types';

export const customValidate: TagsInputProps['validate'] = (val, tags) => {
	// trim and convert to lowercase
	const transformed = val.trim().toLowerCase();

	// disallow empties
	if (transformed.length === 0) return undefined;

	// disallow duplicates
	if (tags.find((t) => transformed === t.toLowerCase())) return undefined;

	return transformed;
};
