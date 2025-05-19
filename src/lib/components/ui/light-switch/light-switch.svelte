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
	<SunIcon class="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
	<MoonIcon class="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
	<span class="sr-only">Toggle theme</span>
</Button>
