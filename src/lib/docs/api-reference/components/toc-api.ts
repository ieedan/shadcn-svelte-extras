import * as api from '../api-reference';

const Root = api.createComponentReference({
	description: 'The root component for rendering a table of contents.',
	props: {
		toc: api.createAnyProp({
			description: 'The table of contents data, an array of Heading objects. (Comes from UseToc)',
			required: true,
			type: 'Heading[]',
			tooltip: `type Heading = {\n  index: number;\n  ref: Element;\n  kind: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';\n  id?: string;\n  level: number;\n  label: string;\n  active: boolean;\n  children: Heading[];\n}`
		}),
		class: api.createStringProp({
			description: 'Additional classes to apply to the root element.'
		}),
		isChild: api.createBooleanProp({
			description: 'Indicates whether this is a child component or root component.',
			defaultValue: false
		})
	}
});

export const components = {
	Root
};
