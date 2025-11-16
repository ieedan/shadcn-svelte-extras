import Basic from './basic.svelte';
import basicRaw from './basic.svelte?raw';
import Skin from './skin.svelte';
import skinRaw from './skin.svelte?raw';
import Popover from './popover.svelte';
import popoverRaw from './popover.svelte?raw';
import Footer from './footer.svelte';
import footerRaw from './footer.svelte?raw';
import Recents from './recents.svelte';
import recentsRaw from './recents.svelte?raw';

const examples = {
	basic: {
		code: basicRaw,
		Component: Basic
	},
	skin: {
		code: skinRaw,
		Component: Skin
	},
	popover: {
		code: popoverRaw,
		Component: Popover
	},
	footer: {
		code: footerRaw,
		Component: Footer
	},
	recents: {
		code: recentsRaw,
		Component: Recents
	}
};

export { examples };
