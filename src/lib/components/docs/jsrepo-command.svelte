<script lang="ts" module>
	import { tv, type VariantProps } from 'tailwind-variants';

	const style = tv({
		base: 'border-border w-full rounded-lg border',
		variants: {
			variant: {
				default: 'bg-card',
				secondary: 'bg-secondary/50 border-transparent'
			}
		}
	});

	type Variant = VariantProps<typeof style>['variant'];

	export type PMCommandProps = {
		variant?: Variant;
		class?: string;
		agents?: Agent[];
		agent?: Agent;
		command: Command;
		args: string[];
	};
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { Command, Agent } from 'package-manager-detector';
	import { resolveCommand } from 'package-manager-detector/commands';
	import CopyButton from '$lib/components/ui/copy-button/copy-button.svelte';
	import ClipboardIcon from '@lucide/svelte/icons/clipboard';
	import TerminalIcon from '@lucide/svelte/icons/terminal';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { PersistedState } from 'runed';
	import * as Tabs from '$lib/components/ui/tabs';

	let { variant = 'default', class: className, command, args }: PMCommandProps = $props();

	if (args[0] !== 'jsrepo') {
		throw new Error("jsrepo command's first arg must be jsrepo");
	}

	const agents = ['jsrepo', 'pnpm', 'npm', 'bun', 'yarn'] as const;

	const agent = new PersistedState<Agent | 'jsrepo'>(
		'user-package-manager-jsrepo-command',
		'jsrepo'
	);

	const cmd = $derived.by(() => {
		if (agent.current === 'jsrepo') {
			return {
				command: 'jsrepo',
				args: args.slice(1) // remove the first argument (jsrepo)
			};
		}

		return resolveCommand(agent.current, command, args);
	});

	const commandText = $derived(`${cmd?.command} ${cmd?.args.join(' ')}`);
</script>

<div class={cn(style({ variant }), className)}>
	<div class="border-border flex place-items-center justify-between gap-2 border-b py-1 pr-2">
		<div class="flex place-items-center gap-2 px-2">
			<div class="bg-foreground flex size-4 place-items-center justify-center opacity-50">
				<TerminalIcon class="text-background size-3" />
			</div>
			<Tabs.Root bind:value={agent.current}>
				<Tabs.List class="h-auto bg-transparent p-0">
					{#each agents as pm (pm)}
						<Tabs.Trigger value={pm} class="h-7 font-mono text-sm font-light">
							{pm}
						</Tabs.Trigger>
					{/each}
				</Tabs.List>
			</Tabs.Root>
		</div>
		<Tooltip.Root>
			<Tooltip.Trigger>
				{#snippet child({ props })}
					<CopyButton {...props} text={commandText} class="size-6 [&_svg]:size-3">
						{#snippet icon()}
							<ClipboardIcon />
						{/snippet}
					</CopyButton>
				{/snippet}
			</Tooltip.Trigger>
			<Tooltip.Content>Copy to Clipboard</Tooltip.Content>
		</Tooltip.Root>
	</div>
	<div class="no-scrollbar overflow-x-auto p-3">
		<span class="text-muted-foreground font-mono text-sm leading-none font-light text-nowrap">
			{commandText}
		</span>
	</div>
</div>

<style lang="postcss">
	:global(.no-scrollbar) {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
</style>
