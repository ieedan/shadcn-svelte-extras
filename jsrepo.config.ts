import { defineConfig, RegistryItem } from 'jsrepo';
import addType from './.jsrepo/outputs/add-type';

export default defineConfig({
	registries: ['@registry/kit'],
	paths: {
		ui: '$lib/components/ui',
		block: '$lib/components',
		logo: '$lib/components/logos',
		hook: '$lib/hooks',
		action: '$lib/actions',
		util: '$lib/utils',
		lib: '$lib'
	},
	registry: {
		name: '@ieedan/shadcn-svelte-extras',
		version: 'package',
		authors: ['Aidan Bleser'],
		bugs: 'https://github.com/ieedan/shadcn-svelte-extras/issues',
		description: 'Turn key shadcn-svelte components to help finish your app.',
		homepage: 'https://www.shadcn-svelte-extras.com/',
		repository: 'https://github.com/ieedan/shadcn-svelte-extras',
		tags: ['svelte', 'shadcn', 'typescript', 'components', 'utilities'],
		defaultPaths: {
			ui: '$lib/components/ui',
			block: '$lib/components',
			hook: '$lib/hooks',
			action: '$lib/actions',
			util: '$lib/utils',
			lib: '$lib'
		},
		excludeDeps: ['svelte', '@sveltejs/kit'],
		outputs: [addType()],
		items: [
			// ui
			...([
				{
					name: 'avatar-group',
					title: 'AvatarGroup',
					description: 'A composable avatar group component.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/avatar-group'
						},
						{
							path: 'src/lib/demos/avatar-group.svelte',
							role: 'example'
						},
						{
							path: 'src/lib/demos/avatar-group-vertical.svelte',
							role: 'example'
						}
					]
				},
				{
					name: 'button',
					title: 'Button',
					description: 'An extended button component.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/button'
						}
					]
				},
				{
					name: 'chat',
					title: 'Chat',
					description: 'A component for creating live chats.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/chat'
						}
					]
				},
				{
					name: 'code',
					title: 'Code',
					description: 'A code component.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/code'
						}
					]
				},
				{
					name: 'copy-button',
					title: 'CopyButton',
					description: 'A button used to copy text to the clipboard.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/copy-button'
						}
					]
				},
				{
					name: 'emoji-picker',
					title: 'EmojiPicker',
					description: 'A composable emoji picker component.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/emoji-picker'
						}
					]
				},
				{
					name: 'field-set',
					title: 'FieldSet',
					description: 'A field set component.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/field-set'
						}
					]
				},
				{
					name: 'file-drop-zone',
					title: 'FileDropZone',
					description: 'A file drop zone component.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/file-drop-zone'
						}
					]
				},
				{
					name: 'image-cropper',
					title: 'ImageCropper',
					description: 'A image cropper component.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/image-cropper'
						}
					]
				},
				{
					name: 'ipv4address-input',
					title: 'Ipv4AddressInput',
					description: 'A ipv4 address input component.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/ipv4address-input'
						}
					]
				},
				{
					name: 'language-switcher',
					title: 'LanguageSwitcher',
					description: 'A language switcher component.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/language-switcher'
						}
					]
				},
				{
					name: 'light-switch',
					title: 'LightSwitch',
					description: 'A light switch component.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/light-switch'
						}
					]
				},
				{
					name: 'link',
					title: 'Link',
					description: 'A link component.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/link'
						}
					]
				},
				{
					name: 'meter',
					title: 'Meter',
					description: 'A meter component.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/meter'
						}
					]
				},
				{
					name: 'modal',
					title: 'Modal',
					description: 'A modal component.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/modal'
						}
					]
				},
				{
					name: 'nlp-date-input',
					title: 'NlpDateInput',
					description: 'A nlp date input component.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/nlp-date-input'
						}
					]
				},
				{
					name: 'password',
					title: 'Password',
					description: 'A password component.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/password'
						}
					]
				},
				{
					name: 'phone-input',
					title: 'PhoneInput',
					description: 'A phone number input component.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/phone-input'
						}
					]
				},
				{
					name: 'pm-command',
					title: 'PmCommand',
					description: 'A package manager command component.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/pm-command'
						}
					]
				},
				{
					name: 'rename',
					title: 'Rename',
					description: 'A rename component.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/rename'
						}
					]
				},
				{
					name: 'snippet',
					title: 'Snippet',
					description: 'A snippet component.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/snippet'
						}
					]
				},
				{
					name: 'star-rating',
					title: 'StarRating',
					description: 'A star rating component.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/star-rating'
						}
					]
				},
				{
					name: 'tags-input',
					title: 'TagsInput',
					description: 'A tags input component.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/tags-input'
						}
					]
				},
				{
					name: 'terminal',
					title: 'Terminal',
					description: 'A terminal component.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/terminal'
						}
					]
				},
				{
					name: 'theme-selector',
					title: 'ThemeSelector',
					description: 'A theme selector component.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/theme-selector'
						}
					]
				},
				{
					name: 'toc',
					title: 'TableOfContents',
					description: 'A table of contents component.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/toc'
						}
					]
				},
				{
					name: 'tree-view',
					title: 'TreeView',
					description: 'A tree view component.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/tree-view'
						}
					]
				},
				{
					name: 'window',
					title: 'Window',
					description: 'A window component.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/window'
						}
					]
				}
			] satisfies RegistryItem[]),

			// actions
			...([
				{
					name: 'active',
					title: 'Active',
					description: 'A active component.',
					type: 'action',
					files: [
						{
							path: 'src/lib/actions/active.svelte.ts'
						}
					]
				},
				{
					name: 'shortcut',
					title: 'Shortcut',
					description: 'A shortcut component.',
					type: 'action',
					files: [
						{
							path: 'src/lib/actions/shortcut.svelte.ts'
						}
					]
				}
			] satisfies RegistryItem[]),

			// hooks
			...([
				{
					name: 'is-mac',
					title: 'IsMac',
					description: 'A is mac hook.',
					type: 'hook',
					files: [
						{
							path: 'src/lib/hooks/is-mac.svelte.ts'
						}
					]
				},
				{
					name: 'use-auto-scroll',
					title: 'UseAutoScroll',
					description: 'A use auto scroll hook.',
					type: 'hook',
					files: [
						{
							path: 'src/lib/hooks/use-auto-scroll.svelte.ts'
						}
					]
				},
				{
					name: 'use-boolean',
					title: 'UseBoolean',
					description: 'A use boolean hook.',
					type: 'hook',
					files: [
						{
							path: 'src/lib/hooks/use-boolean.svelte.ts'
						}
					]
				},
				{
					name: 'use-clipboard',
					title: 'UseClipboard',
					description: 'A use clipboard hook.',
					type: 'hook',
					files: [
						{
							path: 'src/lib/hooks/use-clipboard.svelte.ts'
						}
					]
				},
				{
					name: 'use-media',
					title: 'UseMedia',
					description: 'A use media hook.',
					type: 'hook',
					files: [
						{
							path: 'src/lib/hooks/use-media.svelte.ts'
						}
					]
				},
				{
					name: 'use-promise',
					title: 'UsePromise',
					description: 'A use promise hook.',
					type: 'hook',
					files: [
						{
							path: 'src/lib/hooks/use-promise.svelte.ts'
						}
					]
				},
				{
					name: 'use-toc',
					title: 'UseToc',
					description: 'A use toc hook.',
					type: 'hook',
					files: [
						{
							path: 'src/lib/hooks/use-toc.svelte.ts'
						}
					]
				},
				{
					name: 'use-frecency',
					title: 'UseFrecency',
					description: 'A use frecency hook.',
					type: 'hook',
					files: [
						{
							path: 'src/lib/hooks/use-frecency.svelte.ts'
						}
					]
				}
			] satisfies RegistryItem[]),

			// utils
			...([
				// lib
				{
					name: 'utils',
					description: 'Global utilities used by most of the components.',
					type: 'lib',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/utils.ts'
						}
					]
				},

				// utils
				{
					name: 'casing',
					type: 'util',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/utils/casing.ts'
						}
					]
				},
				{
					name: 'is-letter',
					type: 'util',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/utils/is-letter.ts'
						}
					]
				},
				{
					name: 'is-number',
					type: 'util',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/utils/is-number.ts'
						}
					]
				},
				{
					name: 'ipv4-address',
					type: 'util',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/utils/ipv4-address.ts'
						}
					]
				},
				{
					name: 'result',
					type: 'util',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/utils/result.ts'
						}
					]
				},

				// actions
				{
					name: 'typewriter',
					title: 'Typewriter',
					type: 'action',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/actions/typewriter.svelte.ts'
						}
					]
				}
			] satisfies RegistryItem[]),

			// shadcn-svelte
			...([
				// ui
				{
					name: 'avatar',
					title: 'Avatar',
					type: 'ui',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/components/ui/avatar'
						}
					]
				},
				{
					name: 'collapsible',
					title: 'Collapsible',
					type: 'ui',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/components/ui/collapsible'
						}
					]
				},
				{
					name: 'command',
					title: 'Command',
					type: 'ui',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/components/ui/command'
						}
					]
				},
				{
					name: 'dialog',
					title: 'Dialog',
					type: 'ui',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/components/ui/dialog'
						}
					]
				},
				{
					name: 'drawer',
					title: 'Drawer',
					type: 'ui',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/components/ui/drawer'
						}
					]
				},
				{
					name: 'dropdown-menu',
					title: 'DropdownMenu',
					type: 'ui',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/components/ui/dropdown-menu'
						}
					]
				},
				{
					name: 'input',
					title: 'Input',
					type: 'ui',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/components/ui/input'
						}
					]
				},
				{
					name: 'popover',
					title: 'Popover',
					type: 'ui',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/components/ui/popover'
						}
					]
				},
				{
					name: 'scroll-area',
					title: 'ScrollArea',
					type: 'ui',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/components/ui/scroll-area'
						}
					]
				},
				{
					name: 'tabs',
					title: 'Tabs',
					type: 'ui',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/components/ui/tabs'
						}
					]
				},
				{
					name: 'toggle',
					title: 'Toggle',
					type: 'ui',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/components/ui/toggle'
						}
					]
				},
				{
					name: 'tooltip',
					title: 'Tooltip',
					type: 'ui',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/components/ui/tooltip'
						}
					]
				}
			] satisfies RegistryItem[])
		]
	},
});
