<script lang="ts">
	import * as Code from '$lib/components/ui/code';

	let { ...rest }: Code.RootProps = $props();
</script>

<Code.Root {...rest}>
	<Code.CopyButton />
</Code.Root>
