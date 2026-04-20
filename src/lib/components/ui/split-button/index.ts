import Root from './split-button.svelte';
import Action from './split-button-action.svelte';
import Select from './split-button-select.svelte';
import SelectTrigger from './split-button-select-trigger.svelte';
import SelectAction from './split-button-select-action.svelte';
import SelectContent from './split-button-content.svelte';
// re-export select components
import {
	SelectGroup,
	SelectGroupHeading,
	SelectLabel,
	SelectSeparator
} from '$lib/components/ui/select';

export type { SplitButtonProps, SplitButtonPropsWithoutHTML } from './split-button.svelte';
export type { SplitButtonActionProps } from './split-button-action.svelte';
export type { SplitButtonSelectProps } from './split-button-select.svelte';
export type { SplitButtonSelectTriggerProps } from './split-button-select-trigger.svelte';
export type { SplitButtonSelectActionProps } from './split-button-select-action.svelte';
export type { SplitButtonClickEvent } from './split-button.svelte.js';

export {
	Root,
	Action,
	Select,
	SelectTrigger,
	SelectContent,
	SelectAction,
	SelectGroup,
	SelectGroupHeading,
	SelectLabel,
	SelectSeparator
};
