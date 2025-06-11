<script lang="ts">
	import * as EmojiPicker from '$lib/components/ui/emoji-picker';
	import { toast } from 'svelte-sonner';
</script>

<div class="flex flex-col place-items-center gap-4">
	<EmojiPicker.Root
		showRecents
		recentsKey="emoji-picker-recents"
		onSelect={(selected) => toast.success(`You selected ${selected.emoji}`)}
	>
		<EmojiPicker.Viewport>
			<EmojiPicker.Search />
			<EmojiPicker.List />
		</EmojiPicker.Viewport>
	</EmojiPicker.Root>
	<p class="text-muted-foreground text-center text-sm">Pick an emoji to add it to your recents.</p>
</div>
