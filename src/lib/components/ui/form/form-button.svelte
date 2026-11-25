<script lang="ts">
	import { Button, type ButtonProps } from '#lib/components/ui/button/index.ts';

	let { ref = $bindable(null), ...restProps }: ButtonProps = $props();
</script>

<Button bind:ref type="submit" {...restProps} />
