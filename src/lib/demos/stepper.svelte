<script lang="ts">
	import * as Stepper from '$lib/components/ui/stepper';

	let step = $state(1);
</script>

<Stepper.Root bind:step>
	<div class="flex w-full flex-col gap-8 px-4">
		<Stepper.Nav orientation="horizontal" class="gap-10">
			<Stepper.Item class="relative flex flex-1 gap-2">
				<Stepper.Trigger>1</Stepper.Trigger>
				<Stepper.Separator />
			</Stepper.Item>
			<Stepper.Item class="relative flex flex-1 gap-2">
				<Stepper.Trigger>2</Stepper.Trigger>
				<Stepper.Separator />
			</Stepper.Item>
			<Stepper.Item class="relative flex flex-1 gap-2">
				<Stepper.Trigger>3</Stepper.Trigger>
				<Stepper.Separator />
			</Stepper.Item>
		</Stepper.Nav>
		<div class="flex w-full justify-between">
			<Stepper.Previous>Previous</Stepper.Previous>
			<Stepper.Next>Next</Stepper.Next>
		</div>
	</div>
</Stepper.Root>
