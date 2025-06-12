<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import * as Card from '$lib/components/ui/card';
	import * as Password from '$lib/components/ui/password';
	import { Input } from '$lib/components/ui/input';
	import { sleep } from '$lib/utils/sleep';
	import { enhance } from '$app/forms';

	let loading = $state(false);

	async function submit() {
		loading = true;

		await sleep(500);

		loading = false;
	}
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Create an account</Card.Title>
		<Card.Description>Enter your email below to create your account</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-4">
		<form
			method="POST"
			onsubmit={(e) => {
				e.preventDefault();
				submit();
			}}
			use:enhance
			class="flex flex-col gap-4"
		>
			<div class="flex flex-col gap-2">
				<Label>Email</Label>
				<Input name="email" type="email" placeholder="m@example.com" required />
			</div>
			<div class="flex flex-col gap-2">
				<Label>Password</Label>
				<Password.Root>
					<Password.Input name="password" required>
						<Password.ToggleVisibility />
					</Password.Input>
					<Password.Strength />
				</Password.Root>
			</div>
			<Button type="submit" class="w-full" {loading}>Create account</Button>
		</form>
	</Card.Content>
</Card.Root>
