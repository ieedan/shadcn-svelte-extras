<script lang="ts">
	import Logo from './logo.svelte';
	import { buttonVariants } from './ui/button';
</script>

<header class="flex flex-col items-center border-b">
	<div class="flex w-full max-w-7xl items-center justify-between py-2">
		<div class="flex items-center">
			<a href="/">
				<Logo class="mr-2 size-7" />
			</a>
			{@render HeaderLink({ href: '/docs', name: 'Docs' })}
			{@render HeaderLink({ href: '/components', name: 'Components' })}
			{@render HeaderLink({ href: '/hooks', name: 'Hooks' })}
			{@render HeaderLink({ href: '/actions', name: 'Actions' })}
		</div>
		<div class="flex items-center gap-2"></div>
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
