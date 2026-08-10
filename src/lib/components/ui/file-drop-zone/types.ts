import type { PortalProps, WithChildren, WithoutChildren } from 'bits-ui';
import type { WithElementRef } from 'svelte-toolbelt';
import type { HTMLAttributes, HTMLInputAttributes, HTMLLabelAttributes } from 'svelte/elements';

export type FileRejectedReason =
	| 'Maximum file size exceeded'
	| 'File type not allowed'
	| 'Maximum files uploaded';

export type FileDropZoneRootPropsWithoutHTML = WithChildren<{
	ref?: HTMLInputElement | null;
	id?: string;
	/** Called with the uploaded files when the user drops or clicks and selects their files.
	 *
	 * @param files
	 */
	onUpload: (files: File[]) => Promise<void>;
	/** The maximum amount files allowed to be uploaded */
	maxFiles?: number;
	fileCount?: number;
	/** The maximum size of a file in bytes */
	maxFileSize?: number;
	/** Called when a file does not meet the upload criteria (size, or type) */
	onFileRejected?: (opts: { reason: FileRejectedReason; file: File }) => void;

	// just for extra documentation
	/** Takes a comma separated list of one or more file types.
	 *
	 *  [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept)
	 *
	 * ### Usage
	 * ```svelte
	 * <FileDropZone
	 * 		accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
	 * />
	 * ```
	 *
	 * ### Common Values
	 * ```svelte
	 * <FileDropZone accept="audio/*"/>
	 * <FileDropZone accept="image/*"/>
	 * <FileDropZone accept="video/*"/>
	 * ```
	 */
	accept?: string;
}>;

export type FileDropZoneRootProps = FileDropZoneRootPropsWithoutHTML &
	Omit<HTMLInputAttributes, 'multiple' | 'files' | 'id' | 'class'>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type FileDropZoneTriggerPropsWithoutHTML = WithChildren<WithElementRef<{}>>;

export type FileDropZoneTriggerProps = FileDropZoneTriggerPropsWithoutHTML &
	Omit<HTMLLabelAttributes, 'for'>;

export type FileDropZonePasteCaptureProps = {
	/** Prevents pasted files from being uploaded. */
	disabled?: boolean;
	/** Called whenever the user pastes anywhere on the page. */
	onpaste?: (e: ClipboardEvent) => void;
};

export type FileDropZoneDragOverlayPropsWithoutHTML = WithChildren<
	WithElementRef<
		{
			/** Prevents the overlay from being shown and files from being dropped onto it. */
			disabled?: boolean;
			/** Props passed to the portal the overlay is rendered into. */
			portalProps?: WithoutChildren<PortalProps>;
		},
		HTMLDivElement
	>
>;

export type FileDropZoneDragOverlayProps = FileDropZoneDragOverlayPropsWithoutHTML &
	Omit<HTMLAttributes<HTMLDivElement>, 'children'>;
