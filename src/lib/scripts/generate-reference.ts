// paths must be relative !!
import { references } from '../docs/api-reference/components/index.js';
import * as casing from '../utils/casing.js';
import path from 'node:path';
import fs from 'node:fs';
import type { PropReference } from '../docs/api-reference/api-reference';

const COMPONENTS_PATH = './static/components';

for (const reference of references) {
	const componentName = casing.pascalToKebab(reference.name);

	const componentPath = path.join(COMPONENTS_PATH, componentName);

	fs.mkdirSync(componentPath, { recursive: true });

	const referenceText = `# ${reference.name} Documentation

## Installation

\`\`\`bash
jsrepo add ui/${componentName}
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
		const defaultValue = prop.defaultValue === undefined ? '-' : prop.defaultValue;
		const required = prop.required ? 'true' : 'false';
		const bindable = prop.bindable ? 'true' : 'false';
		const description = prop.description.replace(/\n/g, ' ');
		return `| ${propName} | ${typeOrTooltip} | ${defaultValue} | ${required} | ${bindable} | ${description} |`;
	})
	.join('\n')}
`
	)
	.join('\n')}`;

	fs.writeFileSync(path.join(componentPath, 'llms.txt'), referenceText);

	console.log(`📃 Wrote ${componentName} reference to ${componentPath}`);
}
