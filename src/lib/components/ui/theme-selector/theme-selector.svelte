<script lang="ts">
	import { SunIcon, MoonIcon } from '@lucide/svelte';
	import { resetMode, setMode } from 'mode-watcher';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';

	type Props = {
		variant?: 'outline' | 'ghost';
	};

	let { variant = 'outline' }: Props = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class={buttonVariants({ variant, size: 'icon' })}>
		<SunIcon class="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
		<MoonIcon class="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
		<span class="sr-only">Toggle theme</span>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Item onclick={() => setMode('light')}>Light</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => setMode('dark')}>Dark</DropdownMenu.Item>
		<DropdownMenu.Item onclick={() => resetMode()}>System</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
