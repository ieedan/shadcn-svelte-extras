<script lang="ts">
	import { PhoneInput } from '$lib/components/ui/phone-input';
	import { Button } from '$lib/components/ui/button';
	import * as FieldSet from '$lib/components/ui/field-set';

	let loading = $state(false);
</script>

<FieldSet.Root>
	<FieldSet.Content class="flex flex-col gap-2">
		<FieldSet.Title>Phone Number</FieldSet.Title>
		<PhoneInput value="+1 418 543 8090" />
	</FieldSet.Content>
	<FieldSet.Footer class="flex place-items-center justify-between">
		<span class="text-muted-foreground text-sm"> Add your phone number. </span>
		<Button
			{loading}
			size="sm"
			onclick={() => {
				loading = true;
				setTimeout(() => {
					loading = false;
				}, 500);
			}}
		>
			Save
		</Button>
	</FieldSet.Footer>
</FieldSet.Root>
