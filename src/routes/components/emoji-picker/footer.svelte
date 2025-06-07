<script lang="ts">
	import * as EmojiPicker from '$lib/components/ui/emoji-picker';
	import { toast } from 'svelte-sonner';
</script>

<EmojiPicker.Root onSelect={(emoji) => toast.success(`You selected ${emoji}`)}>
	<EmojiPicker.Viewport>
		<EmojiPicker.Search />
		<EmojiPicker.List />
		<EmojiPicker.Footer>
			{#snippet children({ active })}
				{#if active}
					<div>{active.emoji}</div>
				{/if}
			{/snippet}
		</EmojiPicker.Footer>
	</EmojiPicker.Viewport>
</EmojiPicker.Root>
