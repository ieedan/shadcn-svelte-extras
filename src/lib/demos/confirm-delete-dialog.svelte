<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import { confirmDelete, ConfirmDeleteDialog } from '$lib/components/ui/confirm-delete-dialog';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import Github from '$lib/components/logos/github.svelte';
	import { sleep } from '$lib/utils/sleep';

	type Project = {
		name: string;
		url: string;
		githubUrl: string;
		faviconUrl: string;
	};

	let projects: Project[] = $state([
		{
			name: 'shadcn-svelte',
			url: 'https://shadcn-svelte.com',
			githubUrl: 'https://github.com/huntabyte/shadcn-svelte',
			faviconUrl: 'https://shadcn-svelte.com/favicon.ico'
		},
		{
			name: 'shadcn-svelte-extras',
			url: 'https://shadcn-svelte-extras.com',
			githubUrl: 'https://github.com/ieedan/shadcn-svelte-extras',
			faviconUrl: 'https://shadcn-svelte-extras.com/favicon.svg'
		},
		{
			name: 'jsrepo.dev',
			url: 'https://jsrepo.dev',
			githubUrl: 'https://github.com/jsrepojs/jsrepo',
			faviconUrl: 'https://jsrepo.com/favicon.png'
		},
		{
			name: 'jsrepo.com',
			url: 'https://jsrepo.com',
			githubUrl: 'https://github.com/jsrepojs/jsrepo.com',
			faviconUrl: 'https://jsrepo.com/favicon.png'
		}
	]);
</script>

<ConfirmDeleteDialog />

<div class="w-full p-6">
	<div class="grid w-full gap-2 sm:grid-cols-2 xl:grid-cols-3">
		{#each projects as project (project.url)}
			<div
				class="hover:bg-accent/50 border-border relative flex w-full flex-col gap-2 rounded-md border p-4 transition-colors"
			>
				<div class="flex items-center justify-between">
					<a href="#/" class="flex items-center gap-2">
						<span class="absolute inset-0"></span>
						<Avatar.Root class="rounded-md">
							<Avatar.Image src={project.faviconUrl} />
						</Avatar.Root>
						<div class="flex flex-col">
							<span class="text-sm font-medium">{project.name}</span>
							<span class="text-muted-foreground text-xs">{new URL(project.url).hostname}</span>
						</div>
					</a>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger class={buttonVariants({ variant: 'ghost', size: 'icon' })}>
							<EllipsisIcon class="size-4" />
						</DropdownMenu.Trigger>
						<DropdownMenu.Content align="end">
							<DropdownMenu.Item>Add Favorite</DropdownMenu.Item>
							<DropdownMenu.Item>View Logs</DropdownMenu.Item>
							<DropdownMenu.Item>Archive</DropdownMenu.Item>
							<DropdownMenu.Item
								variant="destructive"
								onSelect={() => {
									confirmDelete({
										title: 'Delete repository',
										description: 'Are you sure you want to delete this repository?',
										onConfirm: async () => {
											await sleep(250);
											projects = projects.filter((p) => p.url !== project.url);
										}
									});
								}}
							>
								Delete
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
				<Badge variant="secondary" class="w-fit">
					<Github class="size-4" />
					{project.githubUrl.slice('https://github.com/'.length)}
				</Badge>
			</div>
		{/each}
	</div>
</div>
