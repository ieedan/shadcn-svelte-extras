<script lang="ts">
	import { IPv4AddressInput } from '$lib/components/ui/ipv4address-input';
	import { Label } from '$lib/components/ui/label';

	let valid = false;
</script>

<div>
	<Label>IP Address</Label>
	<!-- Use aria-[invalid=true] to style the input when invalid -->
	<IPv4AddressInput bind:valid value="192.168.1.1" class="aria-invalid:border-destructive" />
	<span>
		Valid:
		<span data-valid={valid} class="text-green-500 data-[valid=false]:text-red-600">
			{valid}
		</span>
	</span>
</div>
