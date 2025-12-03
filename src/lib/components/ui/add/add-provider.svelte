<script lang="ts" generics="RegistryOptions extends readonly string[]">
	import { useAddProvider, type Agent } from './add.svelte.js';
	import { box } from 'svelte-toolbelt';
	import type { Snippet } from 'svelte';

	type Props<RegistryOptions extends readonly string[]> = {
		agent: Agent;
		registryOptions: RegistryOptions;
		registry: NoInfer<RegistryOptions[number]>;
		children: Snippet;
	};

	let {
		agent = $bindable(),
		registry = $bindable(),
		registryOptions,
		children
	}: Props<RegistryOptions> = $props();

	useAddProvider({
		registryOptions: box.with(() => registryOptions),
		registry: box.with(
			() => registry,
			(v) => (registry = v)
		),
		agent: box.with(
			() => agent,
			(v) => (agent = v)
		)
	});
</script>

{@render children?.()}
