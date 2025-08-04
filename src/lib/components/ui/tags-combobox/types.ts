import type { HTMLInputAttributes } from 'svelte/elements';

export type TagsComboboxOption = {
	value: string;
	label: string;
};

export type TagsComboboxPropsWithoutHTML = {
	value?: string[];
	options?: TagsComboboxOption[];
	validate?: (val: string, tags: string[]) => string | undefined;
	onOptionSelect?: (option: TagsComboboxOption) => void;
};

export type TagsComboboxProps = TagsComboboxPropsWithoutHTML & Omit<HTMLInputAttributes, 'value'>;
