import * as api from '../api-reference';

const Link = api.createComponentReference({
	description: 'A styled anchor element.',
	props: {},
	forwardTo: {
		name: 'MDN <a> element',
		href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a'
	}
});

export const reference = {
	name: 'Link' as const,
	components: {
		Link
	}
};
