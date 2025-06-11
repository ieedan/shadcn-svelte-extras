import * as api from '../api-reference';
import type {
	EmojiPickerFooterPropsWithoutHTML,
	EmojiPickerSkinPropsWithoutHTML,
	EmojiPickerListPropsWithoutHTML,
	EmojiPickerRootPropsWithoutHTML
} from '$lib/components/ui/emoji-picker';

const Root = api.createComponentReference<EmojiPickerRootPropsWithoutHTML>({
	name: 'Root',
	description: 'The root component of the emoji picker.',
	props: {
		skin: api.createNumberUnionProp({
			type: '0 | 1 | 2 | 3 | 4 | 5',
			description: 'The default skin tone to use.',
			bindable: true,
			defaultValue: '0'
		}),
		onSelect: api.createFunctionProp({
			description: 'Callback fired when an emoji is selected.',
			type: '(emoji: SelectedEmoji) => void'
		}),
		onSkinChange: api.createFunctionProp({
			description: 'Callback fired when the skin tone changes.',
			type: '(skin: EmojiPickerSkin) => void'
		}),
		showRecents: api.createBooleanProp({
			description: 'Show recently used emojis.'
		}),
		recentsKey: api.createStringProp({
			description: 'The key to use to store the recently used emojis.'
		}),
		maxRecents: api.createNumberProp({
			description: 'The maximum number of recent emojis to show.',
			defaultValue: 12
		}),
		children: api.createAnyProp({
			description: 'The content of the emoji picker.',
			type: 'Snippet'
		})
	}
});

const List = api.createComponentReference<EmojiPickerListPropsWithoutHTML>({
	name: 'List',
	description: 'Displays the list of emojis.',
	props: {
		emptyMessage: api.createStringProp({
			description: 'The message to display when there are no results.',
			defaultValue: 'No results.'
		})
	}
});

const Viewport = api.createComponentReference({
	name: 'Viewport',
	description: 'The viewport container for the emoji picker.',
	props: {}
});

const Search = api.createComponentReference({
	name: 'Search',
	description: 'The search input for filtering emojis.',
	props: {},
	forwardTo: {
		name: 'bits-ui Command.Input',
		href: 'https://bits-ui.com/docs/components/command#input'
	}
});

const Footer = api.createComponentReference<EmojiPickerFooterPropsWithoutHTML>({
	name: 'Footer',
	description: 'The footer area of the emoji picker.',
	props: {
		children: api.createAnyProp({
			description: 'A render function for the footer content. Receives `{ active }` as argument.',
			type: 'Snippet',
			tooltip: 'Snippet<[{ active: SelectedEmoji | null }]>'
		})
	}
});

const SkinToneSelector = api.createComponentReference<EmojiPickerSkinPropsWithoutHTML>({
	name: 'SkinToneSelector',
	description: 'A button for selecting the emoji skin tone.',
	props: {
		previewEmoji: api.createStringProp({
			description: 'The emoji to use to preview the skin tone.',
			defaultValue: '👋'
		})
	}
});

export const reference = {
	name: 'EmojiPicker' as const,
	components: {
		Root,
		List,
		Viewport,
		Search,
		Footer,
		SkinToneSelector
	}
};
