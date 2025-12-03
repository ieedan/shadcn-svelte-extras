import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import { Context, watch } from 'runed';
import type { ReadableBoxedValues, WritableBoxedValues } from 'svelte-toolbelt';
import type * as Resizable from '$lib/components/ui/resizable';

export type TabValue = 'preview' | 'code';
export type Mode = 'iframe' | 'component';

type DemoRootProps = WritableBoxedValues<{
	value: TabValue;
}>;

class DemoState {
	previewSize = $state<number>(100);
	previewKey = $state<number>(0);
	demo = $state<string>();
	resizableRef = $state<Resizable.Pane | null>(null);
	constructor(readonly opts: DemoRootProps) {}
}

const DemoRootCtx = new Context<DemoState>('demo-root-ctx');

type DemoPreviewProps = ReadableBoxedValues<{
	type: 'iframe' | 'component';
	demo: string | undefined;
	resizableRef: Resizable.Pane | null;
}>;

class DemoPreviewState {
	constructor(
		readonly opts: DemoPreviewProps,
		readonly root: DemoState
	) {
		watch(
			() => this.opts.demo.current,
			(v) => {
				this.root.demo = v;
			}
		);
		watch(
			() => this.opts.resizableRef?.current,
			(v) => {
				this.root.resizableRef = v;
			}
		);

		this.onResize = this.onResize.bind(this);
	}

	onResize(size: number) {
		this.root.previewSize = size;
	}
}

type DemoCodeProps = ReadableBoxedValues<{
	code: string | Promise<string> | undefined;
}>;

class DemoCodeState {
	constructor(
		readonly opts: DemoCodeProps,
		readonly root: DemoState
	) {}

	get code(): Promise<string> {
		if (!this.opts.code.current) return this.#demoCode ?? Promise.resolve('');

		if (typeof this.opts.code.current === 'string') return Promise.resolve(this.opts.code.current);

		return this.opts.code.current;
	}

	#demoCode: Promise<string> | undefined = $derived.by(() => {
		if (!this.root.demo) return undefined;

		return import(`$lib/demos/${this.root.demo}.svelte?raw`).then(({ default: code }) => code);
	});
}

type DemoControlGroupProps = WritableBoxedValues<{
	size: number;
}>;

class DemoControlGroupState {
	constructor(
		readonly opts: DemoControlGroupProps,
		readonly root: DemoState
	) {
		watch(
			() => this.root.previewSize,
			(v) => {
				this.opts.size.current = v;
			}
		);
	}

	onValueChange(value: number) {
		if (value < 0 || value > 100) return;
		this.root.resizableRef?.resize(value);
	}
}

class RefreshState {
	constructor(readonly root: DemoState) {
		this.refresh = this.refresh.bind(this);
	}

	refresh() {
		this.root.previewKey++;
	}
}

class FullscreenState {
	constructor(readonly root: DemoState) {
		this.fullscreen = this.fullscreen.bind(this);
	}

	async fullscreen() {
		await goto(resolve(`/demos/${this.root.demo}`));
	}
}

export function useDemo(props: DemoRootProps) {
	return DemoRootCtx.set(new DemoState(props));
}

export function useDemoPreview(props: DemoPreviewProps) {
	return new DemoPreviewState(props, DemoRootCtx.get());
}

export function useDemoCode(props: DemoCodeProps) {
	return new DemoCodeState(props, DemoRootCtx.get());
}

export function useDemoControlGroup(props: DemoControlGroupProps) {
	return new DemoControlGroupState(props, DemoRootCtx.get());
}

export function useDemoFullscreen() {
	return new FullscreenState(DemoRootCtx.get());
}

export function useDemoRefresh() {
	return new RefreshState(DemoRootCtx.get());
}
