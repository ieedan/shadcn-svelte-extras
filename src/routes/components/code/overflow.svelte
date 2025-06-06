<script lang="ts">
	import * as Code from '$lib/components/ui/code';
	import codeCode from '$lib/components/ui/code/code.svelte?raw';
</script>

<div class="w-full p-6">
	<Code.Root lang="svelte" class="w-full" code={codeCode}>
		<Code.CopyButton />
	</Code.Root>
</div>
