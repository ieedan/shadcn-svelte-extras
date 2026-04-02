import { REGISTRY_ITEM_URL_BASE } from '$lib/constants';
import { UseClipboard } from '$lib/hooks/use-clipboard.svelte';
import { resolveCommand } from 'package-manager-detector/commands';
import { getContext, setContext } from 'svelte';
import type { ReadableBoxedValues, WritableBoxedValues } from 'svelte-toolbelt';

/** Stable keys for Svelte context (Symbol.for avoids duplicate-key issues from multiple `runed` copies). */
const ADD_PROVIDER_KEY = Symbol.for('shadcn-svelte-extras.add-provider');
const ADD_ROOT_KEY = Symbol.for('shadcn-svelte-extras.add-root');

export const AGENTS = ['pnpm', 'npm', 'yarn', 'bun'] as const;
export type Agent = (typeof AGENTS)[number];

export const INSTALLERS = ['jsrepo', 'shadcn-svelte'] as const;
export type Installer = (typeof INSTALLERS)[number];

export type ProviderProps<RegistryOptions extends readonly string[]> = WritableBoxedValues<{
	registry: string;
	agent: Agent;
	installer: Installer;
}> &
	ReadableBoxedValues<{
		registryOptions: RegistryOptions;
	}>;

class AddProviderState<RegistryOptions extends readonly string[]> {
	constructor(readonly opts: ProviderProps<RegistryOptions>) {}
}

export function useAddProvider<RegistryOptions extends readonly string[]>(
	opts: ProviderProps<RegistryOptions>
) {
	return setContext(ADD_PROVIDER_KEY, new AddProviderState<RegistryOptions>(opts));
}

function getAddProvider(): AddProviderState<readonly string[]> {
	const ctx = getContext<AddProviderState<readonly string[]> | undefined>(ADD_PROVIDER_KEY);
	if (ctx === undefined) {
		throw new Error('Context "add-provider" not found');
	}
	return ctx;
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
		if (this.installer === 'shadcn-svelte') {
			const url = `${REGISTRY_ITEM_URL_BASE}/${this.opts.item.current}.json`;
			const command = resolveCommand(this.agent, 'execute', ['shadcn-svelte@latest', 'add', url]);

			return command
				? `${command.command} ${command.args.join(' ')}`
				: `npx shadcn-svelte@latest add ${url}`;
		}

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
		if (this.installer === 'shadcn-svelte') {
			const command = resolveCommand(this.agent, 'execute', ['shadcn-svelte@latest', 'init']);

			return command
				? `${command.command} ${command.args.join(' ')}`
				: `npx shadcn-svelte@latest init`;
		}

		const command = resolveCommand(this.agent, 'execute', ['jsrepo', 'init', this.registry]);

		return command
			? `${command.command} ${command.args.join(' ')}`
			: `npx jsrepo init ${this.registry}`;
	});

	cliDocsUrl: string = $derived.by(() =>
		this.installer === 'shadcn-svelte'
			? 'https://www.shadcn-svelte.com/docs/cli'
			: 'https://jsrepo.dev/docs/cli/add'
	);

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

	get installer() {
		return this.provider.opts.installer.current;
	}

	set installer(value: Installer) {
		this.provider.opts.installer.current = value;
	}
}

function getAddRoot(): AddRootState {
	const ctx = getContext<AddRootState | undefined>(ADD_ROOT_KEY);
	if (ctx === undefined) {
		throw new Error('Context "add-root" not found');
	}
	return ctx;
}

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

type AddDropdownInstallerOptionProps = ReadableBoxedValues<{
	installer: Installer;
}>;

class AddDropdownInstallerOptionState {
	constructor(
		readonly opts: AddDropdownInstallerOptionProps,
		readonly root: AddRootState
	) {}

	props = $derived.by(() => ({
		onSelect: () => {
			this.root.installer = this.opts.installer.current;
			this.root.clipboard.copy(this.root.addCommand);
		}
	}));
}

class AddDropdownCopyInitState {
	constructor(readonly root: AddRootState) {}

	props = $derived.by(() => ({
		onSelect: () => this.root.clipboard.copy(this.root.initCommand)
	}));

	get initHint() {
		return this.root.installer === 'shadcn-svelte' ? 'Init project' : 'Init registry';
	}
}

class AddDropdownDocsLinkState {
	constructor(readonly root: AddRootState) {}

	props = $derived.by(() => ({
		onSelect: () => window.open(this.root.cliDocsUrl, '_blank')
	}));
}

export function useAdd(props: RootProps) {
	return setContext(ADD_ROOT_KEY, new AddRootState(props, getAddProvider()));
}

export function useAddButton() {
	return new AddButtonState(getAddRoot());
}

export function useAddDropdownAgentOption(opts: AddDropdownAgentOptionProps) {
	return new AddDropdownAgentOptionState(opts, getAddRoot());
}

export function useAddDropdownRegistryOption(opts: AddDropdownRegistryOptionProps) {
	return new AddDropdownRegistryOptionState(opts, getAddRoot());
}

export function useAddDropdownInstallerOption(opts: AddDropdownInstallerOptionProps) {
	return new AddDropdownInstallerOptionState(opts, getAddRoot());
}

export function useAddDropdownCopyInit() {
	return new AddDropdownCopyInitState(getAddRoot());
}

export function useAddDropdownDocsLink() {
	return new AddDropdownDocsLinkState(getAddRoot());
}
