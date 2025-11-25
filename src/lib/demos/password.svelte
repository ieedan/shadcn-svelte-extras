<script lang="ts">
	import * as Password from '$lib/components/ui/password';
</script>

<div class="flex w-full max-w-3xs flex-col gap-2">
	<Password.Root>
		<Password.Input placeholder="Password">
			<Password.ToggleVisibility />
		</Password.Input>
		<Password.Strength />
	</Password.Root>
</div>
