<script lang="ts">
	import { cn } from '$lib/utils/utils';
	import { tv, type VariantProps } from 'tailwind-variants';
	import type { Command, Agent } from 'package-manager-detector';
	import { resolveCommand } from 'package-manager-detector/commands';
	import CopyButton from '../copy-button/copy-button.svelte';
	import { ClipboardIcon, TerminalIcon } from '@lucide/svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';

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

	type Props = {
		variant?: Variant;
		class?: string;
		agents?: Agent[];
		agent?: Agent;
		command: Command;
		args: string[];
	};

	let {
		variant = 'default',
		class: className,
		command,
		agents = ['npm', 'pnpm', 'yarn', 'bun'],
		args,
		agent = $bindable('npm')
	}: Props = $props();

	const cmd = $derived(resolveCommand(agent, command, args));

	const commandText = $derived(`${cmd?.command} ${cmd?.args.join(' ')}`);
</script>

<div class={cn(style({ variant }), className)}>
	<div class="border-border flex place-items-center justify-between gap-2 border-b py-1 pr-2">
		<div class="flex place-items-center gap-2 px-2">
			<div class="bg-foreground flex size-4 place-items-center justify-center opacity-50">
				<TerminalIcon class="text-background size-3" />
			</div>
			<div class="flex place-items-center">
				{#each agents as pm (pm)}
					<button
						type="button"
						class={cn(
							'text-muted-foreground flex h-7 place-items-center rounded-md border border-transparent px-2 py-1 font-mono text-sm leading-none font-light',
							{
								'bg-background border-border text-foreground dark:border-input dark:bg-input/30':
									agent === pm
							}
						)}
						onclick={() => (agent = pm)}
					>
						{pm}
					</button>
				{/each}
			</div>
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
