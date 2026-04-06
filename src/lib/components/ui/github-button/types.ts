import type { ButtonProps, Size } from '$lib/components/button.svelte';

export type GithubButtonProps = Omit<ButtonProps, 'href' | 'children' | 'size'> & {
	repo: {
		owner: string;
		repo: string;
	};
	stars?: Promise<number> | number;
	starsTweenedDuration?: number;
	size?: Size;
};
