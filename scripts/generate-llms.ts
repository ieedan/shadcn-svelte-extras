// paths must be relative !!
import { references } from '../src/lib/docs/api-reference/components/index.js';
import * as casing from '../src/lib/utils/casing.js';
import path from 'path';
import fs from 'fs';
import type { PropReference } from '../src/lib/docs/api-reference/api-reference.js';

const COMPONENTS_PATH = './static/components';

let rootLLMs = `# shadcn-svelte-extras Documentation for LLMs

> shadcn-svelte-extras is a collection of components that follow the same styling as shadcn-svelte.
 
## Components
`;

for (const reference of references) {
	const componentName = casing.pascalToKebab(reference.name);

	const componentPath = path.join(COMPONENTS_PATH, componentName);

	fs.mkdirSync(componentPath, { recursive: true });

	rootLLMs += `- [${reference.name} Documentation](https://shadcn-svelte-extras.com/components/${componentName}/llms.txt)\n`;

	const referenceText = `# ${reference.name} Documentation

## Installation

\`\`\`bash
jsrepo add ${componentName}
\`\`\`

## Components

${Object.entries(reference.components)
	.map(
		([_, component]) => `### ${component.name ?? reference.name}

${component.description}

#### Props

| Prop | Type | Default Value | Required | Bindable | Description |
|------|------|--------------|----------|----------|-------------|
${Object.entries(component.props)
	.map(([propName, prop]) => {
		const propRef = prop as PropReference;
		const typeOrTooltip = propRef.tooltip ? propRef.tooltip : propRef.type;
		const defaultValue = propRef.defaultValue === undefined ? '-' : propRef.defaultValue;
		const required = propRef.required ? 'true' : 'false';
		const bindable = propRef.bindable ? 'true' : 'false';
		const description = propRef.description.replace(/\n/g, ' ');
		return `| ${propName} | ${typeOrTooltip} | ${defaultValue} | ${required} | ${bindable} | ${description} |`;
	})
	.join('\n')}
`
	)
	.join('\n')}`;

	fs.writeFileSync(path.join(componentPath, 'llms.txt'), referenceText);

	console.log(`📃 Wrote ${componentName} reference to ${componentPath}`);
}

fs.writeFileSync('./static/llms.txt', rootLLMs);

console.log(`📃 Wrote root llms.txt to ./static/llms.txt`);
