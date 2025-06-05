import type { ReadableBoxedValues, WritableBoxedValues } from 'svelte-toolbelt';
import { Context } from 'runed';

type RootProps = WritableBoxedValues<{
	value: number;
}> &
	ReadableBoxedValues<{
		disabled: boolean;
		readonly: boolean;
		stars: number;
	}>;

export class StarRatingRootState {
	constructor(readonly opts: RootProps) {
		this.setRating = this.setRating.bind(this);
	}

	setRating(star: number) {
		if (this.opts.disabled.current || this.opts.readonly.current) return;

		if (star > this.opts.stars.current || star < 0) {
			console.warn(`[star-rating] ${star} is not a valid rating`);
			return;
		}

		this.opts.value.current = star;
	}
}

type StarProps = ReadableBoxedValues<{
	star: number;
}>;

export class StarRatingStarState {
	constructor(
		readonly rootState: StarRatingRootState,
		readonly opts: StarProps
	) {
		this.setRating = this.setRating.bind(this);
	}

	setRating() {
		this.rootState.setRating(this.opts.star.current);
	}
}

const ctx = new Context<StarRatingRootState>('star-rating-root-state');

export function useStarRating(props: RootProps) {
	return ctx.set(new StarRatingRootState(props));
}

export function useStarRatingStar(props: StarProps) {
	return new StarRatingStarState(ctx.get(), props);
}
