<script lang="ts">
	import Button from '#lib/components/button.svelte';
	import { Input } from '#lib/components/ui/input/index.ts';
	import { Label } from '#lib/components/ui/label/index.ts';
	import * as FieldSet from '#lib/components/ui/field-set/index.ts';
	import * as Field from '#lib/components/ui/field/index.ts';
</script>

<div class="w-full p-6">
	<FieldSet.Root variant="destructive">
		<FieldSet.Content>
			<Field.Field>
				<Label>Project Name</Label>
				<Input value="ieedan/std" class="max-w-[225px]" />
			</Field.Field>
		</FieldSet.Content>
		<FieldSet.Footer>
			<div class="flex w-full place-items-center justify-between">
				<span class="text-muted-foreground text-sm">Rename your project.</span>
				<Button variant="destructive" size="sm">Rename</Button>
			</div>
		</FieldSet.Footer>
	</FieldSet.Root>
</div>
