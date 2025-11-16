<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import { cn } from '$lib/utils';
	import { Portal } from 'bits-ui';
	import * as Code from '$lib/components/ui/code';
	import type { ComponentProps } from 'svelte';
	import { useDemoCode } from './demo.svelte.js';
	import { box } from 'svelte-toolbelt';

	let {
		code,
		class: className,
		...rest
	}: Omit<ComponentProps<typeof Tabs.Content>, 'id' | 'value'> & {
		code?: string | Promise<string>;
	} = $props();

	const codeState = useDemoCode({
		code: box.with(() => code)
	});

	const uid = $props.id();
</script>

<!-- 
this is a bit weird but we actually portal the code to the code tab so that 
we don't have to render the code every time we switch tabs 
-->

<Tabs.Content
	id="{uid}-code"
	value="code"
	class={cn('rounded-md border border-border', className)}
	{...rest}
></Tabs.Content>

<Portal to="#{uid}-code">
	{#await codeState.code then code}
		<Code.Root lang="svelte" {code} class="aspect-video border-none [&_pre]:aspect-video">
			<Code.CopyButton />
		</Code.Root>
	{/await}
</Portal>
