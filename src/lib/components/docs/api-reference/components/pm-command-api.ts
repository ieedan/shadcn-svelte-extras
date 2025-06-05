import type { PMCommandProps } from '$lib/components/ui/pm-command/pm-command.svelte';
import * as api from '../api-reference';

const Root = api.createComponentReference<PMCommandProps>({
	name: 'Root',
	description:
		'The root component for displaying a package manager command with agent tabs and copy functionality.',
	props: {
		variant: api.createStringUnionProp({
			type: '"default" | "secondary"',
			description: 'The visual style of the command block.',
			defaultValue: 'default'
		}),
		class: api.createStringProp({
			description: 'Additional classes to apply to the root element.'
		}),
		agents: api.createAnyProp({
			description: 'List of available agents (package managers) to choose from.',
			type: 'Agent[]',
			defaultValue: "['npm', 'pnpm', 'yarn', 'bun']"
		}),
		agent: api.createAnyProp({
			description: 'The selected agent (package manager).',
			type: 'Agent',
			bindable: true,
			defaultValue: 'npm'
		}),
		command: api.createAnyProp({
			description: 'The command to display.',
			type: 'Command',
			required: true
		}),
		args: api.createAnyProp({
			description: 'Arguments for the command.',
			type: 'string[]',
			required: true
		})
	}
});

export const components = {
	Root
};
