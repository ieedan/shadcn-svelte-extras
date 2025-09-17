<script lang="ts" module>
	export type RenameProps<TagName extends keyof HTMLElementTagNameMap> = {
		id?: string;
		this: TagName;
		mode?: 'edit' | 'view';
		blurBehavior?: 'exit' | 'none';
		value: string;
		/** Applied first to both the input and text elements*/
		class?: string;
		/** Applied to the input element, overrides class */
		inputClass?: string;
		/** Applied to the text element, overrides class */
		textClass?: string;
		/** Called when the user saves the value. Return true to accept and edit false to show and invalid state */
		onSave?: (value: string) => Promise<boolean> | boolean;
		onCancel?: () => void;
		validate?: (value: string) => boolean;
	};
</script>

<script lang="ts" generics="TagName extends keyof HTMLElementTagNameMap">
	import { cn } from '$lib/utils/utils';
	import { box } from 'svelte-toolbelt';
	import { useRenameInput } from './rename.svelte.js';

	const uid = $props.id();

	let {
		id = uid,
		this: tagName,
		mode = $bindable('view'),
		value = $bindable(),
		class: className,
		blurBehavior,
		inputClass,
		textClass,
		onSave = () => true,
		onCancel = () => {},
		validate = () => true
	}: RenameProps<TagName> = $props();

	let inputRef = $state<HTMLInputElement | null>(null);
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
		validate
	});

	const commonClass = cn('text-base', className, inputClass);
</script>

{#if mode === 'edit'}
	<input
		{id}
		bind:this={inputRef}
		type="text"
		data-mode="edit"
		class={cn(
			commonClass,
			'border-border rounded-md border outline-none',
			'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
			'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
			inputClass
		)}
		aria-invalid={rootState.invalid}
		onkeydown={rootState.onInputKeydown}
		onblur={rootState.onInputBlur}
		bind:value={rootState.editingValue}
		autocomplete="off"
	/>
{:else if mode === 'view'}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<svelte:element
		this={tagName as never}
		{id}
		data-mode="view"
		class={cn(commonClass, textClass)}
		contenteditable={rootState.providerState === undefined}
		onfocus={rootState.onTextFocus}
		bind:this={textRef}
	>
		{value}
	</svelte:element>
{/if}
