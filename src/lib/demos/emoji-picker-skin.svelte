<script lang="ts">
	import * as EmojiPicker from '$lib/components/ui/emoji-picker';
	import { toast } from 'svelte-sonner';
</script>

<EmojiPicker.Root
	disableInitialScroll
	skin={3}
	onSelect={(selected) => toast.success(`You selected ${selected.emoji}`)}
>
	<EmojiPicker.Viewport>
		<EmojiPicker.Search value="hand" />
		<EmojiPicker.List />
	</EmojiPicker.Viewport>
</EmojiPicker.Root>

