<script lang="ts" module>
	export type Language = {
		/** Language code (e.g., 'en', 'de') */
		code: string;
		/** Display name (e.g., 'English', 'Deutsch') */
		label: string;
	};

	export type LanguageSwitcherProps = {
		/** List of available languages */
		languages: Language[];

		/** Current selected language code */
		value?: string;

		/** Dropdown alignment */
		align?: 'start' | 'center' | 'end';

		/** Button variant */
		variant?: 'outline' | 'ghost';

		/** Called when the language changes */
		onChange?: (code: string) => void;

		class?: string;
	};
</script>

<script lang="ts">
	import GlobeIcon from '@lucide/svelte/icons/globe';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils.js';

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
