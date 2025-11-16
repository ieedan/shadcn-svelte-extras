<script lang="ts">
	import * as Terminal from '$lib/components/ui/terminal';
</script>

<Terminal.Loop>
	<Terminal.Root class="m-6 max-w-xl" delay={250}>
		<Terminal.TypingAnimation>&gt; jsrepo add ui/terminal</Terminal.TypingAnimation>

		<Terminal.Loading delay={1500}>
			{#snippet loadingMessage()}
				Fetching manifest
			{/snippet}
			{#snippet completeMessage()}
				<span class="text-green-500">
					✔ Retrieved blocks from github/ieedan/shadcn-svelte-extras
				</span>
			{/snippet}
		</Terminal.Loading>

		<Terminal.Loading delay={2750}>
			{#snippet loadingMessage()}
				Adding ui/terminal
			{/snippet}
			{#snippet completeMessage()}
				<span class="text-green-500">✔ Added ui/terminal</span>
			{/snippet}
		</Terminal.Loading>

		<Terminal.Loading delay={4000}>
			{#snippet loadingMessage()}
				Installing dependencies
			{/snippet}
			{#snippet completeMessage()}
				<span class="text-green-500">✔ Installed runed@^0.23.4</span>
			{/snippet}
		</Terminal.Loading>

		<Terminal.AnimatedSpan delay={5250} class="text-green-500">
			<span>✔ All done.</span>
		</Terminal.AnimatedSpan>
	</Terminal.Root>
</Terminal.Loop>
