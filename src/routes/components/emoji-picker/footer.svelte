<script lang="ts">
	import * as EmojiPicker from '$lib/components/ui/emoji-picker';
	import { toast } from 'svelte-sonner';
</script>

<EmojiPicker.Root onSelect={(selected) => toast.success(`You selected ${selected.emoji}`)}>
	<EmojiPicker.Viewport>
		<EmojiPicker.Search />
		<EmojiPicker.List />
		<EmojiPicker.Footer>
			{#snippet children({ active })}
				{#if active}
					<div class="flex max-w-full items-center gap-2">
						<span class="text-lg">{active.emoji}</span>
						<span class="text-muted-foreground truncate text-xs">
							{active.data.name}
						</span>
					</div>
				{/if}
			{/snippet}
		</EmojiPicker.Footer>
	</EmojiPicker.Viewport>
</EmojiPicker.Root>
