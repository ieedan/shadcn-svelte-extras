<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Installation from '$lib/components/installation.svelte';
	import Playground from '$lib/components/playground.svelte';
	import { examples } from './examples';
</script>

<Subheading class="mt-0">Basic</Subheading>
<Playground code={examples.basic.code}>
	<examples.basic.Component />
</Playground>
<Installation specifier="ui/number-picker" />

<Subheading>Step</Subheading>
<Playground code={examples.step.code}>
	<examples.step.Component />
</Playground>

<Subheading>Min/Max</Subheading>
<Playground code={examples.minMax.code}>
	<examples.minMax.Component />
</Playground>

<Subheading>Animated Overlay</Subheading>
<Playground code={examples.animated.code}>
	<examples.animated.Component />
</Playground>

<Subheading>Drawer</Subheading>
<Playground code={examples.drawer.code}>
	<examples.drawer.Component />
</Playground>
