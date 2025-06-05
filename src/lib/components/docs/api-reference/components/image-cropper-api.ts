import * as api from '../api-reference';
import type {
	ImageCropperRootPropsWithoutHTML,
	ImageCropperControlsWithoutHTML,
	ImageCropperPreviewPropsWithoutHTML,
	ImageCropperUploadTriggerPropsWithoutHTML
} from '$lib/components/ui/image-cropper/types';

const Root = api.createComponentReference<ImageCropperRootPropsWithoutHTML>({
	name: 'Root',
	description:
		'The root component for the image cropper. Handles image upload, cropping, and state management.',
	props: {
		src: api.createStringProp({
			description: 'The image source URL. Bind this to get the cropped image.',
			bindable: true
		}),
		onCropped: api.createFunctionProp({
			description: 'Callback fired when cropping is complete. Receives the cropped image URL.',
			type: '(url: string) => void'
		}),
		onUnsupportedFile: api.createFunctionProp({
			description: 'Callback fired when an unsupported file is uploaded. Receives the File object.',
			type: '(file: File) => void'
		}),
		children: api.createAnyProp({
			description: 'The content of the image cropper.',
			type: 'Snippet',
			tooltip: 'Snippet'
		})
	}
});

const Dialog = api.createComponentReference({
	name: 'Dialog',
	description:
		'Dialog wrapper for the image cropper. Forwards all props and behavior to the shadcn-svelte Dialog component.',
	props: {},
	forwardTo: {
		name: 'bits-ui',
		href: 'https://bits-ui.com/docs/components/dialog#content'
	}
});

const Cropper = api.createComponentReference({
	name: 'Cropper',
	description:
		'The cropper area for selecting the crop region. Forwards all props and behavior to svelte-easy-crop.',
	props: {},
	forwardTo: {
		name: 'svelte-easy-crop',
		href: 'https://github.com/ValentinH/svelte-easy-crop'
	}
});

const Controls = api.createComponentReference<ImageCropperControlsWithoutHTML>({
	name: 'Controls',
	description: 'Container for cropper controls.',
	props: {
		ref: api.createAnyProp({
			description: 'A reference to the controls container.',
			bindable: true,
			type: 'HTMLDivElement',
			defaultValue: 'null'
		}),
		children: api.createAnyProp({
			description: 'The content of the controls.',
			type: 'Snippet'
		})
	}
});

const Preview = api.createComponentReference<ImageCropperPreviewPropsWithoutHTML>({
	name: 'Preview',
	description: 'Displays a preview of the cropped image.',
	props: {
		child: api.createAnyProp({
			description: 'A render function for custom preview content.',
			type: 'Snippet',
			tooltip: 'Snippet<[{ src: string }]>'
		})
	}
});

const UploadTrigger = api.createComponentReference<ImageCropperUploadTriggerPropsWithoutHTML>({
	name: 'UploadTrigger',
	description: 'The trigger for uploading an image.',
	props: {
		ref: api.createAnyProp({
			description: 'A reference to the upload trigger label.',
			bindable: true,
			type: 'HTMLLabelElement',
			defaultValue: 'null'
		}),
		children: api.createAnyProp({
			description: 'The content of the upload trigger.',
			type: 'Snippet'
		})
	}
});

export const components = {
	Root,
	Dialog,
	Cropper,
	Controls,
	Preview,
	UploadTrigger
};
