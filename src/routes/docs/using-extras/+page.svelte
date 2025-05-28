<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import ShadcnSvelteExtras from '$lib/components/shadcn-svelte-extras.svelte';
	import { Code } from '$lib/components/ui/code';
	import { Link } from '$lib/components/ui/link';
	import { Snippet } from '$lib/components/ui/snippet';
	import * as Tabs from '$lib/components/ui/tabs';
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
<Subheading>MCP</Subheading>
<p>
	jsrepo now supports <Link href="https://jsrepo.dev/docs/registry/mcp" target="_blank">MCP</Link> and
	you can use it to find and install extras into your project.
</p>
<Tabs.Root value="cursor">
	<Tabs.List>
		<Tabs.Trigger value="cursor">Cursor</Tabs.Trigger>
		<Tabs.Trigger value="windsurf">Windsurf</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="cursor">
		Add the following code to your <CodeSpan>.cursor/mcp.json</CodeSpan> file.
	</Tabs.Content>
	<Tabs.Content value="windsurf">
		Add the following code to your <CodeSpan>.codeium/windsurf/mcp_config.json</CodeSpan> file.
	</Tabs.Content>
</Tabs.Root>
<div>
	<Code
		lang="json"
		code={`{
	"mcpServers": {
		"jsrepo": {
			"command": "npx",
			"args": ["jsrepo", "mcp"]
		}
	}
}`}
	/>
</div>
<p>
	We also added a Cursor Rules config file for your convenience. You can add it when you initialize
	shadcn-svelte-extras with the <CodeSpan>jsrepo init</CodeSpan> command.
</p>
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
