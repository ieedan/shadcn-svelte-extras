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
	import { browser } from '$app/environment';

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

	let currentLang = $state(getLocale());

	function handleLanguageChange(newLanguageCode: Locale) {
		if (!browser) return;

		const currentLocale = getLocale();
		if (newLanguageCode === currentLocale) {
			return;
		}

		setLocale(newLanguageCode); // Triggers state update & reload
		currentLang = newLanguageCode; // Update our local state
	}
</script>

<div class="flex flex-col items-center gap-4">
	<h3>{m.example_message()}</h3>

	<LanguageSwitcher
		{languages}
		value={currentLang}
		onChange={(code: string) => {
			if (isLocale(code)) {
				handleLanguageChange(code as Locale);
			}
		}}
	/>
</div>
