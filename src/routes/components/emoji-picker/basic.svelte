<script lang="ts">
	import * as EmojiPicker from '$lib/components/ui/emoji-picker';
	import { toast } from 'svelte-sonner';
</script>

<EmojiPicker.Root onSelect={(emoji) => toast.success(`You selected ${emoji}`)}>
	<EmojiPicker.Viewport>
		<EmojiPicker.Search />
		<EmojiPicker.List />
	</EmojiPicker.Viewport>
</EmojiPicker.Root>
