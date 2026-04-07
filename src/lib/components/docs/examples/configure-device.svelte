<script lang="ts">
	import { IPv4AddressInput } from '$lib/components/ui/ipv4address-input';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import Button from '$lib/components/button.svelte';

	let loading = $state(false);
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Network Configuration</Card.Title>
		<Card.Description>Configure device network settings.</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-4">
		<div class="flex flex-col gap-2">
			<div class="flex place-items-center justify-between gap-2">
				<Label>IP Address</Label>
				<IPv4AddressInput value="172 16 230 22" />
			</div>
			<div class="flex place-items-center justify-between gap-2">
				<Label>Subnet Mask</Label>
				<IPv4AddressInput value="255 255 255 0" />
			</div>
			<div class="flex place-items-center justify-between gap-2">
				<Label>Gateway</Label>
				<IPv4AddressInput placeholder="0 0 0 0" />
			</div>
		</div>
		<Button
			{loading}
			class="w-full"
			onclick={() => {
				loading = true;
				setTimeout(() => {
					loading = false;
				}, 500);
			}}
		>
			Configure
		</Button>
	</Card.Content>
</Card.Root>
