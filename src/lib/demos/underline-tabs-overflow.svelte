<script lang="ts">
	import * as UnderlineTabs from '$lib/components/ui/underline-tabs';
	import { Window } from '$lib/components/ui/window';
</script>

<div class="flex w-full max-w-full items-center justify-center p-6">
	<Window class="max-w-lg" contentClass="px-0 py-1">
		<UnderlineTabs.Root value="overview">
			<UnderlineTabs.List>
				<UnderlineTabs.Trigger value="overview">Overview</UnderlineTabs.Trigger>
				<UnderlineTabs.Trigger value="deployments">Deployments</UnderlineTabs.Trigger>
				<UnderlineTabs.Trigger value="analytics">Analytics</UnderlineTabs.Trigger>
				<UnderlineTabs.Trigger value="speed-insights">Speed Insights</UnderlineTabs.Trigger>
				<UnderlineTabs.Trigger value="logs">Logs</UnderlineTabs.Trigger>
				<UnderlineTabs.Trigger value="observability">Observability</UnderlineTabs.Trigger>
				<UnderlineTabs.Trigger value="firewall">Firewall</UnderlineTabs.Trigger>
				<UnderlineTabs.Trigger value="ai-gateway">AI Gateway</UnderlineTabs.Trigger>
				<UnderlineTabs.Trigger value="storage">Storage</UnderlineTabs.Trigger>
				<UnderlineTabs.Trigger value="flags">Flags</UnderlineTabs.Trigger>
				<UnderlineTabs.Trigger value="settings">Settings</UnderlineTabs.Trigger>
			</UnderlineTabs.List>
		</UnderlineTabs.Root>
	</Window>
</div>
