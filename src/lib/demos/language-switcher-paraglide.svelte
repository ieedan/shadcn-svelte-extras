<script lang="ts">
	import { LanguageSwitcher } from '$lib/components/ui/language-switcher';
	import {
		getLocale,
		setLocale,
		type Locale,
		locales as availableLocales,
		isLocale
	} from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';

	const languageLabels: Partial<Record<Locale, string>> = {
		en: 'English',
		de: 'Deutsch',
		fr: 'Français'
		// Add labels for all your configured locales in project.inlang/settings.json
	};

	const languages = availableLocales.map((code) => ({
		code,
		label: languageLabels[code] ?? code.toUpperCase()
	}));

	let currentLang = $derived(getLocale());
</script>

<div class="flex flex-col items-center gap-4">
	<LanguageSwitcher
		{languages}
		bind:value={currentLang}
		onChange={(code: string) => {
			if (isLocale(code)) setLocale(code);
		}}
	/>

	<h3>{m.example_message()}</h3>
</div>
