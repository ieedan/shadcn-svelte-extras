<script lang="ts">
	import { PhoneInput } from '$lib/components/ui/phone-input';
	import { Label } from '$lib/components/ui/label';
</script>

<div>
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
</div>
