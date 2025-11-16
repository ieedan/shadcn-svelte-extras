<script lang="ts">
	import { PMCommand } from '$lib/components/ui/pm-command';
	import { UsePromise } from '$lib/hooks/use-promise.svelte';
	import { onMount } from 'svelte';

	let resolve = $state<() => void>();

	const promise = new Promise<string>((res) => {
		resolve = () => res('1.40.1');
	});

	const version = new UsePromise(promise, '1.x.x');

	onMount(() => {
		const timeout = setTimeout(() => {
			resolve?.();
		}, 2500);

		return () => {
			clearTimeout(timeout);
		};
	});
</script>

<div class="w-full p-6">
	<PMCommand
		command="execute"
		args={[`jsrepo@${version.current}`, 'add', 'hooks/use-promise.svelte']}
	/>
</div>
