<script lang="ts">
	import * as Password from '$lib/components/ui/password';
</script>

<form class="flex w-full max-w-3xs flex-col gap-2">
	<Password.Root minScore={0}>
		<Password.Input required value="$ecretpa$$word">
			<Password.ToggleVisibility />
		</Password.Input>
		<Password.Strength />
	</Password.Root>
</form>
