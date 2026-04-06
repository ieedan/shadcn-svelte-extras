import * as api from '../api-reference';
import type { LightSwitchProps } from '$lib/components/ui/light-switch/types';

const Root = api.createComponentReference<LightSwitchProps>({
	description: 'The root light switch component.',
	props: {
		variant: api.createStringUnionProp({
			type: '"outline" | "ghost"',
			description: 'The visual style of the light switch.',
			defaultValue: 'outline'
		}),
		size: api.createStringUnionProp({
			type: '"default" | "xs" | "sm" | "lg"',
			description: 'The size of the light switch.',
			defaultValue: 'default'
		})
	}
});

export const reference = {
	name: 'LightSwitch' as const,
	components: {
		Root
	}
};
