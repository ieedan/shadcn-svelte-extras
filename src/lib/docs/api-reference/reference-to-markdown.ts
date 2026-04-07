import type { Component, PropReference } from './api-reference';

export type ReferenceBundle = {
	name: string;
	components: Record<string, Component<unknown>>;
};

function cell(s: string | undefined): string {
	if (s === undefined || s === '') return '—';
	return String(s)
		.replace(/\r\n/g, '\n')
		.replace(/\n/g, ' ')
		.replace(/\|/g, '\\|')
		.replace(/`/g, "'");
}

function typeCell(p: PropReference): string {
	let t = String(p.type);
	if (p.tooltip) t += ` · ${p.tooltip}`;
	return cell(t);
}

function formatComponentSection(referenceName: string, component: Component<unknown>): string {
	const title = component.name ? `${referenceName}.${component.name}` : referenceName;
	let out = `### ${title}\n\n${component.description}\n\n`;

	if (component.forwardTo) {
		out += `Props are documented at [${component.forwardTo.name}](${component.forwardTo.href}).\n\n`;
		return out;
	}

	const entries = Object.entries(component.props);
	if (entries.length === 0) return out;

	out += '| Prop | Type | Default | Required | Bindable |\n' + '| --- | --- | --- | --- | --- |\n';

	for (const [prop, value] of entries) {
		const v = value as PropReference;
		const def = v.defaultValue !== undefined ? cell(v.defaultValue) : '—';
		out += `| \`${cell(prop)}\` | ${typeCell(v)} | ${def} | ${v.required ? 'Yes' : 'No'} | ${v.bindable ? 'Yes' : 'No'} |\n`;
	}
	out += '\n';
	return out;
}

/** Plain markdown for the API reference (used by \`*.md\` export). */
export function referenceBundleToMarkdown(bundle: ReferenceBundle): string {
	const parts: string[] = ['## API Reference\n'];
	for (const component of Object.values(bundle.components)) {
		parts.push(formatComponentSection(bundle.name, component));
	}
	return (
		parts
			.join('\n')
			.replace(/\n{3,}/g, '\n\n')
			.trimEnd() + '\n'
	);
}
