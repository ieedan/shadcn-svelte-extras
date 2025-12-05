<script lang="ts">
	import * as Command from '$lib/components/ui/command';
	import * as chrono from 'chrono-node';
	import type { NLPDateInputProps } from './types';
	import { getNlpSuggestions } from '.';

	let {
		placeholder = 'E.g. "tomorrow at 5pm" or "in 2 hours"',
		min,
		max,
		locale = 'en',
		defaultValues,
		onChoice
	}: NLPDateInputProps = $props();

	let value = $state('');
	let parser = $derived(locale && chrono[locale] ? chrono[locale].parse : chrono.parse);

	const suggestions = $derived(() => getNlpSuggestions(value, locale, min, max, defaultValues));

	$effect(() => {
		console.log('Suggestions updated:', $state.snapshot(suggestions()));
	});
</script>

<Command.Root shouldFilter={false} class="border-border h-fit border">
	<Command.Input {placeholder} bind:value />
	<Command.List>
		<Command.Group>
			{#each suggestions() as suggestion (suggestion)}
				<Command.Item
					onSelect={() => {
						onChoice?.(suggestion);
					}}
				>
					<div class="flex w-full place-items-center justify-between">
						<span>
							{suggestion.display}
						</span>
						<span class="text-muted-foreground">
							{suggestion.date.toLocaleDateString()}
							{suggestion.date.toLocaleTimeString()}
						</span>
					</div>
				</Command.Item>
			{/each}
		</Command.Group>
	</Command.List>
</Command.Root>
