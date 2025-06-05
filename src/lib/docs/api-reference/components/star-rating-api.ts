import * as api from '../api-reference';
import type { StarRatingStarProps } from '$lib/components/ui/star-rating/types';

const Root = api.createComponentReference({
	name: 'Root',
	description:
		'The root component for the Star Rating. Forwards all props and behavior to bits-ui RatingGroup.Root.',
	props: {},
	forwardTo: {
		name: 'bits-ui RatingGroup.Root',
		href: 'https://bits-ui.com/docs/components/rating-group#root'
	}
});

const Star = api.createComponentReference<StarRatingStarProps>({
	name: 'Star',
	description:
		'A single star in the Star Rating component. Used internally to render each star with its state.',
	props: {
		index: api.createNumberProp({
			description: 'The index of the star in the rating group.'
		}),
		state: api.createStringUnionProp({
			type: '"active" | "partial" | "inactive"',
			description:
				'The visual state of the star: active (filled), partial (half-filled), or inactive (empty).'
		}),
		class: api.createStringProp({
			description: 'Additional classes to apply to the star.'
		})
	}
});

export const reference = {
	name: 'StarRating' as const,
	components: {
		Root,
		Star
	}
};
