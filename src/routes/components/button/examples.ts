import Basic from './basic.svelte';
import basicRaw from './basic.svelte?raw';
import Loading from './loading.svelte';
import loadingRaw from './loading.svelte?raw';
import Tooltip from './tooltip.svelte';
import tooltipRaw from './tooltip.svelte?raw';
import OnClickPromise from './on-click-promise.svelte';
import onClickPromiseRaw from './on-click-promise.svelte?raw';

const examples = {
	basic: {
		code: basicRaw,
		Component: Basic
	},
	loading: {
		code: loadingRaw,
		Component: Loading
	},
	tooltip: {
		code: tooltipRaw,
		Component: Tooltip
	},
	onClickPromise: {
		code: onClickPromiseRaw,
		Component: OnClickPromise
	}
};

export { examples };
