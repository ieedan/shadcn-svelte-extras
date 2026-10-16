import * as api from '../api-reference';

const Filters = api.createComponentReference({
	description: 'A filters component.',
	props: {}
});

export const reference = {
	name: 'Filters' as const,
	components: {
		Filters
	}
};
