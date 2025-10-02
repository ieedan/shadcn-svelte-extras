import Basic from './basic.svelte';
import basicRaw from './basic.svelte?raw';
import Step from './step.svelte';
import stepRaw from './step.svelte?raw';
import MinMax from './min-max.svelte';
import minMaxRaw from './min-max.svelte?raw';
import Animated from './animated.svelte';
import animatedRaw from './animated.svelte?raw';
import Drawer from './drawer.svelte';
import drawerRaw from './drawer.svelte?raw';

const examples = {
	basic: {
		code: basicRaw,
		Component: Basic
	},
	step: {
		code: stepRaw,
		Component: Step
	},
	minMax: {
		code: minMaxRaw,
		Component: MinMax
	},
	animated: {
		code: animatedRaw,
		Component: Animated
	},
	drawer: {
		code: drawerRaw,
		Component: Drawer
	}
};

export { examples };
