import * as api from '../api-reference';
import type { FileDropZoneRootPropsWithoutHTML, FileDropZoneTriggerPropsWithoutHTML } from '$lib/components/ui/file-drop-zone/types';

const Root = api.createComponentReference<FileDropZoneRootPropsWithoutHTML>({
	name: 'Root',
	description: 'The root file drop zone component. Renders a hidden file input element.',
	props: {
		ref: api.createAnyProp({
			description: 'A reference to the input element.',
			bindable: true,
			type: 'HTMLInputElement',
			defaultValue: 'null'
		}),
		id: api.createStringProp({
			description: 'The unique identifier for the file input element. Auto-generated if not provided.'
		}),
		children: api.createAnyProp({
			description:
				'The content to render inside the drop zone. Typically contains FileDropZone.Trigger and/or FileDropZone.Textarea components.',
			type: 'Snippet'
		}),
		onUpload: api.createFunctionProp({
			description: 'Called with the uploaded files when the user drops or selects files.',
			type: '(files: File[]) => Promise<void>',
			required: true
		}),
		maxFiles: api.createNumberProp({
			description: 'The maximum number of files allowed to be uploaded.'
		}),
		fileCount: api.createNumberProp({
			description: 'The current number of files uploaded. Required if using maxFiles.'
		}),
		maxFileSize: api.createNumberProp({
			description: 'The maximum size of a file in bytes.'
		}),
		onFileRejected: api.createFunctionProp({
			description: 'Called when a file does not meet the upload criteria (size, or type).',
			type: '(opts: { reason: FileRejectedReason; file: File }) => void'
		}),
		accept: api.createStringProp({
			description:
				'A comma separated list of one or more file types to accept. [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept)\n\nExample: ".doc,.docx,application/msword"\nCommon: "audio/*", "image/*", "video/*"'
		})
	}
});

const Trigger = api.createComponentReference<FileDropZoneTriggerPropsWithoutHTML>({
	name: 'Trigger',
	description: 'The trigger element for the file drop zone. Renders as a label that activates the file input. Provides a default UI if no children are provided.',
	props: {
		ref: api.createAnyProp({
			description: 'A reference to the label element.',
			bindable: true,
			type: 'HTMLLabelElement',
			defaultValue: 'null'
		}),
		children: api.createAnyProp({
			description:
				'Custom content to render inside the trigger. If not provided, a default drag-and-drop UI is shown.',
			type: 'Snippet'
		})
	}
});

const Textarea = api.createComponentReference({
	name: 'Textarea',
	description: 'A textarea component that supports file uploads via drag-and-drop, paste, and click-to-select. Integrates with the FileDropZone root component.',
	props: {
		child: api.createAnyProp({
			description: 'Custom render function for the textarea element. Receives props to spread on the textarea.',
			type: 'Snippet',
			tooltip: 'Snippet<[{ props: HTMLAttributes<HTMLTextAreaElement> }]>'
		}),
		onpaste: api.createFunctionProp({
			description: 'Called when content is pasted into the textarea. Also handles file paste events.',
			type: '(e: ClipboardEvent) => void'
		}),
		ondragover: api.createFunctionProp({
			description: 'Called when files are dragged over the textarea.',
			type: '(e: DragEvent) => void'
		}),
		ondrop: api.createFunctionProp({
			description: 'Called when files are dropped onto the textarea. Also handles file drop events.',
			type: '(e: DragEvent) => void'
		})
	}
});

export const reference = {
	name: 'FileDropZone' as const,
	components: {
		Root,
		Trigger,
		Textarea
	}
};
