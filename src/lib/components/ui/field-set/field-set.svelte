<script lang="ts">
	import { cn } from '$lib/utils/utils';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';
	import { tv, type VariantProps } from 'tailwind-variants';

	const style = tv({
		base: 'border-border flex h-fit w-full flex-col rounded-lg border',
		variants: {
			variant: {
				default: 'border-border bg-card',
				destructive: 'border-destructive'
			}
		}
	});

	type Variant = VariantProps<typeof style>['variant'];

	interface Props extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
		variant?: Variant;
	}

	let { variant = 'default', children, class: className, ...restProps }: Props = $props();
</script>

<div class={cn(style({ variant }), className)} {...restProps}>
	{@render children?.()}
</div>
