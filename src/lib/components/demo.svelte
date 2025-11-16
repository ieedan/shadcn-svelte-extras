<script lang="ts">
	import * as Demo from '$lib/components/ui/demo';

	type Props = {
		demo: string;
	};

	let { demo }: Props = $props();
</script>

<Demo.Root>
	<Demo.ActionsGroup class="justify-between">
		<Demo.Tabs />
		<Demo.ActionsGroup>
			<Demo.ControlGroup>
				<Demo.ControlSizeMobile />
				<Demo.ControlSizeTablet />
				<Demo.ControlSizeDesktop />
				<Demo.ControlGroupSeparator />
				<Demo.Fullscreen />
				<Demo.ControlGroupSeparator />
				<Demo.ControlRefresh />
			</Demo.ControlGroup>
		</Demo.ActionsGroup>
	</Demo.ActionsGroup>
	<Demo.Preview type="iframe" {demo} />
	<Demo.Code />
</Demo.Root>
