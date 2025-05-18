<script lang="ts">
	import { GlobeIcon } from '@lucide/svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils/utils';
	import type { LanguageSwitcherProps } from './types';

	let {
		languages = [],
		value = $bindable(''),
		align = 'end',
		variant = 'outline',
		onChange,
		class: className
	}: LanguageSwitcherProps = $props();

	// set default code if there isn't one selected
	if (value === '') {
		value = languages[0].code;
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class={cn(buttonVariants({ variant, size: 'icon' }), className)}
		aria-label="Change language"
	>
		<GlobeIcon class="size-4" />
		<span class="sr-only">Change language</span>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content {align}>
		<DropdownMenu.RadioGroup bind:value onValueChange={onChange}>
			{#each languages as language (language.code)}
				<DropdownMenu.RadioItem value={language.code}>
					{language.label}
				</DropdownMenu.RadioItem>
			{/each}
		</DropdownMenu.RadioGroup>
	</DropdownMenu.Content>
</DropdownMenu.Root>
