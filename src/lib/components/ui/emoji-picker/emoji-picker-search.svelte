<script lang="ts">
	import SearchIcon from '@lucide/svelte/icons/search';
	import { Command as CommandPrimitive } from 'bits-ui';
	import type { EmojiPickerSearchProps } from './types';
	import { useEmojiPickerInput } from './emoji-picker.svelte.js';
	import { box } from 'svelte-toolbelt';

	let { value = $bindable(''), placeholder = 'Search', ...rest }: EmojiPickerSearchProps = $props();

	useEmojiPickerInput({
		value: box.with(
			() => value,
			(v) => (value = v)
		)
	});
</script>

<div class="p-2">
	<div
		class="bg-input border-input dark:bg-input/30 flex h-9 items-center gap-2 rounded-md border px-3"
	>
		<SearchIcon class="size-4 shrink-0 opacity-50" />
		<CommandPrimitive.Input
			{...rest}
			{placeholder}
			class={'placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50'}
			bind:value
		/>
	</div>
</div>
