<script lang="ts">
	import * as Code from '$lib/components/ui/code';

	const code = `import * as Code from "$lib/components/ui/code";`;
</script>

<div class="w-full p-6">
	<Code.Root lang="typescript" class="w-full" {code} hideLines>
		<Code.CopyButton />
	</Code.Root>
</div>

