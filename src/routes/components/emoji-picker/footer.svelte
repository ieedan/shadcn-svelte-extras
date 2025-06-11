<script lang="ts">
	import * as EmojiPicker from '$lib/components/ui/emoji-picker';
	import type { EmojiPickerSkin } from '$lib/components/ui/emoji-picker';
	import { PersistedState } from 'runed';
	import { toast } from 'svelte-sonner';

	const skin = new PersistedState<EmojiPickerSkin>('emoji-picker-skin', 0);
</script>

<EmojiPicker.Root
	bind:skin={skin.current}
	onSelect={(selected) => toast.success(`You selected ${selected.emoji}`)}
>
	<EmojiPicker.Viewport>
		<EmojiPicker.Search />
		<EmojiPicker.List />
		<EmojiPicker.Footer class="flex max-w-full place-items-center gap-2 px-2">
			{#snippet children({ active })}
				{#if active}
					<div class="flex w-[calc(100%-40px)] items-center gap-2">
						<span class="text-lg">{active.emoji}</span>
						<span class="text-muted-foreground truncate text-xs">
							{active.data.name}
						</span>
					</div>
				{/if}
				<EmojiPicker.SkinToneSelector previewEmoji="🫵" />
			{/snippet}
		</EmojiPicker.Footer>
	</EmojiPicker.Viewport>
</EmojiPicker.Root>
