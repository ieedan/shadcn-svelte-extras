<script lang="ts">
	import * as Password from '$lib/components/ui/password';
</script>

<div class="flex w-full max-w-3xs flex-col gap-2">
	<Password.Root>
		<Password.Input value="$ecretpa$$word">
			<Password.ToggleVisibility />
		</Password.Input>
	</Password.Root>
</div>

