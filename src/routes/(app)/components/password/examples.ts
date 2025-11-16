import Basic from './basic.svelte';
import basicRaw from './basic.svelte?raw';
import Strength from './strength.svelte';
import strengthRaw from './strength.svelte?raw';
import Copy from './copy.svelte';
import copyRaw from './copy.svelte?raw';
import Both from './both.svelte';
import bothRaw from './both.svelte?raw';
import ToggleVisibility from './toggle-visibility.svelte';
import toggleVisibilityRaw from './toggle-visibility.svelte?raw';

const examples = {
	basic: {
		code: basicRaw,
		Component: Basic
	},
	strength: {
		code: strengthRaw,
		Component: Strength
	},
	toggleVisibility: {
		code: toggleVisibilityRaw,
		Component: ToggleVisibility
	},
	copy: {
		code: copyRaw,
		Component: Copy
	},
	both: {
		code: bothRaw,
		Component: Both
	}
};

export { examples };
