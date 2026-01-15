<script lang="ts">
	import * as Stepper from '$lib/components/ui/stepper';

	let step = $state(2);
</script>

<Stepper.Root bind:step>
	<div class="flex w-10/12 flex-col gap-8 px-4">
		<Stepper.Nav orientation="horizontal" class="justify-between">
			{#each Array.from({ length: 4 }) as _, index (index)}
				<Stepper.Item>
					<Stepper.Trigger>
						<Stepper.Indicator>{index + 1}</Stepper.Indicator>
					</Stepper.Trigger>
					<Stepper.Separator />
				</Stepper.Item>
			{/each}
		</Stepper.Nav>
		<div class="flex w-full justify-between">
			<Stepper.Previous>Previous</Stepper.Previous>
			<Stepper.Next>Next</Stepper.Next>
		</div>
	</div>
</Stepper.Root>
