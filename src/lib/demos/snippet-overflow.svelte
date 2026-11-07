<script lang="ts">
	import { Snippet } from '$lib/components/ui/snippet';
</script>

<div class="flex w-full max-w-75 flex-col gap-2">
	<Snippet text="npx jsrepo add ui/snippet ui/copy-button hooks/use-clipboard" />
	<Snippet
		text={['npx jsrepo add ui/snippet', 'npx jsrepo add ui/copy-button hooks/use-clipboard']}
	/>
</div>
