import * as api from '../api-reference';
import type {
	PasswordRootPropsWithoutHTML,
	PasswordInputPropsWithoutHTML,
	PasswordStrengthPropsWithoutHTML
} from '$lib/components/ui/password/types';

const Root = api.createComponentReference<PasswordRootPropsWithoutHTML>({
	name: 'Root',
	description: 'The root container for the password input suite.',
	props: {
		ref: api.createAnyProp({
			description: 'A reference to the root div element.',
			bindable: true,
			type: 'HTMLDivElement',
			defaultValue: 'null'
		}),
		hidden: api.createBooleanProp({
			description: 'Whether the password is hidden (masked).',
			bindable: true,
			defaultValue: true
		}),
		minScore: api.createNumberUnionProp({
			type: '0 | 1 | 2 | 3 | 4',
			description: 'The minimum acceptable score for a password (0-4).',
			defaultValue: '3'
		}),
		children: api.createAnyProp({
			description: 'Slot content for the password root (e.g., input, strength meter, etc).',
			type: 'Snippet'
		})
	}
});

const Input = api.createComponentReference<PasswordInputPropsWithoutHTML>({
	name: 'Input',
	description: 'The password input field.',
	props: {
		ref: api.createAnyProp({
			description: 'A reference to the input element.',
			bindable: true,
			type: 'HTMLInputElement',
			defaultValue: 'null'
		}),
		value: api.createStringProp({
			description: 'The value of the password input.',
			bindable: true
		}),
		children: api.createAnyProp({
			description: 'Slot content for the input (e.g., icons, buttons).',
			type: 'Snippet'
		})
	}
});

const ToggleVisibility = api.createComponentReference({
	name: 'ToggleVisibility',
	description: 'A button to toggle password visibility.',
	props: {},
	forwardTo: {
		name: 'bits-ui Toggle',
		href: 'https://bits-ui.com/docs/components/toggle#root'
	}
});

const Copy = api.createComponentReference({
	name: 'Copy',
	description: 'A button to copy the password value to the clipboard.',
	props: {},
	forwardTo: {
		name: 'Copy Button',
		href: '/components/copy-button'
	}
});

const Strength = api.createComponentReference<PasswordStrengthPropsWithoutHTML>({
	name: 'Strength',
	description: 'A meter that visually indicates password strength.',
	props: {
		strength: api.createAnyProp({
			description: 'The zxcvbn result object for password strength.',
			bindable: true,
			type: 'ZxcvbnResult'
		})
	}
});

export const reference = {
	name: 'Password' as const,
	components: {
		Root,
		Input,
		ToggleVisibility,
		Copy,
		Strength
	}
};
