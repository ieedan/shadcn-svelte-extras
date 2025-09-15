import * as api from '../api-reference';

const Meter = api.createComponentReference({
	description: 'A styled meter element.',
	props: {},
	forwardTo: {
		name: 'bits-ui Meter',
		href: 'https://www.bits-ui.com/docs/components/meter#root'
	}
});

export const reference = {
	name: 'Meter' as const,
	components: {
		Meter
	}
};
