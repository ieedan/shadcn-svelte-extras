<script lang="ts">
	import { components } from '$content/index.js';
	import * as InputGroup from '$lib/components/ui/input-group';
	import SearchIcon from '@lucide/svelte/icons/search';
	import * as Kbd from '$lib/components/ui/kbd';
	import { shortcut } from '$lib/actions/shortcut.svelte';

	let search = $state('');
	let searchInput = $state<HTMLInputElement | null>(null);

	const filteredComponents = $derived.by(() => {
		return components.filter((component) => {
			return component.title.toLowerCase().includes(search.toLowerCase());
		});
	});
</script>

<svelte:window
	use:shortcut={{
		key: '/',
		callback: () => {
			searchInput?.focus();
		}
	}}
/>

<div class="flex flex-col items-center gap-8">
	<div class="flex w-full flex-col items-center gap-2 pt-6 pb-3 md:pt-10 md:pb-6 lg:pt-20 lg:pb-10">
		<h1 class="text-center text-5xl font-medium">Components</h1>
		<p class="text-center text-lg">Browser our library of beautiful, composable components.</p>
		<InputGroup.Root class="mt-4 w-full max-w-md">
			<InputGroup.Input
				bind:ref={searchInput}
				placeholder="Search components..."
				bind:value={search}
			/>
			<InputGroup.Addon>
				<SearchIcon class="size-4 shrink-0 opacity-50" />
			</InputGroup.Addon>
			<InputGroup.Addon align="inline-end">
				<Kbd.Root>/</Kbd.Root>
			</InputGroup.Addon>
		</InputGroup.Root>
	</div>
	<div class="container">
		<div class="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
			{#each filteredComponents as component (component.path)}
				<div class="border-border hover:bg-accent relative rounded-lg p-4">
					<a href={component.href} class="text-lg font-medium">
						<span class="absolute inset-0"></span>
						{component.title}
					</a>
					<p class="text-muted-foreground text-sm">{component.description}</p>
				</div>
			{/each}
		</div>
	</div>
</div>
