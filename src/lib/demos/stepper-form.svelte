<script lang="ts">
	import * as Stepper from '$lib/components/ui/stepper';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import { toast } from 'svelte-sonner';

	let step = $state(1);

	let address = $state({
		street: '',
		city: '',
		state: '',
		zip: ''
	});

	let shippingMethod = $state<string | undefined>(undefined);
	let paymentMethod = $state<string | undefined>(undefined);

	const shippingOptions = [
		{ value: 'standard', label: 'Standard Shipping', price: 'Free', delivery: '5-7 business days' },
		{ value: 'express', label: 'Express Shipping', price: '$9.99', delivery: '2-3 business days' },
		{
			value: 'overnight',
			label: 'Overnight Shipping',
			price: '$19.99',
			delivery: 'Next business day'
		}
	];

	const paymentOptions = [
		{ value: 'credit', label: 'Credit Card' },
		{ value: 'buy-now-pay-never', label: 'Buy Now Pay Never' }
	];

	const maxValidStep = $derived.by(() => {
		if (!(address.street && address.city && address.state && address.zip)) return 1;
		if (!shippingMethod) return 2;
		if (!paymentMethod) return 3;
		return 4;
	});

	function canProceedToNextStep(currentStep: number): boolean {
		return currentStep < maxValidStep;
	}

	function handleSubmit() {
		toast.success('Order confirmed!', {
			description: `Your order for the stepper component ($0) has been placed successfully.`
		});
		// Reset form
		step = 1;
		address = { street: '', city: '', state: '', zip: '' };
		shippingMethod = undefined;
		paymentMethod = undefined;
	}
</script>

<Stepper.Root bind:step>
	<div class="flex w-full max-w-2xl flex-col gap-8 px-4">
		<Stepper.Nav orientation="horizontal" class="justify-between">
			<Stepper.Item id="address">
				<Stepper.Trigger>
					<Stepper.Indicator>1</Stepper.Indicator>
				</Stepper.Trigger>
				<Stepper.Separator />
			</Stepper.Item>
			<Stepper.Item id="shipping">
				<Stepper.Trigger>
					<Stepper.Indicator>2</Stepper.Indicator>
				</Stepper.Trigger>
				<Stepper.Separator />
			</Stepper.Item>
			<Stepper.Item id="payment">
				<Stepper.Trigger>
					<Stepper.Indicator>3</Stepper.Indicator>
				</Stepper.Trigger>
				<Stepper.Separator />
			</Stepper.Item>
			<Stepper.Item id="checkout">
				<Stepper.Trigger>
					<Stepper.Indicator>4</Stepper.Indicator>
				</Stepper.Trigger>
			</Stepper.Item>
		</Stepper.Nav>

		<div class="min-h-[400px] w-full">
			{#if step === 1}
				<div class="flex flex-col gap-6">
					<div>
						<h2 class="text-2xl font-semibold">Shipping Address</h2>
						<p class="text-muted-foreground text-sm">Please enter your delivery address</p>
					</div>
					<div class="flex flex-col gap-4">
						<div class="flex flex-col gap-2">
							<Label for="street">Street Address</Label>
							<Input id="street" bind:value={address.street} placeholder="123 Main St" />
						</div>
						<div class="grid grid-cols-2 gap-4">
							<div class="flex flex-col gap-2">
								<Label for="city">City</Label>
								<Input id="city" bind:value={address.city} placeholder="New York" />
							</div>
							<div class="flex flex-col gap-2">
								<Label for="state">State</Label>
								<Input id="state" bind:value={address.state} placeholder="NY" />
							</div>
						</div>
						<div class="flex flex-col gap-2">
							<Label for="zip">ZIP Code</Label>
							<Input id="zip" bind:value={address.zip} placeholder="10001" />
						</div>
					</div>
				</div>
			{:else if step === 2}
				<div class="flex w-full flex-col gap-6">
					<div>
						<h2 class="text-2xl font-semibold">Shipping Method</h2>
						<p class="text-muted-foreground text-sm">Select your preferred shipping option</p>
					</div>
					<ToggleGroup.Root
						type="single"
						bind:value={shippingMethod}
						class="flex w-full flex-col gap-3"
					>
						{#each shippingOptions as option}
							<ToggleGroup.Item
								value={option.value}
								class="hover:text-foreground data-[state=on]:border-primary data-[state=on]:bg-accent flex h-auto w-full flex-col items-start gap-2 rounded-lg border p-4 transition-colors"
							>
								<div class="flex w-full items-center justify-between">
									<span class="font-medium">{option.label}</span>
									<span class="text-muted-foreground text-sm">{option.price}</span>
								</div>
								<span class="text-muted-foreground text-sm">{option.delivery}</span>
							</ToggleGroup.Item>
						{/each}
					</ToggleGroup.Root>
				</div>
			{:else if step === 3}
				<div class="flex flex-col gap-6">
					<div>
						<h2 class="text-2xl font-semibold">Payment Method</h2>
						<p class="text-muted-foreground text-sm">Choose how you'd like to pay</p>
					</div>
					<ToggleGroup.Root type="single" bind:value={paymentMethod} class="flex gap-3">
						{#each paymentOptions as option}
							<ToggleGroup.Item
								value={option.value}
								class="data-[state=on]:border-primary data-[state=on]:bg-accent flex-1 rounded-lg border p-4"
							>
								<span class="font-medium">{option.label}</span>
							</ToggleGroup.Item>
						{/each}
					</ToggleGroup.Root>
				</div>
			{:else if step === 4}
				<div class="flex flex-col gap-6">
					<div>
						<h2 class="text-2xl font-semibold">Order Summary</h2>
						<p class="text-muted-foreground text-sm">Review your order details</p>
					</div>
					<div class="rounded-lg border p-6">
						<div class="flex flex-col gap-4">
							<div>
								<h3 class="font-semibold">Shipping Address</h3>
								<p class="text-muted-foreground text-sm">
									{address.street}<br />
									{address.city}, {address.state}
									{address.zip}
								</p>
							</div>
							<div>
								<h3 class="font-semibold">Shipping Method</h3>
								<p class="text-muted-foreground text-sm">
									{shippingOptions.find((o) => o.value === shippingMethod)?.label}
								</p>
							</div>
							<div>
								<h3 class="font-semibold">Payment Method</h3>
								<p class="text-muted-foreground text-sm">
									{paymentOptions.find((o) => o.value === paymentMethod)?.label}
								</p>
							</div>
							<div class="border-t pt-4">
								<div class="flex items-center justify-between">
									<span class="font-semibold">Order Total</span>
									<span class="text-lg font-bold">$0.00</span>
								</div>
								<p class="text-muted-foreground text-sm">Stepper Component</p>
							</div>
						</div>
					</div>
					<Button onclick={handleSubmit} class="w-full">Confirm Order</Button>
				</div>
			{/if}
		</div>

		<div class="flex w-full justify-between">
			<Stepper.Previous disabled={step === 1}>Previous</Stepper.Previous>
			{#if step < 4}
				<Stepper.Next disabled={!canProceedToNextStep(step)}>Next</Stepper.Next>
			{/if}
		</div>
	</div>
</Stepper.Root>
