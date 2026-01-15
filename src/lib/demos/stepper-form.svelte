<script lang="ts">
	import * as Stepper from '$lib/components/ui/stepper';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import { toast } from 'svelte-sonner';
	import {
		BookUserIcon,
		TruckIcon,
		CreditCardIcon,
		ShoppingCartIcon,
		SmileIcon
	} from '@lucide/svelte';
	import * as Accordion from '$lib/components/ui/accordion';

	let step = $state(1);

	let address = $state({
		street: '',
		city: '',
		state: '',
		zip: ''
	});

	let shippingMethod = $state<string | undefined>(undefined);
	let paymentMethod = $state<'card' | 'open-source-special' | undefined>(undefined);

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
		{ value: 'card', label: 'Card' },
		{ value: 'open-source-special', label: 'Open Source Special' }
	];

	const maxValidStep = $derived.by(() => {
		if (!(address.street && address.city && address.state && address.zip)) return 1;
		if (!shippingMethod) return 2;
		if (!paymentMethod) return 3;
		return 4;
	});

	const canGoToNextStep = $derived(canProceedToStep(step));

	function canProceedToStep(currentStep: number): boolean {
		return currentStep < maxValidStep;
	}

	function handleSubmit() {
		toast.success('Order confirmed!', {
			description: `Your order for the stepper component ($0) has been placed successfully.`
		});
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
					<Stepper.Indicator>
						<BookUserIcon />
					</Stepper.Indicator>
				</Stepper.Trigger>
				<Stepper.Separator />
			</Stepper.Item>
			<Stepper.Item id="shipping">
				<Stepper.Trigger disabled={maxValidStep < 2}>
					<Stepper.Indicator>
						<TruckIcon />
					</Stepper.Indicator>
				</Stepper.Trigger>
				<Stepper.Separator />
			</Stepper.Item>
			<Stepper.Item id="payment">
				<Stepper.Trigger disabled={maxValidStep < 3}>
					<Stepper.Indicator>
						<CreditCardIcon />
					</Stepper.Indicator>
				</Stepper.Trigger>
				<Stepper.Separator />
			</Stepper.Item>
			<Stepper.Item id="checkout">
				<Stepper.Trigger disabled={maxValidStep < 4}>
					<Stepper.Indicator>
						<ShoppingCartIcon />
					</Stepper.Indicator>
				</Stepper.Trigger>
			</Stepper.Item>
		</Stepper.Nav>

		<div class="min-h-[430px] w-full">
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
						{#each shippingOptions as option (option.value)}
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
				<div class="flex w-full flex-col gap-6">
					<div>
						<h2 class="text-2xl font-semibold">Payment Method</h2>
						<p class="text-muted-foreground text-sm">Choose how you'd like to pay</p>
					</div>
					<Accordion.Root
						type="single"
						bind:value={paymentMethod}
						class="border-border rounded-lg border"
					>
						<Accordion.Item value="card">
							<Accordion.Trigger
								class="group rounded-b-none px-4 hover:no-underline data-[state=open]:border-b [&_svg:not([class*='show'])]:hidden"
							>
								<div class="flex items-center gap-4">
									<div
										class="border-border flex size-4 items-center justify-center rounded-full border"
									>
										<div class="group-data-[state=open]:bg-primary size-2 rounded-full"></div>
									</div>
									<CreditCardIcon class="show text-muted-foreground" />
									Pay with Card
								</div>
							</Accordion.Trigger>
							<Accordion.Content>
								<div class="flex flex-col gap-4 px-4 pt-4">
									<div class="flex flex-col gap-2">
										<Label for="card-number">Card Number</Label>
										<Input id="card-number" placeholder="1234 5678 9012 3456" />
									</div>
									<div class="flex gap-4">
										<div class="flex flex-1 flex-col gap-2">
											<Label for="expiry">Expiry Date</Label>
											<Input id="expiry" placeholder="MM/YY" />
										</div>
										<div class="flex flex-1 flex-col gap-2">
											<Label for="cvv">CVV</Label>
											<Input id="cvv" placeholder="123" />
										</div>
									</div>
									<div class="flex flex-col gap-2">
										<Label for="cardholder-name">Cardholder Name</Label>
										<Input id="cardholder-name" placeholder="John Doe" />
									</div>
								</div>
							</Accordion.Content>
						</Accordion.Item>
						<Accordion.Item value="open-source-special">
							<Accordion.Trigger
								class="group rounded-b-none px-4 hover:no-underline data-[state=open]:border-b [&_svg:not([class*='show'])]:hidden"
							>
								<div class="flex items-center gap-4">
									<div
										class="border-border flex size-4 items-center justify-center rounded-full border"
									>
										<div class="group-data-[state=open]:bg-primary size-2 rounded-full"></div>
									</div>
									<SmileIcon class="show text-muted-foreground" />
									Open Source Special
								</div>
							</Accordion.Trigger>
							<Accordion.Content>
								<div class="flex flex-col gap-4 px-4 pt-4">
									Nothing to pay just enjoy the free software!
								</div>
							</Accordion.Content>
						</Accordion.Item>
					</Accordion.Root>
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
							<div class="flex flex-col gap-2 border-t pt-4">
								<div class="flex flex-col gap-2 border-b py-2">
									<div class="flex items-center justify-between">
										<p class="text-muted-foreground text-sm">Stepper Component</p>
										<p class="text-muted-foreground text-sm">$0.00</p>
									</div>
								</div>
								<div class="flex items-center justify-between">
									<span class="font-semibold">Order Total</span>
									<span class="text-lg font-bold">$0.00</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<div class="flex w-full justify-between">
			<Stepper.Previous>Previous</Stepper.Previous>
			{#if step < 4}
				<Stepper.Next disabled={!canGoToNextStep}>Next</Stepper.Next>
			{:else}
				<Button onclick={handleSubmit}>Complete Order</Button>
			{/if}
		</div>
	</div>
</Stepper.Root>
