<script lang="ts">
	import * as Stepper from '$lib/components/ui/stepper';
	import { ShoppingCart } from '@lucide/svelte';
	import BookUser from '@lucide/svelte/icons/book-user';
	import CreditCard from '@lucide/svelte/icons/credit-card';
	import Truck from '@lucide/svelte/icons/truck';

	let step = $state(2);

	const steps = [
		{
			step: 1,
			title: 'Address',
			description: 'Add your address',
			icon: BookUser
		},
		{
			step: 2,
			title: 'Shipping',
			description: 'Select your shipping method',
			icon: Truck
		},
		{
			step: 3,
			title: 'Payment',
			description: 'Add your payment method',
			icon: CreditCard
		},
		{
			step: 4,
			title: 'Checkout',
			description: 'Confirm your order',
			icon: ShoppingCart
		}
	];
</script>

<div class="flex items-center justify-center">
	<Stepper.Root bind:step>
		<Stepper.Nav orientation="vertical" class="w-full px-4">
			{#each steps as item (item.step)}
				<Stepper.Item>
					<Stepper.Trigger>
						<Stepper.Indicator>
							<item.icon class="size-4" />
						</Stepper.Indicator>
						<div class="flex flex-col">
							<Stepper.Title>
								{item.title}
							</Stepper.Title>
							<Stepper.Description>
								{item.description}
							</Stepper.Description>
						</div>
					</Stepper.Trigger>

					<Stepper.Separator />
				</Stepper.Item>
			{/each}
		</Stepper.Nav>
	</Stepper.Root>
</div>
