import { expect, test } from '@playwright/test';
import { createRequire } from 'node:module';
import type { EmojiMartData } from '@emoji-mart/data';

const data = createRequire(import.meta.url)('@emoji-mart/data') as EmojiMartData;

// Empty keyword lists were excluded by the original picker even without search.
const groups = data.categories.map((group) => ({
	...group,
	emojis: group.emojis.filter((name) => data.emojis[name].keywords.length > 0)
}));
const names = groups.flatMap((group) => group.emojis);

// Keep scrolling from masking keyboard boundary bugs. A separate test covers
// the real observer; these tests must reach unmounted items using keys alone.
test.beforeEach(async ({ page }) => {
	await page.addInitScript(() => {
		const Observer = window.IntersectionObserver;
		window.IntersectionObserver = class extends Observer {
			observe() {}
		};
	});
});

test('arrows cross render pages and category boundaries without mounting the whole list', async ({
	page
}) => {
	await page.goto('/demos/emoji-picker');
	const items = page.locator('[data-command-item]');
	const selected = page.locator('[data-command-item][data-selected]');
	const search = page.getByRole('combobox');
	await expect(items).toHaveCount(120);
	await search.focus();
	await search.press('Home');
	for (let i = 0; i < 20; i++) await search.press('ArrowDown');
	await expect(selected).toHaveAttribute('data-value', names[120]);
	await search.press('Home');
	for (let i = 0; i < 125; i++) await search.press('ArrowRight');
	await expect(selected).toHaveAttribute('data-value', names[125]);
	await expect(items).toHaveCount(240);
	await search.press('Enter');
	await expect(
		page.getByText(`You selected ${data.emojis[names[125]].skins[0].native}`, { exact: true })
	).toBeVisible();
	for (let i = 125; i < groups[0].emojis.length; i++) await search.press('ArrowRight');
	await expect(selected).toHaveAttribute('data-value', groups[1].emojis[0]);
	await search.press('Home');
	for (let i = 0; i < 45; i++) await search.press('ArrowDown');
	await expect(selected).toHaveAttribute('data-value', names[270]);
	await expect(items).not.toHaveCount(names.length);
});

test('End reaches the true end, Enter selects it, and search resets the render budget', async ({
	page
}) => {
	await page.goto('/demos/emoji-picker');
	const search = page.getByRole('combobox');
	const items = page.locator('[data-command-item]');
	const selected = page.locator('[data-command-item][data-selected]');
	await expect(items).toHaveCount(120);
	await search.press('End');
	await expect(items).toHaveCount(names.length);
	await expect(selected).toHaveAttribute('data-value', names.at(-1)!);
	await search.press('ArrowRight');
	await expect(selected).toHaveAttribute('data-value', names.at(-1)!);
	await search.press('Enter');
	await expect(
		page.getByText(`You selected ${data.emojis[names.at(-1)!].skins[0].native}`, { exact: true })
	).toBeVisible();
	await search.fill('SMILE');
	const matches = names.filter((name) =>
		data.emojis[name].keywords.some((keyword) => keyword.toLowerCase().startsWith('smile'))
	);
	await expect(items).toHaveCount(matches.length);
	await search.press('End');
	await expect(selected).toHaveAttribute('data-value', matches.at(-1)!);
	await search.fill('no-such-emoji-zzzz');
	await expect(items).toHaveCount(0);
	await expect(page.getByText('No results.', { exact: true })).toBeVisible();
	await search.fill('');
	await expect(items).toHaveCount(120);
	await search.press('Home');
	await expect(selected).toHaveAttribute('data-value', names[0]);
});

test('filtered pages support keyboard movement, Vim bindings, and group jumps', async ({
	page
}) => {
	await page.goto('/demos/emoji-picker');
	const search = page.getByRole('combobox');
	const items = page.locator('[data-command-item]');
	const selected = page.locator('[data-command-item][data-selected]');
	const matches = names.filter((name) =>
		data.emojis[name].keywords.some((keyword) => keyword.toLowerCase().startsWith('s'))
	);
	await search.fill('s');
	await expect(items).toHaveCount(120);
	await search.press('Home');
	for (let i = 0; i < 125; i++) await search.press('Control+l');
	await expect(selected).toHaveAttribute('data-value', matches[125]);
	await expect(items).toHaveCount(Math.min(240, matches.length));
	await search.press('Enter');
	await expect(
		page.getByText(`You selected ${data.emojis[matches[125]].skins[0].native}`, { exact: true })
	).toBeVisible();
	await search.fill('');
	await expect(items).toHaveCount(120);
	await search.press('Home');
	await search.press('Alt+ArrowRight');
	await expect(selected).toHaveAttribute('data-value', groups[1].emojis[0]);
	await search.press('Alt+ArrowLeft');
	await expect(selected).toHaveAttribute('data-value', names[0]);
});

test('scrolling progressively exposes every emoji with the real observer', async ({ browser }) => {
	const page = await browser.newPage();
	await page.goto('http://127.0.0.1:5177/demos/emoji-picker');
	const items = page.locator('[data-command-item]');
	await expect(items).toHaveCount(120);
	while ((await items.count()) < names.length) {
		const count = await items.count();
		await page.locator('[data-command-list]').evaluate((list) => {
			list.scrollTop = list.scrollHeight;
		});
		await expect.poll(() => items.count()).toBeGreaterThan(count);
	}
	await expect(items).toHaveCount(names.length);
	await expect(page.locator('[data-command-item][data-selected]')).toHaveAttribute(
		'data-value',
		names[0]
	);
	await page.close();
});
