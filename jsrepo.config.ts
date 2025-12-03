import { defineConfig, RegistryItem } from 'jsrepo';
import addType from './.jsrepo/outputs/add-type';
import demoType from './.jsrepo/outputs/demo-type';

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
		outputs: [addType(), demoType()],
		items: [
			// ui
			...([
				{
					name: 'avatar-group',
					title: 'AvatarGroup',
					description:
						'A composable avatar group component for displaying multiple user avatars, profile pictures, or user images in a stacked or grouped layout with overflow indicators.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/avatar-group'
						},
						{
							path: 'src/lib/demos/avatar-group.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/avatar-group-vertical.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'button',
					title: 'Button',
					description:
						'An extended button component with loading states, promise handling, click handlers, variants, sizes, and disabled states for interactive UI elements.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/button'
						},
						{
							path: 'src/lib/demos/button.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/button-loading.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/button-on-click-promise.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'chat',
					title: 'Chat',
					description:
						'A component for creating live chats, messaging interfaces, conversation UIs, chat bubbles, message threads, and real-time communication displays.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/chat'
						},
						{
							path: 'src/lib/demos/chat.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'code',
					title: 'Code',
					description:
						'A code component for displaying syntax-highlighted code blocks, code snippets, programming code, source code, with line numbers, copy functionality, and code highlighting.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/code'
						},
						{
							path: 'src/lib/demos/code.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/code-copy-button.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/code-no-line-numbers.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/code-variants.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/code-highlight-lines.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/code-overflow.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/code-block.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'confirm-delete-dialog',
					title: 'ConfirmDeleteDialog',
					description: 'A dialog for confirming delete actions.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/confirm-delete-dialog'
						},
						{
							path: 'src/lib/demos/confirm-delete-dialog.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/confirm-delete-dialog-with-text.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/confirm-delete-dialog-skip-confirmation.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'copy-button',
					title: 'CopyButton',
					description:
						'A button used to copy text to the clipboard, copy code snippets, copy content, clipboard copy functionality with visual feedback and copy confirmation.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/copy-button'
						},
						{
							path: 'src/lib/demos/copy-button.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/copy-button-icon.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/copy-button-with-text.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'emoji-picker',
					title: 'EmojiPicker',
					description:
						'A composable emoji picker component for selecting emojis, emoji selector, emoji chooser, emoji reactions, emoji input, with categories, search, and recent emojis.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/emoji-picker'
						},
						{
							path: 'src/lib/demos/emoji-picker.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/emoji-picker-skin.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/emoji-picker-popover.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/emoji-picker-footer.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/emoji-picker-recents.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'field-set',
					title: 'FieldSet',
					description:
						'A field set component for grouping form fields, form groups, input groups, form sections, with labels, descriptions, error states, and validation feedback.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/field-set'
						},
						{
							path: 'src/lib/demos/field-set.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/field-set-destructive.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'file-drop-zone',
					title: 'FileDropZone',
					description:
						'A file drop zone component for drag and drop file uploads, file uploader, file input, drag drop files, file selector, with preview, validation, and multiple file support.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/file-drop-zone'
						},
						{
							path: 'src/lib/demos/file-drop-zone.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/file-drop-zone-form.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'image-cropper',
					title: 'ImageCropper',
					description:
						'An image cropper component for cropping images, image editor, photo cropper, image resize, crop tool, with aspect ratio control, preview, and image upload.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/image-cropper'
						},
						{
							path: 'src/lib/demos/image-cropper.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/image-cropper-square-preview.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/image-cropper-no-default-image.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/image-cropper-custom-trigger.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/image-cropper-custom-preview.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'ipv4address-input',
					title: 'Ipv4AddressInput',
					description:
						'An IPv4 address input component for entering IP addresses, network addresses, IP input field, with validation, formatting, and octet separation.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/ipv4address-input'
						},
						{
							path: 'src/lib/demos/ipv4address-input.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/ipv4address-input-placeholder.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/ipv4address-input-reactive.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/ipv4address-input-valid.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'language-switcher',
					title: 'LanguageSwitcher',
					description:
						'A language switcher component for changing locales, i18n language selector, locale switcher, internationalization, translation switcher, and multi-language support.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/language-switcher'
						},
						{
							path: 'src/lib/demos/language-switcher.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/language-switcher-variants.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/language-switcher-paraglide.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'light-switch',
					title: 'LightSwitch',
					description:
						'A light switch component for toggling themes, dark mode toggle, light dark mode switcher, theme toggle button, with smooth animations and visual feedback.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/light-switch'
						},
						{
							path: 'src/lib/demos/light-switch.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/light-switch-variants.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'link',
					title: 'Link',
					description:
						'A link component for navigation, anchor links, hyperlinks, styled links, with variants, external link indicators, and active states.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/link'
						},
						{
							path: 'src/lib/demos/link.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'meter',
					title: 'Meter',
					description:
						'A meter component for displaying scalar measurements, value indicators, gauges, measurement displays, disk usage, storage capacity, with min max values and visual value indication.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/meter'
						},
						{
							path: 'src/lib/demos/meter.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'modal',
					title: 'Modal',
					description:
						'A modal component for dialogs, popups, overlays, dialog boxes, modal windows, with backdrop, close functionality, and responsive design.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/modal'
						},
						{
							path: 'src/lib/demos/modal.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'nlp-date-input',
					title: 'NlpDateInput',
					description:
						'A natural language processing date input component for parsing date strings, smart date input, date picker with NLP, text to date conversion, and date suggestions.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/nlp-date-input'
						},
						{
							path: 'src/lib/demos/nlp-date-input.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/nlp-date-input-min-max.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'password',
					title: 'Password',
					description:
						'A password component for password input fields, secure password entry, password visibility toggle, password strength indicator, and secret input handling.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/password'
						},
						{
							path: 'src/lib/demos/password.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/password-toggle-visibility.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/password-copy.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/password-both.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/password-strength.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'phone-input',
					title: 'PhoneInput',
					description:
						'A phone number input component for telephone numbers, phone number form field, international phone input, country code selector, and phone validation.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/phone-input'
						},
						{
							path: 'src/lib/demos/phone-input.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/phone-input-default-country.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/phone-input-default-value.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/phone-input-custom-ordering.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'pm-command',
					title: 'PmCommand',
					description:
						'A package manager command component for displaying npm, pnpm, yarn, bun commands, install commands, package manager instructions, and copyable command snippets.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/pm-command'
						},
						{
							path: 'src/lib/demos/pm-command.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/pm-command-commands.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/pm-command-variants.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/pm-command-overflow.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/pm-command-persisted-pm.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/pm-command-customize-agents.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'ramp-input',
					title: 'RampInput',
					description: 'A component for incrementing and decrementing a number.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/ramp-input'
						},
						{
							path: 'src/lib/demos/ramp-input.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'rename',
					title: 'Rename',
					description:
						'A component for renaming files, folders, items, inline editing, editable text, rename input, with validation and keyboard shortcuts.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/rename'
						},
						{
							path: 'src/lib/demos/rename.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/rename-content-editable.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/rename-context-menu.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'snippet',
					title: 'Snippet',
					description:
						'A snippet component for displaying code snippets, command snippets, text snippets, with copy functionality, variants, and multiline support.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/snippet'
						},
						{
							path: 'src/lib/demos/snippet.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/snippet-variants.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/snippet-multiline.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'star-rating',
					title: 'StarRating',
					description:
						'A star rating component for ratings, reviews, star selector, 5 star rating, rating input, with half stars, readonly mode, custom colors, and sizes.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/star-rating'
						},
						{
							path: 'src/lib/demos/star-rating.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/star-rating-custom-stars.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/star-rating-half-rating.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/star-rating-disabled.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/star-rating-readonly.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/star-rating-custom-color.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/star-rating-custom-size.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'tags-input',
					title: 'TagsInput',
					description:
						'A tags input component for tag input fields, multi-tag input, tag selector, chip input, tag management, with add remove tags, and tag validation.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/tags-input'
						},
						{
							path: 'src/lib/demos/tags-input.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/tags-input-lowercase.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'terminal',
					title: 'Terminal',
					description:
						'A terminal component for displaying command line interfaces, terminal emulator, CLI display, shell terminal, code examples, with typing animation and command output.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/terminal'
						},
						{
							path: 'src/lib/demos/terminal.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/terminal-loop.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'theme-selector',
					title: 'ThemeSelector',
					description:
						'A theme selector component for choosing themes, theme picker, color scheme selector, dark light theme switcher, with multiple theme options and visual preview.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/theme-selector'
						},
						{
							path: 'src/lib/demos/theme-selector.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/theme-selector-variants.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'toc',
					title: 'TableOfContents',
					description:
						'A table of contents component for navigation, document outline, page navigation, TOC sidebar, with anchor links, active section highlighting, and scroll tracking.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/toc'
						},
						{
							path: 'src/lib/demos/toc.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'tree-view',
					title: 'TreeView',
					description:
						'A tree view component for displaying hierarchical data, file tree, folder structure, nested lists, directory tree, with expand collapse, custom icons, and selection.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/tree-view'
						},
						{
							path: 'src/lib/demos/tree-view.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/tree-view-custom-icons.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'underline-tabs',
					title: 'UnderlineTabs',
					description:
						'A underline tabs component for displaying tabs, tab navigation, tab selection, tab navigation, and tab selection.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/underline-tabs'
						},
						{
							path: 'src/lib/demos/underline-tabs.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/underline-tabs-overflow.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'window',
					title: 'Window',
					description:
						'A beautiful styled window component for windowed UI, desktop-style windows, window container, with title bar, close button, and customizable content area.',
					type: 'ui',
					files: [
						{
							path: 'src/lib/components/ui/window'
						},
						{
							path: 'src/lib/demos/window.svelte',
							role: 'example',
							dependencyResolution: 'manual'
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
					files: [
						{
							path: 'src/lib/actions/active.svelte.ts'
						},
						{
							path: 'src/lib/demos/active.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'shortcut',
					title: 'Shortcut',
					description:
						'Add keyboard shortcuts to your application. Keyboard shortcuts, hotkeys, key bindings, keyboard navigation, command shortcuts, and keyboard event handling.',
					type: 'action',
					files: [
						{
							path: 'src/lib/actions/shortcut.svelte.ts'
						},
						{
							path: 'src/lib/demos/shortcut.svelte',
							role: 'example',
							dependencyResolution: 'manual'
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
					files: [
						{
							path: 'src/lib/hooks/is-mac.svelte.ts'
						},
						{
							path: 'src/lib/demos/is-mac.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/is-mac-keys.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'use-auto-scroll',
					title: 'UseAutoScroll',
					description:
						'Automatically scroll to the bottom of an element when new content is added. Auto scroll, chat scroll, message scroll, scroll to bottom, and dynamic content scrolling.',
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
					description:
						'Simplify working with boolean values. Toggle state, boolean state management, true false toggle, boolean hook, and reactive boolean values.',
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
					description:
						'Copy text to the users clipboard. Clipboard API, copy to clipboard, clipboard copy hook, copy functionality, and clipboard state management.',
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
					description:
						'Track the size of the screen using the standard Tailwind CSS breakpoints. Responsive breakpoints, media queries, screen size detection, mobile desktop detection, and responsive design hooks.',
					type: 'hook',
					files: [
						{
							path: 'src/lib/hooks/use-media.svelte.ts'
						},
						{
							path: 'src/lib/demos/use-media.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						},
						{
							path: 'src/lib/demos/use-media-custom.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'use-promise',
					title: 'UsePromise',
					description:
						'Manage the state of a promise reactively in the absence of {#await}. Promise state management, async state, loading error success states, promise hook, and reactive promises.',
					type: 'hook',
					files: [
						{
							path: 'src/lib/hooks/use-promise.svelte.ts'
						},
						{
							path: 'src/lib/demos/use-promise.svelte',
							role: 'example',
							dependencyResolution: 'manual'
						}
					]
				},
				{
					name: 'use-ramp',
					title: 'UseRamp',
					add: 'when-needed',
					description: 'Ramp a value up/down over time.',
					type: 'hook',
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
					files: [
						{
							path: 'src/lib/hooks/use-frecency.svelte.ts'
						},
						{
							path: 'src/lib/demos/use-frecency.svelte',
							role: 'example',
							dependencyResolution: 'manual'
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
					name: 'alert-dialog',
					title: 'AlertDialog',
					type: 'ui',
					add: 'when-needed',
					files: [
						{
							path: 'src/lib/components/ui/alert-dialog'
						}
					]
				},
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
	}
});
