import { Output } from 'jsrepo/outputs';
import fs from 'node:fs';
import path from 'node:path';

const SCHEMA = 'https://shadcn-svelte.com/schema/registry.json';

const JSREPO_TO_SHADCN: Record<string, string> = {
	ui: 'registry:ui',
	component: 'registry:component',
	block: 'registry:block',
	hook: 'registry:hook',
	lib: 'registry:lib',
	page: 'registry:page',
	util: 'registry:lib',
	action: 'registry:lib',
	logo: 'registry:component'
};

const SKIP_ROLES = new Set(['example', 'doc', 'test']);

/** Matches shadcn registry build: multi-file ui/page/file targets are `<item.name>/<file>`, which we override for prefixed items. */
const FOLDER_TARGET_TYPES = new Set(['registry:page', 'registry:ui', 'registry:file']);

const SHADCN_REGISTRY_PREFIX = 'shadcn-svelte-';

function stripShadcnRegistryItemPrefix(itemName: string): string | undefined {
	if (!itemName.startsWith(SHADCN_REGISTRY_PREFIX)) return undefined;
	return itemName.slice(SHADCN_REGISTRY_PREFIX.length);
}

function shadcnSourceFileTarget(
	itemName: string,
	fileRegistryType: string,
	filteredFileCount: number,
	posixPath: string
): string | undefined {
	const dir = stripShadcnRegistryItemPrefix(itemName);
	if (dir === undefined) return undefined;
	const useFolder = filteredFileCount !== 1 && FOLDER_TARGET_TYPES.has(fileRegistryType);
	if (!useFolder) return undefined;
	return `${dir}/${path.posix.basename(posixPath)}`;
}

function mapRegistryType(jsrepoType: string): string {
	return JSREPO_TO_SHADCN[jsrepoType] ?? 'registry:component';
}

function toPosix(p: string): string {
	return p.split(path.sep).join('/');
}

function formatRemoteDep(dep: { name: string; version?: string }): string {
	if (dep.version === undefined || dep.version === '') return dep.name;
	return `${dep.name}@${dep.version}`;
}

function registryDisplayName(fullName: string): string {
	const slash = fullName.lastIndexOf('/');
	if (fullName.startsWith('@') && slash !== -1) {
		return fullName.slice(slash + 1);
	}
	return fullName;
}

/** In-registry deps as `./name.json` so `shadcn add https://host/r/item.json` resolves siblings by URL (not components.json `registry` index). */
function toRelativeRegistryDep(dep: string, itemNames: Set<string>): string {
	if (
		dep.startsWith('http://') ||
		dep.startsWith('https://') ||
		dep.startsWith('./') ||
		dep.startsWith('../')
	) {
		return dep;
	}
	return itemNames.has(dep) ? `./${dep}.json` : dep;
}

export default function (): Output {
	return {
		output: async (buildResult, { cwd }) => {
			const outPath = path.join(cwd, 'registry.json');
			const itemNames = new Set(buildResult.items.map((i) => i.name));

			const items = buildResult.items
				.map((item) => {
					const filteredFiles = item.files.filter((file) => !SKIP_ROLES.has(file.role));
					const fileCount = filteredFiles.length;

					const files = filteredFiles
						.map((file) => {
							const posixPath = toPosix(path.relative(cwd, file.absolutePath));
							const type = mapRegistryType(file.type);
							const fileEntry: Record<string, unknown> = {
								path: posixPath,
								type
							};
							const target = shadcnSourceFileTarget(item.name, type, fileCount, posixPath);
							if (target !== undefined) fileEntry.target = target;
							return fileEntry;
						})
						.sort((a, b) => (a.path as string).localeCompare(b.path as string));

					if (files.length === 0) return null;

					const registryDependencies = (item.registryDependencies ?? []).map((dep) =>
						toRelativeRegistryDep(dep, itemNames)
					);

					const entry: Record<string, unknown> = {
						name: item.name,
						type: mapRegistryType(item.type),
						registryDependencies,
						files
					};

					if (item.title !== undefined) entry.title = item.title;
					if (item.description !== undefined) entry.description = item.description;

					if (item.dependencies !== undefined && item.dependencies.length > 0) {
						entry.dependencies = item.dependencies.map(formatRemoteDep);
					}
					if (item.devDependencies !== undefined && item.devDependencies.length > 0) {
						entry.devDependencies = item.devDependencies.map(formatRemoteDep);
					}

					return entry;
				})
				.filter((item): item is NonNullable<typeof item> => item !== null)
				.sort((a, b) => (a.name as string).localeCompare(b.name as string));

			const doc: Record<string, unknown> = {
				$schema: SCHEMA,
				name: registryDisplayName(buildResult.name),
				homepage: buildResult.homepage ?? '',
				aliases: {
					lib: '$lib',
					ui: '$lib/components/ui',
					components: '$lib/components',
					utils: '$lib/utils',
					hooks: '$lib/hooks'
				},
				items
			};

			if (buildResult.description !== undefined) {
				doc.description = buildResult.description;
			}

			fs.writeFileSync(outPath, `${JSON.stringify(doc, null, '\t')}\n`);
		},
		clean: async ({ cwd }) => {
			const outPath = path.join(cwd, 'registry.json');
			try {
				fs.unlinkSync(outPath);
			} catch {
				// ignore if missing
			}
		}
	};
}
