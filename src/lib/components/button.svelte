<script lang="ts" module>
	import type { MouseEventHandler } from 'svelte/elements';

	export type ButtonProps = ButtonPrimitiveProps & {
		loading?: boolean;
		onClickPromise?: (
			e:
				| Parameters<MouseEventHandler<HTMLButtonElement>>[0]
				| Parameters<MouseEventHandler<HTMLAnchorElement>>[0]
		) => Promise<void>;
	};
</script>

<script lang="ts">
	import { Button, type ButtonProps as ButtonPrimitiveProps } from '$lib/components/ui/button';
	import { Spinner } from '$lib/components/ui/spinner';

	let {
		ref = $bindable(null),
		loading: loadingProp = false,
		onClickPromise,
		onclick,
		disabled,
		children,
		...restProps
	}: ButtonProps = $props();

	let pending = $state(false);

	const loading = $derived(loadingProp || pending);
</script>

<Button
	bind:ref
	disabled={loading || disabled}
	onclick={async (e) => {
		onclick?.(e as never);

		if (onClickPromise) {
			pending = true;
			try {
				await onClickPromise(e);
			} finally {
				pending = false;
			}
		}
	}}
	{...restProps}
>
	{#if loading}
		<Spinner data-icon="inline-start" />
	{/if}
	{@render children?.()}
</Button>
