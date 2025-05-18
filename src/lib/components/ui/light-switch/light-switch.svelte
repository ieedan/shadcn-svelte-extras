<script lang="ts">
	import { SunIcon, MoonIcon } from '@lucide/svelte';
	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';

	type Props = {
		variant?: 'outline' | 'ghost';
	};

	let { variant = 'outline' }: Props = $props();
</script>

<Button onclick={toggleMode} {variant} size="icon">
	<SunIcon class="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
	<MoonIcon class="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
	<span class="sr-only">Toggle theme</span>
</Button>
