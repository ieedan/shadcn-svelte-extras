import * as api from '../api-reference';
import type { GithubButtonProps } from '$lib/components/ui/github-button/github-button.svelte';

type GithubButtonDocumentedProps = Pick<
	GithubButtonProps,
	'repo' | 'stars' | 'starsTweenedDuration' | 'variant' | 'size' | 'class' | 'ref' | 'disabled'
>;

const Root = api.createComponentReference<GithubButtonDocumentedProps>({
	description:
		'Button-styled link to a GitHub repository with the GitHub logo and an optional tweened star count.',
	props: {
		repo: api.createAnyProp({
			description: 'The GitHub repository to link to (`https://github.com/{owner}/{repo}`).',
			required: true,
			type: 'object',
			tooltip: '{ owner: string; repo: string }'
		}),
		stars: api.createAnyProp({
			description:
				'Star count shown next to the icon. Omit for an icon-only control. Updates are animated over `starsTweenedDuration`.',
			type: 'number',
			tooltip: 'number | Promise<number>'
		}),
		starsTweenedDuration: api.createNumberProp({
			description: 'Duration in milliseconds for tweening when `stars` changes.',
			defaultValue: 5000
		}),
		variant: api.createStringUnionProp({
			type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
			description: 'Visual variant (same as the Button component).',
			defaultValue: 'outline'
		}),
		size: api.createStringUnionProp({
			type: '"default" | "xs" | "sm" | "lg"',
			description:
				'Layout size for the wrapped Button (icon size when `stars` is omitted, normal size when stars are shown).',
			defaultValue: 'default'
		}),
		class: api.createStringProp({
			description: 'Additional classes merged onto the button/link.'
		}),
		ref: api.createAnyProp({
			description: 'Reference to the underlying `<a>` element.',
			bindable: true,
			type: 'HTMLAnchorElement',
			defaultValue: 'null'
		}),
		disabled: api.createBooleanProp({
			description:
				'When true, the control is not interactive (Button link mode removes `href` and sets `aria-disabled`).'
		})
	}
});

export const reference = {
	name: 'GithubButton' as const,
	components: {
		Root
	}
};
