import fs from 'node:fs';
import path from 'node:path';

/**
 * CommonMark often won't start a fenced code block if it immediately follows an HTML
 * block without a blank line. That leaves ``` in the doc as text and leaks <Tag/> into the
 * Svelte template. Insert a blank line before ``` openers when needed.
 */
function fix(md) {
	const lines = md.split('\n');
	const out = [];
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const isFenceOpen = /^\s*(`{3,})([^`]*)/.test(line);
		if (isFenceOpen && out.length > 0) {
			const prev = out[out.length - 1];
			if (prev !== '' && prev.trimStart().startsWith('<')) {
				out.push('');
			}
		}
		out.push(line);
	}
	return out.join('\n');
}

function walk(dir) {
	/** @type {string[]} */
	const out = [];
	for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, e.name);
		if (e.isDirectory()) out.push(...walk(p));
		else if (e.name.endsWith('.md')) out.push(p);
	}
	return out;
}

for (const file of walk(path.join(process.cwd(), 'content'))) {
	const t = fs.readFileSync(file, 'utf8');
	const n = fix(t);
	if (n !== t) fs.writeFileSync(file, n);
}

console.log('Ensured blank line before fences where previous line starts with "<".');
