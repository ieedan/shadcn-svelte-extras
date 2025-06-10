<script lang="ts" module>
	import type { AnchorElementProps } from '$lib/components/ui/button';

	export type StarButtonProps = WithoutChildren<AnchorElementProps> & {
		stars: Promise<number> | number;
		fallback?: number;
	};
</script>

<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { WithoutChildren } from 'bits-ui';
	import * as numbers from '$lib/utils/numbers';
	import * as Icons from '$lib/components/icons';
	import { Tween } from 'svelte/motion';

	let { stars, variant = 'ghost', fallback = 0, ...rest }: StarButtonProps = $props();

	const starsTween = new Tween(fallback, { duration: 1000 });

	if (stars instanceof Promise) {
		starsTween.set(fallback);
		stars.then((starCount) => starsTween.set(starCount));
	} else {
		starsTween.set(stars);
	}
</script>

<Button {...rest} {variant}>
	<Icons.GitHub class="size-4" />
	<span class="text-muted-foreground text-sm">
		{numbers.formatNumber(Math.ceil(starsTween.current))}
	</span>
</Button>
