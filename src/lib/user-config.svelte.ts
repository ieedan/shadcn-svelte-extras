import { Context } from 'runed';
import { z } from 'zod';

export const USER_CONFIG_COOKIE_NAME = 'scn_user_config';

const layoutSchema = z.enum(['fixed', 'full']).default('full');
const packageManagerSchema = z.enum(['npm', 'yarn', 'pnpm', 'bun']).default('pnpm');

export type Layout = z.infer<typeof layoutSchema>;

export const userConfigSchema = z
	.object({
		layout: layoutSchema,
		packageManager: packageManagerSchema
	})
	.default({
		layout: 'full',
		packageManager: 'pnpm'
	});

export type UserConfigType = z.infer<typeof userConfigSchema>;

function parseCookie(cookie: string): Record<string, string> {
	const cookies = cookie.split(';');
	const cookieMap: Record<string, string> = {};
	for (const cookie of cookies) {
		const [key, value] = cookie.split('=');
		cookieMap[key.trim()] = decodeURIComponent(value);
	}
	return cookieMap;
}

export function parseUserConfig(cookie: string): UserConfigType {
	const cookieMap = parseCookie(cookie);
	const userConfig = cookieMap[USER_CONFIG_COOKIE_NAME];
	if (!userConfig) return userConfigSchema.parse({});
	return userConfigSchema.parse(JSON.parse(userConfig));
}

export class UserConfig {
	#config: UserConfigType;

	constructor(config: UserConfigType) {
		this.#config = $state.raw(config);
	}

	get current(): UserConfigType {
		return this.#config;
	}

	setConfig(config: Partial<UserConfigType>): void {
		this.#config = { ...this.#config, ...config };
		document.cookie = `${USER_CONFIG_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(this.#config))}; path=/; max-age=31536000; SameSite=Lax;`;

		if (config.layout) updateLayoutClass(this.#config.layout);
	}
}

function updateLayoutClass(newLayout: Layout): void {
	if (typeof document === 'undefined') return;

	// Remove any existing layout classes
	document.documentElement.classList.remove('layout-fixed', 'layout-full');
	// Add the new layout class
	document.documentElement.classList.add(`layout-${newLayout}`);
}

export const UserConfigContext = new Context<UserConfig>('UserConfigContext');
