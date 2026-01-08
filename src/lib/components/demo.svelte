<script lang="ts">
	import * as Demo from '$lib/components/ui/demo';
	import { Spinner } from './ui/spinner';

	type Props = {
		demo: string;
	};

	let { demo }: Props = $props();

	const ComponentPromise = $derived(
		import(`$lib/demos/${demo}.svelte`).then(({ default: Component }) => Component)
	);
</script>

<Demo.Root>
	<Demo.ActionsGroup class="justify-between">
		<Demo.Tabs />
		<Demo.ActionsGroup>
			<Demo.ControlGroup>
				<Demo.Fullscreen />
				<Demo.ControlGroupSeparator />
				<Demo.ControlRefresh />
			</Demo.ControlGroup>
		</Demo.ActionsGroup>
	</Demo.ActionsGroup>
	<Demo.Preview type="component" {demo}>
		<div class="flex size-full items-center justify-center">
			{#await ComponentPromise}
				<Spinner />
			{:then Component}
				<Component />
			{/await}
		</div>
	</Demo.Preview>
	<Demo.Code code={import(`$lib/demos/${demo}.svelte?raw`).then(({ default: Code }) => Code)} />
</Demo.Root>
