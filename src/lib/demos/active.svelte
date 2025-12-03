<script lang="ts">
	import { active } from '$lib/actions/active.svelte';

	const links = [
		{
			title: 'Button',
			href: '#/',
			isHash: true
		},
		{
			title: 'Code',
			href: '#code',
			isHash: true
		},
		{
			title: 'Field Set',
			href: '#field-set',
			isHash: true
		}
	];
</script>

<div class="flex w-full max-w-[200px] flex-col gap-1">
	<span class="text-muted-foreground text-xs font-medium"> Components </span>
	<div class="flex flex-col">
		{#each links as { title, href, isHash } (title)}
			<a
				{href}
				use:active={{ isHash }}
				class="text-muted-foreground data-[active=true]:border-l-primary data-[active=true]:bg-secondary data-[active=true]:text-primary data-[active=false]:hover:border-l-secondary data-[active=false]:hover:bg-secondary/50
				rounded-r-md border-l-2 border-transparent
				px-4 py-1
				transition-all"
			>
				{title}
			</a>
		{/each}
	</div>
</div>
