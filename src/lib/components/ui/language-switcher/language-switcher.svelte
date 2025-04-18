<script lang="ts">
	import { Globe } from '@lucide/svelte';
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

	// Set default value if none provided
	$effect(() => {
		if (!value && languages.length > 0) {
			value = languages[0].code;
		}
	});

	// Call onChange when value changes
	$effect(() => {
		if (onChange && value) {
			onChange(value);
		}
	});
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class={cn(buttonVariants({ variant, size: 'icon' }), className)}
		aria-label="Change language"
	>
		<Globe class="size-4" />
		<span class="sr-only">Change language</span>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content {align}>
		<DropdownMenu.RadioGroup bind:value>
			{#each languages as language (language.code)}
				<DropdownMenu.RadioItem value={language.code}>
					{language.label}
				</DropdownMenu.RadioItem>
			{/each}
		</DropdownMenu.RadioGroup>
	</DropdownMenu.Content>
</DropdownMenu.Root>
