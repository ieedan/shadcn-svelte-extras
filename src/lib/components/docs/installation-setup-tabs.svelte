<script lang="ts">
	import JsrepoCommand from '#lib/components/docs/jsrepo-command.svelte';
	import * as UnderlineTabs from '#lib/components/ui/underline-tabs/index.ts';
	import * as Code from '#lib/components/ui/code/index.ts';
	import * as Collapsible from '#lib/components/ui/collapsible/index.ts';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import JsrepoLogo from '#lib/components/logos/jsrepo.svelte';
	import ShadcnSvelteLogo from '#lib/components/logos/shadcn-svelte.svelte';
	import PmCommand from '../ui/pm-command/pm-command.svelte';
	import sveltekit2ConfigExample from '#lib/docs/jsrepo-sveltekit-2-config.ts?raw';
	import sveltekit3ConfigExample from '#lib/docs/jsrepo-sveltekit-3-config.ts?raw';
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
				code={sveltekit3ConfigExample}
				highlight={[[5, 12]]}
				class="w-full min-w-0"
			>
				<Code.CopyButton />
			</Code.Root>
		</div>
		<Collapsible.Root class="mt-6">
			<Collapsible.Trigger
				class="text-muted-foreground hover:text-foreground group flex cursor-pointer items-center gap-1.5 text-sm font-medium transition-colors"
			>
				<ChevronRightIcon class="size-4 transition-transform group-data-[state=open]:rotate-90" />
				Using SvelteKit 2?
			</Collapsible.Trigger>
			<Collapsible.Content>
				<p class="mt-4 leading-7">
					Components are written for SvelteKit 3 so they import files using their real extension (<code
						class="bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-sm">.ts</code
					>). SvelteKit 2 doesn't allow that by default, so use this config to have jsrepo import
					them using
					<code class="bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-sm"
						>.js</code
					>
					instead:
				</p>
				<div class="not-prose mt-6 w-full min-w-0">
					<Code.Root
						lang="typescript"
						code={sveltekit2ConfigExample}
						highlight={[
							[2, 2],
							[4, 17],
							[21, 21],
							[23, 28]
						]}
						class="w-full min-w-0"
					>
						<Code.CopyButton />
					</Code.Root>
				</div>
			</Collapsible.Content>
		</Collapsible.Root>
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
