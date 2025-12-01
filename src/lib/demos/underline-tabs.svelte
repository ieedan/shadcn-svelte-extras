<script lang="ts">
    import * as UnderlineTabs from '$lib/components/ui/underline-tabs';
</script>

<UnderlineTabs.Root value="overview">
    <UnderlineTabs.List>
        <UnderlineTabs.Trigger value="overview">Overview</UnderlineTabs.Trigger>
        <UnderlineTabs.Trigger value="deployments">Deployments</UnderlineTabs.Trigger>
        <UnderlineTabs.Trigger value="analytics">Analytics</UnderlineTabs.Trigger>
        <UnderlineTabs.Trigger value="speed-insights">Speed Insights</UnderlineTabs.Trigger>
        <UnderlineTabs.Trigger value="logs">Logs</UnderlineTabs.Trigger>
    </UnderlineTabs.List>
</UnderlineTabs.Root>