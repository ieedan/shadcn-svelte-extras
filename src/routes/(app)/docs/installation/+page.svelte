<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import { Link } from '$lib/components/ui/link';
	import JsrepoCommand from '$lib/components/docs/jsrepo-command.svelte';
	import Add from '$lib/components/add.svelte';
</script>

<p>
	shadcn-svelte-extras uses <Link href="https://jsrepo.dev" target="_blank">jsrepo</Link> to allow you
	to install components into your project just like in
	<Link href="https://next.shadcn-svelte.com" target="_blank">shadcn-svelte</Link>, but with some
	additional features such as semantic versioning and easy updates.
</p>
<Subheading>Setup</Subheading>
<p>Initialize jsrepo with shadcn-svelte-extras:</p>
<JsrepoCommand command="execute" args={['jsrepo', 'init', '@ieedan/shadcn-svelte-extras']} />
<p>
	Configure the <CodeSpan>paths</CodeSpan> key in your <CodeSpan>jsrepo.config.ts</CodeSpan> file so
	that components, hooks, and utils are added to the correct places:
</p>
<div>
	<Code
		lang="typescript"
		highlight={[[5, 11]]}
		code={`import { defineConfig } from 'jsrepo';

export default defineConfig({
    registries: ['@ieedan/shadcn-svelte-extras'],
    paths: {
			ui: "$lib/components/ui",
			hook: "$lib/hooks",
			action: "$lib/actions",
			util: "$lib/utils",
			lib: "$lib"
    }
});`}
	/>
</div>
<p>Start adding extras!</p>
<Add item="button" />
<Subheading>MCP</Subheading>
<p>To setup the jsrepo MCP server you can run the following command:</p>
<JsrepoCommand command="execute" args={['jsrepo', 'config', 'mcp']} />
<p>This will configure the jsrepo MCP server for the client of your choice.</p>
<p>
	We also added a Cursor Rules config file for your convenience. You can add it when you initialize
	shadcn-svelte-extras with the <CodeSpan>jsrepo init</CodeSpan> command.
</p>
<Subheading>Tailwind v3</Subheading>
<p>
	You can still access the tailwind v3 components by using jsrepo v2 and pinning the registry
	version to the latest tailwind v3 compatible version:
</p>
<div>
	<Code
		lang="json"
		code={`{
    "repos": ["@ieedan/shadcn-svelte-extras@2.1.1"],
}`}
	/>
</div>
