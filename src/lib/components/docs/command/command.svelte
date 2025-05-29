<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Command from '$lib/components/ui/command';
	import { goto } from '$app/navigation';
	import { commandContext } from '$lib/context';
	import { map } from '$lib/map';

	const commandState = commandContext.get();
</script>

<Dialog.Root bind:open={commandState.current}>
	<Dialog.Content class="p-0" hideClose>
		<Command.Root>
			<Command.Input placeholder="Search for extras..." />
			<Command.List class="min-h-[300px]">
				<Command.Empty>No results found.</Command.Empty>
				{#each Object.entries(map) as [group, routes] (group)}
					<Command.Group heading={group}>
						{#each routes as route (route.name)}
							<Command.Item
								onclick={async () => {
									await goto(route.href);
									commandState.setFalse();
								}}
							>
								{route.name}
							</Command.Item>
						{/each}
					</Command.Group>
				{/each}
			</Command.List>
		</Command.Root>
	</Dialog.Content>
</Dialog.Root>
