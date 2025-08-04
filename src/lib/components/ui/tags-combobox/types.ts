import type { HTMLInputAttributes } from 'svelte/elements';

export type TagsComboboxPropsWithoutHTML = {
	value?: string[];
	validate?: (val: string, tags: string[]) => string | undefined;
};

export type TagsComboboxProps = TagsComboboxPropsWithoutHTML & Omit<HTMLInputAttributes, 'value'>;
