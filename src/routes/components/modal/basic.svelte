<script lang="ts">
	import * as Modal from '$lib/components/ui/modal';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
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
		<div class="flex flex-col gap-2">
			<div>
				<Label for="name">Name</Label>
				<Input id="name" value="Pedro Duarte" />
			</div>
			<div>
				<Label for="username">Username</Label>
				<Input id="username" value="@peduarte" />
			</div>
		</div>
		<Modal.Footer>
			<Button>Save Changes</Button>
		</Modal.Footer>
	</Modal.Content>
</Modal.Root>
