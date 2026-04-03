<script lang="ts">
	import Logo from './logo.svelte';
	import { LightSwitch } from './ui/light-switch';
	import GithubLogo from './logos/github.svelte';
	import Button from './button.svelte';
	import LayoutToggle from './layout-toggle.svelte';
	import { Separator } from './ui/separator';
</script>

<header class="bg-background sticky top-0 z-10 flex flex-col items-center">
	<div class="site-container flex h-(--header-height) w-full items-center justify-between">
		<div class="flex items-center">
			<a href="/">
				<Logo class="mr-2 size-6" />
			</a>
			{@render HeaderLink({ href: '/docs', name: 'Docs' })}
			{@render HeaderLink({ href: '/components', name: 'Components' })}
			{@render HeaderLink({ href: '/hooks', name: 'Hooks' })}
			{@render HeaderLink({ href: '/actions', name: 'Actions' })}
		</div>
		<div class="flex items-center gap-2 **:data-[slot=separator]:h-4!">
			<LayoutToggle />
			<Separator orientation="vertical" />
			<LightSwitch variant="ghost" />
			<Button variant="ghost" href="https://github.com/ieedan/shadcn-svelte-extras">
				<GithubLogo class="size-4" />
			</Button>
		</div>
	</div>
</header>

{#snippet HeaderLink({ href, name }: { href: string; name: string })}
	<a
		{href}
		class="hover:bg-secondary flex h-7 items-center justify-center rounded-md px-2.5 text-sm transition-all"
	>
		{name}
	</a>
{/snippet}
