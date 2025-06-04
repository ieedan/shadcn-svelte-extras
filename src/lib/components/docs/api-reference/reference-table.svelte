<script lang="ts" generics="T">
	import type { Component, PropReference } from './api-reference';
	import * as Alert from '$lib/components/ui/alert';
	import { Link } from '$lib/components/ui/link';
	import { cn } from '$lib/utils/utils';

	let { name, component }: { name: string; component: Component<T> } = $props();
</script>

<div class="flex flex-col gap-1">
	<span
		class="bg-secondary flex w-fit place-items-center rounded-md px-2 py-1 font-mono text-lg font-light"
	>
		<span>
			{name}.
		</span>
		<h3>
			{component.name}
		</h3>
	</span>
	<p class="text-neutral-800 dark:text-neutral-300">{component.description}</p>
</div>
{#if component.forwardTo}
	<Alert.Root>
		<Alert.Title>
			Documentation for this component can be found at
			<Link href={component.forwardTo.href}>{component.forwardTo.name}</Link>
		</Alert.Title>
	</Alert.Root>
{:else}
	<div class="border-border bg-card overflow-hidden rounded-lg border">
		<table class={cn('w-full', 'bg-card')}>
			<thead>
				<tr class="bg-muted border-border border-b">
					<th class="text-foreground px-4 py-2 text-left text-sm font-semibold">Prop</th>
					<th class="text-foreground px-4 py-2 text-left text-sm font-semibold">Type</th>
					<th class="text-foreground px-4 py-2 text-left text-sm font-semibold">Default</th>
				</tr>
			</thead>
			<tbody>
				{#each Object.entries(component.props) as [prop, value] (prop)}
					{@const propValue = value as PropReference}
					<tr class="bg-card">
						<td class="text-foreground px-4 py-2 align-top">
							<span
								class="bg-brand/25 text-brand rounded-md px-2 py-1 font-mono text-sm font-light"
							>
								{prop}
							</span>
						</td>
						<td class="text-foreground px-4 py-2 align-top whitespace-pre">
							<span
								class="bg-secondary text-foreground/75 rounded-md px-2 py-1 font-mono text-sm font-light"
							>
								{propValue.type}
							</span>
						</td>
						<td class="text-muted-foreground px-4 py-2 align-top">
							<span class="font-mono text-sm font-light">{propValue.defaultValue ?? '-'}</span>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
