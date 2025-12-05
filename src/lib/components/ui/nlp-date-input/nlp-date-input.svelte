<script lang="ts">
	import * as Command from '$lib/components/ui/command';
	import * as chrono from 'chrono-node';
	import type { NLPDateInputProps } from './types';

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

	function fullNormalize(str: string): string {
		return str
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[\u2019\u2018]/g, "'");
	}

	function getRelativeDayKeyword(locale: string): string[] {
		const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

		return [rtf.format(1, 'day'), rtf.format(0, 'day'), rtf.format(-1, 'day')].map(fullNormalize);
	}

	let defaults = $derived(
		defaultValues && defaultValues.length > 0
			? defaultValues.map((input) => parser(input)[0])
			: getRelativeDayKeyword(locale).map((input) => parser(input)[0])
	);

	const suggestions = $derived(
		(value
			? parser(value).filter(
					(suggestion) =>
						(min === undefined || suggestion.date() > min) &&
						(max === undefined || suggestion.date() < max)
				)
			: defaults
		).filter((s) => s !== undefined)
	);
</script>

<Command.Root shouldFilter={false} class="border-border h-fit border">
	<Command.Input {placeholder} bind:value />
	<Command.List>
		<Command.Group>
			{#each suggestions as suggestion (suggestion)}
				<Command.Item
					onSelect={() => {
						onChoice?.(suggestion);
					}}
				>
					<div class="flex w-full place-items-center justify-between">
						<span>
							{suggestion.text}
						</span>
						<span class="text-muted-foreground">
							{suggestion.date().toLocaleDateString()}
							{suggestion.date().toLocaleTimeString()}
						</span>
					</div>
				</Command.Item>
			{/each}
		</Command.Group>
	</Command.List>
</Command.Root>
