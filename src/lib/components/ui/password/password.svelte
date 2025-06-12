<script lang="ts">
	import { box } from 'svelte-toolbelt';
	import { usePassword } from './password.svelte.js';
	import type { PasswordRootProps } from './types';

	let { hidden = $bindable(true), children }: PasswordRootProps = $props();

	usePassword({
		hidden: box.with(
			() => hidden,
			(v) => (hidden = v)
		)
	});
</script>

{@render children?.()}
