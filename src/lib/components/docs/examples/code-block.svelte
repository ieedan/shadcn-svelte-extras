<script lang="ts">
	import { Svelte } from '$lib/components/icons';
	import { Code } from '$lib/components/ui/code';
	import { CopyButton } from '$lib/components/ui/copy-button';

	let code = `\<script\>
    import { ModeWatcher } from "mode-watcher";    
\</script\>

<ModeWatcher/>`;
</script>

<div class="border-border bg-card overflow-hidden rounded-lg border">
	<div class="border-border flex place-items-center justify-between border-b p-2">
		<div class="flex place-items-center gap-2">
			<Svelte class="size-4" />
			<span class="text-muted-foreground font-mono text-sm"> src/routes/+layout.svelte </span>
		</div>
		<CopyButton text={code} class="size-7" />
	</div>
	<Code lang="svelte" hideCopy class="border-none" {code} highlight={[2, 5]} />
</div>
