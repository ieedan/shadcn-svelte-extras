import * as api from '../api-reference';
import type {
	ChatBubblePropsWithoutHTML,
	ChatBubbleMessagePropsWithoutHTML,
	ChatListPropsWithoutHTML
} from '$lib/components/ui/chat/types';

const List = api.createComponentReference<ChatListPropsWithoutHTML>({
	name: 'List',
	description: 'The root container for chat messages.',
	props: {
		ref: api.createAnyProp({
			description: 'A reference to the chat list element.',
			bindable: true,
			type: 'HTMLElement',
			tooltip: 'HTMLDivElement',
			defaultValue: 'null'
		}),
		children: api.createAnyProp({
			description: 'The content of the chat list.',
			type: 'Snippet'
		})
	}
});

const Bubble = api.createComponentReference<ChatBubblePropsWithoutHTML>({
	name: 'Bubble',
	description: 'A chat bubble.',
	props: {
		ref: api.createAnyProp({
			description: 'A reference to the chat bubble element.',
			bindable: true,
			type: 'HTMLElement',
			tooltip: 'HTMLDivElement',
			defaultValue: 'null'
		}),
		children: api.createAnyProp({
			description: 'The content of the chat bubble.',
			type: 'Snippet'
		}),
		variant: api.createStringUnionProp({
			type: '"sent" | "received"',
			description:
				'The variant of the chat bubble, indicating if the message was sent or received.',
			required: true
		})
	}
});

const BubbleMessage = api.createComponentReference<ChatBubbleMessagePropsWithoutHTML>({
	name: 'BubbleMessage',
	description: 'The message content within a chat bubble.',
	props: {
		ref: api.createAnyProp({
			description: 'A reference to the chat bubble message element.',
			bindable: true,
			type: 'HTMLElement',
			tooltip: 'HTMLDivElement',
			defaultValue: 'null'
		}),
		children: api.createAnyProp({
			description: 'The content of the chat bubble message.',
			bindable: false,
			type: 'Snippet'
		}),
		typing: api.createBooleanProp({
			description: 'Whether to show a typing indicator instead of message content.',
			defaultValue: false
		})
	}
});

const BubbleAvatar = api.createComponentReference({
	name: 'BubbleAvatar',
	description: 'The avatar shown next to a chat bubble, inherits all Avatar.Root props.',
	props: {},
	forwardTo: {
		name: 'bits-ui.com',
		href: 'https://bits-ui.com/docs/components/avatar#root'
	}
});

export const components = {
	List,
	Bubble,
	BubbleMessage,
	BubbleAvatar
};
