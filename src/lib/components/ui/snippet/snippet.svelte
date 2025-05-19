<script lang="ts">
	import { cn } from '$lib/utils/utils';
	import { tv, type VariantProps } from 'tailwind-variants';
	import { CopyButton } from '../copy-button';

	const style = tv({
		base: 'bg-background relative w-full max-w-full rounded-md border py-2.5 pr-12 pl-3',
		variants: {
			variant: {
				default: 'border-border bg-card',
				secondary: 'border-border bg-accent',
				destructive: 'border-destructive bg-destructive',
				primary: 'border-primary bg-primary text-primary-foreground'
			}
		}
	});

	type Variant = VariantProps<typeof style>['variant'];

	type Props = {
		variant?: Variant;
		text: string | string[];
		class?: string;
		onCopy?: () => void;
	};

	let { text, variant = 'default', onCopy, class: className }: Props = $props();
</script>

<div class={cn(style({ variant, className: className }))}>
	{#if typeof text == 'string'}
		<pre class={cn('overflow-y-auto text-left font-mono text-sm whitespace-nowrap')}>
			{text}
		</pre>
	{:else}
		{#each text as line, i (i)}
			<pre class={cn('overflow-y-auto text-left font-mono text-sm whitespace-nowrap')}>
			{line}
		</pre>
		{/each}
	{/if}

	<CopyButton
		class="hover:text-opacity-80 absolute top-1/2 right-2 size-7 -translate-y-1/2 transition-opacity ease-in-out hover:bg-transparent dark:hover:bg-transparent"
		text={typeof text === 'string' ? text : text.join('\n')}
		{onCopy}
	/>
</div>
