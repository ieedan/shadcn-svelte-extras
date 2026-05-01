<script lang="ts">
	import * as Modal from '$lib/components/ui/modal';
	import Button from '$lib/components/button.svelte';
	import { buttonVariants } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import * as Field from '$lib/components/ui/field';
</script>

<Modal.Root>
	<Modal.Trigger class={buttonVariants({ variant: 'outline' })}>Edit Profile</Modal.Trigger>
	<Modal.Content>
		<Modal.Header>
			<Modal.Title>Edit Profile</Modal.Title>
			<Modal.Description>
				Make changes to your profile here. Click save when you're done.
			</Modal.Description>
		</Modal.Header>
		<Field.Group>
			<Field.Field>
				<Label for="name">Name</Label>
				<Input id="name" value="Pedro Duarte" />
			</Field.Field>
			<Field.Field>
				<Label for="username">Username</Label>
				<Input id="username" value="@peduarte" />
			</Field.Field>
		</Field.Group>
		<Modal.Footer>
			<Button>Save Changes</Button>
		</Modal.Footer>
	</Modal.Content>
</Modal.Root>
