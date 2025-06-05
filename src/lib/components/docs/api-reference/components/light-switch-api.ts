import * as api from '../api-reference';
import type { LightSwitchProps } from '$lib/components/ui/light-switch/types';

const Root = api.createComponentReference<LightSwitchProps>({
	name: 'Root',
	description: 'The root light switch component.',
	props: {
		variant: api.createStringUnionProp({
			type: '"outline" | "ghost"',
			description: 'The visual style of the light switch.',
			defaultValue: 'outline'
		})
	}
});

export const components = {
	Root
};
