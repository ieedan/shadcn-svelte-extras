import type { ReadableBoxedValues } from 'svelte-toolbelt';
import type { FileRejectedReason } from './types';
import { Context } from 'runed';
import type { HTMLAttributes } from 'svelte/elements';

function getFiles(dataTransfer: DataTransfer | null): File[] {
	return Array.from(dataTransfer?.files ?? []);
}

function hasFiles(dataTransfer: DataTransfer | null): boolean {
	return dataTransfer?.types.includes('Files') ?? false;
}

type FileDropZoneStateOptions = ReadableBoxedValues<{
	id: string;
	disabled: boolean;
	onUpload: (files: File[]) => Promise<void>;
	maxFiles: number | undefined;
	fileCount: number | undefined;
	maxFileSize: number | undefined;
	onFileRejected: ((opts: { reason: FileRejectedReason; file: File }) => void) | undefined;
	accept: string | undefined;
}>;

class FileDropZoneState {
	uploading = $state(false);
	#handledPasteEvents = new WeakSet<ClipboardEvent>();

	constructor(readonly opts: FileDropZoneStateOptions) {
		if (this.opts.maxFiles !== undefined && this.opts.fileCount === undefined) {
			console.warn(
				'Make sure to provide FileDropZone with `fileCount` when using the `maxFiles` prompt'
			);
		}

		this.onchange = this.onchange.bind(this);
		this.ondrop = this.ondrop.bind(this);
		this.onpaste = this.onpaste.bind(this);
	}

	onpaste(e: ClipboardEvent) {
		this.uploadFromClipboard(e);
	}

	async ondrop(
		e: DragEvent & {
			currentTarget: EventTarget;
		}
	) {
		if (this.opts.disabled.current || !this.canUploadFiles) return;

		e.preventDefault();

		const droppedFiles = getFiles(e.dataTransfer);

		await this.upload(droppedFiles);
	}

	async uploadFromClipboard(e: ClipboardEvent) {
		if (this.opts.disabled.current || !this.canUploadFiles) return;

		if (this.#handledPasteEvents.has(e)) return;

		this.#handledPasteEvents.add(e);

		const pastedFiles = getFiles(e.clipboardData);

		if (pastedFiles.length === 0) return;

		await this.upload(pastedFiles);
	}

	async onchange(
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) {
		if (this.opts.disabled.current) return;

		const selectedFiles = e.currentTarget.files;

		if (!selectedFiles) return;

		await this.upload(Array.from(selectedFiles));

		// this if a file fails and we upload the same file again we still get feedback
		(e.target as HTMLInputElement).value = '';
	}

	shouldAcceptFile(file: File, fileNumber: number): FileRejectedReason | undefined {
		if (this.opts.maxFileSize.current !== undefined && file.size > this.opts.maxFileSize.current)
			return 'Maximum file size exceeded';

		if (this.opts.maxFiles.current !== undefined && fileNumber > this.opts.maxFiles.current)
			return 'Maximum files uploaded';

		if (!this.opts.accept.current) return undefined;

		const acceptedTypes = this.opts.accept.current.split(',').map((a) => a.trim().toLowerCase());
		const fileType = file.type.toLowerCase();
		const fileName = file.name.toLowerCase();

		const isAcceptable = acceptedTypes.some((pattern) => {
			// check extension like .mp4
			if (fileType === '' || pattern.startsWith('.')) {
				return fileName.endsWith(pattern);
			}

			// if pattern has wild card like video/*
			if (pattern.endsWith('/*')) {
				const baseType = pattern.slice(0, pattern.indexOf('/*'));
				return fileType.startsWith(baseType + '/');
			}

			// otherwise it must be a specific type like video/mp4
			return fileType === pattern;
		});

		if (!isAcceptable) return 'File type not allowed';

		return undefined;
	}

	upload = async (uploadFiles: File[]) => {
		this.uploading = true;

		const validFiles: File[] = [];

		for (let i = 0; i < uploadFiles.length; i++) {
			const file = uploadFiles[i];

			const rejectedReason = this.shouldAcceptFile(
				file,
				(this.opts.fileCount?.current ?? 0) + i + 1
			);

			if (rejectedReason) {
				this.opts.onFileRejected.current?.({ file, reason: rejectedReason });
				continue;
			}

			validFiles.push(file);
		}

		await this.opts.onUpload.current?.(validFiles);

		this.uploading = false;
	};

	canUploadFiles = $derived.by(() => {
		if (this.opts.disabled.current) return false;
		if (this.uploading) return false;
		if (
			this.opts.maxFiles.current !== undefined &&
			this.opts.fileCount.current !== undefined &&
			this.opts.fileCount.current >= this.opts.maxFiles.current
		)
			return false;
		return true;
	});

	props = $derived.by(() => ({
		disabled: !this.canUploadFiles,
		id: this.opts.id.current,
		accept: this.opts.accept.current,
		multiple:
			this.opts.maxFiles.current === undefined ||
			this.opts.maxFiles.current - (this.opts.fileCount.current ?? 0) > 1,
		type: 'file',
		onchange: this.onchange
	}));
}

class FileDropZoneTrigger {
	constructor(readonly rootState: FileDropZoneState) {}

	ondragover(e: DragEvent) {
		e.preventDefault();
	}

	ondrop(
		e: DragEvent & {
			currentTarget: EventTarget & HTMLLabelElement;
		}
	) {
		this.rootState.ondrop(e);
	}

	props = $derived.by(() => ({
		ondragover: this.ondragover.bind(this),
		ondrop: this.ondrop.bind(this),
		for: this.rootState.opts.id.current,
		'aria-disabled': !this.rootState.canUploadFiles
	}));
}

type FileDropZoneTextareaOptions = ReadableBoxedValues<{
	ondragover: HTMLAttributes<HTMLTextAreaElement>['ondragover'];
	ondrop: HTMLAttributes<HTMLTextAreaElement>['ondrop'];
	onpaste: HTMLAttributes<HTMLTextAreaElement>['onpaste'];
}>;

class FileDropZoneTextareaState {
	constructor(
		readonly opts: FileDropZoneTextareaOptions,
		readonly rootState: FileDropZoneState
	) {}

	ondragover(e: Parameters<NonNullable<HTMLAttributes<HTMLTextAreaElement>['ondragover']>>[0]) {
		e.preventDefault();
		this.opts.ondragover.current?.(e);
	}

	ondrop(e: Parameters<NonNullable<HTMLAttributes<HTMLTextAreaElement>['ondrop']>>[0]) {
		this.rootState.ondrop(e);
		this.opts.ondrop.current?.(e);
	}

	onpaste(e: Parameters<NonNullable<HTMLAttributes<HTMLTextAreaElement>['onpaste']>>[0]) {
		this.rootState.uploadFromClipboard(e);

		this.opts.onpaste.current?.(e);
	}

	props = $derived.by(() => ({
		ondragover: this.ondragover.bind(this),
		ondrop: this.ondrop.bind(this),
		onpaste: this.onpaste.bind(this)
	}));
}

type FileDropZoneDragOverlayStateOptions = ReadableBoxedValues<{
	disabled: boolean;
}>;

class FileDropZoneDragOverlayState {
	#depth = $state(0);

	constructor(
		readonly opts: FileDropZoneDragOverlayStateOptions,
		readonly rootState: FileDropZoneState
	) {
		this.ondragenter = this.ondragenter.bind(this);
		this.ondragleave = this.ondragleave.bind(this);
		this.ondragover = this.ondragover.bind(this);
		this.ondrop = this.ondrop.bind(this);
		this.reset = this.reset.bind(this);
	}

	canDropFiles = $derived.by(() => !this.opts.disabled.current && this.rootState.canUploadFiles);

	dragging = $derived.by(() => this.#depth > 0 && this.canDropFiles);

	ondragenter(e: DragEvent) {
		if (!hasFiles(e.dataTransfer)) return;

		this.#depth++;
	}

	ondragleave(e: DragEvent) {
		if (!hasFiles(e.dataTransfer)) return;

		this.#depth = Math.max(this.#depth - 1, 0);
	}

	ondragover(e: DragEvent) {
		if (!this.dragging) return;

		e.preventDefault();
	}

	reset() {
		this.#depth = 0;
	}

	async ondrop(
		e: DragEvent & {
			currentTarget: EventTarget;
		}
	) {
		this.reset();

		if (!this.canDropFiles) return;

		await this.rootState.ondrop(e);
	}

	windowProps = $derived.by(() => ({
		ondragenter: this.ondragenter,
		ondragleave: this.ondragleave,
		ondragover: this.ondragover,
		ondragend: this.reset,
		ondrop: this.reset
	}));

	props = $derived.by(() => ({
		ondragover: this.ondragover,
		ondrop: this.ondrop
	}));
}

const ctx = new Context<FileDropZoneState>('file-drop-zone-state');

export function useFileDropZone(opts: FileDropZoneStateOptions) {
	return ctx.set(new FileDropZoneState(opts));
}

export function useFileDropZoneTrigger() {
	return new FileDropZoneTrigger(ctx.get());
}

export function useFileDropZoneTextarea(opts: FileDropZoneTextareaOptions) {
	return new FileDropZoneTextareaState(opts, ctx.get());
}

export function useFileDropZoneDragOverlay(opts: FileDropZoneDragOverlayStateOptions) {
	return new FileDropZoneDragOverlayState(opts, ctx.get());
}
