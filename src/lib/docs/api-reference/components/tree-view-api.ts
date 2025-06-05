import * as api from '../api-reference';
import type {
	TreeViewFilePropsWithoutHTML,
	TreeViewFolderProps
} from '$lib/components/ui/tree-view/types';

const Root = api.createComponentReference({
	name: 'Root',
	description: 'The root component of the tree view.',
	props: {}
});

const Folder = api.createComponentReference<TreeViewFolderProps>({
	name: 'Folder',
	description: 'A folder node in the tree view. Can contain children and be expanded/collapsed.',
	props: {
		name: api.createStringProp({
			description: 'The name of the folder.',
			required: true
		}),
		open: api.createBooleanProp({
			description: 'Whether the folder is open (expanded).',
			bindable: true,
			defaultValue: false
		}),
		class: api.createStringProp({
			description: 'Additional classes to apply to the folder.'
		}),
		icon: api.createAnyProp({
			description: 'Custom icon render function for the folder. Receives { name, open }.',
			type: 'Snippet',
			tooltip: `Snippet<[{ name: string; open: boolean }]>`
		}),
		children: api.createAnyProp({
			description: 'The content of the folder (usually TreeView.File or TreeView.Folder).',
			type: 'Snippet'
		})
	}
});

const File = api.createComponentReference<TreeViewFilePropsWithoutHTML>({
	name: 'File',
	description: 'A file node in the tree view. Renders as a button.',
	props: {
		name: api.createStringProp({
			description: 'The name of the file.',
			required: true
		}),
		icon: api.createAnyProp({
			description: 'Custom icon render function for the file. Receives { name }.',
			type: 'Snippet',
			tooltip: `Snippet<[{ name: string }]>`
		}),
		children: api.createAnyProp({
			description: 'The content of the file (usually TreeView.File or TreeView.Folder).',
			type: 'Snippet'
		})
	}
});

export const reference = {
	name: 'TreeView' as const,
	components: {
		Root,
		Folder,
		File
	}
};
