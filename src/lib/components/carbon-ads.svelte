<!-- Modified from https://github.com/shinokada/svelte-carbonads -->

<script lang="ts">
	import { onMount } from 'svelte';
	import { navigating } from '$app/stores';

	interface WindowWithCarbonAds extends Window {
		_carbonads: {
			refresh: () => void;
		};
	}

	const CARBON_SOURCE =
		'https://cdn.carbonads.com/carbon.js?serve=CW7IE53W&placement=wwwshadcn-svelte-extrascom&format=cover';

	onMount(() => {
		refreshCarbonAds();
	});

	navigating.subscribe((navigating) => {
		if (navigating) {
			refreshCarbonAds();
		}
	});

	function refreshCarbonAds() {
		const isCarbonAdsRendered = document.querySelector('#carbonads');
		const windowWithCarbon = window as unknown as WindowWithCarbonAds;

		if (isCarbonAdsRendered && windowWithCarbon._carbonads) {
			windowWithCarbon._carbonads.refresh();
		} else {
			const script = document.createElement('script');
			script.async = true;
			script.id = '_carbonads_js';
			script.src = CARBON_SOURCE;

			const container = document.querySelector('#carbon-container');
			if (container) {
				// Remove any existing scripts first to avoid duplicates
				const existingScript = container.querySelector('#_carbonads_js');
				if (existingScript) {
					container.removeChild(existingScript);
				}
				container.appendChild(script);
			}
		}
	}
</script>

<aside class="py-4">
	<div id="carbon-container"></div>
</aside>

<!-- <style>
	@reference '../../app.css';

	:global(.carbon-responsive-wrap) {
		@apply !bg-accent !text-foreground !border-border !rounded-lg;
	}

	:global(.carbon-text) {
		@apply !text-foreground;
	}

	:global(.carbon-poweredby) {
		@apply !text-foreground;
	}
</style> -->
