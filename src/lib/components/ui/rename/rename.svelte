<script lang="ts" module>
	export type RenameProps<TagName extends TextElementTagNames> = {
		id?: string;
		this: TagName;
		inputTag?: 'input' | 'textarea';
		mode?: 'edit' | 'view';
		blurBehavior?: 'exit' | 'none';
		fallbackSelectionBehavior?: 'start' | 'end' | 'all';
		value: string;
		/** Applied first to both the input and text elements*/
		class?: string;
		/** Applied to the input element, overrides class */
		inputClass?: string;
		/** Applied to the text element, overrides class */
		textClass?: string;
		/** Called when the user saves the value. Return true to accept and edit false to show and invalid state */
		onSave?: (value: string) => void;
		onCancel?: () => void;
		validate?: (value: string) => boolean;
	};
</script>

<script lang="ts" generics="TagName extends TextElementTagNames">
	import { cn } from '$lib/utils.js';
	import { box } from 'svelte-toolbelt';
	import { useRenameInput } from './rename.svelte.js';
	import type { TextElementTagNames } from './types.js';

	const uid = $props.id();

	let {
		id = uid,
		this: tagName,
		inputTag = 'input',
		mode = $bindable('view'),
		value = $bindable(),
		class: className,
		blurBehavior,
		fallbackSelectionBehavior = 'end',
		inputClass,
		textClass,
		onSave = () => {},
		onCancel = () => {},
		validate = () => true
	}: RenameProps<TagName> = $props();

	let inputRef = $state<HTMLInputElement | HTMLTextAreaElement | null>(null);
	let textRef = $state<HTMLElement | null>(null);

	const rootState = useRenameInput({
		id,
		mode: box.with(
			() => mode,
			(v) => (mode = v)
		),
		value: box.with(
			() => value,
			(v) => (value = v)
		),
		inputRef: box.with(
			() => inputRef,
			(v) => (inputRef = v)
		),
		textRef: box.with(
			() => textRef,
			(v) => (textRef = v)
		),
		onSave,
		onCancel,
		blurBehavior: box.with(() => blurBehavior),
		validate,
		fallbackSelectionBehavior: box.with(() => fallbackSelectionBehavior)
	});

	const commonClass = cn('text-base min-w-0 w-full');

	const inputProps = $derived({
		'data-mode': 'edit',
		id,
		class: cn(
			commonClass,
			'border-border rounded-md border outline-none',
			'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
			'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
			className,
			inputClass
		),
		'aria-invalid': rootState.invalid,
		onkeydown: rootState.onInputKeydown,
		onblur: rootState.onInputBlur
	});
</script>

{#if mode === 'edit'}
	{#if inputTag === 'textarea'}
		<textarea bind:this={inputRef} bind:value={rootState.editingValue} {...inputProps}></textarea>
	{:else}
		<input
			bind:this={inputRef}
			type="text"
			autocomplete="off"
			bind:value={rootState.editingValue}
			{...inputProps}
		/>
	{/if}
{:else if mode === 'view'}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<svelte:element
		this={tagName as never}
		{id}
		data-mode="view"
		class={cn(commonClass, className, textClass)}
		onclick={rootState.onTextClick}
		bind:this={textRef}
	>
		{value}
	</svelte:element>
{/if}
