import fs from 'node:fs';
import path from 'node:path';

/**
 * Escape < > so Svelte won't parse markup inside mdsx markdown (fences become {@html} but
 * upstream must not see component tags).
 * @param {string} md
 */
function encodeAnglesInSvelteFences(md) {
	const lines = md.split('\n');
	const out = [];
	let inFence = false;
	let fenceLang = '';

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const open = line.match(/^(`{3,})(.+)?$/);
		if (open && !inFence) {
			inFence = true;
			const meta = (open[2] || '').trim();
			fenceLang = meta.split(/\s+/)[0] || '';
			out.push(line);
			continue;
		}
		if (inFence && /^`{3,}\s*$/.test(line)) {
			inFence = false;
			fenceLang = '';
			out.push(line);
			continue;
		}

		if (inFence && fenceLang === 'svelte') {
			out.push(line.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
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
	if (!t.includes('```')) continue;
	const n = encodeAnglesInSvelteFences(t);
	if (n !== t) fs.writeFileSync(file, n);
}

console.log('Encoded < > in all ```svelte fences.');
