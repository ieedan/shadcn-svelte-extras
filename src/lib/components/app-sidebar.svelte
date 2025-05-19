<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { map } from '$lib/map';
	import type { ComponentProps } from 'svelte';
	import Logo from './logo.svelte';
	import { Badge } from '$lib/components/ui/badge';
	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref {...restProps}>
	<Sidebar.Header class="flex h-16 justify-center pl-6">
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton
					size="lg"
					class="hover:bg-background-secondary active:bg-background-secondary dark:hover:bg-background-secondary dark:active:bg-background-secondary"
				>
					{#snippet child({ props })}
						<a href="/" {...props}>
							<div class="-ml-2.5 flex place-items-center gap-2">
								<Logo class="size-8 shrink-0" />
								<span class="text-lg font-semibold">shadcn-extras</span>
							</div>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.Menu>
				{#each Object.entries(map) as [group, routes] (group)}
					<Sidebar.Group>
						<Sidebar.GroupLabel>{group}</Sidebar.GroupLabel>
						<Sidebar.GroupContent>
							<Sidebar.Menu>
								{#each routes as { name, href, status } (name)}
									<Sidebar.MenuItem>
										<Sidebar.MenuButton>
											{#snippet child({ props })}
												<a {href} {...props}>
													{name}
													{#if status}
														<Badge class="bg-brand hover:bg-brand text-white">
															{status}
														</Badge>
													{/if}
												</a>
											{/snippet}
										</Sidebar.MenuButton>
									</Sidebar.MenuItem>
								{/each}
							</Sidebar.Menu>
						</Sidebar.GroupContent>
					</Sidebar.Group>
				{/each}
			</Sidebar.Menu>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
