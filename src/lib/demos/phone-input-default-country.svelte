<script lang="ts">
	import { PhoneInput } from '$lib/components/ui/phone-input';
	import { Label } from '$lib/components/ui/label';
	import * as Field from '$lib/components/ui/field';
</script>

<Field.Field class="w-fit">
	<Label>Phone Number</Label>
	<PhoneInput country="US" placeholder="Enter a phone number" />
</Field.Field>
