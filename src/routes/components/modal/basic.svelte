<script lang="ts">
	import * as Modal from '$lib/components/ui/modal';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';

	let open = $state(false);
</script>

<Modal.Root bind:open>
	<Modal.Trigger class={buttonVariants({ variant: 'outline' })}>Open Modal</Modal.Trigger>
	<Modal.Content>
		<Modal.Header>
			<Modal.Title>Create a team</Modal.Title>
			<Modal.Description>Create a team</Modal.Description>
		</Modal.Header>
		<div>
			<Label>Team Name</Label>
			<Input />
		</div>
		<Modal.Footer>
			<Button variant="outline" onclick={() => (open = false)}>Cancel</Button>
			<Button>Continue</Button>
		</Modal.Footer>
	</Modal.Content>
</Modal.Root>
