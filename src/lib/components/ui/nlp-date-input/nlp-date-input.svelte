<script lang="ts">
	import * as Command from '$lib/components/ui/command';
	import { parseDate } from 'yeezy-dates';

	type Props = {
		min?: Date;
		max?: Date;
		placeholder?: string;
		onChoice?: (opts: { label: string; date: Date }) => void;
	};

	let {
		placeholder = 'E.g. "tomorrow at 5pm" or "in 2 hours"',
		min,
		max,
		onChoice
	}: Props = $props();

	let value = $state('');

	const suggestions = $derived(
		parseDate(value).filter(
			(suggestion) =>
				(min === undefined || suggestion.date > min) && (max === undefined || suggestion.date < max)
		)
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
							{suggestion.label}
						</span>
						<span class="text-muted-foreground">
							{suggestion.date.toDateString()}
							{suggestion.date.toLocaleTimeString()}
						</span>
					</div>
				</Command.Item>
			{/each}
		</Command.Group>
	</Command.List>
</Command.Root>
