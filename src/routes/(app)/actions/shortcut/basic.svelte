<script lang="ts">
	import { Kbd, KbdGroup } from '$lib/components/ui/kbd';
	import { toast } from 'svelte-sonner';
	// import shortcut
	import { shortcut } from '$lib/actions/shortcut.svelte';
</script>

<!-- Ctrl/Command + 1 shortcut -->
<svelte:window
	use:shortcut={{
		key: '1',
		ctrl: true,
		callback: () => toast.success('You pressed Ctrl + 1')
	}}
/>

<p class="flex place-items-center justify-center gap-1">
	<KbdGroup>
		<Kbd>⌘</Kbd>
		<span>+</span>
		<Kbd>1</Kbd>
	</KbdGroup>
</p>
