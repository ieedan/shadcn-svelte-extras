import fs from 'node:fs';

/** Writes `content` only when the file is missing or differs. Reduces mtime churn for jsrepo `--watch`. */
export function writeFileIfChanged(filePath: string, content: string): void {
	let prev = '';
	try {
		prev = fs.readFileSync(filePath, 'utf8');
	} catch {
		// missing or unreadable
	}
	if (prev !== content) fs.writeFileSync(filePath, content);
}
