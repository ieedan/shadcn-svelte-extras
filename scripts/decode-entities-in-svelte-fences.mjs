import fs from 'node:fs';
import path from 'node:path';

/** Decode minimal entities in ```svelte fence bodies (readable source; still valid fenced code). */
function decode(md) {
	const lines = md.split('\n');
	const out = [];
	let inSvelteFence = false;

	for (const line of lines) {
		const open = line.match(/^(`{3,})(.+)?$/);
		if (open && !inSvelteFence) {
			const meta = (open[2] || '').trim();
			const lang = meta.split(/\s+/)[0] || '';
			inSvelteFence = lang === 'svelte';
			out.push(line);
			continue;
		}
		if (inSvelteFence && /^`{3,}\s*$/.test(line)) {
			inSvelteFence = false;
			out.push(line);
			continue;
		}
		if (inSvelteFence) {
			out.push(
				line
					.replaceAll('&lt;', '<')
					.replaceAll('&gt;', '>')
					.replaceAll('&amp;', '&')
			);
		} else {
			out.push(line);
		}
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
	if (!t.includes('&lt;')) continue;
	const n = decode(t);
	if (n !== t) fs.writeFileSync(file, n);
}

console.log('Decoded &lt;&gt; in ```svelte fences where present.');
