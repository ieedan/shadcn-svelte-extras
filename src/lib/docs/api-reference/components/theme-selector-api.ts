import * as api from '../api-reference';
import type { ThemeSelectorProps } from '$lib/components/ui/theme-selector/theme-selector.svelte';

const Root = api.createComponentReference<ThemeSelectorProps>({
	description: 'The root theme selector component.',
	props: {
		variant: api.createStringUnionProp({
			type: '"outline" | "ghost"',
			description: 'The visual style of the theme selector.',
			defaultValue: 'outline'
		}),
		size: api.createStringUnionProp({
			type: '"default" | "xs" | "sm" | "lg"',
			description: 'The size of the theme selector.',
			defaultValue: 'default'
		})
	}
});

export const reference = {
	name: 'ThemeSelector' as const,
	components: {
		Root
	}
};
