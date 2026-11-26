<script lang="ts">
	import { PhoneInput } from '#lib/components/ui/phone-input/index.ts';
	import { Label } from '#lib/components/ui/label/index.ts';
	import * as Field from '#lib/components/ui/field/index.ts';
</script>

<Field.Field class="w-fit">
	<Label>Phone Number</Label>
	<PhoneInput
		placeholder="Enter a phone number"
		order={(a, b) => {
			if (a.iso2 == 'US') return -1;
			if (b.iso2 == 'US') return 1;
			if (a.iso2 == 'CN') return -1;
			if (b.iso2 == 'CN') return 1;

			return a.name.localeCompare(b.name);
		}}
	/>
</Field.Field>
