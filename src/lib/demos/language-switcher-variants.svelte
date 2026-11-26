<script lang="ts">
	import { LanguageSwitcher } from '#lib/components/ui/language-switcher/index.ts';

	const languages = [
		{ code: 'en', label: 'English' },
		{ code: 'de', label: 'Deutsch' },
		{ code: 'fr', label: 'Français' },
		{ code: 'es', label: 'Español' }
	];

	let value = $state('en');
</script>

<LanguageSwitcher {languages} bind:value variant="ghost" align="start" />
