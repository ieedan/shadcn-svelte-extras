import { UseClipboard } from '$lib/hooks/use-clipboard.svelte';
import { resolveCommand } from 'package-manager-detector/commands';
import { Context } from 'runed';
import type { ReadableBoxedValues, WritableBoxedValues } from 'svelte-toolbelt';

export const AGENTS = ['pnpm', 'npm', 'yarn', 'bun'] as const;
export type Agent = (typeof AGENTS)[number];

export type ProviderProps<RegistryOptions extends readonly string[]> = WritableBoxedValues<{
	registry: string;
	agent: Agent;
}> &
	ReadableBoxedValues<{
		registryOptions: RegistryOptions;
	}>;

class AddProviderState<RegistryOptions extends readonly string[]> {
	constructor(readonly opts: ProviderProps<RegistryOptions>) {}
}

const ProviderCtx = new Context<AddProviderState<readonly string[]>>('add-provider-ctx');

export function useAddProvider<RegistryOptions extends readonly string[]>(
	opts: ProviderProps<RegistryOptions>
) {
	return ProviderCtx.set(new AddProviderState<RegistryOptions>(opts));
}

export type RootProps = ReadableBoxedValues<{
	item: string;
	withoutRegistry: boolean;
}>;

class AddRootState {
	clipboard = new UseClipboard({ delay: 2000 });

	constructor(
		readonly opts: RootProps,
		readonly provider: AddProviderState<readonly string[]>
	) {}

	get registryOptions() {
		return this.provider.opts.registryOptions.current;
	}

	addCommand: string = $derived.by(() => {
		const command = resolveCommand(this.agent, 'execute', [
			'jsrepo',
			'add',
			this.opts.withoutRegistry.current
				? this.opts.item.current
				: `${this.registry}/${this.opts.item.current}`
		]);

		return command
			? `${command.command} ${command.args.join(' ')}`
			: `npx jsrepo add ${this.opts.withoutRegistry.current ? this.opts.item.current : `${this.registry}/${this.opts.item.current}`}`;
	});

	initCommand: string = $derived.by(() => {
		const command = resolveCommand(this.agent, 'execute', ['jsrepo', 'init', this.registry]);

		return command
			? `${command.command} ${command.args.join(' ')}`
			: `npx jsrepo init ${this.registry}`;
	});

	get registry() {
		return this.provider.opts.registry.current;
	}

	set registry(value: string) {
		this.provider.opts.registry.current = value;
	}

	get agent() {
		return this.provider.opts.agent.current;
	}

	set agent(value: Agent) {
		this.provider.opts.agent.current = value;
	}
}

const AddCtx = new Context<AddRootState>('add-ctx');

class AddButtonState {
	constructor(readonly root: AddRootState) {}

	props = $derived.by(() => ({
		onclick: () => this.root.clipboard.copy(this.root.addCommand)
	}));
}

type AddDropdownAgentOptionProps = ReadableBoxedValues<{
	agent: Agent;
}>;

class AddDropdownAgentOptionState {
	constructor(
		readonly opts: AddDropdownAgentOptionProps,
		readonly root: AddRootState
	) {}

	props = $derived.by(() => ({
		onSelect: () => {
			this.root.agent = this.opts.agent.current;
			this.root.clipboard.copy(this.root.addCommand);
		}
	}));
}

type AddDropdownRegistryOptionProps = ReadableBoxedValues<{
	registry: string;
}>;

class AddDropdownRegistryOptionState {
	constructor(
		readonly opts: AddDropdownRegistryOptionProps,
		readonly root: AddRootState
	) {}

	props = $derived.by(() => ({
		onSelect: () => {
			this.root.registry = this.opts.registry.current;
			this.root.clipboard.copy(this.root.addCommand);
		}
	}));
}

class AddDropdownCopyInitState {
	constructor(readonly root: AddRootState) {}

	props = $derived.by(() => ({
		onSelect: () => this.root.clipboard.copy(this.root.initCommand)
	}));
}

export function useAdd(props: RootProps) {
	return AddCtx.set(new AddRootState(props, ProviderCtx.get()));
}

export function useAddButton() {
	return new AddButtonState(AddCtx.get());
}

export function useAddDropdownAgentOption(opts: AddDropdownAgentOptionProps) {
	return new AddDropdownAgentOptionState(opts, AddCtx.get());
}

export function useAddDropdownRegistryOption(opts: AddDropdownRegistryOptionProps) {
	return new AddDropdownRegistryOptionState(opts, AddCtx.get());
}

export function useAddDropdownCopyInit() {
	return new AddDropdownCopyInitState(AddCtx.get());
}
