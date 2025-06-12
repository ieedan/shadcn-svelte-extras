<script lang="ts">
	import { box } from 'svelte-toolbelt';
	import { usePassword } from './password.svelte.js';
	import type { PasswordRootProps } from './types';

	let { hidden = $bindable(true), minScore = 3, children }: PasswordRootProps = $props();

	usePassword({
		hidden: box.with(
			() => hidden,
			(v) => (hidden = v)
		),
		minScore: box.with(() => minScore)
	});
</script>

{@render children?.()}
