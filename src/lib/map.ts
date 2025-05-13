export type Route = {
	name: string;
	description: string;
	href: string;
	specifier?: `${string}/${string}`;
	source?: string;
	status?: 'New' | 'Updated';
};

const map: Record<string, Route[]> = {
	'Getting Started': [
		{
			name: 'Introduction',
			description: 'Introduction to shadcn-svelte-extras.',
			href: '/'
		},
		{
			name: 'Using Extras',
			description: 'How to add and use extras in your project.',
			href: '/docs/using-extras'
		}
	],
	Components: [
		{
			name: 'Avatar Group',
			description: 'A composable avatar grouping component.',
			href: '/components/avatar-group',
			specifier: 'ui/avatar-group',
			source: 'src/lib/components/ui/avatar-group'
		},
		{
			name: 'Button',
			description: 'An extended button component.',
			href: '/components/button',
			specifier: 'ui/button',
			source: 'src/lib/components/ui/button/button.svelte'
		},
		{
			name: 'Chat',
			description: 'Components for creating live chats.',
			href: '/components/chat',
			specifier: 'ui/chat',
			source: 'src/lib/components/ui/chat'
		},
		{
			name: 'Code',
			description: 'A code component.',
			href: '/components/code',
			specifier: 'ui/code',
			source: 'src/lib/components/ui/code/code.svelte'
		},
		{
			name: 'Copy Button',
			description: 'A button used to copy text to the clipboard.',
			href: '/components/copy-button',
			specifier: 'ui/copy-button',
			source: 'src/lib/components/ui/copy-button/copy-button.svelte'
		},
		{
			name: 'Field Set',
			description: 'A field set component.',
			href: '/components/field-set',
			specifier: 'ui/field-set',
			source: 'src/lib/components/ui/field-set'
		},
		{
			name: 'File Drop Zone',
			description: 'A file drop zone component.',
			href: '/components/file-drop-zone',
			specifier: 'ui/file-drop-zone',
			source: 'src/lib/components/ui/file-drop-zone/file-drop-zone.svelte'
		},
		{
			name: 'Image Cropper',
			description: 'A component for uploading and resizing images.',
			href: '/components/image-cropper',
			specifier: 'ui/image-cropper',
			source: 'src/lib/components/ui/image-cropper'
		},
		{
			name: 'IPv4Address Input',
			description: "An IPv4 address input with all the behavior you'd expect.",
			href: '/components/ipv4address-input',
			specifier: 'ui/ipv4address-input',
			source: 'src/lib/components/ui/ipv4address-input'
		},
		{
			name: 'Keyboard Input',
			description: 'Denotes user input from a keyboard.',
			href: '/components/kbd',
			specifier: 'ui/kbd',
			source: 'src/lib/components/ui/kbd/kbd.svelte'
		},
		{
			name: 'Language Switcher',
			description: 'A component for switching your sites locale.',
			href: '/components/language-switcher',
			specifier: 'ui/language-switcher',
			source: 'src/lib/components/ui/language-switcher',
			status: 'New'
		},
		{
			name: 'Light Switch',
			description: 'Click and change the theme.',
			href: '/components/light-switch',
			specifier: 'ui/light-switch',
			source: 'src/lib/components/ui/light-switch/light-switch.svelte'
		},
		{
			name: 'Link',
			description: 'A simple link component.',
			href: '/components/link',
			specifier: 'ui/link',
			source: 'src/lib/components/ui/link/link.svelte'
		},
		{
			name: 'Modal',
			description: 'A responsive dialog component.',
			href: '/components/modal',
			specifier: 'ui/modal',
			source: 'src/lib/components/ui/modal/modal.svelte'
		},
		{
			name: 'NLPDateInput',
			description: 'A natural language date input with suggestions.',
			href: '/components/nlp-date-input',
			specifier: 'ui/nlp-date-input',
			source: 'src/lib/components/ui/nlp-date-input/nlp-date-input.svelte'
		},
		{
			name: 'Phone Input',
			description: 'A phone number input component.',
			href: '/components/phone-input',
			specifier: 'ui/phone-input',
			source: 'src/lib/components/ui/phone-input'
		},
		{
			name: 'PMCommand',
			description: 'A package manager command component.',
			href: '/components/pm-command',
			specifier: 'ui/pm-command',
			source: 'src/lib/components/ui/pm-command/pm-command.svelte'
		},
		{
			name: 'Snippet',
			description: 'A snippet component.',
			href: '/components/snippet',
			specifier: 'ui/snippet',
			source: 'src/lib/components/ui/snippet/snippet.svelte'
		},
		{
			name: 'Tags Input',
			description: 'A tags input component.',
			href: '/components/tags-input',
			specifier: 'ui/tags-input',
			source: 'src/lib/components/ui/tags-input'
		},
		{
			name: 'Terminal',
			description:
				'An implementation of the MacOS terminal. Useful for showcasing a command line interface.',
			href: '/components/terminal',
			specifier: 'ui/terminal',
			source: 'src/lib/components/ui/terminal'
		},
		{
			name: 'Theme Selector',
			description: 'Click to select the theme.',
			href: '/components/theme-selector',
			specifier: 'ui/theme-selector',
			source: 'src/lib/components/ui/theme-selector/theme-selector.svelte'
		},
		{
			name: 'Table of Contents',
			description: 'A component for displaying a table of contents.',
			href: '/components/toc',
			specifier: 'ui/toc',
			source: 'src/lib/components/ui/toc'
		},
		{
			name: 'Tree View',
			description: 'A file tree component.',
			href: '/components/tree-view',
			specifier: 'ui/tree-view',
			source: 'src/lib/components/ui/tree-view'
		},
		{
			name: 'Window',
			description: 'A window component.',
			href: '/components/window',
			specifier: 'ui/window',
			source: 'src/lib/components/ui/window'
		}
	],
	Actions: [
		{
			name: 'Active',
			description: 'An action to determine if a link is active.',
			href: '/actions/active',
			specifier: 'actions/active.svelte',
			source: 'src/lib/actions/active.svelte.ts'
		},
		{
			name: 'Shortcut',
			description: 'An action to create shortcuts for your application.',
			href: '/actions/shortcut',
			specifier: 'actions/shortcut.svelte',
			source: 'src/lib/actions/shortcut.svelte.ts'
		}
	],
	Hooks: [
		{
			name: 'UseAutoScroll',
			description:
				'A hook to enable the creation of containers that automatically scroll to the bottom of their content.',
			href: '/hooks/use-auto-scroll',
			specifier: 'hooks/use-auto-scroll.svelte',
			source: 'src/lib/hooks/use-auto-scroll.svelte.ts'
		},
		{
			name: 'UseBoolean',
			description: 'A hook to simplify working with boolean values.',
			href: '/hooks/use-boolean',
			specifier: 'hooks/use-boolean.svelte',
			source: 'src/lib/hooks/use-boolean.svelte.ts'
		},
		{
			name: 'UseClipboard',
			description: 'A hook to simplify copying text to the clipboard.',
			href: '/hooks/use-clipboard',
			specifier: 'hooks/use-clipboard.svelte',
			source: 'src/lib/hooks/use-clipboard.svelte.ts'
		},
		{
			name: 'UsePromise',
			description: 'A hook to manage the state of a promise reactively in the absence of {#await}.',
			href: '/hooks/use-promise',
			specifier: 'hooks/use-promise.svelte',
			source: 'src/lib/hooks/use-promise.svelte.ts'
		},
		{
			name: 'UseToc',
			description: 'A hook used to generate a table of contents based on the page content',
			href: '/hooks/use-toc',
			specifier: 'hooks/use-toc.svelte',
			source: 'src/lib/hooks/use-toc.svelte.ts'
		}
	]
};

export { map };
