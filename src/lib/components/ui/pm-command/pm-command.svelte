<script lang="ts">
	import { cn } from '$lib/utils/utils';
	import { tv, type VariantProps } from 'tailwind-variants';
	import type { Command, Agent } from 'package-manager-detector';
	import { resolveCommand } from 'package-manager-detector/commands';
	import CopyButton from '../copy-button/copy-button.svelte';
	import { ClipboardIcon } from '@lucide/svelte';

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
	<div class="border-border flex place-items-end justify-between border-b p-2 pb-0">
		<div class="flex place-items-center gap-1">
			{#each agents as pm (pm)}
				<button
					type="button"
					class={{
						'-mb-0.5 border-b-2 border-transparent p-1 font-mono text-sm': true,
						'border-b-primary': agent === pm
					}}
					onclick={() => (agent = pm)}
				>
					{pm}
				</button>
			{/each}
		</div>
		<CopyButton text={commandText} class="mb-1 size-6 [&_svg]:size-3">
			{#snippet icon()}
				<ClipboardIcon />
			{/snippet}
		</CopyButton>
	</div>
	<div class="no-scrollbar overflow-x-auto p-3">
		<span class="font-mono text-sm text-nowrap">
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
