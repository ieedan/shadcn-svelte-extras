<script lang="ts">
	import * as Popover from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';
	import * as Command from '$lib/components/ui/command';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Check, ChevronsUpDown } from '@lucide/svelte';
	import { cn } from '$lib/utils/utils';
	import Flag from './flag.svelte';
	import type { Country, CountryCode } from 'svelte-tel-input/types';

	interface Props {
		/** List of countries */
		countries: Country[];
		disabled?: boolean;
		selected?: CountryCode | null;
		onselect?: (val: CountryCode | null) => void;
		/** Default ordering is alphabetical by country name supply this function to customize the sorting behavior  */
		order?: (a: Country, b: Country) => number;
	}

	let {
		countries,
		disabled = false,
		selected = $bindable(null),
		onselect = undefined,
		order = (a, b) => {
			return a.name.localeCompare(b.name);
		}
	}: Props = $props();

	let selectedCountry = $derived(countries.find((a) => a.iso2 == selected));

	let open = $state(false);
	let selectedValue = $state(false);

	const selectCountry = (country: Country) => {
		selected = country.iso2;
		selectedValue = true;
		open = false;
		onselect?.(selected);
	};
</script>

<Popover.Root bind:open>
	<Popover.Trigger>
		{#snippet child({ props })}
			<Button
				type="button"
				variant="outline"
				class={cn('flex shrink-0 gap-1 rounded-e-none rounded-s-lg px-3')}
				{disabled}
				{...props}
			>
				<Flag country={selectedCountry} />
				<ChevronsUpDown
					class={cn('-mr-2 h-4 w-4 opacity-50', disabled ? 'hidden' : 'opacity-100')}
				/>
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content
		class="w-[300px] p-0"
		onCloseAutoFocus={(e) => {
			if (selectedValue) {
				selectedValue = false;
				e.preventDefault();
			}
		}}
	>
		<Command.Root>
			<Command.Input placeholder="Search country..." />
			<Command.List>
				<ScrollArea class="h-72">
					<Command.Empty>No country found.</Command.Empty>
					<Command.Group>
						{#each countries.sort(order) as country (country.id)}
							<Command.Item
								class="gap-2"
								value={country.name}
								onSelect={() => selectCountry(country)}
							>
								<Flag {country} />
								<span class="flex-1 text-sm">{country.name}</span>
								<span class="text-sm text-foreground/50">
									+{country.dialCode}
								</span>
								<div class="w-4">
									{#if country.iso2 == selected}
										<Check class="size-4" />
									{/if}
								</div>
							</Command.Item>
						{/each}
					</Command.Group>
				</ScrollArea>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
