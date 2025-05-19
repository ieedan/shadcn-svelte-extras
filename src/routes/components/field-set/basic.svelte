<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as FieldSet from '$lib/components/ui/field-set';
</script>

<div class="w-full p-6">
	<FieldSet.Root>
		<FieldSet.Content>
			<div>
				<Label>Username</Label>
				<Input value="ieedan" class="max-w-[225px]" />
			</div>
		</FieldSet.Content>
		<FieldSet.Footer>
			<div class="flex w-full place-items-center justify-between">
				<span class="text-muted-foreground text-sm">Save your username.</span>
				<Button size="sm">Save</Button>
			</div>
		</FieldSet.Footer>
	</FieldSet.Root>
</div>
