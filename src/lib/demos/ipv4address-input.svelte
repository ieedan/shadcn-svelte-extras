<script lang="ts">
	import { IPv4AddressInput } from '#lib/components/ui/ipv4address-input/index.ts';
	import { Label } from '#lib/components/ui/label/index.ts';
	import * as Field from '#lib/components/ui/field/index.ts';
</script>

<Field.Field class="w-fit">
	<Label>IP Address</Label>
	<IPv4AddressInput value="192.168.1.1" />
</Field.Field>
