<script lang="ts">
	import * as Password from '$lib/components/ui/password';
	import type { ZxcvbnResult } from '@zxcvbn-ts/core';

	const SCORE_NAMING = ['Poor', 'Weak', 'Average', 'Strong', 'Secure'];

	let strength = $state<ZxcvbnResult>();
</script>

<div class="flex w-full max-w-3xs flex-col gap-2">
	<Password.Root minScore={2}>
		<Password.Input value="$ecretpa$$word">
			<Password.ToggleVisibility />
		</Password.Input>
		<div class="flex flex-col gap-1">
			<Password.Strength bind:strength />
			<span class="text-muted-foreground text-sm">
				{SCORE_NAMING[strength?.score ?? 0]}
			</span>
		</div>
	</Password.Root>
</div>
