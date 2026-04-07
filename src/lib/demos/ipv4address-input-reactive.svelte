<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { IPv4AddressInput } from '$lib/components/ui/ipv4address-input';
	import { Label } from '$lib/components/ui/label';
	import * as Field from '$lib/components/ui/field';

	let value = '192.168.1.1';
</script>

<Field.Field class="w-fit">
	<Label>IP Address</Label>
	<IPv4AddressInput bind:value />
	<Input bind:value class="w-[198px]" />
</Field.Field>
