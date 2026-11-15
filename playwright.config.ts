import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: './tests',
	use: { baseURL: 'http://127.0.0.1:5177' },
	webServer: {
		command: 'pnpm dev:app --host 127.0.0.1 --port 5177',
		url: 'http://127.0.0.1:5177/demos/emoji-picker',
		reuseExistingServer: !process.env.CI
	}
});
