<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import ShadcnSvelteExtras from '$lib/components/shadcn-svelte-extras.svelte';
	import { Code } from '$lib/components/ui/code';
	import { Snippet } from '$lib/components/ui/snippet';
</script>

<p>
	<ShadcnSvelteExtras /> uses
	<a target="_blank" href="https://jsrepo.dev" class="font-bold underline"> jsrepo </a> to allow you
	to install blocks into project just like in
	<a target="_blank" href="https://next.shadcn-svelte.com" class="font-bold text-nowrap underline">
		shadcn-svelte
	</a>.
</p>
<Subheading>Setup</Subheading>
<p>Install jsrepo:</p>
<Snippet text="npm install jsrepo@latest -g" />
<p>
	Initialize jsrepo and add <ShadcnSvelteExtras /> as a repo:
</p>
<Snippet text="jsrepo init @ieedan/shadcn-svelte-extras" />
<p>Configure your paths so that components, hooks, and utils go to the right places:</p>
<div>
	<Code
		lang="json"
		code={`{
    "paths": {
			"*": "$lib/blocks",
			"ui": "$lib/components/ui",
			"hooks": "$lib/hooks",
			"actions": "$lib/actions",
			"utils": "$lib/utils"
    }
}`}
	/>
</div>
<p>Start adding extras!</p>
<Snippet text="jsrepo add ui/button" />
<Subheading>Tailwind v4</Subheading>
<p>
	This site has been fully updated to tailwindcss v4. If you are looking for components compatible
	with tailwindcss@v3 see the guide below.
</p>
<Subheading>Tailwind v3</Subheading>
<p>
	You can still access the tailwind v3 components by pinning the registry version to the latest
	tailwind v3 compatible version:
</p>
<div>
	<Code
		lang="json"
		code={`{
    "repos": ["@ieedan/shadcn-svelte-extras@2.1.1"],
}`}
	/>
</div>
