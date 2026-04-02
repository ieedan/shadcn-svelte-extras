import fs from 'node:fs';
import path from 'node:path';

/**
 * @param {string} text
 * @param {string} prop
 */
function extractBraceValue(text, prop) {
	const key = `${prop}=`;
	const i = text.indexOf(key);
	if (i === -1) return null;
	let j = i + key.length;
	if (text[j] !== '{') return null;
	let depth = 0;
	const start = j;
	for (; j < text.length; j++) {
		if (text[j] === '{') depth++;
		else if (text[j] === '}') {
			depth--;
			if (depth === 0) return text.slice(start + 1, j);
		}
	}
	return null;
}

/**
 * @param {unknown} hl
 */
function highlightToMeta(hl) {
	if (hl == null || (Array.isArray(hl) && hl.length === 0)) return '';
	const parts = [];
	for (const item of /** @type {unknown[]} */ (Array.isArray(hl) ? hl : [hl])) {
		if (Array.isArray(item)) {
			if (item.length >= 2) parts.push(`${item[0]}-${item[1]}`);
			else if (item.length === 1) parts.push(String(item[0]));
		} else {
			parts.push(String(item));
		}
	}
	return parts.length ? `{${parts.join(',')}}` : '';
}

/**
 * @param {string} code
 */
function fenceLang(code) {
	let tick = '```';
	while (code.includes(tick)) tick += '`';
	return tick;
}

/**
 * @param {string} scriptInner
 */
function stripDocCodeConsts(scriptInner) {
	/** @type {Record<string, string>} */
	const map = {};
	const lines = scriptInner.split('\n');
	const kept = [];
	for (const line of lines) {
		const t = line.trim();
		if (/^const _docCode\d+ = /.test(t)) {
			let expr = t.slice(t.indexOf('=') + 1).trim();
			if (expr.endsWith(';')) expr = expr.slice(0, -1);
			const name = /** @type {RegExpMatchArray} */ (t.match(/const (_docCode\d+)/))[1];
			map[name] = /** @type {string} */ (eval(expr));
			continue;
		}
		kept.push(line);
	}
	return { map, scriptInner: kept.join('\n') };
}

/**
 * @param {string} inner attrs between <Code and />
 */
function codeTagToFence(inner, map) {
	const langM = inner.match(/lang=["']([^"']+)["']/);
	const lang = langM ? langM[1] : 'typescript';
	const refM = inner.match(/code=\{([A-Za-z0-9_]+)\}/);
	if (!refM) return null;
	const ref = refM[1];
	if (!(ref in map)) return null;

	const hlRaw = extractBraceValue(inner, 'highlight');
	let meta = '';
	if (hlRaw) {
		try {
			meta = highlightToMeta(eval(`(${hlRaw})`));
		} catch {
			meta = '';
		}
	}

	const body = map[ref];
	const tick = fenceLang(body);
	const info = [lang, meta].filter(Boolean).join(' ');
	return `${tick}${info}\n${body}\n${tick}\n`;
}

/**
 * @param {string} body
 * @param {Record<string, string>} map
 */
function replaceCodeBlocks(body, map) {
	let out = body;
	// Wrapped: <div>...<Code .../>...</div>
	const wrapped =
		/<div>\s*<Code([\s\S]*?)\/>\s*<\/div>/g;
	out = out.replace(wrapped, (full, inner) => {
		const fence = codeTagToFence(inner, map);
		return fence ?? full;
	});
	// Bare <Code .../>
	const bare = /<Code([\s\S]*?)\/>/g;
	out = out.replace(bare, (full, inner) => {
		const fence = codeTagToFence(inner, map);
		return fence ?? full;
	});
	return out;
}

/**
 * @param {string} scriptInner
 */
function cleanupScript(scriptInner) {
	let s = scriptInner.trimEnd();
	if (s.includes('<Code') || s.includes('code={')) return s;
	const lines = s.split('\n').filter((ln) => {
		const t = ln.trim();
		if (t.startsWith('import ') && t.includes("from '$lib/components/docs/code.svelte'")) return false;
		return true;
	});
	return lines.join('\n');
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

const root = path.join(process.cwd(), 'content');
for (const file of walk(root)) {
	let text = fs.readFileSync(file, 'utf8');
	if (!text.includes('_docCode')) continue;

	const fm = text.match(/^---\n[\s\S]*?\n---\n*/);
	const front = fm ? fm[0] : '';
	const rest = fm ? text.slice(fm[0].length) : text;

	const scriptOpen = '<script lang="ts">';
	const scriptClose = '</script>';
	const so = rest.indexOf(scriptOpen);
	const sc = rest.indexOf(scriptClose);
	if (so === -1 || sc === -1) continue;

	const before = rest.slice(0, so + scriptOpen.length);
	const scriptInner = rest.slice(so + scriptOpen.length, sc);
	const body = rest.slice(sc + scriptClose.length);

	const { map, scriptInner: si2 } = stripDocCodeConsts(scriptInner);
	if (Object.keys(map).length === 0) continue;

	let newBody = replaceCodeBlocks(body, map);
	const cleanedScript = cleanupScript(si2);
	const newRest = before + '\n' + cleanedScript + '\n' + scriptClose + newBody;
	fs.writeFileSync(file, front + newRest);
	console.log(file.replace(process.cwd() + '/', ''));
}

console.log('Done.');
