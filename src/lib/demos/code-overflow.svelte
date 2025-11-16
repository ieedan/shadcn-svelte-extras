<script lang="ts">
	import * as Code from '$lib/components/ui/code';
	import codeCode from '$lib/components/ui/code/code.svelte?raw';
</script>

<div class="w-full p-6">
	<Code.Overflow>
		<Code.Root lang="svelte" code={codeCode}>
			<Code.CopyButton />
		</Code.Root>
	</Code.Overflow>
</div>

