<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as NumberField from '$lib/components/ui/number-field';
	import CheckIcon from '@lucide/svelte/icons/check';
	import SkipForwardIcon from '@lucide/svelte/icons/skip-forward';
	import FireIcon from '@lucide/svelte/icons/flame';

	let calories = $state(0);
</script>

<div class="flex flex-col gap-2">
	<div>
		<h1 class="text-lg font-medium">Calories Burned</h1>
		<p class="text-muted-foreground text-sm">How many calories did you burn?</p>
	</div>
	<NumberField.Root bind:value={calories} step={100} min={0} max={10000}>
		<div class="flex flex-col items-center">
			<div class="flex w-full min-w-[230px] items-center justify-between gap-4 py-4">
				<NumberField.Decrement variant="outline" class="rounded-full" />
				<span class="flex items-center gap-2 text-center text-3xl">
					<FireIcon class="size-7 text-amber-500" />
					<span class="font-mono">
						{calories}
					</span>
				</span>
				<NumberField.Increment variant="outline" class="rounded-full" />
			</div>
		</div>
	</NumberField.Root>
	<div class="flex items-center justify-between gap-4">
		<Button variant="outline" size="icon">
			<SkipForwardIcon />
		</Button>
		<Button size="icon">
			<CheckIcon />
		</Button>
	</div>
</div>

