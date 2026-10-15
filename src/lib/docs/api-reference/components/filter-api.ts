import * as api from '../api-reference';

const Filter = api.createComponentReference({
	description: 'A filter component.',
	props: {}
});

export const reference = {
	name: 'Filter' as const,
	components: {
		Filter
	}
};
