<script lang="ts">
	import { IPv4AddressInput } from '$lib/components/ui/ipv4address-input';
	import { Label } from '$lib/components/ui/label';
	import * as Field from '$lib/components/ui/field';
</script>

<Field.Field class="w-fit">
	<Label>IP Address</Label>
	<IPv4AddressInput placeholder="0 0 0 0" />
</Field.Field>
