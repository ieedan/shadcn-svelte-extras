import { defineConfig, InvalidImportWarning, RegistryItem } from 'jsrepo';
import addType from './.jsrepo/outputs/add-type';
import demoType from './.jsrepo/outputs/demo-type';
import { output as shadcnSvelteOutput } from '@jsrepo/shadcn-svelte';

// Documentation URLs live in item `meta.documentation`, not `files`: jsrepo --watch fs.watches every listed path; Velite also watches markdown under content/, which caused rebuild churn when docs were registry files.
const DOCS_ORIGIN = 'https://www.shadcn-svelte-extras.com';

export default defineConfig({
	registries: ['@registry/kit'],
	paths: {
		ui: '$lib/components/ui',
		component: '$lib/components',
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
			component: '$lib/components',
			block: '$lib/components',
			hook: '$lib/hooks',
			action: '$lib/actions',
			util: '$lib/utils',
			lib: '$lib'
		},
		excludeDeps: ['svelte', '@sveltejs/kit'],
		outputs: [
			addType(),
			demoType(),
			shadcnSvelteOutput({
				dir: './static/r',
				cleanOnFailure: false,
				aliases: {
					lib: '$lib',
					ui: '$lib/components/ui',
					components: '$lib/components',
					utils: '$lib/utils',
					hooks: '$lib/hooks'
				},
				typeMap: {
					util: 'registry:lib',
					action: 'registry:lib',
					logo: 'registry:component'
				}
			})
		],
		items: [
			// ui
			...([
				{
					name: 'chat',
					title: 'Chat',
					description:
						'A component for creating live chats, messaging interfaces, conversation UIs, chat bubbles, message threads, and real-time communication displays.',
					type: 'ui',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/chat` },
					files: [
						{
							path: 'src/lib/components/ui/chat'
						}
					]
				},
				{
					name: 'code',
					title: 'Code',
					description:
						'A code component for displaying syntax-highlighted code blocks, code snippets, programming code, source code, with line numbers, copy functionality, and code highlighting.',
					type: 'ui',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/code` },
					files: [
						{
							path: 'src/lib/components/ui/code'
						}
					]
				},
				{
					name: 'confirm-delete-dialog',
					title: 'ConfirmDeleteDialog',
					description: 'A dialog for confirming delete actions.',
					type: 'ui',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/confirm-delete-dialog` },
					files: [
						{
							path: 'src/lib/components/ui/confirm-delete-dialog'
						}
					]
				},
				{
					name: 'copy-button',
					title: 'CopyButton',
					description:
						'A button used to copy text to the clipboard, copy code snippets, copy content, clipboard copy functionality with visual feedback and copy confirmation.',
					type: 'ui',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/copy-button` },
					files: [
						{
							path: 'src/lib/components/ui/copy-button'
						}
					]
				},
				{
					name: 'emoji-picker',
					title: 'EmojiPicker',
					description:
						'A composable emoji picker component for selecting emojis, emoji selector, emoji chooser, emoji reactions, emoji input, with categories, search, and recent emojis.',
					type: 'ui',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/emoji-picker` },
					files: [
						{
							path: 'src/lib/components/ui/emoji-picker'
						}
					]
				},
				{
					name: 'field-set',
					title: 'FieldSet',
					description:
						'A field set component for grouping form fields, form groups, input groups, form sections, with labels, descriptions, error states, and validation feedback.',
					type: 'ui',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/field-set` },
					files: [
						{
							path: 'src/lib/components/ui/field-set'
						}
					]
				},
				{
					name: 'file-drop-zone',
					title: 'FileDropZone',
					description:
						'A file drop zone component for drag and drop file uploads, file uploader, file input, drag drop files, file selector, with preview, validation, and multiple file support.',
					type: 'ui',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/file-drop-zone` },
					files: [
						{
							path: 'src/lib/components/ui/file-drop-zone'
						}
					]
				},
				{
					name: 'github-button',
					title: 'GitHub Button',
					description:
						'A button linking to a GitHub repository with optional star count, live GitHub stats, repository link button, and smooth star count animation for async data.',
					type: 'ui',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/github-button` },
					files: [
						{
							path: 'src/lib/components/ui/github-button'
						}
					]
				},
				{
					name: 'image-cropper',
					title: 'ImageCropper',
					description:
						'An image cropper component for cropping images, image editor, photo cropper, image resize, crop tool, with aspect ratio control, preview, and image upload.',
					type: 'ui',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/image-cropper` },
					files: [
						{
							path: 'src/lib/components/ui/image-cropper'
						}
					]
				},
				{
					name: 'ipv4address-input',
					title: 'Ipv4AddressInput',
					description:
						'An IPv4 address input component for entering IP addresses, network addresses, IP input field, with validation, formatting, and octet separation.',
					type: 'ui',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/ipv4address-input` },
					files: [
						{
							path: 'src/lib/components/ui/ipv4address-input'
						}
					]
				},
				{
					name: 'language-switcher',
					title: 'LanguageSwitcher',
					description:
						'A language switcher component for changing locales, i18n language selector, locale switcher, internationalization, translation switcher, and multi-language support.',
					type: 'ui',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/language-switcher` },
					files: [
						{
							path: 'src/lib/components/ui/language-switcher'
						}
					]
				},
				{
					name: 'light-switch',
					title: 'LightSwitch',
					description:
						'A light switch component for toggling themes, dark mode toggle, light dark mode switcher, theme toggle button, with smooth animations and visual feedback.',
					type: 'ui',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/light-switch` },
					files: [
						{
							path: 'src/lib/components/ui/light-switch'
						}
					]
				},
				{
					name: 'link',
					title: 'Link',
					description:
						'A link component for navigation, anchor links, hyperlinks, styled links, with variants, external link indicators, and active states.',
					type: 'ui',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/link` },
					files: [
						{
							path: 'src/lib/components/ui/link'
						}
					]
				},
				{
					name: 'meter',
					title: 'Meter',
					description:
						'A meter component for displaying scalar measurements, value indicators, gauges, measurement displays, disk usage, storage capacity, with min max values and visual value indication.',
					type: 'ui',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/meter` },
					files: [
						{
							path: 'src/lib/components/ui/meter'
						}
					]
				},
				{
					name: 'modal',
					title: 'Modal',
					description:
						'A modal component for dialogs, popups, overlays, dialog boxes, modal windows, with backdrop, close functionality, and responsive design.',
					type: 'ui',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/modal` },
					files: [
						{
							path: 'src/lib/components/ui/modal'
						}
					]
				},
				{
					name: 'nlp-date-input',
					title: 'NlpDateInput',
					description:
						'A natural language processing date input component for parsing date strings, smart date input, date picker with NLP, text to date conversion, and date suggestions.',
					type: 'ui',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/nlp-date-input` },
					files: [
						{
							path: 'src/lib/components/ui/nlp-date-input'
						}
					]
				},
				{
					name: 'number-field',
					title: 'NumberField',
					description: 'A component for incrementing and decrementing a number.',
					type: 'ui',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/number-field` },
					files: [
						{
							path: 'src/lib/components/ui/number-field'
						}
					]
				},
				{
					name: 'password',
					title: 'Password',
					description:
						'A password component for password input fields, secure password entry, password visibility toggle, password strength indicator, and secret input handling.',
					type: 'ui',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/password` },
					files: [
						{
							path: 'src/lib/components/ui/password'
						}
					]
				},
				{
					name: 'phone-input',
					title: 'PhoneInput',
					description:
						'A phone number input component for telephone numbers, phone number form field, international phone input, country code selector, and phone validation.',
					type: 'ui',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/phone-input` },
					files: [
						{
							path: 'src/lib/components/ui/phone-input'
						}
					]
				},
				{
					name: 'pm-command',
					title: 'PmCommand',
					description:
						'A package manager command component for displaying npm, pnpm, yarn, bun commands, install commands, package manager instructions, and copyable command snippets.',
					type: 'ui',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/pm-command` },
					files: [
						{
							path: 'src/lib/components/ui/pm-command'
						}
					]
				},
				{
					name: 'rename',
					title: 'Rename',
					description:
						'A component for renaming files, folders, items, inline editing, editable text, rename input, with validation and keyboard shortcuts.',
					type: 'ui',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/rename` },
					files: [
						{
							path: 'src/lib/components/ui/rename'
						}
					]
				},
				{
					name: 'snippet',
					title: 'Snippet',
					description:
						'A snippet component for displaying code snippets, command snippets, text snippets, with copy functionality, variants, and multiline support.',
					type: 'ui',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/snippet` },
					files: [
						{
							path: 'src/lib/components/ui/snippet'
						}
					]
				},
				{
					name: 'stepper',
					title: 'Stepper',
					description:
						'A stepper component for multi-step forms, step navigation, progress indicators, wizard flows, step-by-step processes, with next/previous navigation and step validation.',
					type: 'ui',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/stepper` },
					files: [
						{
							path: 'src/lib/components/ui/stepper'
						}
					]
				},
				{
					name: 'split-button',
					title: 'SplitButton',
					description:
						'A split button combining a primary action with a secondary action such as a dropdown menu or alternate command.',
					type: 'ui',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/split-button` },
					files: [
						{
							path: 'src/lib/components/ui/split-button'
						}
					]
				},
				{
					name: 'star-rating',
					title: 'StarRating',
					description:
						'A star rating component for ratings, reviews, star selector, 5 star rating, rating input, with half stars, readonly mode, custom colors, and sizes.',
					type: 'ui',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/star-rating` },
					files: [
						{
							path: 'src/lib/components/ui/star-rating'
						}
					]
				},
				{
					name: 'tags-input',
					title: 'TagsInput',
					description:
						'A tags input component for tag input fields, multi-tag input, tag selector, chip input, tag management, with add remove tags, and tag validation.',
					type: 'ui',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/tags-input` },
					files: [
						{
							path: 'src/lib/components/ui/tags-input'
						}
					]
				},
				{
					name: 'terminal',
					title: 'Terminal',
					description:
						'A terminal component for displaying command line interfaces, terminal emulator, CLI display, shell terminal, code examples, with typing animation and command output.',
					type: 'ui',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/terminal` },
					files: [
						{
							path: 'src/lib/components/ui/terminal'
						}
					]
				},
				{
					name: 'theme-selector',
					title: 'ThemeSelector',
					description:
						'A theme selector component for choosing themes, theme picker, color scheme selector, dark light theme switcher, with multiple theme options and visual preview.',
					type: 'ui',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/theme-selector` },
					files: [
						{
							path: 'src/lib/components/ui/theme-selector'
						}
					]
				},
				{
					name: 'toc',
					title: 'TableOfContents',
					description:
						'A table of contents component for navigation, document outline, page navigation, TOC sidebar, with anchor links, active section highlighting, and scroll tracking.',
					type: 'ui',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/toc` },
					files: [
						{
							path: 'src/lib/components/ui/toc'
						}
					]
				},
				{
					name: 'tree-view',
					title: 'TreeView',
					description:
						'A tree view component for displaying hierarchical data, file tree, folder structure, nested lists, directory tree, with expand collapse, custom icons, and selection.',
					type: 'ui',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/tree-view` },
					files: [
						{
							path: 'src/lib/components/ui/tree-view'
						}
					]
				},
				{
					name: 'underline-tabs',
					title: 'UnderlineTabs',
					description:
						'A underline tabs component for displaying tabs, tab navigation, tab selection, tab navigation, and tab selection.',
					type: 'ui',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/underline-tabs` },
					files: [
						{
							path: 'src/lib/components/ui/underline-tabs'
						}
					]
				},
				{
					name: 'window',
					title: 'Window',
					description:
						'A beautiful styled window component for windowed UI, desktop-style windows, window container, with title bar, close button, and customizable content area.',
					type: 'ui',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/window` },
					files: [
						{
							path: 'src/lib/components/ui/window'
						}
					]
				}
			] satisfies RegistryItem[]),

			// components
			...([
				{
					name: 'button',
					title: 'Button',
					description:
						'An extended button component with loading states, promise handling, click handlers, variants, sizes, and disabled states for interactive UI elements.',
					type: 'component',
					meta: { documentation: `${DOCS_ORIGIN}/docs/components/button` },
					files: [
						{
							path: 'src/lib/components/button.svelte'
						}
					]
				}
			] satisfies RegistryItem[]),

			// actions
			...([
				{
					name: 'active',
					title: 'Active',
					description:
						'Automatically add the `data-active` attribute to a link based on its active state. Active link detection, navigation state, route matching, and active link styling.',
					type: 'action',
					meta: { documentation: `${DOCS_ORIGIN}/docs/actions/active` },
					files: [
						{
							path: 'src/lib/actions/active.svelte.ts'
						}
					]
				},
				{
					name: 'shortcut',
					title: 'Shortcut',
					description:
						'Add keyboard shortcuts to your application. Keyboard shortcuts, hotkeys, key bindings, keyboard navigation, command shortcuts, and keyboard event handling.',
					type: 'action',
					meta: { documentation: `${DOCS_ORIGIN}/docs/actions/shortcut` },
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
					description:
						'Determine if the user is on a Mac. Platform detection, macOS detection, Mac OS detection, platform-specific UI, and Mac keyboard shortcuts.',
					type: 'hook',
					meta: { documentation: `${DOCS_ORIGIN}/docs/hooks/is-mac` },
					files: [
						{
							path: 'src/lib/hooks/is-mac.svelte.ts'
						}
					]
				},
				{
					name: 'use-auto-scroll',
					title: 'UseAutoScroll',
					description:
						'Automatically scroll to the bottom of an element when new content is added. Auto scroll, chat scroll, message scroll, scroll to bottom, and dynamic content scrolling.',
					type: 'hook',
					meta: { documentation: `${DOCS_ORIGIN}/docs/hooks/use-auto-scroll` },
					files: [
						{
							path: 'src/lib/hooks/use-auto-scroll.svelte.ts'
						}
					]
				},
				{
					name: 'use-boolean',
					title: 'UseBoolean',
					description:
						'Simplify working with boolean values. Toggle state, boolean state management, true false toggle, boolean hook, and reactive boolean values.',
					type: 'hook',
					meta: { documentation: `${DOCS_ORIGIN}/docs/hooks/use-boolean` },
					files: [
						{
							path: 'src/lib/hooks/use-boolean.svelte.ts'
						}
					]
				},
				{
					name: 'use-clipboard',
					title: 'UseClipboard',
					description:
						'Copy text to the users clipboard. Clipboard API, copy to clipboard, clipboard copy hook, copy functionality, and clipboard state management.',
					type: 'hook',
					meta: { documentation: `${DOCS_ORIGIN}/docs/hooks/use-clipboard` },
					files: [
						{
							path: 'src/lib/hooks/use-clipboard.svelte.ts'
						}
					]
				},
				{
					name: 'use-media',
					title: 'UseMedia',
					description:
						'Track the size of the screen using the standard Tailwind CSS breakpoints. Responsive breakpoints, media queries, screen size detection, mobile desktop detection, and responsive design hooks.',
					type: 'hook',
					meta: { documentation: `${DOCS_ORIGIN}/docs/hooks/use-media` },
					files: [
						{
							path: 'src/lib/hooks/use-media.svelte.ts'
						}
					]
				},
				{
					name: 'use-promise',
					title: 'UsePromise',
					description:
						'Manage the state of a promise reactively in the absence of {#await}. Promise state management, async state, loading error success states, promise hook, and reactive promises.',
					type: 'hook',
					meta: { documentation: `${DOCS_ORIGIN}/docs/hooks/use-promise` },
					files: [
						{
							path: 'src/lib/hooks/use-promise.svelte.ts'
						}
					]
				},
				{
					name: 'use-ramp',
					title: 'UseRamp',
					add: 'when-needed',
					description: 'Ramp a value up/down over time.',
					type: 'hook',
					meta: { documentation: `${DOCS_ORIGIN}/docs/hooks/use-ramp` },
					files: [
						{
							path: 'src/lib/hooks/use-ramp.svelte.ts'
						}
					]
				},
				{
					name: 'use-toc',
					title: 'UseToc',
					description:
						'Generate a table of contents. TOC generation, document outline, heading extraction, navigation generation, and table of contents hook.',
					type: 'hook',
					meta: { documentation: `${DOCS_ORIGIN}/docs/hooks/use-toc` },
					files: [
						{
							path: 'src/lib/hooks/use-toc.svelte.ts'
						}
					]
				},
				{
					name: 'use-frecency',
					title: 'UseFrecency',
					description:
						'Sort items based on how frequently and recent they were used. Frequency sorting, recency sorting, usage tracking, smart sorting, and item ranking.',
					type: 'hook',
					meta: { documentation: `${DOCS_ORIGIN}/docs/hooks/use-frecency` },
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
					meta: { documentation: `${DOCS_ORIGIN}/docs/actions/typewriter` },
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
					name: 'shadcn-svelte-alert-dialog',
					title: 'shadcn-svelte/alert-dialog',
					type: 'ui',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/components/ui/alert-dialog'
						}
					]
				},
				{
					name: 'shadcn-svelte-avatar',
					title: 'shadcn-svelte/avatar',
					type: 'ui',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/components/ui/avatar'
						}
					]
				},
				{
					name: 'button',
					title: 'button',
					type: 'ui',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/components/ui/button'
						}
					]
				},
				{
					name: 'shadcn-svelte-button-group',
					title: 'shadcn-svelte/button-group',
					type: 'ui',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/components/ui/button-group'
						}
					]
				},
				{
					name: 'shadcn-svelte-collapsible',
					title: 'shadcn-svelte/collapsible',
					type: 'ui',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/components/ui/collapsible'
						}
					]
				},
				{
					name: 'shadcn-svelte-command',
					title: 'shadcn-svelte/command',
					type: 'ui',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/components/ui/command'
						}
					]
				},
				{
					name: 'shadcn-svelte-dialog',
					title: 'shadcn-svelte/dialog',
					type: 'ui',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/components/ui/dialog'
						}
					]
				},
				{
					name: 'shadcn-svelte-drawer',
					title: 'shadcn-svelte/drawer',
					type: 'ui',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/components/ui/drawer'
						}
					]
				},
				{
					name: 'shadcn-svelte-dropdown-menu',
					title: 'shadcn-svelte/dropdown-menu',
					type: 'ui',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/components/ui/dropdown-menu'
						}
					]
				},
				{
					name: 'shadcn-svelte-input',
					title: 'shadcn-svelte/input',
					type: 'ui',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/components/ui/input'
						}
					]
				},
				{
					name: 'shadcn-svelte-input-group',
					title: 'shadcn-svelte/input-group',
					type: 'ui',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/components/ui/input-group'
						}
					]
				},
				{
					name: 'shadcn-svelte-popover',
					title: 'shadcn-svelte/popover',
					type: 'ui',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/components/ui/popover'
						}
					]
				},
				{
					name: 'shadcn-svelte-scroll-area',
					title: 'shadcn-svelte/scroll-area',
					type: 'ui',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/components/ui/scroll-area'
						}
					]
				},
				{
					name: 'shadcn-svelte-select',
					title: 'shadcn-svelte/select',
					type: 'ui',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/components/ui/select'
						}
					]
				},
				{
					name: 'shadcn-svelte-separator',
					title: 'shadcn-svelte/separator',
					type: 'ui',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/components/ui/separator'
						}
					]
				},
				{
					name: 'shadcn-svelte-spinner',
					title: 'shadcn-svelte/spinner',
					type: 'ui',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/components/ui/spinner'
						}
					]
				},
				{
					name: 'shadcn-svelte-tabs',
					title: 'shadcn-svelte/tabs',
					type: 'ui',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/components/ui/tabs'
						}
					]
				},
				{
					name: 'shadcn-svelte-textarea',
					title: 'shadcn-svelte/textarea',
					type: 'ui',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/components/ui/textarea'
						}
					]
				},
				{
					name: 'shadcn-svelte-toggle',
					title: 'shadcn-svelte/toggle',
					type: 'ui',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/components/ui/toggle'
						}
					]
				},
				{
					name: 'shadcn-svelte-tooltip',
					title: 'shadcn-svelte/tooltip',
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
	build: {
		onwarn: (warning, handler) => {
			if (warning instanceof InvalidImportWarning) {
				if (['$app/server', '$app/state', '$app/navigation'].includes(warning.specifier)) {
					return;
				}
			}

			handler(warning);
		}
	}
});
