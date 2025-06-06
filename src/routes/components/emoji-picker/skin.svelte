<script lang="ts">
	import * as EmojiPicker from '$lib/components/ui/emoji-picker';
	import { toast } from 'svelte-sonner';
</script>

<EmojiPicker.Root skin="👋🏽" onSelect={(emoji) => toast.success(`You selected ${emoji}!`)}>
	<EmojiPicker.Viewport>
		<EmojiPicker.Picker search="hand" />
	</EmojiPicker.Viewport>
</EmojiPicker.Root>
