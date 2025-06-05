import * as api from '../api-reference';
import type {
	TerminalRootProps,
	TerminalAnimationProps,
	TerminalLoadingProps
} from '$lib/components/ui/terminal/types';

const Root = api.createComponentReference<TerminalRootProps>({
	name: 'Root',
	description: 'The root terminal component. Controls animation timing and children.',
	props: {
		children: api.createAnyProp({
			description: 'The content of the terminal window.',
			type: 'Snippet'
		}),
		class: api.createStringProp({
			description: 'Additional classes to apply to the terminal window.'
		}),
		delay: api.createNumberProp({
			description: 'Delay before starting all animations (ms).',
			defaultValue: 0
		}),
		speed: api.createNumberProp({
			description: 'Speed multiplier for all animations.',
			defaultValue: 1
		}),
		onComplete: api.createFunctionProp({
			description: 'Callback when all animations complete.',
			type: '() => void'
		})
	}
});

const TypingAnimation = api.createComponentReference<TerminalAnimationProps>({
	name: 'TypingAnimation',
	description: 'Animates its children with a typewriter effect.',
	props: {
		children: api.createAnyProp({
			description: 'The content to animate.',
			type: 'Snippet'
		}),
		class: api.createStringProp({
			description: 'Additional classes to apply.'
		}),
		delay: api.createNumberProp({
			description: 'Delay before starting the animation (ms).',
			defaultValue: 0
		})
	}
});

const AnimatedSpan = api.createComponentReference<TerminalAnimationProps>({
	name: 'AnimatedSpan',
	description: 'Animates its children with a fly-in effect.',
	props: {
		children: api.createAnyProp({
			description: 'The content to animate.',
			type: 'Snippet'
		}),
		class: api.createStringProp({
			description: 'Additional classes to apply.'
		}),
		delay: api.createNumberProp({
			description: 'Delay before starting the animation (ms).',
			defaultValue: 0
		})
	}
});

const Loading = api.createComponentReference<TerminalLoadingProps>({
	name: 'Loading',
	description: 'Displays a loading animation with customizable messages.',
	props: {
		loadingMessage: api.createAnyProp({
			description: 'Message to display while loading.',
			type: 'Snippet',
			required: true
		}),
		completeMessage: api.createAnyProp({
			description: 'Message to display when loading is complete.',
			type: 'Snippet',
			required: true
		}),
		duration: api.createNumberProp({
			description: 'How long the loading animation runs (ms).',
			defaultValue: 1000
		}),
		delay: api.createNumberProp({
			description: 'Delay before starting the animation (ms).',
			defaultValue: 0
		}),
		class: api.createStringProp({
			description: 'Additional classes to apply.'
		})
	}
});

const Loop = api.createComponentReference({
	name: 'Loop',
	description: 'Repeats its children in a loop, useful for continuous terminal animations.',
	props: {
		children: api.createAnyProp({
			description: 'The content to loop.',
			type: 'Snippet'
		}),
		delay: api.createNumberProp({
			description: 'Delay between loops (ms).',
			defaultValue: 500
		})
	}
});

export const components = {
	Root,
	TypingAnimation,
	AnimatedSpan,
	Loading,
	Loop
};
