import type { TagsComboboxProps } from '$lib/components/ui/tags-combobox/types';

export const customValidate: TagsComboboxProps['validate'] = (val, tags) => {
	// trim and convert to lowercase
	const transformed = val.trim().toLowerCase();

	// disallow empties
	if (transformed.length === 0) return undefined;

	// disallow duplicates
	if (tags.find((t) => transformed === t.toLowerCase())) return undefined;

	return transformed;
};
