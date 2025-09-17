<script lang="ts" module>
	export type RenameProps<TagName extends keyof HTMLElementTagNameMap> = {
		id?: string;
		this: TagName;
		mode: 'edit' | 'view';
		/** Controls whether the user can focus the input or text element */
		canFocus?: boolean;
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
	};
</script>

<script lang="ts" generics="TagName extends keyof HTMLElementTagNameMap">
	import { cn } from '$lib/utils/utils';
	import { box } from 'svelte-toolbelt';
	import { useRename } from './rename.svelte.js';

	const uid = $props.id();

	let {
		id = uid,
		this: tagName,
		mode = $bindable(),
		value = $bindable(),
		canFocus = false,
		class: className,
		inputClass,
		textClass,
		onSave = () => true,
		onCancel = () => {}
	}: RenameProps<TagName> = $props();

	let inputRef = $state<HTMLInputElement | null>(null);
	let textRef = $state<HTMLElement | null>(null);

        $inspect(id)

	const rootState = useRename({
		id,
		mode: box.with(
			() => mode,
			(v) => (mode = v)
		),
		value: box.with(
			() => value,
			(v) => (value = v)
		),
		canFocus: box.with(() => canFocus),
		inputRef: box.with(
			() => inputRef,
			(v) => (inputRef = v)
		),
		textRef: box.with(
			() => textRef,
			(v) => (textRef = v)
		),
		onSave,
		onCancel
	});

	const commonClass = cn('text-base w-[225px]', className, inputClass);
</script>

{#if mode === 'edit'}
	<input
		{id}
		bind:this={inputRef}
		type="text"
		class={cn(commonClass, inputClass)}
		onkeydown={rootState.onInputKeydown}
		onblur={rootState.onInputBlur}
		bind:value={rootState.editingValue}
	/>
{:else if mode === 'view'}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<svelte:element
		this={tagName as never}
		{id}
		class={cn(commonClass, textClass)}
		contenteditable={canFocus}
		onfocus={rootState.onTextFocus}
		bind:this={textRef}
	>
		{value}
	</svelte:element>
{/if}
