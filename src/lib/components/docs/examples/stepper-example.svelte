<script lang="ts">
	import * as Stepper from '$lib/components/ui/stepper';
	import Search from '@lucide/svelte/icons/search';
	import Download from '@lucide/svelte/icons/download';
	import Code from '@lucide/svelte/icons/code';

	let step = $state(1);

	const steps = [
		{
			step: 1,
			icon: Search
		},
		{
			step: 2,
			icon: Download
		},
		{
			step: 3,
			icon: Code
		}
	];
</script>

<div class="rounded-lg border p-6">
	<Stepper.Root bind:step>
		<Stepper.Nav orientation="horizontal" class="w-full justify-between px-4">
			{#each steps as item (item.step)}
				<Stepper.Item>
					<Stepper.Trigger class="flex max-w-[150px] flex-col items-center">
						<Stepper.Indicator>
							<item.icon />
						</Stepper.Indicator>
						<div class="flex flex-col"></div>
					</Stepper.Trigger>

					<Stepper.Separator />
				</Stepper.Item>
			{/each}
		</Stepper.Nav>
	</Stepper.Root>
</div>
