<script lang="ts">
	import * as Code from '$lib/components/ui/code';
</script>

<div class="flex w-full flex-col gap-4 p-6">
	<Code.Root
		lang="typescript"
		class="w-full"
		variant="secondary"
		hideLines
		code={`import * as Code from "$lib/components/ui/code";`}
	>
		<Code.CopyButton />
	</Code.Root>
	<Code.Root
		lang="svelte"
		class="w-full"
		variant="secondary"
		hideLines
		code={`<Button variant="outline">
	Button
</Button>`}
	>
		<Code.CopyButton />
	</Code.Root>
</div>

