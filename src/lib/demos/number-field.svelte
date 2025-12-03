<script lang="ts">
	import * as NumberField from '$lib/components/ui/number-field';
</script>

<NumberField.Root min={-1000} max={1000}>
	<NumberField.Group>
		<NumberField.Decrement />
		<NumberField.Input />
		<NumberField.Increment />
	</NumberField.Group>
</NumberField.Root>

