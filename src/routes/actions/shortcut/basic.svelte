<script lang="ts">
	import { Kbd } from '$lib/components/ui/kbd';
	import { CommandIcon } from '@lucide/svelte';
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
	<Kbd variant="secondary" size="lg"><CommandIcon class="inline size-4" /> + 1</Kbd>
</p>
