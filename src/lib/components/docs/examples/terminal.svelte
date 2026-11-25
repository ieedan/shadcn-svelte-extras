<script lang="ts">
	import * as Terminal from '#lib/components/ui/terminal/index.ts';
</script>

<Terminal.Loop delay={5000}>
	<Terminal.Root class="h-[275px] leading-5">
		<Terminal.TypingAnimation>jsrepo add ui/terminal</Terminal.TypingAnimation>
		<br />
		<Terminal.AnimatedSpan delay={1400}>
			<span class="text-muted-foreground">┌</span>
			<span class="bg-yellow-400 px-2 text-black">jsrepo</span>
			<span class="text-muted-foreground">v1.0.0</span>
		</Terminal.AnimatedSpan>

		<Terminal.AnimatedSpan delay={1450} class="text-muted-foreground">│</Terminal.AnimatedSpan>

		<Terminal.Loading delay={1500}>
			{#snippet loadingMessage()}
				Fetching manifest from <span class="text-cyan-500">shadcn-svelte-extras</span>
			{/snippet}
			{#snippet completeMessage()}
				<span class="text-green-500">◇</span> Fetched manifest from
				<span class="text-cyan-500">shadcn-svelte-extras</span>
			{/snippet}
		</Terminal.Loading>

		<Terminal.AnimatedSpan delay={2650} class="text-muted-foreground">│</Terminal.AnimatedSpan>

		<Terminal.Loading delay={2750}>
			{#snippet loadingMessage()}
				Adding <span class="text-cyan-500">ui/terminal</span>
			{/snippet}
			{#snippet completeMessage()}
				<span class="text-green-500">◇</span> Added
				<span class="text-cyan-500">ui/terminal</span>
			{/snippet}
		</Terminal.Loading>
		<Terminal.AnimatedSpan delay={3850} class="text-muted-foreground">│</Terminal.AnimatedSpan>
		<Terminal.AnimatedSpan delay={3900} class="text-green-500">
			<span class="text-muted-foreground">└</span>
			✓ All done!
		</Terminal.AnimatedSpan>
	</Terminal.Root>
</Terminal.Loop>
