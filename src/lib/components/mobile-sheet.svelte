<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import MenuIcon from '@lucide/svelte/icons/menu';
	import XIcon from '@lucide/svelte/icons/x';
	import { groupedDocs } from '$lib/features/docs/docs';

	let open = $state(false);

	const menuRoutes = [
		{ href: '/', title: 'Home' },
		{ href: '/docs', title: 'Docs' },
		{ href: '/components', title: 'Components' },
		{ href: '/hooks', title: 'Hooks' },
		{ href: '/actions', title: 'Actions' }
	];
</script>

<Sheet.Root bind:open>
	<Sheet.Trigger class="flex items-center gap-2 md:hidden">
		{#if open}
			<XIcon class="size-5" />
		{:else}
			<MenuIcon class="size-5" />
		{/if}
		Menu
	</Sheet.Trigger>
	<Sheet.Content
		showOverlay={false}
		showCloseButton={false}
		side="left"
		class="top-(--header-height)! h-[calc(100dvh-var(--header-height))] overflow-y-auto data-[side=left]:w-full"
	>
		<div class="flex flex-col gap-6 px-6 py-6">
			<div class="flex flex-col gap-2">
				<h3 class="text-muted-foreground text-xs">Menu</h3>
				<ul class="flex flex-col gap-2">
					{#each menuRoutes as route (route.href)}
						<li class="flex flex-col gap-2">
							<a href={route.href} class="text-xl" onclick={() => (open = false)}>
								{route.title}
							</a>
						</li>
					{/each}
				</ul>
			</div>
			{#each Object.entries(groupedDocs) as [groupTitle, routes] (groupTitle)}
				<div class="flex flex-col gap-2">
					<h3 class="text-muted-foreground text-xs">{groupTitle}</h3>
					<ul class="flex flex-col gap-2">
						{#each routes as route (route.href)}
							<li class="flex flex-col gap-2">
								<a href={route.href} class="text-xl" onclick={() => (open = false)}>
									{route.title}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</Sheet.Content>
</Sheet.Root>
