<script lang="ts">
	import { Kbd, KbdGroup } from '#lib/components/ui/kbd/index.ts';
	import { toast } from 'svelte-sonner';
	import { shortcut } from '#lib/actions/shortcut.svelte.ts';
	import { cmdOrCtrl } from '#lib/hooks/is-mac.svelte.ts';
</script>

<!-- Ctrl/Command + 1 shortcut -->
<svelte:window
	use:shortcut={{
		key: '1',
		ctrl: true,
		callback: () => toast.success(`You pressed ${cmdOrCtrl} + 1`)
	}}
/>

<p class="flex place-items-center justify-center gap-1">
	<KbdGroup>
		<Kbd>{cmdOrCtrl}</Kbd>
		<span>+</span>
		<Kbd>1</Kbd>
	</KbdGroup>
</p>
