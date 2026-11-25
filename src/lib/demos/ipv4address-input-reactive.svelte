<script lang="ts">
	import { Input } from '#lib/components/ui/input/index.ts';
	import { IPv4AddressInput } from '#lib/components/ui/ipv4address-input/index.ts';
	import { Label } from '#lib/components/ui/label/index.ts';
	import * as Field from '#lib/components/ui/field/index.ts';

	let value = '192.168.1.1';
</script>

<Field.Field class="w-fit">
	<Label>IP Address</Label>
	<IPv4AddressInput bind:value />
	<Input bind:value class="w-[198px]" />
</Field.Field>
