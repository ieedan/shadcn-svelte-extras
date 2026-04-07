<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Command from '$lib/components/ui/command';
	import { goto } from '$app/navigation';
	import { commandContext } from '$lib/context';
	import { groupedDocs } from '$lib/features/docs/docs';

	const commandState = commandContext.get();
</script>

<Dialog.Root bind:open={commandState.current}>
	<Dialog.Content class="top-[35%] p-0" showCloseButton={false}>
		<Command.Root>
			<Command.Input placeholder="Search for extras..." />
			<Command.List class="min-h-[300px]">
				<Command.Empty>No results found.</Command.Empty>
				{#each Object.entries(groupedDocs) as [group, routes] (group)}
					<Command.Group heading={group}>
						{#each routes as route (route.title)}
							<Command.Item
								onclick={async () => {
									await goto(route.href);
									commandState.setFalse();
								}}
							>
								{route.title}
							</Command.Item>
						{/each}
					</Command.Group>
				{/each}
			</Command.List>
		</Command.Root>
	</Dialog.Content>
</Dialog.Root>
