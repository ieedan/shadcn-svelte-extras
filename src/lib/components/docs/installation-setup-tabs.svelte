<script lang="ts">
	import JsrepoCommand from '$lib/components/docs/jsrepo-command.svelte';
	import * as UnderlineTabs from '$lib/components/ui/underline-tabs';
	import * as Code from '$lib/components/ui/code';
	import JsrepoLogo from '$lib/components/logos/jsrepo.svelte';
	import ShadcnSvelteLogo from '$lib/components/logos/shadcn-svelte.svelte';
	import PmCommand from '../ui/pm-command/pm-command.svelte';

	const jsrepoConfigExample = `import { defineConfig } from 'jsrepo';

export default defineConfig({
	registries: ['@ieedan/shadcn-svelte-extras'],
	paths: {
		ui: '$lib/components/ui',
		component: '$lib/components',
		hook: '$lib/hooks',
		action: '$lib/actions',
		util: '$lib/utils',
		lib: '$lib'
	}
});`;
</script>

<UnderlineTabs.Root value="jsrepo">
	<UnderlineTabs.List>
		<UnderlineTabs.Trigger value="jsrepo" class="flex items-center gap-2">
			<JsrepoLogo />
			jsrepo
			<span class="text-muted-foreground bg-muted rounded-md px-1.5 py-0.5 text-xs">
				Recommended
			</span>
		</UnderlineTabs.Trigger>
		<UnderlineTabs.Trigger value="shadcn-svelte">
			<ShadcnSvelteLogo />
			shadcn-svelte
		</UnderlineTabs.Trigger>
	</UnderlineTabs.List>
	<UnderlineTabs.Content value="jsrepo">
		<p class="leading-7 [&:not(:first-child)]:mt-6">Initialize jsrepo with shadcn-svelte-extras:</p>
		<JsrepoCommand command="execute" args={['jsrepo', 'init', '@ieedan/shadcn-svelte-extras']} />
		<p class="leading-7 [&:not(:first-child)]:mt-6">
			Configure the <code
				class="bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-sm">paths</code
			>
			key in your
			<code class="bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-sm"
				>jsrepo.config.ts</code
			> file so that components, hooks, and utils are added to the correct places:
		</p>
		<div class="not-prose mt-6 w-full min-w-0">
			<Code.Root
				lang="typescript"
				code={jsrepoConfigExample}
				highlight={[[5, 12]]}
				class="w-full min-w-0"
			>
				<Code.CopyButton />
			</Code.Root>
		</div>
		<p class="leading-7 [&:not(:first-child)]:mt-6">
			Install extras into your project using <code
				class="bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-sm"
				>jsrepo add</code
			>:
		</p>
		<JsrepoCommand command="execute" args={['jsrepo', 'add', 'button']} />
	</UnderlineTabs.Content>
	<UnderlineTabs.Content value="shadcn-svelte">
		<p class="leading-7 [&:not(:first-child)]:mt-6">
			Install extras into your project using <code
				class="bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-sm"
				>shadcn-svelte add</code
			>:
		</p>
		<PmCommand
			command="execute"
			args={['shadcn-svelte', 'add', 'https://shadcn-svelte-extras.com/r/button.json']}
		/>
	</UnderlineTabs.Content>
</UnderlineTabs.Root>
